import React, { useState, useEffect } from 'react';
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
  Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayout from '../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation(); // Initialize navigation hook
  const [modalVisible, setModalVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(300));
  const [newDepartment, setNewDepartment] = useState('');
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [departmentsLoading, setDepartmentsLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [token, setToken] = useState('');
  const [orgId, setOrgId] = useState('');
  const [loading, setLoading] = useState(true);

  // Check login status and fetch token
  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        console.log("User Data:", parsedData);
        setToken(parsedData.jwtToken);
        setOrgId(parsedData.memberFormBean.organizationId);
      }
    } catch (err) {
      console.error("Error checking login status:", err);
    }
  };

  // Fetch departments from API
  const fetchDepartments = async () => {
    if (!token || !orgId) return;
    try {
      setDepartmentsLoading(true);
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/department', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Menu-Id': '8OMNBJc0dAp',
        },
      });
      const data = await response.json();
      console.log('Fetched departments:', data);
      if (data.departmentFormBeans) {
        setDepartments(data.departmentFormBeans.map(d => ({
          id: d.autoId || d.id,
          name: d.departmentName,
          status: d.status
        })));
      } else {
        console.error('Failed to fetch departments:', data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setDepartmentsLoading(false);
    }
  };

  // Save department (add or edit)
  const saveDepartment = async () => {
    if (!newDepartment.trim() || !token || !orgId) return;
    try {
      const body = {
        departmentFormBean: {
          departmentName: newDepartment,
          orgId: orgId,
          status: editingDepartment ? editingDepartment.status : 'Active',
          ...(editingDepartment && { autoId: editingDepartment.id })
        }
      };
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/department', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Menu-Id': '8OMNBJc0dAp',
        },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      console.log('Saved department:', data);
      if (data.status) {
        fetchDepartments();
        setNewDepartment('');
        setEditingDepartment(null);
      } else {
        console.error('Failed to save department:', data);
      }
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  // Delete department
  const deleteDepartment = async (departmentId) => {
    if (!token || !departmentId) return;
    try {
      const response = await fetch(`https://api-v2-skystruct.prudenttec.com/department/${departmentId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Menu-Id': '8OMNBJc0dAp',
        },
      });
      if (response.ok) {
        fetchDepartments();
      } else {
        console.error('Failed to delete department');
      }
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  // Fetch members from API
  const fetchMembers = async () => {
    if (!token) return;
    console.log('Fetching members with token:', token);
    try {
      setLoading(true);
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/member/get-all-member-list-by-org', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Menu-Id': '8OMNBJc0dAp',
        },
        body: JSON.stringify({
          "comment":""
        }),
      });
      
      const data = await response.json();
      console.log('Fetched members:', data);
      if (data.memberFormBeans) {
        setMembers(data.memberFormBeans);
      } else {
        console.error('Failed to fetch members:', data);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };
  console.log("Org ID:", orgId);  
  // Run on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Fetch data when token and orgId are available
  useEffect(() => {
    if (token && orgId) {
      fetchMembers();
      fetchDepartments();
    }
  }, [token, orgId]);

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
    saveDepartment();
  };

  const handleEdit = (department) => {
    setEditingDepartment(department);
    setNewDepartment(department.name);
  };

  const handleDelete = (department) => {
    deleteDepartment(department.id);
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
    return status === 'A' ? colors.success : colors.danger;
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
                onPress={fetchMembers}
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
              onPress={() => navigation.navigate('AddMembers')} // Navigate to AddMembers screen
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
          {loading ? (
            <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: colors.textMuted }}>Loading...</Text>
            </View>
          ) : members.length === 0 ? (
            <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="account-group" size={40} color={colors.textMuted} />
              <Text style={{ color: colors.textMuted, marginTop: 12 }}>No members found</Text>
            </View>
          ) : (
            members.map((member, index) => (
              <View key={index} style={{ 
                backgroundColor: colors.surface, 
                borderRadius: 16, 
                padding: 16, 
                marginBottom: 16,
                elevation: 3,
                borderWidth: 1,
                borderColor: colors.border
              }}>
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: 16,
                  flexWrap: 'wrap'
                }}>
                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    flex: 1,
                    minWidth: 0
                  }}>
                    <Image 
                      source={{ uri: member.profileUrl || 'https://skystruct.blob.core.windows.net/file-skytruct/Setup/user-img.jpg' }} 
                      style={{ width: 48, height: 44, borderRadius: 24, marginRight: 16 }} 
                    />
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text 
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ fontSize: 16, fontWeight: '600', color: colors.text }}
                      >
                        {member.name}
                      </Text>
                      <Text 
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={{ fontSize: 12, color: colors.textMuted, marginTop: 4 }}
                      >
                        {member.emailId}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    marginLeft: 16,
                    marginTop: 8
                  }}>
                    <View style={{ 
                      borderRadius: 8, 
                      height: 12, 
                      width: 12, 
                      backgroundColor: getStatusColor(member.status), 
                      marginRight: 8 
                    }} />
                    <Text style={{ 
                      fontSize: 12, 
                      color: colors.textMuted, 
                      marginRight: 8
                    }}>
                      {member.status === 'A' ? 'Active' : 'Inactive'}
                    </Text>
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
                      <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                        {member.lastLoginDate || 'Not logged in yet'}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 16 }}>
                    <Icon name="folder-outline" size={16} color={colors.textMuted} style={{ marginRight: 12 }} />
                    <View>
                      <Text style={{ fontSize: 12, color: colors.textMuted }}>Project</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{member.proName}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))
          )}
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

                      <View style={{ marginTop: 32 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 16 }}>Department List</Text>
                        
                        {departmentsLoading ? (
                          <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: colors.textMuted }}>Loading departments...</Text>
                          </View>
                        ) : departments.map((department) => (
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
                        
                        {!departmentsLoading && departments.length === 0 && (
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