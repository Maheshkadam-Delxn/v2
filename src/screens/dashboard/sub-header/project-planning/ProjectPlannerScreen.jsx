// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Import icons

// export default function ProjectPlannerScreen() {
//   const [expandedSections, setExpandedSections] = useState({
//     xerPlanner: true,
//     construction: true,
//     general: true,
//     milestones: true,
//     contract: true,
//     monitoring: true
//   });

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   // Column width configuration
//   const colWidths = {
//     actions: Dimensions.get('window').width * 0.15,
//     name: Dimensions.get('window').width * 0.35,
//     actNo: Dimensions.get('window').width * 0.15,
//     startDate: Dimensions.get('window').width * 0.2,
//     endDate: Dimensions.get('window').width * 0.2,
//     duration: Dimensions.get('window').width * 0.1,
//   };

//   const totalWidth = Object.values(colWidths).reduce((sum, width) => sum + width, 0);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Activity</Text>
      
//       <View style={styles.scrollContainer}>
//         <ScrollView horizontal showsHorizontalScrollIndicator={true}>
//           <View style={{ width: totalWidth }}>
//             {/* Header Row */}
//             <View style={styles.headerRow}>
//               <Text style={[styles.headerCell, {width: colWidths.actions}]}>Actions</Text>
//               <Text style={[styles.headerCell, {width: colWidths.name}]}>Name</Text>
//               <Text style={[styles.headerCell, {width: colWidths.actNo}]}>Act. No.</Text>
//               <Text style={[styles.headerCell, {width: colWidths.startDate}]}>Start Date</Text>
//               <Text style={[styles.headerCell, {width: colWidths.endDate}]}>End Date</Text>
//               <Text style={[styles.headerCell, {width: colWidths.duration}]}>Duration</Text>
//             </View>

//             {/* Xer Planner Section */}
//             <TouchableOpacity onPress={() => toggleSection('xerPlanner')}>
//               <View style={styles.sectionHeader}>
//                 <View style={[styles.cell, {width: colWidths.actions, alignItems: 'center'}]}>
//                   <Ionicons 
//                     name={expandedSections.xerPlanner ? "chevron-down" : "chevron-forward"} 
//                     size={24} 
//                     color="#0066cc" 
//                   />
//                 </View>
//                 <Text style={[styles.sectionHeaderText, {width: totalWidth - colWidths.actions}]}>- Xer Planner</Text>
//               </View>
//             </TouchableOpacity>
            
//             {expandedSections.xerPlanner && (
//               <>
//                 {/* Construction of Private Villa */}
//                 <TouchableOpacity onPress={() => toggleSection('construction')}>
//                   <View style={[styles.row, styles.subSection]}>
//                     <View style={[styles.cell, {width: colWidths.actions, alignItems: 'center'}]}>
//                       <Ionicons 
//                         name={expandedSections.construction ? "chevron-down" : "chevron-forward"} 
//                         size={24} 
//                         color="#0066cc" 
//                       />
//                     </View>
//                     <Text style={[styles.cell, {width: colWidths.name}]}>- CONSTRUCTION OF PRIVATE VILLA (B + G+ PH) on Plot No. 700090504</Text>
//                     <Text style={[styles.cell, {width: colWidths.actNo}]}>57411</Text>
//                     <Text style={[styles.cell, {width: colWidths.startDate}]}></Text>
//                     <Text style={[styles.cell, {width: colWidths.endDate}]}></Text>
//                     <Text style={[styles.cell, {width: colWidths.duration}]}></Text>
//                   </View>
//                 </TouchableOpacity>
                
//                 {expandedSections.construction && (
//                   <>
//                     {/* General */}
//                     <TouchableOpacity onPress={() => toggleSection('general')}>
//                       <View style={[styles.row, styles.subSectionLevel2]}>
//                         <View style={[styles.cell, {width: colWidths.actions, alignItems: 'center'}]}>
//                           <Ionicons 
//                             name={expandedSections.general ? "chevron-down" : "chevron-forward"} 
//                             size={24} 
//                             color="#0066cc" 
//                           />
//                         </View>
//                         <Text style={[styles.cell, {width: colWidths.name}]}>- GENERAL</Text>
//                         <Text style={[styles.cell, {width: colWidths.actNo}]}>57412</Text>
//                         <Text style={[styles.cell, {width: colWidths.startDate}]}></Text>
//                         <Text style={[styles.cell, {width: colWidths.endDate}]}></Text>
//                         <Text style={[styles.cell, {width: colWidths.duration}]}></Text>
//                       </View>
//                     </TouchableOpacity>
                    
//                     {/* Milestones */}
//                     <TouchableOpacity onPress={() => toggleSection('milestones')}>
//                       <View style={[styles.row, styles.subSectionLevel2]}>
//                         <View style={[styles.cell, {width: colWidths.actions, alignItems: 'center'}]}>
//                           <Ionicons 
//                             name={expandedSections.milestones ? "chevron-down" : "chevron-forward"} 
//                             size={24} 
//                             color="#0066cc" 
//                           />
//                         </View>
//                         <Text style={[styles.cell, {width: colWidths.name}]}>- MILESTONES</Text>
//                         <Text style={[styles.cell, {width: colWidths.actNo}]}>57413</Text>
//                         <Text style={[styles.cell, {width: colWidths.startDate}]}></Text>
//                         <Text style={[styles.cell, {width: colWidths.endDate}]}></Text>
//                         <Text style={[styles.cell, {width: colWidths.duration}]}></Text>
//                       </View>
//                     </TouchableOpacity>
                    
//                     {expandedSections.milestones && (
//                       <>
//                         {/* Contract Milestone */}
//                         <TouchableOpacity onPress={() => toggleSection('contract')}>
//                           <View style={[styles.row, styles.subSectionLevel3]}>
//                             <View style={[styles.cell, {width: colWidths.actions, alignItems: 'center'}]}>
//                               <Ionicons 
//                                 name={expandedSections.contract ? "chevron-down" : "chevron-forward"} 
//                                 size={24} 
//                                 color="#0066cc" 
//                               />
//                             </View>
//                             <Text style={[styles.cell, {width: colWidths.name}]}>- CONTRACT MILESTONE</Text>
//                             <Text style={[styles.cell, {width: colWidths.actNo}]}>57414</Text>
//                             <Text style={[styles.cell, {width: colWidths.startDate}]}></Text>
//                             <Text style={[styles.cell, {width: colWidths.endDate}]}></Text>
//                             <Text style={[styles.cell, {width: colWidths.duration}]}></Text>
//                           </View>
//                         </TouchableOpacity>
                        
//                         {expandedSections.contract && (
//                           <>
//                             <View style={[styles.row, styles.subSectionLevel4]}>
//                               <Text style={[styles.cell, {width: colWidths.actions}]}></Text>
//                               <Text style={[styles.cell, {width: colWidths.name}]}>- Commencement Date</Text>
//                               <Text style={[styles.cell, {width: colWidths.actNo}]}>J148-GMS-GN-G-RM1000</Text>
//                               <Text style={[styles.cell, {width: colWidths.startDate}]}>2025-01-25 07:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.endDate}]}>2025-01-25 07:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.duration}]}>1</Text>
//                             </View>
//                             <View style={[styles.row, styles.subSectionLevel4]}>
//                               <Text style={[styles.cell, {width: colWidths.actions}]}></Text>
//                               <Text style={[styles.cell, {width: colWidths.name}]}>- Project Complete</Text>
//                               <Text style={[styles.cell, {width: colWidths.actNo}]}>J148-GMS-GN-G-RM1022</Text>
//                               <Text style={[styles.cell, {width: colWidths.startDate}]}>2026-09-24 17:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.endDate}]}>2026-09-24 17:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.duration}]}>1</Text>
//                             </View>
//                           </>
//                         )}
                        
//                         {/* Monitoring Milestone */}
//                         <TouchableOpacity onPress={() => toggleSection('monitoring')}>
//                           <View style={[styles.row, styles.subSectionLevel3]}>
//                             <View style={[styles.cell, {width: colWidths.actions, alignItems: 'center'}]}>
//                               <Ionicons 
//                                 name={expandedSections.monitoring ? "chevron-down" : "chevron-forward"} 
//                                 size={24} 
//                                 color="#0066cc" 
//                               />
//                             </View>
//                             <Text style={[styles.cell, {width: colWidths.name}]}>- MONITORING MILESTONE</Text>
//                             <Text style={[styles.cell, {width: colWidths.actNo}]}>57415</Text>
//                             <Text style={[styles.cell, {width: colWidths.startDate}]}></Text>
//                             <Text style={[styles.cell, {width: colWidths.endDate}]}></Text>
//                             <Text style={[styles.cell, {width: colWidths.duration}]}></Text>
//                           </View>
//                         </TouchableOpacity>
                        
//                         {expandedSections.monitoring && (
//                           <>
//                             <View style={[styles.row, styles.subSectionLevel4]}>
//                               <Text style={[styles.cell, {width: colWidths.actions}]}></Text>
//                               <Text style={[styles.cell, {width: colWidths.name}]}>- Complete Structural Club House</Text>
//                               <Text style={[styles.cell, {width: colWidths.actNo}]}>J148-GMM-GN-G-MM1017</Text>
//                               <Text style={[styles.cell, {width: colWidths.startDate}]}>2025-10-23 17:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.endDate}]}>2025-10-23 17:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.duration}]}>1</Text>
//                             </View>
//                             <View style={[styles.row, styles.subSectionLevel4]}>
//                               <Text style={[styles.cell, {width: colWidths.actions}]}></Text>
//                               <Text style={[styles.cell, {width: colWidths.name}]}>- Complete Structural Main Villa</Text>
//                               <Text style={[styles.cell, {width: colWidths.actNo}]}>J148-GMM-GN-G-MM1018</Text>
//                               <Text style={[styles.cell, {width: colWidths.startDate}]}>2026-06-03 17:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.endDate}]}>2026-06-03 17:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.duration}]}>1</Text>
//                             </View>
//                             <View style={[styles.row, styles.subSectionLevel4]}>
//                               <Text style={[styles.cell, {width: colWidths.actions}]}></Text>
//                               <Text style={[styles.cell, {width: colWidths.name}]}>- Complete Structural Service Block</Text>
//                               <Text style={[styles.cell, {width: colWidths.actNo}]}>J148-GMM-GN-G-MM1019</Text>
//                               <Text style={[styles.cell, {width: colWidths.startDate}]}>2025-11-27 17:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.endDate}]}>2025-11-27 17:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.duration}]}>1</Text>
//                             </View>
//                             <View style={[styles.row, styles.subSectionLevel4]}>
//                               <Text style={[styles.cell, {width: colWidths.actions}]}></Text>
//                               <Text style={[styles.cell, {width: colWidths.name}]}>- Complete Structural External Works</Text>
//                               <Text style={[styles.cell, {width: colWidths.actNo}]}>J148-GMM-GN-G-MM1020</Text>
//                               <Text style={[styles.cell, {width: colWidths.startDate}]}>2026-05-14 17:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.endDate}]}>2026-05-14 17:00</Text>
//                               <Text style={[styles.cell, {width: colWidths.duration}]}>Need</Text>
//                             </View>
//                           </>
//                         )}
//                       </>
//                     )}
//                   </>
//                 )}
//               </>
//             )}
//           </View>
//         </ScrollView>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e6f2ff',
//     padding: 10,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     color: '#0066cc',
//     textAlign: 'center',
//   },
//   scrollContainer: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#99ccff',
//     borderRadius: 8,
//     backgroundColor: '#ffffff',
//     overflow: 'hidden',
//   },
//   headerRow: {
//     flexDirection: 'row',
//     backgroundColor: '#0077cc',
//     paddingVertical: 12,
//     borderBottomWidth: 2,
//     borderBottomColor: '#005599',
//   },
//   headerCell: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: '#ffffff',
//     paddingHorizontal: 4,
//     textAlign: 'center',
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     backgroundColor: '#cce5ff',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#99ccff',
//     alignItems: 'center',
//   },
//   sectionHeaderText: {
//     fontWeight: 'bold',
//     color: '#0066cc',
//     paddingHorizontal: 4,
//   },
//   row: {
//     flexDirection: 'row',
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e6eeff',
//     alignItems: 'center',
//   },
//   subSection: {
//     backgroundColor: '#f0f8ff',
//   },
//   subSectionLevel2: {
//     backgroundColor: '#e6f2ff',
//   },
//   subSectionLevel3: {
//     backgroundColor: '#d9ebff',
//   },
//   subSectionLevel4: {
//     backgroundColor: '#cce5ff',
//   },
//   cell: {
//     fontSize: 12,
//     color: '#004080',
//     paddingHorizontal: 4,
//     textAlign: 'left',
//   },
// });

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

// // Updated activities data with hierarchical structure
// const activities = [
//   {
//     id: '1',
//     name: 'Xer Planner',
//     actNo: 'Xer Planner',
//     progress: 100,
//     startDate: '2025-01-01',
//     endDate: '2025-12-31',
//     duration: 365,
//     status: 'Completed',
//     priority: 'High',
//     assignedTo: 'Project Manager',
//     description: 'Main project planning and management',
//     tags: ['Planning', 'Management'],
//     budget: '$500,000',
//     subActivities: [
//       {
//         id: '2',
//         name: 'CONSTRUCTION OF PRIVATE VILLA (B + G+ PH) on Plot No. 700090504',
//         actNo: '57411',
//         progress: 75,
//         startDate: '2025-02-01',
//         endDate: '2025-11-30',
//         duration: 303,
//         status: 'In Progress',
//         priority: 'High',
//         assignedTo: 'Construction Team',
//         description: 'Main construction project for private villa',
//         tags: ['Construction', 'Villa'],
//         budget: '$450,000',
//         subActivities: [
//           {
//             id: '3',
//             name: 'GENERAL',
//             actNo: '57412',
//             progress: 80,
//             startDate: '2025-02-01',
//             endDate: '2025-03-15',
//             duration: 43,
//             status: 'In Progress',
//             priority: 'Medium',
//             assignedTo: 'General Contractor',
//             description: 'General construction activities',
//             budget: '$100,000',
//             subActivities: []
//           },
//           {
//             id: '4',
//             name: 'MILESTONES',
//             actNo: '57413',
//             progress: 60,
//             startDate: '2025-03-16',
//             endDate: '2025-06-30',
//             duration: 107,
//             status: 'In Progress',
//             priority: 'High',
//             assignedTo: 'Project Manager',
//             description: 'Key project milestones',
//             budget: '$50,000',
//             subActivities: [
//               {
//                 id: '5',
//                 name: 'CONTRACT MILESTONE',
//                 actNo: '57414',
//                 progress: 100,
//                 startDate: '2025-03-16',
//                 endDate: '2025-04-15',
//                 duration: 31,
//                 status: 'Completed',
//                 priority: 'High',
//                 assignedTo: 'Legal Team',
//                 description: 'Contract-related milestones',
//                 budget: '$10,000',
//                 subActivities: []
//               },
//               {
//                 id: '6',
//                 name: 'MONITORING MILESTONE',
//                 actNo: '57415',
//                 progress: 30,
//                 startDate: '2025-04-16',
//                 endDate: '2025-06-30',
//                 duration: 76,
//                 status: 'In Progress',
//                 priority: 'Medium',
//                 assignedTo: 'Quality Assurance',
//                 description: 'Progress monitoring milestones',
//                 budget: '$15,000',
//                 subActivities: []
//               }
//             ]
//           },
//           {
//             id: '7',
//             name: 'PRELIMINARIES',
//             actNo: '57416',
//             progress: 90,
//             startDate: '2025-02-01',
//             endDate: '2025-02-28',
//             duration: 28,
//             status: 'In Progress',
//             priority: 'Medium',
//             assignedTo: 'Site Preparation Team',
//             description: 'Preliminary site activities',
//             budget: '$75,000',
//             subActivities: [
//               {
//                 id: '8',
//                 name: 'PRELIMINARY DELIVERABLES',
//                 actNo: '57417',
//                 progress: 100,
//                 startDate: '2025-02-01',
//                 endDate: '2025-02-15',
//                 duration: 15,
//                 status: 'Completed',
//                 priority: 'Medium',
//                 assignedTo: 'Documentation Team',
//                 description: 'Initial project deliverables',
//                 budget: '$25,000',
//                 subActivities: []
//               },
//               {
//                 id: '9',
//                 name: 'SITE ACCESS & SURVEY',
//                 actNo: '57418',
//                 progress: 100,
//                 startDate: '2025-02-05',
//                 endDate: '2025-02-20',
//                 duration: 16,
//                 status: 'Completed',
//                 priority: 'High',
//                 assignedTo: 'Survey Team',
//                 description: 'Site access and surveying',
//                 budget: '$30,000',
//                 subActivities: []
//               },
//               {
//                 id: '10',
//                 name: 'SITE OFFICE & SIGNAGE',
//                 actNo: '57419',
//                 progress: 75,
//                 startDate: '2025-02-10',
//                 endDate: '2025-02-28',
//                 duration: 19,
//                 status: 'In Progress',
//                 priority: 'Medium',
//                 assignedTo: 'Admin Team',
//                 description: 'Site office setup and signage',
//                 budget: '$20,000',
//                 subActivities: []
//               }
//             ]
//           },
//           {
//             id: '11',
//             name: 'ENGINEERING',
//             actNo: '57420',
//             progress: 50,
//             startDate: '2025-03-01',
//             endDate: '2025-07-31',
//             duration: 153,
//             status: 'In Progress',
//             priority: 'High',
//             assignedTo: 'Engineering Team',
//             description: 'Engineering and design activities',
//             budget: '$125,000',
//             subActivities: []
//           },
//           {
//             id: '12',
//             name: 'PROCUREMENT',
//             actNo: '57421',
//             progress: 40,
//             startDate: '2025-03-15',
//             endDate: '2025-08-31',
//             duration: 170,
//             status: 'In Progress',
//             priority: 'High',
//             assignedTo: 'Procurement Team',
//             description: 'Materials and equipment procurement',
//             budget: '$100,000',
//             subActivities: []
//           }
//         ]
//       }
//     ]
//   }
// ];

// // Circular Progress Component
// const CircularProgress = ({ progress, size = 44, strokeWidth = 4 }) => {
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
//           backgroundColor: getProgressColor(progress) + '20',
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
// const StatusIndicator = ({ status, priority }) => {
//   const statusConfig = {
//     'Not Started': { color: '#6b7280', bg: '#f3f4f6', icon: 'clock-outline' },
//     'In Progress': { color: '#f59e0b', bg: '#fef3c7', icon: 'progress-clock' },
//     'Completed': { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
//   };

//   const priorityConfig = {
//     'Low': { color: '#10b981' },
//     'Medium': { color: '#f59e0b' },
//     'High': { color: '#ef4444' },
//     'Critical': { color: '#dc2626' },
//   };

//   const config = statusConfig[status] || statusConfig['Not Started'];
//   const priorityStyle = priorityConfig[priority] || priorityConfig['Medium'];

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
//         backgroundColor: priorityStyle.color + '10'
//       }}>
//         <Text style={{ 
//           fontSize: 11, 
//           fontWeight: '600', 
//           color: priorityStyle.color 
//         }}>
//           {priority}
//         </Text>
//       </View>
//     </View>
//   );
// };

// // Helper function to get all child IDs recursively
// const getAllChildIds = (activity) => {
//   let childIds = [];
//   if (activity.subActivities && activity.subActivities.length > 0) {
//     activity.subActivities.forEach(subActivity => {
//       childIds.push(subActivity.id);
//       childIds = [...childIds, ...getAllChildIds(subActivity)];
//     });
//   }
//   return childIds;
// };

// // Activity Card Component with improved hierarchy display
// const ActivityCard = ({ item, level = 0, toggleExpand, expandedItems }) => {
//   const [showDetails, setShowDetails] = useState(false);
//   const hasChildren = item.subActivities && item.subActivities.length > 0;
//   const isExpanded = expandedItems[item.id];
//   const indentWidth = Math.min(level * 24, 120);

//   return (
//     <Animated.View entering={FadeInDown.delay(level * 100)}>
//       <TouchableOpacity
//         onPress={() => hasChildren && toggleExpand(item.id)}
//         style={{
//           borderRadius: 20,
//           backgroundColor: level === 0 ? '#ffffff' : '#f8fafc',
//           marginBottom: 16,
//           overflow: 'hidden',
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: level === 0 ? 0.1 : 0.05,
//           shadowRadius: level === 0 ? 8 : 4,
//           elevation: level === 0 ? 4 : 2,
//           marginLeft: indentWidth,
//         }}
//       >
//         {/* Header */}
//         <LinearGradient
//           colors={level === 0 ? ['#3b82f6', '#2563eb'] : ['#6b7280', '#4b5563']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={{ padding: 20 }}
//         >
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
//               {hasChildren && (
//                 <Icon
//                   name={isExpanded ? 'chevron-down' : 'chevron-right'}
//                   size={24}
//                   color="#ffffff"
//                   style={{ marginRight: 12 }}
//                 />
//               )}
//               {!hasChildren && (
//                 <Icon
//                   name="circle-small"
//                   size={24}
//                   color="#ffffff"
//                   style={{ marginRight: 12, opacity: 0.7 }}
//                 />
//               )}
//               <View style={{ flex: 1 }}>
//                 <Text style={{ 
//                   fontSize: level === 0 ? 18 : 16, 
//                   fontWeight: '700', 
//                   color: '#ffffff',
//                   marginBottom: 4
//                 }}>
//                   {item.name}
//                 </Text>
//                 <Text style={{ 
//                   fontSize: 13, 
//                   color: 'rgba(255, 255, 255, 0.8)',
//                   marginBottom: 8
//                 }}>
//                   {item.actNo}
//                 </Text>
//                 {item.tags && (
//                   <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
//                     {item.tags.map((tag, index) => (
//                       <View key={index} style={{ 
//                         backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                         paddingHorizontal: 8,
//                         paddingVertical: 4,
//                         borderRadius: 12
//                       }}>
//                         <Text style={{ 
//                           fontSize: 11, 
//                           color: '#ffffff',
//                           fontWeight: '500'
//                         }}>
//                           {tag}
//                         </Text>
//                       </View>
//                     ))}
//                   </View>
//                 )}
//               </View>
//             </View>
//             <CircularProgress progress={item.progress} size={50} strokeWidth={5} />
//           </View>
//         </LinearGradient>

//         {/* Content */}
//         <View style={{ padding: 20, gap: 16 }}>
//           {/* Key Info */}
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <View style={{ flex: 1, gap: 4 }}>
//               <Text style={{ fontSize: 12, color: '#6b7280' }}>Duration</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Icon name="calendar-range" size={16} color="#6b7280" />
//                 <Text style={{ 
//                   fontSize: 14, 
//                   fontWeight: '600', 
//                   color: '#374151',
//                   marginLeft: 8
//                 }}>
//                   {item.duration} days
//                 </Text>
//               </View>
//             </View>
//             <View style={{ flex: 1, gap: 4 }}>
//               <Text style={{ fontSize: 12, color: '##6b7280' }}>Budget</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Icon name="currency-usd" size={16} color="#6b7280" />
//                 <Text style={{ 
//                   fontSize: 14, 
//                   fontWeight: '600', 
//                   color: '#374151',
//                   marginLeft: 8
//                 }}>
//                   {item.budget || 'N/A'}
//                 </Text>
//               </View>
//             </View>
//             <StatusIndicator status={item.status} priority={item.priority} />
//           </View>

//           {/* Dates */}
//           <View style={{ 
//             backgroundColor: '#f8fafc', 
//             borderRadius: 16, 
//             padding: 16,
//             flexDirection: 'row',
//             justifyContent: 'space-between'
//           }}>
//             <View style={{ gap: 4 }}>
//               <Text style={{ fontSize: 12, color: '#6b7280' }}>Start Date</Text>
//               <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
//                 {item.startDate}
//               </Text>
//             </View>
//             <View style={{ alignItems: 'flex-end', gap: 4 }}>
//               <Text style={{ fontSize: 12, color: '#6b7280' }}>End Date</Text>
//               <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
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
//               color: '#374151'
//             }}>
//               {item.assignedTo}
//             </Text>
//           </View>

//           {/* Description */}
//           {item.description && (
//             <View style={{ 
//               backgroundColor: '#eff6ff', 
//               borderRadius: 16, 
//               padding: 16
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
//               onPress={() => setShowDetails(!showDetails)}
//             >
//               <Icon name="information-outline" size={16} color="#2563eb" />
//               <Text style={{ 
//                 color: '#2563eb', 
//                 fontWeight: '600',
//                 marginLeft: 8
//               }}>
//                 Details
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
//               onPress={() => console.log('Edit', item.id)}
//             >
//               <Icon name="pencil-outline" size={16} color="#059669" />
//               <Text style={{ 
//                 color: '#059669', 
//                 fontWeight: '600',
//                 marginLeft: 8
//               }}>
//                 Edit
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* Expanded Details */}
//           {showDetails && (
//             <Animated.View entering={FadeInUp} style={{ 
//               backgroundColor: '#f8fafc', 
//               borderRadius: 16, 
//               padding: 16,
//               marginTop: 8
//             }}>
//               <Text style={{ 
//                 fontSize: 14, 
//                 fontWeight: '600', 
//                 color: '#374151',
//                 marginBottom: 8
//               }}>
//                 Additional Details
//               </Text>
//               <View style={{ gap: 4 }}>
//                 <Text style={{ fontSize: 12, color: '#6b7280' }}>
//                   Activity ID: {item.id}
//                 </Text>
//                 <Text style={{ fontSize: 12, color: '#6b7280' }}>
//                   Priority Level: {item.priority}
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
//       {isExpanded && hasChildren && (
//         <Animated.View entering={SlideInRight} style={{ marginTop: -8 }}>
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
//               Filter Activities
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

// // Find activity by ID in the hierarchy
// const findActivityById = (id, activitiesList) => {
//   for (const activity of activitiesList) {
//     if (activity.id === id) return activity;
//     if (activity.subActivities && activity.subActivities.length > 0) {
//       const found = findActivityById(id, activity.subActivities);
//       if (found) return found;
//     }
//   }
//   return null;
// };

// // Main Activity Screen Component
// const ActivityScreen = () => {
//   const [expandedItems, setExpandedItems] = useState({ '1': true, '2': true });
//   const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
//   const [filterStatus, setFilterStatus] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilterModal, setShowFilterModal] = useState(false);

//   const toggleExpand = useCallback((id) => {
//     setExpandedItems(prev => {
//       const newState = { ...prev };
//       const activity = findActivityById(id, activities);
      
//       if (newState[id]) {
//         // If we're collapsing this item, also collapse all its children
//         const childIds = getAllChildIds(activity);
//         childIds.forEach(childId => {
//           newState[childId] = false;
//         });
//       }
      
//       // Toggle the current item
//       newState[id] = !newState[id];
//       return newState;
//     });
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
//           colors={['#3b82f6', '#2563eb', '#1e40af']} 
//           start={{ x: 0, y: 0 }}
//           end={{ x: 1, y: 1 }}
//           style={{ padding: 20 }}
//         >
//           <View style={{ 
//             flexDirection: 'row', 
//             justifyContent: 'space-between', 
//             alignItems: 'center',
//             marginBottom: 20
//           }}>
//             <View>
//               <Text style={{ 
//                 fontSize: 24, 
//                 fontWeight: '700', 
//                 color: '#ffffff' 
//               }}>
//                 Project Activities
//               </Text>
//               <Text style={{ 
//                 fontSize: 14, 
//                 color: 'rgba(255, 255, 255, 0.8)',
//                 marginTop: 4
//               }}>
//                 {sortedAndFilteredActivities.length} activities • {filterStatus || 'All statuses'}
//               </Text>
//             </View>
//             <View style={{ flexDirection: 'row', gap: 8 }}>
//               <TouchableOpacity
//                 style={{ 
//                   padding: 12, 
//                   backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                   borderRadius: 16 
//                 }}
//                 onPress={handleRefresh}
//               >
//                 <Icon name="refresh" size={20} color="#ffffff" />
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{ 
//                   padding: 12, 
//                   backgroundColor: 'rgba(255, 255, 255, 0.2)', 
//                   borderRadius: 16 
//                 }}
//                 onPress={() => console.log('Add activity')}
//               >
//                 <Icon name="plus" size={20} color="#ffffff" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Search Bar */}
//           <View style={{ 
//             backgroundColor: 'rgba(255, 255, 255, 0.1)', 
//             borderRadius: 16, 
//             padding: 16,
//             marginBottom: 16
//           }}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <Icon name="magnify" size={20} color="#ffffff" style={{ marginRight: 12 }} />
//               <TextInput
//                 value={searchQuery}
//                 onChangeText={setSearchQuery}
//                 placeholder="Search activities, IDs, or assignees..."
//                 placeholderTextColor="rgba(255, 255, 255, 0.6)"
//                 style={{ 
//                   flex: 1, 
//                   color: '#ffffff', 
//                   fontSize: 16 
//                 }}
//               />
//               {searchQuery.length > 0 && (
//                 <TouchableOpacity onPress={() => setSearchQuery('')}>
//                   <Icon name="close-circle" size={20} color="rgba(255, 255, 255, 0.6)" />
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>

//           {/* Filter and Sort Controls */}
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//             <TouchableOpacity
//               style={{ 
//                 flexDirection: 'row', 
//                 alignItems: 'center',
//                 backgroundColor: 'rgba(255, 255, 255, 0.2)',
//                 paddingHorizontal: 16,
//                 paddingVertical: 8,
//                 borderRadius: 16
//               }}
//               onPress={() => setShowFilterModal(true)}
//             >
//               <Icon name="filter-outline" size={16} color="#ffffff" />
//               <Text style={{ 
//                 color: '#ffffff', 
//                 fontWeight: '600',
//                 marginLeft: 8
//               }}>
//                 Filter
//               </Text>
//               {filterStatus && (
//                 <View style={{ 
//                   marginLeft: 8, 
//                   backgroundColor: 'rgba(255, 255, 255, 0.3)', 
//                   paddingHorizontal: 8,
//                   paddingVertical: 4,
//                   borderRadius: 12
//                 }}>
//                   <Text style={{ 
//                     fontSize: 12, 
//                     color: '#ffffff' 
//                   }}>
//                     {filterStatus}
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>

//             <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexDirection: 'row' }}>
//               {[
//                 { key: 'name', label: 'Name' },
//                 { key: 'progress', label: 'Progress' },
//                 { key: 'status', label: 'Status' },
//                 { key: 'priority', label: 'Priority' }
//               ].map(({ key, label }) => (
//                 <TouchableOpacity
//                   key={key}
//                   onPress={() => handleSort(key)}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     paddingHorizontal: 12,
//                     paddingVertical: 8,
//                     borderRadius: 16,
//                     marginRight: 8,
//                     backgroundColor: sortConfig.key === key 
//                       ? 'rgba(255, 255, 255, 0.3)' 
//                       : 'rgba(255, 255, 255, 0.1)'
//                   }}
//                 >
//                   <Text style={{ 
//                     fontSize: 12, 
//                     color: '#ffffff', 
//                     fontWeight: '600' 
//                   }}>
//                     {label}
//                   </Text>
//                   {sortConfig.key === key && (
//                     <Icon
//                       name={sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down'}
//                       size={14}
//                       color="#ffffff"
//                       style={{ marginLeft: 4 }}
//                     />
//                   )}
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           </View>
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
//                 padding: 40,
//                 backgroundColor: '#ffffff',
//                 borderRadius: 24,
//                 margin: 16
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
//                   borderRadius: 16,
//                   marginTop: 16
//                 }}
//                 onPress={() => console.log('Add first activity')}
//               >
//                 <Text style={{ 
//                   color: '#ffffff', 
//                   fontWeight: '600' 
//                 }}>
//                   Add Activity
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

// Updated activities data with hierarchical structure
const activities = [
  {
    id: '1',
    name: 'Xer Planner',
    actNo: 'Xer Planner',
    progress: 100,
    startDate: '2025-01-01',
    endDate: '2025-12-31',
    duration: 365,
    status: 'Completed',
    priority: 'High',
    assignedTo: 'Project Manager',
    description: 'Main project planning and management',
    tags: ['Planning', 'Management'],
    budget: '$500,000',
    subActivities: [
      {
        id: '2',
        name: 'CONSTRUCTION OF PRIVATE VILLA (B + G+ PH) on Plot No. 700090504',
        actNo: '57411',
        progress: 75,
        startDate: '2025-02-01',
        endDate: '2025-11-30',
        duration: 303,
        status: 'In Progress',
        priority: 'High',
        assignedTo: 'Construction Team',
        description: 'Main construction project for private villa',
        tags: ['Construction', 'Villa'],
        budget: '$450,000',
        subActivities: [
          {
            id: '3',
            name: 'GENERAL',
            actNo: '57412',
            progress: 80,
            startDate: '2025-02-01',
            endDate: '2025-03-15',
            duration: 43,
            status: 'In Progress',
            priority: 'Medium',
            assignedTo: 'General Contractor',
            description: 'General construction activities',
            budget: '$100,000',
            subActivities: []
          },
          {
            id: '4',
            name: 'MILESTONES',
            actNo: '57413',
            progress: 60,
            startDate: '2025-03-16',
            endDate: '2025-06-30',
            duration: 107,
            status: 'In Progress',
            priority: 'High',
            assignedTo: 'Project Manager',
            description: 'Key project milestones',
            budget: '$50,000',
            subActivities: [
              {
                id: '5',
                name: 'CONTRACT MILESTONE',
                actNo: '57414',
                progress: 100,
                startDate: '2025-03-16',
                endDate: '2025-04-15',
                duration: 31,
                status: 'Completed',
                priority: 'High',
                assignedTo: 'Legal Team',
                description: 'Contract-related milestones',
                budget: '$10,000',
                subActivities: []
              },
              {
                id: '6',
                name: 'MONITORING MILESTONE',
                actNo: '57415',
                progress: 30,
                startDate: '2025-04-16',
                endDate: '2025-06-30',
                duration: 76,
                status: 'In Progress',
                priority: 'Medium',
                assignedTo: 'Quality Assurance',
                description: 'Progress monitoring milestones',
                budget: '$15,000',
                subActivities: []
              }
            ]
          },
          {
            id: '7',
            name: 'PRELIMINARIES',
            actNo: '57416',
            progress: 90,
            startDate: '2025-02-01',
            endDate: '2025-02-28',
            duration: 28,
            status: 'In Progress',
            priority: 'Medium',
            assignedTo: 'Site Preparation Team',
            description: 'Preliminary site activities',
            budget: '$75,000',
            subActivities: [
              {
                id: '8',
                name: 'PRELIMINARY DELIVERABLES',
                actNo: '57417',
                progress: 100,
                startDate: '2025-02-01',
                endDate: '2025-02-15',
                duration: 15,
                status: 'Completed',
                priority: 'Medium',
                assignedTo: 'Documentation Team',
                description: 'Initial project deliverables',
                budget: '$25,000',
                subActivities: []
              },
              {
                id: '9',
                name: 'SITE ACCESS & SURVEY',
                actNo: '57418',
                progress: 100,
                startDate: '2025-02-05',
                endDate: '2025-02-20',
                duration: 16,
                status: 'Completed',
                priority: 'High',
                assignedTo: 'Survey Team',
                description: 'Site access and surveying',
                budget: '$30,000',
                subActivities: []
              },
              {
                id: '10',
                name: 'SITE OFFICE & SIGNAGE',
                actNo: '57419',
                progress: 75,
                startDate: '2025-02-10',
                endDate: '2025-02-28',
                duration: 19,
                status: 'In Progress',
                priority: 'Medium',
                assignedTo: 'Admin Team',
                description: 'Site office setup and signage',
                budget: '$20,000',
                subActivities: []
              }
            ]
          },
          {
            id: '11',
            name: 'ENGINEERING',
            actNo: '57420',
            progress: 50,
            startDate: '2025-03-01',
            endDate: '2025-07-31',
            duration: 153,
            status: 'In Progress',
            priority: 'High',
            assignedTo: 'Engineering Team',
            description: 'Engineering and design activities',
            budget: '$125,000',
            subActivities: []
          },
          {
            id: '12',
            name: 'PROCUREMENT',
            actNo: '57421',
            progress: 40,
            startDate: '2025-03-15',
            endDate: '2025-08-31',
            duration: 170,
            status: 'In Progress',
            priority: 'High',
            assignedTo: 'Procurement Team',
            description: 'Materials and equipment procurement',
            budget: '$100,000',
            subActivities: []
          }
        ]
      }
    ]
  }
];

// Circular Progress Component
const CircularProgress = ({ progress, size = 44, strokeWidth = 4 }) => {
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
const StatusIndicator = ({ status, priority }) => {
  const statusConfig = {
    'Not Started': { color: '#6b7280', bg: '#f3f4f6', icon: 'clock-outline' },
    'In Progress': { color: '#f59e0b', bg: '#fef3c7', icon: 'progress-clock' },
    'Completed': { color: '#16a34a', bg: '#dcfce7', icon: 'check-circle' },
  };

  const priorityConfig = {
    'Low': { color: '#10b981' },
    'Medium': { color: '#f59e0b' },
    'High': { color: '#ef4444' },
    'Critical': { color: '#dc2626' },
  };

  const config = statusConfig[status] || statusConfig['Not Started'];
  const priorityStyle = priorityConfig[priority] || priorityConfig['Medium'];

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
        backgroundColor: `${priorityStyle.color}10`
      }}>
        <Text style={{ 
          fontSize: 11, 
          fontWeight: '600', 
          color: priorityStyle.color 
        }}>
          {priority}
        </Text>
      </View>
    </View>
  );
};

// Helper function to get all child IDs recursively
const getAllChildIds = (activity) => {
  let childIds = [];
  if (activity.subActivities && activity.subActivities.length > 0) {
    activity.subActivities.forEach(subActivity => {
      childIds.push(subActivity.id);
      childIds = [...childIds, ...getAllChildIds(subActivity)];
    });
  }
  return childIds;
};

// Activity Card Component with improved hierarchy display
const ActivityCard = ({ item, level = 0, toggleExpand, expandedItems }) => {
  const [showDetails, setShowDetails] = useState(false);
  const hasChildren = item.subActivities && item.subActivities.length > 0;
  const isExpanded = expandedItems[item.id];
  const indentWidth = Math.min(level * 24, 120);

  return (
    <Animated.View entering={FadeInDown.delay(level * 100)} exiting={FadeOut}>
      <TouchableOpacity
        onPress={() => hasChildren && toggleExpand(item.id)}
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
          marginLeft: indentWidth,
          width: cardWidth,
        }}
      >
        {/* Header */}
        <LinearGradient
          colors={level === 0 ? ['#dbeafe', '#bfdbfe'] : ['#f3f4f6', '#e5e7eb']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 16 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              {hasChildren && (
                <Icon
                  name={isExpanded ? 'chevron-down' : 'chevron-right'}
                  size={20}
                  color="#1e40af"
                  style={{ marginRight: 8 }}
                />
              )}
              {!hasChildren && (
                <Icon
                  name="circle-small"
                  size={20}
                  color="#1e40af"
                  style={{ marginRight: 8, opacity: 0.7 }}
                />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: level === 0 ? 16 : 14, 
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
            <StatusIndicator status={item.status} priority={item.priority} />
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
                  Priority Level: {item.priority}
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
      {isExpanded && hasChildren && (
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

// Find activity by ID in the hierarchy
const findActivityById = (id, activitiesList) => {
  for (const activity of activitiesList) {
    if (activity.id === id) return activity;
    if (activity.subActivities && activity.subActivities.length > 0) {
      const found = findActivityById(id, activity.subActivities);
      if (found) return found;
    }
  }
  return null;
};

// Main Activity Screen Component
const ActivityScreen = () => {
  const [expandedItems, setExpandedItems] = useState({ '1': true, '2': true });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const toggleExpand = useCallback((id) => {
    setExpandedItems(prev => {
      const newState = { ...prev };
      const activity = findActivityById(id, activities);
      
      if (newState[id]) {
        // If we're collapsing this item, also collapse all its children
        const childIds = getAllChildIds(activity);
        childIds.forEach(childId => {
          newState[childId] = false;
        });
      }
      
      // Toggle the current item
      newState[id] = !newState[id];
      return newState;
    });
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
                { key: 'priority', label: 'Priority' }
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
