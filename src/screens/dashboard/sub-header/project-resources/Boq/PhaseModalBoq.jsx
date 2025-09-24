import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import MainLayout from '../../../../components/MainLayout'

const PhaseModalBoq = () => {
  const [phaseName, setPhaseName] = useState('')
  const [phases, setPhases] = useState([
    { id: 1, name: 'General', active: true },
    { id: 2, name: 'Structural', active: true },
    { id: 3, name: 'Other', active: true },
    { id: 4, name: 'External', active: true }
  ])

  const togglePhase = (id) => {
    setPhases(phases.map(phase => 
      phase.id === id ? { ...phase, active: !phase.active } : phase
    ))
  }

  const deletePhase = (id) => {
    Alert.alert(
      'Delete Phase',
      'Are you sure you want to delete this phase?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => setPhases(phases.filter(phase => phase.id !== id))
        }
      ]
    )
  }

  const addNewPhase = () => {
    if (phaseName.trim()) {
      const newPhase = {
        id: phases.length > 0 ? Math.max(...phases.map(p => p.id)) + 1 : 1,
        name: phaseName.trim(),
        active: true
      }
      setPhases([...phases, newPhase]) // Add to bottom of list
      setPhaseName('')
    } else {
      Alert.alert('Error', 'Please enter a phase name')
    }
  }

  return (
    <MainLayout title="Add Phase">
      <View className="flex-1 bg-slate-50">
        {/* Main Content */}
        <View className="flex-1 p-5">
          
          {/* Phase Name Input and Add Button in Same Line */}
          <View className="mb-8">
            <Text className="text-base text-gray-600 mb-2 font-medium">Phase Name</Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-base bg-white text-gray-800"
                value={phaseName}
                onChangeText={setPhaseName}
                placeholder="Enter phase name"
                placeholderTextColor="#999"
              />
              <TouchableOpacity 
                className="flex-row items-center justify-center bg-green-500 py-3 px-5 rounded-lg ml-3"
                onPress={addNewPhase}
              >
                <Ionicons name="add" size={20} color="white" />
                <Text className="text-white text-base font-semibold ml-1.5">Add</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Phase List Section */}
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-800 text-center mb-5">
              Phase List
            </Text>

            {/* Phase Items */}
            <ScrollView className="bg-white rounded-lg shadow-sm shadow-gray-200">
              {phases.map((phase, index) => (
                <View 
                  key={phase.id} 
                  className={`flex-row items-center px-5 py-4 ${
                    index !== phases.length - 1 ? 'border-b border-gray-100' : ''
                  }`}
                >
                  <Text className="flex-1 text-base text-gray-800 font-medium">
                    {phase.name}
                  </Text>
                  
                  <TouchableOpacity 
                    className={`px-4 py-1.5 rounded-full mr-3 min-w-[70px] items-center ${
                      phase.active ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    onPress={() => togglePhase(phase.id)}
                  >
                    <Text className={`text-xs font-semibold ${
                      phase.active ? 'text-white' : 'text-gray-600'
                    }`}>
                      Active
                    </Text>
                  </TouchableOpacity>

                  <View className="flex-row items-center">
                    <TouchableOpacity className="p-2 mr-2">
                      <Ionicons name="pencil-outline" size={18} color="#FF9800" />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className="p-2"
                      onPress={() => deletePhase(phase.id)}
                    >
                      <Ionicons name="trash-outline" size={18} color="#F44336" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </MainLayout>
  )
}

export default PhaseModalBoq