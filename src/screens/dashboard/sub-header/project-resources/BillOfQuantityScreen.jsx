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
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StatusBar,
  ScrollView,
  TextInput,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation, useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import MainLayout from '../../../components/MainLayout';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isSmallScreen = screenWidth < 375;
const isMediumScreen = screenWidth >= 375 && screenWidth < 768;
const isLargeScreen = screenWidth >= 768;

// Enhanced BOQ Item Component with Dropdown
const BoqItem = ({ item, navigation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [subItems, setSubItems] = useState([]);
  const [subSearch, setSubSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const status =
    item.aprOrNot === 'A' ? 'approved' : item.aprOrNot === 'R' ? 'rejected' : 'pending';

  let statusConfig;
  if (item.aprOrNot === 'A') {
    statusConfig = { bg: '#d1fae5', text: '#065f46', icon: 'check-circle', label: 'Approved' };
  } else if (item.aprOrNot === 'R') {
    statusConfig = { bg: '#fee2e2', text: '#991b1b', icon: 'x-circle', label: 'Rejected' };
  } else {
    statusConfig = { bg: '#fef3c7', text: '#92400e', icon: 'clock', label: 'Pending' };
  }

  useEffect(() => {
    if (isExpanded) {
      fetchSubItems();
    }
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
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

      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/boq/item/get-item-list',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': '19Ab9n5HF73',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: item.autoId }),
        }
      );

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

  const filteredSubItems = subItems.filter(
    (subItem) =>
      subItem.itemNumber?.toString().includes(subSearch) ||
      subItem.itemName?.toLowerCase().includes(subSearch.toLowerCase())
  );

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  const cardPadding = isSmallScreen ? 14 : 18;

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        marginBottom: isSmallScreen ? 12 : 16,
        borderRadius: isSmallScreen ? 16 : 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#e5e7eb',
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 3,
          },
          android: {
            elevation: 1,
          },
        }),
      }}>
      <TouchableOpacity
        style={{ padding: cardPadding }}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 12,
          }}>
          <View style={{ flex: 1, marginRight: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View
                style={{
                  width: 4,
                  height: isSmallScreen ? 20 : 24,
                  backgroundColor: '#0284c7',
                  borderRadius: 2,
                  marginRight: 10,
                }}
              />
              <Text
                style={{
                  fontSize: isSmallScreen ? 16 : 18,
                  fontWeight: '700',
                  color: '#0c4a6e',
                  letterSpacing: 0.3,
                  flex: 1,
                }}>
                {item.title}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View
              style={{
                paddingHorizontal: 10,
                paddingVertical: 6,
                borderRadius: 12,
                backgroundColor: statusConfig.bg,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Feather
                name={statusConfig.icon}
                size={12}
                color={statusConfig.text}
                style={{ marginRight: 4 }}
              />
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '600',
                  color: statusConfig.text,
                }}>
                {statusConfig.label}
              </Text>
            </View>
            <Animated.View style={{ transform: [{ rotate }] }}>
              <Feather name="chevron-down" size={20} color="#0284c7" />
            </Animated.View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 }}>
          <View
            style={{
              backgroundColor: '#eff6ff',
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#bae6fd',
            }}>
            <Feather name="layers" size={12} color="#0284c7" style={{ marginRight: 4 }} />
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#0284c7' }}>
              {item.phaseId}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: '#f5f3ff',
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 12,
              flexDirection: 'row',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#e9d5ff',
            }}>
            <Feather name="tag" size={12} color="#7c3aed" style={{ marginRight: 4 }} />
            <Text style={{ fontSize: 11, fontWeight: '600', color: '#7c3aed' }}>
              {item.boqType}
            </Text>
          </View>
        </View>

        <View
          style={{
            backgroundColor: '#f8fafc',
            padding: 12,
            borderRadius: 12,
            borderLeftWidth: 3,
            borderLeftColor: '#0284c7',
          }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Total Cost</Text>
              <Text
                style={{ fontSize: isSmallScreen ? 14 : 16, fontWeight: '700', color: '#0c4a6e' }}>
                {item.totalCost || '0'}
              </Text>
            </View>
            <View style={{ width: 1, height: 30, backgroundColor: '#e5e7eb' }} />
            <View>
              <Text style={{ fontSize: 11, color: '#6b7280', marginBottom: 4 }}>Total Payment</Text>
              <Text
                style={{ fontSize: isSmallScreen ? 14 : 16, fontWeight: '700', color: '#10b981' }}>
                {item.totalPayment || '0'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      {isExpanded && (
        <View style={{ borderTopWidth: 1, borderTopColor: '#f0f4f8', backgroundColor: '#fafbfc' }}>
          <View
            style={{
              padding: cardPadding,
              backgroundColor: '#ffffff',
              borderBottomWidth: 1,
              borderBottomColor: '#f0f4f8',
            }}>
            <View style={{ flexDirection: isLargeScreen ? 'row' : 'column', gap: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#eff6ff',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Feather name="list" size={16} color="#0284c7" />
                </View>
                <Text
                  style={{
                    fontSize: isSmallScreen ? 13 : 14,
                    fontWeight: '600',
                    color: '#1f2937',
                  }}>
                  Item List
                </Text>
              </View>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: '#f8fafc',
                  borderRadius: 12,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderWidth: 1,
                  borderColor: '#e5e7eb',
                }}>
                <Feather name="search" size={16} color="#6b7280" style={{ marginRight: 8 }} />
                <TextInput
                  placeholder="Search items..."
                  placeholderTextColor="#9ca3af"
                  value={subSearch}
                  onChangeText={setSubSearch}
                  style={{
                    flex: 1,
                    fontSize: isSmallScreen ? 12 : 13,
                    color: '#1f2937',
                  }}
                />
                {subSearch.length > 0 && (
                  <TouchableOpacity onPress={() => setSubSearch('')}>
                    <Feather name="x" size={16} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
              {[
                {
                  icon: 'plus',
                  color: '#0284c7',
                  label: 'Add',
                  action: () => navigation.navigate('AddBoqItem', { boqId: item.autoId }),
                },
                ...(status === 'pending' || status === 'rejected'
                  ? [
                      {
                        icon: 'edit-2',
                        color: '#0284c7',
                        label: 'Edit',
                        action: () => console.log('Edit items'),
                      },
                    ]
                  : []),
                {
                  icon: 'user-check',
                  color: '#0284c7',
                  label: 'Audit',
                  // action: () => console.log('Audit'),
                  action: () => navigation.navigate('AuditTrail', { boqId: item.autoId }),
                },
                {
                  icon: 'users',
                  color: '#0284c7',
                  label: 'Workflow',
                  action: () => console.log('Workflow'),
                },
                ...(status === 'rejected'
                  ? [
                      {
                        icon: 'trash-2',
                        color: '#ef4444',
                        label: 'Delete',
                        action: () => console.log('Delete'),
                      },
                    ]
                  : []),
                {
                  icon: 'mail',
                  color: '#0284c7',
                  label: 'Email',
                  action: () => navigation.navigate('EmailBoq', { boqId: item.autoId }),
                },
                {
                  icon: 'download',
                  color: '#0284c7',
                  label: 'Export',
                  action: () => console.log('Download'),
                },
              ].map((btn, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: isSmallScreen ? 10 : 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    backgroundColor: '#f8fafc',
                    borderWidth: 1.5,
                    borderColor: btn.color + '30',
                  }}
                  onPress={btn.action}
                  activeOpacity={0.7}>
                  <Feather name={btn.icon} size={14} color={btn.color} style={{ marginRight: 6 }} />
                  <Text style={{ fontSize: 11, fontWeight: '600', color: btn.color }}>
                    {btn.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {loading && (
            <View style={{ padding: 24, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#0284c7" />
              <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 8 }}>Loading items...</Text>
            </View>
          )}

          {error && !loading && (
            <View style={{ padding: 24, alignItems: 'center' }}>
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: '#fee2e2',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 12,
                }}>
                <Feather name="alert-circle" size={24} color="#ef4444" />
              </View>
              <Text style={{ fontSize: 13, color: '#ef4444', marginBottom: 12 }}>{error}</Text>
              <TouchableOpacity
                onPress={fetchSubItems}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  backgroundColor: '#0284c7',
                  borderRadius: 12,
                }}
                activeOpacity={0.8}>
                <Text style={{ fontSize: 13, fontWeight: '600', color: '#ffffff' }}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          {!loading &&
            !error &&
            filteredSubItems.length > 0 &&
            filteredSubItems.map((subItem, index) => (
              <View
                key={subItem.autoId}
                style={{
                  padding: cardPadding,
                  borderBottomWidth: index < filteredSubItems.length - 1 ? 1 : 0,
                  borderBottomColor: '#f3f4f6',
                  backgroundColor: '#ffffff',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                  }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        backgroundColor: '#eff6ff',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 8,
                      }}>
                      <Text style={{ fontSize: 11, fontWeight: '700', color: '#0284c7' }}>
                        {subItem.itemNumber}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontSize: isSmallScreen ? 13 : 14,
                        fontWeight: '600',
                        color: '#1f2937',
                      }}>
                      Item No: {subItem.itemNumber}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#fef3c7',
                      paddingHorizontal: 10,
                      paddingVertical: 4,
                      borderRadius: 8,
                    }}>
                    <Text style={{ fontSize: 11, fontWeight: '600', color: '#92400e' }}>
                      ₹{subItem.unitCost}/unit
                    </Text>
                  </View>
                </View>

                <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 10, lineHeight: 18 }}>
                  {subItem.itemName}
                </Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather name="package" size={12} color="#6b7280" style={{ marginRight: 4 }} />
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Qty: </Text>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: '#1f2937' }}>
                      {subItem.quantity}
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Feather
                      name="dollar-sign"
                      size={12}
                      color="#10b981"
                      style={{ marginRight: 4 }}
                    />
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Total: </Text>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#10b981' }}>
                      ₹{subItem.totalCost}
                    </Text>
                  </View>
                </View>
              </View>
            ))}

          {!loading && !error && filteredSubItems.length === 0 && (
            <View style={{ padding: 32, alignItems: 'center' }}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 32,
                  backgroundColor: '#f0f9ff',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}>
                <Feather name="inbox" size={32} color="#cbd5e1" />
              </View>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#64748b', marginBottom: 4 }}>
                No Items Added
              </Text>
              <Text
                style={{ fontSize: 12, color: '#94a3b8', marginBottom: 16, textAlign: 'center' }}>
                {subSearch ? 'No items match your search' : 'Start by adding your first item'}
              </Text>
              {!subSearch && (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddBoqItem', { boqId: item.autoId })}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    backgroundColor: '#0284c7',
                    borderRadius: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  activeOpacity={0.8}>
                  <Feather name="plus" size={16} color="#ffffff" style={{ marginRight: 6 }} />
                  <Text style={{ fontSize: 13, fontWeight: '600', color: '#ffffff' }}>
                    Add First Item
                  </Text>
                </TouchableOpacity>
              )}
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
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params || { projectId: 1 };
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [boqData, setBoqData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBoqData();
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchBoqData();
    }, [])
  );

  const fetchBoqData = async () => {
    setIsLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      setIsLoading(false);
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
          category: 'GUbvuPLB50r',
        }),
      });
      const data = await response.json();
      setBoqData(data.boqFormBeans || []);
    } catch (error) {
      console.error('Error fetching BOQ data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = boqData
    .filter((item) => {
      if (activeTab === 'All') return true;
      return item.phaseId === activeTab;
    })
    .filter((item) => item.title?.toLowerCase().includes(searchText.toLowerCase()));

  const tabs = ['All', 'General', 'Structural', 'Other', 'External'];

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#f8fafc',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            padding: 32,
            borderRadius: 24,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#e5e7eb',
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.06,
                shadowRadius: 4,
              },
              android: {
                elevation: 2,
              },
            }),
          }}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#eff6ff',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}>
            <ActivityIndicator size="large" color="#0284c7" />
          </View>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#0c4a6e' }}>
            Loading BOQ Data
          </Text>
          <Text style={{ fontSize: 13, color: '#6b7280', marginTop: 4 }}>Please wait...</Text>
        </View>
      </View>
    );
  }

  return (
    <MainLayout title={'Bill of Quantity'} navigation={navigation}>
        <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
          <StatusBar style="auto" />
          <View style={{ flex: 1 }}>
            <LinearGradient
              colors={['#e0f2fe', '#f0f9ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                paddingHorizontal: isSmallScreen ? 16 : 24,
                paddingVertical: isSmallScreen ? 16 : 20,
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#0284c7', fontWeight: '500' }}>
                    {filteredData.length} BOQ items
                  </Text>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ gap: 8 }}>
                {tabs.map((tab, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setActiveTab(tab)}
                    style={{
                      paddingHorizontal: isSmallScreen ? 16 : 20,
                      paddingVertical: 10,
                      borderRadius: 16,
                      backgroundColor: activeTab === tab ? '#0284c7' : 'rgba(255, 255, 255, 0.9)',
                      borderWidth: 1,
                      borderColor: activeTab === tab ? '#0284c7' : '#bae6fd',
                    }}
                    activeOpacity={0.7}>
                    <Text
                      style={{
                        fontWeight: '600',
                        fontSize: isSmallScreen ? 12 : 13,
                        color: activeTab === tab ? '#ffffff' : '#0284c7',
                      }}>
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </LinearGradient>

            <Animated.View
              style={{
                paddingHorizontal: isSmallScreen ? 16 : 24,
                paddingVertical: 16,
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#ffffff',
                    borderRadius: 16,
                    paddingHorizontal: 16,
                    height: 48,
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                  }}>
                  <Feather name="search" size={20} color="#6b7280" style={{ marginRight: 12 }} />
                  <TextInput
                    placeholder="Search BOQ items..."
                    placeholderTextColor="#9ca3af"
                    value={searchText}
                    onChangeText={setSearchText}
                    style={{
                      flex: 1,
                      fontSize: isSmallScreen ? 13 : 14,
                      fontWeight: '500',
                      color: '#1f2937',
                    }}
                  />
                  {searchText.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchText('')}>
                      <Feather name="x-circle" size={18} color="#6b7280" />
                    </TouchableOpacity>
                  )}
                </View>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#0284c7',
                    height: 48,
                    width: 48,
                    borderRadius: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  activeOpacity={0.8}>
                  <Feather name="filter" size={20} color="#ffffff" />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#0284c7',
                    height: 48,
                    width: 48,
                    borderRadius: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => navigation.navigate('AddBoq')}
                  activeOpacity={0.8}>
                  <Feather name="plus" size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>
            </Animated.View>

            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={{
                paddingHorizontal: isSmallScreen ? 16 : 24,
                paddingBottom: 100,
              }}
              showsVerticalScrollIndicator={false}>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <BoqItem key={item.autoId} item={item} navigation={navigation} />
                ))
              ) : (
                <View style={{ padding: 40, alignItems: 'center', marginTop: 40 }}>
                  <View
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 40,
                      backgroundColor: '#f0f9ff',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 16,
                    }}>
                    <Feather name="inbox" size={40} color="#cbd5e1" />
                  </View>
                  <Text
                    style={{ fontSize: 16, fontWeight: '700', color: '#64748b', marginBottom: 4 }}>
                    No BOQ Items Found
                  </Text>
                  <Text style={{ fontSize: 13, color: '#94a3b8', textAlign: 'center' }}>
                    {searchText ? 'Try adjusting your search' : 'Create your first BOQ item'}
                  </Text>
                </View>
              )}
            </ScrollView>

            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 24,
                right: 24,
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: '#0284c7',
                justifyContent: 'center',
                alignItems: 'center',
                ...Platform.select({
                  ios: {
                    shadowColor: '#0284c7',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.2,
                    shadowRadius: 4,
                  },
                  android: {
                    elevation: 3,
                  },
                }),
              }}
              onPress={() => navigation.navigate('AddPhaseBoq')}
              activeOpacity={0.8}>
              <Feather name="plus" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>
    </MainLayout>
  );
}
