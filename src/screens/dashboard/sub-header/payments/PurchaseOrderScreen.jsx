// import React, { useState, useCallback, useMemo } from 'react';
// import { 
//   View, 
//   Text, 
//   ScrollView, 
//   TouchableOpacity, 
//   Dimensions, 
//   ActivityIndicator,
//   TextInput,
//   Modal
// } from 'react-native';
// import MainLayout from '../../../components/MainLayout';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { LinearGradient } from 'expo-linear-gradient';
// import Animated, { 
//   FadeInDown, 
//   FadeOut, 
//   FadeInUp,
//   SlideInRight
// } from 'react-native-reanimated';

// const screenWidth = Dimensions.get('window').width;
// const cardWidth = Math.min(screenWidth - 32, 600);

// // Sample purchase order data
// const purchaseOrderData = [
//   {
//     id: 'GH101-PO-00019',
//     vendorName: 'XYZ Suppliers',
//     vendorAddress: '45 Supply Road, Bengaluru, KA',
//     poAmount: '200.00 K',
//     mobileNo: '8545659523',
//     grnAmount: '90.00 K',
//     paidAmount: '238.30 K',
//     status: 'Approved',
//     paymentStatus: 'Fully Paid',
//     progress: 45,
//     items: 1,
//     materialReceived: true,
//     date: '2025-09-08'
//   },
//   {
//     id: 'GH101-PO-00018',
//     vendorName: 'ABC Constructions',
//     vendorAddress: '123 Builder Lane, Mumbai, MH',
//     poAmount: '25.20 K',
//     mobileNo: '98563264325',
//     grnAmount: '25.20 K',
//     paidAmount: '25.06 K',
//     status: 'Pending',
//     paymentStatus: 'Partially Paid',
//     progress: 70.99,
//     items: 1,
//     materialReceived: true,
//     date: '2025-09-07'
//   },
//   {
//     id: 'GH101-PO-00017',
//     vendorName: 'Global Materials Ltd',
//     vendorAddress: '789 Trade Center, Delhi, DL',
//     poAmount: '150.75 K',
//     mobileNo: '9876543210',
//     grnAmount: '75.50 K',
//     paidAmount: '50.25 K',
//     status: 'Open',
//     paymentStatus: 'Partially Paid',
//     progress: 33.33,
//     items: 3,
//     materialReceived: false,
//     date: '2025-09-06'
//   }
// ];

// // Status Indicator Component
// const StatusIndicator = ({ status, paymentStatus, progress }) => {
//   const statusConfig = {
//     'Pending': { color: '#f59e0b', bg: '#fef3c7', icon: 'clock-outline' },
//     'Approved': { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
//     'Rejected': { color: '#ef4444', bg: '#fee2e2', icon: 'close-circle' },
//     'Open': { color: '#3b82f6', bg: '#dbeafe', icon: 'lock-open-outline' },
//   };

//   const paymentConfig = {
//     'Fully Paid': { color: '#10b981', icon: 'check-all', bg: '#d1fae5'  },
//     'Partially Paid': { color: '#f59e0b', icon: 'chart-pie' , bg: '#fef3c7',},
//     'Not Paid': { color: '#ef4444', icon: 'cash-remove' ,bg: '#fee2e2'},
//   };

//   const statusCfg = statusConfig[status] || statusConfig['Pending'];
//   const paymentCfg = paymentConfig[paymentStatus] || paymentConfig['Not Paid'];

//   return (
//     <View style={{ alignItems: 'flex-end', gap: 8 }}>
//       <View style={{ 
//         flexDirection: 'row', 
//         alignItems: 'center', 
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 16,
//         backgroundColor: statusCfg.bg,
//         alignSelf: 'flex-start'
//       }}>
//         <Icon name={statusCfg.icon} size={14} color={statusCfg.color} style={{ marginRight: 4 }} />
//         <Text style={{ 
//           fontSize: 12, 
//           fontWeight: '600', 
//           color: statusCfg.color 
//         }}>
//           {status}
//         </Text>
//       </View>
      
//       <View style={{ 
//         flexDirection: 'row', 
//         alignItems: 'center', 
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 16,
//         backgroundColor: paymentCfg.color + '20',
//         alignSelf: 'flex-start'
//       }}>
//         <Icon name={paymentCfg.icon} size={14} color={paymentCfg.color} style={{ marginRight: 4 }} />
//         <Text style={{ 
//           fontSize: 12, 
//           fontWeight: '600', 
//           color: paymentCfg.color 
//         }}>
//           {paymentStatus}
//         </Text>
//       </View>
      
//       <View style={{ 
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 16,
//         backgroundColor: '#f8fafc',
//         alignSelf: 'flex-start'
//       }}>
//         <Text style={{ 
//           fontSize: 12, 
//           fontWeight: '600', 
//           color: '#6b7280' 
//         }}>
//           {progress}% Complete
//         </Text>
//       </View>
//     </View>
//   );
// };

// // Progress Bar Component
// const ProgressBar = ({ progress }) => {
//   return (
//     <View style={{ 
//       height: 8, 
//       backgroundColor: '#e5e7eb', 
//       borderRadius: 4,
//       overflow: 'hidden',
//       marginVertical: 8
//     }}>
//       <View style={{ 
//         height: '100%', 
//         width: `${progress}%`, 
//         backgroundColor: progress >= 80 ? '#10b981' : progress >= 50 ? '#3b82f6' : '#f59e0b',
//         borderRadius: 4
//       }} />
//     </View>
//   );
// };

// // Purchase Order Card Component
// const PurchaseOrderCard = ({ item }) => {
//   return (
//     <Animated.View entering={FadeInDown.duration(500)}>
//       <View style={{
//         borderRadius: 20,
//         backgroundColor: '#ffffff',
//         marginBottom: 16,
//         overflow: 'hidden',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 4,
//       }}>
//         {/* Header - Matching Indent Screen */}
//         <LinearGradient
//           colors={['#dbeafe', '#bfdbfe']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={{ padding: 20 }}
//         >
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <View style={{ flex: 1 }}>
//               <Text style={{ 
//                 fontSize: 18, 
//                 fontWeight: '700', 
//                 color: '#1e40af',
//                 marginBottom: 4
//               }}>
//                 {item.id}
//               </Text>
//               <Text style={{ 
//                 fontSize: 13, 
//                 color: '#3b82f6',
//                 marginBottom: 8
//               }}>
//                 {item.items} Item(s) • {item.date}
//               </Text>
//             </View>
//             <StatusIndicator 
//               status={item.status} 
//               paymentStatus={item.paymentStatus} 
//               progress={item.progress} 
//             />
//           </View>
//         </LinearGradient>

//         {/* Content */}
//         <View style={{ padding: 20, gap: 16 }}>
//           {/* Vendor Info */}
//           <View style={{ gap: 8 }}>
//             <Text style={{ fontSize: 12, color: '#6b7280' }}>Vendor Name</Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Icon name="office-building" size={16} color="#6b7280" />
//               <Text style={{ 
//                 fontSize: 14, 
//                 fontWeight: '600', 
//                 color: '#374151',
//                 marginLeft: 8
//               }}>
//                 {item.vendorName}
//               </Text>
//             </View>
            
//             <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Vendor Address</Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Icon name="map-marker" size={16} color="#6b7280" />
//               <Text style={{ 
//                 fontSize: 14, 
//                 color: '#6b7280',
//                 marginLeft: 8,
//                 flex: 1
//               }}>
//                 {item.vendorAddress}
//               </Text>
//             </View>
//           </View>

//           {/* Divider */}
//           <View style={{ height: 1, backgroundColor: '#e5e7eb' }} />

//           {/* Amount Info */}
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <View style={{ flex: 1, gap: 4 }}>
//               <Text style={{ fontSize: 12, color: '#6b7280' }}>PO Amount</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Icon name="currency-usd" size={16} color="#3b82f6" />
//                 <Text style={{ 
//                   fontSize: 16, 
//                   fontWeight: '700', 
//                   color: '#3b82f6',
//                   marginLeft: 8
//                 }}>
//                   {item.poAmount}
//                 </Text>
//               </View>
//             </View>
//             <View style={{ flex: 1, gap: 4 }}>
//               <Text style={{ fontSize: 12, color: '#6b7280' }}>Mobile No.</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Icon name="phone" size={16} color="#6b7280" />
//                 <Text style={{ 
//                   fontSize: 14, 
//                   fontWeight: '600', 
//                   color: '#374151',
//                   marginLeft: 8
//                 }}>
//                   {item.mobileNo}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* Divider */}
//           <View style={{ height: 1, backgroundColor: '#e5e7eb' }} />

//           {/* Payment Info */}
//           <View style={{ gap: 8 }}>
//             <Text style={{ fontSize: 12, color: '#6b7280' }}>GRN/Paid Amount</Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//               <Text style={{ 
//                 fontSize: 14, 
//                 fontWeight: '600', 
//                 color: '#374151'
//               }}>
//                 {item.grnAmount} / {item.paidAmount}
//               </Text>
//               <View style={{ 
//                 paddingHorizontal: 12,
//                 paddingVertical: 6,
//                 borderRadius: 16,
//                 backgroundColor: item.materialReceived ? '#ecfdf5' : '#fef3c7'
//               }}>
//                 <Text style={{ 
//                   fontSize: 12, 
//                   fontWeight: '600', 
//                   color: item.materialReceived ? '#059669' : '#d97706'
//                 }}>
//                   {item.materialReceived ? 'Material Received' : 'Pending Delivery'}
//                 </Text>
//               </View>
//             </View>
            
//             <ProgressBar progress={item.progress} />
//           </View>

//           {/* Action Buttons */}
//           <View style={{ 
//             flexDirection: 'row', 
//             justifyContent: 'flex-end', 
//             gap: 12,
//             paddingTop: 16,
//             borderTopWidth: 1,
//             borderTopColor: '#f3f4f6'
//           }}>
//             <TouchableOpacity
//               style={{ 
//                 flexDirection: 'row', 
//                 alignItems: 'center',
//                 paddingHorizontal: 16,
//                 paddingVertical: 8,
//                 backgroundColor: '#eff6ff',
//                 borderRadius: 12
//               }}
//               onPress={() => console.log('View Details', item.id)}
//             >
//               <Icon name="eye-outline" size={16} color="#2563eb" />
//               <Text style={{ 
//                 color: '#2563eb', 
//                 fontWeight: '600',
//                 marginLeft: 8
//               }}>
//                 View
//               </Text>
//             </TouchableOpacity>
            
//             <TouchableOpacity
//               style={{ 
//                 flexDirection: 'row', 
//                 alignItems: 'center',
//                 paddingHorizontal: 16,
//                 paddingVertical: 8,
//                 backgroundColor: '#ecfdf5',
//                 borderRadius: 12
//               }}
//               onPress={() => console.log('Process Payment', item.id)}
//             >
//               <Icon name="cash-multiple" size={16} color="#059669" />
//               <Text style={{ 
//                 color: '#059669', 
//                 fontWeight: '600',
//                 marginLeft: 8
//               }}>
//                 Pay
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
//     </Animated.View>
//   );
// };

// // Filter Modal Component
// const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
//   const [tempFilter, setTempFilter] = useState(currentFilter);

//   const filters = ['All', 'Pending', 'Approved', 'Open', 'Rejected'];

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
//         <Animated.View entering={FadeInUp} style={{ 
//           backgroundColor: '#ffffff', 
//           borderTopLeftRadius: 24,
//           borderTopRightRadius: 24,
//           padding: 24
//         }}>
//           <View style={{ 
//             flexDirection: 'row', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             marginBottom: 24
//           }}>
//             <Text style={{ 
//               fontSize: 20, 
//               fontWeight: '700', 
//               color: '#1f2937' 
//             }}>
//               Filter Purchase Orders
//             </Text>
//             <TouchableOpacity onPress={onClose}>
//               <Icon name="close" size={24} color="#6b7280" />
//             </TouchableOpacity>
//           </View>
          
//           <View style={{ gap: 12 }}>
//             <Text style={{ 
//               fontSize: 16, 
//               fontWeight: '600', 
//               color: '#374151' 
//             }}>
//               Status
//             </Text>
//             {filters.map((status) => (
//               <TouchableOpacity
//                 key={status}
//                 style={{
//                   padding: 16,
//                   borderRadius: 16,
//                   borderWidth: 2,
//                   borderColor: (tempFilter === status || (status === 'All' && !tempFilter)) 
//                     ? '#3b82f6' 
//                     : '#e5e7eb',
//                   backgroundColor: (tempFilter === status || (status === 'All' && !tempFilter)) 
//                     ? '#eff6ff' 
//                     : '#ffffff'
//                 }}
//                 onPress={() => setTempFilter(status === 'All' ? null : status)}
//               >
//                 <Text style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   color: (tempFilter === status || (status === 'All' && !tempFilter))
//                     ? '#3b82f6'
//                     : '#374151'
//                 }}>
//                   {status}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
          
//           <View style={{ 
//             flexDirection: 'row', 
//             gap: 12, 
//             marginTop: 24 
//           }}>
//             <TouchableOpacity
//               style={{
//                 flex: 1,
//                 backgroundColor: '#f3f4f6',
//                 padding: 16,
//                 borderRadius: 16,
//                 alignItems: 'center'
//               }}
//               onPress={onClose}
//             >
//               <Text style={{ 
//                 fontSize: 14, 
//                 fontWeight: '600', 
//                 color: '#374151' 
//               }}>
//                 Cancel
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 flex: 1,
//                 backgroundColor: '#3b82f6',
//                 padding: 16,
//                 borderRadius: 16,
//                 alignItems: 'center'
//               }}
//               onPress={() => {
//                 onApplyFilter(tempFilter);
//                 onClose();
//               }}
//             >
//               <Text style={{ 
//                 fontSize: 14, 
//                 fontWeight: '600', 
//                 color: '#ffffff' 
//               }}>
//                 Apply Filter
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// // Main Purchase Order Screen Component
// const PurchaseOrderScreen = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilterModal, setShowFilterModal] = useState(false);
//   const [filterStatus, setFilterStatus] = useState(null);

//   const handleRefresh = useCallback(() => {
//     setIsLoading(true);
//     setTimeout(() => setIsLoading(false), 1500);
//   }, []);

//   const filteredPurchaseOrders = useMemo(() => {
//     let result = [...purchaseOrderData];
    
//     // Apply search filter
//     if (searchQuery.trim()) {
//       result = result.filter(item => 
//         item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.vendorAddress.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     // Apply status filter
//     if (filterStatus) {
//       result = result.filter(item => item.status === filterStatus);
//     }
    
//     return result;
//   }, [filterStatus, searchQuery]);

//   if (isLoading) {
//     return (
//       <MainLayout title="Purchase Order">
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
//           <View style={{ 
//             backgroundColor: '#ffffff', 
//             padding: 32, 
//             borderRadius: 24,
//             alignItems: 'center',
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0.1,
//             shadowRadius: 8,
//             elevation: 4
//           }}>
//             <ActivityIndicator size="large" color="#3b82f6" />
//             <Text style={{ 
//               marginTop: 16, 
//               fontSize: 16, 
//               fontWeight: '600', 
//               color: '#374151' 
//             }}>
//               Loading purchase orders...
//             </Text>
//           </View>
//         </View>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout title="Purchase Order">
//       <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
//         {/* Header - Matching Indent Screen */}
//         <View style={{ backgroundColor: '#dbeafe', padding: 16 }}>
//           <View style={{ 
//             flexDirection: 'row', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             marginBottom: 12
//           }}>
//             <View>
//               <Text style={{ 
//                 fontSize: 20, 
//                 fontWeight: '700', 
//                 color: '#1e40af' 
//               }}>
//                 Purchase Orders
//               </Text>
//               <Text style={{ 
//                 fontSize: 12, 
//                 color: '#3b82f6',
//                 marginTop: 2
//               }}>
//                 {filteredPurchaseOrders.length} orders • {filterStatus || 'All statuses'}
//               </Text>
//             </View>
//             <View style={{ flexDirection: 'row', gap: 8 }}>
//               <TouchableOpacity
//                 style={{ 
//                   padding: 10, 
//                   backgroundColor: 'rgba(255, 255, 255, 0.8)', 
//                   borderRadius: 12 
//                 }}
//                 onPress={handleRefresh}
//               >
//                 <Icon name="refresh" size={18} color="#1e40af" />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{ 
//                   padding: 10, 
//                   backgroundColor: 'rgba(255, 255, 255, 0.8)', 
//                   borderRadius: 12 
//                 }}
//                 onPress={() => console.log('Add purchase order')}
//               >
//                 <Icon name="plus" size={18} color="#1e40af" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Search and Filter Row */}
//           <View style={{ 
//             flexDirection: 'row', 
//             alignItems: 'center',
//             gap: 8
//           }}>
//             {/* Search Bar */}
//             <View style={{ 
//               flex: 1,
//               backgroundColor: 'rgba(255, 255, 255, 0.8)', 
//               borderRadius: 12, 
//               paddingHorizontal: 12,
//               height: 40,
//               justifyContent: 'center'
//             }}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Icon name="magnify" size={18} color="#3b82f6" style={{ marginRight: 8 }} />
//                 <TextInput
//                   value={searchQuery}
//                   onChangeText={setSearchQuery}
//                   placeholder="Search PO, vendors..."
//                   placeholderTextColor="#6b7280"
//                   style={{ 
//                     flex: 1, 
//                     color: '#1e40af', 
//                     fontSize: 14,
//                     paddingVertical: 0
//                   }}
//                 />
//                 {searchQuery.length > 0 && (
//                   <TouchableOpacity onPress={() => setSearchQuery('')}>
//                     <Icon name="close-circle" size={18} color="#6b7280" />
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>

//             {/* Filter Button */}
//             <TouchableOpacity
//               style={{ 
//                 flexDirection: 'row', 
//                 alignItems: 'center',
//                 backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                 paddingHorizontal: 12,
//                 height: 40,
//                 borderRadius: 12,
//                 minWidth: 60,
//                 justifyContent: 'center'
//               }}
//               onPress={() => setShowFilterModal(true)}
//             >
//               <Icon name="filter-outline" size={16} color="#1e40af" />
//               {filterStatus && (
//                 <View style={{ 
//                   marginLeft: 4, 
//                   backgroundColor: '#3b82f6', 
//                   paddingHorizontal: 6,
//                   paddingVertical: 2,
//                   borderRadius: 8
//                 }}>
//                   <Text style={{ 
//                     fontSize: 10, 
//                     color: '#ffffff',
//                     fontWeight: '600'
//                   }}>
//                     {filterStatus}
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Purchase Orders List */}
//         <ScrollView 
//           contentContainerStyle={{ padding: 16 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {filteredPurchaseOrders.length > 0 ? (
//             filteredPurchaseOrders.map((item) => (
//               <PurchaseOrderCard
//                 key={item.id}
//                 item={item}
//               />
//             ))
//           ) : (
//             <Animated.View 
//               entering={FadeInUp}
//               style={{ 
//                 alignItems: 'center', 
//                 justifyContent: 'center', 
//                 padding: 40,
//                 backgroundColor: '#ffffff',
//                 borderRadius: 24,
//                 margin: 16
//               }}
//             >
//               <Icon name="file-document-outline" size={64} color="#d1d5db" />
//               <Text style={{ 
//                 fontSize: 18, 
//                 fontWeight: '600', 
//                 color: '#6b7280',
//                 marginTop: 16
//               }}>
//                 No purchase orders found
//               </Text>
//               <Text style={{ 
//                 fontSize: 14, 
//                 color: '#9ca3af',
//                 marginTop: 8,
//                 textAlign: 'center'
//               }}>
//                 {searchQuery ? 
//                   'Try adjusting your search terms or filters' : 
//                   'Get started by creating your first purchase order'
//                 }
//               </Text>
//               <TouchableOpacity 
//                 style={{ 
//                   backgroundColor: '#3b82f6', 
//                   paddingHorizontal: 24,
//                   paddingVertical: 12,
//                   borderRadius: 16,
//                   marginTop: 16
//                 }}
//                 onPress={() => console.log('Add first purchase order')}
//               >
//                 <Text style={{ 
//                   color: '#ffffff', 
//                   fontWeight: '600' 
//                 }}>
//                   Create PO
//                 </Text>
//               </TouchableOpacity>
//             </Animated.View>
//           )}
//         </ScrollView>

//         {/* Filter Modal */}
//         <FilterModal
//           visible={showFilterModal}
//           onClose={() => setShowFilterModal(false)}
//           currentFilter={filterStatus}
//           onApplyFilter={setFilterStatus}
//         />
//       </View>
//     </MainLayout>
//   );
// };

// export default PurchaseOrderScreen;
import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  TextInput,
  Modal,
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const cardWidth = Math.min(screenWidth - 32, 600);

// Sample purchase order data
const purchaseOrderData = [
  {
    id: 'GH101-PO-00019',
    vendorName: 'XYZ Suppliers',
    vendorAddress: '45 Supply Road, Bengaluru, KA',
    poAmount: '200.00 K',
    mobileNo: '8545659523',
    grnAmount: '90.00 K',
    paidAmount: '238.30 K',
    status: 'Approved',
    paymentStatus: 'Fully Paid',
    progress: 45,
    items: 1,
    materialReceived: true,
    date: '2025-09-08',
  },
  {
    id: 'GH101-PO-00018',
    vendorName: 'ABC Constructions',
    vendorAddress: '123 Builder Lane, Mumbai, MH',
    poAmount: '25.20 K',
    mobileNo: '98563264325',
    grnAmount: '25.20 K',
    paidAmount: '25.06 K',
    status: 'Pending',
    paymentStatus: 'Partially Paid',
    progress: 70.99,
    items: 1,
    materialReceived: true,
    date: '2025-09-07',
  },
  {
    id: 'GH101-PO-00017',
    vendorName: 'Global Materials Ltd',
    vendorAddress: '789 Trade Center, Delhi, DL',
    poAmount: '150.75 K',
    mobileNo: '9876543210',
    grnAmount: '75.50 K',
    paidAmount: '50.25 K',
    status: 'Open',
    paymentStatus: 'Partially Paid',
    progress: 33.33,
    items: 3,
    materialReceived: false,
    date: '2025-09-06',
  },
];

// Status Indicator Component
const StatusIndicator = ({ status, paymentStatus, progress }) => {
  const statusConfig = {
    Pending: { color: '#f59e0b', bg: '#fef3c7', icon: 'clock-outline' },
    Approved: { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
    Rejected: { color: '#ef4444', bg: '#fee2e2', icon: 'close-circle' },
    Open: { color: '#3b82f6', bg: '#dbeafe', icon: 'lock-open-outline' },
  };

  const paymentConfig = {
    'Fully Paid': { color: '#10b981', icon: 'check-all', bg: '#d1fae5' },
    'Partially Paid': { color: '#f59e0b', icon: 'chart-pie', bg: '#fef3c7' },
    'Not Paid': { color: '#ef4444', icon: 'cash-remove', bg: '#fee2e2' },
  };

  const statusCfg = statusConfig[status] || statusConfig['Pending'];
  const paymentCfg = paymentConfig[paymentStatus] || paymentConfig['Not Paid'];

  return (
    <View style={{ alignItems: 'flex-end', gap: 8 }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
          backgroundColor: statusCfg.bg,
          alignSelf: 'flex-start',
          minWidth: 100, // Fixed width for consistent size
          justifyContent: 'center', // Center the content
        }}
      >
        <Icon name={statusCfg.icon} size={14} color={statusCfg.color} style={{ marginRight: 4 }} />
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: statusCfg.color,
            textAlign: 'center',
          }}
        >
          {status}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
          backgroundColor: paymentCfg.bg, // Use bg from paymentConfig
          alignSelf: 'flex-start',
          minWidth: 100, // Fixed width for consistent size
          justifyContent: 'center', // Center the content
        }}
      >
        <Icon name={paymentCfg.icon} size={14} color={paymentCfg.color} style={{ marginRight: 4 }} />
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: paymentCfg.color,
            textAlign: 'center',
          }}
        >
          {paymentStatus}
        </Text>
      </View>

      <View
        style={{
          paddingHorizontal: 12,
          paddingVertical: 6,
          borderRadius: 16,
          backgroundColor: '#f8fafc',
          alignSelf: 'flex-start',
          minWidth: 100, // Fixed width for consistent size
          justifyContent: 'center', // Center the content
        }}
      >
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: '#6b7280',
            textAlign: 'center',
          }}
        >
          {progress}% Complete
        </Text>
      </View>
    </View>
  );
};

// Progress Bar Component
const ProgressBar = ({ progress }) => {
  return (
    <View
      style={{
        height: 8,
        backgroundColor: '#e5e7eb',
        borderRadius: 4,
        overflow: 'hidden',
        marginVertical: 8,
      }}
    >
      <View
        style={{
          height: '100%',
          width: `${progress}%`,
          backgroundColor: progress >= 80 ? '#10b981' : progress >= 50 ? '#3b82f6' : '#f59e0b',
          borderRadius: 4,
        }}
      />
    </View>
  );
};

// Purchase Order Card Component
const PurchaseOrderCard = ({ item }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <View
        style={{
          borderRadius: 20,
          backgroundColor: '#ffffff',
          marginBottom: 16,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}
      >
        {/* Header - Matching Indent Screen */}
        <LinearGradient
          colors={['#dbeafe', '#bfdbfe']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 20 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#1e40af',
                  marginBottom: 4,
                }}
              >
                {item.id}
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  color: '#3b82f6',
                  marginBottom: 8,
                }}
              >
                {item.items} Item(s) • {item.date}
              </Text>
            </View>
            <StatusIndicator status={item.status} paymentStatus={item.paymentStatus} progress={item.progress} />
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={{ padding: 20, gap: 16 }}>
          {/* Vendor Info */}
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Vendor Name</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="office-building" size={16} color="#6b7280" />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginLeft: 8,
                }}
              >
                {item.vendorName}
              </Text>
            </View>

            <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Vendor Address</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="map-marker" size={16} color="#6b7280" />
              <Text
                style={{
                  fontSize: 14,
                  color: '#6b7280',
                  marginLeft: 8,
                  flex: 1,
                }}
              >
                {item.vendorAddress}
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: '#e5e7eb' }} />

          {/* Amount Info */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>PO Amount</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="currency-usd" size={16} color="#3b82f6" />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#3b82f6',
                    marginLeft: 8,
                  }}
                >
                  {item.poAmount}
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Mobile No.</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="phone" size={16} color="#6b7280" />
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#374151',
                    marginLeft: 8,
                  }}
                >
                  {item.mobileNo}
                </Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: '#e5e7eb' }} />

          {/* Payment Info */}
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>GRN/Paid Amount</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                }}
              >
                {item.grnAmount} / {item.paidAmount}
              </Text>
              <View
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: item.materialReceived ? '#ecfdf5' : '#fef3c7',
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: item.materialReceived ? '#059669' : '#d97706',
                  }}
                >
                  {item.materialReceived ? 'Material Received' : 'Pending Delivery'}
                </Text>
              </View>
            </View>

            <ProgressBar progress={item.progress} />
          </View>

          {/* Action Buttons */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 12,
              paddingTop: 16,
              borderTopWidth: 1,
              borderTopColor: '#f3f4f6',
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: '#eff6ff',
                borderRadius: 12,
              }}
              onPress={() => console.log('View Details', item.id)}
            >
              <Icon name="eye-outline" size={16} color="#2563eb" />
              <Text
                style={{
                  color: '#2563eb',
                  fontWeight: '600',
                  marginLeft: 8,
                }}
              >
                View
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: '#ecfdf5',
                borderRadius: 12,
              }}
              onPress={() => console.log('Process Payment', item.id)}
            >
              <Icon name="cash-multiple" size={16} color="#059669" />
              <Text
                style={{
                  color: '#059669',
                  fontWeight: '600',
                  marginLeft: 8,
                }}
              >
                Pay
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

// Filter Modal Component
const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
  const [tempFilter, setTempFilter] = useState(currentFilter);

  const filters = ['All', 'Pending', 'Approved', 'Open', 'Rejected'];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
        <Animated.View
          entering={FadeInUp}
          style={{
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#1f2937',
              }}
            >
              Filter Purchase Orders
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={{ gap: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#374151',
              }}
            >
              Status
            </Text>
            {filters.map((status) => (
              <TouchableOpacity
                key={status}
                style={{
                  padding: 16,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor:
                    tempFilter === status || (status === 'All' && !tempFilter) ? '#3b82f6' : '#e5e7eb',
                  backgroundColor:
                    tempFilter === status || (status === 'All' && !tempFilter) ? '#eff6ff' : '#ffffff',
                }}
                onPress={() => setTempFilter(status === 'All' ? null : status)}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: tempFilter === status || (status === 'All' && !tempFilter) ? '#3b82f6' : '#374151',
                  }}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#f3f4f6',
                padding: 16,
                borderRadius: 16,
                alignItems: 'center',
              }}
              onPress={onClose}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#3b82f6',
                padding: 16,
                borderRadius: 16,
                alignItems: 'center',
              }}
              onPress={() => {
                onApplyFilter(tempFilter);
                onClose();
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#ffffff',
                }}
              >
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Main Purchase Order Screen Component
const PurchaseOrderScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const filteredPurchaseOrders = useMemo(() => {
    let result = [...purchaseOrderData];

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(
        (item) =>
          item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.vendorAddress.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Apply status filter
    if (filterStatus) {
      result = result.filter((item) => item.status === filterStatus);
    }

    return result;
  }, [filterStatus, searchQuery]);

  if (isLoading) {
    return (
      <MainLayout title="Purchase Order">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 32,
              borderRadius: 24,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}
          >
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text
              style={{
                marginTop: 16,
                fontSize: 16,
                fontWeight: '600',
                color: '#374151',
              }}
            >
              Loading purchase orders...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Purchase Order">
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        {/* Header - Matching Indent Screen */}
        <View style={{ backgroundColor: '#dbeafe', padding: 16 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#1e40af',
                }}
              >
                Purchase Orders
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#3b82f6',
                  marginTop: 2,
                }}
              >
                {filteredPurchaseOrders.length} orders • {filterStatus || 'All statuses'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 12,
                }}
                onPress={handleRefresh}
              >
                <Icon name="refresh" size={18} color="#1e40af" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 12,
                }}
                onPress={() => console.log('Add purchase order')}
              >
                <Icon name="plus" size={18} color="#1e40af" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search and Filter Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* Search Bar */}
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 40,
                justifyContent: 'center',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="magnify" size={18} color="#3b82f6" style={{ marginRight: 8 }} />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search PO, vendors..."
                  placeholderTextColor="#6b7280"
                  style={{
                    flex: 1,
                    color: '#1e40af',
                    fontSize: 14,
                    paddingVertical: 0,
                  }}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Icon name="close-circle" size={18} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Filter Button */}
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                paddingHorizontal: 12,
                height: 40,
                borderRadius: 12,
                minWidth: 60,
                justifyContent: 'center',
              }}
              onPress={() => setShowFilterModal(true)}
            >
              <Icon name="filter-outline" size={16} color="#1e40af" />
              {filterStatus && (
                <View
                  style={{
                    marginLeft: 4,
                    backgroundColor: '#3b82f6',
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#ffffff',
                      fontWeight: '600',
                    }}
                  >
                    {filterStatus}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Purchase Orders List */}
        <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
          {filteredPurchaseOrders.length > 0 ? (
            filteredPurchaseOrders.map((item) => <PurchaseOrderCard key={item.id} item={item} />)
          ) : (
            <Animated.View
              entering={FadeInUp}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 40,
                backgroundColor: '#ffffff',
                borderRadius: 24,
                margin: 16,
              }}
            >
              <Icon name="file-document-outline" size={64} color="#d1d5db" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#6b7280',
                  marginTop: 16,
                }}
              >
                No purchase orders found
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  marginTop: 8,
                  textAlign: 'center',
                }}
              >
                {searchQuery ? 'Try adjusting your search terms or filters' : 'Get started by creating your first purchase order'}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3b82f6',
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 16,
                  marginTop: 16,
                }}
                onPress={() => console.log('Add first purchase order')}
              >
                <Text
                  style={{
                    color: '#ffffff',
                    fontWeight: '600',
                  }}
                >
                  Create PO
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </ScrollView>

        {/* Filter Modal */}
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          currentFilter={filterStatus}
          onApplyFilter={setFilterStatus}
        />
      </View> cdf
    </MainLayout>
  );
};

export default PurchaseOrderScreen;