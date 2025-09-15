import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  Animated, 
  TouchableWithoutFeedback, 
  Keyboard,
  Dimensions
} from 'react-native';
import MainLayout from '../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

const colors = {
  primary: '#1D4ED8',
  secondary: '#6366F1',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceVariant: '#F8FAFC',
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#6B7280',
  border: '#E2E8F0',
};

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
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwa90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
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
      case 'Project Admin': return colors.secondary;
      case 'Consultant': return colors.info;
      case 'Approver': return colors.warning;
      default: return colors.textMuted;
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? colors.success : colors.danger;
  };

  return (
    <MainLayout title="Members">
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
        <LinearGradient 
          colors={['#f0f7ff', '#e6f0ff']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
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
                color: colors.text 
              }}>
                Team Members
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: colors.textMuted,
                marginTop: 4
              }}>
                List of project members and their roles
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: colors.surface, 
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
                onPress={() => console.log('Refresh')}
              >
                <Icon name="refresh" size={20} color={colors.info} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: colors.info,
                  borderRadius: 12
                }}
                onPress={openModal}
              >
                <Icon name="plus" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search and Filter Row */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ 
              flex: 1,
              backgroundColor: colors.surface, 
              borderRadius: 12, 
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="magnify" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                <TextInput
                  placeholder="Search team members..."
                  placeholderTextColor={colors.textMuted}
                  style={{ 
                    flex: 1, 
                    color: colors.text, 
                    fontSize: 14 
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{ 
                minWidth: 56,
                backgroundColor: colors.info,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => console.log('Filter')}
            >
              <Icon name="filter-outline" size={16} color="#ffffff" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ 
                minWidth: 56,
                backgroundColor: colors.surface,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => console.log('Add user')}
            >
              <Icon name="account-plus" size={16} color={colors.info} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Members List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {members.map((member, index) => (
            <View key={index} style={{ 
              backgroundColor: colors.surface, 
              borderRadius: 16, 
              padding: 16, 
              marginBottom: 16,
           
              elevation: 3,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image 
                    source={{ uri: member.image }} 
                    style={{ width: 48, height: 44, borderRadius: 24, marginRight: 16 }} 
                  />
                  <View>
                    <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>{member.name}</Text>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}>{member.email}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ 
                    borderRadius: 8, 
                    height: 12, 
                    width: 12, 
                    backgroundColor: getStatusColor(member.status), 
                    marginRight: 8 
                  }} />
                  <Text style={{ fontSize: 12, color: colors.textMuted, marginRight: 16 }}>{member.status}</Text>
                  <TouchableOpacity>
                    <Icon name="pencil-outline" size={20} color={colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{ 
                    height: 32, 
                    width: 4, 
                    backgroundColor: getRoleColor(member.role), 
                    borderRadius: 2, 
                    marginRight: 12 
                  }} />
                  <View>
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>Role</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{member.role}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, marginLeft: 16 }}>
                  <Icon name="clock-outline" size={16} color={colors.textMuted} style={{ marginRight: 12 }} />
                  <View>
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>Last Login</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{member.lastLogin}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
                  <Icon name="folder-outline" size={16} color={colors.textMuted} style={{ marginRight: 12 }} />
                  <View>
                    <Text style={{ fontSize: 12, color: colors.textMuted }}>Project</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{member.project}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Sidebar Modal for Department Management */}
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
          animationType="none"
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <TouchableWithoutFeedback>
                <Animated.View 
                  style={{ 
                    transform: [{ translateX: slideAnim }],
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: '85%',
                    backgroundColor: colors.surface,
                
                    elevation: 5,
                  }}
                >
                  <ScrollView style={{ flex: 1, padding: 24 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text }}>
                        {editingDepartment ? 'Edit Department' : 'Add New Department'}
                      </Text>
                      <TouchableOpacity onPress={closeModal} style={{ padding: 8 }}>
                        <Icon name="close" size={24} color={colors.textMuted} />
                      </TouchableOpacity>
                    </View>

                    <View style={{ gap: 20 }}>
                      <View>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text, marginBottom: 8 }}>Department Name</Text>
                        <TextInput
                          style={{ 
                            borderWidth: 1, 
                            borderColor: colors.border, 
                            borderRadius: 12, 
                            padding: 16, 
                            color: colors.text, 
                            fontSize: 14,
                            backgroundColor: colors.surfaceVariant
                          }}
                          placeholder="New department"
                          placeholderTextColor={colors.textMuted}
                          value={newDepartment}
                          onChangeText={setNewDepartment}
                          autoFocus
                        />
                      </View>

                      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
                        <TouchableOpacity 
                          style={{ 
                            flex: 1, 
                            backgroundColor: colors.info, 
                            borderRadius: 12, 
                            padding: 16, 
                            alignItems: 'center',
                            marginRight: 12
                          }}
                          onPress={handleSubmit}
                        >
                          <Text style={{ color: '#ffffff', fontWeight: '600', fontSize: 14 }}>Submit</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                          style={{ 
                            flex: 1, 
                            backgroundColor: colors.surfaceVariant, 
                            borderRadius: 12, 
                            padding: 16, 
                            alignItems: 'center',
                            marginLeft: 12,
                            borderWidth: 1,
                            borderColor: colors.border
                          }}
                          onPress={closeModal}
                        >
                          <Text style={{ color: colors.text, fontWeight: '600', fontSize: 14 }}>Cancel</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Department List */}
                      <View style={{ marginTop: 32 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 16 }}>Department List</Text>
                        
                        {departments.map((department) => (
                          <View key={department.id} style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'space-between', 
                            padding: 16, 
                            marginBottom: 12, 
                            backgroundColor: colors.surfaceVariant, 
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: colors.border
                          }}>
                            <View style={{ flex: 1 }}>
                              <Text style={{ color: colors.text, fontWeight: '500' }}>{department.name}</Text>
                            </View>
                            
                            <View style={{ flexDirection: 'row' }}>
                              <TouchableOpacity 
                                style={{ padding: 8, borderRadius: 8, marginRight: 8 }}
                                onPress={() => handleEdit(department)}
                              >
                                <Icon name="pencil-outline" size={18} color={colors.textMuted} />
                              </TouchableOpacity>
                              <TouchableOpacity 
                                style={{ padding: 8, borderRadius: 8 }}
                                onPress={() => handleDelete(department)}
                              >
                                <Icon name="trash-can-outline" size={18} color={colors.danger} />
                              </TouchableOpacity>
                            </View>
                          </View>
                        ))}
                        
                        {departments.length === 0 && (
                          <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="office-building" size={40} color={colors.textMuted} />
                            <Text style={{ color: colors.textMuted, marginTop: 12 }}>No departments added yet</Text>
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
      </View>
    </MainLayout>
  );
}