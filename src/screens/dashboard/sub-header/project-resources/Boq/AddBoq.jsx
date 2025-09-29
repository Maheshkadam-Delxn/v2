// import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Animated } from 'react-native'
// import React, { useState, useRef, useEffect } from 'react'
// import { Feather } from '@expo/vector-icons'
// import { LinearGradient } from 'expo-linear-gradient'
// import { StatusBar } from 'expo-status-bar'
// import MainLayout from '../../../../components/MainLayout'

// const AddBoq = () => {
//   const scaleAnim = useRef(new Animated.Value(0.95)).current;

//   const [formData, setFormData] = useState({
//     category: '',
//     boqName: '',
//     boqType: '',
//     selectedUsers: [],
//     description: ''
//   })

//   const [dropdownStates, setDropdownStates] = useState({
//     category: false,
//     boqType: false,
//     users: false
//   })

//   const [errors, setErrors] = useState({
//     category: false,
//     boqName: false
//   })

//   const [boqTypes, setBoqTypes] = useState([])

//       const fetchBoqTypes = async () => {
//          const userData = await AsyncStorage.getItem('userData');
//     if (!userData) {
//       console.log('❌ No user data found in storage');
//       setIsLoading(false);
//       return;
//     }
//     const parsedData = JSON.parse(userData);
//       try {
//         const response = await fetch('https://api-v2-skystruct.prudenttec.com/commonControl/get-dropdown', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${parsedData.jwtToken}`,
//             'X-Menu-Id': '19Ab9n5HF73',
//           },
//           body: JSON.stringify({type:"BOQ_TYPE,CHANGE_TYPE,CATEGORY"})
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log(data);

//         const types = data.boqType || data.boq_types || []; // Placeholder - update with actual key
//         setBoqTypes(types);
//       } catch (error) {
//         console.error('Error fetching BOQ types:', error);
//         Alert.alert('Error', 'Failed to fetch BOQ types. Please try again.');
//       }
//     };

//   // Fetch BOQ Types on component mount
//   useEffect(() => {
//     fetchBoqTypes();
//   }, []);

//   // Animate on mount
//   useEffect(() => {
//     Animated.spring(scaleAnim, {
//       toValue: 1,
//       useNativeDriver: true,
//       tension: 100,
//       friction: 8
//     }).start();
//   }, []);

//   const toggleDropdown = (dropdown) => {
//     setDropdownStates(prev => ({
//       ...prev,
//       [dropdown]: !prev[dropdown]
//     }))
//   }

//   const selectOption = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }))
//     setDropdownStates(prev => ({
//       ...prev,
//       [field]: false
//     }))

//     // Clear error when user selects an option
//     if (errors[field]) {
//       setErrors(prev => ({
//         ...prev,
//         [field]: false
//       }))
//     }
//   }

//   const toggleUserSelection = (user) => {
//     setFormData(prev => ({
//       ...prev,
//       selectedUsers: prev.selectedUsers.find(u => u.id === user.id)
//         ? prev.selectedUsers.filter(u => u.id !== user.id)
//         : [...prev.selectedUsers, user]
//     }))
//   }

//   const validateForm = () => {
//     const newErrors = {
//       category: !formData.category,
//       boqName: !formData.boqName.trim()
//     }

//     setErrors(newErrors)
//     return !Object.values(newErrors).some(error => error)
//   }

//   const handleSubmit = async () => {
//     if (validateForm()) {
//       try {
//         // Prepare the payload for creating new BOQ
//         // Adjust the payload structure based on your API requirements
//         const payload = {
//           category: formData.category,
//           name: formData.boqName,
//           type: formData.boqType,
//           sharedUsers: formData.selectedUsers.map(user => user.id), // Assuming user objects have 'id'
//           description: formData.description,
//           // Add any other required fields
//         };

//         // Replace with your actual API endpoint for creating BOQ
//         const response = await fetch('https://api-v2-skystruct.prudenttec.com/boq/create', { // Placeholder endpoint - update with actual
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             // Add Authorization header if needed
//           },
//           body: JSON.stringify(payload),
//         });

//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log('BOQ created:', result);

//         Alert.alert('Success', 'BOQ created successfully!', [
//           {
//             text: 'OK',
//             onPress: () => {
//               // Reset form
//               setFormData({
//                 category: '',
//                 boqName: '',
//                 boqType: '',
//                 selectedUsers: [],
//                 description: ''
//               })
//             }
//           }
//         ])
//       } catch (error) {
//         console.error('Error creating BOQ:', error);
//         Alert.alert('Error', 'Failed to create BOQ. Please try again.');
//       }
//     } else {
//       Alert.alert('Error', 'Please fill in all required fields')
//     }
//   }

//   return (
//     <View className="flex-1 bg-gray-50">
//       <StatusBar style="auto" />

//       <MainLayout title="Add BOQ">
//         {/* Header Section with Blue Gradient */}
//         <LinearGradient
//           colors={['#f0f7ff', '#e6f0ff']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 0, y: 1 }}
//           className="py-4"
//         >
//           <View className="px-6">
//             <Text className="text-lg font-semibold text-blue-800">Create New BOQ</Text>
//             <Text className="text-sm text-blue-600 mt-1">Fill in the details below to create a new Bill of Quantity</Text>
//           </View>
//         </LinearGradient>

//         <ScrollView className="flex-1 bg-gray-50">
//           <Animated.View
//             className="p-6"
//             style={{
//               opacity: scaleAnim,
//               transform: [{ scale: scaleAnim }]
//             }}
//           >

//             {/* First Row - Category and BOQ Name */}
//             <View className="flex-row mb-6" style={{ gap: 12 }}>
//               {/* Category Dropdown */}
//               <View className="flex-1">
//                 <Text className="text-sm font-medium text-gray-700 mb-2">Category</Text>
//                 <TouchableOpacity
//                   className={`border rounded-2xl px-4 py-3 bg-white flex-row items-center justify-between ${
//                     errors.category ? 'border-red-300' : 'border-gray-200'
//                   }`}
//                   style={{ height: 44 }}
//                   onPress={() => toggleDropdown('category')}
//                 >
//                   <Text className={`text-base font-medium ${
//                     formData.category ? 'text-gray-800' : 'text-gray-400'
//                   }`}>
//                     {formData.category || 'Select a category'}
//                   </Text>
//                   <Feather name="grid" size={18} color="#6b7280" />
//                 </TouchableOpacity>

//                 {dropdownStates.category && (
//                   <View className="absolute top-20 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-48">
//                     <ScrollView>
//                       {categories.map((category, index) => (
//                         <TouchableOpacity
//                           key={index}
//                           className={`px-4 py-3 ${index !== categories.length - 1 ? 'border-b border-gray-100' : ''}`}
//                           onPress={() => selectOption('category', category)}
//                         >
//                           <Text className="text-base font-medium text-gray-800">{category}</Text>
//                         </TouchableOpacity>
//                       ))}
//                     </ScrollView>
//                   </View>
//                 )}

//                 {errors.category && (
//                   <Text className="text-red-500 text-xs mt-1 font-medium">Phase is required.</Text>
//                 )}
//               </View>

//               {/* BOQ Name Input */}
//               <View className="flex-1">
//                 <Text className="text-sm font-medium text-gray-700 mb-2">BOQ Name</Text>
//                 <View className="flex-row items-center">
//                   <View className={`flex-1 border rounded-2xl px-4 bg-white flex-row items-center ${
//                     errors.boqName ? 'border-red-300' : 'border-gray-200'
//                   }`} style={{ height: 44 }}>
//                     <TextInput
//                       className="flex-1 text-base font-medium text-gray-800"
//                       value={formData.boqName}
//                       onChangeText={(text) => {
//                         setFormData(prev => ({ ...prev, boqName: text }))
//                         if (errors.boqName && text.trim()) {
//                           setErrors(prev => ({ ...prev, boqName: false }))
//                         }
//                       }}
//                       placeholder="BOQ Name"
//                       placeholderTextColor="#9ca3af"
//                     />
//                     <Feather name="user" size={18} color="#6b7280" />
//                   </View>
//                 </View>

//                 {errors.boqName && (
//                   <Text className="text-red-500 text-xs mt-1 font-medium">BOQ Name is required.</Text>
//                 )}
//               </View>
//             </View>

//             {/* Second Row - BOQ Type and Add Users */}
//             <View className="flex-row mb-6" style={{ gap: 12 }}>
//               {/* BOQ Type Dropdown */}
//               <View className="flex-1">
//                 <Text className="text-sm font-medium text-blue-600 mb-2">BOQ Type</Text>
//                 <TouchableOpacity
//                   className="border border-gray-200 rounded-2xl px-4 py-3 bg-white flex-row items-center justify-between"
//                   style={{ height: 44 }}
//                   onPress={() => toggleDropdown('boqType')}
//                   disabled={boqTypes.length === 0}
//                 >
//                   <Text className={`text-base font-medium ${
//                     formData.boqType ? 'text-gray-800' : 'text-gray-400'
//                   }`}>
//                     {formData.boqType || (boqTypes.length === 0 ? 'Loading...' : 'Select Type')}
//                   </Text>
//                   <Feather name="user" size={18} color="#6b7280" />
//                 </TouchableOpacity>

//                 {dropdownStates.boqType && boqTypes.length > 0 && (
//                   <View className="absolute top-20 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg z-40 max-h-48">
//                     <ScrollView>
//                       {boqTypes.map((type, index) => (
//                         <TouchableOpacity
//                           key={index}
//                           className={`px-4 py-3 ${index !== boqTypes.length - 1 ? 'border-b border-gray-100' : ''}`}
//                           onPress={() => selectOption('boqType', typeof type === 'object' ? type.name || type.value : type)}
//                         >
//                           <Text className="text-base font-medium text-gray-800">
//                             {typeof type === 'object' ? type.name || type.value : type}
//                           </Text>
//                         </TouchableOpacity>
//                       ))}
//                     </ScrollView>
//                   </View>
//                 )}
//               </View>

//               {/* Add Users to Share Dropdown */}
//               <View className="flex-1">
//                 <Text className="text-sm font-medium text-blue-600 mb-2">Add users to share</Text>
//                 <TouchableOpacity
//                   className="border border-gray-200 rounded-2xl px-4 py-3 bg-white flex-row items-center justify-between"
//                   style={{ height: 44 }}
//                   onPress={() => toggleDropdown('users')}
//                 >
//                   <Text className="text-base font-medium text-gray-400">
//                     {formData.selectedUsers.length > 0
//                       ? `${formData.selectedUsers.length} user(s) selected`
//                       : 'Select Options'
//                     }
//                   </Text>
//                   <Feather name="chevron-down" size={18} color="#6b7280" />
//                 </TouchableOpacity>

//                 {dropdownStates.users && (
//                   <View className="absolute top-20 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg z-30 max-h-48">
//                     <ScrollView>
//                       {users.map((user, index) => (
//                         <TouchableOpacity
//                           key={user.id}
//                           className={`px-4 py-3 flex-row items-center ${index !== users.length - 1 ? 'border-b border-gray-100' : ''}`}
//                           onPress={() => toggleUserSelection(user)}
//                         >
//                           <View className={`w-4 h-4 border border-gray-300 rounded mr-3 items-center justify-center ${
//                             formData.selectedUsers.find(u => u.id === user.id)
//                               ? 'bg-blue-500 border-blue-500'
//                               : 'bg-white'
//                           }`}>
//                             {formData.selectedUsers.find(u => u.id === user.id) && (
//                               <Feather name="check" size={10} color="white" />
//                             )}
//                           </View>
//                           <View>
//                             <Text className="text-base font-medium text-gray-800">{user.name}</Text>
//                             <Text className="text-sm text-gray-500">{user.email}</Text>
//                           </View>
//                         </TouchableOpacity>
//                       ))}
//                     </ScrollView>
//                   </View>
//                 )}
//               </View>
//             </View>

//             {/* Description Text Area */}
//             <View className="mb-8">
//               <Text className="text-sm font-medium text-gray-700 mb-2">Description</Text>
//               <TextInput
//                 className="border border-gray-200 rounded-2xl px-4 py-3 text-base font-medium bg-white text-gray-800"
//                 value={formData.description}
//                 onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
//                 placeholder="Enter Description"
//                 placeholderTextColor="#9ca3af"
//                 multiline
//                 numberOfLines={6}
//                 textAlignVertical="top"
//                 style={{ height: 120 }}
//               />
//             </View>

//             {/* Submit Button */}
//             <View className="items-end">
//               <TouchableOpacity
//                 className="rounded-2xl px-8 py-3"
//                 style={{
//                   backgroundColor: '#3b82f6',
//                 }}
//                 onPress={handleSubmit}
//               >
//                 <Text className="text-white text-base font-semibold">Submit</Text>
//               </TouchableOpacity>
//             </View>
//           </Animated.View>
//         </ScrollView>
//       </MainLayout>
//     </View>
//   )
// }

// export default AddBoq

import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Animated } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayout from '../../../../components/MainLayout';

const AddBoq = () => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const [formData, setFormData] = useState({
    category: '',
    boqName: '',
    boqType: '',
    selectedUsers: [],
    description: '',
  });
  const [dropdownStates, setDropdownStates] = useState({
    category: false,
    boqType: false,
    users: false,
  });
  const [errors, setErrors] = useState({
    category: false,
    boqName: false,
  });
  const [boqTypes, setBoqTypes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const fetchDropdownData = async () => {
    setIsLoading(true);
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        console.log('❌ No user data found in storage');
        Alert.alert('Error', 'No user data found. Please log in again.');
        setIsLoading(false);
        return;
      }

      const parsedData = JSON.parse(userData);
      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/commonControl/get-dropdown',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': '19Ab9n5HF73',
          },
          body: JSON.stringify({ type: 'BOQ_TYPE,CHANGE_TYPE,CATEGORY' }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);

      // console.log(data?.dropdownMap?.BOQ_TYPE);

      // Extract BOQ types and categories from the response
      const types = data?.dropdownMap?.BOQ_TYPE?.map((item) => item) || [];
      setBoqTypes(types);
      // console.log('BOQ Types:', types);
    } catch (error) {
      console.error('Error fetching dropdown data:', error);
      Alert.alert('Error', 'Failed to fetch dropdown data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPhaseData = async () => {
    setIsLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(userData);
    try {
      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/phase/phase-list-by-module',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': '19Ab9n5HF73',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ module: 'BOQ' }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const phaseList = data.phaseFormBeans.map((p) => ({
        id: p.autoId,
        phaseName: p.phaseName,
        active: p.status === 'A',
      }));
      // console.log('Transformed phases:', phaseList);
      setCategories(phaseList);
    } catch (err) {
      console.error('Error fetching Phase data:', err);
      Alert.alert('Error', 'Failed to fetch phase data');
    } finally {
      setIsLoading(false);
    }
  };
  const fetchPersonData = async () => {
    setIsLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(userData);
    try {
      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/member/get-member-list-by-menu',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': 'DRlBbUjgXSb',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: '4' }),
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log('Transformed User:', data.memberFormBeans);
      setUsers(data.memberFormBeans);
    } catch (err) {
      console.error('Error fetching User data:', err);
      Alert.alert('Error', 'Failed to fetch User data');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch BOQ Types and Categories on component mount
  useEffect(() => {
    fetchDropdownData();
    fetchPhaseData();
    fetchPersonData();
  }, []);

  // console.log("Users : ",users);
  // console.log("Category : ",categories);
  // console.log("BOQ TYPE : ",boqTypes);

  // Animate on mount
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  }, []);

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prev) => ({ ...prev, [dropdown]: !prev[dropdown] }));
  };

  const selectOption = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'category' ? value.phaseName : value,
    }));
    setDropdownStates((prev) => ({ ...prev, [field]: false }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const toggleUserSelection = (user) => {
    setFormData((prev) => ({
      ...prev,
      selectedUsers: prev.selectedUsers.find((u) => u.autoId === user.autoId)
        ? prev.selectedUsers.filter((u) => u.autoId !== user.autoId)
        : [...prev.selectedUsers, user],
    }));
  };

  const validateForm = () => {
    const newErrors = {
      category: !formData.category,
      boqName: !formData.boqName.trim(),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const selectedCategory = categories.find((cat) => cat.phaseName === formData.category);
        const selectedBOQType = boqTypes.find((boq) => boq.dropdownValue === formData.boqType);
        const paidToArray = formData.selectedUsers.map((user) => user.autoId);
        const paidToString = paidToArray.join(',');
        const payload = {
          boqFormBean: {
            phaseId: selectedCategory ? selectedCategory.id : formData.category,
            title: formData.boqName,
            boqType: selectedBOQType.autoId,
            paidTo: paidToString,
            description: formData.description,
          },
        };

        console.log('payload From Submit : -', payload);

        const userData = await AsyncStorage.getItem('userData');
        const parsedData = JSON.parse(userData);
        const response = await fetch('https://api-v2-skystruct.prudenttec.com/boq', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': '19Ab9n5HF73',
          },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log('BOQ created:', result);
        Alert.alert('Success', 'BOQ created successfully!', [
          {
            text: 'OK',
            onPress: () => {
              setFormData({
                category: '',
                boqName: '',
                boqType: '',
                selectedUsers: [],
                description: '',
              });
            },
          },
        ]);
      } catch (error) {
        console.error('Error creating BOQ:', error);
        Alert.alert('Error', 'Failed to create BOQ. Please try again.');
      }
    } else {
      Alert.alert('Error', 'Please fill in all required fields');
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      <MainLayout title="Add BOQ">
        <LinearGradient
          colors={['#f0f7ff', '#e6f0ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="py-4">
          <View className="px-6">
            <Text className="text-lg font-semibold text-blue-800">Create New BOQ</Text>
            <Text className="mt-1 text-sm text-blue-600">
              Fill in the details below to create a new Bill of Quantity
            </Text>
          </View>
        </LinearGradient>
        <ScrollView className="flex-1 bg-gray-50">
          <Animated.View
            className="p-6"
            style={{ opacity: scaleAnim, transform: [{ scale: scaleAnim }] }}>
            <View className="mb-6 flex-row" style={{ gap: 12 }}>
              <View className="flex-1">
                <Text className="mb-2 text-sm font-medium text-gray-700">Category</Text>
                <TouchableOpacity
                  className={`flex-row items-center justify-between rounded-2xl border bg-white px-4 py-3 ${
                    errors.category ? 'border-red-300' : 'border-gray-200'
                  }`}
                  style={{ height: 44 }}
                  onPress={() => toggleDropdown('category')}
                  disabled={categories.length === 0 || isLoading}>
                  <Text
                    className={`text-base font-medium ${
                      formData.category ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                    {formData.category ||
                      (isLoading
                        ? 'Loading...'
                        : categories.length === 0
                          ? 'No categories available'
                          : 'Select a category')}
                  </Text>
                  <Feather name="grid" size={18} color="#6b7280" />
                </TouchableOpacity>
                {dropdownStates.category && categories.length > 0 && (
                  <View className="absolute left-0 right-0 top-20 z-50 max-h-48 rounded-2xl border border-gray-200 bg-white shadow-lg">
                    <ScrollView>
                      {categories.map((category, index) => (
                        <TouchableOpacity
                          key={category.id} // Use unique id for key
                          className={`px-4 py-3 ${
                            index !== categories.length - 1 ? 'border-b border-gray-100' : ''
                          }`}
                          onPress={() => selectOption('category', category)}>
                          <Text className="text-base font-medium text-gray-800">
                            {category.phaseName}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
                {errors.category && (
                  <Text className="mt-1 text-xs font-medium text-red-500">
                    Category is required.
                  </Text>
                )}
              </View>
              <View className="flex-1">
                <Text className="mb-2 text-sm font-medium text-gray-700">BOQ Name</Text>
                <View
                  className={`flex-1 flex-row items-center rounded-2xl border bg-white px-4 ${
                    errors.boqName ? 'border-red-300' : 'border-gray-200'
                  }`}
                  style={{ height: 44 }}>
                  <TextInput
                    className="flex-1 text-base font-medium text-gray-800"
                    value={formData.boqName}
                    onChangeText={(text) => {
                      setFormData((prev) => ({ ...prev, boqName: text }));
                      if (errors.boqName && text.trim()) {
                        setErrors((prev) => ({ ...prev, boqName: false }));
                      }
                    }}
                    placeholder="BOQ Name"
                    placeholderTextColor="#9ca3af"
                  />
                  <Feather name="user" size={18} color="#6b7280" />
                </View>
                {errors.boqName && (
                  <Text className="mt-1 text-xs font-medium text-red-500">
                    BOQ Name is required.
                  </Text>
                )}
              </View>
            </View>
            <View className="mb-6 flex-row" style={{ gap: 12 }}>
              <View className="flex-1">
                <Text className="mb-2 text-sm font-medium text-blue-600">BOQ Type</Text>
                <TouchableOpacity
                  className="flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3"
                  style={{ height: 44 }}
                  onPress={() => toggleDropdown('boqType')}
                  disabled={boqTypes.length === 0 || isLoading}>
                  <Text
                    className={`text-base font-medium ${
                      formData.boqType ? 'text-gray-800' : 'text-gray-400'
                    }`}>
                    {formData.boqType ||
                      (isLoading
                        ? 'Loading...'
                        : boqTypes.length === 0
                          ? 'No types available'
                          : 'Select Type')}
                  </Text>
                  <Feather name="user" size={18} color="#6b7280" />
                </TouchableOpacity>
                {dropdownStates.boqType && boqTypes.length > 0 && (
                  <View className="absolute left-0 right-0 top-20 z-40 max-h-48 rounded-2xl border border-gray-200 bg-white shadow-lg">
                    <ScrollView>
                      {boqTypes.map((type, index) => (
                        <TouchableOpacity
                          key={index}
                          className={`px-4 py-3 ${
                            index !== boqTypes.length - 1 ? 'border-b border-gray-100' : ''
                          }`}
                          onPress={() => selectOption('boqType', type.dropdownValue)}>
                          <Text className="text-base font-medium text-gray-800">
                            {type.dropdownValue}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
              <View className="flex-1">
                <Text className="mb-2 text-sm font-medium text-blue-600">Add users to share</Text>
                <TouchableOpacity
                  className="flex-row items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-3"
                  style={{ height: 44 }}
                  onPress={() => toggleDropdown('users')}>
                  <Text className="text-base font-medium text-gray-400">
                    {formData.selectedUsers.length > 0
                      ? `${formData.selectedUsers.length} user(s) selected`
                      : 'Select Options'}
                  </Text>
                  <Feather name="chevron-down" size={18} color="#6b7280" />
                </TouchableOpacity>
                {dropdownStates.users && (
                  <View className="absolute left-0 right-0 top-20 z-30 max-h-48 rounded-2xl border border-gray-200 bg-white shadow-lg">
                    <ScrollView>
                      {users?.map((user, index) => (
                        <TouchableOpacity
                          key={user.autoId}
                          className={`flex-row items-center px-4 py-3 ${
                            index !== users.length - 1 ? 'border-b border-gray-100' : ''
                          }`}
                          onPress={() => toggleUserSelection(user)}>
                          <View
                            className={`mr-3 h-4 w-4 items-center justify-center rounded border border-gray-300 ${
                              formData.selectedUsers.find((u) => u.autoId === user.autoId)
                                ? 'border-blue-500 bg-blue-500'
                                : 'bg-white'
                            }`}>
                            {formData.selectedUsers.find((u) => u.autoId === user.autoId) && (
                              <Feather name="check" size={10} color="white" />
                            )}
                          </View>
                          <View>
                            <Text className="text-base font-medium text-gray-800">{user.name}</Text>
                            <Text className="text-sm text-gray-500">{user.email}</Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </View>
            <View className="mb-8">
              <Text className="mb-2 text-sm font-medium text-gray-700">Description</Text>
              <TextInput
                className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-base font-medium text-gray-800"
                value={formData.description}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, description: text }))}
                placeholder="Enter Description"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                style={{ height: 120 }}
              />
            </View>
            <View className="items-end">
              <TouchableOpacity
                className="rounded-2xl px-8 py-3"
                style={{ backgroundColor: '#3b82f6' }}
                onPress={handleSubmit}>
                <Text className="text-base font-semibold text-white">Submit</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </MainLayout>
    </View>
  );
};

export default AddBoq;
