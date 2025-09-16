

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
//   Platform,
//   SafeAreaView,
// } from 'react-native';
// import { Feather } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import towerImage from '../../assets/image.jpg';
// import Sidebar from './components/Sidebar';

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

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const sidebarAnim = useRef(new Animated.Value(-256)).current;
//   const menuButtonScale = useRef(new Animated.Value(1)).current;
//   const menuButtonRotation = useRef(new Animated.Value(0)).current;

//   const toggleSidebar = () => {
//     Animated.sequence([
//       Animated.timing(menuButtonScale, {
//         toValue: 0.9,
//         duration: 100,
//         useNativeDriver: true,
//       }),
//       Animated.timing(menuButtonScale, {
//         toValue: 1,
//         duration: 100,
//         useNativeDriver: true,
//       })
//     ]).start();

//     Animated.timing(menuButtonRotation, {
//       toValue: isSidebarOpen ? 0 : 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     Animated.timing(sidebarAnim, {
//       toValue: isSidebarOpen ? -256 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const getProgressColor = (progress) => {
//     const percentage = parseInt(progress);
//     if (percentage >= 80) return '#10b981';
//     if (percentage >= 60) return '#f59e0b';
//     return '#ef4444';
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

//   const rotateInterpolation = menuButtonRotation.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['0deg', '90deg'],
//   });

//   // Only apply paddingTop on Android
//   const safeAreaTop = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
//       <Animated.View
//         style={{
//           position: 'absolute',
//           top: 0,
//           bottom: 0,
//           left: 0,
//           width: 256,
//           transform: [{ translateX: sidebarAnim }],
//           zIndex: 40,
//         }}
//       >
//         <View className="flex-1 bg-blue-900">
//           {isSidebarOpen && (
//             <TouchableOpacity
//               className="absolute top-4 right-4 pt-8 z-20"
//               onPress={toggleSidebar}
//             >
//               <Feather name="x" size={24} color="#ffffff" />
//             </TouchableOpacity>
//           )}
//           <Sidebar />
//         </View>
//       </Animated.View>

//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

//       <View className="flex-1 bg-gray-50">
//         <LinearGradient
//           colors={['#ffffff', '#f8fafc', '#e2e8f0']}
//           start={{ x: 0, y: 0 }}
//           end={{ x: 0, y: 1 }}
//         >
//           <Animated.View 
//             className="px-6 pb-6"
//             style={{
//               paddingTop: safeAreaTop,
//               opacity: fadeAnim,
//               transform: [{ translateY: slideAnim }]
//             }}
//           >
//             <View className="mb-6 flex-row items-center justify-between">
//               {!isSidebarOpen && (
//                 <Animated.View
//                   style={{
//                     transform: [
//                       { scale: menuButtonScale },
//                       { rotate: rotateInterpolation }
//                     ]
//                   }}
//                 >
//                   <TouchableOpacity 
//                     className="mr-4 h-12 w-12 items-center justify-center rounded-2xl"
//                     onPress={toggleSidebar}
//                     activeOpacity={0.8}
//                     style={{
//                       backgroundColor: '#ffffff',
//                       shadowColor: '#3b82f6',
//                       shadowOffset: { width: 0, height: 8 },
//                       shadowOpacity: 0.15,
//                       shadowRadius: 16,
//                       elevation: 8,
//                     }}
//                   >
//                     <LinearGradient colors={['#fdfeffff', '#f8fafdff']} start={{ x: 0, y: 0 }}
//                       end={{ x: 1, y: 1 }}
//                       style={{
//                         width: 48,
//                         height: 48,
//                         borderRadius: 16,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                       }}
//                     >
//                       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//                         <View style={{
//                             width: 18,
//                             height: 2,
//                             backgroundColor: '#4662edff',
//                             borderRadius: 1,
//                             marginBottom: 3,
//                           }}/>
//                         <View style={{
//                             width: 14,
//                             height: 2,
//                             backgroundColor: '#4662edff',
//                             borderRadius: 1,
//                             marginBottom: 3,
//                             alignSelf: 'flex-start',
//                           }}/>
//                         <View style={{
//                             width: 18,
//                             height: 2,
//                             backgroundColor: '#4662edff',
//                             borderRadius: 1,
//                           }}/>
//                       </View>
//                     </LinearGradient>
//                   </TouchableOpacity>
//                 </Animated.View>
//               )}
              
//               <View className="flex-1">
//                 <Text className="text-2xl font-bold text-gray-800 mb-1">Project Overview</Text>
//                 <Text className="text-sm text-gray-600 font-medium">
//                   Managing {projects.length} construction projects
//                 </Text>
//               </View>
              
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

//             <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
//               <View className="flex-row pr-6">
//                 {filterOptions.map((filter) => (
//                   <TouchableOpacity
//                     key={filter.name}
//                     onPress={() => setSelectedFilter(filter.name)}
//                     className={`mr-3 flex-row items-center rounded-2xl px-5 py-3`}
//                     style={{
//                       backgroundColor: selectedFilter === filter.name ? '#3b82f6' : 'white',
//                     }}
//                   >
//                     <Text className={`font-semibold ${selectedFilter === filter.name ? 'text-white' : 'text-gray-700'}`}>
//                       {filter.name}
//                     </Text>
//                     {filter.count > 0 && (
//                       <View 
//                         className={`ml-2 px-2 py-1 rounded-full`}
//                         style={{ backgroundColor: selectedFilter === filter.name ? 'rgba(255,255,255,0.2)' : '#e5e7eb' }}
//                       >
//                         <Text className={`text-xs font-bold ${selectedFilter === filter.name ? 'text-white' : 'text-gray-600'}`}>
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
//           <Animated.View 
//             className="px-6 py-6"
//             style={{
//               opacity: scaleAnim,
//               transform: [{ scale: scaleAnim }]
//             }}
//           >
//             <View className="flex-row items-center">
//               <View 
//                 className="mr-4 flex-1 flex-row items-center rounded-2xl bg-white px-5"
//                 style={{
//                   shadowColor: '#000',
//                   shadowOffset: { width: 0, height: 4 },
//                   shadowOpacity: 0.05,
//                   shadowRadius: 8,
//                   elevation: 3,
//                   height: 44,
//                 }}
//               >
//                 <Feather name="search" size={20} color="#6b7280" style={{ marginRight: 12 }} />
//                 <TextInput
//                   className="flex-1 text-base font-medium"
//                   placeholder="Search projects..."
//                   placeholderTextColor="#9ca3af"
//                   value={searchQuery}
//                   onChangeText={setSearchQuery}
//                   style={{ height: '100%' }}
//                 />
//                 {searchQuery.length > 0 && (
//                   <TouchableOpacity onPress={() => setSearchQuery('')}>
//                     <Feather name="x" size={18} color="#6b7280" />
//                   </TouchableOpacity>
//                 )}
//               </View>
              
//               <TouchableOpacity
//                 className="rounded-2xl p-2 active:scale-95"
//                 onPress={() => navigation.navigate('AddNewProject')}
//                 style={{
//                   backgroundColor: '#3b82f6',
//                   shadowOffset: { width: 0, height: 6 },
//                   shadowOpacity: 0.4,
//                   shadowRadius: 12,
//                   elevation: 8,
//                   height: 44,
//                   width: 56,
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                 }}
//               >
//                 <Feather name="plus" size={22} color="#ffffff" />
//               </TouchableOpacity>
//             </View>
//           </Animated.View>

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
//                     <View className="mr-4 h-20 w-20 rounded-xl border-blue-100 items-center justify-center">
//                       <Image
//                         source={project.image}
//                         className="h-20 w-20 rounded-lg"
//                         resizeMode="cover"
//                       />
//                     </View>

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

//           <View className="h-6" />
//         </ScrollView>
//       </View>
//     </SafeAreaView>
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
  Platform,
  SafeAreaView,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import towerImage from '../../assets/image.jpg';
import Sidebar from './components/Sidebar';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All Projects');
  const [searchQuery, setSearchQuery] = useState(''); 
  const navigation = useNavigation();

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-256)).current;
  const menuButtonScale = useRef(new Animated.Value(1)).current;
  const menuButtonRotation = useRef(new Animated.Value(0)).current;

  const toggleSidebar = () => {
    Animated.sequence([
      Animated.timing(menuButtonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(menuButtonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();

    Animated.timing(menuButtonRotation, {
      toValue: isSidebarOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? -256 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setIsSidebarOpen(!isSidebarOpen);
  };

  const getProgressColor = (progress) => {
    const percentage = parseInt(progress);
    if (percentage >= 80) return '#10b981';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
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

  const rotateInterpolation = menuButtonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const safeAreaTop = Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Sidebar */}
      <Animated.View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 256,
          transform: [{ translateX: sidebarAnim }],
          zIndex: 40,
        }}
      >
        <View className="flex-1 bg-blue-900">
          {isSidebarOpen && (
            <TouchableOpacity
              className="absolute top-4 right-4 pt-8 z-20"
              onPress={toggleSidebar}
            >
              <Feather name="x" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
          <Sidebar />
        </View>
      </Animated.View>

      {/* Overlay Blur */}
      {isSidebarOpen && (
        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleSidebar}
          style={{
            position: 'absolute',
            top: 0,
            left: 256,
            right: 0,
            bottom: 0,
            zIndex: 30,
          }}
        >
          <BlurView intensity={50} tint="light" style={{ flex: 1 }} />
        </TouchableOpacity>
      )}

      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View className="flex-1 bg-gray-50">
        <LinearGradient
          colors={['#ffffff', '#f8fafc', '#e2e8f0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <Animated.View 
            className="px-6 pb-6"
            style={{
              paddingTop: safeAreaTop,
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }}
          >
            <View className="mb-6 flex-row items-center justify-between">
              {!isSidebarOpen && (
                <Animated.View
                  style={{
                    transform: [
                      { scale: menuButtonScale },
                      { rotate: rotateInterpolation }
                    ]
                  }}
                >
                  <TouchableOpacity 
                    className="mr-4 h-12 w-12 items-center justify-center rounded-2xl"
                    onPress={toggleSidebar}
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: '#ffffff',
                      shadowColor: '#3b82f6',
                      shadowOffset: { width: 0, height: 8 },
                      shadowOpacity: 0.15,
                      shadowRadius: 16,
                      elevation: 8,
                    }}
                  >
                    <LinearGradient colors={['#fdfeffff', '#f8fafdff']} start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 16,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{
                            width: 18,
                            height: 2,
                            backgroundColor: '#4662edff',
                            borderRadius: 1,
                            marginBottom: 3,
                          }}/>
                        <View style={{
                            width: 14,
                            height: 2,
                            backgroundColor: '#4662edff',
                            borderRadius: 1,
                            marginBottom: 3,
                            alignSelf: 'flex-start',
                          }}/>
                        <View style={{
                            width: 18,
                            height: 2,
                            backgroundColor: '#4662edff',
                            borderRadius: 1,
                          }}/>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              )}
              
              <View className="flex-1">
                <Text className="text-2xl font-bold text-gray-800 mb-1">Project Overview</Text>
                <Text className="text-sm text-gray-600 font-medium">
                  Managing {projects.length} construction projects
                </Text>
              </View>
              
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

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
              <View className="flex-row pr-6">
                {filterOptions.map((filter) => (
                  <TouchableOpacity
                    key={filter.name}
                    onPress={() => setSelectedFilter(filter.name)}
                    className={`mr-3 flex-row items-center rounded-2xl px-5 py-3`}
                    style={{
                      backgroundColor: selectedFilter === filter.name ? '#3b82f6' : 'white',
                    }}
                  >
                    <Text className={`font-semibold ${selectedFilter === filter.name ? 'text-white' : 'text-gray-700'}`}>
                      {filter.name}
                    </Text>
                    {filter.count > 0 && (
                      <View 
                        className={`ml-2 px-2 py-1 rounded-full`}
                        style={{ backgroundColor: selectedFilter === filter.name ? 'rgba(255,255,255,0.2)' : '#e5e7eb' }}
                      >
                        <Text className={`text-xs font-bold ${selectedFilter === filter.name ? 'text-white' : 'text-gray-600'}`}>
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
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.05,
                  shadowRadius: 8,
                  elevation: 3,
                  height: 44,
                }}
              >
                <Feather name="search" size={20} color="#6b7280" style={{ marginRight: 12 }} />
                <TextInput
                  className="flex-1 text-base font-medium"
                  placeholder="Search projects..."
                  placeholderTextColor="#9ca3af"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={{ height: '100%' }}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Feather name="x" size={18} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>
              
              <TouchableOpacity
                className="rounded-2xl p-2 active:scale-95"
                onPress={() => navigation.navigate('AddNewProject')}
                style={{
                  backgroundColor: '#3b82f6',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.4,
                  shadowRadius: 12,
                  elevation: 8,
                  height: 44,
                  width: 56,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Feather name="plus" size={22} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </Animated.View>

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
                    <View className="mr-4 h-20 w-20 rounded-xl border-blue-100 items-center justify-center">
                      <Image
                        source={project.image}
                        className="h-20 w-20 rounded-lg"
                        resizeMode="cover"
                      />
                    </View>

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

          <View className="h-6" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
