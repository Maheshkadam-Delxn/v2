import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Animated,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../components/MainLayout';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ApprovalsWorkflows = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('approvals');
  const [approvalsList, setApprovalsList] = useState([]);
  const [workflowsList, setWorkflowsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    fetchData();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      setLoading(false);
      // Set sample data for demo
      setSampleData();
      return;
    }
    
    try {
      const parsedData = JSON.parse(userData);

      // Fetch Approvals
      try {
        const approvalsResponse = await fetch(
          'https://api-v2-skystruct.prudenttec.com/approvals/list',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${parsedData.jwtToken}`,
              'X-Menu-Id': '19Ab9n5HF73',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          }
        );
        
        const approvalsText = await approvalsResponse.text();
        console.log('Approvals Response:', approvalsText);
        
        if (approvalsText.startsWith('<')) {
          console.log('Received HTML instead of JSON for approvals');
          setSampleData();
        } else {
          const approvalsData = JSON.parse(approvalsText);
          setApprovalsList(approvalsData.approvals || []);
        }
      } catch (appError) {
        console.error('Error fetching approvals:', appError);
        setSampleData();
      }

      // Fetch Workflows
      try {
        const workflowsResponse = await fetch(
          'https://api-v2-skystruct.prudenttec.com/workflows/list',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${parsedData.jwtToken}`,
              'X-Menu-Id': '19Ab9n5HF73',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
          }
        );
        
        const workflowsText = await workflowsResponse.text();
        console.log('Workflows Response:', workflowsText);
        
        if (workflowsText.startsWith('<')) {
          console.log('Received HTML instead of JSON for workflows');
          setSampleData();
        } else {
          const workflowsData = JSON.parse(workflowsText);
          setWorkflowsList(workflowsData.workflows || []);
        }
      } catch (workError) {
        console.error('Error fetching workflows:', workError);
        setSampleData();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSampleData();
    } finally {
      setLoading(false);
    }
  };

  const setSampleData = () => {
    // Sample data for demonstration
    setApprovalsList([
      {
        id: 1,
        name: 'Sonalika',
        role: 'Approver',
        status: 'active',
        department: 'Engineering',
      },
      {
        id: 2,
        name: 'Mukesh Sinha',
        role: 'Senior Approver',
        status: 'approved',
        department: 'Construction',
      },
      {
        id: 3,
        name: 'Rahul Kumar',
        role: 'Manager',
        status: 'pending',
        department: 'Finance',
      },
    ]);

    setWorkflowsList([
      {
        id: 1,
        name: 'BOQ Approval Workflow',
        title: 'BOQ Approval Workflow',
        description: 'Standard approval process for BOQ items',
        steps: 3,
        approvers: 2,
        progress: 66,
      },
      {
        id: 2,
        name: 'Purchase Order Workflow',
        title: 'Purchase Order Workflow',
        description: 'Approval workflow for purchase orders',
        steps: 4,
        approvers: 3,
        progress: 25,
      },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const ApproverCard = ({ item, index }) => {
    const cardAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          opacity: cardAnim,
          transform: [
            {
              translateY: cardAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <TouchableOpacity
          className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
          onPress={() => {
            console.log('Selected item:', item);
          }}
        >
          <View className="flex-row items-center">
            <View className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-12 h-12 items-center justify-center mr-4">
              <Text className="text-white font-bold text-lg">
                {item.name?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </View>

            <View className="flex-1">
              <Text className="text-base font-bold text-gray-900">{item.name}</Text>
              <View className="flex-row items-center mt-1">
                <Feather name="check-circle" size={14} color="#10b981" />
                <Text className="text-sm text-gray-500 ml-1.5">{item.role || 'Approver'}</Text>
              </View>
            </View>

            <View
              className={`px-3 py-1.5 rounded-full ${
                item.status === 'approved'
                  ? 'bg-green-100'
                  : item.status === 'pending'
                  ? 'bg-yellow-100'
                  : 'bg-gray-100'
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  item.status === 'approved'
                    ? 'text-green-700'
                    : item.status === 'pending'
                    ? 'text-yellow-700'
                    : 'text-gray-700'
                }`}
              >
                {item.status?.charAt(0).toUpperCase() + item.status?.slice(1) || 'Active'}
              </Text>
            </View>

            <Feather name="chevron-right" size={20} color="#9ca3af" style={{ marginLeft: 8 }} />
          </View>

          {item.department && (
            <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100">
              <Feather name="briefcase" size={14} color="#6b7280" />
              <Text className="text-xs text-gray-600 ml-2">{item.department}</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const WorkflowCard = ({ item, index }) => {
    const cardAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(cardAnim, {
        toValue: 1,
        duration: 300,
        delay: index * 100,
        useNativeDriver: true,
      }).start();
    }, []);

    return (
      <Animated.View
        style={{
          opacity: cardAnim,
          transform: [
            {
              translateY: cardAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <TouchableOpacity
          className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
          onPress={() => {
            console.log('Selected workflow:', item);
          }}
        >
          <View className="flex-row items-start justify-between mb-3">
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-900">{item.name || item.title}</Text>
              <Text className="text-sm text-gray-500 mt-1">
                {item.description || 'Workflow process'}
              </Text>
            </View>
            <Feather name="chevron-right" size={20} color="#9ca3af" />
          </View>

          <View className="flex-row items-center">
            <Feather name="layers" size={14} color="#3b82f6" />
            <Text className="text-xs text-gray-600 ml-2">
              {item.steps || 3} steps • {item.approvers || 2} approvers
            </Text>
          </View>

          {item.progress !== undefined && (
            <View className="mt-3">
              <View className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <View
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${item.progress}%` }}
                />
              </View>
              <Text className="text-xs text-gray-500 mt-1">{item.progress}% complete</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const renderEmptyState = (type) => (
    <View className="flex-1 items-center justify-center py-20">
      <View className="bg-gray-100 rounded-full p-6 mb-4">
        <Feather
          name={type === 'approvals' ? 'check-square' : 'git-branch'}
          size={48}
          color="#9ca3af"
        />
      </View>
      <Text className="text-gray-900 font-bold text-lg mb-2">
        No {type === 'approvals' ? 'Approvals' : 'Workflows'} Found
      </Text>
      <Text className="text-gray-500 text-sm text-center px-8">
        {type === 'approvals'
          ? 'There are no pending approvals at the moment'
          : 'No workflows have been created yet'}
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      <MainLayout title="Approvals & Workflows">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="flex-1"
        >
          <View className="bg-white px-5 py-3 border-b border-gray-200">
            <View className="flex-row bg-gray-100 rounded-xl p-1">
              <TouchableOpacity
                className={`flex-1 py-2.5 rounded-lg ${
                  activeTab === 'approvals' ? 'bg-white' : 'bg-transparent'
                }`}
                onPress={() => setActiveTab('approvals')}
                style={
                  activeTab === 'approvals' && {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                  }
                }
              >
                <Text
                  className={`text-center font-bold text-sm ${
                    activeTab === 'approvals' ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  Approvals
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className={`flex-1 py-2.5 rounded-lg ${
                  activeTab === 'workflows' ? 'bg-white' : 'bg-transparent'
                }`}
                onPress={() => setActiveTab('workflows')}
                style={
                  activeTab === 'workflows' && {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.1,
                    shadowRadius: 2,
                    elevation: 2,
                  }
                }
              >
                <Text
                  className={`text-center font-bold text-sm ${
                    activeTab === 'workflows' ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  Workflows
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <View className="flex-1 items-center justify-center">
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text className="text-gray-500 mt-3 text-sm">Loading data...</Text>
            </View>
          ) : (
            <ScrollView
              className="flex-1 px-5 py-4"
              showsVerticalScrollIndicator={false}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
              {activeTab === 'approvals' ? (
                approvalsList.length > 0 ? (
                  approvalsList.map((item, index) => (
                    <ApproverCard key={item.id || index} item={item} index={index} />
                  ))
                ) : (
                  renderEmptyState('approvals')
                )
              ) : workflowsList.length > 0 ? (
                workflowsList.map((item, index) => (
                  <WorkflowCard key={item.id || index} item={item} index={index} />
                ))
              ) : (
                renderEmptyState('workflows')
              )}
            </ScrollView>
          )}

          <TouchableOpacity
            className="absolute bottom-6 right-6 bg-blue-500 rounded-full w-14 h-14 items-center justify-center"
            style={{
              shadowColor: '#3b82f6',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 5,
              elevation: 5,
            }}
            onPress={() => {
              console.log('Add new', activeTab);
            }}
          >
            <Feather name="plus" size={24} color="#ffffff" />
          </TouchableOpacity>
        </Animated.View>
      </MainLayout>
    </View>
  );
};

export default ApprovalsWorkflows;


// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   FlatList,
//   Animated,
//   ActivityIndicator,
//   RefreshControl,
// } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { useNavigation } from '@react-navigation/native';
// import MainLayout from '../../../../components/MainLayout';
// import { Feather } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ApprovalsWorkflows = () => {
//   const navigation = useNavigation();
//   const [activeTab, setActiveTab] = useState('approvals'); // 'approvals' or 'workflows'
//   const [approvalsList, setApprovalsList] = useState([]);
//   const [workflowsList, setWorkflowsList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
  
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(0.95)).current;
//   const slideAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     fetchData();
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 400,
//         useNativeDriver: true,
//       }),
//       Animated.spring(scaleAnim, {
//         toValue: 1,
//         friction: 8,
//         tension: 40,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   useEffect(() => {
//     Animated.spring(slideAnim, {
//       toValue: activeTab === 'approvals' ? 0 : 1,
//       friction: 8,
//       tension: 40,
//       useNativeDriver: true,
//     }).start();
//   }, [activeTab]);

//   const fetchData = async () => {
//     setLoading(true);
//     const userData = await AsyncStorage.getItem('userData');
//     if (!userData) {
//       console.log('❌ No user data found in storage');
//       setLoading(false);
//       return;
//     }
//     const parsedData = JSON.parse(userData);

//     try {
//       // Fetch Approvals
//       const approvalsResponse = await fetch(
//         'https://api-v2-skystruct.prudenttec.com/approvals/list',
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${parsedData.jwtToken}`,
//             'X-Menu-Id': '19Ab9n5HF73',
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const approvalsData = await approvalsResponse.json();
//       setApprovalsList(approvalsData.approvals || []);

//       // Fetch Workflows
//       const workflowsResponse = await fetch(
//         'https://api-v2-skystruct.prudenttec.com/workflows/list',
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${parsedData.jwtToken}`,
//             'X-Menu-Id': '19Ab9n5HF73',
//             'Content-Type': 'application/json',
//           },
//         }
//       );
//       const workflowsData = await workflowsResponse.json();
//       setWorkflowsList(workflowsData.workflows || []);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onRefresh = async () => {
//     setRefreshing(true);
//     await fetchData();
//     setRefreshing(false);
//   };

//   const renderApproverCard = ({ item, index }) => {
//     const cardAnim = useRef(new Animated.Value(0)).current;

//     React.useEffect(() => {
//       Animated.timing(cardAnim, {
//         toValue: 1,
//         duration: 300,
//         delay: index * 100,
//         useNativeDriver: true,
//       }).start();
//     }, []);

//     return (
//       <Animated.View
//         style={{
//           opacity: cardAnim,
//           transform: [
//             {
//               translateY: cardAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [20, 0],
//               }),
//             },
//           ],
//         }}
//       >
//         <TouchableOpacity
//           className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
//           style={{
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.05,
//             shadowRadius: 4,
//             elevation: 2,
//           }}
//           onPress={() => {
//             // Handle navigation to detail page
//             console.log('Selected item:', item);
//           }}
//         >
//           <View className="flex-row items-center">
//             {/* Avatar */}
//             <View className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-12 h-12 items-center justify-center mr-4">
//               <Text className="text-white font-bold text-lg">
//                 {item.name?.charAt(0).toUpperCase() || 'U'}
//               </Text>
//             </View>

//             {/* Info */}
//             <View className="flex-1">
//               <Text className="text-base font-bold text-gray-900">{item.name}</Text>
//               <View className="flex-row items-center mt-1">
//                 <Feather name="check-circle" size={14} color="#10b981" />
//                 <Text className="text-sm text-gray-500 ml-1.5">{item.role || 'Approver'}</Text>
//               </View>
//             </View>

//             {/* Status Badge */}
//             <View
//               className={`px-3 py-1.5 rounded-full ${
//                 item.status === 'approved'
//                   ? 'bg-green-100'
//                   : item.status === 'pending'
//                   ? 'bg-yellow-100'
//                   : 'bg-gray-100'
//               }`}
//             >
//               <Text
//                 className={`text-xs font-semibold ${
//                   item.status === 'approved'
//                     ? 'text-green-700'
//                     : item.status === 'pending'
//                     ? 'text-yellow-700'
//                     : 'text-gray-700'
//                 }`}
//               >
//                 {item.status?.charAt(0).toUpperCase() + item.status?.slice(1) || 'Active'}
//               </Text>
//             </View>

//             {/* Arrow */}
//             <Feather name="chevron-right" size={20} color="#9ca3af" style={{ marginLeft: 8 }} />
//           </View>

//           {/* Additional Info */}
//           {item.department && (
//             <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100">
//               <Feather name="briefcase" size={14} color="#6b7280" />
//               <Text className="text-xs text-gray-600 ml-2">{item.department}</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };

//   const renderWorkflowCard = ({ item, index }) => {
//     const cardAnim = useRef(new Animated.Value(0)).current;

//     React.useEffect(() => {
//       Animated.timing(cardAnim, {
//         toValue: 1,
//         duration: 300,
//         delay: index * 100,
//         useNativeDriver: true,
//       }).start();
//     }, []);

//     return (
//       <Animated.View
//         style={{
//           opacity: cardAnim,
//           transform: [
//             {
//               translateY: cardAnim.interpolate({
//                 inputRange: [0, 1],
//                 outputRange: [20, 0],
//               }),
//             },
//           ],
//         }}
//       >
//         <TouchableOpacity
//           className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-gray-100"
//           style={{
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.05,
//             shadowRadius: 4,
//             elevation: 2,
//           }}
//           onPress={() => {
//             console.log('Selected workflow:', item);
//           }}
//         >
//           <View className="flex-row items-start justify-between mb-3">
//             <View className="flex-1">
//               <Text className="text-base font-bold text-gray-900">{item.name || item.title}</Text>
//               <Text className="text-sm text-gray-500 mt-1">
//                 {item.description || 'Workflow process'}
//               </Text>
//             </View>
//             <Feather name="chevron-right" size={20} color="#9ca3af" />
//           </View>

//           {/* Workflow Steps */}
//           <View className="flex-row items-center">
//             <Feather name="layers" size={14} color="#3b82f6" />
//             <Text className="text-xs text-gray-600 ml-2">
//               {item.steps || 3} steps • {item.approvers || 2} approvers
//             </Text>
//           </View>

//           {/* Progress Bar */}
//           {item.progress !== undefined && (
//             <View className="mt-3">
//               <View className="bg-gray-200 rounded-full h-2 overflow-hidden">
//                 <View
//                   className="bg-blue-500 h-full rounded-full"
//                   style={{ width: `${item.progress}%` }}
//                 />
//               </View>
//               <Text className="text-xs text-gray-500 mt-1">{item.progress}% complete</Text>
//             </View>
//           )}
//         </TouchableOpacity>
//       </Animated.View>
//     );
//   };

//   const renderEmptyState = (type) => (
//     <View className="flex-1 items-center justify-center py-20">
//       <View className="bg-gray-100 rounded-full p-6 mb-4">
//         <Feather
//           name={type === 'approvals' ? 'check-square' : 'git-branch'}
//           size={48}
//           color="#9ca3af"
//         />
//       </View>
//       <Text className="text-gray-900 font-bold text-lg mb-2">
//         No {type === 'approvals' ? 'Approvals' : 'Workflows'} Found
//       </Text>
//       <Text className="text-gray-500 text-sm text-center px-8">
//         {type === 'approvals'
//           ? 'There are no pending approvals at the moment'
//           : 'No workflows have been created yet'}
//       </Text>
//     </View>
//   );

//   return (
//     <View className="flex-1 bg-gray-50">
//       <StatusBar style="auto" />
//       <MainLayout title="Approvals & Workflows">
//         <Animated.View
//           style={{
//             opacity: fadeAnim,
//             transform: [{ scale: scaleAnim }],
//           }}
//           className="flex-1"
//         >
//           {/* Header */}
//           <LinearGradient
//             colors={['#3b82f6', '#2563eb']}
//             className="px-5 py-4 flex-row items-center justify-between"
//           >
//             <View className="flex-row items-center flex-1">
//               <View className="bg-white/20 rounded-full p-2 mr-3">
//                 <Feather name="check-square" size={20} color="#ffffff" />
//               </View>
//               <Text className="text-white text-lg font-bold">Approvals & Workflows</Text>
//             </View>
//             <TouchableOpacity
//               onPress={() => navigation.goBack()}
//               className="bg-white/20 rounded-full p-2"
//             >
//               <Feather name="x" size={20} color="#ffffff" />
//             </TouchableOpacity>
//           </LinearGradient>

//           {/* Tabs */}
//           <View className="bg-white px-5 py-3 border-b border-gray-200">
//             <View className="flex-row bg-gray-100 rounded-xl p-1">
//               <TouchableOpacity
//                 className={`flex-1 py-2.5 rounded-lg ${
//                   activeTab === 'approvals' ? 'bg-white' : 'bg-transparent'
//                 }`}
//                 onPress={() => setActiveTab('approvals')}
//                 style={
//                   activeTab === 'approvals' && {
//                     shadowColor: '#000',
//                     shadowOffset: { width: 0, height: 1 },
//                     shadowOpacity: 0.1,
//                     shadowRadius: 2,
//                     elevation: 2,
//                   }
//                 }
//               >
//                 <Text
//                   className={`text-center font-bold text-sm ${
//                     activeTab === 'approvals' ? 'text-blue-600' : 'text-gray-500'
//                   }`}
//                 >
//                   Approvals
//                 </Text>
//               </TouchableOpacity>

//               <TouchableOpacity
//                 className={`flex-1 py-2.5 rounded-lg ${
//                   activeTab === 'workflows' ? 'bg-white' : 'bg-transparent'
//                 }`}
//                 onPress={() => setActiveTab('workflows')}
//                 style={
//                   activeTab === 'workflows' && {
//                     shadowColor: '#000',
//                     shadowOffset: { width: 0, height: 1 },
//                     shadowOpacity: 0.1,
//                     shadowRadius: 2,
//                     elevation: 2,
//                   }
//                 }
//               >
//                 <Text
//                   className={`text-center font-bold text-sm ${
//                     activeTab === 'workflows' ? 'text-blue-600' : 'text-gray-500'
//                   }`}
//                 >
//                   Workflows
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Content */}
//           {loading ? (
//             <View className="flex-1 items-center justify-center">
//               <ActivityIndicator size="large" color="#3b82f6" />
//               <Text className="text-gray-500 mt-3 text-sm">Loading data...</Text>
//             </View>
//           ) : (
//             <ScrollView
//               className="flex-1 px-5 py-4"
//               showsVerticalScrollIndicator={false}
//               refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//             >
//               {activeTab === 'approvals' ? (
//                 approvalsList.length > 0 ? (
//                   <FlatList
//                     data={approvalsList}
//                     keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//                     renderItem={renderApproverCard}
//                     scrollEnabled={false}
//                   />
//                 ) : (
//                   renderEmptyState('approvals')
//                 )
//               ) : workflowsList.length > 0 ? (
//                 <FlatList
//                   data={workflowsList}
//                   keyExtractor={(item, index) => item.id?.toString() || index.toString()}
//                   renderItem={renderWorkflowCard}
//                   scrollEnabled={false}
//                 />
//               ) : (
//                 renderEmptyState('workflows')
//               )}

//               {/* Sample Data Display - Remove this when API is integrated */}
//               {activeTab === 'approvals' && approvalsList.length === 0 && (
//                 <View>
//                   {renderApproverCard({
//                     item: {
//                       id: 1,
//                       name: 'Sonalika',
//                       role: 'Approver',
//                       status: 'active',
//                       department: 'Engineering',
//                     },
//                     index: 0,
//                   })}
//                 </View>
//               )}
//             </ScrollView>
//           )}

//           {/* Floating Action Button */}
//           <TouchableOpacity
//             className="absolute bottom-6 right-6 bg-blue-500 rounded-full w-14 h-14 items-center justify-center"
//             style={{
//               shadowColor: '#3b82f6',
//               shadowOffset: { width: 0, height: 4 },
//               shadowOpacity: 0.3,
//               shadowRadius: 5,
//               elevation: 5,
//             }}
//             onPress={() => {
//               // Handle add new approval/workflow
//               console.log('Add new', activeTab);
//             }}
//           >
//             <Feather name="plus" size={24} color="#ffffff" />
//           </TouchableOpacity>
//         </Animated.View>
//       </MainLayout>
//     </View>
//   );
// };

// export default ApprovalsWorkflows;