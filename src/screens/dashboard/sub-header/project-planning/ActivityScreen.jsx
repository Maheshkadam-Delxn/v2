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

// const activities = [
//   {
//     id: '1',
//     name: 'Granite Horizon',
//     actNo: 'GH101-WBS-00001',
//     progress: 25,
//     startDate: '2025-06-07',
//     endDate: '2025-06-16',
//     duration: 10,
//     status: 'Not Started',
//     approvalStatus: 'Pending',
//     assignedTo: 'Sonalika, Alan David',
//     description: 'Primary construction phase for the Granite Horizon development',
//     tags: ['Construction', 'Phase 1'],
//     budget: '$125,000',
//     subActivities: [
//       {
//         id: '101',
//         name: 'Survey',
//         actNo: '1080',
//         progress: 25,
//         startDate: '2025-06-07',
//         endDate: '2025-06-16',
//         duration: 10,
//         status: 'Not Started',
//         approvalStatus: 'Approved',
//         assignedTo: 'Sonalika, Alan David',
//         description: 'Site survey and mapping activities',
//         budget: '$15,000',
//         subActivities: [
//           {
//             id: '1011',
//             name: 'Test',
//             actNo: '1170',
//             progress: 25,
//             startDate: '2025-07-08',
//             endDate: '2025-07-22',
//             duration: 15,
//             status: 'Not Started',
//             approvalStatus: 'Pending',
//             assignedTo: 'Sonalika, Mukesh Sinha',
//             description: 'Testing phase for survey validation',
//             budget: '$10,000',
//           },
//           {
//             id: '1012',
//             name: 'Pre construction test',
//             actNo: '1200',
//             progress: 25,
//             startDate: '2025-07-01',
//             endDate: '2025-07-30',
//             duration: 30,
//             status: 'In Progress',
//             approvalStatus: 'Approved',
//             assignedTo: 'Mukesh Sinha',
//             description: 'Pre-construction testing activities',
//             budget: '$20,000',
//           },
//           {
//             id: '1013',
//             name: 'Test',
//             actNo: '1210',
//             progress: 25,
//             startDate: '2025-07-08',
//             endDate: '2025-07-22',
//             duration: 15,
//             status: 'Not Started',
//             approvalStatus: 'Approved',
//             assignedTo: 'Sonalika, Mukesh Sinha',
//             description: 'Additional testing for site survey',
//             budget: '$12,000',
//           },
//           {
//             id: '1014',
//             name: 'Land survey and soil investigation',
//             actNo: '1220',
//             progress: 25,
//             startDate: '2025-08-27',
//             endDate: '2025-09-05',
//             duration: 10,
//             status: 'Not Started',
//             approvalStatus: 'Pending',
//             assignedTo: 'Mukesh Sinha',
//             description: 'Detailed land survey and soil analysis',
//             budget: '$18,000',
//           },
//           {
//             id: '1015',
//             name: 'Brick wall',
//             actNo: '1290',
//             progress: 25,
//             startDate: '2025-09-06',
//             endDate: '2025-09-15',
//             duration: 10,
//             status: 'Not Started',
//             approvalStatus: 'Approved',
//             assignedTo: 'Mukesh Sinha',
//             description: 'Construction of boundary brick wall',
//             budget: '$25,000',
//           },
//           {
//             id: '1016',
//             name: 'Pre construction test',
//             actNo: '1300',
//             progress: 25,
//             startDate: '2025-07-01',
//             endDate: '2025-07-30',
//             duration: 30,
//             status: 'Not Started',
//             approvalStatus: 'Approved',
//             assignedTo: 'Mukesh Sinha',
//             description: 'Additional pre-construction testing',
//             budget: '$22,000',
//           },
//           {
//             id: '1017',
//             name: 'Survey',
//             actNo: '1310',
//             progress: 25,
//             startDate: '2025-06-07',
//             endDate: '2025-06-16',
//             duration: 10,
//             status: 'Not Started',
//             approvalStatus: 'Approved',
//             assignedTo: 'Sonalika, Alan David',
//             description: 'Secondary site survey for verification',
//             budget: '$15,000',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: '2',
//     name: 'A Wing',
//     actNo: 'GH101-WBS-00002',
//     progress: 25,
//     startDate: '2025-07-23',
//     endDate: '2025-08-01',
//     duration: 10,
//     status: 'Not Started',
//     approvalStatus: 'Pending',
//     assignedTo: 'Mukesh Sinha',
//     description: 'Main building wing construction activities',
//     tags: ['Building', 'Wing A'],
//     budget: '$200,000',
//     subActivities: [
//       {
//         id: '201',
//         name: 'Wing1',
//         actNo: '2001',
//         progress: 25,
//         startDate: '2025-07-23',
//         endDate: '2025-08-01',
//         duration: 10,
//         status: 'Not Started',
//         approvalStatus: 'Pending',
//         assignedTo: 'Mukesh Sinha',
//         description: 'Construction of Wing 1 structure',
//         budget: '$100,000',
//         subActivities: [
//           {
//             id: '2011',
//             name: 'Wall1',
//             actNo: '20011',
//             progress: 25,
//             startDate: '2025-07-23',
//             endDate: '2025-07-30',
//             duration: 8,
//             status: 'Not Started',
//             approvalStatus: 'Pending',
//             assignedTo: 'Mukesh Sinha',
//             description: 'Construction of primary wall for Wing 1',
//             budget: '$50,000',
//           },
//           {
//             id: '2012',
//             name: 'Wall2',
//             actNo: '20012',
//             progress: 25,
//             startDate: '2025-07-31',
//             endDate: '2025-08-07',
//             duration: 8,
//             status: 'Not Started',
//             approvalStatus: 'Pending',
//             assignedTo: 'Mukesh Sinha',
//             description: 'Construction of secondary wall for Wing 1',
//             budget: '$50,000',
//           },
//         ],
//       },
//       {
//         id: '202',
//         name: 'Wing2',
//         actNo: '2002',
//         progress: 25,
//         startDate: '2025-08-02',
//         endDate: '2025-08-10',
//         duration: 9,
//         status: 'Not Started',
//         approvalStatus: 'Pending',
//         assignedTo: 'Sonalika',
//         description: 'Construction of Wing 2 structure',
//         budget: '$90,000',
//         subActivities: [
//           {
//             id: '2021',
//             name: 'Wall1',
//             actNo: '20021',
//             progress: 25,
//             startDate: '2025-08-02',
//             endDate: '2025-08-09',
//             duration: 8,
//             status: 'Not Started',
//             approvalStatus: 'Pending',
//             assignedTo: 'Sonalika',
//             description: 'Construction of primary wall for Wing 2',
//             budget: '$45,000',
//           },
//         ],
//       },
//     ],
//   },
// ];

// // Circular Progress Component
// const CircularProgress = ({ progress, size = 44, strokeWidth = 4 }) => {
//   const radius = (size - strokeWidth) / 2;
//   const circumference = 2 * Math.PI * radius;
//   const strokeDashoffset = circumference - (progress / 100) * circumference;

//   const getProgressColor = (progress) => {
//     if (progress >= 80) return '#10b981';
//     if (progress >= 50) return '#f59e0b';
//     if (progress >= 20) return '#3b82f6';
//     return '#ef4444';
//   };

//   return (
//     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//       <View style={{
//         width: size,
//         height: size,
//         borderRadius: size / 2,
//         backgroundColor: '#f8fafc',
//         alignItems: 'center',
//         justifyContent: 'center',
//         borderWidth: strokeWidth,
//         borderColor: '#e5e7eb'
//       }}>
//         <View style={{
//           width: size - strokeWidth * 2,
//           height: size - strokeWidth * 2,
//           borderRadius: (size - strokeWidth * 2) / 2,
//           backgroundColor: `${getProgressColor(progress)}20`,
//           alignItems: 'center',
//           justifyContent: 'center',
//         }}>
//           <Text style={{ 
//             fontSize: 12, 
//             fontWeight: '700', 
//             color: getProgressColor(progress) 
//           }}>
//             {progress}%
//           </Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// // Status Indicator Component
// const StatusIndicator = ({ status, approvalStatus }) => {
//   const statusConfig = {
//     'Not Started': { color: '#6b7280', bg: '#f3f4f6', icon: 'clock-outline' },
//     'In Progress': { color: '#f59e0b', bg: '#fef3c7', icon: 'progress-clock' },
//     'Completed': { color: '#16a34a', bg: '#dcfce7', icon: 'check-circle' },
//   };

//   const approvalConfig = {
//     'Pending': { color: '#f59e0b' },
//     'Approved': { color: '#16a34a' },
//   };

//   const config = statusConfig[status] || statusConfig['Not Started'];
//   const approvalStyle = approvalConfig[approvalStatus] || approvalConfig['Pending'];

//   return (
//     <View style={{ alignItems: 'flex-end', gap: 4 }}>
//       <View style={{ 
//         flexDirection: 'row', 
//         alignItems: 'center', 
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 16,
//         backgroundColor: config.bg 
//       }}>
//         <Icon name={config.icon} size={14} color={config.color} style={{ marginRight: 4 }} />
//         <Text style={{ 
//           fontSize: 12, 
//           fontWeight: '600', 
//           color: config.color 
//         }}>
//           {status}
//         </Text>
//       </View>
//       <View style={{ 
//         paddingHorizontal: 8,
//         paddingVertical: 4,
//         borderRadius: 12,
//         backgroundColor: `${approvalStyle.color}10`
//       }}>
//         <Text style={{ 
//           fontSize: 11, 
//           fontWeight: '600', 
//           color: approvalStyle.color 
//         }}>
//           {approvalStatus}
//         </Text>
//       </View>
//     </View>
//   );
// };

// // Activity Card Component
// const ActivityCard = ({ item, level = 0, toggleExpand, expandedItems }) => {
//   const [showDetails, setShowDetails] = useState(false);
//   const isExpanded = !!expandedItems[item.id];

//   return (
//     <Animated.View entering={FadeInDown.delay(level * 100)} exiting={FadeOut}>
//       <TouchableOpacity
//         onPress={() => item.subActivities && item.subActivities.length > 0 && toggleExpand(item.id)}
//         style={{
//           borderRadius: 16,
//           backgroundColor: level === 0 ? '#ffffff' : '#f8fafc',
//           marginBottom: 16,
//           overflow: 'hidden',
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: level === 0 ? 0.1 : 0.05,
//           shadowRadius: level === 0 ? 8 : 4,
//           elevation: level === 0 ? 4 : 2,
//           width: cardWidth,
//         }}
//       >
//         {/* Header */}
//         <LinearGradient
//           colors={level === 0 ? ['#dbeafe', '#bfdbfe'] : ['#f3f4f6', '#e5e7eb']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={{ padding: 16 }}
//         >
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
//               <Icon
//                 name={item.subActivities && item.subActivities.length > 0 ? (isExpanded ? 'chevron-down' : 'chevron-right') : 'minus'}
//                 size={20}
//                 color="#1e40af"
//                 style={{ marginRight: 8 }}
//               />
//               <View style={{ flex: 1 }}>
//                 <Text style={{ 
//                   fontSize: 16, 
//                   fontWeight: '700', 
//                   color: '#1e40af',
//                   marginBottom: 4
//                 }}>
//                   {item.name}
//                 </Text>
//                 <Text style={{ 
//                   fontSize: 12, 
//                   color: '#3b82f6',
//                   marginBottom: 8
//                 }}>
//                   {item.actNo}
//                 </Text>
//                 {item.tags && (
//                   <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
//                     {item.tags.map((tag, index) => (
//                       <View key={index} style={{ 
//                         backgroundColor: '#bfdbfe', 
//                         paddingHorizontal: 8,
//                         paddingVertical: 4,
//                         borderRadius: 12
//                       }}>
//                         <Text style={{ 
//                           fontSize: 10, 
//                           color: '#1e40af',
//                           fontWeight: '600'
//                         }}>
//                           {tag}
//                         </Text>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               </View>
//             </View>
//             <CircularProgress progress={item.progress} size={44} strokeWidth={4} />
//           </View>
//         </LinearGradient>

//         {/* Content */}
//         <View style={{ padding: 16, gap: 12 }}>
//           {/* Key Info */}
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <View style={{ flex: 1, gap: 4 }}>
//               <Text style={{ fontSize: 12, color: '#6b7280' }}>Duration</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Icon name="calendar-range" size={16} color="#6b7280" />
//                 <Text style={{ 
//                   fontSize: 14, 
//                   fontWeight: '600', 
//                   color: '#1e40af',
//                   marginLeft: 8
//                 }}>
//                   {item.duration} days
//                 </Text>
//               </View>
//             </View>
//             <View style={{ flex: 1, gap: 4 }}>
//               <Text style={{ fontSize: 12, color: '#6b7280' }}>Budget</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Icon name="currency-usd" size={16} color="#6b7280" />
//                 <Text style={{ 
//                   fontSize: 14, 
//                   fontWeight: '600', 
//                   color: '#1e40af',
//                   marginLeft: 8
//                 }}>
//                   {item.budget || 'N/A'}
//                 </Text>
//               </View>
//             </View>
//             <StatusIndicator status={item.status} approvalStatus={item.approvalStatus} />
//           </View>

//           {/* Dates */}
//           <View style={{ 
//             backgroundColor: '#f8fafc', 
//             borderRadius: 12, 
//             padding: 12,
//             flexDirection: 'row',
//             justifyContent: 'space-between'
//           }}>
//             <View style={{ gap: 4 }}>
//               <Text style={{ fontSize: 12, color: '#6b7280' }}>Start Date</Text>
//               <Text style={{ fontSize: 14, fontWeight: '600', color: '#1e40af' }}>
//                 {item.startDate}
//               </Text>
//             </View>
//             <View style={{ alignItems: 'flex-end', gap: 4 }}>
//               <Text style={{ fontSize: 12, color: '#6b7280' }}>End Date</Text>
//               <Text style={{ fontSize: 14, fontWeight: '600', color: '#1e40af' }}>
//                 {item.endDate}
//               </Text>
//             </View>
//           </View>

//           {/* Assigned To */}
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <Icon name="account-group" size={16} color="#6b7280" />
//             <Text style={{ 
//               fontSize: 14, 
//               color: '#6b7280',
//               marginLeft: 8
//             }}>
//               Assigned to:{' '}
//             </Text>
//             <Text style={{ 
//               fontSize: 14, 
//               fontWeight: '600', 
//               color: '#1e40af'
//             }}>
//               {item.assignedTo}
//             </Text>
//           </View>

//           {/* Description */}
//           {item.description && (
//             <View style={{ 
//               backgroundColor: '#eff6ff', 
//               borderRadius: 12, 
//               padding: 12
//             }}>
//               <Text style={{ 
//                 fontSize: 14, 
//                 color: '#374151',
//                 lineHeight: 20
//               }}>
//                 {item.description}
//               </Text>
//             </View>
//           )}

//           {/* Action Buttons */}
//           <View style={{ 
//             flexDirection: 'row', 
//             justifyContent: 'flex-end', 
//             gap: 8,
//             paddingTop: 12,
//             borderTopWidth: 1,
//             borderTopColor: '#f3f4f6'
//           }}>
//             <TouchableOpacity
//               style={{ 
//                 flexDirection: 'row', 
//                 alignItems: 'center',
//                 paddingHorizontal: 12,
//                 paddingVertical: 8,
//                 backgroundColor: '#bfdbfe',
//                 borderRadius: 12
//               }}
//               onPress={() => setShowDetails(!showDetails)}
//             >
//               <Icon name="information-outline" size={16} color="#3b82f6" />
//               <Text style={{ 
//                 color: '#3b82f6', 
//                 fontWeight: '600',
//                 marginLeft: 8,
//                 fontSize: 14
//               }}>
//                 Details
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{ 
//                 flexDirection: 'row', 
//                 alignItems: 'center',
//                 paddingHorizontal: 12,
//                 paddingVertical: 8,
//                 backgroundColor: '#bfdbfe',
//                 borderRadius: 12
//               }}
//               onPress={() => console.log('Edit', item.id)}
//             >
//               <Icon name="pencil-outline" size={16} color="#3b82f6" />
//               <Text style={{ 
//                 color: '#3b82f6', 
//                 fontWeight: '600',
//                 marginLeft: 8,
//                 fontSize: 14
//               }}>
//                 Edit
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Expanded Details */}
//           {showDetails && (
//             <Animated.View entering={FadeInUp} style={{ 
//               backgroundColor: '#f8fafc', 
//               borderRadius: 12, 
//               padding: 12,
//               marginTop: 8
//             }}>
//               <Text style={{ 
//                 fontSize: 14, 
//                 fontWeight: '600', 
//                 color: '#1e40af',
//                 marginBottom: 8
//               }}>
//                 Additional Details
//               </Text>
//               <View style={{ gap: 4 }}>
//                 <Text style={{ fontSize: 12, color: '#6b7280' }}>
//                   Activity ID: {item.id}
//                 </Text>
//                 <Text style={{ fontSize: 12, color: '#6b7280' }}>
//                   Approval Status: {item.approvalStatus}
//                 </Text>
//                 <Text style={{ fontSize: 12, color: '#6b7280' }}>
//                   Progress: {item.progress}% Complete
//                 </Text>
//               </View>
//             </Animated.View>
//           )}
//         </View>
//       </TouchableOpacity>

//       {/* Sub-activities */}
//       {isExpanded && item.subActivities && item.subActivities.length > 0 && (
//         <Animated.View entering={SlideInRight} style={{ marginLeft: 24, marginTop: -8 }}>
//           {item.subActivities.map((subItem) => (
//             <ActivityCard
//               key={subItem.id}
//               item={subItem}
//               level={level + 1}
//               toggleExpand={toggleExpand}
//               expandedItems={expandedItems}
//             />
//           ))}
//         </Animated.View>
//       )}
//     </Animated.View>
//   );
// };

// // Filter Modal Component
// const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
//   const [tempFilter, setTempFilter] = useState(currentFilter);

//   const filters = ['All', 'Not Started', 'In Progress', 'Completed'];

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
//         <Animated.View entering={FadeInUp} style={{ 
//           backgroundColor: '#ffffff', 
//           borderTopLeftRadius: 16,
//           borderTopRightRadius: 16,
//           padding: 16
//         }}>
//           <View style={{ 
//             flexDirection: 'row', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             marginBottom: 16
//           }}>
//             <Text style={{ 
//               fontSize: 18, 
//               fontWeight: '700', 
//               color: '#1e40af' 
//             }}>
//               Filter Activities
//             </Text>
//             <TouchableOpacity onPress={onClose}>
//               <Icon name="close" size={20} color="#6b7280" />
//             </TouchableOpacity>
//           </View>
          
//           <View style={{ gap: 8 }}>
//             <Text style={{ 
//               fontSize: 14, 
//               fontWeight: '600', 
//               color: '#1e40af' 
//             }}>
//               Status
//             </Text>
//             {filters.map((status) => (
//               <TouchableOpacity
//                 key={status}
//                 style={{
//                   padding: 12,
//                   borderRadius: 12,
//                   backgroundColor: (tempFilter === status || (status === 'All' && !tempFilter)) 
//                     ? '#bfdbfe' 
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
//             gap: 8, 
//             marginTop: 16 
//           }}>
//             <TouchableOpacity
//               style={{
//                 flex: 1,
//                 backgroundColor: '#f3f4f6',
//                 padding: 12,
//                 borderRadius: 12,
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
//                 padding: 12,
//                 borderRadius: 12,
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

// // Main Activity Screen Component
// const ActivityScreen = () => {
//   const [expandedItems, setExpandedItems] = useState({
//     '1': true,
//     '2': true,
//     '101': true,
//     '201': true,
//     '202': true,
//     '2011': false,
//     '2012': false,
//     '2021': false,
//   });
//   const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
//   const [filterStatus, setFilterStatus] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilterModal, setShowFilterModal] = useState(false);

//   const toggleExpand = useCallback((id) => {
//     setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
//   }, []);

//   const handleSort = useCallback((key) => {
//     setSortConfig(prev => ({
//       key,
//       direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
//     }));
//   }, []);

//   const handleRefresh = useCallback(() => {
//     setIsLoading(true);
//     setTimeout(() => setIsLoading(false), 1500);
//   }, []);

//   const sortedAndFilteredActivities = useMemo(() => {
//     let result = [...activities];
    
//     // Apply search filter
//     if (searchQuery.trim()) {
//       result = result.filter(item => 
//         item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.actNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }
    
//     // Apply status filter
//     if (filterStatus) {
//       result = result.filter(item => item.status === filterStatus);
//     }
    
//     // Apply sorting
//     return result.sort((a, b) => {
//       const aValue = a[sortConfig.key] || '';
//       const bValue = b[sortConfig.key] || '';
//       if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
//       if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
//       return 0;
//     });
//   }, [sortConfig, filterStatus, searchQuery]);

//   if (isLoading) {
//     return (
//       <MainLayout title="Activity">
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
//           <View style={{ 
//             backgroundColor: '#ffffff', 
//             padding: 32, 
//             borderRadius: 16,
//             alignItems: 'center',
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
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
//               Loading activities...
//             </Text>
//             <Text style={{ 
//               marginTop: 8, 
//               fontSize: 14, 
//               color: '#6b7280' 
//             }}>
//               Please wait while we fetch your data
//             </Text>
//           </View>
//         </View>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout title="Activity">
//       <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
//         {/* Header */}
//         <LinearGradient 
//           colors={['#dbeafe', '#bfdbfe']} 
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={{ padding: 16 }}
//         >
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
//                 Project Activities
//               </Text>
//               <Text style={{ 
//                 fontSize: 12, 
//                 color: '#3b82f6',
//                 marginTop: 4
//               }}>
//                 {sortedAndFilteredActivities.length} activities • {filterStatus || 'All statuses'}
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
//                 <Icon name="refresh" size={20} color="#1e40af" />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{ 
//                   padding: 10, 
//                   backgroundColor: 'rgba(255, 255, 255, 0.8)', 
//                   borderRadius: 12 
//                 }}
//                 onPress={() => console.log('Add activity')}
//               >
//                 <Icon name="plus" size={20} color="#1e40af" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Search and Filter Row */}
//           <View style={{ flexDirection: 'row', gap: 8 }}>
//             <View style={{ 
//               flex: 1,
//               backgroundColor: 'rgba(255, 255, 255, 0.8)', 
//               borderRadius: 12, 
//               paddingHorizontal: 12,
//               paddingVertical: 8
//             }}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Icon name="magnify" size={18} color="#3b82f6" style={{ marginRight: 8 }} />
//                 <TextInput
//                   value={searchQuery}
//                   onChangeText={setSearchQuery}
//                   placeholder="Search activities, IDsVu or assignees..."
//                   placeholderTextColor="#6b7280"
//                   style={{ 
//                     flex: 1, 
//                     color: '#1e40af', 
//                     fontSize: 14 
//                   }}
//                 />
//                 {searchQuery.length > 0 && (
//                   <TouchableOpacity onPress={() => setSearchQuery('')}>
//                     <Icon name="close-circle" size={18} color="#6b7280" />
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//             <TouchableOpacity
//               style={{ 
//                 minWidth: 60,
//                 backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                 paddingHorizontal: 12,
//                 paddingVertical: 8,
//                 borderRadius: 12,
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'center'
//               }}
//               onPress={() => setShowFilterModal(true)}
//             >
//               <Icon name="filter-outline" size={16} color="#1e40af" />
//               {filterStatus && (
//                 <View style={{ 
//                   marginLeft: 8, 
//                   backgroundColor: '#3b82f6', 
//                   paddingHorizontal: 8,
//                   paddingVertical: 4,
//                   borderRadius: 8
//                 }}>
//                   <Text style={{ 
//                     fontSize: 12, 
//                     color: '#ffffff',
//                     fontWeight: '600'
//                   }}>
//                     {filterStatus}
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           </View>

//           {/* Sort Controls */}
//           <ScrollView 
//             horizontal 
//             showsHorizontalScrollIndicator={false} 
//             style={{ marginTop: 12 }}
//           >
//             <View style={{ flexDirection: 'row', gap: 8 }}>
//               {[
//                 { key: 'name', label: 'Name' },
//                 { key: 'progress', label: 'Progress' },
//                 { key: 'status', label: 'Status' },
//                 { key: 'approvalStatus', label: 'Approval' }
//               ].map(({ key, label }) => (
//                 <TouchableOpacity
//                   key={key}
//                   onPress={() => handleSort(key)}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     paddingHorizontal: 12,
//                     paddingVertical: 8,
//                     borderRadius: 12,
//                     backgroundColor: sortConfig.key === key 
//                       ? '#3b82f6' 
//                       : 'rgba(255, 255, 255, 0.8)'
//                   }}
//                 >
//                   <Text style={{ 
//                     fontSize: 12, 
//                     color: sortConfig.key === key ? '#ffffff' : '#1e40af',
//                     fontWeight: '600' 
//                   }}>
//                     {label}
//                   </Text>
//                   {sortConfig.key === key && (
//                     <Icon
//                       name={sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down'}
//                       size={14}
//                       color={sortConfig.key === key ? '#ffffff' : '#1e40af'}
//                       style={{ marginLeft: 4 }}
//                     />
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </ScrollView>
//         </LinearGradient>

//         {/* Activities List */}
//         <ScrollView 
//           contentContainerStyle={{ padding: 16 }}
//           showsVerticalScrollIndicator={false}
//         >
//           {sortedAndFilteredActivities.length > 0 ? (
//             sortedAndFilteredActivities.map((item) => (
//               <ActivityCard
//                 key={item.id}
//                 item={item}
//                 level={0}
//                 toggleExpand={toggleExpand}
//                 expandedItems={expandedItems}
//               />
//             ))
//           ) : (
//             <Animated.View 
//               entering={FadeInUp}
//               style={{ 
//                 alignItems: 'center', 
//                 justifyContent: 'center', 
//                 padding: 32,
//                 backgroundColor: '#ffffff',
//                 borderRadius: 16,
//                 margin: 16,
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 8,
//                 elevation: 4
//               }}
//             >
//               <Icon name="folder-search-outline" size={64} color="#d1d5db" />
//               <Text style={{ 
//                 fontSize: 18, 
//                 fontWeight: '600', 
//                 color: '#6b7280',
//                 marginTop: 16
//               }}>
//                 No activities found
//               </Text>
//               <Text style={{ 
//                 fontSize: 14, 
//                 color: '#9ca3af',
//                 marginTop: 8,
//                 textAlign: 'center'
//               }}>
//                 {searchQuery ? 
//                   'Try adjusting your search terms or filters' : 
//                   'Get started by creating your first activity'
//                 }
//               </Text>
//               <TouchableOpacity 
//                 style={{ 
//                   backgroundColor: '#3b82f6', 
//                   paddingHorizontal: 24,
//                   paddingVertical: 12,
//                   borderRadius: 12,
//                   marginTop: 16
//                 }}
//                 onPress={() => console.log('Add first activity')}
//               >
//                 <Text style={{ 
//                   color: '#ffffff', 
//                   fontWeight: '600',
//                   fontSize: 14
//                 }}>
//                   Create Activity
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

// export default ActivityScreen;
import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  ActivityIndicator,
  TextInput,
  Modal
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeOut, 
  FadeInUp,
  SlideInRight
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const cardWidth = Math.min(screenWidth - 32, 600);

const activities = [
  {
    id: '1',
    name: 'Granite Horizon',
    actNo: 'GH101-WBS-00001',
    progress: 25,
    startDate: '2025-06-07',
    endDate: '2025-06-16',
    duration: 10,
    status: 'Not Started',
    approvalStatus: 'Pending',
    assignedTo: 'Sonalika, Alan David',
    description: 'Primary construction phase for the Granite Horizon development',
    tags: ['Construction', 'Phase 1'],
    budget: '$125,000',
    subActivities: [
      {
        id: '101',
        name: 'Survey',
        actNo: '1080',
        progress: 25,
        startDate: '2025-06-07',
        endDate: '2025-06-16',
        duration: 10,
        status: 'Not Started',
        approvalStatus: 'Approved',
        assignedTo: 'Sonalika, Alan David',
        description: 'Site survey and mapping activities',
        budget: '$15,000',
        subActivities: [
          {
            id: '1011',
            name: 'Test',
            actNo: '1170',
            progress: 25,
            startDate: '2025-07-08',
            endDate: '2025-07-22',
            duration: 15,
            status: 'Not Started',
            approvalStatus: 'Pending',
            assignedTo: 'Sonalika, Mukesh Sinha',
            description: 'Testing phase for survey validation',
            budget: '$10,000',
          },
          {
            id: '1012',
            name: 'Pre construction test',
            actNo: '1200',
            progress: 25,
            startDate: '2025-07-01',
            endDate: '2025-07-30',
            duration: 30,
            status: 'In Progress',
            approvalStatus: 'Approved',
            assignedTo: 'Mukesh Sinha',
            description: 'Pre-construction testing activities',
            budget: '$20,000',
          },
          {
            id: '1013',
            name: 'Test',
            actNo: '1210',
            progress: 25,
            startDate: '2025-07-08',
            endDate: '2025-07-22',
            duration: 15,
            status: 'Not Started',
            approvalStatus: 'Approved',
            assignedTo: 'Sonalika, Mukesh Sinha',
            description: 'Additional testing for site survey',
            budget: '$12,000',
          },
          {
            id: '1014',
            name: 'Land survey and soil investigation',
            actNo: '1220',
            progress: 25,
            startDate: '2025-08-27',
            endDate: '2025-09-05',
            duration: 10,
            status: 'Not Started',
            approvalStatus: 'Pending',
            assignedTo: 'Mukesh Sinha',
            description: 'Detailed land survey and soil analysis',
            budget: '$18,000',
          },
          {
            id: '1015',
            name: 'Brick wall',
            actNo: '1290',
            progress: 25,
            startDate: '2025-09-06',
            endDate: '2025-09-15',
            duration: 10,
            status: 'Not Started',
            approvalStatus: 'Approved',
            assignedTo: 'Mukesh Sinha',
            description: 'Construction of boundary brick wall',
            budget: '$25,000',
          },
          {
            id: '1016',
            name: 'Pre construction test',
            actNo: '1300',
            progress: 25,
            startDate: '2025-07-01',
            endDate: '2025-07-30',
            duration: 30,
            status: 'Not Started',
            approvalStatus: 'Approved',
            assignedTo: 'Mukesh Sinha',
            description: 'Additional pre-construction testing',
            budget: '$22,000',
          },
          {
            id: '1017',
            name: 'Survey',
            actNo: '1310',
            progress: 25,
            startDate: '2025-06-07',
            endDate: '2025-06-16',
            duration: 10,
            status: 'Not Started',
            approvalStatus: 'Approved',
            assignedTo: 'Sonalika, Alan David',
            description: 'Secondary site survey for verification',
            budget: '$15,000',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'A Wing',
    actNo: 'GH101-WBS-00002',
    progress: 25,
    startDate: '2025-07-23',
    endDate: '2025-08-01',
    duration: 10,
    status: 'Not Started',
    approvalStatus: 'Pending',
    assignedTo: 'Mukesh Sinha',
    description: 'Main building wing construction activities',
    tags: ['Building', 'Wing A'],
    budget: '$200,000',
    subActivities: [
      {
        id: '201',
        name: 'Wing1',
        actNo: '2001',
        progress: 25,
        startDate: '2025-07-23',
        endDate: '2025-08-01',
        duration: 10,
        status: 'Not Started',
        approvalStatus: 'Pending',
        assignedTo: 'Mukesh Sinha',
        description: 'Construction of Wing 1 structure',
        budget: '$100,000',
        subActivities: [
          {
            id: '2011',
            name: 'Wall1',
            actNo: '20011',
            progress: 25,
            startDate: '2025-07-23',
            endDate: '2025-07-30',
            duration: 8,
            status: 'Not Started',
            approvalStatus: 'Pending',
            assignedTo: 'Mukesh Sinha',
            description: 'Construction of primary wall for Wing 1',
            budget: '$50,000',
          },
          {
            id: '2012',
            name: 'Wall2',
            actNo: '20012',
            progress: 25,
            startDate: '2025-07-31',
            endDate: '2025-08-07',
            duration: 8,
            status: 'Not Started',
            approvalStatus: 'Pending',
            assignedTo: 'Mukesh Sinha',
            description: 'Construction of secondary wall for Wing 1',
            budget: '$50,000',
          },
        ],
      },
      {
        id: '202',
        name: 'Wing2',
        actNo: '2002',
        progress: 25,
        startDate: '2025-08-02',
        endDate: '2025-08-10',
        duration: 9,
        status: 'Not Started',
        approvalStatus: 'Pending',
        assignedTo: 'Sonalika',
        description: 'Construction of Wing 2 structure',
        budget: '$90,000',
        subActivities: [
          {
            id: '2021',
            name: 'Wall1',
            actNo: '20021',
            progress: 25,
            startDate: '2025-08-02',
            endDate: '2025-08-09',
            duration: 8,
            status: 'Not Started',
            approvalStatus: 'Pending',
            assignedTo: 'Sonalika',
            description: 'Construction of primary wall for Wing 2',
            budget: '$45,000',
          },
        ],
      },
    ],
  },
];

// Circular Progress Component
const CircularProgress = ({ progress, size = 44, strokeWidth = 4 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getProgressColor = (progress) => {
    if (progress >= 80) return '#10b981';
    if (progress >= 50) return '#f59e0b';
    if (progress >= 20) return '#3b82f6';
    return '#ef4444';
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#f8fafc',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: strokeWidth,
        borderColor: '#e5e7eb'
      }}>
        <View style={{
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          borderRadius: (size - strokeWidth * 2) / 2,
          backgroundColor: `${getProgressColor(progress)}20`,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{ 
            fontSize: 12, 
            fontWeight: '700', 
            color: getProgressColor(progress) 
          }}>
            {progress}%
          </Text>
        </View>
      </View>
    </View>
  );
};

// Status Indicator Component
const StatusIndicator = ({ status, approvalStatus }) => {
  const statusConfig = {
    'Not Started': { color: '#6b7280', bg: '#f3f4f6', icon: 'clock-outline' },
    'In Progress': { color: '#f59e0b', bg: '#fef3c7', icon: 'progress-clock' },
    'Completed': { color: '#16a34a', bg: '#dcfce7', icon: 'check-circle' },
  };

  const approvalConfig = {
    'Pending': { color: '#f59e0b' },
    'Approved': { color: '#16a34a' },
  };

  const config = statusConfig[status] || statusConfig['Not Started'];
  const approvalStyle = approvalConfig[approvalStatus] || approvalConfig['Pending'];

  return (
    <View style={{ alignItems: 'flex-end', gap: 4 }}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: config.bg 
      }}>
        <Icon name={config.icon} size={14} color={config.color} style={{ marginRight: 4 }} />
        <Text style={{ 
          fontSize: 12, 
          fontWeight: '600', 
          color: config.color 
        }}>
          {status}
        </Text>
      </View>
      <View style={{ 
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: `${approvalStyle.color}10`
      }}>
        <Text style={{ 
          fontSize: 11, 
          fontWeight: '600', 
          color: approvalStyle.color 
        }}>
          {approvalStatus}
        </Text>
      </View>
    </View>
  );
};

// Activity Card Component
const ActivityCard = ({ item, level = 0, toggleExpand, expandedItems }) => {
  const [showDetails, setShowDetails] = useState(false);
  const isExpanded = !!expandedItems[item.id];
  const hasSubActivities = item.subActivities && item.subActivities.length > 0;

  // Determine gradient colors based on level and expandability
  const gradientColors = level === 0 
    ? ['#dbeafe', '#bfdbfe'] // Level 0: Blue gradient
    : (level === 1 && hasSubActivities) 
      ? ['#eff6ff', '#dbeafe'] // Level 1 expandable: Lighter blue gradient
      : ['#f3f4f6', '#e5e7eb']; // Level 1 non-expandable or Level 2: Gray gradient

  return (
    <Animated.View entering={FadeInDown.delay(level * 100)} exiting={FadeOut}>
      <TouchableOpacity
        onPress={() => hasSubActivities && toggleExpand(item.id)}
        style={{
          borderRadius: 16,
          backgroundColor: level === 0 ? '#ffffff' : '#f8fafc',
          marginBottom: 16,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: level === 0 ? 0.1 : 0.05,
          shadowRadius: level === 0 ? 8 : 4,
          elevation: level === 0 ? 4 : 2,
          width: cardWidth,
        }}
      >
        {/* Header */}
        <LinearGradient
          colors={gradientColors}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 16 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Icon
                name={hasSubActivities ? (isExpanded ? 'chevron-down' : 'chevron-right') : 'minus'}
                size={20}
                color="#1e40af"
                style={{ marginRight: 8 }}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '700', 
                  color: '#1e40af',
                  marginBottom: 4
                }}>
                  {item.name}
                </Text>
                <Text style={{ 
                  fontSize: 12, 
                  color: '#3b82f6',
                  marginBottom: 8
                }}>
                  {item.actNo}
                </Text>
                {item.tags && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                    {item.tags.map((tag, index) => (
                      <View key={index} style={{ 
                        backgroundColor: '#bfdbfe', 
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12
                      }}>
                        <Text style={{ 
                          fontSize: 10, 
                          color: '#1e40af',
                          fontWeight: '600'
                        }}>
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
            <CircularProgress progress={item.progress} size={44} strokeWidth={4} />
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={{ padding: 16, gap: 12 }}>
          {/* Key Info */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Duration</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="calendar-range" size={16} color="#6b7280" />
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '600', 
                  color: '#1e40af',
                  marginLeft: 8
                }}>
                  {item.duration} days
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Budget</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="currency-usd" size={16} color="#6b7280" />
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '600', 
                  color: '#1e40af',
                  marginLeft: 8
                }}>
                  {item.budget || 'N/A'}
                </Text>
              </View>
            </View>
            <StatusIndicator status={item.status} approvalStatus={item.approvalStatus} />
          </View>

          {/* Dates */}
          <View style={{ 
            backgroundColor: '#f8fafc', 
            borderRadius: 12, 
            padding: 12,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>Start Date</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1e40af' }}>
                {item.startDate}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 4 }}>
              <Text style={{ fontSize: 12, color: '#6b7280' }}>End Date</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#1e40af' }}>
                {item.endDate}
              </Text>
            </View>
          </View>

          {/* Assigned To */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="account-group" size={16} color="#6b7280" />
            <Text style={{ 
              fontSize: 14, 
              color: '#6b7280',
              marginLeft: 8
            }}>
              Assigned to:{' '}
            </Text>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '600', 
              color: '#1e40af'
            }}>
              {item.assignedTo}
            </Text>
          </View>

          {/* Description */}
          {item.description && (
            <View style={{ 
              backgroundColor: '#eff6ff', 
              borderRadius: 12, 
              padding: 12
            }}>
              <Text style={{ 
                fontSize: 14, 
                color: '#374151',
                lineHeight: 20
              }}>
                {item.description}
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'flex-end', 
            gap: 8,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: '#f3f4f6'
          }}>
            <TouchableOpacity
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: '#bfdbfe',
                borderRadius: 12
              }}
              onPress={() => setShowDetails(!showDetails)}
            >
              <Icon name="information-outline" size={16} color="#3b82f6" />
              <Text style={{ 
                color: '#3b82f6', 
                fontWeight: '600',
                marginLeft: 8,
                fontSize: 14
              }}>
                Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: '#bfdbfe',
                borderRadius: 12
              }}
              onPress={() => console.log('Edit', item.id)}
            >
              <Icon name="pencil-outline" size={16} color="#3b82f6" />
              <Text style={{ 
                color: '#3b82f6', 
                fontWeight: '600',
                marginLeft: 8,
                fontSize: 14
              }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          {/* Expanded Details */}
          {showDetails && (
            <Animated.View entering={FadeInUp} style={{ 
              backgroundColor: '#f8fafc', 
              borderRadius: 12, 
              padding: 12,
              marginTop: 8
            }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#1e40af',
                marginBottom: 8
              }}>
                Additional Details
              </Text>
              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>
                  Activity ID: {item.id}
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>
                  Approval Status: {item.approvalStatus}
                </Text>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>
                  Progress: {item.progress}% Complete
                </Text>
              </View>
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>

      {/* Sub-activities */}
      {isExpanded && hasSubActivities && (
        <Animated.View entering={SlideInRight} style={{ marginTop: -8 }}>
          {item.subActivities.map((subItem) => (
            <ActivityCard
              key={subItem.id}
              item={subItem}
              level={level + 1}
              toggleExpand={toggleExpand}
              expandedItems={expandedItems}
            />
          ))}
        </Animated.View>
      )}
    </Animated.View>
  );
};

// Filter Modal Component
const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
  const [tempFilter, setTempFilter] = useState(currentFilter);

  const filters = ['All', 'Not Started', 'In Progress', 'Completed'];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
        <Animated.View entering={FadeInUp} style={{ 
          backgroundColor: '#ffffff', 
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '700', 
              color: '#1e40af' 
            }}>
              Filter Activities
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <View style={{ gap: 8 }}>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '600', 
              color: '#1e40af' 
            }}>
              Status
            </Text>
            {filters.map((status) => (
              <TouchableOpacity
                key={status}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: (tempFilter === status || (status === 'All' && !tempFilter)) 
                    ? '#bfdbfe' 
                    : '#ffffff'
                }}
                onPress={() => setTempFilter(status === 'All' ? null : status)}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: (tempFilter === status || (status === 'All' && !tempFilter))
                    ? '#3b82f6'
                    : '#374151'
                }}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            gap: 8, 
            marginTop: 16 
          }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#f3f4f6',
                padding: 12,
                borderRadius: 12,
                alignItems: 'center'
              }}
              onPress={onClose}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151' 
              }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#3b82f6',
                padding: 12,
                borderRadius: 12,
                alignItems: 'center'
              }}
              onPress={() => {
                onApplyFilter(tempFilter);
                onClose();
              }}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#ffffff' 
              }}>
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Main Activity Screen Component
const ActivityScreen = () => {
  const [expandedItems, setExpandedItems] = useState({
    '1': true,
    '2': true,
    '101': true,
    '201': true,
    '202': true,
    '2011': false,
    '2012': false,
    '2021': false,
  });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const toggleExpand = useCallback((id) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const sortedAndFilteredActivities = useMemo(() => {
    let result = [...activities];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.actNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus) {
      result = result.filter(item => item.status === filterStatus);
    }
    
    // Apply sorting
    return result.sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig, filterStatus, searchQuery]);

  if (isLoading) {
    return (
      <MainLayout title="Activity">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
          <View style={{ 
            backgroundColor: '#ffffff', 
            padding: 32, 
            borderRadius: 16,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4
          }}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={{ 
              marginTop: 16, 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#374151' 
            }}>
              Loading activities...
            </Text>
            <Text style={{ 
              marginTop: 8, 
              fontSize: 14, 
              color: '#6b7280' 
            }}>
              Please wait while we fetch your data
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Activity">
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        {/* Header */}
        <LinearGradient 
          colors={['#dbeafe', '#bfdbfe']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 16 }}
        >
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 12
          }}>
            <View>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '700', 
                color: '#1e40af' 
              }}>
                Project Activities
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 4
              }}>
                {sortedAndFilteredActivities.length} activities • {filterStatus || 'All statuses'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: 12 
                }}
                onPress={handleRefresh}
              >
                <Icon name="refresh" size={20} color="#1e40af" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: 12 
                }}
                onPress={() => console.log('Add activity')}
              >
                <Icon name="plus" size={20} color="#1e40af" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search and Filter Row */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ 
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: 12, 
              paddingHorizontal: 12,
              paddingVertical: 8
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="magnify" size={18} color="#3b82f6" style={{ marginRight: 8 }} />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search activities, IDs, or assignees..."
                  placeholderTextColor="#6b7280"
                  style={{ 
                    flex: 1, 
                    color: '#1e40af', 
                    fontSize: 14 
                  }}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Icon name="close-circle" size={18} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={{ 
                minWidth: 60,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => setShowFilterModal(true)}
            >
              <Icon name="filter-outline" size={16} color="#1e40af" />
              {filterStatus && (
                <View style={{ 
                  marginLeft: 8, 
                  backgroundColor: '#3b82f6', 
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8
                }}>
                  <Text style={{ 
                    fontSize: 12, 
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>
                    {filterStatus}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Sort Controls */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={{ marginTop: 12 }}
          >
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {[
                { key: 'name', label: 'Name' },
                { key: 'progress', label: 'Progress' },
                { key: 'status', label: 'Status' },
                { key: 'approvalStatus', label: 'Approval' }
              ].map(({ key, label }) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => handleSort(key)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 12,
                    paddingVertical: 8,
                    borderRadius: 12,
                    backgroundColor: sortConfig.key === key 
                      ? '#3b82f6' 
                      : 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  <Text style={{ 
                    fontSize: 12, 
                    color: sortConfig.key === key ? '#ffffff' : '#1e40af',
                    fontWeight: '600' 
                  }}>
                    {label}
                  </Text>
                  {sortConfig.key === key && (
                    <Icon
                      name={sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down'}
                      size={14}
                      color={sortConfig.key === key ? '#ffffff' : '#1e40af'}
                      style={{ marginLeft: 4 }}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </LinearGradient>

        {/* Activities List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {sortedAndFilteredActivities.length > 0 ? (
            sortedAndFilteredActivities.map((item) => (
              <ActivityCard
                key={item.id}
                item={item}
                level={0}
                toggleExpand={toggleExpand}
                expandedItems={expandedItems}
              />
            ))
          ) : (
            <Animated.View 
              entering={FadeInUp}
              style={{ 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: 32,
                backgroundColor: '#ffffff',
                borderRadius: 16,
                margin: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4
              }}
            >
              <Icon name="folder-search-outline" size={64} color="#d1d5db" />
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: '#6b7280',
                marginTop: 16
              }}>
                No activities found
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#9ca3af',
                marginTop: 8,
                textAlign: 'center'
              }}>
                {searchQuery ? 
                  'Try adjusting your search terms or filters' : 
                  'Get started by creating your first activity'
                }
              </Text>
              <TouchableOpacity 
                style={{ 
                  backgroundColor: '#3b82f6', 
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 12,
                  marginTop: 16
                }}
                onPress={() => console.log('Add first activity')}
              >
                <Text style={{ 
                  color: '#ffffff', 
                  fontWeight: '600',
                  fontSize: 14
                }}>
                  Create Activity
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
      </View>
    </MainLayout>
  );
};

export default ActivityScreen;