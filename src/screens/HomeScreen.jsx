// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   ScrollView,
// //   TouchableOpacity,
// //   StatusBar,
// //   TextInput,
// //   Image,
// // } from 'react-native';
// // import { Feather } from '@expo/vector-icons';
// // import { useNavigation } from '@react-navigation/native';
// // import towerImage from '../../assets/image.jpg'; // Correct path based on folder structure

// // export default function HomeScreen() {
// //   const [selectedFilter, setSelectedFilter] = useState('All Projects');
// //   const navigation = useNavigation();

// //   const projects = [
// //     {
// //       id: 1,
// //       name: 'Acura Heights Tower',
// //       progress: '64%',
// //       duration: '18 months',
// //       amount: '$2.5M',
// //       image: towerImage,
// //       status: 'Under Construction',
// //     },
// //     {
// //       id: 2,
// //       name: 'Commercial Residences',
// //       progress: '89%',
// //       duration: '14 months',
// //       amount: '$1.8M',
// //       image: towerImage,
// //       status: 'Under Construction',
// //     },
// //     {
// //       id: 3,
// //       name: 'Corporate Landmark Project',
// //       progress: '52%',
// //       duration: '24 months',
// //       amount: '$3.2M',
// //       image: towerImage,
// //       status: 'In Design',
// //     },
// //   ];

// //   const filterOptions = [
// //     'All Projects',
// //     'In Planning',
// //     'In Design',
// //     'In Tender',
// //     'Under Construction',
// //     'Completed',
// //     'On Hold',
// //     'Cancelled',
// //   ];

// //   const getProgressColor = (progress) => {
// //     const percentage = parseInt(progress);
// //     if (percentage >= 80) return '#10b981'; // Green
// //     if (percentage >= 60) return '#f59e0b'; // Orange
// //     return '#ef4444'; // Red
// //   };

// //   return (
// //     <>
// //       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
// //       <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
// //         {/* Header Section */}
// //         <View className="bg-blue-100 px-6 pb-6 pt-14 shadow-sm">
// //           <View className="mb-6 flex-row items-center justify-between">
// //             <View>
// //               <Text className="mb-1 text-2xl font-bold text-gray-800">Project Overview</Text>
// //               <Text className="text-sm text-gray-500">Managing your construction projects</Text>
// //             </View>
// //             <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-blue-100">
// //               <Feather name="bell" size={20} color="#2563eb" />
// //             </TouchableOpacity>
// //           </View>

// //           {/* Filter Tabs with Project Counts */}
// //           <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
// //             <View className="flex-row">
// //               {filterOptions.map((filter, index) => (
// //                 <TouchableOpacity
// //                   key={filter}
// //                   onPress={() => setSelectedFilter(filter)}
// //                   className={`mr-3 flex-row items-center rounded-full px-4 py-2 ${
// //                     selectedFilter === filter ? 'bg-blue-600' : 'bg-gray-100'
// //                   }`}>
// //                   <Text
// //                     className={`font-medium ${
// //                       selectedFilter === filter ? 'text-white' : 'text-gray-600'
// //                     }`}>
// //                     {filter}
// //                   </Text>
// //                 </TouchableOpacity>
// //               ))}
// //             </View>
// //           </ScrollView>
// //         </View>

// //         {/* Create New Project Section */}
// //         <View className="mb-8 px-6 py-6">
// //           <View className="flex-row items-center">
// //             <View className="mr-2 flex-1 flex-row items-center rounded-2xl bg-gray-100 px-4 py-3">
// //               <Feather name="search" size={20} color="#6b7280" style={{ marginRight: 8 }} />
// //               <TextInput
// //                 className="flex-1 text-base"
// //                 placeholder="Search projects..."
// //                 placeholderTextColor="#6b7280"
// //               />
// //             </View>
// //             <TouchableOpacity
// //               className="rounded-2xl bg-blue-600 p-3 px-4 shadow-lg active:scale-95"
// //               onPress={() => navigation.navigate('AddNewProject')}>
// //               <Feather name="plus" size={20} color="#ffffff" />
// //             </TouchableOpacity>
// //           </View>
// //         </View>

// //         {/* Project Detail Section */}
// //         <View className="px-6">
// //           <Text className="mb-4 text-lg font-bold text-gray-800">Project Detail</Text>

// //           {projects
// //             .filter(
// //               (project) => selectedFilter === 'All Projects' || project.status === selectedFilter
// //             )
// //             .map((project) => (
// //               <TouchableOpacity
// //                 key={project.id}
// //                 className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
// //                 activeOpacity={0.7}
// //                 onPress={() => navigation.navigate('Dashboard', { projectId: project.id })}>
// //                 <View className="flex-row">
// //                   {/* Project Image */}
// //                   <Image
// //                     source={project.image}
// //                     className="mr-4 h-20 w-20 rounded-xl"
// //                     resizeMode="cover"
// //                   />

// //                   {/* Project Details */}
// //                   <View className="flex-1">
// //                     <Text className="mb-1 text-lg font-bold text-gray-800">{project.name}</Text>

// //                     <View className="mb-2 flex-row items-center">
// //                       <Text className="mr-4 text-sm text-gray-500">{project.duration}</Text>
// //                       <Text className="text-sm font-semibold text-green-600">{project.amount}</Text>
// //                     </View>

// //                     {/* Progress Bar */}
// //                     <View className="mb-2">
// //                       <View className="mb-1 flex-row items-center justify-between">
// //                         <Text className="text-xs text-gray-500">Progress</Text>
// //                         <Text
// //                           className="text-xs font-semibold"
// //                           style={{ color: getProgressColor(project.progress) }}>
// //                           {project.progress}
// //                         </Text>
// //                       </View>
// //                       <View className="h-2 w-full rounded-full bg-gray-200">
// //                         <View
// //                           className="h-2 rounded-full"
// //                           style={{
// //                             width: project.progress,
// //                             backgroundColor: getProgressColor(project.progress),
// //                           }}
// //                         />
// //                       </View>
// //                     </View>

// //                     {/* Action Buttons */}
// //                     {/* <View className="flex-row space-x-2 mt-2">
// //                       <TouchableOpacity className="bg-blue-50 px-3 py-1 rounded-full">
// //                         <Text className="text-blue-600 text-xs font-medium">View Details</Text>
// //                       </TouchableOpacity>
// //                       <TouchableOpacity className="bg-gray-50 px-3 py-1 rounded-full">
// //                         <Text className="text-gray-600 text-xs font-medium">Edit</Text>
// //                       </TouchableOpacity>
// //                     </View> */}
// //                   </View>
// //                 </View>
// //               </TouchableOpacity>
// //             ))}
// //         </View>
// //       </ScrollView>
// //     </>
// //   );
// // }


// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   StatusBar,
//   TextInput,
//   Image,
//   Animated,
//   Dimensions,
// } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import towerImage from '../../assets/image.jpg';

// const { width } = Dimensions.get('window');

// export default function HomeScreen() {
//   const [selectedFilter, setSelectedFilter] = useState('All Projects');
//   const [searchQuery, setSearchQuery] = useState('');
//   const navigation = useNavigation();

//   // Animation values
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideAnim = useRef(new Animated.Value(30)).current;
//   const scaleAnim = useRef(new Animated.Value(0.95)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         tension: 50,
//         friction: 8,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         tension: 50,
//         friction: 8,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const projects = [
//     {
//       id: 1,
//       name: 'Acura Heights Tower',
//       progress: '64%',
//       duration: '18 months',
//       amount: '₹2.5M',
//       image: towerImage,
//       status: 'Under Construction',
//       priority: 'High',
//     },
//     {
//       id: 2,
//       name: 'Commercial Residences',
//       progress: '89%',
//       duration: '14 months',
//       amount: '₹1.8M',
//       image: towerImage,
//       status: 'Under Construction',
//       priority: 'Medium',
//     },
//     {
//       id: 3,
//       name: 'Corporate Landmark Project',
//       progress: '52%',
//       duration: '24 months',
//       amount: '₹3.2M',
//       image: towerImage,
//       status: 'In Design',
//       priority: 'High',
//     },
//   ];

//   const filterOptions = [
//     { name: 'All Projects', count: 3 },
//     { name: 'In Planning', count: 0 },
//     { name: 'In Design', count: 1 },
//     { name: 'In Tender', count: 0 },
//     { name: 'Under Construction', count: 2 },
//     { name: 'Completed', count: 0 },
//     { name: 'On Hold', count: 0 },
//     { name: 'Cancelled', count: 0 },
//   ];

//   const getProgressColor = (progress) => {
//     const percentage = parseInt(progress);
//     if (percentage >= 80) return '#10b981'; // Green
//     if (percentage >= 60) return '#f59e0b'; // Orange
//     return '#ef4444'; // Red
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'Under Construction': return '#3b82f6';
//       case 'In Design': return '#8b5cf6';
//       case 'Completed': return '#10b981';
//       case 'On Hold': return '#f59e0b';
//       case 'Cancelled': return '#ef4444';
//       default: return '#6b7280';
//     }
//   };

//   const filteredProjects = projects.filter(project => {
//     const matchesFilter = selectedFilter === 'All Projects' || project.status === selectedFilter;
//     const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesFilter && matchesSearch;
//   });

//   return (
//     <>
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
//       <View className="flex-1 bg-gray-50">
//         {/* Enhanced Header with Gradient */}
//         <LinearGradient
//           colors={['#ffffff', '#f8fafc', '#e2e8f0']}
//           // className="shadow-lg"
//           start={{ x: 0, y: 0 }}
//           end={{ x: 0, y: 1 }}
//         >
//           <Animated.View 
//             className="px-6 pb-6 pt-16"
//             style={{
//               opacity: fadeAnim,
//               transform: [{ translateY: slideAnim }]
//             }}
//           >
//             {/* Header Title Section */}
//             <View className="mb-6 flex-row items-center justify-between">
//               <View className="flex-1">
//                 <Text className="text-3xl font-bold text-gray-800 mb-1">Project Overview</Text>
//                 <Text className="text-base text-gray-600 font-medium">
//                   Managing {projects.length} construction projects
//                 </Text>
//               </View>
              
//               {/* Enhanced Notification Button */}
//               <TouchableOpacity 
//                 className="h-12 w-12 items-center justify-center rounded-2xl bg-white"
//                 style={{
//                   shadowColor: '#3b82f6',
//                   shadowOffset: { width: 0, height: 4 },
//                   shadowOpacity: 0.1,
//                   shadowRadius: 8,
//                   elevation: 5,
//                 }}
//               >
//                 <Feather name="bell" size={22} color="#3b82f6" />
//                 <View className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full items-center justify-center">
//                   <Text className="text-xs font-bold text-white">3</Text>
//                 </View>
//               </TouchableOpacity>
//             </View>

//             {/* Enhanced Filter Tabs */}
//             <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
//               <View className="flex-row pr-6">
//                 {filterOptions.map((filter, index) => (
//                   <TouchableOpacity
//                     key={filter.name}
//                     onPress={() => setSelectedFilter(filter.name)}
//                     className={`mr-3 flex-row items-center rounded-2xl px-5 py-3 ${
//                       selectedFilter === filter.name ? '' : 'bg-white'
//                     }`}
//                     style={{
//                       backgroundColor: selectedFilter === filter.name ? '#3b82f6' : 'white',
//                       shadowColor: selectedFilter === filter.name ? '#3b82f6' : '#000',
//                       shadowOffset: { width: 0, height: 4 },
//                       shadowOpacity: selectedFilter === filter.name ? 0.3 : 0.05,
//                       shadowRadius: 8,
//                       elevation: selectedFilter === filter.name ? 8 : 2,
//                     }}
//                   >
//                     <Text
//                       className={`font-semibold ${
//                         selectedFilter === filter.name ? 'text-white' : 'text-gray-700'
//                       }`}
//                     >
//                       {filter.name}
//                     </Text>
//                     {filter.count > 0 && (
//                       <View 
//                         className={`ml-2 px-2 py-1 rounded-full ${
//                           selectedFilter === filter.name ? 'bg-white/20' : 'bg-gray-200'
//                         }`}
//                       >
//                         <Text 
//                           className={`text-xs font-bold ${
//                             selectedFilter === filter.name ? 'text-white' : 'text-gray-600'
//                           }`}
//                         >
//                           {filter.count}
//                         </Text>
//                       </View>
//                     )}
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </ScrollView>
//           </Animated.View>
//         </LinearGradient>

//         <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
//           {/* Enhanced Search and Add Section */}
//           <Animated.View 
//             className="px-6 py-6"
//             style={{
//               opacity: scaleAnim,
//               transform: [{ scale: scaleAnim }]
//             }}
//           >
//             <View className="flex-row items-center">
//               {/* Enhanced Search Bar */}
//               <View 
//                 className="mr-4 flex-1 flex-row items-center rounded-2xl bg-white px-5 py-4"
//                 style={{
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 4 },
//                   shadowOpacity: 0.05,
//                   shadowRadius: 8,
//                   elevation: 3,
//                 }}
//               >
//                 <Feather name="search" size={20} color="#6b7280" style={{ marginRight: 12 }} />
//                 <TextInput
//                   className="flex-1 text-base font-medium"
//                   placeholder="Search projects..."
//                   placeholderTextColor="#9ca3af"
//                   value={searchQuery}
//                   onChangeText={setSearchQuery}
//                 />
//                 {searchQuery.length > 0 && (
//                   <TouchableOpacity onPress={() => setSearchQuery('')}>
//                     <Feather name="x" size={18} color="#6b7280" />
//                   </TouchableOpacity>
//                 )}
//               </View>
              
//               {/* Enhanced Add Button */}
//               <TouchableOpacity
//                 className="rounded-2xl p-4 active:scale-95"
//                 onPress={() => navigation.navigate('AddNewProject')}
//                 style={{
//                   backgroundColor: '#3b82f6',
//                   shadowColor: '#3b82f6',
//                   shadowOffset: { width: 0, height: 6 },
//                   shadowOpacity: 0.4,
//                   shadowRadius: 12,
//                   elevation: 8,
//                 }}
//               >
//                 <Feather name="plus" size={22} color="#ffffff" />
//               </TouchableOpacity>
//             </View>
//           </Animated.View>

//           {/* Project List Section */}
//           <View className="px-6 pb-8">
//             <View className="mb-6 flex-row items-center justify-between">
//               <Text className="text-2xl font-bold text-gray-800">Active Projects</Text>
//               <Text className="text-sm font-medium text-gray-500">
//                 {filteredProjects.length} of {projects.length}
//               </Text>
//             </View>

//             {filteredProjects.length > 0 ? (
//               filteredProjects.map((project) => (
//                 <TouchableOpacity
//                   key={project.id}
//                   className="mb-4 rounded-2xl bg-white p-5 border border-gray-100 shadow-sm"
//                   activeOpacity={0.7}
//                   onPress={() => navigation.navigate('Dashboard', { projectId: project.id })}
//                 >
//                   <View className="flex-row">
//                     {/* Project Image */}
//                     <View className="mr-4 h-20 w-20 rounded-xl  border-blue-100 items-center justify-center">
//                       <Image
//                         source={project.image}
//                         className="h-20 w-20 rounded-lg"
//                         resizeMode="cover"
//                       />
//                     </View>

//                     {/* Project Details */}
//                     <View className="flex-1">
//                       <View className="flex-row items-start justify-between mb-2">
//                         <Text className="text-lg font-bold text-blue-900 flex-1 mr-2">
//                           {project.name}
//                         </Text>
//                         <Text className="text-sm font-semibold text-green-600">
//                           {project.amount}
//                         </Text>
//                       </View>

//                       <View className="mb-3 flex-row items-center">
//                         <Text className="text-sm text-gray-600 mr-4">{project.duration}</Text>
//                         <View 
//                           className="px-2 py-1 rounded-full"
//                           style={{ backgroundColor: getStatusColor(project.status) + '20' }}
//                         >
//                           <Text 
//                             className="text-xs font-medium"
//                             style={{ color: getStatusColor(project.status) }}
//                           >
//                             {project.status}
//                           </Text>
//                         </View>
//                       </View>

//                       {/* Progress Bar */}
//                       <View className="mb-3">
//                         <View className="mb-1 flex-row items-center justify-between">
//                           <Text className="text-xs text-gray-600">Progress</Text>
//                           <Text
//                             className="text-xs font-semibold"
//                             style={{ color: getProgressColor(project.progress) }}
//                           >
//                             {project.progress}
//                           </Text>
//                         </View>
//                         <View className="h-2 w-full rounded-full bg-gray-200">
//                           <View
//                             className="h-2 rounded-full"
//                             style={{
//                               width: project.progress,
//                               backgroundColor: getProgressColor(project.progress),
//                             }}
//                           />
//                         </View>
//                       </View>

//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               ))
//             ) : (
//               <View className="items-center py-12">
//                 <Feather name="folder" size={48} color="#d1d5db" />
//                 <Text className="mt-4 text-lg font-medium text-gray-500">No projects found</Text>
//                 <Text className="text-sm text-gray-400 text-center px-8 mt-2">
//                   Try adjusting your search or filter criteria
//                 </Text>
//               </View>
//             )}
//           </View>

//           {/* Bottom Padding */}
//           <View className="h-6" />
//         </ScrollView>
//       </View>
//     </>
//   );
// }

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import towerImage from '../../assets/image.jpg';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const projects = [
    {
      id: 1,
      name: 'Acura Heights Tower',
      progress: '64%',
      duration: '18 months',
      amount: '₹2.5M',
      image: towerImage,
      status: 'Under Construction',
      priority: 'High',
    },
    {
      id: 2,
      name: 'Commercial Residences',
      progress: '89%',
      duration: '14 months',
      amount: '₹1.8M',
      image: towerImage,
      status: 'Under Construction',
      priority: 'Medium',
    },
    {
      id: 3,
      name: 'Corporate Landmark Project',
      progress: '52%',
      duration: '24 months',
      amount: '₹3.2M',
      image: towerImage,
      status: 'In Design',
      priority: 'High',
    },
  ];

  const filterOptions = [
    { name: 'All Projects', count: 3 },
    { name: 'In Planning', count: 0 },
    { name: 'In Design', count: 1 },
    { name: 'In Tender', count: 0 },
    { name: 'Under Construction', count: 2 },
    { name: 'Completed', count: 0 },
    { name: 'On Hold', count: 0 },
    { name: 'Cancelled', count: 0 },
  ];

  const getProgressColor = (progress) => {
    const percentage = parseInt(progress);
    if (percentage >= 80) return '#10b981'; // Green
    if (percentage >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Under Construction': return '#3b82f6';
      case 'In Design': return '#8b5cf6';
      case 'Completed': return '#10b981';
      case 'On Hold': return '#f59e0b';
      case 'Cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = selectedFilter === 'All Projects' || project.status === selectedFilter;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1 bg-gray-50">
        {/* Enhanced Header with Gradient */}
        <LinearGradient
          colors={['#ffffff', '#f8fafc', '#e2e8f0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Animated.View 
            className="px-6 pb-6 pt-10"
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            {/* Header Title Section */}
            <View className="mb-6 flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-3xl font-bold text-gray-800 mb-1">Project Overview</Text>
                <Text className="text-base text-gray-600 font-medium">
                  Managing {projects.length} construction projects
                </Text>
              </View>
              
              {/* Enhanced Notification Button */}
              <TouchableOpacity 
                className="h-12 w-12 items-center justify-center rounded-2xl bg-white"
                style={{
                  shadowColor: '#3b82f6',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 5,
                }}
              >
                <Feather name="bell" size={22} color="#3b82f6" />
                <View className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full items-center justify-center">
                  <Text className="text-xs font-bold text-white">3</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Enhanced Filter Tabs - Shadow Removed */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row pr-6">
                {filterOptions.map((filter, index) => (
                  <TouchableOpacity
                    key={filter.name}
                    onPress={() => setSelectedFilter(filter.name)}
                    className={`mr-3 flex-row items-center rounded-2xl px-5 py-3 ${
                      selectedFilter === filter.name ? '' : 'bg-white'
                    }`}
                    style={{
                      backgroundColor: selectedFilter === filter.name ? '#3b82f6' : 'white',
                      // Shadow properties removed from here
                    }}
                  >
                    <Text
                      className={`font-semibold ${
                        selectedFilter === filter.name ? 'text-white' : 'text-gray-700'
                      }`}
                    >
                      {filter.name}
                    </Text>
                    {filter.count > 0 && (
                      <View 
                        className={`ml-2 px-2 py-1 rounded-full ${
                          selectedFilter === filter.name ? 'bg-white/20' : 'bg-gray-200'
                        }`}
                      >
                        <Text 
                          className={`text-xs font-bold ${
                            selectedFilter === filter.name ? 'text-white' : 'text-gray-600'
                          }`}
                        >
                          {filter.count}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </Animated.View>
        </LinearGradient>

        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          {/* Enhanced Search and Add Section */}
          <Animated.View 
            className="px-6 py-6"
            style={{
              opacity: scaleAnim,
              transform: [{ scale: scaleAnim }]
            }}
          >
            <View className="flex-row items-center">
              {/* Enhanced Search Bar - Height adjusted to match add button */}
              <View 
                className="mr-4 flex-1 flex-row items-center rounded-2xl bg-white px-5 " // Changed py-4 to py-3
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 3,
                  height: 44, // Added fixed height to match add button
                }}
              >
                <Feather name="search" size={20} color="#6b7280" style={{ marginRight: 12 }} />
                <TextInput
                  className="flex-1 text-base font-medium"
                  placeholder="Search projects..."
                  placeholderTextColor="#9ca3af"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={{
                    height: '100%', // Make text input fill the container height
                  }}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Feather name="x" size={18} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>
              
              {/* Enhanced Add Button */}
              <TouchableOpacity
                className="rounded-2xl p-2 active:scale-95"
                onPress={() => navigation.navigate('AddNewProject')}
                style={{
                  backgroundColor: '#3b82f6',
                  // shadowColor: '#3b82f6',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.4,
                  shadowRadius: 12,
                  elevation: 8,
                  height: 44, // Added fixed height
                  width: 56, // Added fixed width for consistency
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Feather name="plus" size={22} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Project List Section */}
          <View className="px-6 pb-8">
            <View className="mb-6 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-gray-800">Active Projects</Text>
              <Text className="text-sm font-medium text-gray-500">
                {filteredProjects.length} of {projects.length}
              </Text>
            </View>

            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <TouchableOpacity
                  key={project.id}
                  className="mb-4 rounded-2xl bg-white p-5 border border-gray-100 shadow-sm"
                  activeOpacity={0.7}
                  onPress={() => navigation.navigate('Dashboard', { projectId: project.id })}
                >
                  <View className="flex-row">
                    {/* Project Image */}
                    <View className="mr-4 h-20 w-20 rounded-xl  border-blue-100 items-center justify-center">
                      <Image
                        source={project.image}
                        className="h-20 w-20 rounded-lg"
                        resizeMode="cover"
                      />
                    </View>

                    {/* Project Details */}
                    <View className="flex-1">
                      <View className="flex-row items-start justify-between mb-2">
                        <Text className="text-lg font-bold text-blue-900 flex-1 mr-2">
                          {project.name}
                        </Text>
                        <Text className="text-sm font-semibold text-green-600">
                          {project.amount}
                        </Text>
                      </View>

                      <View className="mb-3 flex-row items-center">
                        <Text className="text-sm text-gray-600 mr-4">{project.duration}</Text>
                        <View 
                          className="px-2 py-1 rounded-full"
                          style={{ backgroundColor: getStatusColor(project.status) + '20' }}
                        >
                          <Text 
                            className="text-xs font-medium"
                            style={{ color: getStatusColor(project.status) }}
                          >
                            {project.status}
                          </Text>
                        </View>
                      </View>

                      {/* Progress Bar */}
                      <View className="mb-3">
                        <View className="mb-1 flex-row items-center justify-between">
                          <Text className="text-xs text-gray-600">Progress</Text>
                          <Text
                            className="text-xs font-semibold"
                            style={{ color: getProgressColor(project.progress) }}
                          >
                            {project.progress}
                          </Text>
                        </View>
                        <View className="h-2 w-full rounded-full bg-gray-200">
                          <View
                            className="h-2 rounded-full"
                            style={{
                              width: project.progress,
                              backgroundColor: getProgressColor(project.progress),
                            }}
                          />
                        </View>
                      </View>

                    </View>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View className="items-center py-12">
                <Feather name="folder" size={48} color="#d1d5db" />
                <Text className="mt-4 text-lg font-medium text-gray-500">No projects found</Text>
                <Text className="text-sm text-gray-400 text-center px-8 mt-2">
                  Try adjusting your search or filter criteria
                </Text>
              </View>
            )}
          </View>

          {/* Bottom Padding */}
          <View className="h-6" />
        </ScrollView>
      </View>
    </>
  );
}