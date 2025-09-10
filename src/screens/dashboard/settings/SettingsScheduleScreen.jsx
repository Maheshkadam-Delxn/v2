

import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import MainLayout from '../../components/MainLayout';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsEventsScreen() {
  const [expandedCards, setExpandedCards] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const events = [
    {
      scheduleName: 'BOQ Schedule',
      moduleName: 'BOQ',
      projectName: 'Granite Horizon',
      sendTo: 'vikashoffice38@gmail.com',
      reportParameters: 'Added By,Date,Item Name,Item Number,Paid To,Phase Name,Quantity,Remark,Title,Total Cost,Unit Cost',
      type: 'PDF',
      durationType: 'DAILY',
      time: '12:35 PM',
      isActive: true
    },
    {
      scheduleName: 'Activity Schedule',
      moduleName: 'Activity',
      projectName: 'Granite Horizon',
      sendTo: 'team@example.com',
      reportParameters: 'Title,Description,Start Date,End Date,Status,Assigned To',
      type: 'Excel',
      durationType: 'WEEKLY',
      time: '09:00 AM',
      isActive: false
    },
  ];

  return (
    <MainLayout title="Schedule">
      <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Schedule Settings</Text>
          <Text className="text-sm text-gray-500">Manage project schedules.</Text>
        </View>
        
        {/* Search and Filter Row */}
        <View className="flex-row items-center justify-between mb-6">
          {/* Search Bar */}
          <View className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-2 mr-3 border border-gray-200">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              className="flex-1 ml-2 text-gray-700"
              placeholder="Search events..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
          
          {/* Plus Icon */}
          <TouchableOpacity className="bg-blue-600 p-3 rounded-xl mr-3">
            <Ionicons name="add" size={22} color="white" />
          </TouchableOpacity>
          
          {/* Filter Icon */}
          <TouchableOpacity className="bg-white p-3 rounded-xl border border-gray-200">
            <Ionicons name="filter" size={22} color="#4b5563" />
          </TouchableOpacity>
        </View>

        {/* Events list */}
        <View className="space-y-4">
          {events.map((event, index) => (
            <View key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              {/* Header section with expand button on the left */}
              <View className="flex-row items-start justify-between">
                <View className="flex-row items-start flex-1">
                  {/* Expand button on the left */}
                  <TouchableOpacity 
                    onPress={() => toggleCard(index)}
                    activeOpacity={0.7}
                    className="mr-3 mt-1"
                  >
                    <View>
                      <Ionicons 
                        name={expandedCards[index] ? "chevron-down" : "chevron-forward"} 
                        size={22} 
                        color="#3b82f6" 
                        style={{ fontWeight: 'bold' }}
                      />
                    </View>
                  </TouchableOpacity>
                  
                  {/* Event details */}
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-gray-900">{event.scheduleName}</Text>
                    <Text className="text-sm text-gray-500 mt-1">Module Name: {event.moduleName}</Text>
                    <Text className="text-sm text-gray-500">Project Name: {event.projectName}</Text>
                  </View>
                </View>
                
                {/* Status badge */}
                <Text className={`text-xs font-medium px-2 py-1 rounded-full ${
                  event.isActive 
                    ? 'text-green-600 bg-green-100' 
                    : 'text-gray-600 bg-gray-100'
                }`}>
                  {event.isActive ? 'Active' : 'Inactive'}
                </Text>
              </View>

              {/* Expandable content - appears below event details but above action row */}
              {expandedCards[index] && (
                <View className="mt-4 mb-4 border-t border-gray-100 pt-4 space-y-3">
                  {/* Send To */}
                  <View className="flex-row">
                    <Text className="text-sm font-medium text-gray-500 w-28">Send To:</Text>
                    <Text className="text-sm font-medium text-gray-900 flex-1">{event.sendTo}</Text>
                  </View>

                  {/* Report Parameters */}
                  <View className="flex-row items-start">
                    <Text className="text-sm font-medium text-gray-500 w-28 mt-1">Report Parameters:</Text>
                    <Text className="text-sm font-medium text-gray-900 flex-1">
                      {event.reportParameters}
                    </Text>
                  </View>

                  {/* Type */}
                  <View className="flex-row">
                    <Text className="text-sm font-medium text-gray-500 w-28">Type:</Text>
                    <Text className="text-sm font-medium text-gray-900 flex-1">{event.type}</Text>
                  </View>

                  {/* Duration Type */}
                  <View className="flex-row">
                    <Text className="text-sm font-medium text-gray-500 w-28">Duration Type:</Text>
                    <Text className="text-sm font-medium text-gray-900 flex-1">{event.durationType}</Text>
                  </View>

                  {/* Time */}
                  <View className="flex-row">
                    <Text className="text-sm font-medium text-gray-500 w-28">Time:</Text>
                    <Text className="text-sm font-medium text-gray-900 flex-1">{event.time}</Text>
                  </View>
                </View>
              )}
              
              {/* Action buttons row */}
              <View className="flex-row justify-between items-center border-t border-gray-100 pt-3">
                <View className="flex-row space-x-6">
                  <TouchableOpacity className="flex-row items-center px-3 py-2 rounded-lg">
                    <Ionicons name="create-outline" size={22} color="#2563eb" />
                    <Text className="text-sm font-medium text-indigo-600 ml-1"></Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity className="flex-row items-center px-3 py-2 rounded-lg">
                    <Ionicons name="trash-outline" size={22} color="#ef4444" />
                    <Text className="text-sm font-medium text-red-600 ml-1"></Text>
                  </TouchableOpacity>
                </View>
                
                {/* Toggle switch */}
                <View className="flex-row items-center">
                  <Text className="text-sm text-gray-600 mr-2">Active</Text>
                  <View className="w-10 h-5 bg-gray-300 rounded-full relative">
                    <View className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all ${
                      event.isActive ? 'transform translate-x-5 bg-green-500' : ''
                    }`} />
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Help button */}
        <TouchableOpacity className="mt-6 bg-blue-600 rounded-xl p-4 items-center shadow-sm mb-20">
          <Text className="text-white text-sm font-medium">Need Help?</Text>
        </TouchableOpacity>
      </ScrollView>
    </MainLayout>
  );
}