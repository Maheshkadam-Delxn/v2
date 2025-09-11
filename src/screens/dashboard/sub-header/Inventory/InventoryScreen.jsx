import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  ActivityIndicator,
  TextInput,
  Modal,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeOut, 
  FadeInUp
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const cardWidth = Math.min(screenWidth - 32, 600);

// Tabs
const tabs = [
  { key: 'materialStock', label: 'Material Stock' },
  { key: 'unit', label: 'Unit' },
  { key: 'material', label: 'Material' },
];

// Sample Material Stock data based on the image content
const materialStockData = [
  {
    id: '1',
    name: 'Metal 2',
    materialCode: 'MAT-00006',
    quantity: '900.0',
    unit: 'Kg',
    category: 'General',
    leadTime: '5',
    hasImage: false
  },
  {
    id: '2',
    name: 'Leveling Material',
    materialCode: 'MAT-00005',
    quantity: '25500.0',
    unit: 'Ton',
    category: 'General',
    leadTime: '22',
    hasImage: false
  },
  {
    id: '3',
    name: 'Steel Frames',
    materialCode: 'MAT-00004',
    quantity: '1345.0',
    unit: 'Nos',
    category: 'General',
    leadTime: null,
    hasImage: true,
    imageUrl: 'https://example.com/steel-frames.jpg'
  }
];

// Initial Unit data
let initialUnitData = [
  { id: '1', title: 'Kg', type: 'Material', status: 'Active' },
  { id: '2', title: 'Nos', type: 'Material', status: 'Active' },
  { id: '3', title: 'Ton', type: 'Material', status: 'Active' },
];

// Initial Material data
let initialMaterialData = [
  { 
    id: '1', 
    title: 'Cement', 
    materialId: 'MAT-00001', 
    unit: 'Kg', 
    cost: '355',
    hsnCode: '123'
  },
  { 
    id: '2', 
    title: 'Bricks', 
    materialId: 'MAT-00002', 
    unit: 'Nos', 
    cost: '321',
    hsnCode: '321'
  },
];

// Image Preview Modal Component
const ImagePreviewModal = ({ visible, imageUrl, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity 
        style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.7)', 
          justifyContent: 'center', 
          alignItems: 'center' 
        }}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={{ width: '90%', height: '70%', justifyContent: 'center', alignItems: 'center' }}>
          <Animated.View entering={FadeInUp} style={{ 
            width: '100%', 
            height: '100%', 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: 12, 
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <TouchableOpacity 
              style={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                zIndex: 10,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: 20,
                padding: 4
              }}
              onPress={onClose}
            >
              <Icon name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <Image 
              source={{ uri: imageUrl }} 
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

// Add Form Modal Component
const AddFormModal = ({ 
  visible, 
  onClose, 
  onAdd, 
  type,
  initialData = null 
}) => {
  const isEdit = initialData !== null;
  const [formData, setFormData] = useState(
    isEdit ? initialData : type === 'unit' 
      ? { title: '', type: 'Material', status: 'Active' }
      : { title: '', materialId: '', unit: '', cost: '', hsnCode: '' }
  );

  const handleSubmit = () => {
    if (isEdit) {
      // Update existing item
      onAdd({ ...formData, id: initialData.id });
    } else {
      // Add new item
      onAdd({ ...formData, id: Date.now().toString() });
    }
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={{ 
          flex: 1, 
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          justifyContent: 'flex-end' 
        }}>
          <Animated.View 
            entering={FadeInUp.duration(500)}
            style={{ 
              backgroundColor: '#ffffff', 
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
              maxHeight: '80%'
            }}
          >
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 20
            }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '700', 
                color: '#1e40af' 
              }}>
                {isEdit ? 'Edit' : 'Add New'} {type}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              {type === 'unit' ? (
                <>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: '600', 
                      color: '#374151',
                      marginBottom: 8
                    }}>
                      Title
                    </Text>
                    <TextInput
                      value={formData.title}
                      onChangeText={(text) => setFormData({...formData, title: text})}
                      placeholder="Enter unit title"
                      style={{ 
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 16
                      }}
                    />
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: '600', 
                      color: '#374151',
                      marginBottom: 8
                    }}>
                      Type
                    </Text>
                    <View style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 8,
                      padding: 12,
                      backgroundColor: '#f9fafb'
                    }}>
                      <Text style={{ fontSize: 16, color: '#374151' }}>
                        {formData.type}
                      </Text>
                    </View>
                  </View>

                  <View style={{ marginBottom: 24 }}>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: '600', 
                      color: '#374151',
                      marginBottom: 8
                    }}>
                      Status
                    </Text>
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                      <TouchableOpacity
                        style={{ 
                          flexDirection: 'row', 
                          alignItems: 'center',
                          padding: 8,
                          borderRadius: 8,
                          backgroundColor: formData.status === 'Active' ? '#dbeafe' : 'transparent'
                        }}
                        onPress={() => setFormData({...formData, status: 'Active'})}
                      >
                        <View style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: formData.status === 'Active' ? '#3b82f6' : '#d1d5db',
                          marginRight: 8
                        }} />
                        <Text>Active</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{ 
                          flexDirection: 'row', 
                          alignItems: 'center',
                          padding: 8,
                          borderRadius: 8,
                          backgroundColor: formData.status === 'Inactive' ? '#dbeafe' : 'transparent'
                        }}
                        onPress={() => setFormData({...formData, status: 'Inactive'})}
                      >
                        <View style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: formData.status === 'Inactive' ? '#3b82f6' : '#d1d5db',
                          marginRight: 8
                        }} />
                        <Text>Inactive</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: '600', 
                      color: '#374151',
                      marginBottom: 8
                    }}>
                      Title
                    </Text>
                    <TextInput
                      value={formData.title}
                      onChangeText={(text) => setFormData({...formData, title: text})}
                      placeholder="Enter material title"
                      style={{ 
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 16
                      }}
                    />
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: '600', 
                      color: '#374151',
                      marginBottom: 8
                    }}>
                      Material ID
                    </Text>
                    <TextInput
                      value={formData.materialId}
                      onChangeText={(text) => setFormData({...formData, materialId: text})}
                      placeholder="Enter material ID"
                      style={{ 
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 16
                      }}
                    />
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: '600', 
                      color: '#374151',
                      marginBottom: 8
                    }}>
                      Unit
                    </Text>
                    <TextInput
                      value={formData.unit}
                      onChangeText={(text) => setFormData({...formData, unit: text})}
                      placeholder="Enter unit"
                      style={{ 
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 16
                      }}
                    />
                  </View>

                  <View style={{ marginBottom: 16 }}>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: '600', 
                      color: '#374151',
                      marginBottom: 8
                    }}>
                      Cost
                    </Text>
                    <TextInput
                      value={formData.cost}
                      onChangeText={(text) => setFormData({...formData, cost: text})}
                      placeholder="Enter cost"
                      keyboardType="numeric"
                      style={{ 
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 16
                      }}
                    />
                  </View>

                  <View style={{ marginBottom: 24 }}>
                    <Text style={{ 
                      fontSize: 14, 
                      fontWeight: '600', 
                      color: '#374151',
                      marginBottom: 8
                    }}>
                      HSN Code
                    </Text>
                    <TextInput
                      value={formData.hsnCode}
                      onChangeText={(text) => setFormData({...formData, hsnCode: text})}
                      placeholder="Enter HSN code"
                      style={{ 
                        borderWidth: 1,
                        borderColor: '#d1d5db',
                        borderRadius: 8,
                        padding: 12,
                        fontSize: 16
                      }}
                    />
                  </View>
                </>
              )}

              <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
                <TouchableOpacity
                  style={{ 
                    flex: 1, 
                    backgroundColor: '#e5e7eb', 
                    padding: 16,
                    borderRadius: 12,
                    alignItems: 'center'
                  }}
                  onPress={onClose}
                >
                  <Text style={{ fontWeight: '600', color: '#374151' }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ 
                    flex: 1, 
                    backgroundColor: '#3b82f6', 
                    padding: 16,
                    borderRadius: 12,
                    alignItems: 'center'
                  }}
                  onPress={handleSubmit}
                >
                  <Text style={{ fontWeight: '600', color: '#ffffff' }}>
                    {isEdit ? 'Update' : 'Add'}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

// Material Stock Card Component
const MaterialStockCard = ({ item }) => {
  const [showImageModal, setShowImageModal] = useState(false);

  return (
    <>
      <Animated.View entering={FadeInDown.duration(500)}>
        <View style={{
          borderRadius: 20,
          backgroundColor: '#ffffff',
          marginBottom: 16,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 4,
        }}>
          {/* Header - Applying light blue theme here */}
          <LinearGradient 
            colors={['#dbeafe', '#bfdbfe']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 20 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: '700', 
                  color: '#1e40af',
                  marginBottom: 4
                }}>
                  {item.name}
                </Text>
                {item.leadTime && (
                  <Text style={{ 
                    fontSize: 13, 
                    color: '#3b82f6',
                    marginBottom: 8
                  }}>
                    Lead Time: {item.leadTime} days
                  </Text>
                )}
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ padding: 8, marginLeft: 8 }}>
                  <Icon name="pencil-outline" size={20} color="#1e40af" />
                </TouchableOpacity>
                <TouchableOpacity style={{ padding: 8, marginLeft: 8 }}>
                  <Icon name="history" size={20} color="#1e40af" />
                </TouchableOpacity>
                {item.hasImage && (
                  <TouchableOpacity 
                    style={{ padding: 8, marginLeft: 8 }}
                    onPress={() => setShowImageModal(true)}
                  >
                    <Icon name="eye-outline" size={20} color="#1e40af" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </LinearGradient>

          {/* Content */}
          <View style={{ padding: 16, backgroundColor: '#f8fafc' }}>
            <View style={{ 
              backgroundColor: '#ffffff', 
              borderRadius: 12, 
              padding: 16,
              marginBottom: 12
            }}>
              <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Material Code</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.materialCode}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Quantity</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.quantity} ({item.unit})</Text>
                </View>
              </View>
              
              <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Category</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.category}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>File</Text>
                  {item.hasImage ? (
                    <TouchableOpacity 
                      style={{ 
                        width: 60, 
                        height: 60, 
                        borderRadius: 8, 
                        overflow: 'hidden',
                        backgroundColor: '#f3f4f6'
                      }}
                      onPress={() => setShowImageModal(true)}
                    >
                      <Image 
                        source={{ uri: item.imageUrl }} 
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  ) : (
                    <Text style={{ 
                      fontSize: 14, 
                      fontStyle: 'italic', 
                      color: '#9ca3af' 
                    }}>
                      No file attached
                    </Text>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Image Preview Modal */}
      {item.hasImage && (
        <ImagePreviewModal
          visible={showImageModal}
          imageUrl={item.imageUrl}
          onClose={() => setShowImageModal(false)}
        />
      )}
    </>
  );
};

// Updated Unit Card Component with same color scheme
const UnitCard = ({ item, onEdit, onDelete }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <View style={{
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}>
        {/* Header - Using same blue gradient as Material Stock */}
        <LinearGradient 
          colors={['#dbeafe', '#bfdbfe']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 20 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '700', 
                color: '#1e40af',
                marginBottom: 4
              }}>
                {item.title}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity 
                style={{ padding: 8, marginLeft: 8 }}
                onPress={() => onEdit(item)}
              >
                <Icon name="pencil-outline" size={20} color="#1e40af" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={{ padding: 8, marginLeft: 8 }}
                onPress={() => onDelete(item.id)}
              >
                <Icon name="delete-outline" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={{ padding: 16, backgroundColor: '#f8fafc' }}>
          <View style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: 12, 
            padding: 16,
          }}>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Type</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.type}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Status</Text>
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  backgroundColor: item.status === 'Active' ? '#dcfce7' : '#fef3c7',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  alignSelf: 'flex-start'
                }}>
                  <View style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: item.status === 'Active' ? '#22c55e' : '#f59e0b',
                    marginRight: 4
                  }} />
                  <Text style={{ 
                    fontSize: 12, 
                    fontWeight: '600', 
                    color: item.status === 'Active' ? '#166534' : '#92400e'
                  }}>
                    {item.status}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

// Updated Material Card Component with same color scheme
const MaterialCard = ({ item, onEdit, onDelete }) => {
  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <View style={{
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}>
        {/* Header - Using same blue gradient as Material Stock */}
        <LinearGradient 
          colors={['#dbeafe', '#bfdbfe']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 20 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '700', 
                color: '#1e40af',
                marginBottom: 4
              }}>
                {item.title}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity 
                style={{ padding: 8, marginLeft: 8 }}
                onPress={() => onEdit(item)}
              >
                <Icon name="pencil-outline" size={20} color="#1e40af" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={{ padding: 8, marginLeft: 8 }}
                onPress={() => onDelete(item.id)}
              >
                <Icon name="delete-outline" size={20} color="#ef4444" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={{ padding: 16, backgroundColor: '#f8fafc' }}>
          <View style={{ 
            backgroundColor: '#ffffff', 
            borderRadius: 12, 
            padding: 16,
          }}>
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Material ID</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.materialId}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Unit</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.unit}</Text>
              </View>
            </View>
            
            <View style={{ flexDirection: 'row', marginBottom: 12 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Cost</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.cost}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>HSN Code</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.hsnCode}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

// Empty State Component
const EmptyState = ({ searchQuery, tabName }) => (
  <Animated.View 
    entering={FadeInUp}
    style={{ 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 40,
      backgroundColor: '#ffffff',
      borderRadius: 24,
      margin: 16
    }}
  >
    <Icon name="package-variant" size={64} color="#d1d5db" />
    <Text style={{ 
      fontSize: 18, 
      fontWeight: '600', 
      color: '#6b7280',
      marginTop: 16
    }}>
      No {tabName.toLowerCase()} found
    </Text>
    <Text style={{ 
      fontSize: 14, 
      color: '#9ca3af',
      marginTop: 8,
      textAlign: 'center'
    }}>
      {searchQuery ? 
        'Try adjusting your search terms' : 
        `No ${tabName.toLowerCase()} available`
      }
    </Text>
  </Animated.View>
);

// Main Inventory Screen Component
const InventoryScreen = () => {
  const [activeTab, setActiveTab] = useState('materialStock');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [unitData, setUnitData] = useState(initialUnitData);
  const [materialData, setMaterialData] = useState(initialMaterialData);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const handleAddUnit = (unit) => {
    if (editingItem) {
      // Update existing unit
      setUnitData(prev => prev.map(item => 
        item.id === unit.id ? unit : item
      ));
      setEditingItem(null);
    } else {
      // Add new unit
      setUnitData(prev => [...prev, unit]);
    }
    setShowAddForm(false);
  };

  const handleAddMaterial = (material) => {
    if (editingItem) {
      // Update existing material
      setMaterialData(prev => prev.map(item => 
        item.id === material.id ? material : item
      ));
      setEditingItem(null);
    } else {
      // Add new material
      setMaterialData(prev => [...prev, material]);
    }
    setShowAddForm(false);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowAddForm(true);
  };

  const handleDeleteItem = (id) => {
    if (activeTab === 'unit') {
      setUnitData(prev => prev.filter(item => item.id !== id));
    } else if (activeTab === 'material') {
      setMaterialData(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setEditingItem(null);
  };

  const filteredMaterialStockList = useMemo(() => {
    let result = [...materialStockData];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materialCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [searchQuery]);

  const filteredUnitList = useMemo(() => {
    let result = [...unitData];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [searchQuery, unitData]);

  const filteredMaterialList = useMemo(() => {
    let result = [...materialData];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.materialId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.hsnCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return result;
  }, [searchQuery, materialData]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
          <View style={{ 
            backgroundColor: '#ffffff', 
            padding: 32, 
            borderRadius: 24,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4
          }}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={{ 
              marginTop: 16, 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#374151' 
            }}>
              Loading {tabs.find(tab => tab.key === activeTab)?.label.toLowerCase()}...
            </Text>
          </View>
        </View>
      );
    }

    switch(activeTab) {
      case 'materialStock':
        return (
          <ScrollView 
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {filteredMaterialStockList.length > 0 ? (
              filteredMaterialStockList.map((item) => (
                <MaterialStockCard
                  key={item.id}
                  item={item}
                />
              ))
            ) : (
              <EmptyState 
                searchQuery={searchQuery} 
                tabName={tabs.find(tab => tab.key === activeTab)?.label || 'items'} 
              />
            )}
          </ScrollView>
        );
      
      case 'unit':
        return (
          <ScrollView 
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {filteredUnitList.length > 0 ? (
              filteredUnitList.map((item) => (
                <UnitCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              ))
            ) : (
              <EmptyState 
                searchQuery={searchQuery} 
                tabName={tabs.find(tab => tab.key === activeTab)?.label || 'items'} 
              />
            )}
          </ScrollView>
        );
      
      case 'material':
        return (
          <ScrollView 
            contentContainerStyle={{ padding: 16 }}
            showsVerticalScrollIndicator={false}
          >
            {filteredMaterialList.length > 0 ? (
              filteredMaterialList.map((item) => (
                <MaterialCard
                  key={item.id}
                  item={item}
                  onEdit={handleEditItem}
                  onDelete={handleDeleteItem}
                />
              ))
            ) : (
              <EmptyState 
                searchQuery={searchQuery} 
                tabName={tabs.find(tab => tab.key === activeTab)?.label || 'items'} 
              />
            )}
          </ScrollView>
        );
      
      default:
        return null;
    }
  };

  return (
    <MainLayout title="Inventory">
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>

        {/* Header - Matching the Work Order Screen header */}
        <View style={{ backgroundColor: '#dbeafe', padding: 16 }}>
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
                color: '#1e40af' 
              }}>
                {tabs.find(tab => tab.key === activeTab)?.label}
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {activeTab === 'materialStock' && `${filteredMaterialStockList.length} materials`}
                {activeTab === 'unit' && `${filteredUnitList.length} units`}
                {activeTab === 'material' && `${filteredMaterialList.length} materials`}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: 12 
                }}
                onPress={handleRefresh}
              >
                <Icon name="refresh" size={18} color="#1e40af" />
              </TouchableOpacity>
              {(activeTab === 'unit' || activeTab === 'material') && (
                <TouchableOpacity
                  style={{ 
                    padding: 10, 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                    borderRadius: 12 
                  }}
                  onPress={() => setShowAddForm(true)}
                >
                  <Icon name="plus" size={18} color="#1e40af"
                                    />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Search Bar */}
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 12,
            paddingHorizontal: 12,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Icon name="magnify" size={20} color="#6b7280" />
            <TextInput
              placeholder={`Search ${tabs.find(tab => tab.key === activeTab)?.label.toLowerCase()}...`}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                padding: 12,
                fontSize: 16,
                color: '#374151'
              }}
              placeholderTextColor="#9ca3af"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle-outline" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Tabs */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          borderBottomWidth: 1, 
          borderBottomColor: '#e5e7eb', 
          backgroundColor: '#ffffff',
          paddingHorizontal: 16
        }}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={{ 
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderBottomWidth: activeTab === tab.key ? 2 : 0,
                borderBottomColor: activeTab === tab.key ? '#3b82f6' : 'transparent'
              }}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: activeTab === tab.key ? '600' : '400',
                color: activeTab === tab.key ? '#3b82f6' : '#6b7280'
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {renderContent()}

        {/* Add/Edit Form Modal */}
        <AddFormModal
          visible={showAddForm}
          onClose={handleCloseForm}
          onAdd={activeTab === 'unit' ? handleAddUnit : handleAddMaterial}
          type={activeTab}
          initialData={editingItem}
        />
      </View>
    </MainLayout>
  );
};

export default InventoryScreen;