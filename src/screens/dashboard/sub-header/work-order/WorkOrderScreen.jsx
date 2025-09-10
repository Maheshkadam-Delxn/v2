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

// Sample Work Order data based on the image content
const workOrderData = [
  {
    woNo: 'GH101-WO-00001',
    vendorName: 'ABC Constructions',
    amount: '22.87 K',
    retentionPercentage: '15 % (3.43 K)',
    advPaymentNo: '#',
    totalRecoveredAdvance: '0.0/0.0',
    taxPercentage: '2 %',
    items: 1,
    status: 'Pending'
  },
  {
    woNo: 'GH101-WO-00002',
    vendorName: 'XYZ Suppliers',
    amount: '132.41 K',
    retentionPercentage: '10 % (13.24 K)',
    advPaymentNo: 'GH101-APN-00001,GH101-APN-00001,GH101-APN-00001',
    totalRecoveredAdvance: '15.00 K/5.00 K',
    taxPercentage: '1 %',
    items: 2,
    status: 'Approved'
  },
  {
    woNo: 'GH101-WO-00003',
    vendorName: 'DEF Builders',
    amount: '75.50 K',
    retentionPercentage: '12 % (9.06 K)',
    advPaymentNo: 'GH101-APN-00002',
    totalRecoveredAdvance: '10.00 K/2.50 K',
    taxPercentage: '1.5 %',
    items: 3,
    status: 'Pending'
  },
  {
    woNo: 'GH101-WO-00004',
    vendorName: 'GHI Contractors',
    amount: '210.75 K',
    retentionPercentage: '8 % (16.86 K)',
    advPaymentNo: 'GH101-APN-00003,GH101-APN-00004',
    totalRecoveredAdvance: '25.00 K/8.00 K',
    taxPercentage: '2.5 %',
    items: 1,
    status: 'Rejected'
  }
];

// Status Indicator Component
const StatusIndicator = ({ status }) => {
  const statusConfig = {
    'Pending': { color: '#f59e0b', bg: '#fef3c7', icon: 'clock-outline' },
    'Approved': { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
    'Rejected': { color: '#ef4444', bg: '#fee2e2', icon: 'close-circle' },
  };

  const statusCfg = statusConfig[status] || statusConfig['Pending'];

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

// Work Order Card Component
const WorkOrderCard = ({ item, expanded, onToggle }) => {
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
        {/* Header - Applying light blue theme here */}
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
                  fontSize: 18, 
                  fontWeight: '700', 
                  color: '#1e40af', // Darker blue for contrast
                  marginBottom: 4
                }}>
                  {item.woNo}
                </Text>
                <Text style={{ 
                  fontSize: 13, 
                  color: '#3b82f6', // Medium blue
                  marginBottom: 8
                }}>
                  {item.vendorName}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '700', 
                  color: '#1e40af', // Darker blue for contrast
                  marginBottom: 4
                }}>
                  {item.amount}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ 
                    fontSize: 12, 
                    color: '#3b82f6', // Medium blue
                    marginRight: 8
                  }}>
                    {item.items} Item(s)
                  </Text>
                  <StatusIndicator status={item.status} />
                </View>
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
                  Work Order Details
                </Text>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Amount</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.amount}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Retention</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.retentionPercentage}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Advance Payment No</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.advPaymentNo}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Total/Recovered Advance</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.totalRecoveredAdvance}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Tax Percentage</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.taxPercentage}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Items</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.items}</Text>
                  </View>
                </View>
              </View>
              
              {/* Action Buttons */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                backgroundColor: '#ffffff', 
                borderRadius: 12, 
                padding: 16
              }}>
                <TouchableOpacity 
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    padding: 8
                  }}
                  onPress={() => console.log('View', item.woNo)}
                >
                  <Icon name="eye-outline" size={20} color="#3b82f6" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#3b82f6', fontWeight: '600' }}>View</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    padding: 8
                  }}
                  onPress={() => console.log('Edit', item.woNo)}
                >
                  <Icon name="pencil-outline" size={20} color="#10b981" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#10b981', fontWeight: '600' }}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    padding: 8
                  }}
                  onPress={() => console.log('Download', item.woNo)}
                >
                  <Icon name="download" size={20} color="#6b7280" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#6b7280', fontWeight: '600' }}>Download</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    padding: 8
                  }}
                  onPress={() => console.log('Email', item.woNo)}
                >
                  <Icon name="email-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#ef4444', fontWeight: '600' }}>Email</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

// Filter Modal Component
const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
  const [tempFilter, setTempFilter] = useState(currentFilter);

  const filters = ['All', 'Approved', 'Pending', 'Rejected'];

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
              Filter Work Orders
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

// Main Work Order Screen Component
const WorkOrderScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const toggleItem = useCallback((woNo) => {
    setExpandedItems(prev => ({
      ...prev,
      [woNo]: !prev[woNo]
    }));
  }, []);

  const filteredWorkOrderList = useMemo(() => {
    let result = [...workOrderData];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.woNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
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
      <MainLayout title="Work Orders">
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
              Loading work orders...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Work Orders">
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        {/* Header - Matching the GRN List Screen header */}
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
                Work Orders
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {filteredWorkOrderList.length} work orders • {filterStatus || 'All statuses'}
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
                  placeholder="Search work orders, vendors..."
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

        {/* Work Order List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredWorkOrderList.length > 0 ? (
            filteredWorkOrderList.map((item) => (
              <WorkOrderCard
                key={item.woNo}
                item={item}
                expanded={expandedItems[item.woNo]}
                onToggle={() => toggleItem(item.woNo)}
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
                No work orders found
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#9ca3af',
                marginTop: 8,
                textAlign: 'center'
              }}>
                {searchQuery ? 
                  'Try adjusting your search terms or filters' : 
                  'No work orders available'
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
      </View>
    </MainLayout>
  );
};

export default WorkOrderScreen;