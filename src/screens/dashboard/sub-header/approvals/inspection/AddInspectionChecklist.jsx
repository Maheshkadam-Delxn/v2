import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import MainLayout from '../../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AddInspectionChecklist = () => {
  const navigation = useNavigation();
  const [checklistName, setChecklistName] = useState('');

  // Sample checklist data
  const [checklists, setChecklists] = useState([
    { id: '1', name: 'Excavation Safety Checklist', status: 'Active' },
    { id: '2', name: 'Shuttering & Formwork Checklist', status: 'Active' },
    { id: '3', name: 'Steel Reinforcement Checklist', status: 'Active' },
    { id: '4', name: 'Concrete Pouring Checklist', status: 'Active' },
    { id: '5', name: 'Masonry Work Checklist', status: 'Active' },
    { id: '6', name: 'Waterproofing Work Checklist', status: 'Active' },
    { id: '7', name: 'Tile Work Checklist', status: 'Active' },
  ]);

  const handleAddChecklist = () => {
    if (checklistName.trim()) {
      const newChecklist = {
        id: (checklists.length + 1).toString(),
        name: checklistName,
        status: 'Active'
      };
      setChecklists([...checklists, newChecklist]);
      setChecklistName('');
    }
  };

  const handleDeleteChecklist = (id) => {
    setChecklists(checklists.filter(item => item.id !== id));
  };

  const renderChecklistItem = ({ item }) => (
    <View className="bg-white border border-gray-200 rounded-xl p-4 mb-3 flex-row items-center justify-between">
      <View className="flex-1 flex-row items-center">
        <Text className="text-base text-gray-800 flex-1">{item.name}</Text>
        <View className="bg-emerald-100 px-3 py-1 rounded-lg ml-3">
          <Text className="text-xs font-semibold text-emerald-600">{item.status}</Text>
        </View>
      </View>
      <View className="flex-row gap-3 ml-4">
        <TouchableOpacity className="p-1">
          <Icon name="eye-outline" size={22} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity className="p-1">
          <Icon name="pencil-outline" size={22} color="#f59e0b" />
        </TouchableOpacity>
        <TouchableOpacity className="p-1" onPress={() => handleDeleteChecklist(item.id)}>
          <Icon name="delete-outline" size={22} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <MainLayout title="New Checklist">
      <View className="flex-1 bg-slate-50">
        {/* Header */}
        <View className="bg-blue-500 p-4 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-white">New Checklist</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Add New Checklist Input */}
          <View className="mb-6">
            <View className="flex-row items-center gap-3">
              <View className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 flex-row items-center">
                <TextInput
                  value={checklistName}
                  onChangeText={setChecklistName}
                  placeholder="Name"
                  placeholderTextColor="#9ca3af"
                  className="flex-1 text-base text-gray-700"
                />
                <Icon name="menu" size={20} color="#6b7280" />
              </View>
              <TouchableOpacity
                onPress={handleAddChecklist}
                className="bg-emerald-100 rounded-xl px-6 py-3 flex-row items-center gap-2"
              >
                <Icon name="plus" size={20} color="#10b981" />
                <Text className="text-base font-semibold text-emerald-600">Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section Title */}
          <View className="mb-4">
            <Text className="text-center text-base font-semibold text-gray-700">
              Inspection Check List
            </Text>
          </View>

          {/* Checklist Items */}
          <FlatList
            data={checklists}
            renderItem={renderChecklistItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default AddInspectionChecklist;