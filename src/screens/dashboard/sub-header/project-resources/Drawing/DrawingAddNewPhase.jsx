import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from 'react-native-vector-icons';
import MainLayout from '../../../../components/MainLayout';

const DrawingAddNewPhase = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { projectId } = route.params || { projectId: 1 };
  
  const [phases, setPhases] = useState([
    { id: 1, name: 'General', isActive: true },
    { id: 2, name: 'Structural', isActive: true },
  ]);
  
  const [newPhaseName, setNewPhaseName] = useState('');

  const handleAddPhase = () => {
    if (!newPhaseName.trim()) {
      Alert.alert('Error', 'Please enter a phase name');
      return;
    }

    const newPhase = {
      id: phases.length + 1,
      name: newPhaseName.trim(),
      isActive: true,
    };

    setPhases(prev => [...prev, newPhase]);
    setNewPhaseName('');
    
    Alert.alert('Success', 'Phase added successfully!');
  };

  const handleEditPhase = (id) => {
    const phase = phases.find(p => p.id === id);
    if (phase) {
      Alert.prompt(
        'Edit Phase',
        'Enter new phase name:',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Save',
            onPress: (text) => {
              if (text && text.trim()) {
                setPhases(prev => 
                  prev.map(p => 
                    p.id === id ? { ...p, name: text.trim() } : p
                  )
                );
              }
            }
          }
        ],
        'plain-text',
        phase.name
      );
    }
  };

  const handleDeletePhase = (id) => {
    Alert.alert(
      'Delete Phase',
      'Are you sure you want to delete this phase?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setPhases(prev => prev.filter(p => p.id !== id));
          }
        }
      ]
    );
  };

  const handleUpdateSequence = () => {
    Alert.alert('Update Sequence', 'Sequence update functionality would go here');
  };

  return (
    <MainLayout title="Add Phase">
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1 px-4 pt-4">
          {/* Header with Phase Name Input and Add Button */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 mr-3">
              <TextInput
                className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-800"
                placeholder="Phase Name"
                placeholderTextColor="#9CA3AF"
                value={newPhaseName}
                onChangeText={setNewPhaseName}
              />
            </View>

            <TouchableOpacity 
              className="bg-green-100 px-4 py-2 rounded-lg ml-2"
              onPress={handleAddPhase}
            >
              <View className="flex-row items-center">
                <MaterialIcons name="add" size={20} color="#22C55E" />
                <Text className="text-green-600 font-medium ml-1">Add</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Phase List Title */}
          <Text className="text-gray-800 text-lg font-medium text-center mb-4">
            Phase List
          </Text>

          {/* Update Sequence Button */}
         

          {/* Phase List */}
          <View className="space-y-4">
            {phases.map((phase) => (
              <View 
                key={phase.id}
                className="flex-row items-center justify-between py-4 border-b border-gray-200"
              >
                {/* Phase Name and Status */}
                <View className="flex-1">
                  <View className="flex-row items-center">
                    <Text className="text-gray-800 font-medium text-base mr-3">
                      {phase.name}
                    </Text>
                    {phase.isActive && (
                      <View className="bg-green-100 px-2 py-1 rounded">
                        <Text className="text-green-600 text-xs font-medium">
                          Active
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row items-center">
                  <TouchableOpacity 
                    className="p-2 mr-2"
                    onPress={() => handleEditPhase(phase.id)}
                  >
                    <MaterialIcons name="edit" size={20} color="#F59E0B" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    className="p-2"
                    onPress={() => handleDeletePhase(phase.id)}
                  >
                    <MaterialIcons name="delete" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Empty State */}
          {phases.length === 0 && (
            <View className="items-center py-12">
              <MaterialIcons name="timeline" size={48} color="#D1D5DB" />
              <Text className="text-gray-500 text-center mt-4">
                No phases added yet.{'\n'}Add your first phase above.
              </Text>
            </View>
          )}
        </ScrollView>

        {/* Back Button */}
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

export default DrawingAddNewPhase;