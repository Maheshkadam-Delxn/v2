import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import MainLayout from '../../../../components/MainLayout';

const BASE_URL = 'https://api-v2-skystruct.prudenttec.com/';
const MENU_ID = 'DRlBbUjgXSb';

const AddDrawings = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId } = route.params || { projectId: 1 };

  const [formData, setFormData] = useState({
    description: '',
    docVersion: '',
    drawingGroupId: '',
    drawingName: '',
    drawingNumber: '',
    drawingStatus: '',
    drawingType: '',
    phaseId: '',
    remark: '',
  });
  const [file, setFile] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [phases, setPhases] = useState([]);
  const [groups, setGroups] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    const initialize = async () => {
      await fetchToken();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (jwtToken) {
      fetchPhases();
      fetchDrawingStatusesAndTypes();
    }
  }, [jwtToken]);

  const fetchToken = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setJwtToken(parsedData.jwtToken);
      } else {
        Alert.alert('Error', 'No user data found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch token');
      console.error('fetchToken error:', error);
    }
  };

  const updateToken = async (newToken) => {
    if (newToken) {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          const updatedUserData = { ...parsedData, jwtToken: newToken };
          await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
          setJwtToken(newToken);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to update token');
        console.error('updateToken error:', error);
      }
    }
  };

  const fetchPhases = async () => {
    if (!jwtToken) return;
    try {
      const response = await fetch(`${BASE_URL}phase/phase-list-by-module`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({ module: 'Plan' }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      setPhases(Array.isArray(data.phaseFormBeans) ? data.phaseFormBeans.map(p => ({ id: p.autoId, name: p.phaseName })) : []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch phases');
      console.error('fetchPhases error:', error);
      setPhases([]);
    }
  };

  const fetchDrawingStatusesAndTypes = async () => {
    if (!jwtToken) return;
    try {
      const response = await fetch(`${BASE_URL}commonControl/get-dropdown`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({ type: 'DRAWING_STATUS,DRAWING_TYPE' }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      setStatuses(Array.isArray(data.dropdownMap?.DRAWING_STATUS) ? data.dropdownMap.DRAWING_STATUS.map(s => ({ id: s.autoId, name: s.dropdownValue })) : []);
      setTypes(Array.isArray(data.dropdownMap?.DRAWING_TYPE) ? data.dropdownMap.DRAWING_TYPE.map(t => ({ id: t.autoId, name: t.dropdownValue })) : []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch drawing statuses and types');
      console.error('fetchDrawingStatusesAndTypes error:', error);
      setStatuses([]);
      setTypes([]);
    }
  };

  const fetchGroups = async (phaseId) => {
    if (!jwtToken || !phaseId) return;
    try {
      const response = await fetch(`${BASE_URL}drawing-group/drawing-group-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({ category: phaseId }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('fetchGroups data:', data);
      updateToken(data.jwtToken);
      setGroups(Array.isArray(data.drawingGroupFormBeans) ? data.drawingGroupFormBeans.map(g => ({ id: g.autoId, name: g.groupName })) : []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch drawing groups');
      console.error('fetchGroups error:', error);
      setGroups([]);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    if (field === 'phaseId' && value) {
      fetchGroups(value);
      setFormData(prev => ({ ...prev, drawingGroupId: '' }));
    }
  };

  const openModal = (type) => {
    if (type === 'drawingGroupId' && !formData.phaseId) {
      Alert.alert('Error', 'Please select a phase first');
      return;
    }
    setModalType(type);
    setModalVisible(true);
  };

  const selectModalValue = (item) => {
    handleInputChange(modalType, item.id);
    setModalVisible(false);
  };

  const getModalData = () => {
    switch (modalType) {
      case 'phaseId':
        return phases;
      case 'drawingGroupId':
        return groups;
      case 'drawingStatus':
        return statuses;
      case 'drawingType':
        return types;
      default:
        return [];
    }
  };

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick file');
      console.error('pickFile error:', error);
    }
  };

  const handleSubmit = async () => {
    if (!jwtToken) {
      Alert.alert('Error', 'Authentication token missing');
      return;
    }
    if (!formData.drawingName.trim()) {
      Alert.alert('Error', 'Please enter a drawing name');
      return;
    }
    if (!formData.phaseId) {
      Alert.alert('Error', 'Please select a phase');
      return;
    }
    if (!formData.drawingGroupId) {
      Alert.alert('Error', 'Please select a drawing group');
      return;
    }
    if (!file) {
      Alert.alert('Error', 'Please add a file');
      return;
    }

    const fd = new FormData();
    fd.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType || 'application/octet-stream',
    });
    fd.append('formData', JSON.stringify({
      description: formData.description,
      docVersion: formData.docVersion,
      drawingGroupId: formData.drawingGroupId,
      drawingName: formData.drawingName,
      drawingNumber: formData.drawingNumber,
      drawingStatus: formData.drawingStatus,
      drawingType: formData.drawingType,
      phaseId: formData.phaseId,
      remark: formData.remark,
    }));

    try {
      const response = await fetch(`${BASE_URL}drawing`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: fd,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('handleSubmit data:', data);
      updateToken(data.jwtToken);
      Alert.alert('Success', 'Drawing added successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add drawing');
      console.error('handleSubmit error:', error);
    }
  };

  return (
    <MainLayout title="Add Drawing">
      <View className="flex-1 bg-gray-50">
        <ScrollView className="flex-1 px-4 pt-4">
          <View className="mb-4">
            <Text className="text-blue-500 text-sm font-medium mb-2">Phase</Text>
            <TouchableOpacity
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
              onPress={() => openModal('phaseId')}
            >
              <Text className={formData.phaseId ? 'text-gray-800' : 'text-gray-400'}>
                {phases.find(p => p.id === formData.phaseId)?.name || 'Select Phase'}
              </Text>
              <MaterialIcons name="category" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View className="mb-4">
            <Text className="text-blue-500 text-sm font-medium mb-2">Drawing Group</Text>
            <TouchableOpacity
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
              onPress={() => openModal('drawingGroupId')}
            >
              <Text className={formData.drawingGroupId ? 'text-gray-800' : 'text-gray-400'}>
                {groups.find(g => g.id === formData.drawingGroupId)?.name || 'Select Drawing Group'}
              </Text>
              <MaterialIcons name="group" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <View className="flex-row mb-4" style={{ gap: 12 }}>
            <View className="flex-1">
              <Text className="text-gray-600 text-sm font-medium mb-2">Drawing Name</Text>
              <View className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center">
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Enter Drawing Name"
                  placeholderTextColor="#9CA3AF"
                  value={formData.drawingName}
                  onChangeText={(value) => handleInputChange('drawingName', value)}
                />
                <MaterialIcons name="title" size={20} color="#6B7280" />
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-gray-600 text-sm font-medium mb-2">Drawing Number</Text>
              <View className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center">
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="Enter Drawing Number"
                  placeholderTextColor="#9CA3AF"
                  value={formData.drawingNumber}
                  onChangeText={(value) => handleInputChange('drawingNumber', value)}
                />
                <MaterialIcons name="tag" size={20} color="#6B7280" />
              </View>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 text-sm font-medium mb-2">Doc Version</Text>
            <View className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center">
              <TextInput
                className="flex-1 text-gray-800"
                placeholder="Enter Doc Version"
                placeholderTextColor="#9CA3AF"
                value={formData.docVersion}
                onChangeText={(value) => handleInputChange('docVersion', value)}
              />
              <MaterialIcons name="content-copy" size={20} color="#6B7280" />
            </View>
          </View>

          <View className="flex-row mb-4" style={{ gap: 12 }}>
            <View className="flex-1">
              <Text className="text-blue-500 text-sm font-medium mb-2">Drawing Status</Text>
              <TouchableOpacity
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                onPress={() => openModal('drawingStatus')}
              >
                <Text className={formData.drawingStatus ? 'text-gray-800' : 'text-gray-400'}>
                  {statuses.find(s => s.id === formData.drawingStatus)?.name || 'Select Status'}
                </Text>
                <MaterialIcons name="flag" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View className="flex-1">
              <Text className="text-blue-500 text-sm font-medium mb-2">Drawing Type</Text>
              <TouchableOpacity
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                onPress={() => openModal('drawingType')}
              >
                <Text className={formData.drawingType ? 'text-gray-800' : 'text-gray-400'}>
                  {types.find(t => t.id === formData.drawingType)?.name || 'Select Type'}
                </Text>
                <MaterialIcons name="engineering" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 text-sm font-medium mb-2">Remark</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Enter Remark"
              placeholderTextColor="#9CA3AF"
              value={formData.remark}
              onChangeText={(value) => handleInputChange('remark', value)}
              multiline
              numberOfLines={4}
              style={{ height: 100, textAlignVertical: 'top' }}
            />
          </View>

          <View className="mb-4">
            <Text className="text-gray-600 text-sm font-medium mb-2">Description</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Enter Description"
              placeholderTextColor="#9CA3AF"
              value={formData.description}
              onChangeText={(value) => handleInputChange('description', value)}
              multiline
              numberOfLines={6}
              style={{ height: 120, textAlignVertical: 'top' }}
            />
          </View>

          <TouchableOpacity className="mb-6" onPress={pickFile}>
            <Text className="text-blue-500 text-base font-medium">
              {file ? file.name : 'Add File'}
            </Text>
          </TouchableOpacity>

          <View className="items-end mb-8">
            <TouchableOpacity
              className="px-8 py-3 rounded-lg"
              style={{ backgroundColor: '#4A90E2' }}
              onPress={handleSubmit}
            >
              <Text className="text-white font-semibold text-base">Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-black/50 justify-center items-center p-4">
            <View className="bg-white rounded-lg w-full max-w-sm p-4">
              <View className="flex-row items-center justify-between mb-4 pb-2 border-b border-gray-100">
                <Text className="text-lg font-bold text-gray-800">
                  Select {modalType.replace(/([A-Z])/g, ' $1').trim()}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 300 }}>
                {getModalData().map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="py-3 border-b border-gray-100"
                    onPress={() => selectModalValue(item)}
                  >
                    <Text className="text-gray-800 text-base">{item.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout>
  );
};

export default AddDrawings;