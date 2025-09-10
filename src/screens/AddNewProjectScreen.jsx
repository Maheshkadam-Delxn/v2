import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, TextInput, TouchableOpacity, Platform, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

export default function AddNewProjectScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    type: 'Residential',
    startDate: new Date(),
    currency: 'USD',
    zoneOffset: '',
    budget: '',
    location: '',
    description: '',
    projectPhoto: null,
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Request permissions for image picker
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Camera roll permissions are required to upload a project photo.');
        }
      }
    })();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: '' }); // Clear error on change
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0].uri) {
      handleInputChange('projectPhoto', result.assets[0].uri);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    // Project Name: Required, min 3 characters
    if (!formData.name.trim()) {
      newErrors.name = 'Project Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Project Name must be at least 3 characters';
    }
    // Code: Required, alphanumeric, 3-10 characters
    if (!formData.code.trim()) {
      newErrors.code = 'Code is required';
    } else if (!/^[a-zA-Z0-9]{3,10}$/.test(formData.code.trim())) {
      newErrors.code = 'Code must be 3-10 alphanumeric characters';
    }
    // Type: Required (handled by default value)
    if (!formData.type) {
      newErrors.type = 'Type is required';
    }
    // Start Date: Required (handled by default value)
    if (!formData.startDate) {
      newErrors.startDate = 'Start Date is required';
    }
    // Currency: Required (handled by default value)
    if (!formData.currency) {
      newErrors.currency = 'Currency is required';
    }
    // Zone Offset: Required, format like UTC+0 or UTC-5
    if (!formData.zoneOffset.trim()) {
      newErrors.zoneOffset = 'Zone Offset is required';
    } else if (!/^UTC[+-][0-9]{1,2}$/.test(formData.zoneOffset.trim())) {
      newErrors.zoneOffset = 'Zone Offset must be in format UTC+0 or UTC-5';
    }
    // Budget: Required, positive number
    if (!formData.budget || isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
      newErrors.budget = 'Budget must be a positive number';
    }
    // Location: Required, min 3 characters
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    } else if (formData.location.trim().length < 3) {
      newErrors.location = 'Location must be at least 3 characters';
    }
    // Description: Required, min 10 characters
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    // Project Photo: Required
    if (!formData.projectPhoto) {
      newErrors.projectPhoto = 'Project Photo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Implement API call or state update to save the new project
      console.log('New Project:', {
        ...formData,
        startDate: formData.startDate.toISOString(),
      });
      navigation.navigate('Main');
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.startDate;
    setShowDatePicker(Platform.OS === 'ios');
    handleInputChange('startDate', currentDate);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView className="flex-1 bg-gray-50 pt-6">
        <View className="px-6 py-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-800">Add New Project</Text>
            <TouchableOpacity 
              className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center"
              onPress={() => navigation.goBack()}
            >
              <Feather name="x" size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-800 mb-4">Project Details</Text>

            {/* Project Name */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Project Name</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="Enter project name"
                placeholderTextColor="#6b7280"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
              />
              {errors.name && <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>}
            </View>

            {/* Code */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Code</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="Enter project code"
                placeholderTextColor="#6b7280"
                value={formData.code}
                onChangeText={(text) => handleInputChange('code', text)}
              />
              {errors.code && <Text className="text-red-500 text-xs mt-1">{errors.code}</Text>}
            </View>

            {/* Type */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Type</Text>
              <View className="bg-gray-100 rounded-2xl">
                <Picker
                  selectedValue={formData.type}
                  onValueChange={(itemValue) => handleInputChange('type', itemValue)}
                  style={{ paddingVertical: 12, paddingHorizontal: 16 }}
                >
                  <Picker.Item label="Residential" value="Residential" />
                  <Picker.Item label="Commercial" value="Commercial" />
                  <Picker.Item label="Mixed-use" value="Mixed-use" />
                  <Picker.Item label="Infrastructure" value="Infrastructure" />
                  <Picker.Item label="Governmental" value="Governmental" />
                  <Picker.Item label="Industrial" value="Industrial" />
                  <Picker.Item label="Recreational" value="Recreational" />
                </Picker>
              </View>
              {errors.type && <Text className="text-red-500 text-xs mt-1">{errors.type}</Text>}
            </View>

            {/* Start Date */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Start Date</Text>
              <TouchableOpacity 
                className="bg-gray-100 rounded-2xl py-3 px-4"
                onPress={() => setShowDatePicker(true)}
              >
                <Text className="text-base text-gray-800">
                  {formData.startDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.startDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
              {errors.startDate && <Text className="text-red-500 text-xs mt-1">{errors.startDate}</Text>}
            </View>

            {/* Currency */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Currency</Text>
              <View className="bg-gray-100 rounded-2xl">
                <Picker
                  selectedValue={formData.currency}
                  onValueChange={(itemValue) => handleInputChange('currency', itemValue)}
                  style={{ paddingVertical: 12, paddingHorizontal: 16 }}
                >
                  <Picker.Item label="USD" value="USD" />
                  <Picker.Item label="EUR" value="EUR" />
                  <Picker.Item label="GBP" value="GBP" />
                  <Picker.Item label="JPY" value="JPY" />
                  <Picker.Item label="CAD" value="CAD" />
                </Picker>
              </View>
              {errors.currency && <Text className="text-red-500 text-xs mt-1">{errors.currency}</Text>}
            </View>

            {/* Zone Offset */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Zone Offset</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="e.g., UTC+0"
                placeholderTextColor="#6b7280"
                value={formData.zoneOffset}
                onChangeText={(text) => handleInputChange('zoneOffset', text)}
              />
              {errors.zoneOffset && <Text className="text-red-500 text-xs mt-1">{errors.zoneOffset}</Text>}
            </View>

            {/* Budget */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Budget (in millions)</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="e.g., 2.5"
                placeholderTextColor="#6b7280"
                keyboardType="numeric"
                value={formData.budget}
                onChangeText={(text) => handleInputChange('budget', text)}
              />
              {errors.budget && <Text className="text-red-500 text-xs mt-1">{errors.budget}</Text>}
            </View>

            {/* Location */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Location</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="Enter location"
                placeholderTextColor="#6b7280"
                value={formData.location}
                onChangeText={(text) => handleInputChange('location', text)}
              />
              {errors.location && <Text className="text-red-500 text-xs mt-1">{errors.location}</Text>}
            </View>

            {/* Description */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Description</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="Enter description"
                placeholderTextColor="#6b7280"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(text) => handleInputChange('description', text)}
              />
              {errors.description && <Text className="text-red-500 text-xs mt-1">{errors.description}</Text>}
            </View>

            {/* Project Photo */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Project Photo</Text>
              <TouchableOpacity 
                className="bg-gray-100 rounded-2xl py-3 px-4 flex-row items-center"
                onPress={pickImage}
              >
                <Feather name="upload" size={20} color="#6b7280" style={{ marginRight: 8 }} />
                <Text className="text-base text-gray-600">
                  {formData.projectPhoto ? 'Photo Selected' : 'Upload Photo'}
                </Text>
              </TouchableOpacity>
              {formData.projectPhoto && (
                <Image
                  source={{ uri: formData.projectPhoto }}
                  className="w-32 h-32 rounded-xl mt-2"
                  resizeMode="cover"
                />
              )}
              {errors.projectPhoto && <Text className="text-red-500 text-xs mt-1">{errors.projectPhoto}</Text>}
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              className="bg-blue-600 rounded-2xl py-3 px-4 shadow-lg active:scale-95"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center text-base font-medium">Create Project</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
}