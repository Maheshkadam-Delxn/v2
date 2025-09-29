import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal, FlatList, Alert, SafeAreaView, ActivityIndicator, Animated, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayout from '../../../components/MainLayout';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as DocumentPicker from 'expo-document-picker';

const { width: screenWidth } = Dimensions.get('window');
const BASE_URL = 'https://api-v2-skystruct.prudenttec.com/';
const MENU_ID = '4JCuU5I49Td';

export default function DocumentScreen() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentFolderData, setCurrentFolderData] = useState({ folders: [], files: [] });
  const [loading, setLoading] = useState(false);
  const [jwtToken, setJwtToken] = useState('');
  
  // Navigation states
  const [currentPath, setCurrentPath] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [parentFolderId, setParentFolderId] = useState('0');
  
  // Sidebar states
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const sidebarAnimation = useState(new Animated.Value(-300))[0];
  
  // Modal states
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const [showUserPicker, setShowUserPicker] = useState(false);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [selectedCategoryForOptions, setSelectedCategoryForOptions] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemType, setSelectedItemType] = useState(null); // 'folder' or 'file'
  
  // Form states
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newFolderName, setNewFolderName] = useState('');
  const [newFolderDescription, setNewFolderDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('folder');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState('');
  const [searchIcons, setSearchIcons] = useState('');

  // Upload states
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDescription, setUploadDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Data
  const [availableUsers, setAvailableUsers] = useState([]);

  const availableIcons = [
    'folder', 'document', 'briefcase', 'person', 'people', 'time', 'search',
    'image', 'copy', 'tv', 'ribbon', 'archive', 'settings', 'star', 'heart',
    'bookmark', 'flag', 'tag', 'calendar', 'clock', 'camera', 'music',
  ];

  useEffect(() => {
    const initialize = async () => {
      await fetchToken();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (jwtToken) {
      loadCategories();
      fetchUsers();
    }
  }, [jwtToken]);

  useEffect(() => {
    Animated.timing(sidebarAnimation, {
      toValue: sidebarVisible ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [sidebarVisible]);

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

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}member/get-member-list-on-page`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      setAvailableUsers(Array.isArray(data) ? data.map(m => ({ id: m.autoId, name: m.userName, email: m.emailId })) : []);
    } catch (error) {
      console.error('fetchUsers error:', error);
      setAvailableUsers([]);
    }
  };

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}document/folder-category-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({}),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      const categoryList = Array.isArray(data.folderFormBeans) ? data.folderFormBeans : [];
      setCategories(categoryList.map(c => ({
        id: c.autoId,
        name: c.categoryName,
        icon: c.icon || 'folder',
        color: '#3B82F6',
        isDefault: c.isDefault || false,
      })));
      const defaultCategory = categoryList.find(c => c.isDefault) || categoryList[0];
      if (defaultCategory) {
        setSelectedCategory({ id: defaultCategory.autoId, name: defaultCategory.categoryName });
        loadCategoryContent(defaultCategory.autoId);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      Alert.alert('Error', 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryContent = async (categoryId, folderId = '0', layer = '0') => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}document/get-folder-and-file-list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({
          id: `${layer}_${folderId}`,
          category: categoryId,
          type: categoryId,
        }),
      });
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      setCurrentFolderData({
        folders: Array.isArray(data.folderFormBeans) ? data.folderFormBeans.map(f => ({
          id: f.autoId,
          name: f.folderName,
          type: f.type || 'Folder',
          files: f.fileCount || 0,
          links: f.linkCount || 0,
          icon: f.icon || 'folder',
          color: f.color || '#3B82F6',
          level: parseInt(layer, 10),
          categoryId: categoryId,
          parentId: folderId,
        })) : [],
        files: Array.isArray(data.files) ? data.files.map(f => ({
          id: f.autoId,
          name: f.fileName,
          size: f.fileSize,
          uploadDate: f.uploadDate,
          type: f.type,
        })) : [],
      });
      setCurrentLevel(parseInt(layer, 10));
      setParentFolderId(folderId);
    } catch (error) {
      console.error('Error loading category content:', error);
      Alert.alert('Error', `Failed to load folder content: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const navigateToFolder = async (folder) => {
    const newPath = [...currentPath, {
      id: folder.id,
      name: folder.name,
      level: folder.level,
    }];
    setCurrentPath(newPath);
    await loadCategoryContent(folder.categoryId, folder.id, (folder.level + 1).toString());
  };

  const navigateBack = async () => {
    if (currentPath.length === 0) return;
    
    const newPath = [...currentPath];
    newPath.pop();
    setCurrentPath(newPath);
    
    if (newPath.length === 0) {
      await loadCategoryContent(selectedCategory.id);
    } else {
      const parentFolder = newPath[newPath.length - 1];
      await loadCategoryContent(selectedCategory.id, parentFolder.id, (parentFolder.level + 1).toString());
    }
  };

  const getCurrentLocation = () => {
    if (!selectedCategory) return 'No Category';
    
    let location = selectedCategory.name;
    currentPath.forEach(folder => {
      location += ` > ${folder.name}`;
    });
    return location;
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setCurrentPath([]);
    await loadCategoryContent(category.id);
    setSidebarVisible(false);
  };

  const handleCreateOption = (option) => {
    setShowCreateModal(false);
    if (option === 'folder') {
      setShowCreateFolderModal(true);
    } else if (option === 'upload') {
      setShowUploadModal(true);
    }
  };

  const handleCreateFolder = async () => {
    if (!newFolderName.trim()) {
      Alert.alert('Error', 'Please enter a folder name');
      return;
    }

    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category first');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}document/add-folder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({
          folderFormBean: {
            folderName: newFolderName.trim(),
            layer: currentLevel.toString(),
            parentFolderId: parentFolderId || '0',
            docCatId: selectedCategory.id,
          }
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      Alert.alert('Success', `Folder "${newFolderName}" created successfully in ${getCurrentLocation()}`);
      resetFolderForm();
      setShowCreateFolderModal(false);
      loadCategoryContent(selectedCategory.id, parentFolderId, currentLevel.toString());
    } catch (error) {
      console.error('Error creating folder:', error);
      Alert.alert('Error', 'Failed to create folder');
    } finally {
      setLoading(false);
    }
  };

  const pickFiles = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: [
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'image/jpeg',
          'image/png',
        ],
        multiple: true,
      });

      if (!result.canceled) {
        const files = result.assets.map((asset) => ({
          uri: asset.uri,
          name: asset.name,
          type: asset.mimeType || 'application/octet-stream',
          size: asset.size ? (asset.size / 1024 / 1024).toFixed(2) + ' MB' : 'Unknown',
        }));
        setSelectedFiles(files);
      }
    } catch (error) {
      console.error('Error picking files:', error);
      Alert.alert('Error', 'Failed to pick files');
    }
  };

  const handleUpload = async () => {
    if (!uploadTitle.trim()) {
      Alert.alert('Error', 'Please enter a title for the upload');
      return;
    }
    if (!selectedFiles.length) {
      Alert.alert('Error', 'Please select at least one file');
      return;
    }
    if (!selectedCategory) {
      Alert.alert('Error', 'Please select a category first');
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('fileFormData', JSON.stringify({
        insertType: 's',
        description: uploadDescription,
        docCatId: selectedCategory.id,
        folderId: parentFolderId || '0',
        layer: currentLevel.toString(),
        revision: '1',
        version: '1',
        approvalEndDate: new Date().toISOString().split('T')[0],
        assignTo: selectedUsers.map(u => u.id).join(','),
        docFileStatus: 'Oyp5iEaN3J',
      }));
      selectedFiles.forEach(file => {
        fd.append('file[]', {
          uri: file.uri,
          name: file.name,
          type: file.type,
        });
      });
      console.log('Uploading files with data:', fd);
      const response = await fetch(`${BASE_URL}document/add-file-details`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: fd,
      });
      console.log('Upload response:', response.json());
      // if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log('Upload response data:', data);
      updateToken(data.jwtToken);
      Alert.alert('Success', `Document uploaded successfully to ${getCurrentLocation()}`);
      resetUploadForm();
      setShowUploadModal(false);
      loadCategoryContent(selectedCategory.id, parentFolderId, currentLevel.toString());
    } catch (error) {
      console.error('Error uploading document:', error);
      Alert.alert('Error', 'Failed to upload document');
    } finally {
      setLoading(false);
    }
  };

  const resetFolderForm = () => {
    setNewFolderName('');
    setNewFolderDescription('');
    setSelectedIcon('folder');
    setSelectedUsers([]);
  };

  const resetUploadForm = () => {
    setUploadTitle('');
    setUploadDescription('');
    setSelectedFiles([]);
    setSelectedUsers([]);
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      Alert.alert('Error', 'Please enter a category name');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}document/folder-category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({
          folderFormBean: {
            icon: selectedIcon,
            sharedMemberId: selectedUsers.map(u => u.id).join(','),
            categoryName: newCategoryName.trim(),
          }
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      Alert.alert('Success', 'Category added successfully');
      resetCategoryForm();
      setShowAddCategoryModal(false);
      setSidebarVisible(false);
      loadCategories();
    } catch (error) {
      console.error('Error adding category:', error);
      Alert.alert('Error', 'Failed to add category');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryOptions = (category, event) => {
    event.stopPropagation();
    setSelectedCategoryForOptions(category);
    setShowCategoryOptions(true);
  };

  const handleCategoryAction = async (action) => {
    setShowCategoryOptions(false);
    if (action === 'view') {
      try {
        const response = await fetch(`${BASE_URL}document/category-by-id/${selectedCategoryForOptions.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            'X-Menu-Id': MENU_ID,
          },
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        updateToken(data.jwtToken);
        Alert.alert('Category Details', JSON.stringify(data));
      } catch (error) {
        console.error('Error viewing category:', error);
        Alert.alert('Error', 'Failed to view category details');
      }
    } else if (action === 'edit') {
      setNewCategoryName(selectedCategoryForOptions.name);
      setSelectedIcon(selectedCategoryForOptions.icon);
      setShowAddCategoryModal(true);
    }
    setSelectedCategoryForOptions(null);
  };

  const resetCategoryForm = () => {
    setNewCategoryName('');
    setSelectedIcon('folder');
    setSelectedUsers([]);
    setSearchUsers('');
    setSearchIcons('');
  };

  const toggleUserSelection = (user) => {
    setSelectedUsers(prev => {
      const isSelected = prev.find(u => u.id === user.id);
      if (isSelected) {
        return prev.filter(u => u.id !== user.id);
      } else {
        return [...prev, user];
      }
    });
  };

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
    user.email.toLowerCase().includes(searchUsers.toLowerCase())
  );

  const filteredIcons = availableIcons.filter(icon =>
    icon.toLowerCase().includes(searchIcons.toLowerCase())
  );

  const handleItemPress = (item, type) => {
    if (type === 'folder') {
      navigateToFolder(item);
    } else if (type === 'file') {
      Alert.alert('View File', `Opening ${item.name}`);
    }
  };

  const handleItemOptions = (item, type) => {
    setSelectedItem(item);
    setSelectedItemType(type);
    setShowOptionsModal(true);
  };

  const handleItemAction = async (action) => {
    setShowOptionsModal(false);
    const item = selectedItem;
    const type = selectedItemType;
    
    try {
      if (action === 'view') {
        if (type === 'file') {
          const response = await fetch(`${BASE_URL}document/get-file-detail-list`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`,
              'X-Menu-Id': MENU_ID,
            },
            body: JSON.stringify({ id: item.id }),
          });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          updateToken(data.jwtToken);
          Alert.alert('File Details', JSON.stringify(data));
        } else {
          navigateToFolder(item);
        }
      } else if (action === 'download') {
        if (type === 'file') {
          Alert.alert('Download', `Downloading ${item.name}`);
          // Implement download logic here
        }
      } else if (action === 'share') {
        const api = type === 'folder' ? 'share-folder-data' : 'shareFile';
        const response = await fetch(`${BASE_URL}document/${api}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            'X-Menu-Id': MENU_ID,
          },
          body: JSON.stringify({
            id: item.id,
            type: type.toUpperCase(),
            layer: currentLevel.toString(),
            userId: selectedUsers.map(u => u.id).join(',') || 'IqHniRdscrD',
          }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        updateToken(data.jwtToken);
        Alert.alert('Success', `${type} shared successfully`);
      } else if (action === 'public_share') {
        const api = type === 'folder' ? 'public-share-folder-data' : 'publicShareFile';
        const response = await fetch(`${BASE_URL}document/${api}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            'X-Menu-Id': MENU_ID,
          },
          body: JSON.stringify({
            id: item.id,
            type: type.toUpperCase(),
            layer: currentLevel.toString(),
          }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        updateToken(data.jwtToken);
        Alert.alert('Success', `${type} publicly shared successfully`);
      } else if (action === 'archive') {
        const api = type === 'folder' ? 'archive-folder' : 'archiveFile';
        const response = await fetch(`${BASE_URL}document/${api}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            'X-Menu-Id': MENU_ID,
          },
          body: JSON.stringify({
            id: item.id,
            layer: currentLevel.toString(),
          }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        updateToken(data.jwtToken);
        Alert.alert('Success', `${type} archived successfully`);
      } else if (action === 'unarchive') {
        const api = type === 'folder' ? 'un-archive-folder' : 'un-archive-file';
        const response = await fetch(`${BASE_URL}document/${api}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            'X-Menu-Id': MENU_ID,
          },
          body: JSON.stringify({
            id: item.id,
            layer: currentLevel.toString(),
          }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        updateToken(data.jwtToken);
        Alert.alert('Success', `${type} unarchived successfully`);
      } else if (action === 'delete') {
        const api = type === 'folder' ? 'delete-folder' : 'delete-file';
        const response = await fetch(`${BASE_URL}document/${api}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            'X-Menu-Id': MENU_ID,
          },
          body: JSON.stringify({
            id: item.id,
            layer: currentLevel.toString(),
          }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        updateToken(data.jwtToken);
        Alert.alert('Success', `${type} deleted successfully`);
      } else if (action === 'permanent_delete') {
        const api = type === 'folder' ? 'permenent-delete-folder' : 'permenent-delete-file';
        const response = await fetch(`${BASE_URL}document/${api}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            'X-Menu-Id': MENU_ID,
          },
          body: JSON.stringify({
            id: item.id,
            layer: currentLevel.toString(),
          }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        updateToken(data.jwtToken);
        Alert.alert('Success', `${type} permanently deleted`);
      } else if (action === 'move') {
        Alert.alert('Move', `Moving ${type} ${item.name}`);
        // Implement move logic using get-folder-structure-for-move and move-file-to-folder
      } else if (action === 'audit') {
        const response = await fetch(`${BASE_URL}document/get-file-audit-trail-details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            'X-Menu-Id': MENU_ID,
          },
          body: JSON.stringify({ id: item.id }),
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        updateToken(data.jwtToken);
        Alert.alert('Audit Trail', JSON.stringify(data));
      } else if (action === 'versions') {
        if (type === 'file') {
          const response = await fetch(`${BASE_URL}document/file-revision-list`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${jwtToken}`,
              'X-Menu-Id': MENU_ID,
            },
            body: JSON.stringify({ id: item.id }),
          });
          if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
          const data = await response.json();
          updateToken(data.jwtToken);
          Alert.alert('Versions', JSON.stringify(data));
        }
      }
      loadCategoryContent(selectedCategory.id, parentFolderId, currentLevel.toString());
    } catch (error) {
      console.error(`Error performing ${action} on ${type}:`, error);
      Alert.alert('Error', `Failed to perform ${action} on ${type}`);
    }
    setSelectedItem(null);
    setSelectedItemType(null);
  };

  return (
    <MainLayout title="Manage Your Files">
      <View className="flex-1 bg-gray-50">
        <View className="flex-1">
          <View className="flex-row justify-between items-center p-4 bg-white border-b border-gray-200">
            <View className="flex-row items-center">
              <TouchableOpacity
                className="bg-blue-600 rounded-full p-2 mr-4"
                onPress={toggleSidebar}
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
              <View>
                <Text className="text-xl font-bold text-gray-800">
                  {selectedCategory?.name || 'Select Category'}
                </Text>
              </View>
            </View>
            
            <View className="flex-row space-x-3">
              <TouchableOpacity
                className="bg-blue-600 rounded-lg py-2 px-4 flex-row items-center"
                onPress={() => setShowCreateModal(true)}
              >
                <Ionicons name="add" size={20} color="white" />
                <Text className="text-white font-medium ml-2">Create</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="bg-white rounded-lg py-2 px-4 flex-row items-center border border-gray-300"
                onPress={() => handleCreateOption('upload')}
              >
                <Ionicons name="cloud-upload" size={20} color="#4B5563" />
                <Text className="text-gray-700 font-medium ml-2">Upload</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView className="flex-1 p-6">
            {currentPath.length > 0 && (
              <View className="flex-row items-center mb-4">
                <TouchableOpacity
                  className="flex-row items-center bg-white rounded-lg px-3 py-2 border border-gray-200"
                  onPress={navigateBack}
                >
                  <Ionicons name="chevron-back" size={16} color="#6B7280" />
                  <Text className="text-gray-600 ml-1">Back</Text>
                </TouchableOpacity>
                <View className="flex-1 ml-3">
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <Text className="text-sm text-gray-500">{getCurrentLocation()}</Text>
                  </ScrollView>
                </View>
              </View>
            )}

            <View className="bg-white rounded-lg p-3 flex-row items-center shadow-sm border border-gray-200 mb-6">
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Type to search for files or folders"
                className="ml-2 flex-1 text-gray-700"
                placeholderTextColor="#9CA3AF"
                onChangeText={async (text) => {
                  if (text.trim()) {
                    try {
                      const response = await fetch(`${BASE_URL}document/get-serach-folder-and-file-list`, {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${jwtToken}`,
                          'X-Menu-Id': MENU_ID,
                        },
                        body: JSON.stringify({
                          id: `${currentLevel}_${parentFolderId}`,
                          category: selectedCategory.id,
                          text: text.trim(),
                        }),
                      });
                      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                      const data = await response.json();
                      updateToken(data.jwtToken);
                      setCurrentFolderData({
                        folders: Array.isArray(data.folders) ? data.folders.map(f => ({
                          id: f.autoId,
                          name: f.folderName,
                          type: f.type || 'Folder',
                          files: f.fileCount || 0,
                          links: f.linkCount || 0,
                          icon: f.icon || 'folder',
                          color: f.color || '#3B82F6',
                          level: parseInt(currentLevel, 10),
                          categoryId: selectedCategory.id,
                          parentId: parentFolderId,
                        })) : [],
                        files: Array.isArray(data.files) ? data.files.map(f => ({
                          id: f.autoId,
                          name: f.fileName,
                          size: f.fileSize,
                          uploadDate: f.uploadDate,
                          type: f.type,
                        })) : [],
                      });
                    } catch (error) {
                      console.error('Search error:', error);
                      Alert.alert('Error', 'Failed to search');
                    }
                  } else {
                    loadCategoryContent(selectedCategory.id, parentFolderId, currentLevel.toString());
                  }
                }}
              />
            </View>

            {selectedCategory && (
              <View className="mb-8">
                <Text className="text-lg font-semibold text-gray-800 mb-4">Folders</Text>
                
                {loading ? (
                  <View className="items-center py-8">
                    <ActivityIndicator size="large" color="#3B82F6" />
                  </View>
                ) : (
                  <View className="flex-row flex-wrap justify-between">
                    {currentFolderData.folders.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        className="bg-white rounded-xl p-4 mb-4 w-[48%] shadow-sm border border-gray-200"
                        onPress={() => handleItemPress(item, 'folder')}
                      >
                        <View className="items-center mb-3">
                          <View className="w-16 h-16 bg-blue-100 rounded-lg items-center justify-center mb-2">
                            <Ionicons name={item.icon || 'folder'} size={32} color={item.color || '#3B82F6'} />
                          </View>
                          <Text className="text-sm font-semibold text-gray-800 text-center">{item.name}</Text>
                          <Text className="text-xs text-gray-500 text-center">{item.type}</Text>
                        </View>
                        
                        <View className="flex-row justify-between">
                          <View className="flex-row items-center">
                            <Ionicons name="folder" size={14} color="#F59E0B" />
                            <Text className="text-xs text-gray-600 ml-1">{item.files}</Text>
                          </View>
                          <View className="flex-row items-center">
                            <Ionicons name="document" size={14} color="#3B82F6" />
                            <Text className="text-xs text-gray-600 ml-1">{item.links}</Text>
                          </View>
                          <View className="flex-row items-center">
                            <Ionicons name="link" size={14} color="#10B981" />
                            <Text className="text-xs text-gray-600 ml-1">{item.links}</Text>
                          </View>
                          <TouchableOpacity onPress={() => handleItemOptions(item, 'folder')}>
                            <MaterialIcons name="more-vert" size={20} color="#6B7280" />
                          </TouchableOpacity>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}

            <View className="mb-8">
              <Text className="text-lg font-semibold text-gray-800 mb-4">Files</Text>
              {loading ? (
                <View className="items-center py-8">
                  <ActivityIndicator size="large" color="#3B82F6" />
                  </View>
              ) : (
                <View className="space-y-4">
                  {currentFolderData.files.map((file, index) => (
                    <TouchableOpacity
                      key={index}
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 flex-row items-center justify-between"
                      onPress={() => handleItemPress(file, 'file')}
                    >
                      <View className="flex-row items-center">
                        <View className="w-12 h-12 bg-blue-100 rounded-lg items-center justify-center mr-3">
                          <Ionicons name="document" size={24} color="#3B82F6" />
                        </View>
                        <View>
                          <Text className="text-sm font-semibold text-gray-800">{file.name}</Text>
                          <Text className="text-xs text-gray-500">{file.size}</Text>
                          <Text className="text-xs text-gray-400">{file.uploadDate}</Text>
                        </View>
                      </View>
                      <TouchableOpacity onPress={() => handleItemOptions(file, 'file')}>
                        <MaterialIcons name="more-vert" size={20} color="#6B7280" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                  {currentFolderData.files.length === 0 && (
                    <View className="bg-white rounded-xl p-4 border border-gray-200">
                      <Text className="text-gray-500 text-center">No files in this location</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          </ScrollView>
        </View>

        {sidebarVisible && (
          <TouchableOpacity
            className="absolute inset-0 bg-black/30 z-10"
            onPress={() => setSidebarVisible(false)}
            activeOpacity={1}
          />
        )}

        <Animated.View
          className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-lg z-20 border-r border-gray-200"
          style={{
            transform: [{ translateX: sidebarAnimation }],
          }}
        >
          <View className="p-4 border-b border-gray-200">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-semibold text-gray-800">Categories</Text>
              <TouchableOpacity
                onPress={() => setShowAddCategoryModal(true)}
                className="bg-blue-600 rounded-full p-2"
              >
                <Ionicons name="add" size={20} color="white" />
              </TouchableOpacity>
            </View>
            <Text className="text-sm text-gray-500">Organize your server place.</Text>
          </View>

          <ScrollView className="flex-1">
            {loading ? (
              <View className="p-4">
                <ActivityIndicator size="small" color="#3B82F6" />
              </View>
            ) : (
              categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  className={`flex-row items-center p-4 border-b border-gray-100 ${
                    selectedCategory?.id === category.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                  }`}
                  onPress={() => handleCategorySelect(category)}
                >
                  <View className="mr-3">
                    <Ionicons name={category.icon} size={20} color={category.color} />
                  </View>
                  <Text className={`flex-1 ${
                    selectedCategory?.id === category.id ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}>
                    {category.name}
                  </Text>
                  <TouchableOpacity
                    onPress={(e) => handleCategoryOptions(category, e)}
                    className="p-1"
                  >
                    <Ionicons name="ellipsis-horizontal" size={16} color="#9CA3AF" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))
            )}
          </ScrollView>

          <View className="border-t border-gray-200 p-4">
            <View className="flex-row justify-between">
              {[
                { icon: 'person-add', label: 'Assign' },
                { icon: 'share-social', label: 'Share' },
                { icon: 'archive', label: 'Archive' },
                { icon: 'trash', label: 'Delete' },
              ].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  className="items-center p-2"
                  onPress={() => Alert.alert('Action', `${item.label} functionality`)}
                >
                  <Ionicons name={item.icon} size={20} color="#6B7280" />
                  <Text className="text-xs text-gray-600 mt-1">{item.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Animated.View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showCreateFolderModal}
          onRequestClose={() => setShowCreateFolderModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-xl p-6 w-96 max-h-[80%] shadow-lg">
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-xl font-semibold text-gray-800">Create Folder</Text>
                  <Text className="text-sm text-gray-500">in {getCurrentLocation()}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowCreateFolderModal(false)}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View className="bg-blue-50 rounded-lg p-3 mb-4">
                  <Text className="text-sm font-medium text-blue-800 mb-1">Creating in:</Text>
                  <Text className="text-sm text-blue-600">{getCurrentLocation()}</Text>
                  <Text className="text-xs text-blue-500">Level: {currentLevel}</Text>
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Folder Name *</Text>
                  <TextInput
                    placeholder="Enter folder name"
                    className="border border-gray-300 rounded-lg p-3"
                    value={newFolderName}
                    onChangeText={setNewFolderName}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Description</Text>
                  <TextInput
                    placeholder="Enter folder description (optional)"
                    className="border border-gray-300 rounded-lg p-3"
                    value={newFolderDescription}
                    onChangeText={setNewFolderDescription}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Folder Icon</Text>
                  <TouchableOpacity
                    className="border border-gray-300 rounded-lg p-3 flex-row items-center justify-between"
                    onPress={() => setShowIconPicker(true)}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={selectedIcon} size={20} color="#3B82F6" />
                      <Text className="ml-2 text-gray-700 capitalize">{selectedIcon}</Text>
                    </View>
                    <Ionicons name="chevron-down" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <View className="mb-6">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Share with users</Text>
                  <TouchableOpacity
                    className="border border-gray-300 rounded-lg p-3 flex-row items-center justify-between"
                    onPress={() => setShowUserPicker(true)}
                  >
                    <Text className="text-gray-700">
                      {selectedUsers.length > 0 ? `${selectedUsers.length} Selected` : 'Select users (optional)'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#6B7280" />
                  </TouchableOpacity>
                  
                  {selectedUsers.length > 0 && (
                    <View className="mt-2">
                      {selectedUsers.map(user => (
                        <View key={user.id} className="flex-row items-center justify-between py-1">
                          <Text className="text-sm text-gray-600">{user.name}</Text>
                          <TouchableOpacity onPress={() => toggleUserSelection(user)}>
                            <Ionicons name="close-circle" size={16} color="#EF4444" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>

              <View className="flex-row justify-end space-x-3">
                <TouchableOpacity
                  className="px-4 py-2 rounded-lg border border-gray-300"
                  onPress={() => setShowCreateFolderModal(false)}
                >
                  <Text className="text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-blue-600 px-4 py-2 rounded-lg"
                  onPress={handleCreateFolder}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text className="text-white">Create Folder</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showUploadModal}
          onRequestClose={() => setShowUploadModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-xl p-6 w-96 max-h-[80%] shadow-lg">
              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-xl font-semibold text-gray-800">Upload Document</Text>
                  <Text className="text-sm text-gray-500">to {getCurrentLocation()}</Text>
                </View>
                <TouchableOpacity onPress={() => setShowUploadModal(false)}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View className="bg-green-50 rounded-lg p-3 mb-4">
                  <Text className="text-sm font-medium text-green-800 mb-1">Uploading to:</Text>
                  <Text className="text-sm text-green-600">{getCurrentLocation()}</Text>
                  <Text className="text-xs text-green-500">Level: {currentLevel}</Text>
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Document Title *</Text>
                  <TextInput
                    placeholder="Enter document title"
                    className="border border-gray-300 rounded-lg p-3"
                    value={uploadTitle}
                    onChangeText={setUploadTitle}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Description</Text>
                  <TextInput
                    placeholder="Enter document description (optional)"
                    className="border border-gray-300 rounded-lg p-3"
                    value={uploadDescription}
                    onChangeText={setUploadDescription}
                    multiline
                    numberOfLines={3}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Select Files</Text>
                  <TouchableOpacity
                    className="border border-dashed border-gray-300 rounded-lg p-6 items-center"
                    onPress={pickFiles}
                  >
                    <Ionicons name="cloud-upload" size={32} color="#9CA3AF" />
                    <Text className="text-gray-500 mt-2">Tap to select files</Text>
                    <Text className="text-xs text-gray-400">Supports PDF, DOC, XLS, JPG, PNG</Text>
                  </TouchableOpacity>
                  
                  {selectedFiles.length > 0 && (
                    <View className="mt-2">
                      <Text className="text-sm font-medium text-gray-700 mb-2">Selected Files:</Text>
                      {selectedFiles.map((file, index) => (
                        <View key={index} className="flex-row items-center justify-between py-2 border-b border-gray-100">
                          <View className="flex-row items-center">
                            <Ionicons name="document" size={16} color="#3B82F6" />
                            <Text className="text-sm text-gray-600 ml-2">{file.name}</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedFiles(prev => prev.filter((_, i) => i !== index));
                            }}
                          >
                            <Ionicons name="close-circle" size={16} color="#EF4444" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>

                <View className="mb-6">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Share with users</Text>
                  <TouchableOpacity
                    className="border border-gray-300 rounded-lg p-3 flex-row items-center justify-between"
                    onPress={() => setShowUserPicker(true)}
                  >
                    <Text className="text-gray-700">
                      {selectedUsers.length > 0 ? `${selectedUsers.length} Selected` : 'Select users (optional)'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#6B7280" />
                  </TouchableOpacity>
                  
                  {selectedUsers.length > 0 && (
                    <View className="mt-2">
                      {selectedUsers.map(user => (
                        <View key={user.id} className="flex-row items-center justify-between py-1">
                          <Text className="text-sm text-gray-600">{user.name}</Text>
                          <TouchableOpacity onPress={() => toggleUserSelection(user)}>
                            <Ionicons name="close-circle" size={16} color="#EF4444" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>

              <View className="flex-row justify-end space-x-3">
                <TouchableOpacity
                  className="px-4 py-2 rounded-lg border border-gray-300"
                  onPress={() => setShowUploadModal(false)}
                >
                  <Text className="text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-600 px-4 py-2 rounded-lg"
                  onPress={handleUpload}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text className="text-white">Upload</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showCategoryOptions}
          onRequestClose={() => setShowCategoryOptions(false)}
        >
          <TouchableOpacity
            className="flex-1 justify-center items-center bg-black/50"
            onPress={() => setShowCategoryOptions(false)}
            activeOpacity={1}
          >
            <View className="bg-white rounded-xl p-4 w-48 shadow-lg">
              <Text className="text-lg font-semibold text-gray-800 mb-3">
                {selectedCategoryForOptions?.name}
              </Text>
              
              {selectedCategoryForOptions?.isDefault ? (
                <TouchableOpacity
                  className="flex-row items-center p-3"
                  onPress={() => handleCategoryAction('view')}
                >
                  <Ionicons name="eye" size={20} color="#3B82F6" />
                  <Text className="ml-3 text-gray-700">View</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    className="flex-row items-center p-3 border-b border-gray-100"
                    onPress={() => handleCategoryAction('view')}
                  >
                    <Ionicons name="eye" size={20} color="#3B82F6" />
                    <Text className="ml-3 text-gray-700">View</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    className="flex-row items-center p-3"
                    onPress={() => handleCategoryAction('edit')}
                  >
                    <Ionicons name="create" size={20} color="#F59E0B" />
                    <Text className="ml-3 text-gray-700">Edit</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showAddCategoryModal}
          onRequestClose={() => setShowAddCategoryModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-xl p-6 w-96 max-h-[80%] shadow-lg">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-semibold text-gray-800">New Key Folder</Text>
                <TouchableOpacity onPress={() => setShowAddCategoryModal(false)}>
                  <Ionicons name="close" size={24} color="#6B7280" />
                </TouchableOpacity>
              </View>

              <ScrollView>
                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Folder Name *</Text>
                  <TextInput
                    placeholder="Enter folder name"
                    className="border border-gray-300 rounded-lg p-3"
                    value={newCategoryName}
                    onChangeText={setNewCategoryName}
                  />
                </View>

                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Folder Icon *</Text>
                  <TouchableOpacity
                    className="border border-gray-300 rounded-lg p-3 flex-row items-center justify-between"
                    onPress={() => setShowIconPicker(true)}
                  >
                    <View className="flex-row items-center">
                      <Ionicons name={selectedIcon} size={20} color="#3B82F6" />
                      <Text className="ml-2 text-gray-700 capitalize">{selectedIcon}</Text>
                    </View>
                    <Ionicons name="chevron-down" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>

                <View className="mb-6">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Add users to share *</Text>
                  <TouchableOpacity
                    className="border border-gray-300 rounded-lg p-3 flex-row items-center justify-between"
                    onPress={() => setShowUserPicker(true)}
                  >
                    <Text className="text-gray-700">
                      {selectedUsers.length > 0 ? `${selectedUsers.length} Selected` : 'Select Options'}
                    </Text>
                    <Ionicons name="chevron-down" size={20} color="#6B7280" />
                  </TouchableOpacity>
                  
                  {selectedUsers.length > 0 && (
                    <View className="mt-2">
                      {selectedUsers.map(user => (
                        <View key={user.id} className="flex-row items-center justify-between py-1">
                          <Text className="text-sm text-gray-600">{user.name}</Text>
                          <TouchableOpacity onPress={() => toggleUserSelection(user)}>
                            <Ionicons name="close-circle" size={16} color="#EF4444" />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              </ScrollView>

              <View className="flex-row justify-end space-x-3">
                <TouchableOpacity
                  className="px-4 py-2 rounded-lg border border-gray-300"
                  onPress={() => setShowAddCategoryModal(false)}
                >
                  <Text className="text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-blue-600 px-4 py-2 rounded-lg"
                  onPress={handleAddCategory}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text className="text-white">Add Folder</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showIconPicker}
          onRequestClose={() => setShowIconPicker(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-xl p-6 w-80 max-h-96">
              <Text className="text-lg font-semibold text-gray-800 mb-4">Folder Icon</Text>
              
              <TextInput
                placeholder="Search icons..."
                className="border border-gray-300 rounded-lg p-2 mb-4"
                value={searchIcons}
                onChangeText={setSearchIcons}
              />
              
              <FlatList
                data={filteredIcons}
                numColumns={5}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    className={`p-3 m-1 rounded-lg ${selectedIcon === item ? 'bg-blue-100' : 'bg-gray-100'}`}
                    onPress={() => {
                      setSelectedIcon(item);
                      setShowIconPicker(false);
                    }}
                  >
                    <Ionicons name={item} size={24} color={selectedIcon === item ? '#3B82F6' : '#6B7280'} />
                  </TouchableOpacity>
                )}
              />
              
              <View className="flex-row justify-between mt-4">
                <Text className="text-sm text-gray-500">1 - 15 of {availableIcons.length}</Text>
                <View className="flex-row">
                  <TouchableOpacity className="mx-2">
                    <Ionicons name="chevron-back" size={20} color="#6B7280" />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons name="chevron-forward" size={20} color="#6B7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showUserPicker}
          onRequestClose={() => setShowUserPicker(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-xl p-6 w-80 max-h-96">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold text-gray-800">Select Users</Text>
                <Text className="text-sm text-gray-500">{filteredUsers.length} / {availableUsers.length}</Text>
              </View>
              
              <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const isSelected = selectedUsers.find(u => u.id === item.id);
                  return (
                    <TouchableOpacity
                      className="flex-row items-center p-2 border-b border-gray-100"
                      onPress={() => toggleUserSelection(item)}
                    >
                      <View className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
                        isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                      }`}>
                        {isSelected && <Ionicons name="checkmark" size={12} color="white" />}
                      </View>
                      <Text className="text-gray-800">{item.name}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
              
              <TouchableOpacity
                className="mt-4 bg-blue-600 p-2 rounded-lg"
                onPress={() => setShowUserPicker(false)}
              >
                <Text className="text-center text-white">Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showCreateModal}
          onRequestClose={() => setShowCreateModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white rounded-xl p-6 w-64">
              <Text className="text-lg font-semibold text-gray-800 mb-4">Create</Text>
              
              <TouchableOpacity
                className="flex-row items-center p-3 border-b border-gray-100"
                onPress={() => handleCreateOption('folder')}
              >
                <Ionicons name="folder" size={20} color="#3B82F6" />
                <Text className="ml-3 text-gray-700">Create Folder</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-row items-center p-3"
                onPress={() => handleCreateOption('upload')}
              >
                <Ionicons name="document" size={20} color="#F59E0B" />
                <Text className="ml-3 text-gray-700">Version Upload</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="mt-4 bg-gray-200 p-2 rounded-lg"
                onPress={() => setShowCreateModal(false)}
              >
                <Text className="text-center text-gray-600">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showOptionsModal}
          onRequestClose={() => setShowOptionsModal(false)}
        >
          <TouchableOpacity
            className="flex-1 justify-center items-center bg-black/50"
            onPress={() => setShowOptionsModal(false)}
            activeOpacity={1}
          >
            <View className="bg-white rounded-xl p-4 w-48 shadow-lg">
              <Text className="text-lg font-semibold text-gray-800 mb-3">
                {selectedItem?.name}
              </Text>
              
              <TouchableOpacity
                className="flex-row items-center p-3 border-b border-gray-100"
                onPress={() => handleItemAction('view')}
              >
                <Ionicons name="eye" size={20} color="#3B82F6" />
                <Text className="ml-3 text-gray-700">View</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-row items-center p-3 border-b border-gray-100"
                onPress={() => handleItemAction('download')}
              >
                <Ionicons name="download" size={20} color="#10B981" />
                <Text className="ml-3 text-gray-700">Download</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-row items-center p-3 border-b border-gray-100"
                onPress={() => handleItemAction('share')}
              >
                <Ionicons name="share-social" size={20} color="#6366F1" />
                <Text className="ml-3 text-gray-700">Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-row items-center p-3 border-b border-gray-100"
                onPress={() => handleItemAction('public_share')}
              >
                <Ionicons name="globe" size={20} color="#8B5CF6" />
                <Text className="ml-3 text-gray-700">Public Share</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-row items-center p-3 border-b border-gray-100"
                onPress={() => handleItemAction('archive')}
              >
                <Ionicons name="archive" size={20} color="#F59E0B" />
                <Text className="ml-3 text-gray-700">Archive</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-row items-center p-3 border-b border-gray-100"
                onPress={() => handleItemAction('unarchive')}
              >
                <Ionicons name="archive" size={20} color="#10B981" />
                <Text className="ml-3 text-gray-700">Unarchive</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-row items-center p-3 border-b border-gray-100"
                onPress={() => handleItemAction('move')}
              >
                <Ionicons name="move" size={20} color="#6B7280" />
                <Text className="ml-3 text-gray-700">Move</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-row items-center p-3 border-b border-gray-100"
                onPress={() => handleItemAction('audit')}
              >
                <Ionicons name="time" size={20} color="#6366F1" />
                <Text className="ml-3 text-gray-700">Audit Trail</Text>
              </TouchableOpacity>
              
              {selectedItemType === 'file' && (
                <TouchableOpacity
                  className="flex-row items-center p-3"
                  onPress={() => handleItemAction('versions')}
                >
                  <Ionicons name="layers" size={20} color="#8B5CF6" />
                  <Text className="ml-3 text-gray-700">Versions</Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                className="flex-row items-center p-3"
                onPress={() => handleItemAction('delete')}
              >
                <Ionicons name="trash" size={20} color="#EF4444" />
                <Text className="ml-3 text-red-600">Delete</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-row items-center p-3"
                onPress={() => handleItemAction('permanent_delete')}
              >
                <Ionicons name="trash" size={20} color="#B91C1C" />
                <Text className="ml-3 text-red-800">Permanent Delete</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </MainLayout>
  );
}