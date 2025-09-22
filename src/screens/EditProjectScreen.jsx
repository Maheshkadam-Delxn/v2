import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Platform,
  Image,
  Modal,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";

export default function EditProjectScreen() {
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState({
    name: "Downtown Tower Complex",
    code: "DTC-2024-01",
    type: "Commercial",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-12-30"),
    currency: "USD",
    budget: "2.5",
    location: "New York, NY",
    description: "A modern commercial tower complex with retail spaces on the ground floor and office spaces above.",
    projectPhoto: "https://via.placeholder.com/300x200",
  });
  
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [showTimezoneModal, setShowTimezoneModal] = useState(false);

  const projectTypes = [
    "Residential",
    "Commercial", 
    "Mixed-Use",
    "Infrastructure",
    "Governmental",
    "Industrial",
    "Recreational"
  ];

  const currencies = [
    "USD - United States",
    "EUR - Europe",
    "GBP - United Kingdom",
    "CAD - Canada",
    "AUD - Australia",
    "JPY - Japan"
  ];

  const timezones = [
    "EST (UTC-5)",
    "CST (UTC-6)", 
    "MST (UTC-7)",
    "PST (UTC-8)",
    "GMT (UTC+0)",
    "CET (UTC+1)"
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        handleInputChange("projectPhoto", result.assets[0].uri);
      }
    } catch (err) {
      console.error("Error picking image:", err);
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Project Name is required";
    if (!formData.code.trim()) newErrors.code = "Code is required";
    if (!formData.currency) newErrors.currency = "Currency is required";
    if (!formData.budget || isNaN(formData.budget) || parseFloat(formData.budget) <= 0)
      newErrors.budget = "Budget must be a positive number";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (validateForm()) {
      alert("Project updated successfully!");
      navigation.goBack();
    }
  };

  const handleDelete = () => {
    alert("Project deleted successfully!");
    navigation.navigate("Main");
  };

  const onDateChange = (type, event, selectedDate) => {
    const currentDate = selectedDate || formData[type];
    setShowDatePicker(null);
    handleInputChange(type, currentDate);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView className="flex-1 bg-gray-50 pt-6">
        <View className="px-6 py-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-800">
              Edit Project
            </Text>
            <TouchableOpacity
              className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center"
              onPress={() => navigation.goBack()}
            >
              <Feather name="x" size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Project Details
            </Text>

            {/* Project Name */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Project Name</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="Enter project name"
                value={formData.name}
                onChangeText={(text) => handleInputChange("name", text)}
              />
              {errors.name && (
                <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>
              )}
            </View>

            {/* Code */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Code</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="Enter project code"
                value={formData.code}
                onChangeText={(text) => handleInputChange("code", text)}
              />
              {errors.code && (
                <Text className="text-red-500 text-xs mt-1">{errors.code}</Text>
              )}
            </View>

            {/* Type */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Type</Text>
              <View className="bg-gray-100 rounded-2xl">
                <Picker
                  selectedValue={formData.type}
                  onValueChange={(itemValue) =>
                    handleInputChange("type", itemValue)
                  }
                >
                  {projectTypes.map((type) => (
                    <Picker.Item key={type} label={type} value={type} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Start Date */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Start Date</Text>
              <TouchableOpacity
                className="bg-gray-100 rounded-2xl py-3 px-4"
                onPress={() => setShowDatePicker("start")}
              >
                <Text>{formData.startDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showDatePicker === "start" && (
                <DateTimePicker
                  value={formData.startDate}
                  mode="date"
                  display="default"
                  onChange={(e, d) => onDateChange("startDate", e, d)}
                />
              )}
            </View>

            {/* End Date */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">End Date</Text>
              <TouchableOpacity
                className="bg-gray-100 rounded-2xl py-3 px-4"
                onPress={() => setShowDatePicker("end")}
              >
                <Text>{formData.endDate.toLocaleDateString()}</Text>
              </TouchableOpacity>
              {showDatePicker === "end" && (
                <DateTimePicker
                  value={formData.endDate}
                  mode="date"
                  display="default"
                  onChange={(e, d) => onDateChange("endDate", e, d)}
                />
              )}
            </View>

            {/* Currency */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Currency (Country)</Text>
              <View className="bg-gray-100 rounded-2xl">
                <Picker
                  selectedValue={formData.currency}
                  onValueChange={(itemValue) =>
                    handleInputChange("currency", itemValue)
                  }
                >
                  <Picker.Item label="Select a country" value="" />
                  {currencies.map((currency) => (
                    <Picker.Item
                      key={currency}
                      label={currency}
                      value={currency.split(" - ")[0]}
                    />
                  ))}
                </Picker>
              </View>
              {errors.currency && (
                <Text className="text-red-500 text-xs mt-1">{errors.currency}</Text>
              )}
            </View>

            {/* Timezone */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Timezone</Text>
              <TouchableOpacity
                className="bg-gray-100 rounded-2xl py-3 px-4 flex-row items-center justify-between"
                onPress={() => setShowTimezoneModal(true)}
              >
                <Text>EST (UTC-5)</Text>
                <Feather name="chevron-down" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Budget */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Budget (in millions)</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="e.g., 2.5"
                keyboardType="numeric"
                value={formData.budget}
                onChangeText={(text) => handleInputChange("budget", text)}
              />
              {errors.budget && (
                <Text className="text-red-500 text-xs mt-1">{errors.budget}</Text>
              )}
            </View>

            {/* Location */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Location</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="Enter location"
                value={formData.location}
                onChangeText={(text) => handleInputChange("location", text)}
              />
              {errors.location && (
                <Text className="text-red-500 text-xs mt-1">{errors.location}</Text>
              )}
            </View>

            {/* Description */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Description</Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="Enter description"
                multiline
                numberOfLines={4}
                value={formData.description}
                onChangeText={(text) => handleInputChange("description", text)}
              />
              {errors.description && (
                <Text className="text-red-500 text-xs mt-1">{errors.description}</Text>
              )}
            </View>

            {/* Project Photo */}
            <View className="mb-6">
              <Text className="text-sm text-gray-600 mb-2">Project Photo</Text>
              <TouchableOpacity
                className="bg-gray-100 rounded-2xl py-3 px-4 flex-row items-center"
                onPress={pickImage}
              >
                <Feather
                  name="upload"
                  size={20}
                  color="#6b7280"
                  style={{ marginRight: 8 }}
                />
                <Text>Change Photo</Text>
              </TouchableOpacity>
              {formData.projectPhoto && (
                <Image
                  source={{ uri: formData.projectPhoto }}
                  className="w-32 h-32 rounded-xl mt-2"
                  resizeMode="cover"
                />
              )}
            </View>

            {/* Action Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-red-600 rounded-2xl py-3 px-4 shadow-lg active:scale-95"
                onPress={handleDelete}
              >
                <Text className="text-white text-center text-base font-medium">
                  Delete Project
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                className="flex-1 bg-blue-600 rounded-2xl py-3 px-4 shadow-lg active:scale-95"
                onPress={handleUpdate}
              >
                <Text className="text-white text-center text-base font-medium">
                  Update Project
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Timezone Modal */}
        <Modal
          visible={showTimezoneModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowTimezoneModal(false)}
        >
          <View className="flex-1 justify-center bg-black/50">
            <View className="mx-5 bg-white rounded-2xl p-5">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-semibold">Select Timezone</Text>
                <TouchableOpacity onPress={() => setShowTimezoneModal(false)}>
                  <Feather name="x" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>
              <Picker
                selectedValue="EST (UTC-5)"
                onValueChange={(itemValue) => {
                  setShowTimezoneModal(false);
                }}
              >
                {timezones.map((timezone) => (
                  <Picker.Item
                    key={timezone}
                    label={timezone}
                    value={timezone}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
}