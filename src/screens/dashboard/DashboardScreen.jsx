
// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import MainLayout from '../components/MainLayout';
// import { PieChart, LineChart } from 'react-native-gifted-charts';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// const colors = {
//   primary: '#1E3A8A',
//   secondary: '#6366F1',
//   success: '#10B981',
//   warning: '#F59E0B',
//   danger: '#EF4444',
//   info: '#3B82F6',
//   background: '#F8FAFC',
//   surface: '#FFFFFF',
//   surfaceVariant: '#F1F5F9',
//   text: '#0F172A',
//   textSecondary: '#475569',
//   textMuted: '#64748B',
//   border: '#E2E8F0',
//   accent: '#8B5CF6',
//   highlight: '#fffef9ff', // Added for highlighting duration and budget
// };

// const filterOptions = [
//   'Project Resources',
//   'Project Planning',
//   'Payments',
//   'Work Order',
//   'Inventory',
//   'Approvals',
//   'Reports',
// ];

// const dropdownItems = {
//   'Project Resources': ['Bill of Quantity', 'Drawing', 'Documents'],
//   'Project Planning': ['Activity', 'Project Planner', 'Resource'],
//   Payments: ['Indent', 'Purchase Order', 'Good Receive Note', 'Bill Payment', 'Expense'],
//   'Work Order': ['Work Order', 'Advance Payment', 'Bill', 'Bill Payment'],
//   Inventory: [],
//   Approvals: ['RFI', 'Snagging Report', 'Inspection', 'Submittals'],
//   Reports: ['Daily Progress', 'Activity Timelines', 'Material Consumption'],
// };

// const pieData = [
//   { value: 45, color: colors.success, label: 'Approved', gradientCenterColor: '#34D399' },
//   { value: 30, color: colors.warning, label: 'Under Revision', gradientCenterColor: '#FBBF24' },
//   { value: 25, color: colors.info, label: 'Under Review', gradientCenterColor: '#60A5FA' },
// ];

// const lineData = [
//   { value: 20, dataPointText: '20' },
//   { value: 45, dataPointText: '45' },
//   { value: 28, dataPointText: '28' },
//   { value: 80, dataPointText: '80' },
//   { value: 64, dataPointText: '64' },
//   { value: 43, dataPointText: '43' },
// ];

// const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

// export default function DashboardScreen() {
//   const route = useRoute();
//   const navigation = useNavigation();
//   const { projectId } = route.params || { projectId: 1 };
//   const [selectedFilter, setSelectedFilter] = useState(null);
//   const [selectedSubItem, setSelectedSubItem] = useState(null);
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [slideAnim] = useState(new Animated.Value(-50));

//   const projects = [
//     {
//       id: 1,
//       name: 'Acura Heights Tower',
//       progress: '64%',
//       duration: '18 months',
//       amount: '$2.5M',
//       status: 'Under Construction',
//       completionDate: '2025-12-15',
//     },
//     {
//       id: 2,
//       name: 'Commercial Residences',
//       progress: '89%',
//       duration: '14 months',
//       amount: '$1.8M',
//       status: 'Under Construction',
//       completionDate: '2025-10-30',
//     },
//     {
//       id: 3,
//       name: 'Corporate Landmark Project',
//       progress: '52%',
//       duration: '24 months',
//       amount: '$3.2M',
//       status: 'In Design',
//       completionDate: '2026-06-20',
//     },
//   ];

//   const project = projects.find((p) => p.id === projectId);

//   const cardData = [
//     {
//       title: 'Not Started',
//       value: '18',
//       icon: 'assignment-late',
//       gradient: ['#F0F9FF', '#E0F2FE'],
//       iconBg: '#0EA5E9',
//       subheading: 'Pending Tasks',
//     },
//     {
//       title: 'Drawings',
//       value: '1',
//       icon: 'architecture',
//       gradient: ['#FFF7ED', '#FFEDD5'],
//       iconBg: '#F97316',
//       subheading: 'Under Review',
//     },
//     {
//       title: 'Open GRN',
//       value: '47',
//       icon: 'inventory',
//       gradient: ['#F0FDF4', '#DCFCE7'],
//       iconBg: '#22C55E',
//       subheading: 'Goods Received',
//     },
//     {
//       title: 'Paid Bill',
//       value: '₹49.1L',
//       icon: 'payment',
//       gradient: ['#F5F3FF', '#EDE9FE'],
//       iconBg: '#8B5CF6',
//       subheading: 'Total Payments',
//     },
//     {
//       title: 'Open Indent',
//       value: '22',
//       icon: 'description',
//       gradient: ['#FEF2F2', '#FEE2E2'],
//       iconBg: '#EF4444',
//       subheading: 'Material Requests',
//     },
//     {
//       title: 'Open RFI',
//       value: '2',
//       icon: 'help-outline',
//       gradient: ['#FEFCE8', '#FEF3C7'],
//       iconBg: '#EAB308',
//       subheading: 'Information Requests',
//     },
//     {
//       title: 'Re-inspect',
//       value: '1',
//       icon: 'search',
//       gradient: ['#F0F9FF', '#E0F2FE'],
//       iconBg: '#0EA5E9',
//       subheading: 'Quality Check',
//     },
//     {
//       title: 'Submittals',
//       value: '10',
//       icon: 'article',
//       gradient: ['#FDF2F8', '#FCE7F3'],
//       iconBg: '#EC4899',
//       subheading: 'Document Review',
//     },
//   ];

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const handleFilterSelect = (filter) => {
//     if (filter === 'Inventory') {
//       navigation.navigate('Inventory');
//       setSelectedFilter(null);
//       setSelectedSubItem(null);
//     } else if (selectedFilter === filter) {
//       setSelectedFilter(null);
//       setSelectedSubItem(null);
//     } else {
//       setSelectedFilter(filter);
//       setSelectedSubItem(null);
//     }
//   };

//   const handleSubItemSelect = (subItem) => {
//     setSelectedSubItem(subItem);
//     let screenName = '';
//     switch (subItem) {
//       case 'Bill of Quantity':
//         screenName = 'BillOfQuantity';
//         break;
//       case 'Drawing':
//         screenName = 'Drawing';
//         break;
//       case 'Documents':
//         screenName = 'Document';
//         break;
//       case 'Activity':
//         screenName = 'Activity';
//         break;
//       case 'Project Planner':
//         screenName = 'ProjectPlanner';
//         break;
//       case 'Resource':
//         screenName = 'Resource';
//         break;
//       case 'Indent':
//         screenName = 'Indent';
//         break;
//       case 'Purchase Order':
//         screenName = 'PurchaseOrder';
//         break;
//       case 'Good Receive Note':
//         screenName = 'GoodReceiveNote';
//         break;
//       case 'Bill Payment':
//         screenName = 'BillPayment';
//         break;
//       case 'Expense':
//         screenName = 'Expense';
//         break;
//       case 'Work Order':
//         screenName = 'WorkOrder';
//         break;
//       case 'Advance Payment':
//         screenName = 'AdvancePayment';
//         break;
//       case 'Bill':
//         screenName = 'Bill';
//         break;
//       case 'RFI':
//         screenName = 'RFI';
//         break;
//       case 'Snagging Report':
//         screenName = 'SnaggingReport';
//         break;
//       case 'Inspection':
//         screenName = 'Inspection';
//         break;
//       case 'Submittals':
//         screenName = 'Submittals';
//         break;
//       case 'Daily Progress':
//         screenName = 'DailyProgress';
//         break;
//       case 'Activity Timelines':
//         screenName = 'ActivityTimelines';
//         break;
//       case 'Material Consumption':
//         screenName = 'MaterialConsumption';
//         break;
//       default:
//         screenName = subItem.replace(/\s+/g, '');
//     }
//     navigation.navigate(screenName);
//   };

//   const ProjectHeaderCard = () => (
//     <Animated.View
//       style={{
//         opacity: fadeAnim,
//         transform: [{ translateY: slideAnim }],
//       }}
//     >
//       <LinearGradient
//         colors={['#76abdaff', '#5190f7ff', '#60A5FA']}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//         style={{
//           marginHorizontal: 24,
//           marginVertical: 16,
//           borderRadius: 20,
//           padding: 24,
//         }}
//       >
//         <View style={{ flexDirection: 'column', gap: 6 }}>
//           {/* Top Row: Project Name and Completion Percentage */}
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Text
//               style={{
//                 color: '#FFFFFF',
//                 fontSize: 22,
//                 fontWeight: '700',
//                 flex: 1,
//                 lineHeight: 28,
//               }}
//             >
//               {project?.name}
//             </Text>
//             <View style={{ alignItems: 'flex-end' }}>
//               <Text
//                 style={{
//                   color: '#FFFFFF',
//                   fontSize: 32,
//                   fontWeight: '800',
//                 }}
//               >
//                 {project?.progress}
//               </Text>
//               <Text
//                 style={{
//                   color: 'rgba(255,255,255,0.85)',
//                   fontSize: 12,
//                   fontWeight: '600',
//                   textTransform: 'uppercase',
//                 }}
//               >
//                 Complete
//               </Text>
//             </View>
//           </View>
//           {/* Status Row */}
//           <View
//             style={{
//               backgroundColor: 'rgba(255,255,255,0.25)',
//               paddingHorizontal: 12,
//               paddingVertical: 6,
//               borderRadius: 12,
//               alignSelf: 'flex-start',
//             }}
//           >
//             <Text
//               style={{
//                 color: '#FFFFFF',
//                 fontSize: 12,
//                 fontWeight: '600',
//                 textTransform: 'uppercase',
//               }}
//             >
//               {project?.status}
//             </Text>
//           </View>
//           {/* Bottom Row: Duration and Budget */}
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Text
//               style={{
//                 color: colors.highlight,
//                 fontSize: 22,
//                 fontWeight: '800',
//               }}
//             >
//               {project?.duration}
//             </Text>
//             <Text
//               style={{
//                 color: colors.highlight,
//                 fontSize: 22,
//                 fontWeight: '800',
//               }}
//             >
//               Budget: {project?.amount}
//             </Text>
//           </View>
//         </View>
//       </LinearGradient>
//     </Animated.View>
//   );

//   const FilterSection = () => (
//     <View style={{ backgroundColor: colors.surface, paddingVertical: 20 }}>
//       <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
//         {filterOptions && Array.isArray(filterOptions) ? (
//           filterOptions.map((filter, index) => {
//             const isSelected = selectedFilter === filter;
//             const hasItems = dropdownItems[filter] && Array.isArray(dropdownItems[filter]) && dropdownItems[filter].length > 0;

//             return (
//               <TouchableOpacity
//                 key={filter}
//                 onPress={() => handleFilterSelect(filter)}
//                 style={{
//                   marginRight: 12,
//                   paddingHorizontal: 20,
//                   paddingVertical: 12,
//                   borderRadius: 25,
//                   backgroundColor: isSelected ? colors.primary : colors.surfaceVariant,
//                   borderWidth: isSelected ? 0 : 1,
//                   borderColor: colors.border,
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: isSelected ? 'white' : colors.textSecondary,
//                     fontWeight: isSelected ? '600' : '500',
//                     fontSize: 14,
//                     marginRight: hasItems ? 8 : 0,
//                   }}
//                 >
//                   {filter}
//                 </Text>
//                 {hasItems && (
//                   <Text
//                     style={{
//                       color: isSelected ? 'white' : colors.textMuted,
//                       fontSize: 12,
//                       fontWeight: '600',
//                     }}
//                   >
//                     {isSelected ? '▼' : '▶'}
//                   </Text>
//                 )}
//               </TouchableOpacity>
//             );
//           })
//         ) : (
//           <Text style={{ color: colors.text, fontSize: 14 }}>Error: Filter options unavailable</Text>
//         )}
//       </ScrollView>

//       {selectedFilter && dropdownItems[selectedFilter] && Array.isArray(dropdownItems[selectedFilter]) && dropdownItems[selectedFilter].length > 0 && (
//         <Animated.View
//           style={{
//             marginTop: 16,
//             marginHorizontal: 24,
//             backgroundColor: colors.surfaceVariant,
//             borderRadius: 16,
//             padding: 16,
//             opacity: fadeAnim,
//           }}
//         >
//           <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               {dropdownItems[selectedFilter].map((item, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={{
//                     marginRight: 12,
//                     paddingHorizontal: 16,
//                     paddingVertical: 10,
//                     borderRadius: 20,
//                     backgroundColor: colors.surface,
//                   }}
//                   onPress={() => handleSubItemSelect(item)}
//                 >
//                   <Text
//                     style={{
//                       color: colors.text,
//                       fontWeight: '500',
//                       fontSize: 13,
//                     }}
//                   >
//                     {item}
//                   </Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </ScrollView>
//         </Animated.View>
//       )}
//     </View>
//   );

//   const StatsCard = ({ item, index }) => (
//     <Animated.View
//       style={{
//         width: (screenWidth - 60) / 2,
//         marginBottom: 16,
//         marginRight: index % 2 === 0 ? 12 : 0,
//         borderRadius: 20,
//         backgroundColor: colors.surface,
//         overflow: 'hidden',
//       }}
//     >
//       <LinearGradient colors={item.gradient} style={{ padding: 20, paddingBottom: 16 }}>
//         <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
//           <View style={{ flex: 1 }}>
//             <Text
//               style={{
//                 fontSize: 13,
//                 fontWeight: '600',
//                 color: colors.textSecondary,
//                 marginBottom: 4,
//               }}
//             >
//               {item.title}
//             </Text>
//           </View>
//           <View
//             style={{
//               width: 44,
//               height: 44,
//               borderRadius: 14,
//               backgroundColor: item.iconBg,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Icon name={item.icon} size={24} color="#FFFFFF" />
//           </View>
//         </View>

//         <Text
//           style={{
//             fontSize: 28,
//             fontWeight: '800',
//             color: colors.text,
//             marginBottom: 4,
//           }}
//         >
//           {item.value}
//         </Text>

//         <Text
//           style={{
//             fontSize: 12,
//             fontWeight: '500',
//             color: colors.textMuted,
//             marginBottom: item.trend ? 4 : 0,
//           }}
//         >
//           {item.subheading}
//         </Text>
//       </LinearGradient>
//     </Animated.View>
//   );

//   const ChartsSection = () => (
//     <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
//       {/* Document Status Chart */}
//       <Animated.View style={{ marginBottom: 32, opacity: fadeAnim }}>
//         <Text
//           style={{
//             fontSize: 22,
//             fontWeight: '700',
//             color: colors.text,
//             marginBottom: 20,
//           }}
//         >
//           Document Status Overview
//         </Text>

//         <View
//           style={{
//             backgroundColor: colors.surface,
//             borderRadius: 24,
//             padding: 32,
//           }}
//         >
//           <View style={{ alignItems: 'center', marginBottom: 32 }}>
//             <PieChart
//               data={pieData}
//               donut
//               innerRadius={80}
//               radius={120}
//               innerCircleColor={colors.surface}
//               centerLabelComponent={() => (
//                 <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//                   <Text
//                     style={{
//                       fontSize: 36,
//                       fontWeight: '900',
//                       color: colors.text,
//                     }}
//                   >
//                     100
//                   </Text>
//                   <Text
//                     style={{
//                       fontSize: 14,
//                       fontWeight: '600',
//                       color: colors.textSecondary,
//                     }}
//                   >
//                     Documents
//                   </Text>
//                 </View>
//               )}
//               strokeWidth={3}
//               strokeColor={colors.surface}
//               showText={false}
//               focusOnPress
//               showValuesAsLabels={false}
//               animationDuration={1200}
//             />
//           </View>

//           <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
//             {pieData && Array.isArray(pieData) ? (
//               pieData.map((item, index) => (
//                 <View
//                   key={index}
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     marginHorizontal: 12,
//                     marginVertical: 6,
//                     backgroundColor: colors.surfaceVariant,
//                     paddingHorizontal: 16,
//                     paddingVertical: 10,
//                     borderRadius: 16,
//                   }}
//                 >
//                   <View
//                     style={{
//                       width: 12,
//                       height: 12,
//                       borderRadius: 6,
//                       backgroundColor: item.color,
//                       marginRight: 10,
//                     }}
//                   />
//                   <Text
//                     style={{
//                       fontSize: 14,
//                       fontWeight: '600',
//                       color: colors.text,
//                     }}
//                   >
//                     {item.label}: {item.value}%
//                   </Text>
//                 </View>
//               ))
//             ) : (
//               <Text style={{ color: colors.text, fontSize: 14 }}>Error: Pie data unavailable</Text>
//             )}
//           </View>
//         </View>
//       </Animated.View>

//       {/* Progress Timeline Chart */}
//       <Animated.View style={{ marginBottom: 32, opacity: fadeAnim }}>
//         <Text
//           style={{
//             fontSize: 22,
//             fontWeight: '700',
//             color: colors.text,
//             marginBottom: 20,
//           }}
//         >
//           Progress Timeline
//         </Text>

//         <View
//           style={{
//             backgroundColor: colors.surface,
//             borderRadius: 24,
//             padding: 24,
//           }}
//         >
//           <LineChart
//             data={lineData}
//             width={screenWidth - 120}
//             height={280}
//             curved
//             thickness={4}
//             color={colors.primary}
//             startFillColor={colors.primary}
//             endFillColor={colors.secondary}
//             startOpacity={0.8}
//             endOpacity={0.1}
//             areaChart
//             initialSpacing={10}
//             endSpacing={10}
//             noOfSections={5}
//             rulesType="solid"
//             rulesColor={colors.border}
//             yAxisThickness={0}
//             xAxisThickness={0}
//             showVerticalLines
//             verticalLinesColor={colors.border}
//             dataPointsHeight={12}
//             dataPointsWidth={12}
//             dataPointsColor={colors.primary}
//             dataPointsRadius={6}
//             textColor={colors.text}
//             textSize={12}
//             showValuesAsDataPointsText={false}
//             xAxisLabelTexts={labels}
//             xAxisLabelTextStyle={{
//               color: colors.textSecondary,
//               fontSize: 12,
//               fontWeight: '500',
//             }}
//             yAxisTextStyle={{
//               color: colors.textSecondary,
//               fontSize: 12,
//               fontWeight: '500',
//             }}
//             animationDuration={1200}
//             animationEasing="ease-out"
//             pointerConfig={{
//               pointerStripHeight: 200,
//               pointerStripColor: colors.textMuted,
//               pointerStripWidth: 2,
//               pointerColor: colors.primary,
//               radius: 8,
//               pointerLabelWidth: 100,
//               pointerLabelHeight: 80,
//               activatePointersOnLongPress: true,
//               autoAdjustPointerLabelPosition: true,
//               pointerLabelComponent: (items) => {
//                 const item = items[0];
//                 return (
//                   <View
//                     style={{
//                       backgroundColor: colors.surface,
//                       paddingHorizontal: 12,
//                       paddingVertical: 8,
//                       borderRadius: 12,
//                       borderWidth: 1,
//                       borderColor: colors.border,
//                     }}
//                   >
//                     <Text
//                       style={{
//                         fontSize: 14,
//                         fontWeight: '600',
//                         color: colors.text,
//                       }}
//                     >
//                       {item.value}%
//                     </Text>
//                     <Text
//                       style={{
//                         fontSize: 11,
//                         color: colors.textSecondary,
//                       }}
//                     >
//                       Progress
//                     </Text>
//                   </View>
//                 );
//               },
//             }}
//           />
//         </View>
//       </Animated.View>
//     </View>
//   );

//   return (
//     <MainLayout title={project ? project.name : 'Project Dashboard'}>
//       <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
//         <ProjectHeaderCard />
//         <FilterSection />

//         <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
//           <Text
//             style={{
//               fontSize: 22,
//               fontWeight: '700',
//               color: colors.text,
//               marginBottom: 20,
//             }}
//           >
//             Project Statistics
//           </Text>

//           <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
//             {cardData && Array.isArray(cardData) ? (
//               cardData.map((item, index) => (
//                 <StatsCard key={index} item={item} index={index} />
//               ))
//             ) : (
//               <Text style={{ color: colors.text, fontSize: 14 }}>Error: Card data unavailable</Text>
//             )}
//           </View>
//         </View>

//         <ChartsSection />

//         <View style={{ height: 32 }} />
//       </ScrollView>
//     </MainLayout>
//   );
// }
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { PieChart, LineChart } from 'react-native-gifted-charts';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const colors = {
  primary: '#1E3A8A',
  secondary: '#6366F1',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceVariant: '#F1F5F9',
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  border: '#E2E8F0',
  accent: '#8B5CF6',
  highlight: '#fffef9ff',
};

const filterOptions = [
  'Project Resources',
  'Project Planning',
  'Payments',
  'Work Order',
  'Inventory',
  'Approvals',
  'Reports',
];

const dropdownItems = {
  'Project Resources': ['Bill of Quantity', 'Drawing', 'Documents'],
  'Project Planning': ['Activity', 'Project Planner', 'Resource'],
  Payments: ['Indent', 'Purchase Order', 'Good Receive Note', 'Bill Payment', 'Expense'],
  'Work Order': ['Work Order', 'Advance Payment', 'Bill', 'Bill Payment'],
  Inventory: [],
  Approvals: ['RFI', 'Snagging Report', 'Inspection', 'Submittals'],
  Reports: ['Daily Progress', 'Activity Timelines', 'Material Consumption'],
};

const pieData = [
  { value: 45, color: colors.success, label: 'Approved', gradientCenterColor: '#34D399' },
  { value: 30, color: colors.warning, label: 'Under Revision', gradientCenterColor: '#FBBF24' },
  { value: 25, color: colors.info, label: 'Under Review', gradientCenterColor: '#60A5FA' },
];

const lineData = [
  { value: 20, dataPointText: '20' },
  { value: 45, dataPointText: '45' },
  { value: 28, dataPointText: '28' },
  { value: 80, dataPointText: '80' },
  { value: 64, dataPointText: '64' },
  { value: 43, dataPointText: '43' },
];

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export default function DashboardScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params || { projectId: 1 };
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(-50));

  const projects = [
    {
      id: 1,
      name: 'Acura Heights Tower',
      progress: '64%',
      duration: '18 months',
      amount: '$2.5M',
      status: 'Under Construction',
      completionDate: '2025-12-15',
    },
    {
      id: 2,
      name: 'Commercial Residences',
      progress: '89%',
      duration: '14 months',
      amount: '$1.8M',
      status: 'Under Construction',
      completionDate: '2025-10-30',
    },
    {
      id: 3,
      name: 'Corporate Landmark Project',
      progress: '52%',
      duration: '24 months',
      amount: '$3.2M',
      status: 'In Design',
      completionDate: '2026-06-20',
    },
  ];

  const project = projects.find((p) => p.id === projectId);

  const cardData = [
    {
      title: 'Not Started',
      value: '18',
      icon: 'assignment-late',
      gradient: ['#F0F9FF', '#E0F2FE'],
      iconBg: '#0EA5E9',
      subheading: 'Pending Tasks',
    },
    {
      title: 'Drawings',
      value: '1',
      icon: 'architecture',
      gradient: ['#FFF7ED', '#FFEDD5'],
      iconBg: '#F97316',
      subheading: 'Under Review',
    },
    {
      title: 'Open GRN',
      value: '47',
      icon: 'inventory',
      gradient: ['#F0FDF4', '#DCFCE7'],
      iconBg: '#22C55E',
      subheading: 'Goods Received',
    },
    {
      title: 'Paid Bill',
      value: '₹49.1L',
      icon: 'payment',
      gradient: ['#F5F3FF', '#EDE9FE'],
      iconBg: '#8B5CF6',
      subheading: 'Total Payments',
    },
    {
      title: 'Open Indent',
      value: '22',
      icon: 'description',
      gradient: ['#FEF2F2', '#FEE2E2'],
      iconBg: '#EF4444',
      subheading: 'Material Requests',
    },
    {
      title: 'Open RFI',
      value: '2',
      icon: 'help-outline',
      gradient: ['#FEFCE8', '#FEF3C7'],
      iconBg: '#EAB308',
      subheading: 'Information Requests',
    },
    {
      title: 'Re-inspect',
      value: '1',
      icon: 'search',
      gradient: ['#F0F9FF', '#E0F2FE'],
      iconBg: '#0EA5E9',
      subheading: 'Quality Check',
    },
    {
      title: 'Submittals',
      value: '10',
      icon: 'article',
      gradient: ['#FDF2F8', '#FCE7F3'],
      iconBg: '#EC4899',
      subheading: 'Document Review',
    },
  ];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleFilterSelect = (filter) => {
    if (filter === 'Inventory') {
      navigation.navigate('Inventory');
      setSelectedFilter(null);
      setSelectedSubItem(null);
    } else if (selectedFilter === filter) {
      setSelectedFilter(null);
      setSelectedSubItem(null);
    } else {
      setSelectedFilter(filter);
      setSelectedSubItem(null);
    }
  };

  const handleSubItemSelect = (subItem) => {
    setSelectedSubItem(subItem);
    let screenName = '';
    switch (subItem) {
      case 'Bill of Quantity':
        screenName = 'BillOfQuantity';
        break;
      case 'Drawing':
        screenName = 'Drawing';
        break;
      case 'Documents':
        screenName = 'Document';
        break;
      case 'Activity':
        screenName = 'Activity';
        break;
      case 'Project Planner':
        screenName = 'ProjectPlanner';
        break;
      case 'Resource':
        screenName = 'Resource';
        break;
      case 'Indent':
        screenName = 'Indent';
        break;
      case 'Purchase Order':
        screenName = 'PurchaseOrder';
        break;
      case 'Good Receive Note':
        screenName = 'GoodReceiveNote';
        break;
      case 'Bill Payment':
        screenName = 'BillPayment';
        break;
      case 'Expense':
        screenName = 'Expense';
        break;
      case 'Work Order':
        screenName = 'WorkOrder';
        break;
      case 'Advance Payment':
        screenName = 'AdvancePayment';
        break;
      case 'Bill':
        screenName = 'Bill';
        break;
      case 'RFI':
        screenName = 'RFI';
        break;
      case 'Snagging Report':
        screenName = 'SnaggingReport';
        break;
      case 'Inspection':
        screenName = 'Inspection';
        break;
      case 'Submittals':
        screenName = 'Submittals';
        break;
      case 'Daily Progress':
        screenName = 'DailyProgress';
        break;
      case 'Activity Timelines':
        screenName = 'ActivityTimelines';
        break;
      case 'Material Consumption':
        screenName = 'MaterialConsumption';
        break;
      default:
        screenName = subItem.replace(/\s+/g, '');
    }
    navigation.navigate(screenName);
  };

  const ProjectHeaderCard = () => (
    <Animated.View
      style={{
        opacity: fadeAnim,
        transform: [{ translateY: slideAnim }],
      }}
    >
      <LinearGradient
        colors={['#76abdaff', '#5190f7ff', '#60A5FA']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          marginHorizontal: 24,
          marginVertical: 16,
          borderRadius: 20,
          padding: 20, // Consistent padding for top, bottom, left, right
        }}
      >
        <View style={{ flexDirection: 'column', gap: 8 }}>
          {/* Top Row: Project Name and Completion Percentage */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 22,
                fontWeight: '700',
                flex: 1,
                lineHeight: 28,
              }}
            >
              {project?.name}
            </Text>
            <View style={{ alignItems: 'flex-end' }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 32,
                  fontWeight: '800',
                }}
              >
                {project?.progress}
              </Text>
              <Text
                style={{
                  color: 'rgba(255,255,255,0.85)',
                  fontSize: 12,
                  fontWeight: '600',
                  textTransform: 'uppercase',
                }}
              >
                Complete
              </Text>
            </View>
          </View>
          {/* Status Row */}
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.25)',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 12,
              alignSelf: 'flex-start',
              marginVertical: 8, // Consistent vertical spacing
            }}
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontWeight: '600',
                textTransform: 'uppercase',
              }}
            >
              {project?.status}
            </Text>
          </View>
          {/* Bottom Row: Duration and Budget */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text
              style={{
                color: colors.highlight,
                fontSize: 22,
                fontWeight: '800',
              }}
            >
              {project?.duration}
            </Text>
            <Text
              style={{
                color: colors.highlight,
                fontSize: 22,
                fontWeight: '800',
              }}
            >
              Budget: {project?.amount}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );

  const FilterSection = () => (
    <View style={{ backgroundColor: colors.surface, paddingVertical: 20 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
        {filterOptions && Array.isArray(filterOptions) ? (
          filterOptions.map((filter, index) => {
            const isSelected = selectedFilter === filter;
            const hasItems = dropdownItems[filter] && Array.isArray(dropdownItems[filter]) && dropdownItems[filter].length > 0;

            return (
              <TouchableOpacity
                key={filter}
                onPress={() => handleFilterSelect(filter)}
                style={{
                  marginRight: 12,
                  paddingHorizontal: 20,
                  paddingVertical: 12,
                  borderRadius: 25,
                  backgroundColor: isSelected ? colors.primary : colors.surfaceVariant,
                  borderWidth: isSelected ? 0 : 1,
                  borderColor: colors.border,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: isSelected ? 'white' : colors.textSecondary,
                    fontWeight: isSelected ? '600' : '500',
                    fontSize: 14,
                    marginRight: hasItems ? 8 : 0,
                  }}
                >
                  {filter}
                </Text>
                {hasItems && (
                  <Text
                    style={{
                      color: isSelected ? 'white' : colors.textMuted,
                      fontSize: 12,
                      fontWeight: '600',
                    }}
                  >
                    {isSelected ? '▼' : '▶'}
                  </Text>
                )}
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={{ color: colors.text, fontSize: 14 }}>Error: Filter options unavailable</Text>
        )}
      </ScrollView>

      {selectedFilter && dropdownItems[selectedFilter] && Array.isArray(dropdownItems[selectedFilter]) && dropdownItems[selectedFilter].length > 0 && (
        <Animated.View
          style={{
            marginTop: 16,
            marginHorizontal: 24,
            backgroundColor: colors.surfaceVariant,
            borderRadius: 16,
            padding: 16,
            opacity: fadeAnim,
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {dropdownItems[selectedFilter].map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginRight: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 20,
                    backgroundColor: colors.surface,
                  }}
                  onPress={() => handleSubItemSelect(item)}
                >
                  <Text
                    style={{
                      color: colors.text,
                      fontWeight: '500',
                      fontSize: 13,
                    }}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );

  const StatsCard = ({ item, index }) => (
    <Animated.View
      style={{
        width: (screenWidth - 60) / 2,
        marginBottom: 16,
        marginRight: index % 2 === 0 ? 12 : 0,
        borderRadius: 20,
        backgroundColor: colors.surface,
        overflow: 'hidden',
      }}
    >
      <LinearGradient colors={item.gradient} style={{ padding: 20, paddingBottom: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '600',
                color: colors.textSecondary,
                marginBottom: 4,
              }}
            >
              {item.title}
            </Text>
          </View>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 14,
              backgroundColor: item.iconBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={item.icon} size={24} color="#FFFFFF" />
          </View>
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: '800',
            color: colors.text,
            marginBottom: 4,
          }}
        >
          {item.value}
        </Text>

        <Text
          style={{
            fontSize: 12,
            fontWeight: '500',
            color: colors.textMuted,
            marginBottom: item.trend ? 4 : 0,
          }}
        >
          {item.subheading}
        </Text>
      </LinearGradient>
    </Animated.View>
  );

  const ChartsSection = () => (
    <View style={{ paddingHorizontal: 24, marginTop: 32 }}>
      {/* Document Status Chart */}
      <Animated.View style={{ marginBottom: 32, opacity: fadeAnim }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 20,
          }}
        >
          Document Status Overview
        </Text>

        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 24,
            padding: 32,
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <PieChart
              data={pieData}
              donut
              innerRadius={80}
              radius={120}
              innerCircleColor={colors.surface}
              centerLabelComponent={() => (
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text
                    style={{
                      fontSize: 36,
                      fontWeight: '900',
                      color: colors.text,
                    }}
                  >
                    100
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: colors.textSecondary,
                    }}
                  >
                    Documents
                  </Text>
                </View>
              )}
              strokeWidth={3}
              strokeColor={colors.surface}
              showText={false}
              focusOnPress
              showValuesAsLabels={false}
              animationDuration={1200}
            />
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {pieData && Array.isArray(pieData) ? (
              pieData.map((item, index) => (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 12,
                    marginVertical: 6,
                    backgroundColor: colors.surfaceVariant,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 16,
                  }}
                >
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: item.color,
                      marginRight: 10,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: colors.text,
                    }}
                  >
                    {item.label}: {item.value}%
                  </Text>
                </View>
              ))
            ) : (
              <Text style={{ color: colors.text, fontSize: 14 }}>Error: Pie data unavailable</Text>
            )}
          </View>
        </View>
      </Animated.View>

      {/* Progress Timeline Chart */}
      <Animated.View style={{ marginBottom: 32, opacity: fadeAnim }}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: '700',
            color: colors.text,
            marginBottom: 20,
          }}
        >
          Progress Timeline
        </Text>

        <View
          style={{
            backgroundColor: colors.surface,
            borderRadius: 24,
            padding: 24,
          }}
        >
          <LineChart
            data={lineData}
            width={screenWidth - 120}
            height={280}
            curved
            thickness={4}
            color={colors.primary}
            startFillColor={colors.primary}
            endFillColor={colors.secondary}
            startOpacity={0.8}
            endOpacity={0.1}
            areaChart
            initialSpacing={10}
            endSpacing={10}
            noOfSections={5}
            rulesType="solid"
            rulesColor={colors.border}
            yAxisThickness={0}
            xAxisThickness={0}
            showVerticalLines
            verticalLinesColor={colors.border}
            dataPointsHeight={12}
            dataPointsWidth={12}
            dataPointsColor={colors.primary}
            dataPointsRadius={6}
            textColor={colors.text}
            textSize={12}
            showValuesAsDataPointsText={false}
            xAxisLabelTexts={labels}
            xAxisLabelTextStyle={{
              color: colors.textSecondary,
              fontSize: 12,
              fontWeight: '500',
            }}
            yAxisTextStyle={{
              color: colors.textSecondary,
              fontSize: 12,
              fontWeight: '500',
            }}
            animationDuration={1200}
            animationEasing="ease-out"
            pointerConfig={{
              pointerStripHeight: 200,
              pointerStripColor: colors.textMuted,
              pointerStripWidth: 2,
              pointerColor: colors.primary,
              radius: 8,
              pointerLabelWidth: 100,
              pointerLabelHeight: 80,
              activatePointersOnLongPress: true,
              autoAdjustPointerLabelPosition: true,
              pointerLabelComponent: (items) => {
                const item = items[0];
                return (
                  <View
                    style={{
                      backgroundColor: colors.surface,
                      paddingHorizontal: 12,
                      paddingVertical: 8,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: colors.border,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: '600',
                        color: colors.text,
                      }}
                    >
                      {item.value}%
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: colors.textSecondary,
                      }}
                    >
                      Progress
                    </Text>
                  </View>
                );
              },
            }}
          />
        </View>
      </Animated.View>
    </View>
  );

  return (
    <MainLayout title={project ? project.name : 'Project Dashboard'}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
        <ProjectHeaderCard />
        <FilterSection />

        <View style={{ paddingHorizontal: 24, paddingTop: 32 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: '700',
              color: colors.text,
              marginBottom: 20,
            }}
          >
            Project Statistics
          </Text>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {cardData && Array.isArray(cardData) ? (
              cardData.map((item, index) => (
                <StatsCard key={index} item={item} index={index} />
              ))
            ) : (
              <Text style={{ color: colors.text, fontSize: 14 }}>Error: Card data unavailable</Text>
            )}
          </View>
        </View>

        <ChartsSection />

        <View style={{ height: 32 }} />
      </ScrollView>
    </MainLayout>
  );
}