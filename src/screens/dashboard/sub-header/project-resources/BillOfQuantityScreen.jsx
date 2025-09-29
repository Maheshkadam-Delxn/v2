import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, useNavigation } from '@react-navigation/native';
import MainLayout from '../../../components/MainLayout';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

// BOQ Item Component with Dropdown
const BoqItem = ({ item, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Sample sub-items for dropdown
  const subItems = [
    { id: 1, itemNo: '102', quantity: '500.00 (Ton)', total: '117500.00', unitCost: '235.00' },
    { id: 2, itemNo: '103', quantity: '50.00 (Nos)', total: '18250.00', unitCost: '365.00' }
  ];

  return (
    <View className="bg-white mb-3 rounded-lg border border-gray-200 overflow-hidden">
      {/* Main BOQ Header */}
      <TouchableOpacity 
        className="p-4"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
          </View>
          <View className="flex-row items-center">
            <View className={`px-2 py-1 rounded-full mr-2 ${item.approved ? 'bg-green-100' : 'bg-yellow-100'}`}>
              <Text className={`text-xs font-medium ${item.approved ? 'text-green-800' : 'text-yellow-800'}`}>
                {item.approved ? 'Approved' : 'Pending'}
              </Text>
            </View>
            <Feather 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#6b7280" 
            />
          </View>
        </View>
        
        <View className="flex-row mb-2">
          <View className="bg-blue-100 px-2 py-1 rounded-full mr-2">
            <Text className="text-xs text-blue-800">{item.category}</Text>
          </View>
          <View className="bg-purple-100 px-2 py-1 rounded-full">
            <Text className="text-xs text-purple-800">{item.type}</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Total/Paid:</Text>
          <Text className="font-medium text-gray-800">{item.total}/{item.paid}</Text>
        </View>
      </TouchableOpacity>

      {/* Dropdown Content */}
      {isExpanded && (
        <View className="border-t border-gray-200 bg-gray-50">
          {/* Header Row */}
          <View className="flex-row items-center justify-between p-3 border-b border-gray-200 bg-white">
            <Text className="text-sm font-medium text-gray-700">Item List</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddBoqItem', { boqId: item.id })}
              className="w-8 h-8 rounded-full bg-blue-500 justify-center items-center"
            >
              <Feather name="plus" size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Sub Items */}
          {subItems.map((subItem) => (
            <View key={subItem.id} className="p-3 border-b border-gray-100 bg-white">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-medium text-gray-800">Item No: {subItem.itemNo}</Text>
                <Text className="text-sm text-gray-600">Unit Cost: {subItem.unitCost}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-600">Quantity: {subItem.quantity}</Text>
                <Text className="text-sm font-medium text-gray-800">Total: {subItem.total}</Text>
              </View>
            </View>
          ))}

          {/* Empty State */}
          {subItems.length === 0 && (
            <View className="p-4 items-center">
              <Text className="text-gray-500 text-sm">No items added yet</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddBoqItem', { boqId: item.id })}
                className="mt-2 px-4 py-2 bg-blue-500 rounded-lg"
              >
                <Text className="text-white text-sm font-medium">Add First Item</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

// Main BillOfQuantity Component
export default function BillOfQuantity() {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params || { projectId: 1 };
  const [searchText, setSearchText] = useState('');
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

  const tabs = ['All', 'General', 'Structural', 'Other', 'External'];

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      
      <MainLayout title="Bill of Quantity">
        {/* Filter Tabs with Blue Gradient */}
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
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 8, gap: 12 }}
          >
            {tabs.map(tab => (
              <TouchableOpacity 
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 9999,
                  backgroundColor: activeTab === tab ? '#3b82f6' : '#ffffff',
                }}
              >
                <Text 
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    color: activeTab === tab ? '#ffffff' : '#2563eb',
                  }}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </LinearGradient>
        
        {/* Search Bar - Styled like HomeScreen */}
        <Animated.View 
          className="px-6 py-6"
          style={{
            opacity: scaleAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <View className="flex-row items-center">
            {/* Search Bar */}
            <View 
              className="mr-4 flex-1 flex-row items-center rounded-2xl bg-white px-5 "
              style={{
                height: 44,
              }}
            >
              <Feather name="search" size={20} color="#6b7280" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-base font-medium"
                placeholder="Search BOQ items..."
                placeholderTextColor="#9ca3af"
                value={searchText}
                onChangeText={setSearchText}
                style={{
                  height: '100%',
                }}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText('')}>
                  <Feather name="x" size={18} color="#6b7280" />
                </TouchableOpacity>
              )}
            </View>
            
            {/* Filter and Add Buttons */}
            <View className="flex-row space-x-2">
              <TouchableOpacity
                className="rounded-2xl"
                style={{
                  backgroundColor: '#3b82f6',
                  height: 44,
                  width: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Feather name="filter" size={20} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-2xl"
                style={{
                  backgroundColor: '#3b82f6',
                  height: 44,
                  width: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('AddBoq')}
              >
                <Feather name="plus" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        
        {/* BOQ List */}
        <ScrollView className="flex-1 px-6 bg-gray-50">
          {filteredData.map(item => (
            <BoqItem
              key={item.id}
              item={item}
              navigation={navigation}
            />
          ))}
        </ScrollView>
        
        {/* Add Phase Button */}
        <TouchableOpacity 
          className="absolute bottom-6 right-6 w-14 h-14 rounded-full justify-center items-center"
          style={{
            backgroundColor: '#3b82f6',
          }}
          onPress={() => navigation.navigate('AddPhaseBoq')}
        >
          <Text className="text-white text-2xl">+</Text>
        </TouchableOpacity>
      </MainLayout>
    </View>
  );
}