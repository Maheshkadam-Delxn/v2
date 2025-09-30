import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function EditBoq() {
  const navigation = useNavigation();
  const route = useRoute();
  const { boqId } = route.params || {}; // Assuming boqId is passed for editing

  const [category, setCategory] = useState('General');
  const [boqName, setBoqName] = useState('General Test');
  const [boqType, setBoqType] = useState('Fixed');
  const [usersToShare, setUsersToShare] = useState('4 Selected');
  const [description, setDescription] = useState('');

  // Placeholder for fetching data if needed
  useEffect(() => {
    // Fetch BOQ data by id and set states
    // For now, using defaults
  }, [boqId]);

  const handleSubmit = () => {
    // Handle update API call
    console.log('Updating BOQ:', { category, boqName, boqType, usersToShare, description });
    navigation.goBack();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <LinearGradient
        colors={['#3b82f6', '#2563eb']}
        className="px-6 py-4 flex-row items-center justify-between"
      >
        <Text className="text-white text-xl font-bold">Edit BOQ</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="x" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>

      <ScrollView className="flex-1 px-6 py-6">
        {/* Category */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Category</Text>
          <TouchableOpacity className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center">
            <Text className="text-gray-800">{category}</Text>
            <Feather name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* BOQ Name */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">BOQ Name</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800"
            value={boqName}
            onChangeText={setBoqName}
            placeholder="Enter BOQ Name"
          />
        </View>

        {/* BOQ Type */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">BOQ Type</Text>
          <TouchableOpacity className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center">
            <Text className="text-gray-800">{boqType}</Text>
            <Feather name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Add Users to Share */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Add Users to Share</Text>
          <TouchableOpacity className="bg-white border border-gray-200 rounded-lg px-4 py-3 flex-row justify-between items-center">
            <Text className="text-gray-800">{usersToShare}</Text>
            <Feather name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View className="mb-6">
          <Text className="text-gray-700 font-medium mb-2">Enter Description</Text>
          <TextInput
            className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-800 h-32"
            value={description}
            onChangeText={setDescription}
            placeholder="Enter Description here"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-blue-600 rounded-lg py-4 items-center"
        >
          <Text className="text-white font-bold text-lg">Update</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}