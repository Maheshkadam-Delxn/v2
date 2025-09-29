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
import MainLayout from '../../../../components/MainLayout';

const BASE_URL = 'https://api-v2-skystruct.prudenttec.com/';
const MENU_ID = 'DRlBbUjgXSb';

const AddDrawingGroup = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId } = route.params || { projectId: 1 };

  const [formData, setFormData] = useState({
    groupName: '',
    toId: '',
    phaseId: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [phases, setPhases] = useState([]);
  const [members, setMembers] = useState([]);
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
      fetchMembers();
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

  const fetchMembers = async () => {
    if (!jwtToken) return;
    try {
      const response = await fetch(`${BASE_URL}member/get-all-member-list-by-org`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': '8OMNBJc0dAp',
        },
        body: JSON.stringify({ comment: '' }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      setMembers(Array.isArray(data.memberFormBeans) ? data.memberFormBeans.map(m => ({ id: m.autoId, name: m.name })) : []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch members');
      console.error('fetchMembers error:', error);
      setMembers([]);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const openModal = (type) => {
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
      case 'toId':
        return members;
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    if (!jwtToken) {
      Alert.alert('Error', 'Authentication token missing');
      return;
    }
    if (!formData.groupName.trim() || !formData.phaseId) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}drawing-group`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({
          drawingGroupFormBean: {
            groupName: formData.groupName.trim(),
            toId: formData.toId,
            phaseId: formData.phaseId,
          },
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      Alert.alert('Success', 'Drawing group added successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to add drawing group');
      console.error('handleSubmit error:', error);
    }
  };

  return (
    <MainLayout title="Add Drawing Group">
      <View className="flex-1 bg-gray-50">
        <ScrollView className="flex-1 px-4 pt-4">
          <View className="mb-4">
            <Text className="text-blue-500 text-sm font-medium mb-2">Group Name</Text>
            <TextInput
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
              placeholder="Enter Group Name"
              placeholderTextColor="#9CA3AF"
              value={formData.groupName}
              onChangeText={(value) => handleInputChange('groupName', value)}
            />
          </View>

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
            <Text className="text-blue-500 text-sm font-medium mb-2">Members (toId)</Text>
            <TouchableOpacity
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
              onPress={() => openModal('toId')}
            >
              <Text className={formData.toId ? 'text-gray-800' : 'text-gray-400'}>
                {formData.toId ? 'Selected' : 'Select Members'}
              </Text>
              <MaterialIcons name="group" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

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

export default AddDrawingGroup;