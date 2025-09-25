import React, { useState, useEffect, useRef, memo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Alert,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
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

const FormField = memo(({ label, value, placeholder, onPress, icon, required = false, editable = false, onChangeText, inputRef }) => (
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
          ref={inputRef}
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
          autoCapitalize={label === 'Email Address' ? 'none' : 'words'}
          autoCorrect={false}
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
));

export default function AddNewMemberScreen() {
  const navigation = useNavigation();

  // Individual form states for editable fields
  const [name, setName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [code, setCode] = useState('');
  const [staffNumber, setStaffNumber] = useState('');
  const [grade, setGrade] = useState('');
  const [discipline, setDiscipline] = useState('');
  const [serviceIdInput, setServiceIdInput] = useState('');

  // Form state for modal-managed fields
  const [formData, setFormData] = useState({
    departementId: '',
    prefferedLanguage: '',
    roleId: '',
    serviceId: '',
    projectId: []
  });

  // Display names for selected items
  const [selectedDepartmentName, setSelectedDepartmentName] = useState('');
  const [selectedRoleName, setSelectedRoleName] = useState('');
  const [selectedServiceName, setSelectedServiceName] = useState('');
  const [selectedLanguageName, setSelectedLanguageName] = useState('');

  // Lists
  const [departmentsList, setDepartmentsList] = useState([]);
  const [rolesList, setRolesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [languagesList, setLanguagesList] = useState([]);
  const [projectsList, setProjectsList] = useState([]);

  // Modal states
  const [departmentModalVisible, setDepartmentModalVisible] = useState(false);
  const [roleModalVisible, setRoleModalVisible] = useState(false);
  const [serviceModalVisible, setServiceModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [projectModalVisible, setProjectModalVisible] = useState(false);

  // Profile image
  const [profileImage, setProfileImage] = useState(null);

  // Token and orgId
  const [token, setToken] = useState('');
  const [orgId, setOrgId] = useState('');

  // Refs for TextInput to manage focus
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const codeInputRef = useRef(null);
  const staffNumberInputRef = useRef(null);
  const gradeInputRef = useRef(null);
  const disciplineInputRef = useRef(null);
  const serviceIdInputRef = useRef(null);

  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setToken(parsedData.jwtToken);
        setOrgId(parsedData.memberFormBean?.organizationId || '');
      }
    } catch (err) {
      console.error("Error checking login status:", err);
    }
  };

  const fetchList = async (endpoint, setter, fieldId = 'autoId', fieldName = 'name') => {
    if (!token) return;
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Menu-Id': endpoint === '/project/search-project-details' ? 'DRlBbUjgXSb' : '8OMNBJc0dAp',
      };

      const fetchOptions = {
        method: endpoint === '/commonControl/get-dropdown' ? 'POST' : 'GET',
        headers,
      };

      if (endpoint === '/commonControl/get-dropdown') {
        fetchOptions.body = JSON.stringify({ type: 'PREFFERED_LANGUAGE' });
      }

      const response = await fetch(`https://api-v2-skystruct.prudenttec.com${endpoint}`, fetchOptions);
      const data = await response.json();

      if (endpoint === '/commonControl/get-dropdown') {
        if (data.dropdownMap && data.dropdownMap.PREFFERED_LANGUAGE) {
          setter(data.dropdownMap.PREFFERED_LANGUAGE.map(item => ({
            id: item.autoId,
            name: item.dropdownValue,
            selected: false
          })));
        }
      }
      else if (endpoint === '/project/search-project-details') {
        if (data.projectFormBean && data.projectFormBean.projectFormBeans) {
          setter(data.projectFormBean.projectFormBeans.map(item => ({
            id: item.autoId,
            name: item.projectName,
            selected: false
          })));
        }
      }
      else {
        const beansKey = Object.keys(data).find(key => key.endsWith('FormBeans'));
        if (beansKey && data[beansKey]) {
          setter(data[beansKey].map(item => ({
            id: item[fieldId] || item.id,
            name: item[fieldName] || item.name,
            selected: false
          })));
        }
      }
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  useEffect(() => {
    if (token) {
      fetchList('/department', setDepartmentsList, 'autoId', 'departmentName');
      fetchList('/role', setRolesList, 'roleId', 'roleName');
      fetchList('/service', setServicesList, 'serviceId', 'serviceName');
      fetchList('/commonControl/get-dropdown', setLanguagesList, 'autoId', 'dropdownValue');
      fetchList('/project/search-project-details', setProjectsList, 'autoId', 'projectName');
    }
  }, [token]);

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSelect = (fieldId, fieldName, item, setName) => {
    updateFormData(fieldId, item.id);
    setName(item.name);
  };

  const handleProjectSelection = (projectId) => {
    const updatedProjects = projectsList.map(project =>
      project.id === projectId
        ? { ...project, selected: !project.selected }
        : project
    );
    setProjectsList(updatedProjects);
    const selectedIds = updatedProjects.filter(p => p.selected).map(p => p.id);
    updateFormData('projectId', selectedIds);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0]);
    }
  };

const handleSubmit = async () => {
  const submitData = {
    name,
    emailId,
    mobileNumber,
    departementId: formData.departementId,
    code,
    staffNumber,
    grade,
    discipline,
    prefferedLanguage: formData.prefferedLanguage,
    roleId: formData.roleId || 'AySqxHmGOiQ',
    serviceId: serviceIdInput || formData.serviceId,
    projectId: formData.projectId.join(','),
  };

  if (!submitData.name || !submitData.emailId || !submitData.departementId) {
    Alert.alert('Error', 'Please fill in all required fields');
    return;
  }

  try {
    const formDataToSend = new FormData();

    // 👇 Append all data under a single key "formData" as JSON
    formDataToSend.append('formData', JSON.stringify(submitData));

    // If API also expects a file, add it like this:
    formDataToSend.append('file',null);

    console.log("Submitting data:", submitData);

    const response = await fetch(
      'https://api-v2-skystruct.prudenttec.com/member/invite-member-details',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Menu-Id': '8OMNBJc0dAp',
          'accept': 'application/json',
        },
        body: formDataToSend,
      }
    );


 console.log("Status:", response.status);

    const responseText = await response.text();
    console.log("Raw response:", responseText);

    if (response.ok) {
      Alert.alert(
        'Success',
        'New member added successfully!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert('Error', responseText || 'Failed to add member');
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    Alert.alert('Error', 'Failed to add member');
  }
};




  const SelectionModal = ({ visible, onClose, title, data, selectedId, onSelect, icon }) => (
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
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  padding: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                  backgroundColor: selectedId === item.id ? colors.surfaceVariant : 'transparent'
                }}
                onPress={() => {
                  onSelect(item);
                  onClose();
                }}
              >
                <Text style={{
                  color: selectedId === item.id ? colors.info : colors.text,
                  fontWeight: selectedId === item.id ? '600' : '400'
                }}>{item.name}</Text>
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
            {projectsList.map((project) => (
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

  return (
    <MainLayout title="Add New Member">
      <View style={{ flex: 1, backgroundColor: colors.background }}>
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
              {/* Profile Picture */}
              <View style={{ alignItems: 'center', marginBottom: 20 }}>
                <TouchableOpacity
                  onPress={pickImage}
                  style={{ alignItems: 'center' }}
                >
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage.uri }}
                      style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 8 }}
                    />
                  ) : (
                    <View style={{
                      width: 100,
                      height: 100,
                      borderRadius: 50,
                      backgroundColor: colors.surfaceVariant,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 8
                    }}>
                      <Icon name="camera-plus" size={40} color={colors.textMuted} />
                    </View>
                  )}
                  <Text style={{ color: colors.info, fontWeight: '600' }}>
                    {profileImage ? 'Change Profile Picture' : 'Upload Profile Picture'}
                  </Text>
                </TouchableOpacity>
              </View>
              <FormField
                label="Name"
                value={name}
                placeholder="Enter full name"
                icon="account"
                required
                editable
                onChangeText={setName}
                inputRef={nameInputRef}
              />
              <FormField
                label="Email Address"
                value={emailId}
                placeholder="Enter email address"
                icon="email"
                required
                editable
                onChangeText={setEmailId}
                inputRef={emailInputRef}
              />
              <FormField
                label="Phone"
                value={mobileNumber}
                placeholder="Enter phone number"
                icon="phone"
                required
                editable
                onChangeText={setMobileNumber}
                inputRef={phoneInputRef}
              />
              <FormField
                label="Department"
                value={selectedDepartmentName}
                placeholder="Select Department"
                icon="office-building"
                required
                onPress={() => setDepartmentModalVisible(true)}
              />
              <FormField
                label="Code"
                value={code}
                placeholder="Enter department code"
                icon="code-tags"
                editable
                onChangeText={setCode}
                inputRef={codeInputRef}
              />
              <FormField
                label="Staff Number"
                value={staffNumber}
                placeholder="Enter staff number"
                icon="badge-account"
                required
                editable
                onChangeText={setStaffNumber}
                inputRef={staffNumberInputRef}
              />
              <FormField
                label="Grade"
                value={grade}
                placeholder="Enter grade"
                icon="star"
                editable
                onChangeText={setGrade}
                inputRef={gradeInputRef}
              />
              <FormField
                label="Discipline"
                value={discipline}
                placeholder="Enter discipline"
                icon="school"
                editable
                onChangeText={setDiscipline}
                inputRef={disciplineInputRef}
              />
              <FormField
                label="Role"
                value={selectedRoleName}
                placeholder="Select Role"
                icon="account-tie"
                required
                onPress={() => setRoleModalVisible(true)}
              />
              <FormField
                label="Service ID"
                value={serviceIdInput}
                placeholder="Enter service ID"
                icon="identifier"
                required
                editable
                onChangeText={setServiceIdInput}
                inputRef={serviceIdInputRef}
              />
              <FormField
                label="Preferred Language"
                value={selectedLanguageName}
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
                    Selected Projects ({formData.projectId.length})
                  </Text>
                  <Text style={{ fontSize: 14, color: colors.text }}>
                    {formData.projectId.length > 0
                      ? projectsList.filter(p => formData.projectId.includes(p.id)).map(p => p.name).join(', ')
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
          data={departmentsList}
          selectedId={formData.departementId}
          onSelect={(item) => handleSelect('departementId', 'selectedDepartmentName', item, setSelectedDepartmentName)}
          icon="office-building"
        />
        <SelectionModal
          visible={roleModalVisible}
          onClose={() => setRoleModalVisible(false)}
          title="Select Role"
          data={rolesList}
          selectedId={formData.roleId}
          onSelect={(item) => handleSelect('roleId', 'selectedRoleName', item, setSelectedRoleName)}
          icon="account-tie"
        />
        <SelectionModal
          visible={serviceModalVisible}
          onClose={() => setServiceModalVisible(false)}
          title="Select Service"
          data={servicesList}
          selectedId={formData.serviceId}
          onSelect={(item) => handleSelect('serviceId', 'selectedServiceName', item, setSelectedServiceName)}
          icon="cog"
        />
        <SelectionModal
          visible={languageModalVisible}
          onClose={() => setLanguageModalVisible(false)}
          title="Select Language"
          data={languagesList}
          selectedId={formData.prefferedLanguage}
          onSelect={(item) => handleSelect('prefferedLanguage', 'selectedLanguageName', item, setSelectedLanguageName)}
          icon="translate"
        />
        <ProjectSelectionModal />
      </View>
    </MainLayout>
  );
} /////sample 