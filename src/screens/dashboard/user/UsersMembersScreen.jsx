import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Modal, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import MainLayout from '../../components/MainLayout';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function UsersMembersScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(300));
  const [newDepartment, setNewDepartment] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Architectural', status: 'Active' },
    { id: 2, name: 'Engineering', status: 'Active' },
    { id: 3, name: 'Construction', status: 'Inactive' },
    { id: 4, name: 'Design', status: 'Active' },
    { id: 5, name: 'Planning', status: 'Inactive' },
    { id: 6, name: 'Management', status: 'Active' },
  ]);

  const members = [
    {
      name: 'Alan David',
      email: 'vlyipa4378@acedby.com',
      role: 'Project Admin',
      lastLogin: '21 Aug 2025 11:35 AM',
      project: 'Granite Horizon',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
    },
    {
      name: 'Mukesh Sinha',
      email: 'vikashoffice38@gmail.com',
      role: 'Consultant',
      lastLogin: '29 Jul 2025 12:32 PM',
      project: 'Granite Horizon',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80'
    },
    {
      name: 'moteen',
      email: 'mo3@gmail.com',
      role: 'Consultant',
      lastLogin: 'Not logged in yet',
      project: 'Granite Horizon',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80'
    },
    {
      name: 'Sonalika',
      email: 'bicisov382@pricegh.com',
      role: 'Approver',
      lastLogin: '20 Aug 2025 5:51 PM',
      project: 'Granite Horizon',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    },
    {
      name: 'Martin',
      email: 'vayariv781@betzenn.com',
      role: 'Approver',
      lastLogin: '20 Aug 2025 5:51 PM',
      project: 'Granite Horizon',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
    }
  ];

  const openModal = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    setNewDepartment('');
    setEditingDepartment(null);
    Animated.timing(slideAnim, {
      toValue: 300,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  const handleSubmit = () => {
    if (newDepartment.trim()) {
      if (editingDepartment) {
        // Update existing department
        setDepartments(prev => 
          prev.map(dept => 
            dept.id === editingDepartment.id 
              ? { ...dept, name: newDepartment } 
              : dept
          )
        );
        setEditingDepartment(null);
      } else {
        // Add new department
        setDepartments(prev => [
          ...prev,
          { id: Date.now(), name: newDepartment, status: 'Active' }
        ]);
      }
      setNewDepartment('');
    }
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setNewDepartment(department.name);
  };

  const handleDelete = (department) => {
    setDepartments(prev => prev.filter(dept => dept.id !== department.id));
  };

  const toggleStatus = (department) => {
    setDepartments(prev => 
      prev.map(dept => 
        dept.id === department.id 
          ? { ...dept, status: dept.status === 'Active' ? 'Inactive' : 'Active' } 
          : dept
      )
    );
  };

  const getRoleColor = (role) => {
    switch(role) {
      case 'Project Admin': return 'bg-purple-500';
      case 'Consultant': return 'bg-blue-500';
      case 'Approver': return 'bg-amber-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <MainLayout title="Members">
      <ScrollView className="flex-1 px-5 py-4 bg-gray-50 mb-10">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Team Members</Text>
          <Text className="text-sm text-gray-500">List of project members and their roles</Text>
        </View>
        
        {/* Search bar and action buttons row */}
        <View className="flex-row items-center mb-6">
          {/* Search bar */}
          <View className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              placeholder="Search team members..."
              className="ml-2 flex-1 text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>
          
          {/* Plus icon with box and radius */}
          <TouchableOpacity 
            className="ml-3 bg-blue-600 w-12 h-12 rounded-xl items-center justify-center shadow-sm" // Changed to blue-600
            onPress={openModal}
          >
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
          
          {/* Add new user icon */}
          <TouchableOpacity className="ml-3 bg-white w-12 h-12 rounded-xl items-center justify-center shadow-sm border border-gray-200">
            <Ionicons name="person-add" size={24} color="#2563eb" /> {/* Changed to blue-600 */}
          </TouchableOpacity>
          
          {/* Filter icon */}
          <TouchableOpacity className="ml-3 bg-white w-12 h-12 rounded-xl items-center justify-center shadow-sm border border-gray-200">
            <Ionicons name="filter" size={24} color="#2563eb" /> {/* Changed to blue-600 */}
          </TouchableOpacity>
        </View>
        
        {/* Increased spacing between cards - space-y-8 creates even larger gaps */}
        <View className="space-y-8"> 
          {members.map((member, index) => (
            <View key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center">
                  <Image 
                    source={{ uri: member.image }} 
                    className="w-12 h-12 rounded-full mr-4" 
                  />
                  <View>
                    <Text className="text-lg font-semibold text-gray-900">{member.name}</Text>
                    <Text className="text-sm text-gray-500">{member.email}</Text>
                  </View>
                </View>
                
                <View className="flex-row items-center">
                  <View className={`rounded-full h-3 w-3 ${member.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'} mr-2`} />
                  <Text className="text-sm text-gray-600 mr-4">{member.status}</Text>
                  <TouchableOpacity className="ml-auto">
                    <Ionicons name="create-outline" size={20} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View className="border-t border-gray-100 pt-4">
                <View className="flex-row items-center mb-3">
                  <View className={`h-8 w-1.5 ${getRoleColor(member.role)} rounded-full mr-3`} />
                  <View>
                    <Text className="text-xs text-gray-500">Role</Text>
                    <Text className="text-sm font-medium text-gray-900">{member.role}</Text>
                  </View>
                </View>
                
                <View className="flex-row items-center mb-3 ml-4">
                  <Ionicons name="time-outline" size={16} color="#9ca3af" style={{ marginRight: 12 }} />
                  <View>
                    <Text className="text-xs text-gray-500">Last Login</Text>
                    <Text className="text-sm font-medium text-gray-900">{member.lastLogin}</Text>
                  </View>
                </View>
                
                <View className="flex-row items-center ml-4">
                  <Ionicons name="folder-outline" size={16} color="#9ca3af" style={{ marginRight: 12 }} />
                  <View>
                    <Text className="text-xs text-gray-500">Project</Text>
                    <Text className="text-sm font-medium text-gray-900">{member.project}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Sidebar Modal for Department Management */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
        animationType="none"
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View className="flex-1 bg-black/50">
            <TouchableWithoutFeedback>
              <Animated.View 
                style={{ 
                  transform: [{ translateX: slideAnim }],
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  bottom: 0,
                  width: '85%'
                }}
                className="bg-white"
              >
                <ScrollView className="flex-1 p-6">
                  <View className="flex-row justify-between items-center mb-6">
                    <Text className="text-xl font-bold text-gray-900">
                      {editingDepartment ? 'Edit Department' : 'Add New Department'}
                    </Text>
                    <TouchableOpacity onPress={closeModal} className="p-2">
                      <Ionicons name="close" size={24} color="#4b5563" />
                    </TouchableOpacity>
                  </View>

                  <View className="space-y-5">
                    <View>
                      <Text className="text-sm font-medium text-gray-700 mb-2">Department Name</Text>
                      <TextInput
                        className="border border-gray-300 rounded-xl p-4 text-gray-900 text-sm"
                        placeholder="New department"
                        value={newDepartment}
                        onChangeText={setNewDepartment}
                        autoFocus
                      />
                    </View>

                    <View className="flex-row justify-between mt-6">
                      <TouchableOpacity 
                        className="flex-1 bg-blue-600 rounded-xl p-4 items-center mr-3" // Changed to blue-600
                        onPress={handleSubmit}
                      >
                        <Text className="text-white font-semibold">Submit</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        className="flex-1 bg-gray-200 rounded-xl p-4 items-center ml-3"
                        onPress={closeModal}
                      >
                        <Text className="text-gray-700 font-semibold">Cancel</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Department List */}
                    <View className="mt-8">
                      <Text className="text-lg font-semibold text-gray-800 mb-4">Department List</Text>
                      
                      {departments.map((department) => (
                        <View key={department.id} className="flex-row items-center justify-between p-4 mb-3 bg-gray-50 rounded-xl border border-gray-200">
                          <View className="flex-1">
                            <Text className="text-gray-800 font-medium">{department.name}</Text>
                          </View>
                          
                          <View className="flex-row">
                            <TouchableOpacity 
                              className="p-2 rounded-lg mr-2"
                              onPress={() => handleEdit(department)}
                            >
                              <Ionicons name="pencil-outline" size={18} color="#4b5563" />
                            </TouchableOpacity>
                            <TouchableOpacity 
                              className="p-2 rounded-lg"
                              onPress={() => handleDelete(department)}
                            >
                              <Ionicons name="trash-outline" size={18} color="#dc2626" />
                            </TouchableOpacity>
                          </View>
                        </View>
                      ))}
                      
                      {departments.length === 0 && (
                        <View className="p-4 items-center justify-center">
                          <Ionicons name="business-outline" size={40} color="#9ca3af" />
                          <Text className="text-gray-500 mt-2">No departments added yet</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </ScrollView>
              </Animated.View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </MainLayout>
  );
}