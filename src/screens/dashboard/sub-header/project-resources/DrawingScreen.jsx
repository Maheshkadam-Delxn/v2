import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Modal } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from 'react-native-vector-icons';
import MainLayout from '../../../components/MainLayout';

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
  <TouchableOpacity className="w-10 h-10 bg-gray-200 rounded-full justify-center items-center mx-1" onPress={onPress}>
    <MaterialIcons name={iconName} size={24} color="#1E3A8A" />
  </TouchableOpacity>
);

export default function DrawingScreen() {
  const route = useRoute();
  const { projectId } = route.params || { projectId: 1 };
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [selectedDrawing, setSelectedDrawing] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [editForm, setEditForm] = useState({ title: '', description: '', category: '' });
  const [addForm, setAddForm] = useState({ title: '', description: '', category: '' });
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

  const handleAddSave = () => {
    // Logic to add new drawing
    setAddModalVisible(false);
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
      <View className="flex-1 bg-gray-100">
        {/* Filter Tabs with Filter and Download Buttons */}
        <View className="bg-white py-4 border-b border-gray-200 shadow-sm">
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
                className={`px-5 py-2 rounded-full ${activeTab === tab ? 'bg-blue-600' : 'bg-gray-100'} shadow-sm`}
              >
                <Text className={`font-semibold text-base ${activeTab === tab ? 'text-white' : 'text-gray-600'}`}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              className="px-5 py-2 bg-gray-100 rounded-full shadow-sm"
              onPress={() => setFilterModalVisible(true)}
            >
              <MaterialIcons name="filter-list" size={24} color="#374151" />
            </TouchableOpacity>
            <TouchableOpacity
              className="px-5 py-2 bg-gray-100 rounded-full shadow-sm"
              onPress={handleDownload}
            >
              <MaterialIcons name="file-download" size={24} color="#374151" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Search and Select Bar */}
        <View className="px-6 py-3 bg-white flex-row items-center">
          <View className="flex-1 bg-gray-100 rounded-lg px-4 py-2 flex-row items-center mr-2">
            <MaterialIcons name="search" size={20} color="#9CA3AF" className="mr-2" />
            <TextInput
              placeholder="Search..."
              value={searchText}
              onChangeText={setSearchText}
              className="flex-1 text-gray-800"
            />
          </View>
          <TouchableOpacity className="bg-blue-600 px-4 py-2 rounded-lg mr-2" onPress={() => setAddModalVisible(true)}>
            <Text className="text-white font-semibold">+ Add Drawing</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-100 px-4 py-2 rounded-lg" onPress={() => setDropdownVisible(true)}>
            <Text className="text-gray-600 font-semibold">
              {selectedDrawing ? selectedDrawing.title : 'Select a Drawing'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Drawing Content */}
        <ScrollView className="flex-1 px-6 pt-4">
          <View className="flex-row justify-between mb-6">
            {showImage1 && <ImagePlaceholder1 />}
            {showImage2 && <ImagePlaceholder2 />}
            {!showImage1 && !showImage2 && (
              <Text className="text-gray-600 text-center w-full">No drawings available for this filter.</Text>
            )}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View className="flex-row justify-center px-6 py-4 bg-white border-t border-gray-200">
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
          <View className="flex-1 bg-gray-800 bg-opacity-50 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-6">
              <Text className="text-xl font-bold text-gray-800 mb-6">Edit Drawing</Text>
              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Title</Text>
                <TextInput
                  value={editForm.title}
                  onChangeText={text => setEditForm({ ...editForm, title: text })}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
                />
              </View>
              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Description</Text>
                <TextInput
                  value={editForm.description}
                  onChangeText={text => setEditForm({ ...editForm, description: text })}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
                />
              </View>
              <View className="mb-6">
                <Text className="text-gray-700 mb-2">Category</Text>
                <TextInput
                  value={editForm.category}
                  onChangeText={text => setEditForm({ ...editForm, category: text })}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
                />
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  className="px-5 py-2 rounded-lg mr-3"
                  onPress={() => setEditModalVisible(false)}
                >
                  <Text className="text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-blue-600 px-5 py-2 rounded-lg"
                  onPress={handleSaveEdit}
                >
                  <Text className="text-white">Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Add Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={addModalVisible}
          onRequestClose={() => setAddModalVisible(false)}
        >
          <View className="flex-1 bg-gray-800 bg-opacity-50 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-6">
              <Text className="text-xl font-bold text-gray-800 mb-6">Add Drawing</Text>
              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Title</Text>
                <TextInput
                  value={addForm.title}
                  onChangeText={text => setAddForm({ ...addForm, title: text })}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
                />
              </View>
              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Description</Text>
                <TextInput
                  value={addForm.description}
                  onChangeText={text => setAddForm({ ...addForm, description: text })}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
                />
              </View>
              <View className="mb-6">
                <Text className="text-gray-700 mb-2">Category</Text>
                <TextInput
                  value={addForm.category}
                  onChangeText={text => setAddForm({ ...addForm, category: text })}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
                />
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  className="px-5 py-2 rounded-lg mr-3"
                  onPress={() => setAddModalVisible(false)}
                >
                  <Text className="text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-blue-600 px-5 py-2 rounded-lg"
                  onPress={handleAddSave}
                >
                  <Text className="text-white">Save</Text>
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
          <View className="flex-1 bg-gray-800 bg-opacity-50 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-4">
              <ScrollView>
                {drawings.map(drawing => (
                  <TouchableOpacity
                    key={drawing.id}
                    className="py-2 border-b border-gray-200"
                    onPress={() => {
                      setSelectedDrawing(drawing);
                      setDropdownVisible(false);
                    }}
                  >
                    <Text className="text-gray-800 font-medium">{drawing.title}</Text>
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
          <View className="flex-1 bg-gray-800 bg-opacity-50 justify-center items-center p-6">
            <View className="bg-white rounded-lg w-full max-w-md p-6">
              <Text className="text-xl font-bold text-gray-800 mb-6">Filter Drawings</Text>
              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Category</Text>
                <TextInput
                  value={filterForm.category}
                  onChangeText={text => setFilterForm({ ...filterForm, category: text })}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
                />
              </View>
              <View className="mb-4">
                <Text className="text-gray-700 mb-2">Type</Text>
                <TextInput
                  value={filterForm.type}
                  onChangeText={text => setFilterForm({ ...filterForm, type: text })}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-gray-800"
                />
              </View>
              <View className="flex-row justify-end">
                <TouchableOpacity
                  className="px-5 py-2 rounded-lg mr-3"
                  onPress={() => setFilterModalVisible(false)}
                >
                  <Text className="text-gray-600">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-blue-600 px-5 py-2 rounded-lg"
                  onPress={handleApplyFilter}
                >
                  <Text className="text-white">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout>
  );
}