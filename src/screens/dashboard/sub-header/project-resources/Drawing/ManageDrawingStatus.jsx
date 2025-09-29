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
const TYPE = 'DRAWING_STATUS';

const ManageDrawingStatus = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId } = route.params || { projectId: 1 };

  const [statuses, setStatuses] = useState([]);
  const [newStatusName, setNewStatusName] = useState('');
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
      fetchStatuses();
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

  const fetchStatuses = async () => {
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
      setStatuses(Array.isArray(data[TYPE]) ? data[TYPE].map(s => ({ id: s.autoId, name: s.name })) : []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch drawing statuses');
      console.error('fetchStatuses error:', error);
      setStatuses([]);
    }
  };

  const handleAddStatus = async () => {
    if (!newStatusName.trim()) {
      Alert.alert('Error', 'Please enter a status name');
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
          name: newStatusName.trim(),
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      Alert.alert('Success', 'Drawing status added successfully!');
      setNewStatusName('');
      fetchStatuses();
    } catch (error) {
      Alert.alert('Error', 'Failed to add drawing status');
      console.error('handleAddStatus error:', error);
    }
  };

  const handleEditStatus = async (id, currentName) => {
    setEditingId(id);
    setNewStatusName(currentName);
  };

  const handleUpdateStatus = async () => {
    if (!newStatusName.trim()) {
      Alert.alert('Error', 'Please enter a status name');
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
          name: newStatusName.trim(),
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      updateToken(data.jwtToken);
      Alert.alert('Success', 'Drawing status updated successfully!');
      setNewStatusName('');
      setEditingId(null);
      fetchStatuses();
    } catch (error) {
      Alert.alert('Error', 'Failed to update drawing status');
      console.error('handleUpdateStatus error:', error);
    }
  };

  const handleDeleteStatus = async (id) => {
    Alert.alert(
      'Delete Status',
      'Are you sure you want to delete this status?',
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
              fetchStatuses();
              Alert.alert('Success', 'Drawing status deleted successfully!');
            } catch (error) {
              Alert.alert('Error', 'Failed to delete drawing status');
              console.error('handleDeleteStatus error:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <MainLayout title="Manage Drawing Status">
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1 px-4 pt-4">
          <View className="flex-row items-center mb-6">
            <View className="flex-1 mr-3">
              <TextInput
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Status Name"
                placeholderTextColor="#9CA3AF"
                value={newStatusName}
                onChangeText={setNewStatusName}
              />
            </View>
            <TouchableOpacity 
              className="bg-green-100 px-4 py-2 rounded-lg"
              onPress={editingId ? handleUpdateStatus : handleAddStatus}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="add" size={20} color="#22C55E" />
                <Text className="text-green-600 font-medium ml-1">{editingId ? 'Update' : 'Add'}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text className="text-gray-800 text-lg font-medium text-center mb-4">
            Status List
          </Text>

          <View className="space-y-4">
            {statuses.map((status) => (
              <View 
                key={status.id}
                className="flex-row items-center justify-between py-4 border-b border-gray-200"
              >
                <Text className="text-gray-800 font-medium text-base">{status.name}</Text>
                <View className="flex-row items-center">
                  <TouchableOpacity 
                    className="p-2 mr-2"
                    onPress={() => handleEditStatus(status.id, status.name)}
                  >
                    <MaterialIcons name="edit" size={20} color="#F59E0B" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="p-2"
                    onPress={() => handleDeleteStatus(status.id)}
                  >
                    <MaterialIcons name="delete" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {statuses.length === 0 && (
            <View className="items-center py-12">
              <MaterialIcons name="flag" size={48} color="#D1D5DB" />
              <Text className="text-gray-500 text-center mt-4">
                No statuses added yet.{'\n'}Add your first status above.
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

export default ManageDrawingStatus;