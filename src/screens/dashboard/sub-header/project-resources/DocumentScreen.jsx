
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  Alert,
  SafeAreaView,
  ActivityIndicator,
  Animated,
  Dimensions,
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as DocumentPicker from 'expo-document-picker'; // Added for file picker

const { width: screenWidth } = Dimensions.get('window');

export default function DocumentScreen() {
  // State management
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currentFolderData, setCurrentFolderData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Navigation states
  const [currentPath, setCurrentPath] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [parentFolderId, setParentFolderId] = useState(null);
  
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

  // Sample data
  const availableIcons = [
    'folder', 'document', 'briefcase', 'person', 'people', 'time', 'search',
    'image', 'copy', 'tv', 'ribbon', 'archive', 'settings', 'star', 'heart',
    'bookmark', 'flag', 'tag', 'calendar', 'clock', 'camera', 'music',
  ];

  const availableUsers = [
    { id: '1', name: 'Alan David', email: 'alan@example.com' },
    { id: '2', name: 'Mukesh Sinha', email: 'mukesh@example.com' },
    { id: '3', name: 'Moteen', email: 'moteen@example.com' },
    { id: '4', name: 'Sonalika', email: 'sonalika@example.com' },
    { id: '5', name: 'Martin', email: 'martin@example.com' },
  ];

  // Initialize categories
  useEffect(() => {
    loadCategories();
  }, []);

  // Sidebar animation
  useEffect(() => {
    Animated.timing(sidebarAnimation, {
      toValue: sidebarVisible ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [sidebarVisible]);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const mockCategories = [
        { id: '1', name: 'Application', icon: 'folder', color: '#3B82F6', isDefault: true },
        { id: '2', name: 'General Folder', icon: 'briefcase', color: '#10B981', isDefault: false },
        { id: '3', name: 'Structure folder', icon: 'settings', color: '#F59E0B', isDefault: false },
        { id: '4', name: 'New Folder', icon: 'star', color: '#8B5CF6', isDefault: false },
      ];
      setCategories(mockCategories);
      const defaultCategory = mockCategories.find(cat => cat.isDefault) || mockCategories[0];
      setSelectedCategory(defaultCategory);
      loadCategoryContent(defaultCategory.id);
    } catch (error) {
      console.error('Error loading categories:', error);
      Alert.alert('Error', 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryContent = async (categoryId, folderId = null, level = 0) => {
    setLoading(true);
    try {
      const mockContent = {
        '1': {
          folders: [
            {
              id: 'f1',
              name: 'Drawing',
              type: 'Submittal',
              files: 0,
              links: 8,
              icon: 'document',
              color: '#F59E0B',
              level: 0,
              categoryId: '1',
              parentId: null,
            },
            {
              id: 'f2',
              name: 'Activity',
              type: 'Inspection',
              files: 18,
              links: 11,
              icon: 'time',
              color: '#10B981',
              level: 0,
              categoryId: '1',
              parentId: null,
            },
            {
              id: 'f3',
              name: 'Email',
              type: 'Communication',
              files: 6,
              links: 5,
              icon: 'mail',
              color: '#6366F1',
              level: 0,
              categoryId: '1',
              parentId: null,
            },
            {
              id: 'f4',
              name: 'RFI',
              type: 'Information',
              files: 5,
              links: 0,
              icon: 'help-circle',
              color: '#8B5CF6',
              level: 0,
              categoryId: '1',
              parentId: null,
            },
          ],
          files: [],
        },
        '2': {
          folders: [
            { id: 'f5', name: 'Documents', type: 'General', files: 15, links: 3, icon: 'document', color: '#F59E0B', level: 0, categoryId: '2', parentId: null },
            { id: 'f6', name: 'Images', type: 'Media', files: 42, links: 0, icon: 'image', color: '#EC4899', level: 0, categoryId: '2', parentId: null },
          ],
          files: [],
        },
        '3': {
          folders: [
            { id: 'f7', name: 'Templates', type: 'Structure', files: 8, links: 2, icon: 'copy', color: '#10B981', level: 0, categoryId: '3', parentId: null },
            { id: 'f8', name: 'Layouts', type: 'Design', files: 12, links: 1, icon: 'grid', color: '#6366F1', level: 0, categoryId: '3', parentId: null },
          ],
          files: [],
        },
        '4': {
          folders: [
            { id: 'f9', name: 'Recent', type: 'New Items', files: 3, links: 1, icon: 'time', color: '#8B5CF6', level: 0, categoryId: '4', parentId: null },
          ],
          files: [],
        },
      };

      if (folderId) {
        const subfolderContent = {
          folders: [
            {
              id: `${folderId}_sub1`,
              name: `Subfolder 1`,
              type: 'Subfolder',
              files: 2,
              links: 1,
              icon: 'folder',
              color: '#3B82F6',
              level: level,
              categoryId: categoryId,
              parentId: folderId,
            },
            {
              id: `${folderId}_sub2`,
              name: `Subfolder 2`,
              type: 'Subfolder',
              files: 5,
              links: 3,
              icon: 'folder',
              color: '#10B981',
              level: level,
              categoryId: categoryId,
              parentId: folderId,
            },
          ],
          files: [
            { id: `${folderId}_file1`, name: 'Document 1.pdf', size: '2.5 MB', uploadDate: '2025-01-15', type: 'pdf' },
            { id: `${folderId}_file2`, name: 'Image.jpg', size: '1.2 MB', uploadDate: '2025-01-14', type: 'image' },
          ],
        };
        setCurrentFolderData(subfolderContent.folders || []);
      } else {
        setCurrentFolderData(mockContent[categoryId]?.folders || []);
      }
      
      setCurrentLevel(level);
      setParentFolderId(folderId);
    } catch (error) {
      console.error('Error loading category content:', error);
      Alert.alert('Error', 'Failed to load folder content');
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
    await loadCategoryContent(folder.categoryId, folder.id, folder.level + 1);
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
      await loadCategoryContent(selectedCategory.id, parentFolder.id, parentFolder.level + 1);
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
      const newFolder = {
        id: `folder_${Date.now()}`,
        name: newFolderName,
        type: newFolderDescription || 'Custom Folder',
        files: 0,
        links: 0,
        icon: selectedIcon,
        color: '#3B82F6',
        level: currentLevel,
        categoryId: selectedCategory.id,
        parentId: parentFolderId,
        createdAt: new Date().toISOString(),
        users: selectedUsers,
      };

      console.log('Creating folder:', {
        categoryId: selectedCategory.id,
        parentFolderId: parentFolderId,
        level: currentLevel,
        folderData: newFolder,
        currentLocation: getCurrentLocation(),
      });

      setCurrentFolderData(prev => [...prev, newFolder]);
      resetFolderForm();
      setShowCreateFolderModal(false);
      Alert.alert('Success', `Folder "${newFolderName}" created successfully in ${getCurrentLocation()}`);
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
      } else {
        console.log('File picker canceled');
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
      const uploadData = {
        id: `upload_${Date.now()}`,
        title: uploadTitle,
        description: uploadDescription,
        files: selectedFiles,
        categoryId: selectedCategory.id,
        parentFolderId: parentFolderId,
        level: currentLevel,
        uploadedAt: new Date().toISOString(),
        users: selectedUsers,
      };

      console.log('Uploading document:', {
        categoryId: selectedCategory.id,
        parentFolderId: parentFolderId,
        level: currentLevel,
        uploadData: uploadData,
        currentLocation: getCurrentLocation(),
      });

      resetUploadForm();
      setShowUploadModal(false);
      Alert.alert('Success', `Document uploaded successfully to ${getCurrentLocation()}`);
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
      const newCategory = {
        id: Date.now().toString(),
        name: newCategoryName,
        icon: selectedIcon,
        color: '#3B82F6',
        users: selectedUsers,
        isDefault: false,
      };

      setCategories(prev => [...prev, newCategory]);
      resetCategoryForm();
      setShowAddCategoryModal(false);
      setSidebarVisible(false);
      Alert.alert('Success', 'Category added successfully');
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

  const handleCategoryAction = (action) => {
    setShowCategoryOptions(false);
    if (action === 'view') {
      Alert.alert('View Category', `Viewing ${selectedCategoryForOptions?.name} details`);
    } else if (action === 'edit') {
      Alert.alert('Edit Category', `Editing ${selectedCategoryForOptions?.name}`);
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
                    {currentFolderData.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        className="bg-white rounded-xl p-4 mb-4 w-[48%] shadow-sm border border-gray-200"
                        onPress={() => navigateToFolder(item)}
                      >
                        <View className="items-center mb-3">
                          <View className="w-16 h-16 bg-blue-100 rounded-lg items-center justify-center mb-2">
                            <Ionicons name="folder" size={32} color="#3B82F6" />
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
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}

            <View className="mb-8">
              <Text className="text-lg font-semibold text-gray-800 mb-4">Files</Text>
              <View className="bg-white rounded-xl p-4 border border-gray-200">
                <Text className="text-gray-500 text-center">
                  {currentFolderData.length === 0 ? 'No files in this location' : 'Files will be displayed here'}
                </Text>
              </View>
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
                    placeholder="testing folder name"
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
                <Text className="text-sm text-gray-500">1 - 15 of 4840</Text>
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
                <Text className="text-sm text-gray-500">1 / 323</Text>
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
      </View>
    </MainLayout>
  );
}