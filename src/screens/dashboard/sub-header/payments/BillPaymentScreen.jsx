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

// Sample Bill Payment data
const billPaymentData = [
  {
    poNo: 'GH101-PO-00019',
    poDate: '2025-20-08',
    supplier: 'XYZ Suppliers',
    items: 1,
    amount: '200.00 K',
    bills: [
      {
        billno: 'BILL-001',
        date: '2025-21-08',
        items: 5,
        approvalStatus: 'Approved'
      },
      {
        billno: 'BILL-002',
        date: '2025-22-08',
        items: 3,
        approvalStatus: 'Pending'
      }
    ]
  },
  {
    poNo: 'GH101-PO-00016',
    poDate: '2025-13-08',
    supplier: 'XYZ Suppliers',
    items: 1,
    amount: '22.50 K',
    bills: [
      {
        billno: 'BILL-003',
        date: '2025-14-08',
        approvalStatus: 'Approved'
      }
    ]
  },
  {
    poNo: 'GH101-PO-00014',
    poDate: '2025-23-07',
    supplier: 'ABC Constructions',
    items: 1,
    amount: '162.00 K',
    bills: [
      {
        billno: 'BILL-004',
        date: '2025-24-07',
        approvalStatus: 'Rejected'
      },
      {
        billno: 'BILL-005',
        date: '2025-25-07',
        approvalStatus: 'Approved'
      }
    ]
  },
  {
    poNo: 'GH101-PO-00013',
    poDate: '2025-16-07',
    supplier: 'XYZ Suppliers',
    items: 1,
    amount: '4.56 K',
    bills: [
      {
        billno: 'BILL-006',
        date: '2025-17-07',
        approvalStatus: 'Approved'
      }
    ]
  },
  {
    poNo: 'GH101-PO-00012',
    poDate: '2025-16-07',
    supplier: 'ABC Constructions',
    items: 1,
    amount: '355.00 K',
    bills: [
      {
        billno: 'BILL-007',
        date: '2025-17-07',
        approvalStatus: 'Pending'
      }
    ]
  },
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

// Bill Row Component
const BillRow = ({ bill }) => {
  return (
    <View style={{
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#f3f4f6',
      alignItems: 'center',
      minWidth: screenWidth * 1.2,
      backgroundColor: '#ffffff'
    }}>
      <View style={{ width: screenWidth * 0.4, paddingRight: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
          {bill.billno}
        </Text>
      </View>
      <View style={{ width: screenWidth * 0.3, paddingRight: 8 }}>
        <Text style={{ fontSize: 14, color: '#6b7280' }}>
          {bill.date}
        </Text>
      </View>
      <View style={{ width: screenWidth * 0.2, paddingRight: 8 }}>
        <Text style={{ fontSize: 14, color: '#6b7280', fontWeight: '600' }}>
          {bill.items}
        </Text>
      </View>
      <View style={{ width: screenWidth * 0.3, paddingRight: 8 }}>
        <StatusIndicator status={bill.approvalStatus} />
      </View>
      <View style={{ width: screenWidth * 0.4, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity 
          style={{ padding: 6 }}
          onPress={() => console.log('View', bill.billno)}
        >
          <Icon name="eye-outline" size={20} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ padding: 6 }}
          onPress={() => console.log('Audit', bill.billno)}
        >
          <Icon name="clipboard-check-outline" size={20} color="#10b981" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ padding: 6 }}
          onPress={() => console.log('Download', bill.billno)}
        >
          <Icon name="download" size={20} color="#6b7280" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={{ padding: 6 }}
          onPress={() => console.log('Email', bill.billno)}
        >
          <Icon name="email-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Bill Payment Card Component
const BillPaymentCard = ({ item, expanded, onToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBills = useMemo(() => {
    if (!searchQuery.trim()) return item.bills;
    
    return item.bills.filter(bill => 
      bill.billno.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, item.bills]);

  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <View style={{
        borderRadius: 16,
        backgroundColor: '#ffffff',
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}>
        {/* Header */}
        <TouchableOpacity onPress={onToggle}>
          <LinearGradient 
            colors={['#1e3a8a', '#1d4ed8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 20 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '700', 
                  color: '#ffffff',
                  marginBottom: 4
                }}>
                  {item.poNo}
                </Text>
                <Text style={{ 
                  fontSize: 12, 
                  color: '#e0f2fe',
                  marginBottom: 4
                }}>
                  PO Date: {item.poDate}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '600', 
                  color: '#ffffff',
                  marginBottom: 4
                }}>
                  {item.supplier}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ 
                    fontSize: 12, 
                    color: '#e0f2fe',
                    marginRight: 8
                  }}>
                    {item.items} Item(s)
                  </Text>
                  <Text style={{ 
                    fontSize: 14, 
                    fontWeight: '700', 
                    color: '#ffffff'
                  }}>
                    {item.amount}
                  </Text>
                </View>
              </View>
              <Icon 
                name={expanded ? 'chevron-up' : 'chevron-down'} 
                size={24} 
                color="#ffffff" 
                style={{ marginLeft: 12 }} 
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Expanded Content */}
        {expanded && (
          <Animated.View entering={FadeInUp} exiting={FadeOut}>
            <View style={{ padding: 16 }}>
              {/* Bill List Header with Search */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: 16
              }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '700', 
                  color: '#1f2937' 
                }}>
                  Bill List
                </Text>
                <View style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center',
                  backgroundColor: '#f9fafb',
                  borderRadius: 8,
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  width: '50%'
                }}>
                  <Icon name="magnify" size={18} color="#6b7280" style={{ marginRight: 8 }} />
                  <TextInput
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search bills..."
                    style={{ 
                      flex: 1, 
                      color: '#374151', 
                      fontSize: 14 
                    }}
                  />
                  {searchQuery.length > 0 && (
                    <TouchableOpacity onPress={() => setSearchQuery('')}>
                      <Icon name="close-circle" size={18} color="#6b7280" />
                    </TouchableOpacity>
                  )}
                </View>
              </View>

              {/* Bill List Table */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={true}
              >
                <View>
                  {/* Table Header */}
                  <View style={{
                    flexDirection: 'row',
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                    backgroundColor: '#f9fafb',
                    borderTopWidth: 1,
                    borderTopColor: '#e5e7eb',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e5e7eb',
                    minWidth: screenWidth * 1.2
                  }}>
                    <View style={{ width: screenWidth * 0.4, paddingRight: 8 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                        Bill No
                      </Text>
                    </View>
                    <View style={{ width: screenWidth * 0.3, paddingRight: 8 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                        Date
                      </Text>
                    </View>
                    <View style={{ width: screenWidth * 0.2, paddingRight: 8 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                        Items
                      </Text>
                    </View>
                    <View style={{ width: screenWidth * 0.3, paddingRight: 8 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                        Status
                      </Text>
                    </View>
                    <View style={{ width: screenWidth * 0.4 }}>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', textAlign: 'center' }}>
                        Actions
                      </Text>
                    </View>
                  </View>

                  {/* Table Rows */}
                  {filteredBills.length > 0 ? (
                    filteredBills.map((bill, index) => (
                      <BillRow key={bill.billno} bill={bill} />
                    ))
                  ) : (
                    <View style={{ 
                      padding: 20, 
                      alignItems: 'center',
                      minWidth: screenWidth * 1.2,
                      backgroundColor: '#ffffff'
                    }}>
                      <Icon name="file-document-outline" size={32} color="#d1d5db" />
                      <Text style={{ 
                        fontSize: 14, 
                        color: '#6b7280',
                        marginTop: 8
                      }}>
                        No bills found
                      </Text>
                    </View>
                  )}
                </View>
              </ScrollView>
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
              Filter Bill List
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
                    ? '#1e3a8a' 
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
                    ? '#1e3a8a'
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
                backgroundColor: '#1e3a8a',
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

// Main Bill Payment List Screen Component
const BillPaymentScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const toggleItem = useCallback((poNo) => {
    setExpandedItems(prev => ({
      ...prev,
      [poNo]: !prev[poNo]
    }));
  }, []);

  const filteredBillPaymentList = useMemo(() => {
    let result = [...billPaymentData];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.poNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus) {
      result = result.filter(item => 
        item.bills.some(bill => bill.approvalStatus === filterStatus)
      );
    }
    
    return result;
  }, [filterStatus, searchQuery]);

  if (isLoading) {
    return (
      <MainLayout title="Bill Payment List">
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
            <ActivityIndicator size="large" color="#1e3a8a" />
            <Text style={{ 
              marginTop: 16, 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#374151' 
            }}>
              Loading bill payment list...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Bill Payment List">
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        {/* Header */}
        <LinearGradient 
          colors={['#1e3a8a', '#1d4ed8']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 20 }}
        >
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 20
          }}>
            <View>
              <Text style={{ 
                fontSize: 24, 
                fontWeight: '700', 
                color: '#ffffff' 
              }}>
                Bill Payment List
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: 4
              }}>
                {filteredBillPaymentList.length} purchase orders • {filterStatus || 'All statuses'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{ 
                  padding: 12, 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)', 
                  borderRadius: 16 
                }}
                onPress={handleRefresh}
              >
                <Icon name="refresh" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: 16, 
            padding: 16,
            marginBottom: 16
          }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="magnify" size={20} color="#ffffff" style={{ marginRight: 12 }} />
              <TextInput
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholder="Search PO, suppliers..."
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                style={{ 
                  flex: 1, 
                  color: '#ffffff', 
                  fontSize: 16 
                }}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Icon name="close-circle" size={20} color="rgba(255, 255, 255, 0.6)" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* Filter Control */}
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 16
              }}
              onPress={() => setShowFilterModal(true)}
            >
              <Icon name="filter-outline" size={16} color="#ffffff" />
              <Text style={{ 
                color: '#ffffff', 
                fontWeight: '600',
                marginLeft: 8
              }}>
                Filter
              </Text>
              {filterStatus && (
                <View style={{ 
                  marginLeft: 8, 
                  backgroundColor: 'rgba(255, 255, 255, 0.3)', 
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12
                }}>
                  <Text style={{ 
                    fontSize: 12, 
                    color: '#ffffff' 
                  }}>
                    {filterStatus}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Bill Payment List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredBillPaymentList.length > 0 ? (
            filteredBillPaymentList.map((item) => (
              <BillPaymentCard
                key={item.poNo}
                item={item}
                expanded={expandedItems[item.poNo]}
                onToggle={() => toggleItem(item.poNo)}
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
                No bill payment records found
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#9ca3af',
                marginTop: 8,
                textAlign: 'center'
              }}>
                {searchQuery ? 
                  'Try adjusting your search terms or filters' : 
                  'No purchase orders available'
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

export default BillPaymentScreen;