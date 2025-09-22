// import React, { useState, useEffect } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
// import { useRoute, useNavigation } from '@react-navigation/native';
// import MainLayout from '../components/MainLayout';
// import { LinearGradient } from 'expo-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import * as Progress from 'react-native-progress';

// const screenWidth = Dimensions.get('window').width;
// const screenHeight = Dimensions.get('window').height;

// const colors = {
//   primary: '#1D4ED8',
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
//   highlight: '#fffef9ff',
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
//       amount: '₹2.5M',
//       completionDate: '2025-12-15',
//     },
//     {
//       id: 2,
//       name: 'Commercial Residences',
//       progress: '89%',
//       duration: '14 months',
//       amount: '₹1.8M',
//       completionDate: '2025-10-30',
//     },
//     {
//       id: 3,
//       name: 'Corporate Landmark Project',
//       progress: '52%',
//       duration: '24 months',
//       amount: '₹3.2M',
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

//   const FilterSection = () => (
//     <LinearGradient
//       colors={['#ffffff', '#f8fafc', '#e2e8f0']}
//        start={{ x: 0, y: 0 }}
//           end={{ x: 0, y: 1 }}
//       style={{ paddingVertical: 24 }}
//     >
//       <ScrollView 
//         horizontal 
//         showsHorizontalScrollIndicator={false} 
//         contentContainerStyle={{ paddingHorizontal: 24 }}
//       >
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
//                   backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
//                   borderWidth: isSelected ? 1 : 0,
//                   borderColor: 'rgba(255, 255, 255, 0.3)',
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Text
//                   style={{
//                     color: '#FFFFFF',
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
//                       color: '#FFFFFF',
//                       fontSize: 12,
//                       fontWeight: '600',
//                       opacity: 0.8,
//                     }}
//                   >
//                     {isSelected ? '▼' : '▶'}
//                   </Text>
//                 )}
//               </TouchableOpacity>
//             );
//           })
//         ) : (
//           <Text style={{ color: '#FFFFFF', fontSize: 14 }}>Error: Filter options unavailable</Text>
//         )}
//       </ScrollView>

//       {selectedFilter && dropdownItems[selectedFilter] && Array.isArray(dropdownItems[selectedFilter]) && dropdownItems[selectedFilter].length > 0 && (
//         <Animated.View
//           style={{
//             marginTop: 16,
//             marginHorizontal: 24,
//             backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
//                     backgroundColor: 'rgba(255, 255, 255, 0.15)',
//                   }}
//                   onPress={() => handleSubItemSelect(item)}
//                 >
//                   <Text
//                     style={{
//                       color: '#FFFFFF',
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
//     </LinearGradient>
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
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 4 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 3,
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
//               width: 40,
//               height: 40,
//               borderRadius: 14,
//               backgroundColor: item.iconBg,
//               alignItems: 'center',
//               justifyContent: 'center',
//             }}
//           >
//             <Icon name={item.icon} size={20} color="#FFFFFF" />
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

//   return (
//     <MainLayout title={project ? project.name : 'Project Dashboard'}>
//       <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
//         <FilterSection />

//         <View style={{ 
//           paddingHorizontal: 24, 
//           paddingTop: 32,
//           backgroundColor: colors.background,
//         }}>
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
        
//         <View style={{ height: 32 }} />
//       </ScrollView>
//     </MainLayout>
//   );
// }

import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MainLayout from '../components/MainLayout';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const colors = {
  primary: '#1D4ED8',
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

export default function DashboardScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { projectId } = route.params || { projectId: 1 };
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [dropdownoptions,setOptions]=useState([]);
  const [slideAnim] = useState(new Animated.Value(-50));
console.log("asdf",projectId);
  const projects = [
    {
      id: 1,
      name: 'Acura Heights Tower',
      progress: '64%',
      duration: '18 months',
      amount: '₹2.5M',
      completionDate: '2025-12-15',
    },
    {
      id: 2,
      name: 'Commercial Residences',
      progress: '89%',
      duration: '14 months',
      amount: '₹1.8M',
      completionDate: '2025-10-30',
    },
    {
      id: 3,
      name: 'Corporate Landmark Project',
      progress: '52%',
      duration: '24 months',
      amount: '₹3.2M',
      completionDate: '2026-06-20',
    },
  ];

  const project = projects.find((p) => p.id === projectId);
 
  // const cardData = [
  //   {
  //     title: 'Not Started',
  //     value: '18',
  //     icon: 'assignment-late',
  //     gradient: ['#F0F9FF', '#E0F2FE'],
  //     iconBg: '#0EA5E9',
  //     subheading: 'Pending Tasks',
  //   },
  //   {
  //     title: 'Drawings',
  //     value: '1',
  //     icon: 'architecture',
  //     gradient: ['#FFF7ED', '#FFEDD5'],
  //     iconBg: '#F97316',
  //     subheading: 'Under Review',
  //   },
  //   {
  //     title: 'Open GRN',
  //     value: '47',
  //     icon: 'inventory',
  //     gradient: ['#F0FDF4', '#DCFCE7'],
  //     iconBg: '#22C55E',
  //     subheading: 'Goods Received',
  //   },
  //   {
  //     title: 'Paid Bill',
  //     value: '₹49.1L',
  //     icon: 'payment',
  //     gradient: ['#F5F3FF', '#EDE9FE'],
  //     iconBg: '#8B5CF6',
  //     subheading: 'Total Payments',
  //   },
  //   {
  //     title: 'Open Indent',
  //     value: '22',
  //     icon: 'description',
  //     gradient: ['#FEF2F2', '#FEE2E2'],
  //     iconBg: '#EF4444',
  //     subheading: 'Material Requests',
  //   },
  //   {
  //     title: 'Open RFI',
  //     value: '2',
  //     icon: 'help-outline',
  //     gradient: ['#FEFCE8', '#FEF3C7'],
  //     iconBg: '#EAB308',
  //     subheading: 'Information Requests',
  //   },
  //   {
  //     title: 'Re-inspect',
  //     value: '1',
  //     icon: 'search',
  //     gradient: ['#F0F9FF', '#E0F2FE'],
  //     iconBg: '#0EA5E9',
  //     subheading: 'Quality Check',
  //   },
  //   {
  //     title: 'Submittals',
  //     value: '10',
  //     icon: 'article',
  //     gradient: ['#FDF2F8', '#FCE7F3'],
  //     iconBg: '#EC4899',
  //     subheading: 'Document Review',
  //   },
  // ];
const cardData = [
  {
    title: 'Activity',
    value: '18',
    icon: 'assignment-late',
    gradient: ['#F0F9FF', '#E0F2FE'],
    iconBg: '#0EA5E9',
    subheading: 'Pending Tasks',
    screen: 'Activity', // No screen defined
  },
  {
    title: 'Drawings',
    value: '1',
    icon: 'architecture',
    gradient: ['#FFF7ED', '#FFEDD5'],
    iconBg: '#F97316',
    subheading: 'Under Review',
    screen: 'Drawing',
  },
  {
    title: 'Open GRN',
    value: '47',
    icon: 'inventory',
    gradient: ['#F0FDF4', '#DCFCE7'],
    iconBg: '#22C55E',
    subheading: 'Goods Received',
    screen: 'GoodReceiveNote',
  },
  {
    title: 'Paid Bill',
    value: '₹49.1L',
    icon: 'payment',
    gradient: ['#F5F3FF', '#EDE9FE'],
    iconBg: '#8B5CF6',
    subheading: 'Total Payments',
    screen: 'BillPayment',
  },
  {
    title: 'Open Indent',
    value: '22',
    icon: 'description',
    gradient: ['#FEF2F2', '#FEE2E2'],
    iconBg: '#EF4444',
    subheading: 'Material Requests',
    screen: 'Indent',
  },
  {
    title: 'Open RFI',
    value: '2',
    icon: 'help-outline',
    gradient: ['#FEFCE8', '#FEF3C7'],
    iconBg: '#EAB308',
    subheading: 'Information Requests',
    screen: 'RFI',
  },
  {
    title: 'Re-inspect',
    value: '1',
    icon: 'search',
    gradient: ['#F0F9FF', '#E0F2FE'],
    iconBg: '#0EA5E9',
    subheading: 'Quality Check',
    screen: 'Inspection',
  },
  {
    title: 'Submittals',
    value: '10',
    icon: 'article',
    gradient: ['#FDF2F8', '#FCE7F3'],
    iconBg: '#EC4899',
    subheading: 'Document Review',
    screen: 'Submittals',
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
const fetchProjectData = async () => {
 const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        console.log('❌ No user data found in storage');
        return;
      }

      const parsedData = JSON.parse(userData);
  try {

    const response = await fetch(
      "https://api-v2-skystruct.prudenttec.com/project/get-dashboard",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${parsedData.jwtToken}`,
          "X-Menu-Id": "DRlBbUjgXSb",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectFormBean: {
            autoId: projectId,
            service: "1",
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("✅ Dashboard response:", data.rolePermissionFormBeans);
    if (data.jwtToken) {
      const updatedUserData = {
        ...parsedData,
        jwtToken: data.jwtToken,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUserData));
      console.log("🔄 JWT Token updated in storage");
    }
    setOptions(data.rolePermissionFormBeans)

    // Example: if you want to set some state
    // setCurrencyData(data.currencyMasterBeans);

  } catch (err) {
    console.error("Error fetching dashboard data:", err);
  } finally {
    setIsLoading(false);
  }
};

  
  useEffect(()=>{
    fetchProjectData();

  },[])
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
const FilterSection = () => (
  <LinearGradient
    colors={['#f0f7ff', '#e6f0ff']}
    start={{ x: 0, y: 0 }}
    end={{ x: 0, y: 1 }}
    style={{ paddingVertical: 20 }}
  >
    {/* Top filter bar */}
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 24 }}
    >
      {dropdownoptions && Array.isArray(dropdownoptions) ? (
        dropdownoptions.map((menu, index) => {
          const isSelected = selectedFilter?.autoId === menu.autoId;
          const hasItems =
            menu.submenu && Array.isArray(menu.submenu) && menu.submenu.length > 0;

          return (
            <TouchableOpacity
              key={menu.autoId}
              onPress={() =>
                handleFilterSelect(isSelected ? null : menu) // pass whole object
              }
              style={{
                marginRight: 12,
                paddingHorizontal: 20,
                paddingVertical: 12,
                borderRadius: 20,
                backgroundColor: isSelected ? '#3b82f6' : 'rgba(255, 255, 255, 0.8)',
                borderWidth: 1,
                borderColor: isSelected ? '#3b82f6' : 'rgba(59, 130, 246, 0.3)',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: isSelected ? '#ffffff' : '#3b82f6',
                  fontWeight: isSelected ? '600' : '500',
                  fontSize: 14,
                  marginRight: hasItems ? 8 : 0,
                }}
              >
                {menu.label}
              </Text>
              {hasItems && (
                <Text
                  style={{
                    color: isSelected ? '#ffffff' : '#3b82f6',
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
        <Text style={{ color: colors.text, fontSize: 14 }}>
          Error: Filter options unavailable
        </Text>
      )}
    </ScrollView>

    {/* Submenu section */}
    {selectedFilter &&
      selectedFilter.submenu &&
      Array.isArray(selectedFilter.submenu) &&
      selectedFilter.submenu.length > 0 && (
        <Animated.View
          style={{
            marginTop: 16,
            marginHorizontal: 24,
            backgroundColor: '#ffffff',
            borderRadius: 16,
            padding: 16,
            opacity: fadeAnim,
            borderWidth: 1,
            borderColor: '#e6f0ff',
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {selectedFilter.submenu.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    marginRight: 12,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    borderRadius: 16,
                    backgroundColor: '#f0f7ff',
                    borderWidth: 1,
                    borderColor: '#dbeafe',
                  }}
                  onPress={() => handleSubItemSelect(item.label)}
                >
                  <Text
                    style={{
                      color: '#3b82f6',
                      fontWeight: '500',
                      fontSize: 13,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </Animated.View>
      )}
  </LinearGradient>
);

const StatsCard = ({ item, index }) => (
  <TouchableOpacity
    onPress={() => item.screen && navigation.navigate(item.screen)}
    activeOpacity={0.7}
  >
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
              width: 40,
              height: 40,
              borderRadius: 14,
              backgroundColor: item.iconBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name={item.icon} size={20} color="#FFFFFF" />
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
       
        {/* Navigation indicator for clickable cards */}
        {item.screen && (
          <View style={{
            position: 'absolute',
            bottom: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: 10,
            padding: 2,
          }}>
            <Icon name="arrow-forward" size={14} color={colors.textMuted} />
          </View>
        )}
      </LinearGradient>
    </Animated.View>
  </TouchableOpacity>
);

  return (
    <MainLayout title={project ? project.name : 'Project Dashboard'}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.background }} showsVerticalScrollIndicator={false}>
        <FilterSection />

        <View style={{ 
          paddingHorizontal: 24, 
          paddingTop: 32,
          backgroundColor: colors.background,
        }}>
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
        
        <View style={{ height: 32 }} />
      </ScrollView>
    </MainLayout>
  );
}