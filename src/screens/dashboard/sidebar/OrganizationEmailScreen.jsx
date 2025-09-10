import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Dimensions } from 'react-native';
import MainLayout from '../../components/MainLayout';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function OrganizationEmailScreen() {
  const [selectedFolder, setSelectedFolder] = useState('All');
  const [showFolderDropdown, setShowFolderDropdown] = useState(true);
  const [composeModalVisible, setComposeModalVisible] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const emailFolders = [
    { id: 'all', name: 'All', count: 21, icon: 'mail' },
    { id: 'inbox', name: 'Inbox', count: 8, icon: 'inbox' },
    { id: 'sent', name: 'Sent', count: 5, icon: 'send' },
    { id: 'archive', name: 'Archive', count: 4, icon: 'archive' },
    { id: 'spam', name: 'Spam', count: 2, icon: 'alert-circle' },
  ];

  const emailLabels = [
    { id: 'structural', name: 'Structural', color: '#8B5CF6' },
    { id: 'exterior', name: 'Exterior', color: '#10B981' },
    { id: 'inspection', name: 'Inspection Report', color: '#F59E0B' },
    { id: 'rfi', name: 'RFI', color: '#EF4444' },
  ];

  const emails = [
    { 
      id: 1, 
      subject: 'BOQ General', 
      preview: 'BOQ Details', 
      date: '2025-08-25 18:46:57', 
      labels: ['structural'] 
    },
    // ... rest of the email data
  ];

  const filteredEmails = selectedFolder === 'All' 
    ? emails 
    : emails.filter(email => email.labels.includes(selectedFolder.toLowerCase()));

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <MainLayout title="My Email">
      <View className="flex-1 flex-row bg-gray-50">
        {/* Sidebar with Toggle */}
        <View className={`${sidebarOpen ? 'w-72' : 'w-16'} bg-white border-r border-gray-200 ${sidebarOpen ? 'p-5' : 'p-2'} shadow-sm transition-all duration-300 relative`}>
          
          {/* Toggle Button */}
          <TouchableOpacity 
            className="absolute -right-3 bg-blue-600 rounded-full p-1 z-10 shadow-md"
            onPress={toggleSidebar}
          >
            <Ionicons 
              name={sidebarOpen ? "chevron-back" : "chevron-forward"} 
              size={20} 
              color="white" 
            />
          </TouchableOpacity>

          {sidebarOpen ? (
            <>
              <TouchableOpacity 
                className="bg-blue-600 rounded-lg p-4 mb-6 flex-row items-center justify-center shadow-md mt-4"
                // onPress={() => setComposeModalVisible(true)}
              >
                <Ionicons name="add" size={22} color="white" />
                <Text className="text-white font-semibold ml-2 text-base">Compose Mail</Text>
              </TouchableOpacity>

              <View className="mb-6">
                <TextInput
                  className="bg-gray-100 rounded-lg p-3 text-sm border border-gray-200"
                  placeholder="Type to search for files or folders"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <View className="mb-6">
                <Text className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">My Email</Text>
                
                <TouchableOpacity 
                  className="flex-row items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-100 mb-2"
                  onPress={() => setShowFolderDropdown(!showFolderDropdown)}
                >
                  <View className="flex-row items-center">
                    <Ionicons name="mail" size={18} color="#3B82F6" className="mr-3" />
                    <Text className="text-blue-700 font-semibold">My Mail</Text>
                  </View>
                  <Ionicons 
                    name={showFolderDropdown ? "chevron-up" : "chevron-down"} 
                    size={18} 
                    color="#3B82F6" 
                  />
                </TouchableOpacity>

                {showFolderDropdown && (
                  <View className="pl-3 mt-1">
                    {emailFolders.map((folder) => (
                      <TouchableOpacity
                        key={folder.id}
                        className={`flex-row items-center justify-between p-3 rounded-lg mb-1 ${selectedFolder === folder.name ? 'bg-gray-100 border-l-4 border-blue-500' : ''}`}
                        onPress={() => setSelectedFolder(folder.name)}
                      >
                        <View className="flex-row items-center">
                          <Ionicons 
                            name={folder.icon} 
                            size={16} 
                            color={selectedFolder === folder.name ? "#3B82F6" : "#6B7280"} 
                            className="mr-3" 
                          />
                          <Text className={`${selectedFolder === folder.name ? 'text-blue-600 font-medium' : 'text-gray-700'}`}>
                            {folder.name}
                          </Text>
                        </View>
                        <Text className={`text-xs ${selectedFolder === folder.name ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                          {folder.count}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View>
                <Text className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">Labels</Text>
                {emailLabels.map((label) => (
                  <TouchableOpacity
                    key={label.id}
                    className={`flex-row items-center p-3 rounded-lg mb-1 ${selectedFolder === label.name ? 'bg-gray-100 border-l-4 border-blue-500' : ''}`}
                    onPress={() => setSelectedFolder(label.name)}
                  >
                    <View className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: label.color }} />
                    <Text className={selectedFolder === label.name ? 'text-blue-600 font-medium' : 'text-gray-700'}>
                      {label.name}
                    </Text>
                  </TouchableOpacity>
                ))}
                
                <TouchableOpacity className="flex-row items-center p-3 rounded-lg mt-2 border border-dashed border-gray-300">
                  <Ionicons name="add" size={18} color="#3B82F6" className="mr-3" />
                  <Text className="text-blue-600 font-medium">Create New Label</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            // Compact sidebar when closed
            <View className="items-center pt-2 mt-4">
              <TouchableOpacity 
                className="bg-blue-600 rounded-lg p-3 mb-6"
                onPress={() => setComposeModalVisible(true)}
              >
                <Ionicons name="add" size={22} color="white" />
              </TouchableOpacity>

              <TouchableOpacity className="mb-6">
                <Ionicons name="search" size={22} color="#6B7280" />
              </TouchableOpacity>

              <View className="mb-6">
                <TouchableOpacity 
                  className="p-3 rounded-lg bg-blue-50 mb-2"
                  onPress={() => setShowFolderDropdown(!showFolderDropdown)}
                >
                  <Ionicons name="mail" size={18} color="#3B82F6" />
                </TouchableOpacity>

                {showFolderDropdown && (
                  <View className="items-center mt-1">
                    {emailFolders.map((folder) => (
                      <TouchableOpacity
                        key={folder.id}
                        className={`p-3 rounded-lg mb-1 ${selectedFolder === folder.name ? 'bg-gray-100' : ''}`}
                        onPress={() => setSelectedFolder(folder.name)}
                      >
                        <Ionicons 
                          name={folder.icon} 
                          size={16} 
                          color={selectedFolder === folder.name ? "#3B82F6" : "#6B7280"} 
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>

              <View>
                {emailLabels.map((label) => (
                  <TouchableOpacity
                    key={label.id}
                    className={`p-3 rounded-lg mb-1 ${selectedFolder === label.name ? 'bg-gray-100' : ''}`}
                    onPress={() => setSelectedFolder(label.name)}
                  >
                    <View className="w-3 h-3 rounded-full" style={{ backgroundColor: label.color }} />
                  </TouchableOpacity>
                ))}
                
                <TouchableOpacity className="p-3 rounded-lg mt-2">
                  <Ionicons name="add" size={18} color="#3B82F6" />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        {/* Email List */}
        <ScrollView className="flex-1 p-5">
          <View className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <View className="flex-row justify-between items-center p-4 border-b border-gray-200 bg-gray-50">
              <Text className="font-semibold text-gray-800 text-lg">
                {selectedFolder} ({filteredEmails.length})
              </Text>
              <View className="flex-row">
                <TouchableOpacity className="p-2">
                  <Ionicons name="refresh" size={20} color="#6B7280" />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 ml-2">
                  <Ionicons name="options" size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>

            {filteredEmails.length > 0 ? (
              filteredEmails.map((email) => (
                <TouchableOpacity
                  key={email.id}
                  className="p-4 border-b border-gray-100 last:border-b-0 active:bg-gray-50"
                >
                  <View className="flex-row justify-between items-start mb-1">
                    <Text className="font-semibold text-gray-900 text-base">{email.subject}</Text>
                    <Text className="text-xs text-gray-500">{email.date}</Text>
                  </View>
                  <Text className="text-sm text-gray-600 mb-2">{email.preview}</Text>
                  <View className="flex-row flex-wrap">
                    {email.labels.map((labelId) => {
                      const label = emailLabels.find(l => l.id === labelId);
                      return label ? (
                        <View 
                          key={labelId} 
                          className="flex-row items-center mr-2 mb-1 px-2 py-1 rounded-full"
                          style={{ backgroundColor: `${label.color}15` }}
                        >
                          <View className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: label.color }} />
                          <Text className="text-xs" style={{ color: label.color }}>
                            {label.name}
                          </Text>
                        </View>
                      ) : null;
                    })}
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="p-8 items-center justify-center">
                <Ionicons name="mail-open" size={48} color="#D1D5DB" />
                <Text className="text-gray-500 mt-3 text-center">No emails found in {selectedFolder}</Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>

      {/* Compose Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={composeModalVisible}
        onRequestClose={() => setComposeModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/70">
          <View className="bg-white rounded-xl p-6 w-11/12 max-w-md">
            <View className="flex-row justify-between items-center mb-5">
              <Text className="text-xl font-bold text-gray-900">Compose Mail</Text>
              <TouchableOpacity 
                onPress={() => setComposeModalVisible(false)}
                className="p-1 rounded-full bg-gray-100"
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            
            <TextInput
              placeholder="To"
              className="border border-gray-300 rounded-lg p-4 mb-4"
              placeholderTextColor="#9CA3AF"
            />
            
            <TextInput
              placeholder="Subject"
              className="border border-gray-300 rounded-lg p-4 mb-4"
              placeholderTextColor="#9CA3AF"
            />
            
            <TextInput
              placeholder="Message"
              multiline
              numberOfLines={6}
              className="border border-gray-300 rounded-lg p-4 mb-5"
              textAlignVertical="top"
              placeholderTextColor="#9CA3AF"
            />
            
            <View className="flex-row justify-end space-x-3">
              <TouchableOpacity 
                className="px-5 py-3 rounded-lg border border-gray-300"
                onPress={() => setComposeModalVisible(false)}
              >
                <Text className="text-gray-700">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="bg-blue-600 px-5 py-3 rounded-lg shadow-sm"
                onPress={() => setComposeModalVisible(false)}
              >
                <Text className="text-white font-medium">Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </MainLayout>
  );
}