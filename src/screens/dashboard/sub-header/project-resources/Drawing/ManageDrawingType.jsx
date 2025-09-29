import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import MainLayout from '../../../../components/MainLayout';

const BASE_URL = 'https://api-v2-skystruct.prudenttec.com/';
const MENU_ID = 'DRlBbUjgXSb';
const TYPE = 'DRAWING_TYPE';

const ManageDrawingType = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId } = route.params || { projectId: 1 };

  const [types, setTypes] = useState([]);
  const [newTypeName, setNewTypeName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [jwtToken, setJwtToken] = useState('');

  useEffect(() => {
    const initialize = async () => {
      await fetchToken();
    };
    initialize();
  }, []);

  useEffect(() => {
    if (jwtToken) {
      fetchTypes();
    }
  }, [jwtToken]);

  const fetchToken = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setJwtToken(parsedData.jwtToken);
      } else {
        Alert.alert('Error', 'No user data found');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch token');
      console.error('fetchToken error:', error);
    }
  };

  const updateToken = async (newToken) => {
    if (newToken) {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          const updatedUserData = { ...parsedData, jwtToken: newToken };
          await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
          setJwtToken(newToken);
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to update token');
        console.error('updateToken error:', error);
      }
    }
  };

  const fetchTypes = async () => {
    if (!jwtToken) return;
    try {
      const response = await fetch(`${BASE_URL}commonControl/get-dropdown`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({ type: TYPE }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      setTypes(Array.isArray(data[TYPE]) ? data[TYPE].map(t => ({ id: t.autoId, name: t.name })) : []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch drawing types');
      console.error('fetchTypes error:', error);
      setTypes([]);
    }
  };

  const handleAddType = async () => {
    if (!newTypeName.trim()) {
      Alert.alert('Error', 'Please enter a type name');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}commonControl/add`, { // Assumed endpoint for add
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({
          type: TYPE,
          name: newTypeName.trim(),
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      Alert.alert('Success', 'Drawing type added successfully!');
      setNewTypeName('');
      fetchTypes();
    } catch (error) {
      Alert.alert('Error', 'Failed to add drawing type');
      console.error('handleAddType error:', error);
    }
  };

  const handleEditType = async (id, currentName) => {
    setEditingId(id);
    setNewTypeName(currentName);
  };

  const handleUpdateType = async () => {
    if (!newTypeName.trim()) {
      Alert.alert('Error', 'Please enter a type name');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}commonControl/update`, { // Assumed endpoint for update
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          'X-Menu-Id': MENU_ID,
        },
        body: JSON.stringify({
          type: TYPE,
          autoId: editingId,
          name: newTypeName.trim(),
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      Alert.alert('Success', 'Drawing type updated successfully!');
      setNewTypeName('');
      setEditingId(null);
      fetchTypes();
    } catch (error) {
      Alert.alert('Error', 'Failed to update drawing type');
      console.error('handleUpdateType error:', error);
    }
  };

  const handleDeleteType = async (id) => {
    Alert.alert(
      'Delete Type',
      'Are you sure you want to delete this type?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`${BASE_URL}commonControl/delete/${id}`, { // Assumed endpoint for delete
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${jwtToken}`,
                  'X-Menu-Id': MENU_ID,
                },
                body: JSON.stringify({ type: TYPE }),
              });
              if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
              const data = await response.json();
              updateToken(data.jwtToken);
              fetchTypes();
              Alert.alert('Success', 'Drawing type deleted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete drawing type');
              console.error('handleDeleteType error:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <MainLayout title="Manage Drawing Type">
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1 px-4 pt-4">
          <View className="flex-row items-center mb-6">
            <View className="flex-1 mr-3">
              <TextInput
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Type Name"
                placeholderTextColor="#9CA3AF"
                value={newTypeName}
                onChangeText={setNewTypeName}
              />
            </View>
            <TouchableOpacity 
              className="bg-green-100 px-4 py-2 rounded-lg"
              onPress={editingId ? handleUpdateType : handleAddType}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="add" size={20} color="#22C55E" />
                <Text className="text-green-600 font-medium ml-1">{editingId ? 'Update' : 'Add'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text className="text-gray-800 text-lg font-medium text-center mb-4">
            Type List
          </Text>

          <View className="space-y-4">
            {types.map((type) => (
              <View 
                key={type.id}
                className="flex-row items-center justify-between py-4 border-b border-gray-200"
              >
                <Text className="text-gray-800 font-medium text-base">{type.name}</Text>
                <View className="flex-row items-center">
                  <TouchableOpacity 
                    className="p-2 mr-2"
                    onPress={() => handleEditType(type.id, type.name)}
                  >
                    <MaterialIcons name="edit" size={20} color="#F59E0B" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="p-2"
                    onPress={() => handleDeleteType(type.id)}
                  >
                    <MaterialIcons name="delete" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {types.length === 0 && (
            <View className="items-center py-12">
              <MaterialIcons name="category" size={48} color="#D1D5DB" />
              <Text className="text-gray-500 text-center mt-4">
                No types added yet.{'\n'}Add your first type above.
              </Text>
            </View>
          )}
        </ScrollView>

        <View className="px-4 py-4 bg-white border-t border-gray-200">
          <TouchableOpacity
            className="bg-blue-500 rounded-lg py-4 items-center"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-semibold text-base">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </MainLayout>
  );
};

export default ManageDrawingType;