import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainLayout from '../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

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

export default function AddVendor({ navigation, route }) {
  const [activeTab, setActiveTab] = useState('Vendor Details');
  const [showVendorTypeModal, setShowVendorTypeModal] = useState(false);
  const [showDocumentTypeModal, setShowDocumentTypeModal] = useState(false);
  const [vendorTypes, setVendorTypes] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [token, setToken] = useState('');
  const [orgId, setOrgId] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [loading, setLoading] = useState(true);
  const [poComments, setPoComments] = useState('');
  const [vendorComments, setVendorComments] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    autoId: '',
    name: '',
    email: '',
    mobileNo: '',
    taxNo: '',
    gstinNo: '',
    vendorCode: '',
    type: '',
    address: ''
  });

  // Check if editing existing vendor
  const isEdit = route?.params?.isEdit || false;
  const vendorData = route?.params?.vendor || null;

  useEffect(() => {
    if (isEdit && vendorData) {
      setFormData({
        autoId: vendorData.autoId || '',
        name: vendorData.name || '',
        email: vendorData.email || '',
        mobileNo: vendorData.mobileNo || '',
        taxNo: vendorData.taxNo || '',
        gstinNo: vendorData.gstinNo || '',
        vendorCode: vendorData.vendorCode || '',
        type: vendorData.type || '',
        address: vendorData.address || ''
      });
    }
  }, [isEdit, vendorData]);

  // Check login status and fetch token
  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setToken(parsedData.jwtToken);
        setOrgId(parsedData.memberFormBean.organizationId);
        setAddedBy(parsedData.memberFormBean.autoId || 'IqHniRdscrD'); // Fallback to default if not available
      }
    } catch (err) {
      console.error("Error checking login status:", err);
    }
  };

  // Fetch vendor types from API
  const fetchVendorTypes = async () => {
    if (!token || !orgId) return;
    try {
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/vendor-type', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Menu-Id': '8OMNBJc0dAp',
        },
      });
      const data = await response.json();
      if (data.vendorTypeFormBeans) {
        setVendorTypes(data.vendorTypeFormBeans);
      } else {
        console.error('Failed to fetch vendor types:', data);
        Alert.alert('Error', 'Failed to fetch vendor types');
      }
    } catch (error) {
      console.error('Error fetching vendor types:', error);
      Alert.alert('Error', 'Error fetching vendor types');
    }
  };

  // Fetch document types from API
  const fetchDocumentTypes = async () => {
    if (!token || !orgId) return;
    try {
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/vendor-document', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Menu-Id': '8OMNBJc0dAp',
        },
      });
      const data = await response.json();
      if (data.vendorDocumentFormBeans) {
        setDocumentTypes(data.vendorDocumentFormBeans);
      } else {
        console.error('Failed to fetch document types:', data);
        Alert.alert('Error', 'Failed to fetch document types');
      }
    } catch (error) {
      console.error('Error fetching document types:', error);
      Alert.alert('Error', 'Error fetching document types');
    }
  };

  // Run on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Fetch data when token and orgId are available
  useEffect(() => {
    if (token && orgId) {
      fetchVendorTypes();
      fetchDocumentTypes();
      setLoading(false);
    }
  }, [token, orgId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleVendorTypeSelect = (type) => {
    handleInputChange('type', type.autoId);
    setShowVendorTypeModal(false);
  };

  const handleDocumentTypeSelect = (type) => {
    setShowDocumentTypeModal(false);
    // Implement document type selection logic if needed
    Alert.alert('Document Type Selected', type.name);
  };

  const handleSubmit = async () => {
    // Validate required fields
    const requiredFields = ['name', 'mobileNo', 'taxNo', 'gstinNo', 'vendorCode', 'type', 'address'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const body = {
        vendorFormBean: {
          ...(isEdit && { autoId: formData.autoId }),
          name: formData.name,
          email: formData.email,
          mobileNo: formData.mobileNo,
          address: formData.address,
          taxNo: formData.taxNo,
          gstinNo: formData.gstinNo,
          addedBy: addedBy,
          vendorCode: formData.vendorCode,
          type: formData.type,
          orgId: orgId
        }
      };

      const response = await fetch('https://api-v2-skystruct.prudenttec.com/vendor', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Menu-Id': '8OMNBJc0dAp',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert(
          'Success', 
          isEdit ? 'Vendor updated successfully!' : 'Vendor added successfully!',
          [{ text: 'OK', onPress: () => navigation.goBack() }]
        );
      } else {
        console.error('Failed to save vendor:', data);
        Alert.alert('Error', 'Failed to save vendor');
      }
    } catch (error) {
      console.error('Error saving vendor:', error);
      Alert.alert('Error', 'Error saving vendor');
    }
  };

  const handleCommentSubmit = async (commentType, comment) => {
    // Note: Assuming comments are handled via the same vendor API or a separate endpoint
    // This is a placeholder for comment submission logic
    try {
      const body = {
        vendorFormBean: {
          ...(isEdit && { autoId: formData.autoId }),
          [commentType === 'PO' ? 'poComments' : 'vendorComments']: comment,
          orgId: orgId
        }
      };

      const response = await fetch('https://api-v2-skystruct.prudenttec.com/vendor', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Menu-Id': '8OMNBJc0dAp',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.status) {
        Alert.alert('Success', `${commentType} Comment saved successfully!`);
        if (commentType === 'PO') setPoComments('');
        else setVendorComments('');
      } else {
        console.error(`Failed to save ${commentType} comment:`, data);
        Alert.alert('Error', `Failed to save ${commentType} comment`);
      }
    } catch (error) {
      console.error(`Error saving ${commentType} comment:`, error);
      Alert.alert('Error', `Error saving ${commentType} comment`);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const renderTabButton = (title) => (
    <TouchableOpacity
      key={title}
      style={{
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderBottomWidth: 2,
        borderBottomColor: activeTab === title ? colors.info : 'transparent'
      }}
      onPress={() => setActiveTab(title)}
    >
      <Text style={{
        fontSize: 14,
        fontWeight: activeTab === title ? '600' : '400',
        color: activeTab === title ? colors.info : colors.textMuted
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderInputField = (label, field, placeholder, icon, isRequired = false, multiline = false) => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{
        fontSize: 14,
        fontWeight: '500',
        color: colors.text,
        marginBottom: 8
      }}>
        {label} {isRequired && <Text style={{ color: colors.danger }}>*</Text>}
      </Text>
      <View style={{
        flexDirection: 'row',
        alignItems: multiline ? 'flex-start' : 'center',
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: 8,
        backgroundColor: colors.surface,
        paddingHorizontal: 12,
        paddingVertical: 10
      }}>
        <TextInput
          style={{
            flex: 1,
            fontSize: 14,
            color: colors.text,
            minHeight: multiline ? 80 : 'auto',
            textAlignVertical: multiline ? 'top' : 'center'
          }}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}
          value={formData[field]}
          onChangeText={(value) => handleInputChange(field, value)}
          multiline={multiline}
        />
        {icon && (
          <Icon 
            name={icon} 
            size={20} 
            color={colors.textMuted} 
            style={{ marginLeft: 8 }} 
          />
        )}
      </View>
    </View>
  );

  const renderVendorTypeField = () => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{
        fontSize: 14,
        fontWeight: '500',
        color: colors.text,
        marginBottom: 8
      }}>
        Vendor Type <Text style={{ color: colors.danger }}>*</Text>
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          backgroundColor: colors.surface,
          paddingHorizontal: 12,
          paddingVertical: 12
        }}
        onPress={() => setShowVendorTypeModal(true)}
      >
        <Text style={{
          fontSize: 14,
          color: formData.type ? colors.text : colors.textMuted
        }}>
          {vendorTypes.find(vt => vt.autoId === formData.type)?.name || 'Select Vendor Type'}
        </Text>
        <Icon name="chevron-down" size={20} color={colors.textMuted} />
      </TouchableOpacity>
    </View>
  );

  const renderDocumentTypeField = () => (
    <View style={{ marginBottom: 20 }}>
      <Text style={{
        fontSize: 14,
        fontWeight: '500',
        color: colors.text,
        marginBottom: 8
      }}>
        Document Type <Text style={{ color: colors.danger }}>*</Text>
      </Text>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 8,
          backgroundColor: colors.surface,
          paddingHorizontal: 12,
          paddingVertical: 12
        }}
        onPress={() => setShowDocumentTypeModal(true)}
      >
        <Text style={{
          fontSize: 14,
          color: colors.textMuted
        }}>
          Select Document Type
        </Text>
        <Icon name="file-document-outline" size={20} color={colors.textMuted} />
      </TouchableOpacity>
    </View>
  );

  return (
    <MainLayout title={isEdit ? "Edit Vendor" : "Add Vendor"}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
        <LinearGradient 
          colors={['#4A90E2', '#357ABD']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ 
            paddingHorizontal: 16, 
            paddingVertical: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '700', 
              color: '#FFFFFF',
              marginBottom: 4
            }}>
              Vendor Details
            </Text>
          </View>
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={handleCancel}
          >
            <Icon name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>

        {/* Tabs */}
        <View style={{
          flexDirection: 'row',
          backgroundColor: colors.surface,
          borderBottomWidth: 1,
          borderBottomColor: colors.border
        }}>
          {renderTabButton('Vendor Details')}
          {renderTabButton('Vendor Document')}
          {renderTabButton('Notes')}
        </View>

        <ScrollView style={{ flex: 1, padding: 16 }}>
          {loading ? (
            <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: colors.textMuted }}>Loading...</Text>
            </View>
          ) : (
            <>
              {activeTab === 'Vendor Details' && (
                <View>
                  {/* Row 1: Name and Email */}
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <View style={{ flex: 1 }}>
                      {renderInputField('Name', 'name', 'Enter vendor name', 'account', true)}
                    </View>
                    <View style={{ flex: 1 }}>
                      {renderInputField('Email Address', 'email', 'Enter email address', 'email')}
                    </View>
                  </View>

                  {/* Row 2: Phone and Tax No */}
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <View style={{ flex: 1 }}>
                      {renderInputField('Phone', 'mobileNo', 'Enter phone number', 'phone', true)}
                    </View>
                    <View style={{ flex: 1 }}>
                      {renderInputField('Tax No.', 'taxNo', 'Enter tax number', 'receipt', true)}
                    </View>
                  </View>

                  {/* Row 3: GSTIN No and Vendor Code */}
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <View style={{ flex: 1 }}>
                      {renderInputField('GSTIN No.', 'gstinNo', 'Enter GSTIN number', 'file-document', true)}
                    </View>
                    <View style={{ flex: 1 }}>
                      {renderInputField('Vendor Code', 'vendorCode', 'Enter vendor code', 'barcode', true)}
                    </View>
                  </View>

                  {/* Vendor Type Dropdown */}
                  {renderVendorTypeField()}

                  {/* Address */}
                  {renderInputField('Address', 'address', 'Enter complete address', 'map-marker', true, true)}
                </View>
              )}

              {activeTab === 'Vendor Document' && (
                <View>
                  {/* Document Type Dropdown */}
                  {renderDocumentTypeField()}

                  {/* Add Files Section */}
                  <View style={{ marginBottom: 20 }}>
                    <View style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 12
                    }}>
                      <Text style={{
                        fontSize: 14,
                        fontWeight: '500',
                        color: colors.info
                      }}>
                        Add Files
                      </Text>
                      <TouchableOpacity
                        onPress={() => Alert.alert('Remove', 'File removal functionality')}
                      >
                        <Icon name="close" size={20} color={colors.danger} />
                      </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                      style={{
                        borderWidth: 2,
                        borderColor: colors.border,
                        borderStyle: 'dashed',
                        borderRadius: 8,
                        padding: 40,
                        alignItems: 'center',
                        backgroundColor: colors.surfaceVariant
                      }}
                      onPress={() => Alert.alert('File Upload', 'File upload functionality will be implemented')}
                    >
                      <Icon name="plus" size={32} color={colors.warning} />
                      <Text style={{
                        fontSize: 14,
                        color: colors.textMuted,
                        marginTop: 8
                      }}>
                        Click to add files or drag and drop
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {activeTab === 'Notes' && (
                <View>
                  {/* PO Comments */}
                  <View style={{ marginBottom: 30 }}>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: colors.text,
                      marginBottom: 8
                    }}>
                      Po Comments
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: 8,
                        backgroundColor: colors.surface,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        height: 120,
                        textAlignVertical: 'top',
                        fontSize: 14,
                        color: colors.text
                      }}
                      placeholder="Po Comments"
                      placeholderTextColor={colors.textMuted}
                      multiline={true}
                      value={poComments}
                      onChangeText={setPoComments}
                    />
                    <View style={{
                      alignItems: 'flex-end',
                      marginTop: 12
                    }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.info,
                          paddingHorizontal: 20,
                          paddingVertical: 8,
                          borderRadius: 6
                        }}
                        onPress={() => handleCommentSubmit('PO', poComments)}
                      >
                        <Text style={{
                          color: '#FFFFFF',
                          fontWeight: '600',
                          fontSize: 14
                        }}>
                          Submit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Vendor Comments */}
                  <View>
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '500',
                      color: colors.text,
                      marginBottom: 8
                    }}>
                      Vendor Comments
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 1,
                        borderColor: colors.border,
                        borderRadius: 8,
                        backgroundColor: colors.surface,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        height: 120,
                        textAlignVertical: 'top',
                        fontSize: 14,
                        color: colors.text
                      }}
                      placeholder="Vendor Comments"
                      placeholderTextColor={colors.textMuted}
                      multiline={true}
                      value={vendorComments}
                      onChangeText={setVendorComments}
                    />
                    <View style={{
                      alignItems: 'flex-end',
                      marginTop: 12
                    }}>
                      <TouchableOpacity
                        style={{
                          backgroundColor: colors.info,
                          paddingHorizontal: 20,
                          paddingVertical: 8,
                          borderRadius: 6
                        }}
                        onPress={() => handleCommentSubmit('Vendor', vendorComments)}
                      >
                        <Text style={{
                          color: '#FFFFFF',
                          fontWeight: '600',
                          fontSize: 14
                        }}>
                          Submit
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </>
          )}
        </ScrollView>

        {/* Footer Buttons */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          gap: 12,
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          backgroundColor: colors.surface
        }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.surface,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8,
              borderWidth: 1,
              borderColor: colors.border
            }}
            onPress={handleCancel}
          >
            <Text style={{ 
              color: colors.textSecondary, 
              fontWeight: '600',
              fontSize: 14
            }}>
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              backgroundColor: colors.info,
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 8
            }}
            onPress={handleSubmit}
          >
            <Text style={{ 
              color: '#FFFFFF', 
              fontWeight: '600',
              fontSize: 14
            }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>

        {/* Vendor Type Modal */}
        <Modal
          visible={showVendorTypeModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowVendorTypeModal(false)}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 20,
              width: '90%',
              maxHeight: '70%'
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20
              }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.text
                }}>
                  Select Vendor Type
                </Text>
                <TouchableOpacity onPress={() => setShowVendorTypeModal(false)}>
                  <Icon name="close" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <ScrollView>
                {vendorTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: 16,
                      paddingHorizontal: 12,
                      borderBottomWidth: index < vendorTypes.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border + '30'
                    }}
                    onPress={() => handleVendorTypeSelect(type)}
                  >
                    <Text style={{
                      fontSize: 14,
                      color: colors.text,
                      fontWeight: formData.type === type.autoId ? '600' : '400'
                    }}>
                      {type.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Document Type Modal */}
        <Modal
          visible={showDocumentTypeModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowDocumentTypeModal(false)}
        >
          <View style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              backgroundColor: colors.surface,
              borderRadius: 12,
              padding: 20,
              width: '90%',
              maxHeight: '70%'
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20
              }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: colors.text
                }}>
                  Select Document Type
                </Text>
                <TouchableOpacity onPress={() => setShowDocumentTypeModal(false)}>
                  <Icon name="close" size={24} color={colors.textMuted} />
                </TouchableOpacity>
              </View>

              <ScrollView>
                {documentTypes.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      paddingVertical: 16,
                      paddingHorizontal: 12,
                      borderBottomWidth: index < documentTypes.length - 1 ? 1 : 0,
                      borderBottomColor: colors.border + '30'
                    }}
                    onPress={() => handleDocumentTypeSelect(type)}
                  >
                    <Text style={{
                      fontSize: 14,
                      color: colors.text,
                      fontWeight: '400'
                    }}>
                      {type.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout>
  );
}