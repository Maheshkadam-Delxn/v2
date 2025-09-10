import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, ScrollView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute } from '@react-navigation/native';
import MainLayout from '../../../components/MainLayout';

// BOQ Item Component
const BoqItem = ({ title, category, type, total, paid, approved }) => {
  return (
    <View className="bg-white p-4 mb-3 rounded-lg shadow-sm border border-gray-200">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-lg font-semibold text-gray-800">{title}</Text>
        <View className={`px-2 py-1 rounded-full ${approved ? 'bg-green-100' : 'bg-yellow-100'}`}>
          <Text className={`text-xs font-medium ${approved ? 'text-green-800' : 'text-yellow-800'}`}>
            {approved ? 'Approved' : 'Pending'}
          </Text>
        </View>
      </View>
      
      <View className="flex-row mb-2">
        <View className="bg-blue-100 px-2 py-1 rounded-full mr-2">
          <Text className="text-xs text-blue-800">{category}</Text>
        </View>
        <View className="bg-purple-100 px-2 py-1 rounded-full">
          <Text className="text-xs text-purple-800">{type}</Text>
        </View>
      </View>
      
      <View className="flex-row justify-between">
        <Text className="text-gray-600">Total/Paid:</Text>
        <Text className="font-medium">{total}/{paid}</Text>
      </View>
    </View>
  );
};

// Main BillOfQuantity Component
export default function BillOfQuantity() {
  const route = useRoute();
  const { projectId } = route.params || { projectId: 1 };
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [phaseName, setPhaseName] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [activeCategories, setActiveCategories] = useState({
    General: true,
    Structural: true,
    Other: true,
    External: true
  });

  // Sample BOQ data
  const boqData = [
    {
      id: 1,
      title: 'General BOQ',
      category: 'General',
      type: 'Fixed',
      total: '145.35 K',
      paid: '151.55 K',
      approved: true
    },
    {
      id: 2,
      title: 'Structural BOQ',
      category: 'Structural',
      type: 'Fixed',
      total: '11.20 K',
      paid: '11.20 K',
      approved: true
    },
    {
      id: 3,
      title: 'Other BOQ',
      category: 'Other',
      type: 'Fixed',
      total: '1.00 B',
      paid: '1.00 B',
      approved: true
    },
    {
      id: 4,
      title: 'External BOQ',
      category: 'External',
      type: 'Fixed',
      total: '105.33 K',
      paid: '22.00 K',
      approved: true
    },
    {
      id: 5,
      title: 'Variable BOQ',
      category: 'External',
      type: 'Variable',
      total: '250.00 K',
      paid: '50.00 K',
      approved: true
    }
  ];

  // Filter data based on active tab
  const filteredData = boqData.filter(item => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  const toggleCategory = (category) => {
    setActiveCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const tabs = ['All', 'General', 'Structural', 'Other', 'External'];

  return (
    <MainLayout title="Bill of Quantity">
      <View className="flex-1 bg-gray-100">
        <StatusBar style="auto" />
        
        {/* Filter Tabs */}
        <View className="bg-blue-100 py-4 border-b border-gray-200 shadow-sm">
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6"
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 8, gap: 16 }}
          >
            {tabs.map(tab => (
              <TouchableOpacity 
                key={tab}
                onPress={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full ${activeTab === tab ? 'bg-blue-600' : 'bg-gray-100'} shadow-sm`}
              >
                <Text className={`font-semibold text-base ${activeTab === tab ? 'text-white' : 'text-gray-600'}`}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        
        {/* Search Bar */}
        <View className="px-6 py-3 bg-white mb-1">
          <View className="bg-gray-100 rounded-lg px-4 py-2 flex-row items-center">
            <Text className="text-gray-400 mr-2">🔍</Text>
            <TextInput
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
              className="flex-1 text-gray-800"
            />
          </View>
        </View>
        
        {/* BOQ List */}
        <ScrollView className="flex-1 px-6 pt-3">
          {filteredData.map(item => (
            <BoqItem
              key={item.id}
              title={item.title}
              category={item.category}
              type={item.type}
              total={item.total}
              paid={item.paid}
              approved={item.approved}
            />
          ))}
        </ScrollView>
        
        {/* Add Button */}
        <TouchableOpacity 
          className="absolute bottom-6 right-6 w-14 h-14 bg-blue-600 rounded-full justify-center items-center shadow-lg"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-white text-2xl">+</Text>
        </TouchableOpacity>
        
        {/* New Phase Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 bg-gray-800 bg-opacity-50 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-6">
              <Text className="text-xl font-bold text-gray-800 mb-6">New Phase</Text>
              
              {/* Phase Name Input */}
              <View className="mb-6">
                <View className="flex-row items-center mb-2">
                  <View className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2"></View>
                  <Text className="text-gray-700">Phase Name</Text>
                </View>
                <TextInput
                  placeholder="Enter phase name"
                  value={phaseName}
                  onChangeText={setPhaseName}
                  className="border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                />
              </View>
              
              {/* Add Button */}
              <TouchableOpacity className="flex-row items-center mb-8">
                <View className="w-5 h-5 rounded-full border-2 border-gray-300 mr-2 items-center justify-center">
                  <View className="w-3 h-0.5 bg-gray-400"></View>
                  <View className="w-0.5 h-3 bg-gray-400 absolute"></View>
                </View>
                <Text className="text-gray-700">Add</Text>
              </TouchableOpacity>
              
              <View className="h-px bg-gray-200 mb-6"></View>
              
              <Text className="font-semibold text-gray-800 mb-4">Phase List</Text>
              
              <View className="h-px bg-gray-200 mb-6"></View>
              
              <Text className="font-semibold text-gray-800 mb-4">Update Sequence</Text>
              
              {/* Category Toggles */}
              {Object.entries(activeCategories).map(([category, isActive]) => (
                <View key={category} className="flex-row justify-between items-center py-3 border-b border-gray-100">
                  <Text className="text-gray-700">{category}</Text>
                  <View className="flex-row items-center">
                    <Text className={`mr-3 ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
                      {isActive ? 'Active' : 'Inactive'}
                    </Text>
                    <Switch
                      value={isActive}
                      onValueChange={() => toggleCategory(category)}
                      trackColor={{ false: '#f3f4f6', true: '#dbeafe' }}
                      thumbColor={isActive ? '#3b82f6' : '#f3f4f6'}
                    />
                  </View>
                </View>
              ))}
              
              {/* Modal Actions */}
              <View className="flex-row justify-end mt-8">
                <TouchableOpacity 
                  className="px-5 py-2 rounded-lg mr-3"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="bg-blue-600 px-5 py-2 rounded-lg"
                  onPress={() => setModalVisible(false)}
                >
                  <Text className="text-white">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout> 
  );
}