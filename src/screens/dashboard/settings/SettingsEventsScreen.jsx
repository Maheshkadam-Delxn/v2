import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import MainLayout from '../../components/MainLayout';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsEventsScreen() {
  const [expandedCards, setExpandedCards] = useState({});

  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const events = [
    {
      name: 'RFI Creation',
      module: 'RFI',
      project: 'Granite Horizon',
      actionType: 'Created',
      alertType: 'Mail, Notification',
      sentTo: 'Mukesh Sinha',
      message: '{{Title}} {{From_User}}{{To_User}}\n{{Submission_Date}}\n{{Expected_Reply.Date}}{{Priority}}\n{{Time_Impact}}{{Cost_Impact}}>{{Status}}\n{{Project}}={{Category}}{{Description}}\n{{Reference_Number}}',
      isActive: true
    },
    {
      name: 'Submittal Log creation',
      module: 'Submittal Log',
      project: 'Granite Horizon',
      actionType: 'Created',
      alertType: 'Mail, Notification',
      sentTo: 'Project Team',
      message: '{{Document_Number}} {{Submittal_No}}{{Status}}{{Date}}{{Revision}}{{Document_Title}}{{Location}}{{Project}}{{Description}}{{Descipline}}',
      isActive: true
    },
    {
      name: 'Activity created',
      module: 'Activity',
      project: 'Granite Horizon',
      actionType: 'Created',
      alertType: 'Notification',
      sentTo: 'All Members',
      message: 'New activity has been created in the system',
      isActive: true
    },
    {
      name: 'BOQ Updated',
      module: 'BOQ',
      project: 'Granite Horizon',
      actionType: 'Updated',
      alertType: 'Mail, Notification',
      sentTo: 'Finance Team',
      message: 'Bill of Quantities has been updated with new items',
      isActive: true
    }
  ];

  return (
    <MainLayout title="Events">
      <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Event Settings</Text>
          <Text className="text-sm text-gray-500">Manage project-related events and notifications</Text>
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
                    <Text className="text-lg font-semibold text-gray-900">{event.name}</Text>
                    <Text className="text-sm text-gray-500 mt-1">Module: {event.module}</Text>
                    <Text className="text-sm text-gray-500">Project: {event.project}</Text>
                  </View>
                </View>
                
                {/* Status badge */}
                {/* <Text className={`text-xs font-medium px-2 py-1 rounded-full ${
                  event.isActive 
                    ? 'text-green-600 bg-green-100' 
                    : 'text-gray-600 bg-gray-100'
                }`}>
                  {event.isActive ? 'Active' : 'Inactive'}
                </Text> */}
              </View>

              {/* Expandable content - appears below event details but above action row */}
              {expandedCards[index] && (
                <View className="mt-4 mb-4 border-t border-gray-100 pt-4 space-y-3">
                  {/* Action Type */}
                  <View className="flex-row">
                    <Text className="text-sm font-medium text-gray-500 w-28">Action Type:</Text>
                    <Text className="text-sm font-medium text-gray-900 flex-1">{event.actionType}</Text>
                  </View>

                  {/* Alert Type */}
                  <View className="flex-row">
                    <Text className="text-sm font-medium text-gray-500 w-28">Alert Type:</Text>
                    <Text className="text-sm font-medium text-gray-900 flex-1">{event.alertType}</Text>
                  </View>

                  {/* Sent To */}
                  <View className="flex-row">
                    <Text className="text-sm font-medium text-gray-500 w-28">Sent To:</Text>
                    <Text className="text-sm font-medium text-gray-900 flex-1">{event.sentTo}</Text>
                  </View>

                  {/* Message */}
                  <View className="flex-row items-start">
                    <Text className="text-sm font-medium text-gray-500 w-28 mt-1">Message:</Text>
                    <Text className="text-sm font-medium text-gray-900 flex-1 whitespace-pre-line">
                      {event.message}
                    </Text>
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