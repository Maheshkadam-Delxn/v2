// // import React, { useState, useEffect } from "react";
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   StatusBar,
// //   TextInput,
// //   TouchableOpacity,
// //   Platform,
// //   Image,
// //   Modal,
// // } from "react-native";
// // import { Feather } from "@expo/vector-icons";
// // import { useNavigation } from "@react-navigation/native";
// // import { Picker } from "@react-native-picker/picker";
// // import DateTimePicker from "@react-native-community/datetimepicker";
// // import * as ImagePicker from "expo-image-picker";
// // import AsyncStorage from "@react-native-async-storage/async-storage";

// // export default function AddNewProjectScreen() {
// //   const navigation = useNavigation();
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     code: "",
// //     type: "Residential",
// //     startDate: new Date(),
// //     endDate: new Date(),
// //     currency: "",
// //     countryAutoId: "",
// //     zoneOffset: "",
// //     budget: "",
// //     location: "",
// //     latitude:"",
// //     longitude:"",
// //     description: "",
// //     projectPhoto: null,
// //   });
// //   const [errors, setErrors] = useState({});
// //   const [showDatePicker, setShowDatePicker] = useState(null);
// //   const [token, setToken] = useState();
// //   const [currencydata, setCurrencyData] = useState([]);
// //   const [timezones, setTimezones] = useState([]);
// //   const [showTimezoneModal, setShowTimezoneModal] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);

// //   // 🔑 Get JWT token from storage
// //   const checkLoginStatus = async () => {
// //     try {
// //       const userData = await AsyncStorage.getItem("userData");
// //       if (userData) {
// //         const parsedData = JSON.parse(userData);
// //         console.log("🔑 Stored JWT:", parsedData.jwtToken);
// //         setToken(parsedData.jwtToken);
// //       }
// //     } catch (err) {
// //       console.error("Error checking login status:", err);
// //     }
// //   };

// //   // 🔑 Fetch dropdown data
// //   const fetchCurrency = async () => {
// //     try {
// //       if (!token) return;
// //       setIsLoading(true);
// //       const response = await fetch(
// //         "https://api-v2-skystruct.prudenttec.com/project/project-dropdown",
// //         {
// //           method: "GET",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "X-Menu-Id": "DRlBbUjgXSb",
// //             "Content-Type": "application/json",
// //           },
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       // console.log("Project dropdown response:", data);
// //       setCurrencyData(data.currencyMasterBeans);
// //     } catch (err) {
// //       console.log("Internal Server Error", err);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   // 🔑 Fetch timezone data based on selected country
// //   const fetchTimezones = async (countryAutoId) => {
// //     try {
// //       if (!token || !countryAutoId) return;
// //       setIsLoading(true);
      
// //       const response = await fetch(
// //         "https://api-v2-skystruct.prudenttec.com/project/timezone-by-country",
// //         {
// //           method: "POST",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "X-Menu-Id": "DRlBbUjgXSb",
// //             "Content-Type": "application/json",
// //           },
// //           body: JSON.stringify({
// //             id: countryAutoId
// //           }),
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const data = await response.json();
// //       // console.log("Timezone response:", data);
// //       setTimezones(data.timeZoneMasterBeans);
// //     } catch (err) {
// //       console.log("Error fetching timezones:", err);
// //       alert("Failed to fetch timezones. Please try again.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     checkLoginStatus();
// //   }, []);

// //   useEffect(() => {
// //     if (token) {
// //       fetchCurrency();
// //     }
// //     (async () => {
// //       if (Platform.OS !== "web") {
// //         const { status } =
// //           await ImagePicker.requestMediaLibraryPermissionsAsync();
// //         if (status !== "granted") {
// //           alert(
// //             "Camera roll permissions are required to upload a project photo."
// //           );
// //         }
// //       }
// //     })();
// //   }, [token]);

// //   const handleInputChange = (field, value) => {
// //     setFormData({ ...formData, [field]: value });
// //     setErrors({ ...errors, [field]: "" });
// //   };

// //   // Handle currency change - also fetch timezones for the selected country
// //   const handleCurrencyChange = (currencyAutoId) => {
// //     // Find the selected currency object
// //     const selectedCurrency = currencydata.find(item => item.autoId === currencyAutoId);
    
// //     if (selectedCurrency) {
// //       // Update form data with currency and country autoId
// //       setFormData({
// //         ...formData,
// //         currency: selectedCurrency.currencyCode,
// //         latitude:selectedCurrency.latitude,
// //         longitude:selectedCurrency.longitude,
// //         countryAutoId: selectedCurrency.autoId,
// //         zoneOffset: "" // Reset timezone when country changes
// //       });
      
// //       // Fetch timezones for the selected country
// //       fetchTimezones(selectedCurrency.autoId);
// //     }
// //   };

// //   const pickImage = async () => {
// //     let result = await ImagePicker.launchImageLibraryAsync({
// //       mediaTypes: ImagePicker.MediaTypeOptions.Images,
// //       allowsEditing: true,
// //       aspect: [4, 3],
// //       quality: 1,
// //     });

// //     if (!result.canceled && result.assets && result.assets[0].uri) {
// //       handleInputChange("projectPhoto", result.assets[0].uri);
// //     }
// //   };

// //   const validateForm = () => {
// //     let newErrors = {};
// //     if (!formData.name.trim()) {
// //       newErrors.name = "Project Name is required";
// //     }
// //     if (!formData.code.trim()) {
// //       newErrors.code = "Code is required";
// //     }
// //     if (!formData.zoneOffset.trim()) {
// //       newErrors.zoneOffset = "Timezone is required";
// //     }
// //     if (!formData.budget || isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
// //       newErrors.budget = "Budget must be a positive number";
// //     }
// //     if (!formData.location.trim()) {
// //       newErrors.location = "Location is required";
// //     }
// //     if (!formData.description.trim()) {
// //       newErrors.description = "Description is required";
// //     }
// //     if (!formData.projectPhoto) {
// //       newErrors.projectPhoto = "Project Photo is required";
// //     }
// //     setErrors(newErrors);
// //     return Object.keys(newErrors).length === 0;
// //   };

// //   // 🔑 Submit handler with API integration
// //   const handleSubmit = async () => {
// //     if (!validateForm()) return;

// //     try {
// //       setIsLoading(true);
// //       const form = new FormData();

// //       const payload = {
// //         endDate: formData.endDate.toISOString().split("T")[0],
// //         latitude: formData.latitude,
// //         longitude: formData.longitude,
// //         projectName: formData.name,
// //         projectCode: formData.code,
// //         projectType: formData.type,
// //         startDate: formData.startDate.toISOString().split("T")[0],
// //         currency: formData.currency,
// //         zoneId: formData.zoneOffset,
// //         budget: formData.budget,
// //         location: formData.location,
// //         projectDescription: formData.description,
// //       };

// //       // append formData JSON
// //       form.append("formData", JSON.stringify(payload));

// //       // append file
// //       if (formData.projectPhoto) {
// //         const uriParts = formData.projectPhoto.split(".");
// //         const fileType = uriParts[uriParts.length - 1];

// //         form.append("file", {
// //           uri: formData.projectPhoto,
// //           name: `project.${fileType}`,
// //           type: `image/${fileType}`,
// //         });
// //       }
// //       console.log(form);

// //       const response = await fetch(
// //         "https://api-v2-skystruct.prudenttec.com/project/save-project",
// //         {
// //           method: "POST",
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //             "X-Menu-Id": "DRlBbUjgXSb",
// //           },
// //           body: form,
// //         }
// //       );

// //       if (!response.ok) {
// //         throw new Error(`HTTP error! status: ${response.status}`);
// //       }

// //       const result = await response.json();
// //       console.log("✅ Project saved successfully:", result);
// //       alert("Project created successfully!");

// //       navigation.navigate("Main");
// //     } catch (error) {
// //       console.error("❌ Error saving project:", error);
// //       alert("Failed to create project. Please try again.");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const onDateChange = (type, event, selectedDate) => {
// //     const currentDate = selectedDate || formData[type];
// //     setShowDatePicker(null);
// //     handleInputChange(type, currentDate);
// //   };

// //   return (
// //     <>
// //       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
// //       <ScrollView className="flex-1 bg-gray-50 pt-6">
// //         <View className="px-6 py-8">
// //           <View className="flex-row justify-between items-center mb-6">
// //             <Text className="text-2xl font-bold text-gray-800">
// //               Add New Project
// //             </Text>
// //             <TouchableOpacity
// //               className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center"
// //               onPress={() => navigation.goBack()}
// //             >
// //               <Feather name="x" size={20} color="#2563eb" />
// //             </TouchableOpacity>
// //           </View>

// //           <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
// //             <Text className="text-lg font-semibold text-gray-800 mb-4">
// //               Project Details
// //             </Text>

// //             {/* Project Name */}
// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 mb-2">Project Name</Text>
// //               <TextInput
// //                 className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
// //                 placeholder="Enter project name"
// //                 value={formData.name}
// //                 onChangeText={(text) => handleInputChange("name", text)}
// //               />
// //               {errors.name && (
// //                 <Text className="text-red-500 text-xs mt-1">
// //                   {errors.name}
// //                 </Text>
// //               )}
// //             </View>

// //             {/* Code */}
// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 mb-2">Code</Text>
// //               <TextInput
// //                 className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
// //                 placeholder="Enter project code"
// //                 value={formData.code}
// //                 onChangeText={(text) => handleInputChange("code", text)}
// //               />
// //               {errors.code && (
// //                 <Text className="text-red-500 text-xs mt-1">
// //                   {errors.code}
// //                 </Text>
// //               )}
// //             </View>

// //             {/* Type */}
// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 mb-2">Type</Text>
// //               <View className="bg-gray-100 rounded-2xl">
// //                 <Picker
// //                   selectedValue={formData.type}
// //                   onValueChange={(itemValue) =>
// //                     handleInputChange("type", itemValue)
// //                   }
// //                 >
// //                   <Picker.Item label="Residential" value="Residential" />
// //                   <Picker.Item label="Commercial" value="Commercial" />
// //                   <Picker.Item label="Mixed-use" value="Mixed-use" />
// //                 </Picker>
// //               </View>
// //             </View>

// //             {/* Start Date */}
// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 mb-2">Start Date</Text>
// //               <TouchableOpacity
// //                 className="bg-gray-100 rounded-2xl py-3 px-4"
// //                 onPress={() => setShowDatePicker("start")}
// //               >
// //                 <Text>{formData.startDate.toLocaleDateString()}</Text>
// //               </TouchableOpacity>
// //               {showDatePicker === "start" && (
// //                 <DateTimePicker
// //                   value={formData.startDate}
// //                   mode="date"
// //                   display="default"
// //                   onChange={(e, d) => onDateChange("startDate", e, d)}
// //                 />
// //               )}
// //             </View>

// //             {/* End Date */}
// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 mb-2">End Date</Text>
// //               <TouchableOpacity
// //                 className="bg-gray-100 rounded-2xl py-3 px-4"
// //                 onPress={() => setShowDatePicker("end")}
// //               >
// //                 <Text>{formData.endDate.toLocaleDateString()}</Text>
// //               </TouchableOpacity>
// //               {showDatePicker === "end" && (
// //                 <DateTimePicker
// //                   value={formData.endDate}
// //                   mode="date"
// //                   display="default"
// //                   onChange={(e, d) => onDateChange("endDate", e, d)}
// //                 />
// //               )}
// //             </View>

// //             {/* Currency */}
// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 mb-2">Currency (Country)</Text>
// //               <View className="bg-gray-100 rounded-2xl">
// //                 <Picker
// //                   selectedValue={formData.countryAutoId}
// //                   onValueChange={handleCurrencyChange}
// //                 >
// //                   <Picker.Item label="Select a country" value="" />
// //                   {currencydata.map((item) => (
// //                     <Picker.Item
// //                       key={item.autoId}
// //                       label={`${item.currencyCode} - ${item.countryName}`}
// //                       value={item.autoId}
// //                     />
// //                   ))}
// //                 </Picker>
// //               </View>
// //             </View>

// //             {/* Zone Offset (Timezone) */}
// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 mb-2">Timezone</Text>
// //               <TouchableOpacity
// //                 className="bg-gray-100 rounded-2xl py-3 px-4 flex-row items-center justify-between"
// //                 onPress={() => setShowTimezoneModal(true)}
// //                 disabled={!formData.countryAutoId}
// //               >
// //                 <Text className={!formData.countryAutoId ? "text-gray-400" : ""}>
// //                   {formData.zoneOffset || (formData.countryAutoId ? "Select timezone" : "Select a country first")}
// //                 </Text>
// //                 <Feather name="chevron-down" size={20} color={!formData.countryAutoId ? "#9ca3af" : "#6b7280"} />
// //               </TouchableOpacity>
// //               {errors.zoneOffset && (
// //                 <Text className="text-red-500 text-xs mt-1">
// //                   {errors.zoneOffset}
// //                 </Text>
// //               )}
// //             </View>

// //             {/* Budget */}
// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 mb-2">
// //                 Budget (in millions)
// //               </Text>
// //               <TextInput
// //                 className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
// //                 placeholder="e.g., 2.5"
// //                 keyboardType="numeric"
// //                 value={formData.budget}
// //                 onChangeText={(text) => handleInputChange("budget", text)}
// //               />
// //               {errors.budget && (
// //                 <Text className="text-red-500 text-xs mt-1">
// //                   {errors.budget}
// //                 </Text>
// //               )}
// //             </View>

// //             {/* Location */}
// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 mb-2">Location</Text>
// //               <TextInput
// //                 className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
// //                 placeholder="Enter location"
// //                 value={formData.location}
// //                 onChangeText={(text) => handleInputChange("location", text)}
// //               />
// //               {errors.location && (
// //                 <Text className="text-red-500 text-xs mt-1">
// //                   {errors.location}
// //                 </Text>
// //               )}
// //             </View>

// //             {/* Description */}
// //             <View className="mb-4">
// //               <Text className="text-sm text-gray-600 mb-2">Description</Text>
// //               <TextInput
// //                 className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
// //                 placeholder="Enter description"
// //                 multiline
// //                 numberOfLines={4}
// //                 value={formData.description}
// //                 onChangeText={(text) => handleInputChange("description", text)}
// //               />
// //               {errors.description && (
// //                 <Text className="text-red-500 text-xs mt-1">
// //                   {errors.description}
// //                 </Text>
// //               )}
// //             </View>

// //             {/* Project Photo */}
// //             <View className="mb-6">
// //               <Text className="text-sm text-gray-600 mb-2">Project Photo</Text>
// //               <TouchableOpacity
// //                 className="bg-gray-100 rounded-2xl py-3 px-4 flex-row items-center"
// //                 onPress={pickImage}
// //               >
// //                 <Feather
// //                   name="upload"
// //                   size={20}
// //                   color="#6b7280"
// //                   style={{ marginRight: 8 }}
// //                 />
// //                 <Text>
// //                   {formData.projectPhoto ? "Photo Selected" : "Upload Photo"}
// //                 </Text>
// //               </TouchableOpacity>
// //               {formData.projectPhoto && (
// //                 <Image
// //                   source={{ uri: formData.projectPhoto }}
// //                   className="w-32 h-32 rounded-xl mt-2"
// //                   resizeMode="cover"
// //                 />
// //               )}
// //               {errors.projectPhoto && (
// //                 <Text className="text-red-500 text-xs mt-1">
// //                   {errors.projectPhoto}
// //                 </Text>
// //               )}
// //             </View>

// //             {/* Submit Button */}
// //             <TouchableOpacity
// //               className="bg-blue-600 rounded-2xl py-3 px-4 shadow-lg active:scale-95 disabled:bg-blue-300"
// //               onPress={handleSubmit}
// //               disabled={isLoading}
// //             >
// //               <Text className="text-white text-center text-base font-medium">
// //                 {isLoading ? "Creating..." : "Create Project"}
// //               </Text>
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         {/* Timezone Modal */}
// //         <Modal
// //           visible={showTimezoneModal}
// //           transparent={true}
// //           animationType="slide"
// //           onRequestClose={() => setShowTimezoneModal(false)}
// //         >
// //           <View className="flex-1 justify-center bg-black/50">
// //             <View className="mx-5 bg-white rounded-2xl p-5">
// //               <View className="flex-row justify-between items-center mb-4">
// //                 <Text className="text-lg font-semibold">Select Timezone</Text>
// //                 <TouchableOpacity onPress={() => setShowTimezoneModal(false)}>
// //                   <Feather name="x" size={24} color="#6b7280" />
// //                 </TouchableOpacity>
// //               </View>
              
// //               {isLoading ? (
// //                 <Text className="text-center py-4">Loading timezones...</Text>
// //               ) : timezones?.length === 0 ? (
// //                 <Text className="text-center py-4">No timezones available</Text>
// //               ) : (
// //                 <Picker
// //                   selectedValue={formData.zoneOffset}
// //                   onValueChange={(itemValue) => {
// //                     handleInputChange("zoneOffset", itemValue);
// //                     setShowTimezoneModal(false);
// //                   }}
// //                 >
// //                   <Picker.Item label="Select timezone" value="" />
// //                   {timezones?.map((timezone) => (
// //                     <Picker.Item
// //                       key={timezone.autoId || timezone.name}
// //                       label={`${timezone.territory } ${timezone.utcTimeOffset } `}
// //                       value={`${timezone.autoId } `}
// //                     />
// //                   ))}
// //                 </Picker>
// //               )}
// //             </View>
// //           </View>
// //         </Modal>
// //       </ScrollView>
// //     </>
// //   );
// // }


// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   ScrollView,
//   StatusBar,
//   TextInput,
//   TouchableOpacity,
//   Platform,
//   Image,
//   Modal,
// } from "react-native";
// import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { Picker } from "@react-native-picker/picker";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// export default function AddNewProjectScreen() {
//   const navigation = useNavigation();
//   const[projectTy,setProjectType]=useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     code: "",
//     type: "Residential",
//     startDate: new Date(),
//     endDate: new Date(),
//     currency: "",
//     countryAutoId: "",
//     zoneOffset: "",
//     budget: "",
//     location: "",
//     latitude: "",
//     longitude: "",
//     description: "",
//     projectPhoto: null,
//   });
//   const [errors, setErrors] = useState({});
//   const [showDatePicker, setShowDatePicker] = useState(null);
//   const [token, setToken] = useState(null);
//   const [currencydata, setCurrencyData] = useState([]);
//   const [timezones, setTimezones] = useState([]);
//   const [showTimezoneModal, setShowTimezoneModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Get JWT token from storage
//   const checkLoginStatus = async () => {
//     try {
//       const userData = await AsyncStorage.getItem("userData");
//       if (userData) {
//         const parsedData = JSON.parse(userData);
//         setToken(parsedData.jwtToken);
//       }
//     } catch (err) {
//       console.error("Error checking login status:", err);
//     }
//   };

//   // Fetch dropdown data
//   const fetchCurrency = async () => {
//     if (!token) return;
//     try {
//       setIsLoading(true);
//       const response = await fetch(
//         "https://api-v2-skystruct.prudenttec.com/project/project-dropdown",
//         {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "X-Menu-Id": "DRlBbUjgXSb",
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setCurrencyData(data.currencyMasterBeans);
//       setProjectType(data.dropdownMap.PROJECT_TYPE)
//     } catch (err) {
//       console.error("Error fetching currency:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
// console.log("asdfasdfasdfasefd",projectTy);
//   // Fetch timezone data based on selected country
//   const fetchTimezones = async (countryAutoId) => {
//     if (!token || !countryAutoId) return;
//     try {
//       setIsLoading(true);
//       const response = await fetch(
//         "https://api-v2-skystruct.prudenttec.com/project/timezone-by-country",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "X-Menu-Id": "DRlBbUjgXSb",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ id: countryAutoId }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       setTimezones(data.timeZoneMasterBeans);
//     } catch (err) {
//       console.error("Error fetching timezones:", err);
//       alert("Failed to fetch timezones. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     checkLoginStatus();
//   }, []);

//   useEffect(() => {
//     if (token) {
//       fetchCurrency();
//     }
//     (async () => {
//       if (Platform.OS !== "web") {
//         const { status } =
//           await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           alert(
//             "Camera roll permissions are required to upload a project photo."
//           );
//         }
//       }
//     })();
//   }, [token]);

//   const handleInputChange = (field, value) => {
//     setFormData({ ...formData, [field]: value });
//     setErrors({ ...errors, [field]: "" });
//   };

//   // Handle currency change - also fetch timezones for the selected country
//   const handleCurrencyChange = (currencyAutoId) => {
//     const selectedCurrency = currencydata.find(
//       (item) => item.autoId === currencyAutoId
//     );
//     if (selectedCurrency) {
//       setFormData({
//         ...formData,
//         currency: selectedCurrency.currencyCode,
//         latitude: selectedCurrency.latitude,
//         longitude: selectedCurrency.longitude,
//         countryAutoId: selectedCurrency.autoId,
//         zoneOffset: "",
//       });
//       fetchTimezones(selectedCurrency.autoId);
//     }
//   };

//   const pickImage = async () => {
//     try {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled && result.assets && result.assets[0].uri) {
//         handleInputChange("projectPhoto", result.assets[0].uri);
//       }
//     } catch (err) {
//       console.error("Error picking image:", err);
//       alert("Failed to pick image. Please try again.");
//     }
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     if (!formData.name.trim()) newErrors.name = "Project Name is required";
//     if (!formData.code.trim()) newErrors.code = "Code is required";
//     if (!formData.zoneOffset.trim()) newErrors.zoneOffset = "Timezone is required";
//     if (!formData.budget || isNaN(formData.budget) || parseFloat(formData.budget) <= 0)
//       newErrors.budget = "Budget must be a positive number";
//     if (!formData.location.trim()) newErrors.location = "Location is required";
//     if (!formData.description.trim())
//       newErrors.description = "Description is required";
//     if (!formData.projectPhoto) newErrors.projectPhoto = "Project Photo is required";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Submit handler with API integration
//   const handleSubmit = async () => {
//     if (!validateForm()) return;

//     try {
//       setIsLoading(true);
//       const form = new FormData();

//       // Prepare payload for formData field
//       const payload = {
//         endDate: formData.endDate.toISOString().split("T")[0],
//         latitude: formData.latitude,
//         longitude: formData.longitude,
//         projectName: formData.name,
//         projectCode: formData.code,
//         projectType: formData.type,
//         startDate: formData.startDate.toISOString().split("T")[0],
//         currency: formData.currency,
//         zoneId: formData.zoneOffset,
//         budget: formData.budget,
//         location: formData.location,
//         projectDescription: formData.description,
//       };

//       // Append formData JSON
//       form.append("formData", JSON.stringify(payload));

//       // Append file if projectPhoto exists
//       if (formData.projectPhoto) {
//         const uriParts = formData.projectPhoto.split(".");
//         const fileType = uriParts[uriParts.length - 1].toLowerCase();
//         form.append("file", {
//           uri: formData.projectPhoto,
//           name: `project.${fileType}`,
//           type: `image/${fileType}`,
//         });
//       }

//       const response = await fetch(
//         "https://api-v2-skystruct.prudenttec.com/project/save-project",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "X-Menu-Id": "DRlBbUjgXSb",
//           },
//           body: form,
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       alert("Project created successfully!");
//       navigation.navigate("Main");
//     } catch (error) {
//       console.error("Error saving project:", error);
//       alert("Failed to create project. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onDateChange = (type, event, selectedDate) => {
//     const currentDate = selectedDate || formData[type];
//     setShowDatePicker(null);
//     handleInputChange(type, currentDate);
//   };

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
//       <ScrollView className="flex-1 bg-gray-50 pt-6">
//         <View className="px-6 py-8">
//           <View className="flex-row justify-between items-center mb-6">
//             <Text className="text-2xl font-bold text-gray-800">
//               Add New Project
//             </Text>
//             <TouchableOpacity
//               className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center"
//               onPress={() => navigation.goBack()}
//             >
//               <Feather name="x" size={20} color="#2563eb" />
//             </TouchableOpacity>
//           </View>

//           <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//             <Text className="text-lg font-semibold text-gray-800 mb-4">
//               Project Details
//             </Text>

//             {/* Project Name */}
//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 mb-2">Project Name</Text>
//               <TextInput
//                 className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
//                 placeholder="Enter project name"
//                 value={formData.name}
//                 onChangeText={(text) => handleInputChange("name", text)}
//               />
//               {errors.name && (
//                 <Text className="text-red-500 text-xs mt-1">{errors.name}</Text>
//               )}
//             </View>

//             {/* Code */}
//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 mb-2">Code</Text>
//               <TextInput
//                 className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
//                 placeholder="Enter project code"
//                 value={formData.code}
//                 onChangeText={(text) => handleInputChange("code", text)}
//               />
//               {errors.code && (
//                 <Text className="text-red-500 text-xs mt-1">{errors.code}</Text>
//               )}
//             </View>

//             {/* Type */}
//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 mb-2">Type</Text>
//               <View className="bg-gray-100 rounded-2xl">
//                 <Picker
//                   selectedValue={formData.type}
//                   onValueChange={(itemValue) =>
//                     handleInputChange("type", itemValue)
//                   }
//                 >
//                   <Picker.Item label="Residential" value="Residential" />
//                   <Picker.Item label="Commercial" value="Commercial" />
//                   <Picker.Item label="Mixed-use" value="Mixed-use" />
//                 </Picker>
//               </View>
//             </View>

//             {/* Start Date */}
//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 mb-2">Start Date</Text>
//               <TouchableOpacity
//                 className="bg-gray-100 rounded-2xl py-3 px-4"
//                 onPress={() => setShowDatePicker("start")}
//               >
//                 <Text>{formData.startDate.toLocaleDateString()}</Text>
//               </TouchableOpacity>
//               {showDatePicker === "start" && (
//                 <DateTimePicker
//                   value={formData.startDate}
//                   mode="date"
//                   display="default"
//                   onChange={(e, d) => onDateChange("startDate", e, d)}
//                 />
//               )}
//             </View>

//             {/* End Date */}
//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 mb-2">End Date</Text>
//               <TouchableOpacity
//                 className="bg-gray-100 rounded-2xl py-3 px-4"
//                 onPress={() => setShowDatePicker("end")}
//               >
//                 <Text>{formData.endDate.toLocaleDateString()}</Text>
//               </TouchableOpacity>
//               {showDatePicker === "end" && (
//                 <DateTimePicker
//                   value={formData.endDate}
//                   mode="date"
//                   display="default"
//                   onChange={(e, d) => onDateChange("endDate", e, d)}
//                 />
//               )}
//             </View>

//             {/* Currency */}
//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 mb-2">
//                 Currency (Country)
//               </Text>
//               <View className="bg-gray-100 rounded-2xl">
//                 <Picker
//                   selectedValue={formData.countryAutoId}
//                   onValueChange={handleCurrencyChange}
//                 >
//                   <Picker.Item label="Select a country" value="" />
//                   {currencydata.map((item) => (
//                     <Picker.Item
//                       key={item.autoId}
//                       label={`${item.currencyCode} - ${item.countryName}`}
//                       value={item.autoId}
//                     />
//                   ))}
//                 </Picker>
//               </View>
//             </View>

//             {/* Zone Offset (Timezone) */}
//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 mb-2">Timezone</Text>
//               <TouchableOpacity
//                 className="bg-gray-100 rounded-2xl py-3 px-4 flex-row items-center justify-between"
//                 onPress={() => setShowTimezoneModal(true)}
//                 disabled={!formData.countryAutoId}
//               >
//                 <Text className={!formData.countryAutoId ? "text-gray-400" : ""}>
//                   {formData.zoneOffset ||
//                     (formData.countryAutoId
//                       ? "Select timezone"
//                       : "Select a country first")}
//                 </Text>
//                 <Feather
//                   name="chevron-down"
//                   size={20}
//                   color={!formData.countryAutoId ? "#9ca3af" : "#6b7280"}
//                 />
//               </TouchableOpacity>
//               {errors.zoneOffset && (
//                 <Text className="text-red-500 text-xs mt-1">
//                   {errors.zoneOffset}
//                 </Text>
//               )}
//             </View>

//             {/* Budget */}
//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 mb-2">
//                 Budget (in millions)
//               </Text>
//               <TextInput
//                 className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
//                 placeholder="e.g., 2.5"
//                 keyboardType="numeric"
//                 value={formData.budget}
//                 onChangeText={(text) => handleInputChange("budget", text)}
//               />
//               {errors.budget && (
//                 <Text className="text-red-500 text-xs mt-1">
//                   {errors.budget}
//                 </Text>
//               )}
//             </View>

//             {/* Location */}
//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 mb-2">Location</Text>
//               <TextInput
//                 className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
//                 placeholder="Enter location"
//                 value={formData.location}
//                 onChangeText={(text) => handleInputChange("location", text)}
//               />
//               {errors.location && (
//                 <Text className="text-red-500 text-xs mt-1">
//                   {errors.location}
//                 </Text>
//               )}
//             </View>

//             {/* Description */}
//             <View className="mb-4">
//               <Text className="text-sm text-gray-600 mb-2">Description</Text>
//               <TextInput
//                 className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
//                 placeholder="Enter description"
//                 multiline
//                 numberOfLines={4}
//                 value={formData.description}
//                 onChangeText={(text) => handleInputChange("description", text)}
//               />
//               {errors.description && (
//                 <Text className="text-red-500 text-xs mt-1">
//                   {errors.description}
//                 </Text>
//               )}
//             </View>

//             {/* Project Photo */}
//             <View className="mb-6">
//               <Text className="text-sm text-gray-600 mb-2">Project Photo</Text>
//               <TouchableOpacity
//                 className="bg-gray-100 rounded-2xl py-3 px-4 flex-row items-center"
//                 onPress={pickImage}
//               >
//                 <Feather
//                   name="upload"
//                   size={20}
//                   color="#6b7280"
//                   style={{ marginRight: 8 }}
//                 />
//                 <Text>
//                   {formData.projectPhoto ? "Photo Selected" : "Upload Photo"}
//                 </Text>
//               </TouchableOpacity>
//               {formData.projectPhoto && (
//                 <Image
//                   source={{ uri: formData.projectPhoto }}
//                   className="w-32 h-32 rounded-xl mt-2"
//                   resizeMode="cover"
//                 />
//               )}
//               {errors.projectPhoto && (
//                 <Text className="text-red-500 text-xs mt-1">
//                   {errors.projectPhoto}
//                 </Text>
//               )}
//             </View>

//             {/* Submit Button */}
//             <TouchableOpacity
//               className="bg-blue-600 rounded-2xl py-3 px-4 shadow-lg active:scale-95 disabled:bg-blue-300"
//               onPress={handleSubmit}
//               disabled={isLoading}
//             >
//               <Text className="text-white text-center text-base font-medium">
//                 {isLoading ? "Creating..." : "Create Project"}
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Timezone Modal */}
//         <Modal
//           visible={showTimezoneModal}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setShowTimezoneModal(false)}
//         >
//           <View className="flex-1 justify-center bg-black/50">
//             <View className="mx-5 bg-white rounded-2xl p-5">
//               <View className="flex-row justify-between items-center mb-4">
//                 <Text className="text-lg font-semibold">Select Timezone</Text>
//                 <TouchableOpacity onPress={() => setShowTimezoneModal(false)}>
//                   <Feather name="x" size={24} color="#6b7280" />
//                 </TouchableOpacity>
//               </View>
//               {isLoading ? (
//                 <Text className="text-center py-4">Loading timezones...</Text>
//               ) : timezones?.length === 0 ? (
//                 <Text className="text-center py-4">No timezones available</Text>
//               ) : (
//                 <Picker
//                   selectedValue={formData.zoneOffset}
//                   onValueChange={(itemValue) => {
//                     handleInputChange("zoneOffset", itemValue);
//                     setShowTimezoneModal(false);
//                   }}
//                 >
//                   <Picker.Item label="Select timezone" value="" />
//                   {timezones?.map((timezone) => (
//                     <Picker.Item
//                       key={timezone.autoId || timezone.name}
//                       label={`${timezone.territory} ${timezone.utcTimeOffset}`}
//                       value={`${timezone.autoId}`}
//                     />
//                   ))}
//                 </Picker>
//               )}
//             </View>
//           </View>
//         </Modal>
//       </ScrollView>
//     </>
//   );
// }

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
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddNewProjectScreen() {
  const navigation = useNavigation();
  const [projectTypes, setProjectTypes] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    type: "FJGBBOg9RO3", // Set default to Residential autoId
    startDate: new Date(),
    endDate: new Date(),
    currency: "", // This will now store the currency autoId
    currencyCode: "", // Added to store the currency code for display
    countryAutoId: "",
    zoneOffset: "",
    budget: "",
    location: "",
    latitude: "",
    longitude: "",
    description: "",
    projectPhoto: null,
  });
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [token, setToken] = useState(null);
  const [currencydata, setCurrencyData] = useState([]);
  const [timezones, setTimezones] = useState([]);
  const [showTimezoneModal, setShowTimezoneModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  const fetchCurrency = async () => {
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
      setCurrencyData(data.currencyMasterBeans);
      
      // Set project types from API response
      if (data.dropdownMap && data.dropdownMap.PROJECT_TYPE) {
        setProjectTypes(data.dropdownMap.PROJECT_TYPE);
      } else {
       
        setProjectTypes([]);
      }
    } catch (err) {
      console.error("Error fetching currency:", err);
    } finally {
      setIsLoading(false);
    }
  };

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
      setTimezones(data.timeZoneMasterBeans);
    } catch (err) {
      console.error("Error fetching timezones:", err);
      alert("Failed to fetch timezones. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (token) {
      fetchCurrency();
    }
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert(
            "Camera roll permissions are required to upload a project photo."
          );
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
        currency: selectedCurrency.autoId, // Store the autoId for backend
        currencyCode: selectedCurrency.currencyCode, // Store code for display
        latitude: selectedCurrency.latitude,
        longitude: selectedCurrency.longitude,
        countryAutoId: selectedCurrency.autoId,
        zoneOffset: "",
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
      alert("Failed to pick image. Please try again.");
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
    if (!formData.projectPhoto) newErrors.projectPhoto = "Project Photo is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler with API integration
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      const form = new FormData();

      // Prepare payload for formData field
      const payload = {
        endDate: formData.endDate.toISOString().split("T")[0],
        latitude: formData.latitude,
        longitude: formData.longitude,
        projectName: formData.name,
        projectCode: formData.code,
        projectType: formData.type, // This contains the project type autoId
        startDate: formData.startDate.toISOString().split("T")[0],
        currency: formData.currency, // This now contains the currency autoId
        zoneId: formData.zoneOffset,
        budget: formData.budget,
        location: formData.location,
        projectDescription: formData.description,
      };

      // Append formData JSON
      form.append("formData", JSON.stringify(payload));

      // Append file if projectPhoto exists
      if (formData.projectPhoto) {
        const uriParts = formData.projectPhoto.split(".");
        const fileType = uriParts[uriParts.length - 1].toLowerCase();
        form.append("file", {
          uri: formData.projectPhoto,
          name: `project.${fileType}`,
          type: `image/${fileType}`,
        });
      }

      const response = await fetch(
        "https://api-v2-skystruct.prudenttec.com/project/save-project",
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
      console.log(result);
      alert("Project created successfully!");
      navigation.navigate("Main");
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Failed to create project. Please try again.");
    } finally {
      setIsLoading(false);
    }
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

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView className="flex-1 bg-gray-50 pt-6">
        <View className="px-6 py-8">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-gray-800">
              Add New Project
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
                    <Picker.Item 
                      key={type.autoId} 
                      label={type.dropdownValue} 
                      value={type.autoId} 
                    />
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
              <Text className="text-sm text-gray-600 mb-2">
                Currency (Country)
              </Text>
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
              {errors.currency && (
                <Text className="text-red-500 text-xs mt-1">{errors.currency}</Text>
              )}
            </View>

            {/* Zone Offset (Timezone) */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Timezone</Text>
              <TouchableOpacity
                className="bg-gray-100 rounded-2xl py-3 px-4 flex-row items-center justify-between"
                onPress={() => setShowTimezoneModal(true)}
                disabled={!formData.countryAutoId}
              >
                <Text className={!formData.countryAutoId ? "text-gray-400" : ""}>
                  {formData.zoneOffset ||
                    (formData.countryAutoId
                      ? "Select timezone"
                      : "Select a country first")}
                </Text>
                <Feather
                  name="chevron-down"
                  size={20}
                  color={!formData.countryAutoId ? "#9ca3af" : "#6b7280"}
                />
              </TouchableOpacity>
              {errors.zoneOffset && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.zoneOffset}
                </Text>
              )}
            </View>

            {/* Budget */}
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">
                Budget (in millions)
              </Text>
              <TextInput
                className="bg-gray-100 rounded-2xl py-3 px-4 text-base"
                placeholder="e.g., 2.5"
                keyboardType="numeric"
                value={formData.budget}
                onChangeText={(text) => handleInputChange("budget", text)}
              />
              {errors.budget && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.budget}
                </Text>
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
                <Text className="text-red-500 text-xs mt-1">
                  {errors.location}
                </Text>
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
                <Text className="text-red-500 text-xs mt-1">
                  {errors.description}
                </Text>
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
                <Text>
                  {formData.projectPhoto ? "Photo Selected" : "Upload Photo"}
                </Text>
              </TouchableOpacity>
              {formData.projectPhoto && (
                <Image
                  source={{ uri: formData.projectPhoto }}
                  className="w-32 h-32 rounded-xl mt-2"
                  resizeMode="cover"
                />
              )}
              {errors.projectPhoto && (
                <Text className="text-red-500 text-xs mt-1">
                  {errors.projectPhoto}
                </Text>
              )}
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              className="bg-blue-600 rounded-2xl py-3 px-4 shadow-lg active:scale-95 disabled:bg-blue-300"
              onPress={handleSubmit}
              disabled={isLoading}
            >
              <Text className="text-white text-center text-base font-medium">
                {isLoading ? "Creating..." : "Create Project"}
              </Text>
            </TouchableOpacity>
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
              ) : timezones?.length === 0 ? (
                <Text className="text-center py-4">No timezones available</Text>
              ) : (
                <Picker
                  selectedValue={formData.zoneOffset}
                  onValueChange={(itemValue) => {
                    handleInputChange("zoneOffset", itemValue);
                    setShowTimezoneModal(false);
                  }}
                >
                  <Picker.Item label="Select timezone" value="" />
                  {timezones?.map((timezone) => (
                    <Picker.Item
                      key={timezone.autoId || timezone.name}
                      label={`${timezone.territory} ${timezone.utcTimeOffset}`}
                      value={`${timezone.autoId}`}
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