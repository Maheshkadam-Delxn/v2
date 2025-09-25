import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from 'react-native-vector-icons';
import MainLayout from '../../../../components/MainLayout';

const AddDrawings = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId } = route.params || { projectId: 1 };
  
  const [formData, setFormData] = useState({
    drawingGroup: '',
    title: '',
    drawingNumber: '',
    revision: '',
    category: '',
    drawingStatus: '',
    drawingType: '',
    remark: '',
    description: '',
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');

  // Sample data for dropdowns
  const drawingGroups = ['Architectural', 'Structural', 'MEP', 'Civil', 'Interior'];
  const categories = ['General', 'Structural', 'Electrical', 'Plumbing', 'HVAC'];
  const drawingStatuses = ['Draft', 'Under Review', 'Approved', 'Rejected', 'Final'];
  const drawingTypes = ['Floor Plan', 'Elevation', 'Section', 'Detail', 'Site Plan'];

  const getModalData = () => {
    switch (modalType) {
      case 'drawingGroup':
        return drawingGroups;
      case 'category':
        return categories;
      case 'drawingStatus':
        return drawingStatuses;
      case 'drawingType':
        return drawingTypes;
      default:
        return [];
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  const selectModalValue = (value) => {
    handleInputChange(modalType, value);
    setModalVisible(false);
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter a title for the drawing');
      return;
    }

    // Here you would typically save to your backend/database
    console.log('Saving drawing:', formData);
    
    Alert.alert(
      'Success',
      'Drawing added successfully!',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const addFile = () => {
    Alert.alert('Add File', 'File picker functionality would go here');
  };

  const getPlaceholderText = (type) => {
    switch (type) {
      case 'drawingGroup':
        return 'Select Drawing Group';
      case 'category':
        return 'Select Category';
      case 'drawingStatus':
        return 'Select Drawing Status';
      case 'drawingType':
        return 'Select Drawing Type';
      default:
        return '';
    }
  };

  const getFieldIcon = (type) => {
    switch (type) {
      case 'drawingGroup':
        return 'group';
      case 'title':
        return 'title';
      case 'drawingNumber':
        return 'tag';
      case 'revision':
        return 'content-copy';
      case 'category':
        return 'category';
      case 'drawingStatus':
        return 'flag';
      case 'drawingType':
        return 'engineering';
      default:
        return 'input';
    }
  };

  return (
    <MainLayout title="Drawing">
      <View className="flex-1" style={{ backgroundColor: '#4A90E2' }}>
        {/* Header */}
        {/* <View className="flex-row items-center justify-between px-4 py-4">
          <Text className="text-white text-xl font-bold">Drawing</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View> */}

        <ScrollView className="flex-1 bg-gray-50 px-4 pt-4">
          {/* Drawing Group */}
          <View className="mb-4">
            <Text className="text-blue-500 text-sm font-medium mb-2">Drawing Group</Text>
            <TouchableOpacity
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
              onPress={() => openModal('drawingGroup')}
            >
              <Text className={`${formData.drawingGroup ? 'text-gray-800' : 'text-gray-400'}`}>
                {formData.drawingGroup || 'Select Drawing Group'}
              </Text>
              <MaterialIcons name="group" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Title and Drawing Number Row */}
          <View className="flex-row mb-4" style={{ gap: 12 }}>
            <View className="flex-1">
              <Text className="text-gray-600 text-sm font-medium mb-2">Title</Text>
              <View className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center">
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder=""
                  value={formData.title}
                  onChangeText={(value) => handleInputChange('title', value)}
                />
                <MaterialIcons name="title" size={20} color="#6B7280" />
              </View>
            </View>

            <View className="flex-1">
              <Text className="text-gray-600 text-sm font-medium mb-2">Drawing Number</Text>
              <View className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center">
                <TextInput
                  className="flex-1 text-gray-800"
                  placeholder="№"
                  value={formData.drawingNumber}
                  onChangeText={(value) => handleInputChange('drawingNumber', value)}
                />
              </View>
            </View>
          </View>

          {/* Revision Row */}
          <View className="mb-4">
            <Text className="text-gray-600 text-sm font-medium mb-2">Revision</Text>
            <View className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center">
              <TextInput
                className="flex-1 text-gray-800"
                placeholder=""
                value={formData.revision}
                onChangeText={(value) => handleInputChange('revision', value)}
              />
              <MaterialIcons name="content-copy" size={20} color="#6B7280" />
            </View>
          </View>

          {/* Category and Drawing Status Row */}
          <View className="flex-row mb-4" style={{ gap: 12 }}>
            <View className="flex-1">
              <Text className="text-blue-500 text-sm font-medium mb-2">Category</Text>
              <TouchableOpacity
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                onPress={() => openModal('category')}
              >
                <Text className={`${formData.category ? 'text-gray-800' : 'text-gray-400'}`}>
                  {formData.category || 'Select Category'}
                </Text>
                <MaterialIcons name="category" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View className="flex-1">
              <Text className="text-blue-500 text-sm font-medium mb-2">Drawing Status</Text>
              <TouchableOpacity
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
                onPress={() => openModal('drawingStatus')}
              >
                <Text className={`${formData.drawingStatus ? 'text-gray-800' : 'text-gray-400'}`}>
                  {formData.drawingStatus || 'Select Drawing Status'}
                </Text>
                <MaterialIcons name="flag" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Drawing Type */}
          <View className="mb-4">
            <Text className="text-blue-500 text-sm font-medium mb-2">Drawing Type</Text>
            <TouchableOpacity
              className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row items-center justify-between"
              onPress={() => openModal('drawingType')}
            >
              <Text className={`${formData.drawingType ? 'text-gray-800' : 'text-gray-400'}`}>
                {formData.drawingType || 'Select Drawing Type'}
              </Text>
              <MaterialIcons name="engineering" size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {/* Remark */}
          <View className="mb-4">
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
            <View className="absolute bottom-2 right-2">
              <MaterialIcons name="edit" size={16} color="#6B7280" />
            </View>
          </View>

          {/* Description */}
          <View className="mb-4">
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
            <View className="absolute bottom-2 right-2">
              <MaterialIcons name="edit" size={16} color="#6B7280" />
            </View>
          </View>

          {/* Add File */}
          <TouchableOpacity 
            className="mb-6"
            onPress={addFile}
          >
            <Text className="text-blue-500 text-base font-medium">Add File</Text>
          </TouchableOpacity>

          {/* Submit Button */}
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

        {/* Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-black/50 justify-center items-center p-4">
            <View className="bg-white rounded-lg w-full max-w-sm p-4">
              <View className="flex-row items-center justify-between mb-4 pb-2 border-b border-gray-200">
                <Text className="text-lg font-bold text-gray-800">
                  {modalType.charAt(0).toUpperCase() + modalType.slice(1).replace(/([A-Z])/g, ' $1')}
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <MaterialIcons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 300 }}>
                {getModalData().map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    className="py-3 border-b border-gray-100"
                    onPress={() => selectModalValue(item)}
                  >
                    <Text className="text-gray-800 text-base">{item}</Text>
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