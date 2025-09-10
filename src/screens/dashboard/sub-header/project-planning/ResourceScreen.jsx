import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Modal, Pressable } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Resource data
const labourData = [
  { id: 1, designation: 'Labour', hourCost: 123, dailyCost: 2133, monthlyCost: 45200 },
  { id: 2, designation: 'Supervisor', hourCost: 200, dailyCost: 4000, monthlyCost: 45000 },
];

const materialData = [
  { id: 1, title: 'Cement layout', area: '10 Sq.Ft', cost: 177500, materials: 1 },
  { id: 2, title: 'Steel Frame', area: '5 Sq.Ft', cost: 29380, materials: 1 },
  { id: 3, title: 'Bricks Form', area: '50 Sq.Ft', cost: 71583, materials: 1 },
  { id: 4, title: 'Earth Leveling', area: '2 Sq.Ft', cost: 26810, materials: 2 },
];

const nonLabourData = [
  { id: 1, title: 'Excavator', resourceId: 'RESC-00001', hourCost: 1251, dailyCost: 50000 },
];

// Tabs
const tabs = [
  { key: 'Labour', label: 'Labour', icon: 'account-hard-hat' },
  { key: 'Material', label: 'Materials', icon: 'cube' },
  { key: 'NonLabour', label: 'Equipment', icon: 'excavator' },
];

// Format currency with commas
const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ResourceScreen() {
  const [activeTab, setActiveTab] = useState('Labour');
  const [search, setSearch] = useState('');
  const [showLabourForm, setShowLabourForm] = useState(false);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [showEquipmentForm, setShowEquipmentForm] = useState(false);
  
  // Form states
  const [designation, setDesignation] = useState('');
  const [hourCost, setHourCost] = useState('');
  const [dailyCost, setDailyCost] = useState('');
  const [monthlyCost, setMonthlyCost] = useState('');
  
  const [materialTitle, setMaterialTitle] = useState('');
  const [unit, setUnit] = useState('');
  const [area, setArea] = useState('');
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  
  const [equipTitle, setEquipTitle] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [equipHourCost, setEquipHourCost] = useState('');
  const [equipDailyCost, setEquipDailyCost] = useState('');
  const [equipMonthlyCost, setEquipMonthlyCost] = useState('');

  // Filter functions
  const getFiltered = (data) => {
    if (!search) return data;
    return data.filter(item =>
      (item.designation || item.title || '').toLowerCase().includes(search.toLowerCase())
    );
  };

  // Get current data based on active tab
  const getCurrentData = () => {
    switch(activeTab) {
      case 'Labour': return getFiltered(labourData);
      case 'Material': return getFiltered(materialData);
      case 'NonLabour': return getFiltered(nonLabourData);
      default: return [];
    }
  };

  // Handle add button press
  const handleAddPress = () => {
    if (activeTab === 'Labour') {
      setShowLabourForm(true);
    } else if (activeTab === 'Material') {
      setShowMaterialForm(true);
    } else {
      setShowEquipmentForm(true);
    }
  };

  // Reset all form states
  const resetForms = () => {
    setDesignation('');
    setHourCost('');
    setDailyCost('');
    setMonthlyCost('');
    
    setMaterialTitle('');
    setUnit('');
    setArea('');
    setMaterial('');
    setQuantity('');
    setPrice('');
    
    setEquipTitle('');
    setResourceId('');
    setEquipHourCost('');
    setEquipDailyCost('');
    setEquipMonthlyCost('');
  };

  // Submit handlers
  const submitLabourForm = () => {
    // Here you would typically add to your data array or make an API call
    console.log('Adding labour:', { designation, hourCost, dailyCost, monthlyCost });
    setShowLabourForm(false);
    resetForms();
  };

  const submitMaterialForm = () => {
    // Here you would typically add to your data array or make an API call
    console.log('Adding material:', { materialTitle, unit, area, material, quantity, price });
    setShowMaterialForm(false);
    resetForms();
  };

  const submitEquipmentForm = () => {
    // Here you would typically add to your data array or make an API call
    console.log('Adding equipment:', { equipTitle, resourceId, equipHourCost, equipDailyCost, equipMonthlyCost });
    setShowEquipmentForm(false);
    resetForms();
  };

  // Render appropriate card based on active tab
  const renderCard = ({ item }) => {
    if (activeTab === 'Labour') {
      return (
        <View className="bg-white rounded-lg mb-3 shadow-sm border border-gray-100 p-4">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <View className="bg-blue-100 p-1.5 rounded-full mr-2">
                <Icon name="account" size={16} color="#3B82F6" />
              </View>
              <Text className="text-base font-semibold text-gray-800">{item.designation}</Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity className="bg-blue-50 p-1.5 mr-2 rounded-md">
                <Icon name="pencil-outline" size={16} color="#3B82F6" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-50 p-1.5 rounded-md">
                <Icon name="delete-outline" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="flex-row justify-between">
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Hourly</Text>
              <Text className="text-sm font-medium text-gray-800">₹{formatCurrency(item.hourCost)}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Daily</Text>
              <Text className="text-sm font-medium text-gray-800">₹{formatCurrency(item.dailyCost)}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Monthly</Text>
              <Text className="text-sm font-medium text-gray-800">₹{formatCurrency(item.monthlyCost)}</Text>
            </View>
          </View>
        </View>
      );
    } else if (activeTab === 'Material') {
      return (
        <View className="bg-white rounded-lg mb-3 shadow-sm border border-gray-100 p-4">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <View className="bg-green-100 p-1.5 rounded-full mr-2">
                <Icon name="cube" size={16} color="#10B981" />
              </View>
              <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
            </View>
            <View className="flex-row">
              <TouchableOpacity className="bg-blue-50 p-1.5 mr-2 rounded-md">
                <Icon name="pencil-outline" size={16} color="#3B82F6" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-50 p-1.5 rounded-md">
                <Icon name="delete-outline" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="flex-row justify-between">
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Area</Text>
              <Text className="text-sm font-medium text-gray-800">{item.area}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Cost</Text>
              <Text className="text-sm font-medium text-gray-800">₹{formatCurrency(item.cost)}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Materials</Text>
              <Text className="text-sm font-medium text-gray-800">{item.materials}</Text>
            </View>
          </View>
        </View>
      );
    } else {
      return (
        <View className="bg-white rounded-lg mb-3 shadow-sm border border-gray-100 p-4">
          <View className="flex-row justify-between items-center mb-2">
            <View className="flex-row items-center">
              <View className="bg-purple-100 p-1.5 rounded-full mr-2">
                <Icon name="tools" size={16} color="#8B5CF6" />
              </View>
              <View>
                <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
                <Text className="text-xs text-gray-500">{item.resourceId}</Text>
              </View>
            </View>
            <View className="flex-row">
              <TouchableOpacity className="bg-blue-50 p-1.5 mr-2 rounded-md">
                <Icon name="pencil-outline" size={16} color="#3B82F6" />
              </TouchableOpacity>
              <TouchableOpacity className="bg-red-50 p-1.5 rounded-md">
                <Icon name="delete-outline" size={16} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View className="flex-row justify-between">
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Hourly</Text>
              <Text className="text-sm font-medium text-gray-800">₹{formatCurrency(item.hourCost)}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Daily</Text>
              <Text className="text-sm font-medium text-gray-800">₹{formatCurrency(item.dailyCost)}</Text>
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <MainLayout title="Resources">
      <View className="flex-1 bg-gray-50">
        {/* Tabs - Compact horizontal layout */}
        <View className="flex-row justify-between border-b border-gray-200 bg-white px-2">
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              className={`flex-1 flex-row items-center justify-center py-3 mx-1 ${activeTab === tab.key ? 'border-b-2 border-blue-500' : ''}`}
              onPress={() => setActiveTab(tab.key)}
            >
              <Icon 
                name={tab.icon} 
                size={16} 
                color={activeTab === tab.key ? '#3B82F6' : '#6B7280'} 
                style={{ marginRight: 4 }}
              />
              <Text className={`text-sm ${activeTab === tab.key ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Header with Search and Add Button */}
        <View className="flex-row items-center p-3 bg-white border-b border-gray-100">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-1.5">
            <Icon name="magnify" size={18} color="#6B7280" style={{ marginRight: 6 }} />
            <TextInput
              className="flex-1 text-gray-800 text-sm"
              placeholder="Search resources..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <TouchableOpacity 
            className="ml-2 bg-blue-600 p-2.5 rounded-full shadow-sm"
            onPress={handleAddPress}
          >
            <Icon name="plus" size={18} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Resource Cards */}
        <View className="flex-1 p-3">
          <FlatList
            data={getCurrentData()}
            keyExtractor={item => item.id.toString()}
            renderItem={renderCard}
            ListEmptyComponent={
              <View className="items-center justify-center py-6">
                <Icon name="database-search" size={32} color="#D1D5DB" />
                <Text className="text-gray-500 mt-1 text-sm">No resources found</Text>
              </View>
            }
          />
        </View>

        {/* Labour Form Modal */}
        <Modal
          visible={showLabourForm}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowLabourForm(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/70">
            <View className="bg-white rounded-lg p-5 w-11/12 max-w-md">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">Add Labour</Text>
                <Pressable onPress={() => setShowLabourForm(false)}>
                  <Icon name="close" size={24} color="#6B7280" />
                </Pressable>
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Designation</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={designation}
                  onChangeText={setDesignation}
                  placeholder="Enter designation"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Hour Cost</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={hourCost}
                  onChangeText={setHourCost}
                  placeholder="Enter hour cost"
                  keyboardType="numeric"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Daily Cost</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={dailyCost}
                  onChangeText={setDailyCost}
                  placeholder="Enter daily cost"
                  keyboardType="numeric"
                />
              </View>
              
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-1">Monthly Cost</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={monthlyCost}
                  onChangeText={setMonthlyCost}
                  placeholder="Enter monthly cost"
                  keyboardType="numeric"
                />
              </View>
              
              <TouchableOpacity 
                className="bg-blue-600 py-3 rounded-lg"
                onPress={submitLabourForm}
              >
                <Text className="text-white text-center font-semibold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Material Form Modal */}
        <Modal
          visible={showMaterialForm}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowMaterialForm(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/70">
            <View className="bg-white rounded-lg p-5 w-11/12 max-w-md">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">Add Material Formulation</Text>
                <Pressable onPress={() => setShowMaterialForm(false)}>
                  <Icon name="close" size={24} color="#6B7280" />
                </Pressable>
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Title</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={materialTitle}
                  onChangeText={setMaterialTitle}
                  placeholder="Enter title"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Unit</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={unit}
                  onChangeText={setUnit}
                  placeholder="Enter unit"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Area</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={area}
                  onChangeText={setArea}
                  placeholder="Enter area"
                  keyboardType="numeric"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Material</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={material}
                  onChangeText={setMaterial}
                  placeholder="Enter material"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Quantity</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholder="Enter quantity"
                  keyboardType="numeric"
                />
              </View>
              
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-1">Price</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Enter price"
                  keyboardType="numeric"
                />
              </View>
              
              <TouchableOpacity 
                className="bg-blue-600 py-3 rounded-lg"
                onPress={submitMaterialForm}
              >
                <Text className="text-white text-center font-semibold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Equipment Form Modal */}
        <Modal
          visible={showEquipmentForm}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowEquipmentForm(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/70">
            <View className="bg-white rounded-lg p-5 w-11/12 max-w-md">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">Add Equipment</Text>
                <Pressable onPress={() => setShowEquipmentForm(false)}>
                  <Icon name="close" size={24} color="#6B7280" />
                </Pressable>
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Title</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={equipTitle}
                  onChangeText={setEquipTitle}
                  placeholder="Enter title"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Resource ID</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={resourceId}
                  onChangeText={setResourceId}
                  placeholder="Enter resource ID"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Hour Cost</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={equipHourCost}
                  onChangeText={setEquipHourCost}
                  placeholder="Enter hour cost"
                  keyboardType="numeric"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Daily Cost</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={equipDailyCost}
                  onChangeText={setEquipDailyCost}
                  placeholder="Enter daily cost"
                  keyboardType="numeric"
                />
              </View>
              
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-1">Monthly Cost</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={equipMonthlyCost}
                  onChangeText={setEquipMonthlyCost}
                  placeholder="Enter monthly cost"
                  keyboardType="numeric"
                />
              </View>
              
              <TouchableOpacity 
                className="bg-blue-600 py-3 rounded-lg"
                onPress={submitEquipmentForm}
              >
                <Text className="text-white text-center font-semibold">Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout>
  );
}