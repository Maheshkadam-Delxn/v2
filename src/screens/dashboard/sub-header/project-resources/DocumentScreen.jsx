
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, Pressable } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

export default function DocumentScreen() {
  const [selectedFolder, setSelectedFolder] = useState('All Folders');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  const folders = [
    { id: '1', name: 'All Folders', icon: 'folder' },
    { id: '2', name: 'Projects', icon: 'briefcase' },
    { id: '3', name: 'Personal', icon: 'person' },
    { id: '4', name: 'Shared', icon: 'people' },
  ];

  const folderContents = {
    'All Folders': [
      { name: 'Application', type: 'General Folder', files: 0, links: 0, icon: 'folder', color: '#3B82F6' },
      { name: 'Drawing', type: 'Submittal', files: 0, links: 11, icon: 'document', color: '#F59E0B' },
      { name: 'Index', type: 'Search files', files: 0, links: 1, icon: 'search', color: '#6366F1' },
      { name: 'Activity', type: 'Inspection', files: 0, links: 5, icon: 'time', color: '#10B981' },
    ],
    'Projects': [
      { name: 'Project Alpha', type: 'Client Documents', files: 12, links: 8, icon: 'folder', color: '#3B82F6' },
      { name: 'Project Beta', type: 'Design Files', files: 24, links: 3, icon: 'document', color: '#F59E0B' },
      { name: 'Project Gamma', type: 'Meeting Notes', files: 8, links: 5, icon: 'time', color: '#10B981' },
    ],
    'Personal': [
      { name: 'Resume', type: 'Documents', files: 3, links: 2, icon: 'document', color: '#F59E0B' },
      { name: 'Certificates', type: 'Achievements', files: 7, links: 0, icon: 'ribbon', color: '#8B5CF6' },
      { name: 'Photos', type: 'Memories', files: 156, links: 0, icon: 'image', color: '#EC4899' },
    ],
    'Shared': [
      { name: 'Team Resources', type: 'Company', files: 42, links: 15, icon: 'people', color: '#6366F1' },
      { name: 'Client Presentations', type: 'External', files: 18, links: 7, icon: 'tv', color: '#F59E0B' },
      { name: 'Templates', type: 'Reusable', files: 9, links: 12, icon: 'copy', color: '#10B981' },
    ],
  };

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      // Here you would typically add the folder to your data source
      console.log('Adding new folder:', newFolderName);
      setNewFolderName('');
      setShowAddFolderModal(false);
    }
  };

  return (
    <MainLayout title="Manage Your Files">
      <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
        {/* Header Section with Dropdown */}
        <View className="mb-6 flex-row justify-between items-center">
          <View className="relative">
            <TouchableOpacity 
              className="flex-row items-center bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200"
              onPress={() => setShowDropdown(!showDropdown)}
            >
              <Text className="text-lg font-semibold text-gray-800 mr-2">{selectedFolder}</Text>
              <Ionicons name={showDropdown ? "chevron-up" : "chevron-down"} size={20} color="#4B5563" />
            </TouchableOpacity>
            
            {showDropdown && (
              <View className="absolute top-12 left-0 right-0 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                {folders.map((folder) => (
                  <TouchableOpacity
                    key={folder.id}
                    className="flex-row items-center px-4 py-3 border-b border-gray-100 last:border-b-0"
                    onPress={() => {
                      setSelectedFolder(folder.name);
                      setShowDropdown(false);
                    }}
                  >
                    <Ionicons name={folder.icon} size={18} color="#4B5563" className="mr-3" />
                    <Text className="text-gray-800">{folder.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          
          <TouchableOpacity 
            className="bg-blue-600 rounded-full p-3 shadow-sm"
            onPress={() => setShowAddFolderModal(true)}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text className="text-gray-500 mb-6">Organize your server place.</Text>

        {/* Search Bar */}
        <View className="bg-white rounded-lg p-3 flex-row items-center shadow-sm mb-6 border border-gray-200">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Type to search for files or folders"
            className="ml-2 flex-1 text-gray-700"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mb-6">
          <TouchableOpacity className="bg-blue-600 rounded-lg py-3 px-5 flex-row items-center shadow-sm">
            <Ionicons name="add" size={20} color="white" />
            <Text className="text-white font-medium ml-2">Create</Text>
          </TouchableOpacity>
          
          <TouchableOpacity className="bg-white rounded-lg py-3 px-5 flex-row items-center shadow-sm border border-gray-300">
            <Ionicons name="cloud-upload" size={20} color="#4B5563" />
            <Text className="text-gray-700 font-medium ml-2">Upload</Text>
          </TouchableOpacity>
        </View>

        {/* Categories Section */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-800 mb-4">Folders</Text>
          
          <View className="flex flex-row flex-wrap justify-between">
            {folderContents[selectedFolder].map((item, index) => (
              <View key={index} className="bg-white rounded-xl p-4 mb-4 w-[48%] shadow-sm border border-gray-200">
                <View className="flex-row items-center mb-2">
                  <View className="p-2 rounded-lg mr-3" style={{ backgroundColor: `${item.color}20` }}>
                    <Ionicons name={item.icon} size={20} color={item.color} />
                  </View>
                  <View>
                    <Text className="text-sm font-semibold text-gray-800">{item.name}</Text>
                    <Text className="text-xs text-gray-500">{item.type}</Text>
                  </View>
                </View>
                <View className="flex-row justify-between mt-2">
                  <View className="flex-row items-center">
                    <Ionicons name="document" size={14} color="#6B7280" />
                    <Text className="text-xs text-gray-600 ml-1">{item.files} Files</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="link" size={14} color="#6B7280" />
                    <Text className="text-xs text-gray-600 ml-1">{item.links} Links</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Storage Information */}
        <View className="bg-white rounded-xl p-5 shadow-sm border border-gray-200 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Storage Information</Text>
          
          <View className="mb-4">
            <View className="flex-row justify-between mb-1">
              <Text className="text-sm text-gray-600">1 TB Total Storage</Text>
              <Text className="text-sm text-gray-600">0% Used</Text>
            </View>
            <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <View className="h-full bg-blue-600 rounded-full" style={{ width: '0%' }}></View>
            </View>
          </View>
          
          <Text className="text-sm text-gray-500">You're using 0 GB of 1 TB available</Text>
        </View>

        {/* Add Folder Modal */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showAddFolderModal}
          onRequestClose={() => setShowAddFolderModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-xl p-5 w-80 shadow-lg border border-gray-200">
              <Text className="text-lg font-semibold text-gray-800 mb-4">Add New Folder</Text>
              
              <TextInput
                placeholder="Folder Name"
                className="border border-gray-300 rounded-lg p-3 mb-4"
                value={newFolderName}
                onChangeText={setNewFolderName}
              />
              
              <View className="flex-row justify-end">
                <TouchableOpacity 
                  className="px-4 py-2 rounded-lg mr-2"
                  onPress={() => setShowAddFolderModal(false)}
                >
                  <Text className="text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  className="bg-blue-600 px-4 py-2 rounded-lg"
                  onPress={handleAddFolder}
                >
                  <Text className="text-white">Add Folder</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </MainLayout>
  );
}