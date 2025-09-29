// import React, { useState, useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Animated, StatusBar, ScrollView, TextInput } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';

// // BOQ Item Component with Dropdown
// const BoqItem = ({ item, navigation }) => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [subItems, setSubItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Fetch sub-items when the dropdown is expanded
//   useEffect(() => {
//     if (isExpanded) {
//       fetchSubItems();
//     }
//   }, [isExpanded]);

//   const fetchSubItems = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const userData = await AsyncStorage.getItem('userData');
//       if (!userData) {
//         console.log('❌ No user data found in storage');
//         setError('User data not found');
//         setLoading(false);
//         return;
//       }
//       const parsedData = JSON.parse(userData);

//       console.log(item.autoId);
      
      
//       const response = await fetch('https://api-v2-skystruct.prudenttec.com/boq/item/get-item-list', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${parsedData.jwtToken}`,
//           'X-Menu-Id': '19Ab9n5HF73',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({id: item.autoId})
//       });

//       const data = await response.json();
//       console.log('Sub-items data:', data.boqItemFormBeans);

//       setSubItems(data.boqItemFormBeans || []);
//     } catch (err) {
//       console.error('Error fetching sub-items:', err);
//       setError('Failed to load sub-items');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   return (
//     <View className="bg-white mb-3 rounded-lg border border-gray-200 overflow-hidden">
//       <TouchableOpacity 
//         className="p-4"
//         onPress={() => setIsExpanded(!isExpanded)}
//       >
//         <View className="flex-row justify-between items-start mb-2">
//           <View className="flex-1">
//             <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
//           </View>
//           <View className="flex-row items-center">
//             <View className={`px-2 py-1 rounded-full mr-2 ${item.aprOrNot === 'A' ? 'bg-green-100' : 'bg-yellow-100'}`}>
//               <Text className={`text-xs font-medium ${item.aprOrNot === 'A' ? 'text-green-800' : 'text-yellow-800'}`}>
//                 {item.aprOrNot === 'A' ? 'Approved' : 'Pending'}
//               </Text>
//             </View>
//             <Feather 
//               name={isExpanded ? 'chevron-up' : 'chevron-down'} 
//               size={20} 
//               color="#6b7280" 
//             />
//           </View>
//         </View>
        
//         <View className="flex-row mb-2">
//           <View className="bg-blue-100 px-2 py-1 rounded-full mr-2">
//             <Text className="text-xs text-blue-800">{item.phaseId}</Text>
//           </View>
//           <View className="bg-purple-100 px-2 py-1 rounded-full">
//             <Text className="text-xs text-purple-800">{item.boqType}</Text>
//           </View>
//         </View>
        
//         <View className="flex-row justify-between">
//           <Text className="text-gray-600">Total/Paid:</Text>
//           <Text className="font-medium text-gray-800">{item.totalCost}/{item.totalPayment}</Text>
//         </View>
//       </TouchableOpacity>

//       {isExpanded && (
//         <View className="border-t border-gray-200 bg-gray-50">
//           <View className="flex-row items-center justify-between p-3 border-b border-gray-200 bg-white">
//             <Text className="text-sm font-medium text-gray-700">Item List</Text>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('AddBoqItem', { boqId: item.autoId })}
//               className="w-8 h-8 rounded-full bg-blue-500 justify-center items-center"
//             >
//               <Feather name="plus" size={16} color="#ffffff" />
//             </TouchableOpacity>
//           </View>

//           {loading && (
//             <View className="p-4 items-center">
//               <Text className="text-gray-500 text-sm">Loading sub-items...</Text>
//             </View>
//           )}

//           {error && !loading && (
//             <View className="p-4 items-center">
//               <Text className="text-red-500 text-sm">{error}</Text>
//               <TouchableOpacity
//                 onPress={fetchSubItems}
//                 className="mt-2 px-4 py-2 bg-blue-500 rounded-lg"
//               >
//                 <Text className="text-white text-sm font-medium">Retry</Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           {!loading && !error && subItems.length > 0 && subItems.map((subItem) => (
//             <View key={subItem.autoId} className="p-3 border-b border-gray-100 bg-white">
//               <View className="flex-row justify-between items-center mb-2">
//                 <Text className="font-medium text-gray-800">Item No: {subItem.itemNumber}</Text>
//                 <Text className="text-sm text-gray-600">Unit Cost: {subItem.unitCost}</Text>
//               </View>
//               <View className="flex-row justify-between">
//                 <Text className="text-sm text-gray-600">Quantity: {subItem.quantity}</Text>
//                 <Text className="text-sm font-medium text-gray-800">Total: {subItem.totalCost}</Text>
//               </View>
//               <View className="flex-row justify-between">
//                 <Text className="text-sm text-gray-600">Description: {subItem.itemName}</Text>
//               </View>
//             </View>
//           ))}

//           {!loading && !error && subItems.length === 0 && (
//             <View className="p-4 items-center">
//               <Text className="text-gray-500 text-sm">No items added yet</Text>
//               <TouchableOpacity
//                 onPress={() => navigation.navigate('AddBoqItem', { boqId: item.autoId })}
//                 className="mt-2 px-4 py-2 bg-blue-500 rounded-lg"
//               >
//                 <Text className="text-white text-sm font-medium">Add First Item</Text>
//               </TouchableOpacity>
//             </View>
//           )}
//         </View>
//       )}
//     </View>
//   );
// };

// // Main BillOfQuantity Component
// export default function BillOfQuantity() {
//   const scaleAnim = useRef(new Animated.Value(0.95)).current;
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { projectId } = route.params || { projectId: 1 };
//   const [searchText, setSearchText] = useState('');
//   const [activeTab, setActiveTab] = useState('All');
//   const [boqData, setBoqData] = useState([]);

//   useEffect(() => {
//     fetchBoqData();
//     Animated.timing(scaleAnim, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   useFocusEffect(
//     React.useCallback(() => {
//       fetchBoqData();
//     }, [])
//   );

//   const fetchBoqData = async () => {
//     const userData = await AsyncStorage.getItem('userData');
//     if (!userData) {
//       console.log('❌ No user data found in storage');
//       return;
//     }
//     const parsedData = JSON.parse(userData);
//     try {
//       const response = await fetch('https://api-v2-skystruct.prudenttec.com/boq/boq-list', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${parsedData.jwtToken}`,
//           'X-Menu-Id': '19Ab9n5HF73',
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           category: "GUbvuPLB50r"
//         }),
//       });
//       const data = await response.json();
//       setBoqData(data.boqFormBeans || []); // Ensure boqFormBeans is an array
//     } catch (error) {
//       console.error('Error fetching BOQ data:', error);
//     }
//   };

//   // Filter data based on active tab and search
//   const filteredData = boqData
//     .filter(item => {
//       if (activeTab === 'All') return true;
//       return item.phaseId === activeTab;
//     })
//     .filter(item => item.title?.toLowerCase().includes(searchText.toLowerCase()));

//   const tabs = ['All', 'General', 'Structural', 'Other', 'External'];

//   return (
//     <View className="flex-1 bg-gray-50">
//       <StatusBar style="auto" />
//       <View className="flex-1">
//         <Text className="text-2xl font-bold text-center py-4">Bill of Quantity</Text>
        
//         {/* Filter Tabs with Blue Gradient */}
//         <LinearGradient
//           colors={['#f0f7ff', '#e6f0ff']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 0, y: 1 }}
//           className="py-4"
//         >
//           <ScrollView 
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             className="px-6"
//             contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 8, gap: 12 }}
//           >
//             {tabs.map(tab => (
//               <TouchableOpacity 
//                 key={tab}
//                 onPress={() => setActiveTab(tab)}
//                 style={{
//                   paddingHorizontal: 20,
//                   paddingVertical: 8,
//                   borderRadius: 9999,
//                   backgroundColor: activeTab === tab ? '#3b82f6' : '#ffffff',
//                 }}
//               >
//                 <Text 
//                   style={{
//                     fontWeight: '600',
//                     fontSize: 14,
//                     color: activeTab === tab ? '#ffffff' : '#2563eb',
//                   }}
//                 >
//                   {tab}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </LinearGradient>
        
//         {/* Search Bar */}
//         <Animated.View 
//           className="px-6 py-6"
//           style={{
//             opacity: scaleAnim,
//             transform: [{ scale: scaleAnim }]
//           }}
//         >
//           <View className="flex-row items-center">
//             <View 
//               className="mr-4 flex-1 flex-row items-center rounded-2xl bg-white px-5"
//               style={{ height: 44 }}
//             >
//               <Feather name="search" size={20} color="#6b7280" style={{ marginRight: 12 }} />
//               <TextInput
//                 className="flex-1 text-base font-medium"
//                 placeholder="Search BOQ items..."
//                 placeholderTextColor="#9ca3af"
//                 value={searchText}
//                 onChangeText={setSearchText}
//                 style={{ height: '100%' }}
//               />
//               {searchText.length > 0 && (
//                 <TouchableOpacity onPress={() => setSearchText('')}>
//                   <Feather name="x" size={18} color="#6b7280" />
//                 </TouchableOpacity>
//               )}
//             </View>
            
//             <View className="flex-row space-x-2">
//               <TouchableOpacity
//                 className="rounded-2xl"
//                 style={{
//                   backgroundColor: '#3b82f6',
//                   height: 44,
//                   width: 44,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Feather name="filter" size={20} color="#ffffff" />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 className="rounded-2xl"
//                 style={{
//                   backgroundColor: '#3b82f6',
//                   height: 44,
//                   width: 44,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//                 onPress={() => navigation.navigate('AddBoq')}
//               >
//                 <Feather name="plus" size={20} color="#ffffff" />
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Animated.View>
        
//         {/* BOQ List */}
//         <ScrollView className="flex-1 px-6 bg-gray-50">
//           {filteredData.map(item => (
//             <BoqItem
//               key={item.autoId}
//               item={item}
//               navigation={navigation}
//             />
//           ))}
//         </ScrollView>
        
//         {/* Add Phase Button */}
//         <TouchableOpacity 
//           className="absolute bottom-6 right-6 w-14 h-14 rounded-full justify-center items-center"
//           style={{ backgroundColor: '#3b82f6' }}
//           onPress={() => navigation.navigate('AddPhaseBoq')}
//         >
//           <Text className="text-white text-2xl">+</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, StatusBar, ScrollView, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// BOQ Item Component with Dropdown
const BoqItem = ({ item, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subItems, setSubItems] = useState([]);
  const [subSearch, setSubSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const status = item.aprOrNot === 'A' ? 'approved' : item.aprOrNot === 'R' ? 'rejected' : 'pending';

  let badgeBg, badgeText, badgeLabel;
  if (item.aprOrNot === 'A') {
    badgeBg = 'bg-green-100';
    badgeText = 'text-green-800';
    badgeLabel = 'Approved';
  } else if (item.aprOrNot === 'R') {
    badgeBg = 'bg-red-100';
    badgeText = 'text-red-800';
    badgeLabel = 'Rejected';
  } else {
    badgeBg = 'bg-yellow-100';
    badgeText = 'text-yellow-800';
    badgeLabel = 'Pending';
  }

  // Fetch sub-items when the dropdown is expanded
  useEffect(() => {
    if (isExpanded) {
      fetchSubItems();
    }
  }, [isExpanded]);

  const fetchSubItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        console.log('❌ No user data found in storage');
        setError('User data not found');
        setLoading(false);
        return;
      }
      const parsedData = JSON.parse(userData);

      console.log(item.autoId);
      
      
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/boq/item/get-item-list', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': '19Ab9n5HF73',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id: item.autoId})
      });

      const data = await response.json();
      console.log('Sub-items data:', data.boqItemFormBeans);

      setSubItems(data.boqItemFormBeans || []);
    } catch (err) {
      console.error('Error fetching sub-items:', err);
      setError('Failed to load sub-items');
    } finally {
      setLoading(false);
    }
  };

  const filteredSubItems = subItems.filter(subItem =>
    subItem.itemNumber?.toString().includes(subSearch) ||
    subItem.itemName?.toLowerCase().includes(subSearch.toLowerCase())
  );
  
  return (
    <View className="bg-white mb-3 rounded-lg border border-gray-200 overflow-hidden">
      <TouchableOpacity 
        className="p-4"
        onPress={() => setIsExpanded(!isExpanded)}
      >
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-lg font-semibold text-gray-800">{item.title}</Text>
          </View>
          <View className="flex-row items-center">
            <View className={`px-2 py-1 rounded-full mr-2 ${badgeBg}`}>
              <Text className={`text-xs font-medium ${badgeText}`}>
                {badgeLabel}
              </Text>
            </View>
            <Feather 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={20} 
              color="#6b7280" 
            />
          </View>
        </View>
        
        <View className="flex-row mb-2">
          <View className="bg-blue-100 px-2 py-1 rounded-full mr-2">
            <Text className="text-xs text-blue-800">{item.phaseId}</Text>
          </View>
          <View className="bg-purple-100 px-2 py-1 rounded-full">
            <Text className="text-xs text-purple-800">{item.boqType}</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between">
          <Text className="text-gray-600">Total/Paid:</Text>
          <Text className="font-medium text-gray-800">{item.totalCost}/{item.totalPayment}</Text>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View className="border-t border-gray-200 bg-gray-50">
          <View className="flex-row items-center p-3 border-b border-gray-200 bg-white">
            <Text className="text-sm font-medium text-gray-700 mr-4">Item List</Text>
            <View className="flex-1 bg-gray-100 rounded-md px-3 py-2 flex-row items-center">
              <TextInput
                placeholder="Search..."
                value={subSearch}
                onChangeText={setSubSearch}
                className="flex-1 text-sm"
              />
              <Feather name="search" size={16} color="#6b7280" />
            </View>
            <View className="flex-row ml-4 space-x-3">
              <TouchableOpacity onPress={() => navigation.navigate('AddBoqItem', { boqId: item.autoId })}>
                <Feather name="plus" size={20} color="#3b82f6" />
              </TouchableOpacity>
              {(status === 'pending' || status === 'rejected') && (
                <TouchableOpacity onPress={() => console.log('Edit items pressed')}>
                  <Feather name="edit" size={20} color="#3b82f6" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => console.log('Audit pressed')}>
                <Feather name="user" size={20} color="#3b82f6" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Workflow pressed')}>
                <Feather name="users" size={20} color="#3b82f6" />
              </TouchableOpacity>
              {status === 'rejected' && (
                <TouchableOpacity onPress={() => console.log('Trash pressed')}>
                  <Feather name="trash-2" size={20} color="#ef4444" />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={() => console.log('Email pressed')}>
                <Feather name="mail" size={20} color="#3b82f6" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Download pressed')}>
                <Feather name="download" size={20} color="#3b82f6" />
              </TouchableOpacity>
            </View>
          </View>

          {loading && (
            <View className="p-4 items-center">
              <Text className="text-gray-500 text-sm">Loading sub-items...</Text>
            </View>
          )}

          {error && !loading && (
            <View className="p-4 items-center">
              <Text className="text-red-500 text-sm">{error}</Text>
              <TouchableOpacity
                onPress={fetchSubItems}
                className="mt-2 px-4 py-2 bg-blue-500 rounded-lg"
              >
                <Text className="text-white text-sm font-medium">Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {!loading && !error && filteredSubItems.length > 0 && filteredSubItems.map((subItem) => (
            <View key={subItem.autoId} className="p-3 border-b border-gray-100 bg-white">
              <View className="flex-row justify-between items-center mb-2">
                <Text className="font-medium text-gray-800">Item No: {subItem.itemNumber}</Text>
                <Text className="text-sm text-gray-600">Unit Cost: {subItem.unitCost}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-600">Quantity: {subItem.quantity}</Text>
                <Text className="text-sm font-medium text-gray-800">Total: {subItem.totalCost}</Text>
              </View>
              <View className="flex-row justify-between">
                <Text className="text-sm text-gray-600">Description: {subItem.itemName}</Text>
              </View>
            </View>
          ))}

          {!loading && !error && filteredSubItems.length === 0 && (
            <View className="p-4 items-center">
              <Text className="text-gray-500 text-sm">No items added yet</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddBoqItem', { boqId: item.autoId })}
                className="mt-2 px-4 py-2 bg-blue-500 rounded-lg"
              >
                <Text className="text-white text-sm font-medium">Add First Item</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

// Main BillOfQuantity Component
export default function BillOfQuantity() {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params || { projectId: 1 };
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [boqData, setBoqData] = useState([]);

  useEffect(() => {
    fetchBoqData();
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchBoqData();
    }, [])
  );

  const fetchBoqData = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      return;
    }
    const parsedData = JSON.parse(userData);
    try {
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/boq/boq-list', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': '19Ab9n5HF73',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category: "GUbvuPLB50r"
        }),
      });
      const data = await response.json();
      setBoqData(data.boqFormBeans || []); // Ensure boqFormBeans is an array
    } catch (error) {
      console.error('Error fetching BOQ data:', error);
    }
  };

  // Filter data based on active tab and search
  const filteredData = boqData
    .filter(item => {
      if (activeTab === 'All') return true;
      return item.phaseId === activeTab;
    })
    .filter(item => item.title?.toLowerCase().includes(searchText.toLowerCase()));

  const tabs = ['All', 'General', 'Structural', 'Other', 'External'];

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      <View className="flex-1">
        <Text className="text-2xl font-bold text-center py-4">Bill of Quantity</Text>
        
        {/* Filter Tabs with Blue Gradient */}
        <LinearGradient
          colors={['#f0f7ff', '#e6f0ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          className="py-4"
        >
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            className="px-6"
            contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 8, gap: 12 }}
          >
            {tabs.map(tab => (
              <TouchableOpacity 
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                  borderRadius: 9999,
                  backgroundColor: activeTab === tab ? '#3b82f6' : '#ffffff',
                }}
              >
                <Text 
                  style={{
                    fontWeight: '600',
                    fontSize: 14,
                    color: activeTab === tab ? '#ffffff' : '#2563eb',
                  }}
                >
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </LinearGradient>
        
        {/* Search Bar */}
        <Animated.View 
          className="px-6 py-6"
          style={{
            opacity: scaleAnim,
            transform: [{ scale: scaleAnim }]
          }}
        >
          <View className="flex-row items-center">
            <View 
              className="mr-4 flex-1 flex-row items-center rounded-2xl bg-white px-5"
              style={{ height: 44 }}
            >
              <Feather name="search" size={20} color="#6b7280" style={{ marginRight: 12 }} />
              <TextInput
                className="flex-1 text-base font-medium"
                placeholder="Search BOQ items..."
                placeholderTextColor="#9ca3af"
                value={searchText}
                onChangeText={setSearchText}
                style={{ height: '100%' }}
              />
              {searchText.length > 0 && (
                <TouchableOpacity onPress={() => setSearchText('')}>
                  <Feather name="x" size={18} color="#6b7280" />
                </TouchableOpacity>
              )}
            </View>
            
            <View className="flex-row space-x-2">
              <TouchableOpacity
                className="rounded-2xl"
                style={{
                  backgroundColor: '#3b82f6',
                  height: 44,
                  width: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Feather name="filter" size={20} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity
                className="rounded-2xl"
                style={{
                  backgroundColor: '#3b82f6',
                  height: 44,
                  width: 44,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => navigation.navigate('AddBoq')}
              >
                <Feather name="plus" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
        
        {/* BOQ List */}
        <ScrollView className="flex-1 px-6 bg-gray-50">
          {filteredData.map(item => (
            <BoqItem
              key={item.autoId}
              item={item}
              navigation={navigation}
            />
          ))}
        </ScrollView>
        
        {/* Add Phase Button */}
        <TouchableOpacity 
          className="absolute bottom-6 right-6 w-14 h-14 rounded-full justify-center items-center"
          style={{ backgroundColor: '#3b82f6' }}
          onPress={() => navigation.navigate('AddPhaseBoq')}
        >
          <Text className="text-white text-2xl">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}