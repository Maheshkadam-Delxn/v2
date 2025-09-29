import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MainLayout from '../../../components/MainLayout';
import { LinearGradient } from 'expo-linear-gradient';
import * as DocumentPicker from 'expo-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const BASE_URL = 'https://api-v2-skystruct.prudenttec.com/';
const MENU_ID = 'DRlBbUjgXSb';

const DrawingImage = ({ url }) => (
  <Image
    source={{ uri: url || 'https://via.placeholder.com/200x300' }}
    className="w-1/2 h-60 rounded-lg"
    resizeMode="cover"
  />
);

const ActionButton = ({ iconName, onPress }) => (
  <TouchableOpacity 
    className="w-10 h-10 rounded-full justify-center items-center mx-1"
    style={{ backgroundColor: '#3b82f6' }}
    onPress={onPress}
  >
    <MaterialIcons name={iconName} size={24} color="#ffffff" />
  </TouchableOpacity>
);

export default function DrawingScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params || { projectId: 1 };
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [editForm, setEditForm] = useState({
    autoId: '',
    description: '',
    docVersion: '',
    drawingGroupId: '',
    drawingName: '',
    drawingNumber: '',
    drawingStatus: '',
    drawingType: '',
    phaseId: '',
    remark: '',
    fileUrl: '',
    fileName: '',
    addedBy: '',
    file: null,
  });
  const [filterForm, setFilterForm] = useState({
    startDate: '',
    endDate: '',
    category: '',
    id: '',
    status: '',
  });
  const [selectedPhases, setSelectedPhases] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [drawings, setDrawings] = useState([]);
  const [phases, setPhases] = useState([]);
  const [groups, setGroups] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [types, setTypes] = useState([]);
  const [tabs, setTabs] = useState([{ id: 'all', name: 'All' }]);
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
      fetchDropdowns();
      fetchDrawings();
    }
  }, [jwtToken]);

  useEffect(() => {
    if (phases.length > 0) {
      fetchAllGroups();
    }
  }, [phases, jwtToken]);

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
      const phaseList = Array.isArray(data.phaseFormBeans) ? data.phaseFormBeans : [];
      setPhases(phaseList.map(p => ({ id: p.autoId, name: p.phaseName })));
      setTabs([{ id: 'all', name: 'All' }, ...phaseList.map(p => ({ id: p.autoId, name: p.phaseName }))]);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch phases');
      console.error('fetchPhases error:', error);
      setPhases([]);
      setTabs([{ id: 'all', name: 'All' }]);
    }
  };

  const fetchDropdowns = async () => {
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
      Alert.alert('Error', 'Failed to fetch dropdowns');
      console.error('fetchDropdowns error:', error);
      setStatuses([]);
      setTypes([]);
    }
  };

  const fetchAllGroups = async () => {
    if (!jwtToken || phases.length === 0) return;
    try {
      let allG = [];
      for (const phase of phases) {
        const response = await fetch(`${BASE_URL}drawing-group/drawing-group-list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            'X-Menu-Id': MENU_ID,
          },
          body: JSON.stringify({ category: phase.id }),
        });
        if (!response.ok) continue;
        const data = await response.json();
        updateToken(data.jwtToken);
        if (Array.isArray(data.drawingGroupFormBeans)) {
          allG = [...allG, ...data.drawingGroupFormBeans];
        }
      }
      const uniqueGroups = [...new Map(allG.map(g => [g.autoId, g])).values()];
      setAllGroups(uniqueGroups.map(g => ({ id: g.autoId, name: g.groupName })));
    } catch (error) {
      console.error('fetchAllGroups error:', error);
      setAllGroups([]);
    }
  };

  const fetchGroups = async (phaseId) => {
    console.log('Fetching groups for phaseId:', phaseId);
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

  const fetchDrawings = async (filters = {}) => {
    console.log('Fetching drawings with filters:', filters);
    if (!jwtToken) return;
    try {
      const body = {
        startDate: filters.startDate || '',
        endDate: filters.endDate || '',
        category: filters.category || '',
        id: filters.id || '',
        status: filters.status || '',
      };
      const response = await fetch(`${BASE_URL}drawing/get-drawing-filter-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('fetchDrawings data:', data);
      updateToken(data.jwtToken);
      const drawingsArray = Array.isArray(data.drawingFormBeans) ? data.drawingFormBeans : [];
      setDrawings(drawingsArray);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch drawings');
      console.error('fetchDrawings error:', error);
      setDrawings([]);
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId !== 'all') {
      const phase = phases.find(p => p.id === tabId);
      if (phase) {
        fetchDrawings({ category: phase.id });
      }
    } else {
      fetchDrawings();
    }
  };

  const handleApplyFilter = () => {
    setFilterForm({
      ...filterForm,
      category: selectedPhases.join(','),
      id: selectedGroups.join(','),
      status: selectedStatuses.join(','),
    });
    fetchDrawings(filterForm);
    setFilterModalVisible(false);
  };

  // const toggleSelection = (item) => {
  //   let setSelected;
  //   switch (modalType) {
  //     case 'filterPhase':
  //       setSelected = setSelectedPhases;
  //       break;
  //     case 'filterGroup':
  //       setSelected = setSelectedGroups;
  //       break;
  //     case 'filterStatus':
  //       setSelected = setSelectedStatuses;
  //       break;
  //     default:
  //       return;
  //   }
  //   setSelected(prev => {
  //     if (prev.includes(item.id)) {
  //       return prev.filter(i => i !== item.id);
  //     } else {
  //       return [...prev, item.id];
  //     }
  //   });
  // };

  const handleEdit = () => {
    if (selectedDrawing) {
      setEditForm({
        autoId: selectedDrawing.autoId || '',
        description: selectedDrawing.description || '',
        docVersion: selectedDrawing.docVersion || '',
        drawingGroupId: selectedDrawing.drawingGroupId || '',
        drawingName: selectedDrawing.drawingName || '',
        drawingNumber: selectedDrawing.drawingNumber || '',
        drawingStatus: selectedDrawing.drawingStatus || '',
        drawingType: selectedDrawing.drawingType || '',
        phaseId: selectedDrawing.phaseId || '',
        remark: selectedDrawing.remark || '',
        fileUrl: selectedDrawing.fileUrl || '',
        fileName: selectedDrawing.fileName || '',
        addedBy: selectedDrawing.addedBy || '',
        file: null,
      });
      if (selectedDrawing.phaseId) {
        fetchGroups(selectedDrawing.phaseId);
      }
      setEditModalVisible(true);
    }
  };

  const handleSaveEdit = async () => {
    if (!jwtToken) {
      Alert.alert('Error', 'Authentication token missing');
      return;
    }
    if (!editForm.drawingName || !editForm.phaseId || !editForm.drawingGroupId) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    const fd = new FormData();
    if (editForm.file) {
      fd.append('file', {
        uri: editForm.file.uri,
        name: editForm.file.name,
        type: editForm.file.mimeType || 'application/octet-stream',
      });
    }
    fd.append('formData', JSON.stringify({
      autoId: editForm.autoId,
      description: editForm.description,
      docVersion: editForm.docVersion,
      drawingGroupId: editForm.drawingGroupId,
      drawingName: editForm.drawingName,
      drawingNumber: editForm.drawingNumber,
      drawingStatus: editForm.drawingStatus,
      drawingType: editForm.drawingType,
      phaseId: editForm.phaseId,
      remark: editForm.remark,
      fileUrl: editForm.fileUrl,
      fileName: editForm.fileName,
      addedBy: editForm.addedBy,
    }));

    try {
      const response = await fetch(`${BASE_URL}drawing`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: fd,
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      Alert.alert('Success', 'Drawing updated successfully!');
      setEditModalVisible(false);
      fetchDrawings();
    } catch (error) {
      Alert.alert('Error', 'Failed to update drawing');
      console.error('handleSaveEdit error:', error);
    }
  };

  const handleDelete = async () => {
    if (!jwtToken || !selectedDrawing) {
      Alert.alert('Error', 'No drawing selected or authentication token missing');
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}drawing/${selectedDrawing.autoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      Alert.alert('Success', 'Drawing deleted successfully!');
      fetchDrawings();
      setSelectedDrawing(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete drawing');
      console.error('handleDelete error:', error);
    }
  };

  const handleDownload = async () => {
    if (!selectedDrawing?.fileUrl) {
      Alert.alert('Error', 'No file to download');
      return;
    }
    console.log('Download file from:', selectedDrawing.fileUrl);
    // Implement download logic using expo-file-system or Linking
  };

  const filteredDrawings = Array.isArray(drawings) ? drawings.filter(d => d.drawingName?.toLowerCase().includes(searchText.toLowerCase())) : [];

  const showImage1 = filteredDrawings.length > 0 ? filteredDrawings[0].fileUrl : null;
  const showImage2 = filteredDrawings.length > 1 ? filteredDrawings[1].fileUrl : null;

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
      case 'filterPhase':
        return phases;
      case 'filterGroup':
        return allGroups;
      case 'filterStatus':
        return statuses;
      default:
        return [];
    }
  };

  const isMultiSelect = modalType.startsWith('filter');

  const toggleSelection = (item) => {
    let setSelected;
    switch (modalType) {
      case 'filterPhase':
        setSelected = setSelectedPhases;
        break;
      case 'filterGroup':
        setSelected = setSelectedGroups;
        break;
      case 'filterStatus':
        setSelected = setSelectedStatuses;
        break;
      default:
        return;
    }
    setSelected(prev => {
      if (prev.includes(item.id)) {
        return prev.filter(i => i !== item.id);
      } else {
        return [...prev, item.id];
      }
    });
  };

  const selectModalValue = (item) => {
    let field;
    switch (modalType) {
      case 'phaseId':
        field = 'phaseId';
        break;
      case 'drawingGroupId':
        field = 'drawingGroupId';
        break;
      case 'drawingStatus':
        field = 'drawingStatus';
        break;
      case 'drawingType':
        field = 'drawingType';
        break;
      default:
        return;
    }
    setEditForm(prev => ({ ...prev, [field]: item.id }));
    if (field === 'phaseId') {
      fetchGroups(item.id);
      setEditForm(prev => ({ ...prev, drawingGroupId: '' }));
    }
    setModalVisible(false);
  };

  const getSelected = () => {
    switch (modalType) {
      case 'filterPhase':
        return selectedPhases;
      case 'filterGroup':
        return selectedGroups;
      case 'filterStatus':
        return selectedStatuses;
      default:
        return [];
    }
  };

  const getSelectedNames = (selectedIds, items) => {
    return selectedIds.map(id => items.find(item => item.id === id)?.name).filter(Boolean).join(', ') || 'Select';
  };

  const handleCloseMultiSelect = () => {
    setModalVisible(false);
  };

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(Platform.OS === 'ios');
    setFilterForm({ ...filterForm, startDate: currentDate.toISOString().split('T')[0] });
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(Platform.OS === 'ios');
    setFilterForm({ ...filterForm, endDate: currentDate.toISOString().split('T')[0] });
  };

  return (
    <MainLayout title="Drawing">
      <View className="flex-1 bg-white">
        <LinearGradient
          colors={['#f0f7ff', '#e6f0ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="py-4"
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6"
            contentContainerStyle={{ paddingHorizontal: 8, gap: 8 }}
          >
            {tabs.map(tab => (
              <TouchableOpacity
                key={tab.id}
                onPress={() => handleTabChange(tab.id)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 9999,
                  backgroundColor: activeTab === tab.id ? '#3b82f6' : '#ffffff',
                }}
              >
                <Text
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    color: activeTab === tab.id ? '#ffffff' : '#2563eb',
                  }}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 8,
                backgroundColor: '#3b82f6',
                borderRadius: 9999,
              }}
              onPress={() => setFilterModalVisible(true)}
            >
              <MaterialIcons name="filter-list" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 8,
                backgroundColor: '#3b82f6',
                borderRadius: 9999,
              }}
              onPress={handleDownload}
            >
              <MaterialIcons name="file-download" size={24} color="#ffffff" />
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>

        <View className="px-6 py-3 bg-white">
          <View className="flex-row items-center mb-3">
            <View className="flex-1 bg-blue-50 rounded-lg px-4 py-2 flex-row items-center">
              <MaterialIcons name="search" size={20} color="#3b82f6" className="mr-2" />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                className="flex-1 text-blue-800"
                placeholderTextColor="#93C5FD"
                placeholder="Search drawings..."
              />
            </View>
          </View>

          <View className="flex-row items-center justify-between mb-3">
            <TouchableOpacity 
              className="flex-1 px-4 py-3 rounded-lg mr-2 flex-row items-center justify-center"
              style={{ backgroundColor: '#3b82f6' }}
              onPress={() => navigation.navigate('AddDrawing', { projectId })}
            >
              <MaterialIcons name="add" size={20} color="#ffffff" className="mr-1" />
              <Text className="text-white font-semibold ml-1">Add Drawing</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 px-4 py-3 rounded-lg ml-2 flex-row items-center justify-center"
              style={{ backgroundColor: '#34c759' }}
              onPress={() => navigation.navigate('AddDrawingPhase', { projectId })}
            >
              <MaterialIcons name="timeline" size={20} color="#ffffff" className="mr-1" />
              <Text className="text-white font-semibold ml-1">Add Phase</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            className="px-4 py-3 rounded-lg flex-row items-center justify-center"
            style={{ backgroundColor: '#f59e0b' }}
            onPress={() => navigation.navigate('AddDrawingGroup', { projectId })}
          >
            <MaterialIcons name="group-add" size={20} color="#ffffff" className="mr-1" />
            <Text className="text-white font-semibold ml-1">Add Drawing Group</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            className="mt-3 px-4 py-3 rounded-lg border-2 border-blue-200"
            style={{ backgroundColor: '#f8fafc' }}
            onPress={() => setDropdownVisible(true)}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-blue-800 font-medium">
                {selectedDrawing ? selectedDrawing.drawingName : 'Select a Drawing'}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#3b82f6" />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 px-6 pt-4">
          <View className="flex-row justify-between mb-6">
            {showImage1 && <DrawingImage url={showImage1} />}
            {showImage2 && <DrawingImage url={showImage2} />}
            {!showImage1 && !showImage2 && (
              <View className="w-full bg-blue-50 rounded-lg p-8 items-center">
                <MaterialIcons name="image" size={48} color="#93C5FD" />
                <Text className="text-blue-600 text-center mt-2 font-medium">
                  No drawings available for this filter
                </Text>
                <Text className="text-blue-400 text-center mt-1 text-sm">
                  Try adjusting your filters or add a new drawing
                </Text>
              </View>
            )}
          </View>

          {selectedDrawing && (
            <View className="bg-blue-50 rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="description" size={20} color="#3b82f6" />
                <Text className="text-blue-800 font-bold text-lg ml-2">{selectedDrawing.drawingName}</Text>
              </View>
              <Text className="text-blue-600 mb-1">
                <Text className="font-medium">Description:</Text> {selectedDrawing.description || 'N/A'}
              </Text>
              <Text className="text-blue-600 mb-1">
                <Text className="font-medium">Phase:</Text> {phases.find(p => p.id === selectedDrawing.phaseId)?.name || selectedDrawing.phaseId || 'N/A'}
              </Text>
              <Text className="text-blue-600 mb-1">
                <Text className="font-medium">Group:</Text> {groups.find(g => g.id === selectedDrawing.drawingGroupId)?.name || selectedDrawing.drawingGroupId || 'N/A'}
              </Text>
              <Text className="text-blue-600">
                <Text className="font-medium">Status:</Text> {statuses.find(s => s.id === selectedDrawing.drawingStatus)?.name || selectedDrawing.drawingStatus || 'N/A'}
              </Text>
            </View>
          )}
        </ScrollView>

        <View className="flex-row justify-center px-6 py-4 bg-white border-t border-blue-100">
          <View className="flex-row">
            <ActionButton iconName="edit" onPress={handleEdit} />
            <ActionButton iconName="people" onPress={() => {}} />
            <ActionButton iconName="delete" onPress={handleDelete} />
            <ActionButton iconName="file-download" onPress={handleDownload} />
            <ActionButton iconName="share" onPress={() => {}} />
          </View>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View className="flex-1 bg-blue-800/30 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-6">
              <View className="flex-row items-center mb-6">
                <MaterialIcons name="edit" size={24} color="#3b82f6" />
                <Text className="text-xl font-bold text-blue-800 ml-2">Edit Drawing</Text>
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Drawing Name</Text>
                <TextInput
                  value={editForm.drawingName}
                  onChangeText={text => setEditForm({ ...editForm, drawingName: text })}
                  className="border border-blue-200 rounded-lg px-4 py-3 text-blue-800"
                  placeholder="Enter drawing name"
                />
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Drawing Number</Text>
                <TextInput
                  value={editForm.drawingNumber}
                  onChangeText={text => setEditForm({ ...editForm, drawingNumber: text })}
                  className="border border-blue-200 rounded-lg px-4 py-3 text-blue-800"
                  placeholder="Enter drawing number"
                />
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Doc Version</Text>
                <TextInput
                  value={editForm.docVersion}
                  onChangeText={text => setEditForm({ ...editForm, docVersion: text })}
                  className="border border-blue-200 rounded-lg px-4 py-3 text-blue-800"
                  placeholder="Enter doc version"
                />
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Phase</Text>
                <TouchableOpacity
                  className="border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                  onPress={() => {
                    setModalType('phaseId');
                    setModalVisible(true);
                  }}
                >
                  <Text className={editForm.phaseId ? 'text-blue-800' : 'text-gray-400'}>
                    {phases.find(p => p.id === editForm.phaseId)?.name || 'Select Phase'}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={24} color="#3b82f6" />
                </TouchableOpacity>
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Drawing Group</Text>
                <TouchableOpacity
                  className="border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                  onPress={() => {
                    if (!editForm.phaseId) {
                      Alert.alert('Error', 'Please select a phase first');
                      return;
                    }
                    fetchGroups(editForm.phaseId);
                    setModalType('drawingGroupId');
                    setModalVisible(true);
                  }}
                >
                  <Text className={editForm.drawingGroupId ? 'text-blue-800' : 'text-gray-400'}>
                    {groups.find(g => g.id === editForm.drawingGroupId)?.name || 'Select Drawing Group'}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={24} color="#3b82f6" />
                </TouchableOpacity>
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Drawing Status</Text>
                <TouchableOpacity
                  className="border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                  onPress={() => {
                    setModalType('drawingStatus');
                    setModalVisible(true);
                  }}
                >
                  <Text className={editForm.drawingStatus ? 'text-blue-800' : 'text-gray-400'}>
                    {statuses.find(s => s.id === editForm.drawingStatus)?.name || 'Select Status'}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={24} color="#3b82f6" />
                </TouchableOpacity>
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Drawing Type</Text>
                <TouchableOpacity
                  className="border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                  onPress={() => {
                    setModalType('drawingType');
                    setModalVisible(true);
                  }}
                >
                  <Text className={editForm.drawingType ? 'text-blue-800' : 'text-gray-400'}>
                    {types.find(t => t.id === editForm.drawingType)?.name || 'Select Type'}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={24} color="#3b82f6" />
                </TouchableOpacity>
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Description</Text>
                <TextInput
                  value={editForm.description}
                  onChangeText={text => setEditForm({ ...editForm, description: text })}
                  className="border border-blue-200 rounded-lg px-4 py-3 text-blue-800"
                  placeholder="Enter description"
                  multiline
                />
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Remark</Text>
                <TextInput
                  value={editForm.remark}
                  onChangeText={text => setEditForm({ ...editForm, remark: text })}
                  className="border border-blue-200 rounded-lg px-4 py-3 text-blue-800"
                  placeholder="Enter remark"
                  multiline
                />
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Upload File</Text>
                <TouchableOpacity
                  className="border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                  onPress={async () => {
                    try {
                      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
                      if (!result.canceled && result.assets && result.assets.length > 0) {
                        setEditForm({ ...editForm, file: result.assets[0] });
                      }
                    } catch (error) {
                      Alert.alert('Error', 'Failed to pick file');
                      console.error('pickFile error:', error);
                    }
                  }}
                >
                  <Text className={editForm.file ? 'text-blue-800' : 'text-gray-400'}>
                    {editForm.file ? editForm.file.name : 'Select File'}
                  </Text>
                  <MaterialIcons name="upload-file" size={24} color="#3b82f6" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  className="px-6 py-3 rounded-lg mr-3"
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text className="text-blue-600 font-medium">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-6 py-3 rounded-lg"
                  style={{ backgroundColor: '#3b82f6' }}
                  onPress={handleSaveEdit}
                >
                  <Text className="text-white font-medium">Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={dropdownVisible}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <View className="flex-1 bg-blue-800/30 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-4 max-h-80">
              <View className="flex-row items-center justify-between mb-4 pb-2 border-b border-blue-100">
                <Text className="text-lg font-bold text-blue-800">Select Drawing</Text>
                <TouchableOpacity onPress={() => setDropdownVisible(false)}>
                  <MaterialIcons name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {filteredDrawings.map(drawing => (
                  <TouchableOpacity
                    key={drawing.autoId}
                    className="py-3 border-b border-blue-50 flex-row items-center"
                    onPress={() => {
                      setSelectedDrawing(drawing);
                      setDropdownVisible(false);
                    }}
                  >
                    <MaterialIcons name="description" size={20} color="#3b82f6" />
                    <View className="ml-3 flex-1">
                      <Text className="text-blue-800 font-medium">{drawing.drawingName}</Text>
                      <Text className="text-blue-600 text-sm">{drawing.description || 'N/A'}</Text>
                      <Text className="text-blue-400 text-xs">
                        {phases.find(p => p.id === drawing.phaseId)?.name || drawing.phaseId || 'N/A'} • 
                        {types.find(t => t.id === drawing.drawingType)?.name || drawing.drawingType || 'N/A'}
                      </Text>
                    </View>
                    {selectedDrawing?.autoId === drawing.autoId && (
                      <MaterialIcons name="check-circle" size={20} color="#34c759" />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View className="flex-1 bg-blue-800/30 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-6">
              <View className="flex-row items-center mb-6">
                <MaterialIcons name="filter-list" size={24} color="#3b82f6" />
                <Text className="text-xl font-bold text-blue-800 ml-2">Filter Drawings</Text>
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Start Date</Text>
                <TouchableOpacity
                  className="border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                  onPress={() => setShowStartDatePicker(true)}
                >
                  <Text className="text-blue-800">{filterForm.startDate || 'Select Start Date'}</Text>
                  <MaterialIcons name="calendar-today" size={24} color="#3b82f6" />
                </TouchableOpacity>
                {showStartDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={handleStartDateChange}
                  />
                )}
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">End Date</Text>
                <TouchableOpacity
                  className="border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                  onPress={() => setShowEndDatePicker(true)}
                >
                  <Text className="text-blue-800">{filterForm.endDate || 'Select End Date'}</Text>
                  <MaterialIcons name="calendar-today" size={24} color="#3b82f6" />
                </TouchableOpacity>
                {showEndDatePicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={handleEndDateChange}
                  />
                )}
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Phases</Text>
                <TouchableOpacity
                  className="border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                  onPress={() => {
                    setModalType('filterPhase');
                    setModalVisible(true);
                  }}
                >
                  <Text className={selectedPhases.length > 0 ? 'text-blue-800' : 'text-gray-400'}>
                    {getSelectedNames(selectedPhases, phases) || 'Select Phases'}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={24} color="#3b82f6" />
                </TouchableOpacity>
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Groups</Text>
                <TouchableOpacity
                  className="border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                  onPress={() => {
                    setModalType('filterGroup');
                    setModalVisible(true);
                  }}
                >
                  <Text className={selectedGroups.length > 0 ? 'text-blue-800' : 'text-gray-400'}>
                    {getSelectedNames(selectedGroups, allGroups) || 'Select Groups'}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={24} color="#3b82f6" />
                </TouchableOpacity>
              </View>
              <View className="mb-6">
                <Text className="text-blue-700 mb-2 font-medium">Statuses</Text>
                <TouchableOpacity
                  className="border border-blue-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                  onPress={() => {
                    setModalType('filterStatus');
                    setModalVisible(true);
                  }}
                >
                  <Text className={selectedStatuses.length > 0 ? 'text-blue-800' : 'text-gray-400'}>
                    {getSelectedNames(selectedStatuses, statuses) || 'Select Statuses'}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={24} color="#3b82f6" />
                </TouchableOpacity>
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  className="px-6 py-3 rounded-lg mr-3"
                  onPress={() => setFilterModalVisible(false)}
                >
                  <Text className="text-blue-600 font-medium">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-6 py-3 rounded-lg"
                  style={{ backgroundColor: '#3b82f6' }}
                  onPress={handleApplyFilter}
                >
                  <Text className="text-white font-medium">Apply Filter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
                  Select {modalType.replace('filter', '').replace(/([A-Z])/g, ' $1').trim()}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 300 }}>
                {getModalData().map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    className="py-3 border-b border-gray-100 flex-row items-center"
                    onPress={() => {
                      if (isMultiSelect) {
                        toggleSelection(item);
                      } else {
                        selectModalValue(item);
                      }
                    }}
                  >
                    <Text className="text-gray-800 text-base flex-1">{item.name}</Text>
                    {isMultiSelect && getSelected().includes(item.id) && (
                      <MaterialIcons name="check-circle" size={20} color="#34c759" />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
              {isMultiSelect && (
                <View className="flex-row justify-end mt-4">
                  <TouchableOpacity
                    className="px-6 py-3 rounded-lg"
                    style={{ backgroundColor: '#4A90E2' }}
                    onPress={handleCloseMultiSelect}
                  >
                    <Text className="text-white font-medium">Done</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout>
  );
}