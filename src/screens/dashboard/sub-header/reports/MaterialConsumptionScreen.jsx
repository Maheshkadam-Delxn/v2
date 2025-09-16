import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  ActivityIndicator,
  TextInput,
  Modal
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeOut, 
  FadeInUp,
  SlideInRight
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const cardWidth = Math.min(screenWidth - 32, 600);

// Sample Material Consumption data based on the image content
const materialData = [
  {
    id: '1070',
    title: 'Field work',
    startDate: '2025-05-27',
    endDate: '2025-05-27',
    expectedCost: '630.00 K',
    utilizedCost: '708.00 K',
    pendingCost: '0.0',
    duration: '20',
    status: 'Over Budget',
    // New material details data
    materials: [
      {
        id: '1',
        name: 'Leveling Material',
        activityQuantity: '250.0 Ton',
        utilizedQuantity: '0.0 Ton',
        remainingQuantity: '250.0 Ton',
        expectedCost: '141.50 K',
        actualCost: '14.43 M'
      },
      {
        id: '2',
        name: 'Cement',
        activityQuantity: '1010.0 Kg',
        utilizedQuantity: '0.0 Kg',
        remainingQuantity: '1010.0 Kg',
        expectedCost: '254.52 K',
        actualCost: '2.20 M'
      }
    ]
  },
  {
    id: '1100',
    title: 'Earthwork',
    startDate: '2025-05-28',
    endDate: '2025-05-31',
    expectedCost: '396.02 K',
    utilizedCost: '465.86 K',
    pendingCost: '0.0',
    duration: '10',
    status: 'Over Budget',
    // New material details data
    materials: [
      {
        id: '1',
        name: 'Gravel',
        activityQuantity: '500.0 Ton',
        utilizedQuantity: '120.0 Ton',
        remainingQuantity: '380.0 Ton',
        expectedCost: '200.00 K',
        actualCost: '48.00 K'
      },
      {
        id: '2',
        name: 'Sand',
        activityQuantity: '800.0 Kg',
        utilizedQuantity: '300.0 Kg',
        remainingQuantity: '500.0 Kg',
        expectedCost: '160.00 K',
        actualCost: '60.00 K'
      }
    ]
  }
];

// Status Indicator Component
const StatusIndicator = ({ status }) => {
  const statusConfig = {
    'On Budget': { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
    'Over Budget': { color: '#ef4444', bg: '#fee2e2', icon: 'alert-circle' },
  };

  const statusCfg = statusConfig[status] || statusConfig['On Budget'];

  return (
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: statusCfg.bg,
      alignSelf: 'flex-start'
    }}>
      <Icon name={statusCfg.icon} size={14} color={statusCfg.color} style={{ marginRight: 4 }} />
      <Text style={{ 
      fontSize: 12, 
      fontWeight: '600', 
      color: statusCfg.color 
      }}>
        {status}
      </Text>
    </View>
  );
};

// Material Item Card Component for the modal
const MaterialItemCard = ({ material }) => {
  return (
    <View style={{
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#e5e7eb'
    }}>
      <Text style={{
        fontSize: 16,
        fontWeight: '700',
        color: '#1e40af',
        marginBottom: 12
      }}>
        {material.name}
      </Text>
      
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 14, color: '#6b7280' }}>Activity Quantity</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>{material.activityQuantity}</Text>
      </View>
      
      <View style={{ marginBottom: 8 }}>
        <Text style={{ fontSize: 14, color: '#6b7280' }}>Utilized Quantity</Text>
        <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>{material.utilizedQuantity}</Text>
      </View>
      
      <View style={{
        backgroundColor: '#f1f5f9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 12
      }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#64748b' }}>Remaining Quantity</Text>
        <Text style={{ fontSize: 16, fontWeight: '700', color: '#1e40af' }}>{material.remainingQuantity}</Text>
      </View>
      
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>Expected Cost</Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>{material.expectedCost}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, color: '#6b7280' }}>Actual Cost</Text>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>{material.actualCost}</Text>
        </View>
      </View>
    </View>
  );
};

// Material Consumption Card Component
const MaterialCard = ({ item, expanded, onToggle, onView }) => {
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
        {/* Header - Applying blue theme */}
        <TouchableOpacity onPress={onToggle}>
          <LinearGradient 
            colors={['#dbeafe', '#bfdbfe']} // Light blue gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 20 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '700', 
                  color: '#1e40af', // Dark blue for contrast
                  marginBottom: 4
                }}>
                  Activity No.: {item.id}
                </Text>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: 'bold', 
                  color: '#1e40af',
                  marginBottom: 8
                }}>
                  {item.title}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#1e40af',
                  marginBottom: 4
                }}>
                  Pending Cost: {item.pendingCost}
                </Text>
                <StatusIndicator status={item.status} />
              </View>
              <Icon 
                name={expanded ? 'chevron-up' : 'chevron-down'} 
                size={24} 
                color="#1e40af" 
                style={{ marginLeft: 12 }} 
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Expanded Content */}
        {expanded && (
          <Animated.View entering={FadeInUp} exiting={FadeOut}>
            <View style={{ padding: 16, backgroundColor: '#f8fafc' }}>
              {/* Details */}
              <View style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: 12, 
                padding: 16,
                marginBottom: 12
              }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '700', 
                  color: '#1f2937',
                  marginBottom: 12
                }}>
                  Material Consumption Details
                </Text>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Start Date</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.startDate}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>End Date</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.endDate}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Expected Cost</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.expectedCost}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Utilized Cost</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.utilizedCost}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Duration</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.duration} days</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Status</Text>
                    <StatusIndicator status={item.status} />
                  </View>
                </View>
              </View>
              
              {/* Action Button - Only View as requested */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'flex-end',
                backgroundColor: '#ffffff', 
                borderRadius: 12, 
                padding: 16
              }}>
                <TouchableOpacity 
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    padding: 8,
                    backgroundColor: '#dbeafe',
                    borderRadius: 8,
                    paddingHorizontal: 16
                  }}
                  onPress={() => onView(item)}
                >
                  <Icon name="eye-outline" size={20} color="#1e40af" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#1e40af', fontWeight: '600' }}>View Materials</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

// View Details Modal Component - Updated to show material details
const ViewDetailsModal = ({ visible, onClose, selectedItem }) => {
  if (!selectedItem) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View entering={FadeInUp} style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: 24,
          padding: 24,
          width: '90%',
          maxWidth: 500,
          maxHeight: '80%'
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '700', 
              color: '#1e40af' 
            }}>
              Material Details
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>
              Activity: {selectedItem.title} (No. {selectedItem.id})
            </Text>
          </View>
          
          {/* Search Bar */}
          <View style={{ 
            backgroundColor: '#f8fafc', 
            borderRadius: 12, 
            paddingHorizontal: 12,
            height: 40,
            justifyContent: 'center',
            marginBottom: 16
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="magnify" size={18} color="#3b82f6" style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Search materials..."
                placeholderTextColor="#6b7280"
                style={{ 
                  flex: 1, 
                  color: '#1e40af', 
                  fontSize: 14,
                  paddingVertical: 0
                }}
              />
            </View>
          </View>
          
          <Text style={{ 
            fontSize: 16, 
            fontWeight: '600', 
            color: '#374151',
            marginBottom: 12
          }}>
            Items
          </Text>
          
          <ScrollView style={{ maxHeight: 300 }}>
            {selectedItem.materials.map((material) => (
              <MaterialItemCard key={material.id} material={material} />
            ))}
          </ScrollView>
          
          <TouchableOpacity
            style={{
              backgroundColor: '#dbeafe',
              padding: 16,
              borderRadius: 16,
              alignItems: 'center',
              marginTop: 16
            }}
            onPress={onClose}
          >
            <Text style={{ 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#1e40af' 
            }}>
              Close
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Filter Modal Component
const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
  const [tempFilter, setTempFilter] = useState(currentFilter);

  const filters = ['All', 'On Budget', 'Over Budget'];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
        <Animated.View entering={FadeInUp} style={{ 
          backgroundColor: '#ffffff', 
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          padding: 24
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 24
          }}>
            <Text style={{ 
              fontSize: 20, 
              fontWeight: '700', 
              color: '#1f2937' 
            }}>
              Filter Material Consumption
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <View style={{ gap: 12 }}>
            <Text style={{ 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#374151' 
            }}>
              Status
            </Text>
            {filters.map((status) => (
              <TouchableOpacity
                key={status}
                style={{
                  padding: 16,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: (tempFilter === status || (status === 'All' && !tempFilter)) 
                    ? '#3b82f6' 
                    : '#e5e7eb',
                  backgroundColor: (tempFilter === status || (status === 'All' && !tempFilter)) 
                    ? '#eff6ff' 
                    : '#ffffff'
                }}
                onPress={() => setTempFilter(status === 'All' ? null : status)}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: (tempFilter === status || (status === 'All' && !tempFilter))
                    ? '#3b82f6'
                    : '#374151'
                }}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            gap: 12, 
            marginTop: 24 
          }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#f3f4f6',
                padding: 16,
                borderRadius: 16,
                alignItems: 'center'
              }}
              onPress={onClose}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151' 
              }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#3b82f6',
                padding: 16,
                borderRadius: 16,
                alignItems: 'center'
              }}
              onPress={() => {
                onApplyFilter(tempFilter);
                onClose();
              }}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#ffffff' 
              }}>
                Apply Filter
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Main Material Consumption Screen Component
const MaterialConsumptionScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const toggleItem = useCallback((id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const handleViewItem = useCallback((item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  }, []);

  const filteredMaterialList = useMemo(() => {
    let result = [...materialData];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus) {
      result = result.filter(item => item.status === filterStatus);
    }
    
    return result;
  }, [filterStatus, searchQuery]);

  if (isLoading) {
    return (
      <MainLayout title="Material Consumption">
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
              Loading material consumption...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Material Consumption">
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        {/* Header - Blue theme */}
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
                Material Consumption
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {filteredMaterialList.length} activities • {filterStatus || 'All statuses'}
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
            </View>
          </View>

          {/* Search and Filter Row */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
            gap: 8
          }}>
            {/* Search Bar */}
            <View style={{ 
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.8)', 
              borderRadius: 12, 
              paddingHorizontal: 12,
              height: 40,
              justifyContent: 'center'
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="magnify" size={18} color="#3b82f6" style={{ marginRight: 8 }} />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search activities, titles..."
                  placeholderTextColor="#6b7280"
                  style={{ 
                    flex: 1, 
                    color: '#1e40af', 
                    fontSize: 14,
                    paddingVertical: 0
                  }}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Icon name="close-circle" size={18} color="#6b7280" />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Filter Button */}
            <TouchableOpacity
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                paddingHorizontal: 12,
                height: 40,
                borderRadius: 12,
                minWidth: 60,
                justifyContent: 'center'
              }}
              onPress={() => setShowFilterModal(true)}
            >
              <Icon name="filter-outline" size={16} color="#1e40af" />
              {filterStatus && (
                <View style={{ 
                  marginLeft: 4, 
                  backgroundColor: '#3b82f6', 
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 8
                }}>
                  <Text style={{ 
                    fontSize: 10, 
                    color: '#ffffff',
                    fontWeight: '600'
                  }}>
                    {filterStatus}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Material Consumption List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredMaterialList.length > 0 ? (
            filteredMaterialList.map((item) => (
              <MaterialCard
                key={item.id}
                item={item}
                expanded={expandedItems[item.id]}
                onToggle={() => toggleItem(item.id)}
                onView={handleViewItem}
              />
            ))
          ) : (
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
              <Icon name="file-document-outline" size={64} color="#d1d5db" />
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: '#6b7280',
                marginTop: 16
              }}>
                No material consumption found
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#9ca3af',
                marginTop: 8,
                textAlign: 'center'
              }}>
                {searchQuery ? 
                  'Try adjusting your search terms or filters' : 
                  'No material consumption data available'
                }
              </Text>
            </Animated.View>
          )}
        </ScrollView>

        {/* Filter Modal */}
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          currentFilter={filterStatus}
          onApplyFilter={setFilterStatus}
        />

        {/* View Details Modal */}
        <ViewDetailsModal
          visible={showViewModal}
          onClose={() => setShowViewModal(false)}
          selectedItem={selectedItem}
        />
      </View>
    </MainLayout>
  );
};

export default MaterialConsumptionScreen;