
import React, { useState, useEffect } from "react";
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
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function EditProjectScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get project data from route params (if editing existing project)
  const {projectId}=route.params;
  const projectData = route.params?.projectData || {};
  
  const [projectTypes, setProjectTypes] = useState([]);
  const [currencydata, setCurrencyData] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(projectId);
  const [formData, setFormData] = useState({
    name: projectData.name || "Downtown Tower Complex",
    code: projectData.code || "DTC-2024-01",
    type: projectData.type || "", // Will be set from API
    startDate: projectData.startDate ? new Date(projectData.startDate) : new Date("2024-01-15"),
    endDate: projectData.endDate ? new Date(projectData.endDate) : new Date("2024-12-30"),
    currency: projectData.currency || "", // currency autoId
    currencyCode: projectData.currencyCode || "",
    countryAutoId: projectData.countryAutoId || "",
    zoneOffset: projectData.zoneOffset || "",
    budget: projectData.budget || "2.5",
    location: projectData.location || "New York, NY",
    latitude: projectData.latitude || "",
    longitude: projectData.longitude || "",
    description: projectData.description || "A modern commercial tower complex with retail spaces on the ground floor and office spaces above.",
    projectPhoto: projectData.projectPhoto || "https://via.placeholder.com/300x200",
    projectAutoId: projectData.autoId || "", // For update API
  });
  
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [showTimezoneModal, setShowTimezoneModal] = useState(false);

  // Get JWT token from storage
  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setToken(parsedData.jwtToken);
      }
    } catch (err) {
      console.error("Error checking login status:", err);
    }
  };

  // Fetch dropdown data
  const fetchDropdownData = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api-v2-skystruct.prudenttec.com/project/project-dropdown",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Menu-Id": "DRlBbUjgXSb",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data.currencyMasterBeans);
      setCurrencyData(data.currencyMasterBeans);
      
      // Set project types from API response
      if (data.dropdownMap && data.dropdownMap.PROJECT_TYPE) {
        setProjectTypes(data.dropdownMap.PROJECT_TYPE);
        
        // Set default type if not already set
        if (!formData.type && data.dropdownMap.PROJECT_TYPE.length > 0) {
          setFormData(prev => ({ ...prev, type: data.dropdownMap.PROJECT_TYPE[0].autoId }));
        }
      } else {
        setProjectTypes([]);
      }
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
      Alert.alert("Error", "Failed to load dropdown data");
    } finally {
      setIsLoading(false);
    }
  };
  // console.log("okok",currencydata[0]);

  // Fetch timezone data based on selected country
  const fetchTimezones = async (countryAutoId) => {
    if (!token || !countryAutoId) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://api-v2-skystruct.prudenttec.com/project/timezone-by-country",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Menu-Id": "DRlBbUjgXSb",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: countryAutoId }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTimezones(data.timeZoneMasterBeans || []);
    } catch (err) {
      console.error("Error fetching timezones:", err);
      Alert.alert("Error", "Failed to fetch timezones");
    } finally {
      setIsLoading(false);
    }
  };





  // Fetch project details if editing existing project
  const fetchProjectDetails = async () => {
    if (!token || !projectId) return;
    
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api-v2-skystruct.prudenttec.com/project/${projectId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Menu-Id": "DRlBbUjgXSb",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("asdf",data);
      if (data) {
        // Update formData with fetched project details
         const project = data.projectFormBean;
        setFormData({
          ...formData,
          name: project.projectName || "",
          code: project.projectCode || "",
          type: project.projectType || "",
          startDate: project.startDate ? new Date(project.startDate) : new Date(),
          endDate: project.endDate ? new Date(project.endDate) : new Date(),
          currency: project.currency || "",
          currencyCode: project.currencyCode || "",
          countryAutoId: project.countryAutoId || "",
          zoneOffset: project.zoneId || "",
          budget: project.budget ? project.budget.toString() : "",
          location: project.location || "",
          latitude: project.latitude || "",
          longitude: project.longitude || "",
          description: project.projectDescription || "",
          projectPhoto: project.profileUrl || "https://via.placeholder.com/300x200",
        });

   
        if (project.countryAutoId) {
          fetchTimezones(project.countryAutoId);
        }
      }
    } catch (err) {
      console.error("Error fetching project details:", err);
      Alert.alert("Error", "Failed to load project details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
   
  }, []);

  useEffect(() => {
    if (token) {
      fetchDropdownData();
      if (projectId) {
        fetchProjectDetails();
      }
    }
    
    // Request media library permissions
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permission Required", "Camera roll permissions are required to upload a project photo.");
        }
      }
    })();
  }, [token]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };

  // Handle currency change - also fetch timezones for the selected country
  const handleCurrencyChange = (currencyAutoId) => {
    const selectedCurrency = currencydata.find(
      (item) => item.autoId === currencyAutoId
    );
    if (selectedCurrency) {
      setFormData({
        ...formData,
        currency: selectedCurrency.autoId,
        currencyCode: selectedCurrency.currencyCode,
        latitude: selectedCurrency.latitude,
        longitude: selectedCurrency.longitude,
        countryAutoId: selectedCurrency.autoId,
        zoneOffset: "", // Reset timezone when country changes
      });
      fetchTimezones(selectedCurrency.autoId);
    }
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
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Project Name is required";
    if (!formData.code.trim()) newErrors.code = "Code is required";
    if (!formData.currency) newErrors.currency = "Currency is required";
    if (!formData.zoneOffset.trim()) newErrors.zoneOffset = "Timezone is required";
    if (!formData.budget || isNaN(formData.budget) || parseFloat(formData.budget) <= 0)
      newErrors.budget = "Budget must be a positive number";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update project handler with API integration
  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const form = new FormData();

      // Prepare payload for formData field
      const payload = {
        autoId: formData.projectAutoId, // Include autoId for update
        endDate: formData.endDate.toISOString().split("T")[0],
        latitude: formData.latitude,
        longitude: formData.longitude,
        projectName: formData.name,
        projectCode: formData.code,
        projectType: formData.type,
        startDate: formData.startDate.toISOString().split("T")[0],
        currency: formData.currency,
        zoneId: formData.zoneOffset,
        budget: formData.budget,
        location: formData.location,
        projectDescription: formData.description,
      };

      // Append formData JSON
      form.append("formData", JSON.stringify(payload));

      // Append file if projectPhoto exists and is a new image (not a URL)
      if (formData.projectPhoto && !formData.projectPhoto.startsWith('http')) {
        const uriParts = formData.projectPhoto.split(".");
        const fileType = uriParts[uriParts.length - 1].toLowerCase();
        form.append("file", {
          uri: formData.projectPhoto,
          name: `project.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await fetch(
        "https://api-v2-skystruct.prudenttec.com/project/update-project",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Menu-Id": "DRlBbUjgXSb",
          },
          body: form,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Update result:", result);
      Alert.alert("Success", "Project updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating project:", error);
      Alert.alert("Error", "Failed to update project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!formData.projectAutoId) {
      Alert.alert("Error", "Project ID not found");
      return;
    }

    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this project?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setIsLoading(true);
              const response = await fetch(
                `https://api-v2-skystruct.prudenttec.com/project/delete-project/${formData.projectAutoId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                    "X-Menu-Id": "DRlBbUjgXSb",
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const result = await response.json();
              console.log("Delete result:", result);
              Alert.alert("Success", "Project deleted successfully!");
              navigation.navigate("Main");
            } catch (error) {
              console.error("Error deleting project:", error);
              Alert.alert("Error", "Failed to delete project. Please try again.");
            } finally {
              setIsLoading(false);
            }
          },
        },
      ]
    );
  };

  const onDateChange = (type, event, selectedDate) => {
    const currentDate = selectedDate || formData[type];
    setShowDatePicker(null);
    handleInputChange(type, currentDate);
  };

  // Helper function to get display name for selected currency
  const getSelectedCurrencyLabel = () => {
    if (!formData.currency) return "Select a country";
    
    const selectedCurrency = currencydata.find(
      (item) => item.autoId === formData.currency
    );
    
    return selectedCurrency 
      ? `${selectedCurrency.currencyCode} - ${selectedCurrency.countryName}`
      : "Select a country";
  };

  // Helper function to get display name for selected timezone
  const getSelectedTimezoneLabel = () => {
    if (!formData.zoneOffset) return "Select timezone";
    
    const selectedTimezone = timezones.find(
      (item) => item.autoId === formData.zoneOffset
    );
    
    return selectedTimezone 
      ? `${selectedTimezone.territory} ${selectedTimezone.utcTimeOffset}`
      : "Select timezone";
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView className="flex-1 bg-gray-50 pt-6">
        <View className="px-6 py-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-800">
              Edit Project
              {/* {formData.projectAutoId ? "Edit Project" : "Create Project"} */}
            </Text>
            <TouchableOpacity
              className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center"
              onPress={() => navigation.goBack()}
              disabled={isLoading}
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
                editable={!isLoading}
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
                editable={!isLoading}
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
                  enabled={!isLoading && projectTypes.length > 0}
                >
                  {projectTypes.length === 0 ? (
                    <Picker.Item label="Loading types..." value="" />
                  ) : (
                    projectTypes.map((type) => (
                      <Picker.Item 
                        key={type.autoId} 
                        label={type.dropdownValue} 
                        value={type.autoId} 
                      />
                    ))
                  )}
                </Picker>
              </View>
            </View>

            {/* Start Date */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Start Date</Text>
              <TouchableOpacity
                className="bg-gray-100 rounded-2xl py-3 px-4"
                onPress={() => setShowDatePicker("start")}
                disabled={isLoading}
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
                disabled={isLoading}
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
                                 onValueChange={handleCurrencyChange}
                               >
                                 <Picker.Item label="Select a country" value="" />
                                 {currencydata.map((item) => (
                                   <Picker.Item
                                     key={item.autoId}
                                     label={`${item.currencyCode} - ${item.countryName}`}
                                     value={item.autoId}
                                   />
                                 ))}
                               </Picker>
              </View>
        <Text>{currencydata.length > 0 && currencydata[0].currencyCode}{currencydata.length}</Text>

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
                disabled={!formData.countryAutoId || isLoading}
              >
                <Text className={!formData.countryAutoId ? "text-gray-400" : ""}>
                  {getSelectedTimezoneLabel()}
                </Text>
                <Feather
                  name="chevron-down"
                  size={20}
                  color={!formData.countryAutoId || isLoading ? "#9ca3af" : "#6b7280"}
                />
              </TouchableOpacity>
              {errors.zoneOffset && (
                <Text className="text-red-500 text-xs mt-1">{errors.zoneOffset}</Text>
              )}
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
                editable={!isLoading}
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
                editable={!isLoading}
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
                editable={!isLoading}
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
                disabled={isLoading}
              >
                <Feather
                  name="upload"
                  size={20}
                  color="#6b7280"
                  style={{ marginRight: 8 }}
                />
                <Text>{formData.projectPhoto ? "Photo Selected" : "Change Photo"}</Text>
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
              {formData.projectAutoId && (
                <TouchableOpacity
                  className="flex-1 bg-red-600 rounded-2xl py-3 px-4 shadow-lg active:scale-95 disabled:bg-red-300"
                  onPress={handleDelete}
                  disabled={isLoading}
                >
                  <Text className="text-white text-center text-base font-medium">
                    {isLoading ? "Deleting..." : "Delete Project"}
                  </Text>
                </TouchableOpacity>
              )}
              
              <TouchableOpacity
                className={`${formData.projectAutoId ? "flex-1" : "w-full"} bg-blue-600 rounded-2xl py-3 px-4 shadow-lg active:scale-95 disabled:bg-blue-300`}
                onPress={handleUpdate}
                disabled={isLoading}
              >
                <Text className="text-white text-center text-base font-medium">
                  {isLoading ? "Updating..." : formData.projectAutoId ? "Update Project" : "Create Project"}
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
              {isLoading ? (
                <Text className="text-center py-4">Loading timezones...</Text>
              ) : timezones.length === 0 ? (
                <Text className="text-center py-4">No timezones available. Please select a country first.</Text>
              ) : (
                <Picker
                  selectedValue={formData.zoneOffset}
                  onValueChange={(itemValue) => {
                    handleInputChange("zoneOffset", itemValue);
                    setShowTimezoneModal(false);
                  }}
                >
                  <Picker.Item label="Select timezone" value="" />
                  {timezones.map((timezone) => (
                    <Picker.Item
                      key={timezone.autoId}
                      label={`${timezone.territory} ${timezone.utcTimeOffset}`}
                      value={timezone.autoId}
                    />
                  ))}
                </Picker>
              )}
            </View>
          </View>
        </Modal>
      </ScrollView>
    </>
  );
}