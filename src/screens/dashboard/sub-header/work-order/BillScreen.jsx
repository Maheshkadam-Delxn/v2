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

// Sample data based on the provided content
const workOrderData = [
  {
    id: '1',
    workOrderNo: 'GH101-WO-00010',
    workOrderDate: '2025-23-08',
    vendor: 'XYZ Suppliers',
    billCount: 1,
    bills: [
      {
        id: 'bill-1',
        billNo: 'GH101-BILL-00011',
        amount: '404.00',
        retentionBillAmount: '156.00',
        advanceBillRecovery: '0.00'
      }
    ]
  },
  {
    id: '2',
    workOrderNo: 'GH101-WO-00013',
    workOrderDate: '2025-26-08',
    vendor: 'ABC Constructions',
    billCount: 1,
    bills: [
      {
        id: 'bill-2',
        billNo: 'GH101-BILL-00012',
        amount: '750.00',
        retentionBillAmount: '200.00',
        advanceBillRecovery: '50.00'
      }
    ]
  },
  {
    id: '3',
    workOrderNo: 'GH101-WO-00006',
    workOrderDate: '2025-14-08',
    vendor: 'ABC Constructions',
    billCount: 2,
    bills: [
      {
        id: 'bill-3',
        billNo: 'GH101-BILL-00013',
        amount: '1200.00',
        retentionBillAmount: '300.00',
        advanceBillRecovery: '100.00'
      },
      {
        id: 'bill-4',
        billNo: 'GH101-BILL-00014',
        amount: '800.00',
        retentionBillAmount: '200.00',
        advanceBillRecovery: '0.00'
      }
    ]
  },
  {
    id: '4',
    workOrderNo: 'GH101-WO-00011',
    workOrderDate: '2025-25-08',
    vendor: 'XYZ Suppliers',
    billCount: 2,
    bills: [
      {
        id: 'bill-5',
        billNo: 'GH101-BILL-00015',
        amount: '950.00',
        retentionBillAmount: '250.00',
        advanceBillRecovery: '75.00'
      },
      {
        id: 'bill-6',
        billNo: 'GH101-BILL-00016',
        amount: '650.00',
        retentionBillAmount: '150.00',
        advanceBillRecovery: '0.00'
      }
    ]
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
        {/* Header - Applying light blue theme */}
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
                  color: '#1e40af',
                  marginBottom: 4
                }}>
                  Work Order No: {item.workOrderNo}
                </Text>
                <Text style={{ 
                  fontSize: 13, 
                  color: '#3b82f6',
                  marginBottom: 8
                }}>
                  Date: {item.workOrderDate} | Vendor: {item.vendor}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  backgroundColor: '#dbeafe',
                  marginBottom: 4
                }}>
                  <Text style={{ 
                    fontSize: 12, 
                    fontWeight: '600', 
                    color: '#1d4ed8' 
                  }}>
                    Bills: {item.billCount}
                  </Text>
                </View>
                <Icon 
                  name={expanded ? 'chevron-up' : 'chevron-down'} 
                  size={24} 
                  color="#1e40af" 
                  style={{ marginLeft: 12 }} 
                />
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Expanded Content */}
        {expanded && (
          <Animated.View entering={FadeInUp} exiting={FadeOut}>
            <View style={{ padding: 16, backgroundColor: '#f8fafc' }}>
              {/* Bills List */}
              {item.bills.map((bill, index) => (
                <View key={bill.id} style={{ 
                  backgroundColor: '#ffffff', 
                  borderRadius: 12, 
                  padding: 16,
                  marginBottom: index < item.bills.length - 1 ? 12 : 0
                }}>
                  <Text style={{ 
                    fontSize: 16, 
                    fontWeight: '700', 
                    color: '#1f2937',
                    marginBottom: 12
                  }}>
                    Bill Details
                  </Text>
                  
                  <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>Bill No</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{bill.billNo}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>Amount</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>₹{bill.amount}</Text>
                    </View>
                  </View>
                  
                  <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>Retention Bill Amount</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>₹{bill.retentionBillAmount}</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>Advance Bill Recovery</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>₹{bill.advanceBillRecovery}</Text>
                    </View>
                  </View>
                  
                  {/* Action Buttons */}
                  <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    marginTop: 12,
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: '#e5e7eb'
                  }}>
                    <TouchableOpacity 
                      style={{ 
                        flexDirection: 'row', 
                        alignItems: 'center',
                        padding: 8
                      }}
                      onPress={() => console.log('View Bill', bill.billNo)}
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
                      onPress={() => console.log('Edit Bill', bill.billNo)}
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
                      onPress={() => console.log('Download Bill', bill.billNo)}
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
                      onPress={() => console.log('Email Bill', bill.billNo)}
                    >
                      <Icon name="email-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
                      <Text style={{ color: '#ef4444', fontWeight: '600' }}>Email</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
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

  const filters = ['All', 'XYZ Suppliers', 'ABC Constructions'];

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
              Filter Bills
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
              Vendor
            </Text>
            {filters.map((vendor) => (
              <TouchableOpacity
                key={vendor}
                style={{
                  padding: 16,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: (tempFilter === vendor || (vendor === 'All' && !tempFilter)) 
                    ? '#3b82f6' 
                    : '#e5e7eb',
                  backgroundColor: (tempFilter === vendor || (vendor === 'All' && !tempFilter)) 
                    ? '#eff6ff' 
                    : '#ffffff'
                }}
                onPress={() => setTempFilter(vendor === 'All' ? null : vendor)}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: (tempFilter === vendor || (vendor === 'All' && !tempFilter))
                    ? '#3b82f6'
                    : '#374151'
                }}>
                  {vendor}
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

// Main Bills Screen Component
const BillScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterVendor, setFilterVendor] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

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

  const filteredWorkOrderList = useMemo(() => {
    let result = [...workOrderData];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.workOrderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.vendor.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply vendor filter
    if (filterVendor) {
      result = result.filter(item => item.vendor === filterVendor);
    }
    
    return result;
  }, [filterVendor, searchQuery]);

  if (isLoading) {
    return (
      <MainLayout title="Bills">
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
              Loading Bills...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Bills">
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        {/* Header - Matching the Work Orders Screen header exactly */}
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
                Bills
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {filteredWorkOrderList.length} bills • {filterVendor || 'All vendors'}
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
              {filterVendor && (
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
                    {filterVendor}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Bills List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredWorkOrderList.length > 0 ? (
            filteredWorkOrderList.map((item) => (
              <WorkOrderCard
                key={item.id}
                item={item}
                expanded={expandedItems[item.id]}
                onToggle={() => toggleItem(item.id)}
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
                No bills found
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#9ca3af',
                marginTop: 8,
                textAlign: 'center'
              }}>
                {searchQuery ? 
                  'Try adjusting your search terms or filters' : 
                  'No bills available'
                }
              </Text>
            </Animated.View>
          )}
        </ScrollView>

        {/* Filter Modal */}
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          currentFilter={filterVendor}
          onApplyFilter={setFilterVendor}
        />
      </View>
    </MainLayout>
  );
};

export default BillScreen;