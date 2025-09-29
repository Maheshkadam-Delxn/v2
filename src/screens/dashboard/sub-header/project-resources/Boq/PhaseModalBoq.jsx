// import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { Ionicons } from '@expo/vector-icons';
// import MainLayout from '../../../../components/MainLayout';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const PhaseModalBoq = () => {
//   const [phaseName, setPhaseName] = useState('');
//   const [phases, setPhases] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const fetchPhaseData = async () => {
//     setIsLoading(true);
//     const userData = await AsyncStorage.getItem('userData');

//     if (!userData) {
//       console.log('❌ No user data found in storage');
//       setIsLoading(false);
//       return;
//     }

//     const parsedData = JSON.parse(userData);
//     try {
//       const response = await fetch(
//         'https://api-v2-skystruct.prudenttec.com/phase/phase-list-by-module',
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${parsedData.jwtToken}`,
//             'X-Menu-Id': 'DRlBbUjgXSb',
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             module: 'BOQ',
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       // Transform API data to match expected structure
//       const phaseList = data.phaseFormBeans.map((p) => ({
//         id: p.autoId, // Use autoId from API as the unique identifier
//         phaseName: p.phaseName,
//         active: p.status === 'A', // Map status to active boolean
//       }));

//       console.log('Transformed phases:', phaseList);
//       setPhases(phaseList);
//     } catch (err) {
//       console.error('Error fetching Phase data:', err);
//       Alert.alert('Error', 'Failed to fetch phase data');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPhaseData();
//   }, []);

//   const togglePhase = (id) => {
//     setPhases(
//       phases.map((phase) =>
//         phase.id === id ? { ...phase, active: !phase.active } : phase
//       )
//     );
//   };

//   const deletePhase = (id) => {
//     Alert.alert('Delete Phase', 'Are you sure you want to delete this phase?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Delete',
//         style: 'destructive',
//         onPress: () => setPhases(phases.filter((phase) => phase.id !== id)),
//       },
//     ]);
//   };

//   const addNewPhase = async () => {
//     const userData = await AsyncStorage.getItem('userData');

//     if (!userData) {
//       console.log('❌ No user data found in storage');
//       Alert.alert('Error', 'No user data found. Please log in again.');
//       return;
//     }

//     const parsedData = JSON.parse(userData);
//     if (!phaseName.trim()) {
//       Alert.alert('Error', 'Please enter a phase name');
//       return;
//     }

//     const newPhaseData = {
//       phaseFormBean: {
//         module: 'BOQ',
//         phaseName: phaseName.trim(),
//       },
//     };

//     console.log('Sending new phase data:', JSON.stringify(newPhaseData, null, 2));

//     try {
//       const response = await fetch('https://api-v2-skystruct.prudenttec.com/phase', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${parsedData.jwtToken}`,
//           'X-Menu-Id': 'DRlBbUjgXSb', // Corrected typo
//         },
//         body: JSON.stringify(newPhaseData),
//       });

//       console.log('API response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error('API error response:', errorText);
//         throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
//       }

//       const result = await response.json();
//       console.log('API response data:', JSON.stringify(result, null, 2));

//       if (result.status && result.message === 'Phase Added Successfully') {
//         // Since API doesn't return phase details, refresh the phase list
//         setPhaseName('');
//         Alert.alert('Success', 'Phase added successfully');
//         await fetchPhaseData(); // Refresh phase list from server
//       } else {
//         throw new Error('Unexpected API response format');
//       }
//     } catch (error) {
//       console.error('Error adding new phase:', error);
//       Alert.alert('Error', `Failed to add new phase: ${error.message}`);
//     }
//   };

//   return (
//     <MainLayout title="Add Phase">
//       <View className="flex-1 bg-slate-50">
//         {/* Main Content */}
//         <View className="flex-1 p-5">
//           {/* Phase Name Input and Add Button in Same Line */}
//           <View className="mb-8">
//             <Text className="mb-2 text-base font-medium text-gray-600">Phase Name</Text>
//             <View className="flex-row items-center">
//               <TextInput
//                 className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-800"
//                 value={phaseName}
//                 onChangeText={setPhaseName}
//                 placeholder="Enter phase name"
//                 placeholderTextColor="#999"
//               />
//               <TouchableOpacity
//                 className="ml-3 flex-row items-center justify-center rounded-lg bg-green-500 px-5 py-3"
//                 onPress={addNewPhase}
//               >
//                 <Ionicons name="add" size={20} color="white" />
//                 <Text className="ml-1.5 text-base font-semibold text-white">Add</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Phase List Section */}
//           <View className="flex-1">
//             <Text className="mb-5 text-center text-lg font-semibold text-gray-800">Phase List</Text>

//             {/* Phase Items */}
//             <ScrollView className="rounded-lg bg-white shadow-sm shadow-gray-200">
//               {isLoading ? (
//                 <Text className="p-5 text-center text-gray-600">Loading...</Text>
//               ) : phases.length === 0 ? (
//                 <Text className="p-5 text-center text-gray-600">No phases available</Text>
//               ) : (
//                 phases.map((phase, index) => (
//                   <View
//                     key={phase.id}
//                     className={`flex-row items-center px-5 py-4 ${
//                       index !== phases.length - 1 ? 'border-b border-gray-100' : ''
//                     }`}
//                   >
//                     <Text className="flex-1 text-base font-medium text-gray-800">
//                       {phase.phaseName}
//                     </Text>

//                     <TouchableOpacity
//                       className={`mr-3 min-w-[70px] items-center rounded-full px-4 py-1.5 ${
//                         phase.active ? 'bg-green-500' : 'bg-gray-300'
//                       }`}
//                       onPress={() => togglePhase(phase.id)}
//                     >
//                       <Text
//                         className={`text-xs font-semibold ${
//                           phase.active ? 'text-white' : 'text-gray-600'
//                         }`}
//                       >
//                         {phase.active ? 'Active' : 'Inactive'}
//                       </Text>
//                     </TouchableOpacity>

//                     <View className="flex-row items-center">
//                       <TouchableOpacity className="mr-2 p-2">
//                         <Ionicons name="pencil-outline" size={18} color="#FF9800" />
//                       </TouchableOpacity>
//                       <TouchableOpacity className="p-2" onPress={() => deletePhase(phase.id)}>
//                         <Ionicons name="trash-outline" size={18} color="#F44336" />
//                       </TouchableOpacity>
//                     </View>
//                   </View>
//                 ))
//               )}
//             </ScrollView>
//           </View>
//         </View>
//       </View>
//     </MainLayout>
//   );
// };

// export default PhaseModalBoq;

import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import MainLayout from '../../../../components/MainLayout';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PhaseModalBoq = () => {
  const [phaseName, setPhaseName] = useState('');
  const [phases, setPhases] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editingPhaseId, setEditingPhaseId] = useState(null);
  const [editPhaseName, setEditPhaseName] = useState('');

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
            'X-Menu-Id': 'DRlBbUjgXSb',
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
      console.log('Transformed phases:', phaseList);
      setPhases(phaseList);
    } catch (err) {
      console.error('Error fetching Phase data:', err);
      Alert.alert('Error', 'Failed to fetch phase data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhaseData();
  }, []);


  const deletePhase = async (id) => {
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      Alert.alert('Error', 'No user data found. Please log in again.');
      return;
    }
    const parsedData = JSON.parse(userData);

    Alert.alert('Delete Phase', 'Are you sure you want to delete this phase?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const response = await fetch(
              `https://api-v2-skystruct.prudenttec.com/phase/delet-phase`,
              {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${parsedData.jwtToken}`,
                  'X-Menu-Id': 'DRlBbUjgXSb',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({id : id, module: 'BOQ' }),
              }
            );

            console.log(JSON.stringify({id : id, module: 'BOQ' }));
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }

            Alert.alert('Success', 'Phase deleted successfully');
            await fetchPhaseData();
          } catch (error) {
            console.error('Error deleting phase:', error);
            Alert.alert('Error', `Failed to delete phase: ${error.message}`);
          }
        },
      },
    ]);
  };

  const startEditing = (phase) => {
    setEditingPhaseId(phase.id);
    setEditPhaseName(phase.phaseName);
  };

  const cancelEditing = () => {
    setEditingPhaseId(null);
    setEditPhaseName('');
  };

  const updatePhase = async (id) => {
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      Alert.alert('Error', 'No user data found. Please log in again.');
      return;
    }
    const parsedData = JSON.parse(userData);

    if (!editPhaseName.trim()) {
      Alert.alert('Error', 'Please enter a phase name');
      return;
    }

    const updatePhaseData = {
      phaseFormBean: {
        module: 'BOQ',
        phaseName: editPhaseName.trim(),
        autoId: id,
      },
    };

    try {
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/phase', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': 'DRlBbUjgXSb',
        },
        body: JSON.stringify(updatePhaseData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      if (result.status && result.message === 'Phase Updated Successfully') {
        setPhases(
          phases.map((phase) =>
            phase.id === id ? { ...phase, phaseName: editPhaseName.trim() } : phase
          )
        );
        cancelEditing();
        Alert.alert('Success', 'Phase updated successfully');
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (error) {
      console.error('Error updating phase:', error);
      Alert.alert('Error', `Failed to update phase: ${error.message}`);
    }
  };

  const addNewPhase = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      Alert.alert('Error', 'No user data found. Please log in again.');
      return;
    }
    const parsedData = JSON.parse(userData);

    if (!phaseName.trim()) {
      Alert.alert('Error', 'Please enter a phase name');
      return;
    }

    const newPhaseData = {
      phaseFormBean: {
        module: 'BOQ',
        phaseName: phaseName.trim(),
      },
    };

    try {
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/phase', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': 'DRlBbUjgXSb',
        },
        body: JSON.stringify(newPhaseData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      if (result.status && result.message === 'Phase Added Successfully') {
        setPhaseName('');
        Alert.alert('Success', 'Phase added successfully');
        await fetchPhaseData();
      } else {
        throw new Error('Unexpected API response format');
      }
    } catch (error) {
      console.error('Error adding new phase:', error);
      Alert.alert('Error', `Failed to add new phase: ${error.message}`);
    }
  };

  return (
    <MainLayout title="Add Phase">
      <View className="flex-1 bg-slate-50">
        <View className="flex-1 p-5">
          <View className="mb-8">
            <Text className="mb-2 text-base font-medium text-gray-600">Phase Name</Text>
            <View className="flex-row items-center">
              <TextInput
                className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-3 text-base text-gray-800"
                value={phaseName}
                onChangeText={setPhaseName}
                placeholder="Enter phase name"
                placeholderTextColor="#999"
              />
              <TouchableOpacity
                className="ml-3 flex-row items-center justify-center rounded-lg bg-green-500 px-5 py-3"
                onPress={addNewPhase}>
                <Ionicons name="add" size={20} color="white" />
                <Text className="ml-1.5 text-base font-semibold text-white">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex-1">
            <Text className="mb-5 text-center text-lg font-semibold text-gray-800">Phase List</Text>
            <ScrollView className="rounded-lg bg-white shadow-sm shadow-gray-200">
              {isLoading ? (
                <Text className="p-5 text-center text-gray-600">Loading...</Text>
              ) : phases.length === 0 ? (
                <Text className="p-5 text-center text-gray-600">No phases available</Text>
              ) : (
                phases.map((phase, index) => (
                  <View
                    key={phase.id}
                    className={`flex-row items-center px-5 py-4 ${
                      index !== phases.length - 1 ? 'border-b border-gray-100' : ''
                    }`}>
                    {editingPhaseId === phase.id ? (
                      <>
                        <TextInput
                          className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-base text-gray-800"
                          value={editPhaseName}
                          onChangeText={setEditPhaseName}
                          placeholder="Enter phase name"
                          placeholderTextColor="#999"
                        />
                        <View className="flex-row items-center">
                          <TouchableOpacity
                            className="mx-2 p-2"
                            onPress={() => updatePhase(phase.id)}>
                            <Ionicons name="checkmark-outline" size={18} color="#4CAF50" />
                          </TouchableOpacity>
                          <TouchableOpacity className="p-2" onPress={cancelEditing}>
                            <Ionicons name="close-outline" size={18} color="#F44336" />
                          </TouchableOpacity>
                        </View>
                      </>
                    ) : (
                      <>
                        <Text className="flex-1 text-base font-medium text-gray-800">
                          {phase.phaseName}
                        </Text>
                        <TouchableOpacity
                          className={`mr-3 min-w-[70px] items-center rounded-full px-4 py-1.5 ${
                            phase.active ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                          >
                          <Text
                            className={`text-xs font-semibold ${
                              phase.active ? 'text-white' : 'text-gray-600'
                            }`}>
                            {phase.active ? 'Active' : 'Inactive'}
                          </Text>
                        </TouchableOpacity>
                        <View className="flex-row items-center">
                          <TouchableOpacity
                            className="mr-2 p-2"
                            onPress={() => startEditing(phase)}>
                            <Ionicons name="pencil-outline" size={18} color="#FF9800" />
                          </TouchableOpacity>
                          <TouchableOpacity className="p-2" onPress={() => deletePhase(phase.id)}>
                            <Ionicons name="trash-outline" size={18} color="#F44336" />
                          </TouchableOpacity>
                        </View>
                      </>
                    )}
                  </View>
                ))
              )}
            </ScrollView>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default PhaseModalBoq;
