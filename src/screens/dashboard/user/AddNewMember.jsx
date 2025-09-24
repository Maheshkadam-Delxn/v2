import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TextInput, 
  TouchableOpacity, 
  Modal,
  FlatList,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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

export default function AddNewMemberScreen() {
  const navigation = useNavigation();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    code: '',
    staffNumber: '',
    grade: '',
    discipline: '',
    role: '',
    service: '',
    preferredLanguage: '',
    projects: []
  });

  // Modal states
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [projectModalVisible, setProjectModalVisible] = useState(false);

  // Data arrays
  const departments = [
    'Architectural', 'Engineering', 'Construction', 'Design', 'Planning', 'Management'
  ];
  
  const roles = [
    'Project Admin', 'Consultant', 'Approver', 'Designer', 'Engineer', 'Manager'
  ];
  
  const services = [
    'Design Services', 'Consulting', 'Project Management', 'Quality Assurance', 'Technical Support'
  ];
  
  const languages = [
    'English', 'Hindi', 'Spanish', 'French', 'German', 'Chinese'
  ];
  
  const projects = [
    { id: 1, name: 'Granite Horizon', selected: false },
    { id: 2, name: 'Skyline Corporate Tower', selected: false },
    { id: 3, name: 'ConstructHub', selected: false }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleProjectSelection = (projectId) => {
    const updatedProjects = projects.map(project => 
      project.id === projectId 
        ? { ...project, selected: !project.selected }
        : project
    );
    
    const selectedProjects = updatedProjects.filter(p => p.selected);
    updateFormData('projects', selectedProjects);
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.department || !formData.role) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    Alert.alert(
      'Success', 
      'New member added successfully!',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    );
  };

  const SelectionModal = ({ visible, onClose, title, data, selectedValue, onSelect, icon }) => (
    <Modal transparent visible={visible} animationType="fade">
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', padding: 20 }}>
        <View style={{ 
          backgroundColor: colors.surface, 
          borderRadius: 16, 
          maxHeight: 400,
          elevation: 10
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: colors.border
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name={icon} size={24} color={colors.info} style={{ marginRight: 12 }} />
              <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>{title}</Text>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  backgroundColor: selectedValue === item ? colors.surfaceVariant : 'transparent'
                }}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={{ 
                  color: selectedValue === item ? colors.info : colors.text,
                  fontWeight: selectedValue === item ? '600' : '400'
                }}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );

  const ProjectSelectionModal = () => (
    <Modal transparent visible={projectModalVisible} animationType="fade">
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', padding: 20 }}>
        <View style={{ 
          backgroundColor: colors.surface, 
          borderRadius: 16, 
          maxHeight: 500,
          elevation: 10
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: 20,
            borderBottomWidth: 1,
            borderBottomColor: colors.border
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="folder-multiple" size={24} color={colors.info} style={{ marginRight: 12 }} />
              <Text style={{ fontSize: 18, fontWeight: '600', color: colors.text }}>Select Projects</Text>
            </View>
            <TouchableOpacity onPress={() => setProjectModalVisible(false)}>
              <Icon name="close" size={24} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 16 }}>
              Select which projects this member will have access to
            </Text>
            
            {projects.map((project) => (
              <TouchableOpacity
                key={project.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 16,
                  marginBottom: 8,
                  backgroundColor: colors.surfaceVariant,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: project.selected ? colors.info : colors.border
                }}
                onPress={() => handleProjectSelection(project.id)}
              >
                <View style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  borderWidth: 2,
                  borderColor: project.selected ? colors.info : colors.border,
                  backgroundColor: project.selected ? colors.info : 'transparent',
                  marginRight: 12,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {project.selected && <Icon name="check" size={14} color="#ffffff" />}
                </View>
                <Text style={{ 
                  flex: 1,
                  color: project.selected ? colors.info : colors.text,
                  fontWeight: project.selected ? '600' : '400'
                }}>
                  {project.name}
                </Text>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              style={{
                backgroundColor: colors.info,
                padding: 16,
                borderRadius: 12,
                alignItems: 'center',
                marginTop: 16
              }}
              onPress={() => setProjectModalVisible(false)}
            >
              <Text style={{ color: '#ffffff', fontWeight: '600' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const FormField = ({ label, value, placeholder, onPress, icon, required = false, editable = false, onChangeText }) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{ 
        fontSize: 14, 
        fontWeight: '600', 
        color: colors.text, 
        marginBottom: 8 
      }}>
        {label} {required && <Text style={{ color: colors.danger }}>*</Text>}
      </Text>
      
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surfaceVariant,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 12,
          padding: 16,
          minHeight: 56
        }}
        onPress={onPress}
        disabled={editable}
      >
        {editable ? (
          <TextInput
            style={{ 
              flex: 1, 
              color: colors.text, 
              fontSize: 14,
              padding: 0
            }}
            value={value}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            onChangeText={onChangeText}
            autoCapitalize="words"
          />
        ) : (
          <Text style={{ 
            flex: 1, 
            color: value ? colors.text : colors.textMuted,
            fontSize: 14
          }}>
            {value || placeholder}
          </Text>
        )}
        
        <Icon 
          name={icon} 
          size={20} 
          color={colors.textMuted} 
          style={{ marginLeft: 12 }}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <MainLayout title="Add New Member">
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}


        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginTop: 0 }}>
            {/* Basic Information */}
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              elevation: 2,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: colors.text, 
                marginBottom: 20,
                textAlign: 'center'
              }}>
                User Details
              </Text>

              <FormField
                label="Name"
                value={formData.name}
                placeholder="Enter full name"
                icon="account"
                required
                editable
                onChangeText={(text) => updateFormData('name', text)}
              />

              <FormField
                label="Email Address"
                value={formData.email}
                placeholder="Enter email address"
                icon="email"
                required
                editable
                onChangeText={(text) => updateFormData('email', text)}
              />

              <FormField
                label="Phone"
                value={formData.phone}
                placeholder="Enter phone number"
                icon="phone"
                required
                editable
                onChangeText={(text) => updateFormData('phone', text)}
              />

              <FormField
                label="Department"
                value={formData.department}
                placeholder="Select Department"
                icon="office-building"
                required
                onPress={() => setDepartmentModalVisible(true)}
              />

              <FormField
                label="Code"
                value={formData.code}
                placeholder="Enter department code"
                icon="code-tags"
                editable
                onChangeText={(text) => updateFormData('code', text)}
              />

              <FormField
                label="Staff Number"
                value={formData.staffNumber}
                placeholder="Enter staff number"
                icon="badge-account"
                required
                editable
                onChangeText={(text) => updateFormData('staffNumber', text)}
              />

              <FormField
                label="Grade"
                value={formData.grade}
                placeholder="Enter grade"
                icon="star"
                editable
                onChangeText={(text) => updateFormData('grade', text)}
              />

              <FormField
                label="Discipline"
                value={formData.discipline}
                placeholder="Enter discipline"
                icon="school"
                editable
                onChangeText={(text) => updateFormData('discipline', text)}
              />

              <FormField
                label="Role"
                value={formData.role}
                placeholder="Select Role"
                icon="account-tie"
                required
                onPress={() => setRoleModalVisible(true)}
              />

              <FormField
                label="Service"
                value={formData.service}
                placeholder="Select Options"
                icon="cog"
                required
                onPress={() => setServiceModalVisible(true)}
              />

              <FormField
                label="Preferred Language"
                value={formData.preferredLanguage}
                placeholder="Select Language"
                icon="translate"
                onPress={() => setLanguageModalVisible(true)}
              />
            </View>

            {/* Project Status */}
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 16,
              padding: 20,
              marginBottom: 20,
              elevation: 2,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: colors.text, 
                marginBottom: 20 
              }}>
                Define Project Status
              </Text>

              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.surfaceVariant,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 16
                }}
                onPress={() => setProjectModalVisible(true)}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 14, color: colors.textMuted, marginBottom: 4 }}>
                    Selected Projects ({formData.projects.length})
                  </Text>
                  <Text style={{ fontSize: 14, color: colors.text }}>
                    {formData.projects.length > 0 
                      ? formData.projects.map(p => p.name).join(', ')
                      : 'No projects selected'
                    }
                  </Text>
                </View>
                <Icon name="chevron-right" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Action Buttons */}
            <View style={{ flexDirection: 'row', gap: 16, marginTop: 20, marginBottom: 40 }}>
              <TouchableOpacity 
                style={{
                  flex: 1,
                  backgroundColor: colors.surfaceVariant,
                  borderRadius: 12,
                  padding: 16,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: colors.border
                }}
                onPress={() => navigation.goBack()}
              >
                <Text style={{ color: colors.text, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={{
                  flex: 1,
                  backgroundColor: colors.info,
                  borderRadius: 12,
                  padding: 16,
                  alignItems: 'center'
                }}
                onPress={handleSubmit}
              >
                <Text style={{ color: '#ffffff', fontWeight: '600' }}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Selection Modals */}
        <SelectionModal
          visible={departmentModalVisible}
          onClose={() => setDepartmentModalVisible(false)}
          title="Select Department"
          data={departments}
          selectedValue={formData.department}
          onSelect={(value) => updateFormData('department', value)}
          icon="office-building"
        />

        <SelectionModal
          visible={roleModalVisible}
          onClose={() => setRoleModalVisible(false)}
          title="Select Role"
          data={roles}
          selectedValue={formData.role}
          onSelect={(value) => updateFormData('role', value)}
          icon="account-tie"
        />

        <SelectionModal
          visible={serviceModalVisible}
          onClose={() => setServiceModalVisible(false)}
          title="Select Service"
          data={services}
          selectedValue={formData.service}
          onSelect={(value) => updateFormData('service', value)}
          icon="cog"
        />

        <SelectionModal
          visible={languageModalVisible}
          onClose={() => setLanguageModalVisible(false)}
          title="Select Language"
          data={languages}
          selectedValue={formData.preferredLanguage}
          onSelect={(value) => updateFormData('preferredLanguage', value)}
          icon="translate"
        />

        <ProjectSelectionModal />
      </View>
    </MainLayout>
  );
}