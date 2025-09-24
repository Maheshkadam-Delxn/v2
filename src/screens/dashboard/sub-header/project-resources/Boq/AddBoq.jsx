import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Animated } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Feather } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { StatusBar } from 'expo-status-bar'
import MainLayout from '../../../../components/MainLayout'

const AddBoq = () => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  const [formData, setFormData] = useState({
    category: '',
    boqName: '',
    boqType: '',
    selectedUsers: [],
    description: ''
  })

  const [dropdownStates, setDropdownStates] = useState({
    category: false,
    boqType: false,
    users: false
  })

  const [errors, setErrors] = useState({
    category: false,
    boqName: false
  })

  // Animate on mount
  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8
    }).start();
  }, []);

  // Static data (will be replaced with API calls)
  const categories = [
    'General',
    'Structural', 
    'Other',
    'External',
    'Construction',
    'Electrical',
    'Plumbing',
    'HVAC'
  ]

  const boqTypes = [
    'Fixed',
    'Variable',
    'Material',
    'Labor',
    'Equipment',
    'Subcontractor',
    'Overhead'
  ]

  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com' }
  ]

  const toggleDropdown = (dropdown) => {
    setDropdownStates(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }))
  }

  const selectOption = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setDropdownStates(prev => ({
      ...prev,
      [field]: false
    }))
    
    // Clear error when user selects an option
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: false
      }))
    }
  }

  const toggleUserSelection = (user) => {
    setFormData(prev => ({
      ...prev,
      selectedUsers: prev.selectedUsers.find(u => u.id === user.id)
        ? prev.selectedUsers.filter(u => u.id !== user.id)
        : [...prev.selectedUsers, user]
    }))
  }

  const validateForm = () => {
    const newErrors = {
      category: !formData.category,
      boqName: !formData.boqName.trim()
    }
    
    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error)
  }

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert('Success', 'BOQ created successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setFormData({
              category: '',
              boqName: '',
              boqType: '',
              selectedUsers: [],
              description: ''
            })
          }
        }
      ])
    } else {
      Alert.alert('Error', 'Please fill in all required fields')
    }
  }

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      
      <MainLayout title="Add BOQ">
        {/* Header Section with Blue Gradient */}
        <LinearGradient
          colors={['#f0f7ff', '#e6f0ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="py-4"
        >
          <View className="px-6">
            <Text className="text-lg font-semibold text-blue-800">Create New BOQ</Text>
            <Text className="text-sm text-blue-600 mt-1">Fill in the details below to create a new Bill of Quantity</Text>
          </View>
        </LinearGradient>

        <ScrollView className="flex-1 bg-gray-50">
          <Animated.View 
            className="p-6"
            style={{
              opacity: scaleAnim,
              transform: [{ scale: scaleAnim }]
            }}
          >
            
            {/* First Row - Category and BOQ Name */}
            <View className="flex-row mb-6" style={{ gap: 12 }}>
              {/* Category Dropdown */}
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">Category</Text>
                <TouchableOpacity
                  className={`border rounded-2xl px-4 py-3 bg-white flex-row items-center justify-between ${
                    errors.category ? 'border-red-300' : 'border-gray-200'
                  }`}
                  style={{ height: 44 }}
                  onPress={() => toggleDropdown('category')}
                >
                  <Text className={`text-base font-medium ${
                    formData.category ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {formData.category || 'Select a category'}
                  </Text>
                  <Feather name="grid" size={18} color="#6b7280" />
                </TouchableOpacity>
                
                {dropdownStates.category && (
                  <View className="absolute top-20 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg z-50 max-h-48">
                    <ScrollView>
                      {categories.map((category, index) => (
                        <TouchableOpacity
                          key={index}
                          className={`px-4 py-3 ${index !== categories.length - 1 ? 'border-b border-gray-100' : ''}`}
                          onPress={() => selectOption('category', category)}
                        >
                          <Text className="text-base font-medium text-gray-800">{category}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
                
                {errors.category && (
                  <Text className="text-red-500 text-xs mt-1 font-medium">Phase is required.</Text>
                )}
              </View>

              {/* BOQ Name Input */}
              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-700 mb-2">BOQ Name</Text>
                <View className="flex-row items-center">
                  <View className={`flex-1 border rounded-2xl px-4 bg-white flex-row items-center ${
                    errors.boqName ? 'border-red-300' : 'border-gray-200'
                  }`} style={{ height: 44 }}>
                    <TextInput
                      className="flex-1 text-base font-medium text-gray-800"
                      value={formData.boqName}
                      onChangeText={(text) => {
                        setFormData(prev => ({ ...prev, boqName: text }))
                        if (errors.boqName && text.trim()) {
                          setErrors(prev => ({ ...prev, boqName: false }))
                        }
                      }}
                      placeholder="BOQ Name"
                      placeholderTextColor="#9ca3af"
                    />
                    <Feather name="user" size={18} color="#6b7280" />
                  </View>
                </View>
                
                {errors.boqName && (
                  <Text className="text-red-500 text-xs mt-1 font-medium">BOQ Name is required.</Text>
                )}
              </View>
            </View>

            {/* Second Row - BOQ Type and Add Users */}
            <View className="flex-row mb-6" style={{ gap: 12 }}>
              {/* BOQ Type Dropdown */}
              <View className="flex-1">
                <Text className="text-sm font-medium text-blue-600 mb-2">BOQ Type</Text>
                <TouchableOpacity
                  className="border border-gray-200 rounded-2xl px-4 py-3 bg-white flex-row items-center justify-between"
                  style={{ height: 44 }}
                  onPress={() => toggleDropdown('boqType')}
                >
                  <Text className={`text-base font-medium ${
                    formData.boqType ? 'text-gray-800' : 'text-gray-400'
                  }`}>
                    {formData.boqType || 'Select Type'}
                  </Text>
                  <Feather name="user" size={18} color="#6b7280" />
                </TouchableOpacity>
                
                {dropdownStates.boqType && (
                  <View className="absolute top-20 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg z-40 max-h-48">
                    <ScrollView>
                      {boqTypes.map((type, index) => (
                        <TouchableOpacity
                          key={index}
                          className={`px-4 py-3 ${index !== boqTypes.length - 1 ? 'border-b border-gray-100' : ''}`}
                          onPress={() => selectOption('boqType', type)}
                        >
                          <Text className="text-base font-medium text-gray-800">{type}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Add Users to Share Dropdown */}
              <View className="flex-1">
                <Text className="text-sm font-medium text-blue-600 mb-2">Add users to share</Text>
                <TouchableOpacity
                  className="border border-gray-200 rounded-2xl px-4 py-3 bg-white flex-row items-center justify-between"
                  style={{ height: 44 }}
                  onPress={() => toggleDropdown('users')}
                >
                  <Text className="text-base font-medium text-gray-400">
                    {formData.selectedUsers.length > 0 
                      ? `${formData.selectedUsers.length} user(s) selected`
                      : 'Select Options'
                    }
                  </Text>
                  <Feather name="chevron-down" size={18} color="#6b7280" />
                </TouchableOpacity>
                
                {dropdownStates.users && (
                  <View className="absolute top-20 left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg z-30 max-h-48">
                    <ScrollView>
                      {users.map((user, index) => (
                        <TouchableOpacity
                          key={user.id}
                          className={`px-4 py-3 flex-row items-center ${index !== users.length - 1 ? 'border-b border-gray-100' : ''}`}
                          onPress={() => toggleUserSelection(user)}
                        >
                          <View className={`w-4 h-4 border border-gray-300 rounded mr-3 items-center justify-center ${
                            formData.selectedUsers.find(u => u.id === user.id) 
                              ? 'bg-blue-500 border-blue-500' 
                              : 'bg-white'
                          }`}>
                            {formData.selectedUsers.find(u => u.id === user.id) && (
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

            {/* Description Text Area */}
            <View className="mb-8">
              <Text className="text-sm font-medium text-gray-700 mb-2">Description</Text>
              <TextInput
                className="border border-gray-200 rounded-2xl px-4 py-3 text-base font-medium bg-white text-gray-800"
                value={formData.description}
                onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                placeholder="Enter Description"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                style={{ height: 120 }}
              />
            </View>

            {/* Submit Button */}
            <View className="items-end">
              <TouchableOpacity
                className="rounded-2xl px-8 py-3"
                style={{
                  backgroundColor: '#3b82f6',
                }}
                onPress={handleSubmit}
              >
                <Text className="text-white text-base font-semibold">Submit</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </MainLayout>
    </View>
  )
}

export default AddBoq