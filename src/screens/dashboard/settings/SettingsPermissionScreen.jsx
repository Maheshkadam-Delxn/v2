// // // import React, { useState } from 'react';
// // // import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions } from 'react-native';
// // // import MainLayout from '../../components/MainLayout';
// // // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// // // const screenWidth = Dimensions.get('window').width;

// // // const roles = [
// // //   {
// // //     id: '1',
// // //     name: 'Project Admin',
// // //     key: 'PROJECT_ADMIN',
// // //     status: 'Active',
// // //   },
// // //   {
// // //     id: '2',
// // //     name: 'Consultant',
// // //     key: 'Consultant',
// // //     status: 'Active',
// // //   },
// // //   {
// // //     id: '3',
// // //     name: 'Approver',
// // //     key: 'Approver',
// // //     status: 'Active',
// // //   },
// // //   {
// // //     id: '4',
// // //     name: 'Contractor',
// // //     key: 'Contractor',
// // //     status: 'Active',
// // //   },
// // // ];

// // // const users = [
// // //   {
// // //     id: '1',
// // //     name: 'Alan David',
// // //     role: 'Project Admin',
// // //     mobile: '+91764585655',
// // //     email: 'viyipa437@acedby.com',
// // //   },
// // //   {
// // //     id: '2',
// // //     name: 'Mukesh Sinha',
// // //     role: 'Consultant',
// // //     mobile: '9863212225',
// // //     email: 'vikashoffice38@gmail.com',
// // //   },
// // //   {
// // //     id: '3',
// // //     name: 'moteen',
// // //     role: 'Consultant',
// // //     mobile: '+98765456787',
// // //     email: 'mo3@gmail.com',
// // //   },
// // //   {
// // //     id: '4',
// // //     name: 'Sonalika',
// // //     role: 'Approver',
// // //     mobile: '6955363533',
// // //     email: 'bicisov382@pricegh.com',
// // //   },
// // // ];

// // // const approvals = [
// // //   {
// // //     id: '1',
// // //     project: 'Granite Horizon',
// // //     approver: 'Alan David',
// // //     module: 'Indent',
// // //     status: 'Yes',
// // //   },
// // //   {
// // //     id: '2',
// // //     project: 'Granite Horizon',
// // //     approver: 'Alan David',
// // //     module: 'Bill Payment',
// // //     status: 'Yes',
// // //   },
// // //   {
// // //     id: '3',
// // //     project: 'Granite Horizon',
// // //     approver: 'Alan David',
// // //     module: 'Document',
// // //     status: 'Yes',
// // //   },
// // //   {
// // //     id: '4',
// // //     project: 'Granite Horizon',
// // //     approver: 'Alan David',
// // //     module: 'Drawing',
// // //     status: 'Yes',
// // //   },
// // // ];

// // // const dashboards = [
// // //   {
// // //     id: '1',
// // //     project: 'Granite Horizon',
// // //     role: 'Project Admin',
// // //     title: 'Not Started Activity',
// // //     type: 'Counter',
// // //   },
// // //   {
// // //     id: '2',
// // //     project: 'Granite Horizon',
// // //     role: 'Project Admin',
// // //     title: 'Drawings Under Review',
// // //     type: 'Counter',
// // //   },
// // //   {
// // //     id: '3',
// // //     project: 'Granite Horizon',
// // //     role: 'Project Admin',
// // //     title: 'Open GRN',
// // //     type: 'Counter',
// // //   },
// // //   {
// // //     id: '4',
// // //     project: 'Granite Horizon',
// // //     role: 'Project Admin',
// // //     title: 'Paid Bill',
// // //     type: 'Counter',
// // //   },
// // // ];

// // // // Status Badge Component
// // // const StatusBadge = ({ status, color = '#10b981' }) => (
// // //   <View style={{
// // //     backgroundColor: `${color}20`,
// // //     paddingHorizontal: 12,
// // //     paddingVertical: 6,
// // //     borderRadius: 16,
// // //     alignSelf: 'flex-start',
// // //   }}>
// // //     <Text style={{ color, fontWeight: '600', fontSize: 12 }}>
// // //       {status}
// // //     </Text>
// // //   </View>
// // // );

// // // // Role Card
// // // const RoleCard = ({ item }) => (
// // //   <View style={{
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     backgroundColor: '#ffffff',
// // //     borderRadius: 8,
// // //     padding: 16,
// // //     marginBottom: 8,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 1 },
// // //     shadowOpacity: 0.05,
// // //     shadowRadius: 2,
// // //     elevation: 1,
// // //   }}>
// // //     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
// // //     <View style={{ flex: 1 }}>
// // //       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Role Name: {item.name}</Text>
// // //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Role Name Key: {item.key}</Text>
// // //     </View>
// // //     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
// // //       <TouchableOpacity>
// // //         <Icon name="pencil" size={20} color="#f59e0b" style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 4 }} />
// // //       </TouchableOpacity>
// // //       <TouchableOpacity>
// // //         <Icon name="eye" size={20} color="#3b82f6" style={{ backgroundColor: '#dbeafe', borderRadius: 8, padding: 4 }} />
// // //       </TouchableOpacity>
// // //       <StatusBadge status={item.status} />
// // //     </View>
// // //   </View>
// // // );

// // // // User Card
// // // const UserCard = ({ item }) => (
// // //   <View style={{
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     backgroundColor: '#ffffff',
// // //     borderRadius: 8,
// // //     padding: 16,
// // //     marginBottom: 8,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 1 },
// // //     shadowOpacity: 0.05,
// // //     shadowRadius: 2,
// // //     elevation: 1,
// // //   }}>
// // //     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
// // //     <View style={{ flex: 1 }}>
// // //       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Name: {item.name}</Text>
// // //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Role Name: {item.role}</Text>
// // //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Mobile Number: {item.mobile}</Text>
// // //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Email Id: {item.email}</Text>
// // //     </View>
// // //     <TouchableOpacity>
// // //       <Icon name="eye" size={20} color="#3b82f6" style={{ backgroundColor: '#dbeafe', borderRadius: 8, padding: 4 }} />
// // //     </TouchableOpacity>
// // //   </View>
// // // );

// // // // Approval Card
// // // const ApprovalCard = ({ item }) => (
// // //   <View style={{
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     backgroundColor: '#ffffff',
// // //     borderRadius: 8,
// // //     padding: 16,
// // //     marginBottom: 8,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 1 },
// // //     shadowOpacity: 0.05,
// // //     shadowRadius: 2,
// // //     elevation: 1,
// // //   }}>
// // //     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
// // //     <View style={{ flex: 1 }}>
// // //       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Project: {item.project}</Text>
// // //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Approval For: {item.approver}</Text>
// // //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Module: {item.module}</Text>
// // //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Status: {item.status}</Text>
// // //     </View>
// // //     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
// // //       <TouchableOpacity>
// // //         <Icon name="pencil" size={20} color="#f59e0b" style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 4 }} />
// // //       </TouchableOpacity>
// // //       <Icon name="account-circle" size={24} color="#9ca3af" />
// // //     </View>
// // //   </View>
// // // );

// // // // Dashboard Card
// // // const DashboardCard = ({ item }) => (
// // //   <View style={{
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     backgroundColor: '#ffffff',
// // //     borderRadius: 8,
// // //     padding: 16,
// // //     marginBottom: 8,
// // //     shadowColor: '#000',
// // //     shadowOffset: { width: 0, height: 1 },
// // //     shadowOpacity: 0.05,
// // //     shadowRadius: 2,
// // //     elevation: 1,
// // //   }}>
// // //     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
// // //     <View style={{ flex: 1 }}>
// // //       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Project: {item.project}</Text>
// // //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Role: {item.role}</Text>
// // //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Title: {item.title}</Text>
// // //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Type: {item.type}</Text>
// // //     </View>
// // //     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
// // //       <TouchableOpacity>
// // //         <Icon name="pencil" size={20} color="#f59e0b" style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 4 }} />
// // //       </TouchableOpacity>
// // //       <TouchableOpacity>
// // //         <Icon name="delete" size={20} color="#ef4444" style={{ backgroundColor: '#fee2e2', borderRadius: 8, padding: 4 }} />
// // //       </TouchableOpacity>
// // //     </View>
// // //   </View>
// // // );

// // // export default function SettingsPermissionScreen() {
// // //   const [activeTab, setActiveTab] = useState('Role Permission');
// // //   const [searchQuery, setSearchQuery] = useState('');

// // //   const tabs = ['Role Permission', 'User Permission', 'Approval Workflow', 'Dashboard Permission'];

// // //   const getData = () => {
// // //     switch (activeTab) {
// // //       case 'Role Permission':
// // //         return roles.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
// // //       case 'User Permission':
// // //         return users.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
// // //       case 'Approval Workflow':
// // //         return approvals.filter(item => item.module.toLowerCase().includes(searchQuery.toLowerCase()));
// // //       case 'Dashboard Permission':
// // //         return dashboards.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
// // //       default:
// // //         return [];
// // //     }
// // //   };

// // //   const renderItem = (item) => {
// // //     switch (activeTab) {
// // //       case 'Role Permission':
// // //         return <RoleCard key={item.id} item={item} />;
// // //       case 'User Permission':
// // //         return <UserCard key={item.id} item={item} />;
// // //       case 'Approval Workflow':
// // //         return <ApprovalCard key={item.id} item={item} />;
// // //       case 'Dashboard Permission':
// // //         return <DashboardCard key={item.id} item={item} />;
// // //       default:
// // //         return null;
// // //     }
// // //   };

// // //   return (
// // //     <MainLayout title="Permissions">
// // //       <ScrollView className="flex-1 px-6 py-4">
// // //         <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
// // //           <Text className="text-lg font-semibold text-gray-800 mb-4">Permission Settings</Text>
// // //           <Text className="text-sm text-gray-600">Manage user permissions for the project.</Text>

// // //           {/* Tabs with Horizontal Scroll */}
// // //           <ScrollView
// // //             horizontal
// // //             showsHorizontalScrollIndicator={false}
// // //             className="mt-4 border-b border-gray-200"
// // //           >
// // //             {tabs.map((tab) => (
// // //               <TouchableOpacity
// // //                 key={tab}
// // //                 onPress={() => setActiveTab(tab)}
// // //                 className={`px-6 py-3 ${activeTab === tab ? 'border-b-2 border-blue-600' : ''}`}
// // //               >
// // //                 <Text className={`text-base font-semibold ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}>
// // //                   {tab}
// // //                 </Text>
// // //               </TouchableOpacity>
// // //             ))}
// // //           </ScrollView>

// // //           {/* Search and Add */}
// // //           <View className="flex-row items-center mt-4">
// // //             <View className="flex-row items-center flex-1 bg-gray-100 rounded-xl p-3">
// // //               <Icon name="magnify" size={20} color="#6b7280" />
// // //               <TextInput
// // //                 value={searchQuery}
// // //                 onChangeText={setSearchQuery}
// // //                 placeholder="Search..."
// // //                 className="flex-1 ml-2 text-gray-800"
// // //               />
// // //             </View>
// // //             <TouchableOpacity className="ml-4">
// // //               <Icon name="plus-circle" size={24} color="#10b981" />
// // //             </TouchableOpacity>
// // //           </View>

// // //           {/* List */}
// // //           <View className="mt-4">
// // //             {getData().map(renderItem)}
// // //           </View>
// // //         </View>
// // //       </ScrollView>
// // //     </MainLayout>
// // //   );
// // // }
// // import React, { useState } from 'react';
// // import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
// // import MainLayout from '../../components/MainLayout';
// // import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// // const screenWidth = Dimensions.get('window').width;

// // const roles = [
// //   { id: '1', name: 'Project Admin', key: 'PROJECT_ADMIN', status: 'Active' },
// //   { id: '2', name: 'Consultant', key: 'Consultant', status: 'Active' },
// //   { id: '3', name: 'Approver', key: 'Approver', status: 'Active' },
// //   { id: '4', name: 'Contractor', key: 'Contractor', status: 'Active' },
// //   { id: '5', name: 'Site Engineer', key: 'SITE_ENGINEER', status: 'Active' },
// //   { id: '6', name: 'Manager', key: 'MANAGER', status: 'Active' },
// // ];

// // const users = [
// //   { id: '1', name: 'Alan David', role: 'Project Admin', mobile: '+91764585655', email: 'viyipa437@acedby.com' },
// //   { id: '2', name: 'Mukesh Sinha', role: 'Consultant', mobile: '9863212225', email: 'vikashoffice38@gmail.com' },
// //   { id: '3', name: 'moteen', role: 'Consultant', mobile: '+98765456787', email: 'mo3@gmail.com' },
// //   { id: '4', name: 'Sonalika', role: 'Approver', mobile: '6955363533', email: 'bicisov382@pricegh.com' },
// // ];

// // const approvals = [
// //   { id: '1', project: 'Granite Horizon', approver: 'Alan David', module: 'Indent', status: 'Yes' },
// //   { id: '2', project: 'Granite Horizon', approver: 'Alan David', module: 'Bill Payment', status: 'Yes' },
// //   { id: '3', project: 'Granite Horizon', approver: 'Alan David', module: 'Document', status: 'Yes' },
// //   { id: '4', project: 'Granite Horizon', approver: 'Alan David', module: 'Drawing', status: 'Yes' },
// // ];

// // const dashboards = [
// //   { id: '1', project: 'Granite Horizon', role: 'Project Admin', title: 'Not Started Activity', type: 'Counter' },
// //   { id: '2', project: 'Granite Horizon', role: 'Project Admin', title: 'Drawings Under Review', type: 'Counter' },
// //   { id: '3', project: 'Granite Horizon', role: 'Project Admin', title: 'Open GRN', type: 'Counter' },
// //   { id: '4', project: 'Granite Horizon', role: 'Project Admin', title: 'Paid Bill', type: 'Counter' },
// // ];

// // // Status Badge Component
// // const StatusBadge = ({ status, color = '#10b981' }) => (
// //   <View style={{ backgroundColor: `${color}20`, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, alignSelf: 'flex-start' }}>
// //     <Text style={{ color, fontWeight: '600', fontSize: 12 }}>{status}</Text>
// //   </View>
// // );

// // // Role Card
// // const RoleCard = ({ item }) => (
// //   <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 8, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
// //     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
// //     <View style={{ flex: 1 }}>
// //       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Role Name: {item.name}</Text>
// //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Role Name Key: {item.key}</Text>
// //     </View>
// //     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
// //       <TouchableOpacity>
// //         <Icon name="pencil" size={20} color="#f59e0b" style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 4 }} />
// //       </TouchableOpacity>
// //       <TouchableOpacity>
// //         <Icon name="eye" size={20} color="#3b82f6" style={{ backgroundColor: '#dbeafe', borderRadius: 8, padding: 4 }} />
// //       </TouchableOpacity>
// //       <StatusBadge status={item.status} />
// //     </View>
// //   </View>
// // );

// // // User Card
// // const UserCard = ({ item }) => (
// //   <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 8, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
// //     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
// //     <View style={{ flex: 1 }}>
// //       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Name: {item.name}</Text>
// //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Role Name: {item.role}</Text>
// //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Mobile Number: {item.mobile}</Text>
// //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Email Id: {item.email}</Text>
// //     </View>
// //     <TouchableOpacity>
// //       <Icon name="eye" size={20} color="#3b82f6" style={{ backgroundColor: '#dbeafe', borderRadius: 8, padding: 4 }} />
// //     </TouchableOpacity>
// //   </View>
// // );

// // // Approval Card
// // const ApprovalCard = ({ item }) => (
// //   <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 8, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
// //     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
// //     <View style={{ flex: 1 }}>
// //       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Project: {item.project}</Text>
// //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Approval For: {item.approver}</Text>
// //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Module: {item.module}</Text>
// //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Status: {item.status}</Text>
// //     </View>
// //     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
// //       <TouchableOpacity>
// //         <Icon name="pencil" size={20} color="#f59e0b" style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 4 }} />
// //       </TouchableOpacity>
// //       <Icon name="account-circle" size={24} color="#9ca3af" />
// //     </View>
// //   </View>
// // );

// // // Dashboard Card
// // const DashboardCard = ({ item }) => (
// //   <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 8, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
// //     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
// //     <View style={{ flex: 1 }}>
// //       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Project: {item.project}</Text>
// //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Role: {item.role}</Text>
// //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Title: {item.title}</Text>
// //       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Type: {item.type}</Text>
// //     </View>
// //     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
// //       <TouchableOpacity>
// //         <Icon name="pencil" size={20} color="#f59e0b" style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 4 }} />
// //       </TouchableOpacity>
// //       <TouchableOpacity>
// //         <Icon name="delete" size={20} color="#ef4444" style={{ backgroundColor: '#fee2e2', borderRadius: 8, padding: 4 }} />
// //       </TouchableOpacity>
// //     </View>
// //   </View>
// // );

// // // Modal for Adding New Role
// // const AddRoleModal = ({ visible, onClose, onSave }) => {
// //   const [roleName, setRoleName] = useState('');
// //   const [roleKey, setRoleKey] = useState('');
// //   const [copyPermission, setCopyPermission] = useState(false);

// //   return (
// //     <Modal visible={visible} transparent animationType="slide">
// //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
// //         <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 16, width: '80%', elevation: 5 }}>
// //           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3b82f6', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: 12 }}>
// //             <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>Role</Text>
// //             <TouchableOpacity onPress={onClose}>
// //               <Icon name="close" size={20} color="#ffffff" />
// //             </TouchableOpacity>
// //           </View>
// //           <View style={{ padding: 16 }}>
// //             <TextInput
// //               placeholder="Role Name"
// //               value={roleName}
// //               onChangeText={setRoleName}
// //               style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 8, marginBottom: 12 }}
// //             />
// //             <TextInput
// //               placeholder="Role Name Key"
// //               value={roleKey}
// //               onChangeText={setRoleKey}
// //               style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 8, marginBottom: 12 }}
// //             />
// //             <Text style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>Do You Want Copy Other Role Permission?</Text>
// //             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
// //               <TouchableOpacity onPress={() => setCopyPermission(true)} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
// //                 <Icon name={copyPermission ? 'radiobox-marked' : 'radiobox-blank'} size={20} color="#6b7280" />
// //                 <Text style={{ marginLeft: 8, color: '#374151' }}>Yes</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={() => setCopyPermission(false)} style={{ flexDirection: 'row', alignItems: 'center' }}>
// //                 <Icon name={!copyPermission ? 'radiobox-marked' : 'radiobox-blank'} size={20} color="#6b7280" />
// //                 <Text style={{ marginLeft: 8, color: '#374151' }}>No</Text>
// //               </TouchableOpacity>
// //             </View>
// //             <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
// //               <TouchableOpacity onPress={onClose} style={{ backgroundColor: '#e5e7eb', padding: 8, borderRadius: 8 }}>
// //                 <Text style={{ color: '#374151' }}>Close</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={() => onSave({ roleName, roleKey, copyPermission })} style={{ backgroundColor: '#3b82f6', padding: 8, borderRadius: 8 }}>
// //                 <Text style={{ color: '#ffffff' }}>Save changes</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </View>
// //       </View>
// //     </Modal>
// //   );
// // };

// // // Modal for Managing Who Can View
// // const ManageViewModal = ({ visible, onClose, onSave }) => {
// //   const [selectedRole, setSelectedRole] = useState('');
// //   const [selectedService, setSelectedService] = useState('CONSTRUCTION');

// //   return (
// //     <Modal visible={visible} transparent animationType="slide">
// //       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
// //         <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 16, width: '80%', elevation: 5 }}>
// //           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3b82f6', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: 12 }}>
// //             <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>Manage Who Can View</Text>
// //             <TouchableOpacity onPress={onClose}>
// //               <Icon name="close" size={20} color="#ffffff" />
// //             </TouchableOpacity>
// //           </View>
// //           <View style={{ padding: 16 }}>
// //             <View style={{ flexDirection: 'row', gap: 8, marginBottom: 12 }}>
// //               <View style={{ flex: 1 }}>
// //                 <Text style={{ fontSize: 14, color: '#374151' }}>Role</Text>
// //                 <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 8 }}>
// //                   <Text style={{ color: '#6b7280' }}>Select an Role</Text>
// //                   {/* Dropdown simulation - replace with actual picker if needed */}
// //                 </View>
// //               </View>
// //               <View style={{ flex: 1 }}>
// //                 <Text style={{ fontSize: 14, color: '#374151' }}>Service</Text>
// //                 <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 8 }}>
// //                   <Text style={{ color: '#374151' }}>CONSTRUCTION</Text>
// //                   {/* Dropdown simulation - replace with actual picker if needed */}
// //                 </View>
// //               </View>
// //             </View>
// //             <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
// //               <TouchableOpacity onPress={onClose} style={{ backgroundColor: '#e5e7eb', padding: 8, borderRadius: 8 }}>
// //                 <Text style={{ color: '#374151' }}>Close</Text>
// //               </TouchableOpacity>
// //               <TouchableOpacity onPress={onSave} style={{ backgroundColor: '#3b82f6', padding: 8, borderRadius: 8 }}>
// //                 <Text style={{ color: '#ffffff' }}>Save changes</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </View>
// //       </View>
// //     </Modal>
// //   );
// // };

// // export default function SettingsPermissionScreen() {
// //   const [activeTab, setActiveTab] = useState('Role Permission');
// //   const [searchQuery, setSearchQuery] = useState('');
// //   const [addModalVisible, setAddModalVisible] = useState(false);
// //   const [manageModalVisible, setManageModalVisible] = useState(false);

// //   const tabs = ['Role Permission', 'User Permission', 'Approval Workflow', 'Dashboard Permission'];

// //   const getData = () => {
// //     switch (activeTab) {
// //       case 'Role Permission':
// //         return roles.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
// //       case 'User Permission':
// //         return users.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
// //       case 'Approval Workflow':
// //         return approvals.filter(item => item.module.toLowerCase().includes(searchQuery.toLowerCase()));
// //       case 'Dashboard Permission':
// //         return dashboards.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
// //       default:
// //         return [];
// //     }
// //   };

// //   const renderItem = (item) => {
// //     switch (activeTab) {
// //       case 'Role Permission':
// //         return <RoleCard key={item.id} item={item} />;
// //       case 'User Permission':
// //         return <UserCard key={item.id} item={item} />;
// //       case 'Approval Workflow':
// //         return <ApprovalCard key={item.id} item={item} />;
// //       case 'Dashboard Permission':
// //         return <DashboardCard key={item.id} item={item} />;
// //       default:
// //         return null;
// //     }
// //   };

// //   const handleAddSave = (data) => {
// //     console.log('Add Role Saved:', data);
// //     setAddModalVisible(false);
// //   };

// //   const handleManageSave = () => {
// //     console.log('Manage View Saved');
// //     setManageModalVisible(false);
// //   };

// //   return (
// //     <MainLayout title="Permissions">
// //       <ScrollView className="flex-1 px-6 py-4">
// //         <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
// //           <Text className="text-lg font-semibold text-gray-800 mb-4">Permission Settings</Text>
// //           <Text className="text-sm text-gray-600">Manage user permissions for the project.</Text>

// //           {/* Tabs with Horizontal Scroll */}
// //           <ScrollView
// //             horizontal
// //             showsHorizontalScrollIndicator={false}
// //             className="mt-4 border-b border-gray-200"
// //           >
// //             {tabs.map((tab) => (
// //               <TouchableOpacity
// //                 key={tab}
// //                 onPress={() => setActiveTab(tab)}
// //                 className={`px-6 py-3 ${activeTab === tab ? 'border-b-2 border-blue-600' : ''}`}
// //               >
// //                 <Text className={`text-base font-semibold ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}>
// //                   {tab}
// //                 </Text>
// //               </TouchableOpacity>
// //             ))}
// //           </ScrollView>

// //           {/* Search and Add */}
// //           <View className="flex-row items-center mt-4">
// //             <View className="flex-row items-center flex-1 bg-gray-100 rounded-xl p-3">
// //               <Icon name="magnify" size={20} color="#6b7280" />
// //               <TextInput
// //                 value={searchQuery}
// //                 onChangeText={setSearchQuery}
// //                 placeholder="Search..."
// //                 className="flex-1 ml-2 text-gray-800"
// //               />
// //             </View>
// //             <TouchableOpacity className="ml-4" onPress={() => setAddModalVisible(true)}>
// //               <Icon name="plus-circle" size={24} color="#10b981" />
// //             </TouchableOpacity>
// //           </View>

// //           {/* List */}
// //           <View className="mt-4">
// //             {getData().map(renderItem)}
// //           </View>

// //           {/* Conditional Manage Role Permission Button */}
// //           {(activeTab === 'Approval Workflow' || activeTab === 'Dashboard Permission') && (
// //             <TouchableOpacity
// //               className="mt-4 px-4 py-2 bg-blue-600 rounded-lg flex-row items-center justify-center"
// //               onPress={() => setManageModalVisible(true)}
// //             >
// //               <Icon name="shield-account" size={18} color="#ffffff" style={{ marginRight: 8 }} />
// //               <Text className="text-white font-semibold">Manage Role Permission</Text>
// //             </TouchableOpacity>
// //           )}
// //         </View>

// //         {/* Add Role Modal */}
// //         <AddRoleModal
// //           visible={addModalVisible}
// //           onClose={() => setAddModalVisible(false)}
// //           onSave={handleAddSave}
// //         />

// //         {/* Manage Who Can View Modal */}
// //         <ManageViewModal
// //           visible={manageModalVisible}
// //           onClose={() => setManageModalVisible(false)}
// //           onSave={handleManageSave}
// //         />
// //       </ScrollView>
// //     </MainLayout>
// //   );
// // }

// import React, { useState } from 'react';
// import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
// import MainLayout from '../../components/MainLayout';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { LinearGradient } from 'expo-linear-gradient';

// const screenWidth = Dimensions.get('window').width;

// const roles = [
//   { id: '1', name: 'Project Admin', key: 'PROJECT_ADMIN', status: 'Active' },
//   { id: '2', name: 'Consultant', key: 'Consultant', status: 'Active' },
//   { id: '3', name: 'Approver', key: 'Approver', status: 'Active' },
//   { id: '4', name: 'Contractor', key: 'Contractor', status: 'Active' },
// ];

// const users = [
//   { id: '1', name: 'Alan David', role: 'Project Admin', mobile: '+91764585655', email: 'viyipa437@acedby.com' },
//   { id: '2', name: 'Mukesh Sinha', role: 'Consultant', mobile: '9863212225', email: 'vikashoffice38@gmail.com' },
//   { id: '3', name: 'moteen', role: 'Consultant', mobile: '+98765456787', email: 'mo3@gmail.com' },
//   { id: '4', name: 'Sonalika', role: 'Approver', mobile: '6955363533', email: 'bicisov382@pricegh.com' },
// ];

// const approvals = [
//   { id: '1', project: 'Granite Horizon', approver: 'Alan David', module: 'Indent', status: 'Yes' },
//   { id: '2', project: 'Granite Horizon', approver: 'Alan David', module: 'Bill Payment', status: 'Yes' },
//   { id: '3', project: 'Granite Horizon', approver: 'Alan David', module: 'Document', status: 'Yes' },
//   { id: '4', project: 'Granite Horizon', approver: 'Alan David', module: 'Drawing', status: 'Yes' },
// ];

// const dashboards = [
//   { id: '1', project: 'Granite Horizon', role: 'Project Admin', title: 'Not Started Activity', type: 'Counter' },
//   { id: '2', project: 'Granite Horizon', role: 'Project Admin', title: 'Drawings Under Review', type: 'Counter' },
//   { id: '3', project: 'Granite Horizon', role: 'Project Admin', title: 'Open GRN', type: 'Counter' },
//   { id: '4', project: 'Granite Horizon', role: 'Project Admin', title: 'Paid Bill', type: 'Counter' },
// ];

// // Status Badge Component
// const StatusBadge = ({ status, color = '#10b981' }) => (
//   <View style={{ backgroundColor: `${color}20`, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, alignSelf: 'flex-start' }}>
//     <Text style={{ color, fontWeight: '600', fontSize: 12 }}>{status}</Text>
//   </View>
// );

// // Role Card
// const RoleCard = ({ item }) => (
//   <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 8, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
//     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
//     <View style={{ flex: 1 }}>
//       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Role Name: {item.name}</Text>
//       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Role Name Key: {item.key}</Text>
//     </View>
//     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//       <TouchableOpacity>
//         <Icon name="pencil" size={20} color="#f59e0b" style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 4 }} />
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Icon name="eye" size={20} color="#3b82f6" style={{ backgroundColor: '#dbeafe', borderRadius: 8, padding: 4 }} />
//       </TouchableOpacity>
//       <StatusBadge status={item.status} />
//     </View>
//   </View>
// );

// // User Card
// const UserCard = ({ item }) => (
//   <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 8, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
//     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
//     <View style={{ flex: 1 }}>
//       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Name: {item.name}</Text>
//       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Role Name: {item.role}</Text>
//       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Mobile Number: {item.mobile}</Text>
//       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Email Id: {item.email}</Text>
//     </View>
//     <TouchableOpacity>
//       <Icon name="eye" size={20} color="#3b82f6" style={{ backgroundColor: '#dbeafe', borderRadius: 8, padding: 4 }} />
//     </TouchableOpacity>
//   </View>
// );

// // Approval Card
// const ApprovalCard = ({ item }) => (
//   <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 8, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
//     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
//     <View style={{ flex: 1 }}>
//       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Project: {item.project}</Text>
//       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Approval For: {item.approver}</Text>
//       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Module: {item.module}</Text>
//       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Status: {item.status}</Text>
//     </View>
//     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//       <TouchableOpacity>
//         <Icon name="pencil" size={20} color="#f59e0b" style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 4 }} />
//       </TouchableOpacity>
//       <Icon name="account-circle" size={24} color="#9ca3af" />
//     </View>
//   </View>
// );

// // Dashboard Card
// const DashboardCard = ({ item }) => (
//   <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: 8, padding: 16, marginBottom: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 }}>
//     <Icon name="circle-medium" size={20} color="#374151" style={{ marginRight: 12 }} />
//     <View style={{ flex: 1 }}>
//       <Text style={{ fontSize: 14, color: '#374151', fontWeight: '600' }}>Project: {item.project}</Text>
//       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Role: {item.role}</Text>
//       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Title: {item.title}</Text>
//       <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>Type: {item.type}</Text>
//     </View>
//     <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//       <TouchableOpacity>
//         <Icon name="pencil" size={20} color="#f59e0b" style={{ backgroundColor: '#fef3c7', borderRadius: 8, padding: 4 }} />
//       </TouchableOpacity>
//       <TouchableOpacity>
//         <Icon name="delete" size={20} color="#ef4444" style={{ backgroundColor: '#fee2e2', borderRadius: 8, padding: 4 }} />
//       </TouchableOpacity>
//     </View>
//   </View>
// );

// // Modal for Adding New Role (Triggered by "+")
// const AddRoleModal = ({ visible, onClose, onSave }) => {
//   const [roleName, setRoleName] = useState('');
//   const [roleKey, setRoleKey] = useState('');
//   const [copyPermission, setCopyPermission] = useState(false);

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//         <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 16, width: '80%', elevation: 5 }}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3b82f6', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: 12 }}>
//             <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>Add Role</Text>
//             <TouchableOpacity onPress={onClose}>
//               <Icon name="close" size={20} color="#ffffff" />
//             </TouchableOpacity>
//           </View>
//           <View style={{ padding: 16 }}>
//             <TextInput
//               placeholder="Role Name"
//               value={roleName}
//               onChangeText={setRoleName}
//               style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 8, marginBottom: 12 }}
//             />
//             <TextInput
//               placeholder="Role Name Key"
//               value={roleKey}
//               onChangeText={setRoleKey}
//               style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 8, marginBottom: 12 }}
//             />
//             <Text style={{ fontSize: 14, color: '#374151', marginBottom: 8 }}>Copy Permission From Other Role?</Text>
//             <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
//               <TouchableOpacity onPress={() => setCopyPermission(true)} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }}>
//                 <Icon name={copyPermission ? 'radiobox-marked' : 'radiobox-blank'} size={20} color="#6b7280" />
//                 <Text style={{ marginLeft: 8, color: '#374151' }}>Yes</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => setCopyPermission(false)} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Icon name={!copyPermission ? 'radiobox-marked' : 'radiobox-blank'} size={20} color="#6b7280" />
//                 <Text style={{ marginLeft: 8, color: '#374151' }}>No</Text>
//               </TouchableOpacity>
//             </View>
//             <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
//               <TouchableOpacity onPress={onClose} style={{ backgroundColor: '#e5e7eb', padding: 8, borderRadius: 8 }}>
//                 <Text style={{ color: '#374151' }}>Close</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => onSave({ roleName, roleKey, copyPermission })} style={{ backgroundColor: '#3b82f6', padding: 8, borderRadius: 8 }}>
//                 <Text style={{ color: '#ffffff' }}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// // Modal for Managing Role Permission (Triggered by "Manage Role Permission" button)
// const ManageRolePermissionModal = ({ visible, onClose, onSave }) => {
//   const [selectedRole, setSelectedRole] = useState('');
//   const [selectedModule, setSelectedModule] = useState('');
//   const [canView, setCanView] = useState(false);
//   const [canEdit, setCanEdit] = useState(false);

//   return (
//     <Modal visible={visible} transparent animationType="slide">
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//         <View style={{ backgroundColor: '#ffffff', borderRadius: 12, padding: 16, width: '80%', elevation: 5 }}>
//           <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#3b82f6', borderTopLeftRadius: 12, borderTopRightRadius: 12, padding: 12 }}>
//             <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>Manage Role Permission</Text>
//             <TouchableOpacity onPress={onClose}>
//               <Icon name="close" size={20} color="#ffffff" />
//             </TouchableOpacity>
//           </View>
//           <View style={{ padding: 16 }}>
//             <View style={{ marginBottom: 12 }}>
//               <Text style={{ fontSize: 14, color: '#374151', marginBottom: 4 }}>Select Role</Text>
//               <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 8 }}>
//                 <Text style={{ color: '#6b7280' }}>Select a Role</Text>
//                 {/* Dropdown simulation - replace with actual picker if needed */}
//               </View>
//             </View>
//             <View style={{ marginBottom: 12 }}>
//               <Text style={{ fontSize: 14, color: '#374151', marginBottom: 4 }}>Select Module</Text>
//               <View style={{ borderWidth: 1, borderColor: '#e5e7eb', borderRadius: 8, padding: 8 }}>
//                 <Text style={{ color: '#6b7280' }}>Select a Module</Text>
//                 {/* Dropdown simulation - replace with actual picker if needed */}
//               </View>
//             </View>
//             <View style={{ marginBottom: 12 }}>
//               <Text style={{ fontSize: 14, color: '#374151', marginBottom: 4 }}>Permission</Text>
//               <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
//                 <TouchableOpacity onPress={() => setCanView(!canView)} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Icon name={canView ? 'checkbox-marked' : 'checkbox-blank-outline'} size={20} color="#6b7280" />
//                   <Text style={{ marginLeft: 8, color: '#374151' }}>Can View</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setCanEdit(!canEdit)} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Icon name={canEdit ? 'checkbox-marked' : 'checkbox-blank-outline'} size={20} color="#6b7280" />
//                   <Text style={{ marginLeft: 8, color: '#374151' }}>Can Edit</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//             <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 8 }}>
//               <TouchableOpacity onPress={onClose} style={{ backgroundColor: '#e5e7eb', padding: 8, borderRadius: 8 }}>
//                 <Text style={{ color: '#374151' }}>Close</Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => onSave({ selectedRole, selectedModule, canView, canEdit })} style={{ backgroundColor: '#3b82f6', padding: 8, borderRadius: 8 }}>
//                 <Text style={{ color: '#ffffff' }}>Save</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// export default function SettingsPermissionScreen() {
//   const [activeTab, setActiveTab] = useState('Role Permission');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [addModalVisible, setAddModalVisible] = useState(false);
//   const [manageModalVisible, setManageModalVisible] = useState(false);

//   const tabs = ['Role Permission', 'User Permission', 'Approval Workflow', 'Dashboard Permission'];

//   const getData = () => {
//     switch (activeTab) {
//       case 'Role Permission':
//         return roles.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
//       case 'User Permission':
//         return users.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
//       case 'Approval Workflow':
//         return approvals.filter(item => item.module.toLowerCase().includes(searchQuery.toLowerCase()));
//       case 'Dashboard Permission':
//         return dashboards.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
//       default:
//         return [];
//     }
//   };

//   const renderItem = (item) => {
//     switch (activeTab) {
//       case 'Role Permission':
//         return <RoleCard key={item.id} item={item} />;
//       case 'User Permission':
//         return <UserCard key={item.id} item={item} />;
//       case 'Approval Workflow':
//         return <ApprovalCard key={item.id} item={item} />;
//       case 'Dashboard Permission':
//         return <DashboardCard key={item.id} item={item} />;
//       default:
//         return null;
//     }
//   };

//   const handleAddSave = (data) => {
//     console.log('Add Role Saved:', data);
//     setAddModalVisible(false);
//   };

//   const handleManageSave = (data) => {
//     console.log('Manage Role Permission Saved:', data);
//     setManageModalVisible(false);
//   };

//   return (
//     <MainLayout title="Permissions">
//       <ScrollView className="flex-1 px-6 py-4">
//         <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
//           <Text className="text-lg font-semibold text-gray-800 mb-4">Permission Settings</Text>
//           <Text className="text-sm text-gray-600">Manage user permissions for the project.</Text>

//           {/* Tabs with Horizontal Scroll */}
//           <ScrollView
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             className="mt-4 border-b border-gray-200"
//           >
//             {tabs.map((tab) => (
//               <TouchableOpacity
//                 key={tab}
//                 onPress={() => setActiveTab(tab)}
//                 className={`px-6 py-3 ${activeTab === tab ? 'border-b-2 border-blue-600' : ''}`}
//               >
//                 <Text className={`text-base font-semibold ${activeTab === tab ? 'text-blue-600' : 'text-gray-500'}`}>
//                   {tab}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>

//           {/* Search and Buttons */}
//           <View className="flex-row items-center mt-4 justify-between">
//             <View className="flex-row items-center flex-1 bg-gray-100 rounded-xl p-3">
//               <Icon name="magnify" size={20} color="#6b7280" />
//               <TextInput
//                 value={searchQuery}
//                 onChangeText={setSearchQuery}
//                 placeholder="Search..."
//                 className="flex-1 ml-2 text-gray-800"
//               />
//             </View>
//             <View className="flex-row ml-4">
//               <TouchableOpacity className="mr-2" onPress={() => setAddModalVisible(true)}>
//                 <Icon name="plus-circle" size={24} color="#10b981" />
//               </TouchableOpacity>
//               {(activeTab === 'Approval Workflow' || activeTab === 'Dashboard Permission') && (
//                 <TouchableOpacity onPress={() => setManageModalVisible(true)} className="px-3 py-1 bg-blue-600 rounded-lg flex-row items-center">
//                   <Icon name="shield-account" size={18} color="#ffffff" style={{ marginRight: 4 }} />
//                   {/* <Text className="text-white font-semibold text-sm"> Role </Text> */}
//                 </TouchableOpacity>
//               )}
//             </View>
//           </View>

//           {/* List */}
//           <View className="mt-4">
//             {getData().map(renderItem)}
//           </View>
//         </View>

//         {/* Add Role Modal */}
//         <AddRoleModal
//           visible={addModalVisible}
//           onClose={() => setAddModalVisible(false)}
//           onSave={handleAddSave}
//         />

//         {/* Manage Role Permission Modal */}
//         <ManageRolePermissionModal
//           visible={manageModalVisible}
//           onClose={() => setManageModalVisible(false)}
//           onSave={handleManageSave}
//         />
//       </ScrollView>
//     </MainLayout>
//   );
// }
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Modal } from 'react-native';
import MainLayout from '../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

// Sample data
const roles = [
  { id: '1', name: 'Project Admin', key: 'PROJECT_ADMIN', status: 'Active' },
  { id: '2', name: 'Consultant', key: 'Consultant', status: 'Active' },
  { id: '3', name: 'Approver', key: 'Approver', status: 'Active' },
  { id: '4', name: 'Contractor', key: 'Contractor', status: 'Active' },
];

const users = [
  { id: '1', name: 'Alan David', role: 'Project Admin', mobile: '+91764585655', email: 'viyipa437@acedby.com' },
  { id: '2', name: 'Mukesh Sinha', role: 'Consultant', mobile: '9863212225', email: 'vikashoffice38@gmail.com' },
  { id: '3', name: 'moteen', role: 'Consultant', mobile: '+98765456787', email: 'mo3@gmail.com' },
  { id: '4', name: 'Sonalika', role: 'Approver', mobile: '6955363533', email: 'bicisov382@pricegh.com' },
];

const approvals = [
  { id: '1', project: 'Granite Horizon', approver: 'Alan David', module: 'Indent', status: 'Yes' },
  { id: '2', project: 'Granite Horizon', approver: 'Alan David', module: 'Bill Payment', status: 'Yes' },
  { id: '3', project: 'Granite Horizon', approver: 'Alan David', module: 'Document', status: 'Yes' },
  { id: '4', project: 'Granite Horizon', approver: 'Alan David', module: 'Drawing', status: 'Yes' },
];

const dashboards = [
  { id: '1', project: 'Granite Horizon', role: 'Project Admin', title: 'Not Started Activity', type: 'Counter' },
  { id: '2', project: 'Granite Horizon', role: 'Project Admin', title: 'Drawings Under Review', type: 'Counter' },
  { id: '3', project: 'Granite Horizon', role: 'Project Admin', title: 'Open GRN', type: 'Counter' },
  { id: '4', project: 'Granite Horizon', role: 'Project Admin', title: 'Paid Bill', type: 'Counter' },
];

// Status Badge Component
const StatusBadge = ({ status, color = '#10b981' }) => (
  <View style={{ backgroundColor: `${color}20`, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, alignSelf: 'flex-start' }}>
    <Text style={{ color, fontWeight: '600', fontSize: 12 }}>{status}</Text>
  </View>
);

// Card Components
const RoleCard = ({ item }) => (
  <View style={styles.card}>
    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>Role Name: {item.name}</Text>
      <Text style={styles.cardSubtitle}>Role Key: {item.key}</Text>
    </View>
    <View style={styles.cardActions}>
      <TouchableOpacity>
        <Icon name="pencil" size={20} color="#f59e0b" style={styles.iconButton} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="eye" size={20} color="#3b82f6" style={styles.iconButton} />
      </TouchableOpacity>
      <StatusBadge status={item.status} />
    </View>
  </View>
);

const UserCard = ({ item, onViewPermissions }) => (
  <View style={styles.card}>
    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>Name: {item.name}</Text>
      <Text style={styles.cardSubtitle}>Role: {item.role}</Text>
      <Text style={styles.cardSubtitle}>Mobile: {item.mobile}</Text>
      <Text style={styles.cardSubtitle}>Email: {item.email}</Text>
    </View>
    <View style={styles.cardActions}>
      <TouchableOpacity onPress={onViewPermissions}>
        <Icon name="shield-account" size={20} color="#3b82f6" style={styles.iconButton} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="eye" size={20} color="#3b82f6" style={styles.iconButton} />
      </TouchableOpacity>
    </View>
  </View>
);

const ApprovalCard = ({ item }) => (
  <View style={styles.card}>
    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>Project: {item.project}</Text>
      <Text style={styles.cardSubtitle}>Approver: {item.approver}</Text>
      <Text style={styles.cardSubtitle}>Module: {item.module}</Text>
      <Text style={styles.cardSubtitle}>Status: {item.status}</Text>
    </View>
    <View style={styles.cardActions}>
      <TouchableOpacity>
        <Icon name="pencil" size={20} color="#f59e0b" style={styles.iconButton} />
      </TouchableOpacity>
      <Icon name="account-circle" size={24} color="#9ca3af" />
    </View>
  </View>
);

const DashboardCard = ({ item }) => (
  <View style={styles.card}>
    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>Project: {item.project}</Text>
      <Text style={styles.cardSubtitle}>Role: {item.role}</Text>
      <Text style={styles.cardSubtitle}>Title: {item.title}</Text>
      <Text style={styles.cardSubtitle}>Type: {item.type}</Text>
    </View>
    <View style={styles.cardActions}>
      <TouchableOpacity>
        <Icon name="pencil" size={20} color="#f59e0b" style={styles.iconButton} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Icon name="delete" size={20} color="#ef4444" style={styles.iconButton} />
      </TouchableOpacity>
    </View>
  </View>
);

// Modal Components
const ModalHeader = ({ title, onClose }) => (
  <View style={styles.modalHeader}>
    <Text style={styles.modalTitle}>{title}</Text>
    <TouchableOpacity onPress={onClose}>
      <Icon name="close" size={20} color="#ffffff" />
    </TouchableOpacity>
  </View>
);

const ModalFooter = ({ onClose, onSave }) => (
  <View style={styles.modalFooter}>
    <TouchableOpacity onPress={onClose} style={[styles.modalButton, styles.cancelButton]}>
      <Text style={styles.cancelButtonText}>Close</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onSave} style={[styles.modalButton, styles.saveButton]}>
      <Text style={styles.saveButtonText}>Save</Text>
    </TouchableOpacity>
  </View>
);

// Add Role Modal
const AddRoleModal = ({ visible, onClose, onSave }) => {
  const [roleName, setRoleName] = useState('');
  const [roleKey, setRoleKey] = useState('');
  const [copyPermission, setCopyPermission] = useState(false);

  const handleSave = () => {
    onSave({ roleName, roleKey, copyPermission });
    setRoleName('');
    setRoleKey('');
    setCopyPermission(false);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader title="Add Role" onClose={onClose} />
          
          <View style={styles.modalBody}>
            <TextInput
              placeholder="Role Name"
              value={roleName}
              onChangeText={setRoleName}
              style={styles.input}
            />
            <TextInput
              placeholder="Role Key"
              value={roleKey}
              onChangeText={setRoleKey}
              style={styles.input}
            />
            <Text style={styles.label}>Copy Permission From Other Role?</Text>
            <View style={styles.radioGroup}>
              <TouchableOpacity onPress={() => setCopyPermission(true)} style={styles.radioOption}>
                <Icon name={copyPermission ? 'radiobox-marked' : 'radiobox-blank'} size={20} color="#6b7280" />
                <Text style={styles.radioText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCopyPermission(false)} style={styles.radioOption}>
                <Icon name={!copyPermission ? 'radiobox-marked' : 'radiobox-blank'} size={20} color="#6b7280" />
                <Text style={styles.radioText}>No</Text>
              </TouchableOpacity>
            </View>
            
            <ModalFooter onClose={onClose} onSave={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// View User Permissions Modal
const ViewUserPermissionsModal = ({ visible, onClose, user }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader title="User Permissions" onClose={onClose} />
          
          <View style={styles.modalBody}>
            <Text style={styles.label}>Permissions for: {user?.name}</Text>
            <Text style={styles.subLabel}>Role: {user?.role}</Text>
            
            <View style={styles.permissionList}>
              <Text style={styles.permissionTitle}>Project Access:</Text>
              <View style={styles.permissionItem}>
                <Icon name="check-circle" size={16} color="#10b981" />
                <Text style={styles.permissionText}>Granite Horizon - Full Access</Text>
              </View>
              <View style={styles.permissionItem}>
                <Icon name="check-circle" size={16} color="#10b981" />
                <Text style={styles.permissionText}>Marina Bay - View Only</Text>
              </View>
              
              <Text style={[styles.permissionTitle, { marginTop: 16 }]}>Module Access:</Text>
              <View style={styles.permissionItem}>
                <Icon name="check-circle" size={16} color="#10b981" />
                <Text style={styles.permissionText}>Indent - Full Access</Text>
              </View>
              <View style={styles.permissionItem}>
                <Icon name="check-circle" size={16} color="#10b981" />
                <Text style={styles.permissionText}>Bill Payment - Approve Only</Text>
              </View>
            </View>
            
            <ModalFooter onClose={onClose} onSave={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Add User Permission Modal
const AddUserPermissionModal = ({ visible, onClose, onSave }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [permissionLevel, setPermissionLevel] = useState('view');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader title="Add User Permission" onClose={onClose} />
          
          <View style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Project</Text>
              <View style={styles.picker}>
                <Text style={selectedProject ? styles.pickerTextSelected : styles.pickerText}>Select a Project</Text>
                <Icon name="chevron-down" size={20} color="#6b7280" />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Select Service</Text>
              <View style={styles.picker}>
                <Text style={selectedService ? styles.pickerTextSelected : styles.pickerText}>Select a Service</Text>
                <Icon name="chevron-down" size={20} color="#6b7280" />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Permission Level</Text>
              <View style={styles.radioGroup}>
                <TouchableOpacity onPress={() => setPermissionLevel('view')} style={styles.radioOption}>
                  <Icon name={permissionLevel === 'view' ? 'radiobox-marked' : 'radiobox-blank'} size={20} color="#6b7280" />
                  <Text style={styles.radioText}>View Only</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPermissionLevel('edit')} style={styles.radioOption}>
                  <Icon name={permissionLevel === 'edit' ? 'radiobox-marked' : 'radiobox-blank'} size={20} color="#6b7280" />
                  <Text style={styles.radioText}>Can Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPermissionLevel('full')} style={styles.radioOption}>
                  <Icon name={permissionLevel === 'full' ? 'radiobox-marked' : 'radiobox-blank'} size={20} color="#6b7280" />
                  <Text style={styles.radioText}>Full Access</Text>
                </TouchableOpacity>
              </View>
            </View>
            
            <ModalFooter onClose={onClose} onSave={() => onSave({ selectedProject, selectedService, permissionLevel })} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Approval Workflow Filter Modal
const ApprovalFilterModal = ({ visible, onClose, onApply }) => {
  const [projectFilter, setProjectFilter] = useState('');
  const [moduleFilter, setModuleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader title="Approval Filters" onClose={onClose} />
          
          <View style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Filter by Project</Text>
              <View style={styles.picker}>
                <Text style={projectFilter ? styles.pickerTextSelected : styles.pickerText}>Select a Project</Text>
                <Icon name="chevron-down" size={20} color="#6b7280" />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Filter by Module</Text>
              <View style={styles.picker}>
                <Text style={moduleFilter ? styles.pickerTextSelected : styles.pickerText}>Select a Module</Text>
                <Icon name="chevron-down" size={20} color="#6b7280" />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Filter by Status</Text>
              <View style={styles.picker}>
                <Text style={statusFilter ? styles.pickerTextSelected : styles.pickerText}>Select Status</Text>
                <Icon name="chevron-down" size={20} color="#6b7280" />
              </View>
            </View>
            
            <ModalFooter onClose={onClose} onSave={() => onApply({ projectFilter, moduleFilter, statusFilter })} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Dashboard Permission Filter Modal
const DashboardFilterModal = ({ visible, onClose, onApply }) => {
  const [projectFilter, setProjectFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ModalHeader title="Dashboard Filters" onClose={onClose} />
          
          <View style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Filter by Project</Text>
              <View style={styles.picker}>
                <Text style={projectFilter ? styles.pickerTextSelected : styles.pickerText}>Select a Project</Text>
                <Icon name="chevron-down" size={20} color="#6b7280" />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Filter by Role</Text>
              <View style={styles.picker}>
                <Text style={roleFilter ? styles.pickerTextSelected : styles.pickerText}>Select a Role</Text>
                <Icon name="chevron-down" size={20} color="#6b7280" />
              </View>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Filter by Type</Text>
              <View style={styles.picker}>
                <Text style={typeFilter ? styles.pickerTextSelected : styles.pickerText}>Select Type</Text>
                <Icon name="chevron-down" size={20} color="#6b7280" />
              </View>
            </View>
            
            <ModalFooter onClose={onClose} onSave={() => onApply({ projectFilter, roleFilter, typeFilter })} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function SettingsPermissionScreen() {
  const [activeTab, setActiveTab] = useState('Role Permission');
  const [searchQuery, setSearchQuery] = useState('');
  const [addRoleModalVisible, setAddRoleModalVisible] = useState(false);
  const [viewUserPermissionsModalVisible, setViewUserPermissionsModalVisible] = useState(false);
  const [addUserPermissionModalVisible, setAddUserPermissionModalVisible] = useState(false);
  const [approvalFilterModalVisible, setApprovalFilterModalVisible] = useState(false);
  const [dashboardFilterModalVisible, setDashboardFilterModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const tabs = ['Role Permission', 'User Permission', 'Approval Workflow', 'Dashboard Permission'];

  const getData = () => {
    switch (activeTab) {
      case 'Role Permission':
        return roles.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      case 'User Permission':
        return users.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      case 'Approval Workflow':
        return approvals.filter(item => item.module.toLowerCase().includes(searchQuery.toLowerCase()));
      case 'Dashboard Permission':
        return dashboards.filter(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
      default:
        return [];
    }
  };

  const renderItem = (item) => {
    switch (activeTab) {
      case 'Role Permission':
        return <RoleCard key={item.id} item={item} />;
      case 'User Permission':
        return (
          <UserCard 
            key={item.id} 
            item={item} 
            onViewPermissions={() => {
              setSelectedUser(item);
              setViewUserPermissionsModalVisible(true);
            }}
          />
        );
      case 'Approval Workflow':
        return <ApprovalCard key={item.id} item={item} />;
      case 'Dashboard Permission':
        return <DashboardCard key={item.id} item={item} />;
      default:
        return null;
    }
  };

  const handleAddRole = (data) => {
    console.log('Add Role:', data);
    setAddRoleModalVisible(false);
  };

  const handleAddUserPermission = (data) => {
    console.log('Add User Permission:', data);
    setAddUserPermissionModalVisible(false);
  };

  const handleApplyApprovalFilters = (filters) => {
    console.log('Apply Approval Filters:', filters);
    setApprovalFilterModalVisible(false);
  };

  const handleApplyDashboardFilters = (filters) => {
    console.log('Apply Dashboard Filters:', filters);
    setDashboardFilterModalVisible(false);
  };

  return (
    <MainLayout title="Permissions">
      <LinearGradient colors={['#3b82f6', '#1e40af']} style={styles.gradient}>
        <View style={styles.container}>
          <Text style={styles.title}>Permission Settings</Text>
          <Text style={styles.subtitle}>Manage user permissions for the project.</Text>

          {/* Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.tabContainer}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Search and Action Buttons */}
          <View style={styles.actionBar}>
            <View style={styles.searchContainer}>
              <Icon name="magnify" size={20} color="#6b7280" />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search..."
                style={styles.searchInput}
              />
            </View>
            
            <View style={styles.buttonsContainer}>
              {activeTab === 'Role Permission' && (
                <TouchableOpacity 
                  onPress={() => setAddRoleModalVisible(true)}
                  style={styles.iconButtonContainer}
                >
                  <Icon name="plus-circle" size={24} color="#10b981" />
                </TouchableOpacity>
              )}
              
              {activeTab === 'User Permission' && (
                <TouchableOpacity 
                  onPress={() => setAddUserPermissionModalVisible(true)}
                  style={styles.textButton}
                >
                  <Icon name="plus" size={16} color="#ffffff" style={{ marginRight: 4 }} />
                  <Text style={styles.buttonText}>Add Permission</Text>
                </TouchableOpacity>
              )}
              
              {activeTab === 'Approval Workflow' && (
                <TouchableOpacity 
                  onPress={() => setApprovalFilterModalVisible(true)}
                  style={styles.textButton}
                >
                  <Icon name="filter" size={16} color="#ffffff" style={{ marginRight: 4 }} />
                  <Text style={styles.buttonText}>Filters</Text>
                </TouchableOpacity>
              )}
              
              {activeTab === 'Dashboard Permission' && (
                <>
                  <TouchableOpacity 
                    onPress={() => setAddRoleModalVisible(true)}
                    style={styles.iconButtonContainer}
                  >
                    <Icon name="plus-circle" size={24} color="#10b981" />
                  </TouchableOpacity>
                  <TouchableOpacity 
                    onPress={() => setDashboardFilterModalVisible(true)}
                    style={styles.textButton}
                  >
                    <Icon name="filter" size={16} color="#ffffff" style={{ marginRight: 4 }} />
                    <Text style={styles.buttonText}>Filters</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* Data List */}
          <View style={styles.listContainer}>
            {getData().map(renderItem)}
          </View>
        </View>
      </LinearGradient>

      {/* Modals */}
      <AddRoleModal
        visible={addRoleModalVisible}
        onClose={() => setAddRoleModalVisible(false)}
        onSave={handleAddRole}
      />
      
      <ViewUserPermissionsModal
        visible={viewUserPermissionsModalVisible}
        onClose={() => setViewUserPermissionsModalVisible(false)}
        user={selectedUser}
      />
      
      <AddUserPermissionModal
        visible={addUserPermissionModalVisible}
        onClose={() => setAddUserPermissionModalVisible(false)}
        onSave={handleAddUserPermission}
      />
      
      <ApprovalFilterModal
        visible={approvalFilterModalVisible}
        onClose={() => setApprovalFilterModalVisible(false)}
        onApply={handleApplyApprovalFilters}
      />
      
      <DashboardFilterModal
        visible={dashboardFilterModalVisible}
        onClose={() => setDashboardFilterModalVisible(false)}
        onApply={handleApplyDashboardFilters}
      />
    </MainLayout>
  );
}

const styles = {
  gradient: {
    paddingTop: 16,
    paddingBottom: 8,
    marginBottom: -8
  },
  container: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 16
  },
  tabContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb'
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 8
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6'
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280'
  },
  activeTabText: {
    color: '#3b82f6'
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: '#374151'
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12
  },
  iconButtonContainer: {
    marginRight: 8
  },
  textButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14
  },
  listContainer: {
    marginTop: 8
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    borderWidth: 1,
    borderColor: '#f3f4f6'
  },
  cardTitle: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '600'
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  iconButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 6,
    padding: 4
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '85%',
    overflow: 'hidden'
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    padding: 16
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff'
  },
  modalBody: {
    padding: 16
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
    marginTop: 16
  },
  modalButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8
  },
  cancelButton: {
    backgroundColor: '#f3f4f6'
  },
  saveButton: {
    backgroundColor: '#3b82f6'
  },
  cancelButtonText: {
    color: '#374151'
  },
  saveButtonText: {
    color: '#ffffff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
    marginBottom: 8
  },
  subLabel: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 16
  },
  radioGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap'
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8
  },
  radioText: {
    marginLeft: 8,
    color: '#374151'
  },
  inputGroup: {
    marginBottom: 16
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12
  },
  pickerText: {
    color: '#9ca3af'
  },
  pickerTextSelected: {
    color: '#374151'
  },
  permissionList: {
    marginTop: 8
  },
  permissionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  permissionText: {
    marginLeft: 8,
    color: '#374151'
  }
};