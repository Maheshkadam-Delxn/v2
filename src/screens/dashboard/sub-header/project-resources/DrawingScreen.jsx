import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from 'react-native-vector-icons';
import MainLayout from '../../../components/MainLayout';
import { LinearGradient } from 'expo-linear-gradient';

// Image Placeholder Components
const ImagePlaceholder1 = () => (
  <Image
    source={{ uri: 'https://via.placeholder.com/200x300' }} // Replace with actual image URL 1
    className="w-1/2 h-60 rounded-lg"
    resizeMode="cover"
  />
);

const ImagePlaceholder2 = () => (
  <Image
    source={{ uri: 'https://via.placeholder.com/200x300' }} // Replace with actual image URL 2
    className="w-1/2 h-60 rounded-lg"
    resizeMode="cover"
  />
);

// Action Button Component
const ActionButton = ({ iconName, onPress }) => (
  <TouchableOpacity 
    className="w-10 h-10 rounded-full justify-center items-center mx-1"
    style={{ backgroundColor: '#3b82f6' }}
    onPress={onPress}
  >
    <MaterialIcons name={iconName} size={24} color="#ffffff" />
  </TouchableOpacity>
);

export default function DrawingScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params || { projectId: 1 };
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', description: '', category: '' });
  const [filterForm, setFilterForm] = useState({ category: '', type: '' });

  const drawings = [
    { id: 1, title: 'Drawing 1', description: 'Structural Plan', category: 'Structural', type: 'Floor Drawing' },
    { id: 2, title: 'Drawing 2', description: 'Elevation View', category: 'General', type: 'Structural BOQ Group' },
    { id: 3, title: 'Drawing 3', description: 'Site Layout', category: 'Structural', type: 'Floor Drawing' },
  ];

  const tabs = selectedDrawing
    ? ['All', 'General', 'Structural', 'Floor Drawing', 'Structural BOQ Group']
    : ['All', 'General', 'Structural'];

  // Filter drawings based on active tab and filter form
  const filteredDrawings = drawings.filter(drawing => {
    const matchesTab = activeTab === 'All' || drawing.category === activeTab || drawing.type === activeTab;
    const matchesFilter =
      (!filterForm.category || drawing.category.toLowerCase().includes(filterForm.category.toLowerCase())) &&
      (!filterForm.type || drawing.type.toLowerCase().includes(filterForm.type.toLowerCase()));
    return matchesTab && matchesFilter;
  });

  // Navigation functions
  const navigateToAddDrawing = () => {
    navigation.navigate('AddDrawing', { projectId });
  };

  const navigateToAddPhase = () => {
    navigation.navigate('AddDrawingPhase', { projectId });
  };

  const handleEdit = () => {
    if (selectedDrawing) {
      setEditForm({
        title: selectedDrawing.title,
        description: selectedDrawing.description,
        category: selectedDrawing.category,
      });
      setEditModalVisible(true);
    }
  };

  const handleSaveEdit = () => {
    // Logic to save edited drawing
    setEditModalVisible(false);
  };

  const handleApplyFilter = () => {
    // Apply filter and close modal
    setFilterModalVisible(false);
  };

  const handleDownload = () => {
    // Logic to download drawings (e.g., generate PDF or image)
    console.log('Download triggered');
  };

  // Determine which images to display based on filtered drawings
  const showImage1 = filteredDrawings.length > 0;
  const showImage2 = filteredDrawings.length > 1;

  return (
    <MainLayout title="Drawing">
      <View className="flex-1 bg-white">
        {/* Filter Tabs with Filter and Download Buttons */}
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
            contentContainerStyle={{ paddingHorizontal: 8, gap: 8 }}
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
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 8,
                backgroundColor: '#3b82f6',
                borderRadius: 9999,
              }}
              onPress={() => setFilterModalVisible(true)}
            >
              <MaterialIcons name="filter-list" size={24} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 8,
                backgroundColor: '#3b82f6',
                borderRadius: 9999,
              }}
              onPress={handleDownload}
            >
              <MaterialIcons name="file-download" size={24} color="#ffffff" />
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>

        {/* Search and Action Buttons Bar */}
        <View className="px-6 py-3 bg-white">
          {/* Search Bar */}
          <View className="flex-row items-center mb-3">
            <View className="flex-1 bg-blue-50 rounded-lg px-4 py-2 flex-row items-center">
              <MaterialIcons name="search" size={20} color="#3b82f6" className="mr-2" />
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                className="flex-1 text-blue-800"
                placeholderTextColor="#93C5FD"
                placeholder="Search drawings..."
              />
            </View>
          </View>

          {/* Action Buttons Row */}
          <View className="flex-row items-center justify-between">
            <TouchableOpacity 
              className="flex-1 px-4 py-3 rounded-lg mr-2 flex-row items-center justify-center"
              style={{ backgroundColor: '#3b82f6' }}
              onPress={navigateToAddDrawing}
            >
              <MaterialIcons name="add" size={20} color="#ffffff" className="mr-1" />
              <Text className="text-white font-semibold ml-1">Add Drawing</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="flex-1 px-4 py-3 rounded-lg ml-2 flex-row items-center justify-center"
              style={{ backgroundColor: '#34c759' }}
              onPress={navigateToAddPhase}
            >
              <MaterialIcons name="timeline" size={20} color="#ffffff" className="mr-1" />
              <Text className="text-white font-semibold ml-1">Add Phase</Text>
            </TouchableOpacity>
          </View>

          {/* Select Drawing Button */}
          <TouchableOpacity 
            className="mt-3 px-4 py-3 rounded-lg border-2 border-blue-200"
            style={{ backgroundColor: '#f8fafc' }}
            onPress={() => setDropdownVisible(true)}
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-blue-800 font-medium">
                {selectedDrawing ? selectedDrawing.title : 'Select a Drawing'}
              </Text>
              <MaterialIcons name="keyboard-arrow-down" size={24} color="#3b82f6" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Drawing Content */}
        <ScrollView className="flex-1 px-6 pt-4">
          <View className="flex-row justify-between mb-6">
            {showImage1 && <ImagePlaceholder1 />}
            {showImage2 && <ImagePlaceholder2 />}
            {!showImage1 && !showImage2 && (
              <View className="w-full bg-blue-50 rounded-lg p-8 items-center">
                <MaterialIcons name="image" size={48} color="#93C5FD" />
                <Text className="text-blue-600 text-center mt-2 font-medium">
                  No drawings available for this filter
                </Text>
                <Text className="text-blue-400 text-center mt-1 text-sm">
                  Try adjusting your filters or add a new drawing
                </Text>
              </View>
            )}
          </View>

          {/* Drawing Info Card */}
          {selectedDrawing && (
            <View className="bg-blue-50 rounded-lg p-4 mb-4">
              <View className="flex-row items-center mb-2">
                <MaterialIcons name="description" size={20} color="#3b82f6" />
                <Text className="text-blue-800 font-bold text-lg ml-2">{selectedDrawing.title}</Text>
              </View>
              <Text className="text-blue-600 mb-1">
                <Text className="font-medium">Description:</Text> {selectedDrawing.description}
              </Text>
              <Text className="text-blue-600 mb-1">
                <Text className="font-medium">Category:</Text> {selectedDrawing.category}
              </Text>
              <Text className="text-blue-600">
                <Text className="font-medium">Type:</Text> {selectedDrawing.type}
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Action Buttons */}
        <View className="flex-row justify-center px-6 py-4 bg-white border-t border-blue-100">
          <View className="flex-row">
            <ActionButton iconName="edit" onPress={handleEdit} />
            <ActionButton iconName="people" onPress={() => {}} />
            <ActionButton iconName="delete" onPress={() => {}} />
            <ActionButton iconName="file-download" onPress={() => {}} />
            <ActionButton iconName="share" onPress={() => {}} />
          </View>
        </View>

        {/* Edit Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
        >
          <View className="flex-1 bg-blue-800/30 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-6">
              <View className="flex-row items-center mb-6">
                <MaterialIcons name="edit" size={24} color="#3b82f6" />
                <Text className="text-xl font-bold text-blue-800 ml-2">Edit Drawing</Text>
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Title</Text>
                <TextInput
                  value={editForm.title}
                  onChangeText={text => setEditForm({ ...editForm, title: text })}
                  className="border border-blue-200 rounded-lg px-4 py-3 text-blue-800"
                  placeholder="Enter title"
                />
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Description</Text>
                <TextInput
                  value={editForm.description}
                  onChangeText={text => setEditForm({ ...editForm, description: text })}
                  className="border border-blue-200 rounded-lg px-4 py-3 text-blue-800"
                  placeholder="Enter description"
                  multiline
                />
              </View>
              <View className="mb-6">
                <Text className="text-blue-700 mb-2 font-medium">Category</Text>
                <TextInput
                  value={editForm.category}
                  onChangeText={text => setEditForm({ ...editForm, category: text })}
                  className="border border-blue-200 rounded-lg px-4 py-3 text-blue-800"
                  placeholder="Enter category"
                />
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  className="px-6 py-3 rounded-lg mr-3"
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text className="text-blue-600 font-medium">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-6 py-3 rounded-lg"
                  style={{ backgroundColor: '#3b82f6' }}
                  onPress={handleSaveEdit}
                >
                  <Text className="text-white font-medium">Save Changes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Drawing Dropdown */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={dropdownVisible}
          onRequestClose={() => setDropdownVisible(false)}
        >
          <View className="flex-1 bg-blue-800/30 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-4 max-h-80">
              <View className="flex-row items-center justify-between mb-4 pb-2 border-b border-blue-100">
                <Text className="text-lg font-bold text-blue-800">Select Drawing</Text>
                <TouchableOpacity onPress={() => setDropdownVisible(false)}>
                  <MaterialIcons name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>
              <ScrollView>
                {drawings.map(drawing => (
                  <TouchableOpacity
                    key={drawing.id}
                    className="py-3 border-b border-blue-50 flex-row items-center"
                    onPress={() => {
                      setSelectedDrawing(drawing);
                      setDropdownVisible(false);
                    }}
                  >
                    <MaterialIcons name="description" size={20} color="#3b82f6" />
                    <View className="ml-3 flex-1">
                      <Text className="text-blue-800 font-medium">{drawing.title}</Text>
                      <Text className="text-blue-600 text-sm">{drawing.description}</Text>
                      <Text className="text-blue-400 text-xs">{drawing.category} • {drawing.type}</Text>
                    </View>
                    {selectedDrawing?.id === drawing.id && (
                      <MaterialIcons name="check-circle" size={20} color="#34c759" />
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Filter Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={filterModalVisible}
          onRequestClose={() => setFilterModalVisible(false)}
        >
          <View className="flex-1 bg-blue-800/30 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-6">
              <View className="flex-row items-center mb-6">
                <MaterialIcons name="filter-list" size={24} color="#3b82f6" />
                <Text className="text-xl font-bold text-blue-800 ml-2">Filter Drawings</Text>
              </View>
              <View className="mb-4">
                <Text className="text-blue-700 mb-2 font-medium">Category</Text>
                <TextInput
                  value={filterForm.category}
                  onChangeText={text => setFilterForm({ ...filterForm, category: text })}
                  className="border border-blue-200 rounded-lg px-4 py-3 text-blue-800"
                  placeholder="Enter category to filter"
                  placeholderTextColor="#93C5FD"
                />
              </View>
              <View className="mb-6">
                <Text className="text-blue-700 mb-2 font-medium">Type</Text>
                <TextInput
                  value={filterForm.type}
                  onChangeText={text => setFilterForm({ ...filterForm, type: text })}
                  className="border border-blue-200 rounded-lg px-4 py-3 text-blue-800"
                  placeholder="Enter type to filter"
                  placeholderTextColor="#93C5FD"
                />
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  className="px-6 py-3 rounded-lg mr-3"
                  onPress={() => setFilterModalVisible(false)}
                >
                  <Text className="text-blue-600 font-medium">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-6 py-3 rounded-lg"
                  style={{ backgroundColor: '#3b82f6' }}
                  onPress={handleApplyFilter}
                >
                  <Text className="text-white font-medium">Apply Filter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout>
  );
}