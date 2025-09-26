import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput,
  Alert 
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

export default function AddDocumentType({ navigation }) {
  const [newDocumentType, setNewDocumentType] = useState('');
  const [documentTypes, setDocumentTypes] = useState([]);
  const [token, setToken] = useState('');
  const [orgId, setOrgId] = useState('');
  const [loading, setLoading] = useState(true);

  // Check login status and fetch token
  const checkLoginStatus = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setToken(parsedData.jwtToken);
        setOrgId(parsedData.memberFormBean.organizationId);
      }
    } catch (err) {
      console.error("Error checking login status:", err);
    }
  };

  // Fetch document types from API
  const fetchDocumentTypes = async () => {
    if (!token || !orgId) return;
    try {
      setLoading(true);
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/vendor-document', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Menu-Id': 'Kb51jEhFhhV',
        },
      });
      const data = await response.json();
      if (data.vendorDocumentFormBeans) {
        setDocumentTypes(data.vendorDocumentFormBeans.map(doc => ({
          id: doc.autoId,
          name: doc.name
        })));
      } else {
        console.error('Failed to fetch document types:', data);
        Alert.alert('Error', 'Failed to fetch document types');
      }
    } catch (error) {
      console.error('Error fetching document types:', error);
      Alert.alert('Error', 'Error fetching document types');
    } finally {
      setLoading(false);
    }
  };

  // Save document type (add or edit)
  const saveDocumentType = async () => {
    if (!newDocumentType.trim() || !token || !orgId) {
      Alert.alert('Error', 'Please enter a document type name');
      return;
    }
    try {
      const body = {
        vendorDocumentFormBean: {
          name: newDocumentType.trim(),
          orgId: orgId
        }
      };
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/vendor-document', {
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
        setNewDocumentType('');
        fetchDocumentTypes();
        Alert.alert('Success', 'Document type added successfully!');
      } else {
        console.error('Failed to save document type:', data);
        Alert.alert('Error', 'Failed to add document type');
      }
    } catch (error) {
      console.error('Error saving document type:', error);
      Alert.alert('Error', 'Error adding document type');
    }
  };

  // Edit document type
  const handleEdit = (index, currentType) => {
    Alert.prompt(
      'Edit Document Type',
      'Enter new name:',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Save', 
          onPress: async (newName) => {
            if (newName && newName.trim()) {
              try {
                const body = {
                  vendorDocumentFormBean: {
                    autoId: documentTypes[index].id,
                    name: newName.trim(),
                    orgId: orgId
                  }
                };
                const response = await fetch('https://api-v2-skystruct.prudenttec.com/vendor-document', {
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
                  fetchDocumentTypes();
                  Alert.alert('Success', 'Document type updated successfully!');
                } else {
                  console.error('Failed to update document type:', data);
                  Alert.alert('Error', 'Failed to update document type');
                }
              } catch (error) {
                console.error('Error updating document type:', error);
                Alert.alert('Error', 'Error updating document type');
              }
            }
          }
        }
      ],
      'plain-text',
      currentType.name
    );
  };

  // Delete document type
  const handleDelete = (index) => {
    Alert.alert(
      'Delete Document Type',
      'Are you sure you want to delete this document type?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              const response = await fetch(`https://api-v2-skystruct.prudenttec.com/vendor-document/${documentTypes[index].id}`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                  'X-Menu-Id': '8OMNBJc0dAp',
                },
              });
              if (response.ok) {
                fetchDocumentTypes();
                Alert.alert('Success', 'Document type deleted successfully!');
              } else {
                console.error('Failed to delete document type');
                Alert.alert('Error', 'Failed to delete document type');
              }
            } catch (error) {
              console.error('Error deleting document type:', error);
              Alert.alert('Error', 'Error deleting document type');
            }
          }
        }
      ]
    );
  };

  // Run on component mount
  useEffect(() => {
    checkLoginStatus();
  }, []);

  // Fetch document types when token and orgId are available
  useEffect(() => {
    if (token && orgId) {
      fetchDocumentTypes();
    }
  }, [token, orgId]);

  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <MainLayout title="Document Types">
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
              New Document Type
            </Text>
          </View>
          <TouchableOpacity
            style={{ padding: 8 }}
            onPress={handleCancel}
          >
            <Icon name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={{ flex: 1 }}>
          {/* Add New Document Type Section */}
          <View style={{ 
            backgroundColor: colors.surface,
            margin: 16,
            borderRadius: 12,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <View style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              gap: 12,
              marginBottom: 16
            }}>
              <TextInput
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: colors.border,
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  fontSize: 14,
                  color: colors.text,
                  backgroundColor: colors.background,
                }}
                placeholder="New Document Type"
                placeholderTextColor={colors.textMuted}
                value={newDocumentType}
                onChangeText={setNewDocumentType}
              />
              
              <TouchableOpacity
                style={{
                  backgroundColor: colors.info,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                  minWidth: 80,
                  alignItems: 'center'
                }}
                onPress={saveDocumentType}
              >
                <Text style={{ 
                  color: '#FFFFFF', 
                  fontWeight: '600',
                  fontSize: 14
                }}>
                  Submit
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  backgroundColor: colors.surface,
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: colors.border,
                  minWidth: 80,
                  alignItems: 'center'
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
            </View>
          </View>

          {/* Document Type List */}
          <View style={{ 
            backgroundColor: colors.surface,
            margin: 16,
            marginTop: 0,
            borderRadius: 12,
            padding: 20,
            borderWidth: 1,
            borderColor: colors.border,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: '600', 
              color: colors.text,
              textAlign: 'center',
              marginBottom: 20,
              paddingBottom: 12,
              borderBottomWidth: 1,
              borderBottomColor: colors.border
            }}>
              Document Type List
            </Text>

            {loading ? (
              <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: colors.textMuted }}>Loading...</Text>
              </View>
            ) : documentTypes.length === 0 ? (
              <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="file-document-outline" size={40} color={colors.textMuted} />
                <Text style={{ color: colors.textMuted, marginTop: 12 }}>No document types found</Text>
              </View>
            ) : (
              documentTypes.map((type, index) => (
                <View 
                  key={index} 
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 16,
                    borderBottomWidth: index < documentTypes.length - 1 ? 1 : 0,
                    borderBottomColor: colors.border + '30'
                  }}
                >
                  <Text style={{ 
                    fontSize: 14, 
                    color: colors.text,
                    fontWeight: '500',
                    flex: 1
                  }}>
                    {type.name}
                  </Text>

                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <TouchableOpacity 
                      style={{ 
                        padding: 8,
                        borderRadius: 6,
                        backgroundColor: `${colors.warning}15`
                      }}
                      onPress={() => handleEdit(index, type)}
                    >
                      <Icon name="pencil" size={18} color={colors.warning} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={{ 
                        padding: 8,
                        borderRadius: 6,
                        backgroundColor: `${colors.danger}15`
                      }}
                      onPress={() => handleDelete(index)}
                    >
                      <Icon name="delete" size={18} color={colors.danger} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
}