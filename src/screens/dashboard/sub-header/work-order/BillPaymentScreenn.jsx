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
const billPaymentData = [
  {
    id: '1',
    billNo: 'GH101-BILL-00001',
    transactionRefNo: '1331',
    paymentMode: 'Cheque',
    paidAmount: '350.00',
    paymentDate: '2025-08-13'
  },
  {
    id: '2',
    billNo: 'GH101-BILL-00012',
    transactionRefNo: '1234',
    paymentMode: 'Bank Transfer',
    paidAmount: '10.00 K',
    paymentDate: '2025-09-02'
  },
  {
    id: '3',
    billNo: 'GH101-BILL-00015',
    transactionRefNo: '1456',
    paymentMode: 'Online Payment',
    paidAmount: '5.50 K',
    paymentDate: '2025-09-05'
  },
  {
    id: '4',
    billNo: 'GH101-BILL-00018',
    transactionRefNo: '1678',
    paymentMode: 'Cash',
    paidAmount: '2.25 K',
    paymentDate: '2025-09-10'
  }
];

// Payment Mode Indicator Component
const PaymentModeIndicator = ({ mode }) => {
  const modeConfig = {
    'Cheque': { color: '#3b82f6', bg: '#dbeafe', icon: 'credit-card' },
    'Bank Transfer': { color: '#10b981', bg: '#d1fae5', icon: 'bank-transfer' },
    'Online Payment': { color: '#8b5cf6', bg: '#ede9fe', icon: 'credit-card-scan' },
    'Cash': { color: '#f59e0b', bg: '#fef3c7', icon: 'cash' },
  };

  const modeCfg = modeConfig[mode] || modeConfig['Cheque'];

  return (
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'center', 
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
      backgroundColor: modeCfg.bg,
      alignSelf: 'flex-start'
    }}>
      <Icon name={modeCfg.icon} size={14} color={modeCfg.color} style={{ marginRight: 4 }} />
      <Text style={{ 
        fontSize: 12, 
        fontWeight: '600', 
        color: modeCfg.color 
      }}>
        {mode}
      </Text>
    </View>
  );
};

// Bill Payment Card Component
const BillPaymentCard = ({ item }) => {
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
        {/* Card Header - Applying light blue theme */}
        <LinearGradient 
          colors={['#dbeafe', '#bfdbfe']} // Light blue gradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: 20 }}
        >
          {/* Bill Number and Payment Date */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '700', 
                color: '#1e40af',
                marginBottom: 4
              }}>
                {item.billNo}
              </Text>
              <Text style={{ 
                fontSize: 13, 
                color: '#3b82f6',
              }}>
                Ref No: {item.transactionRefNo}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#1e40af',
                marginBottom: 4
              }}>
                Payment Date:
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6'
              }}>
                {item.paymentDate}
              </Text>
            </View>
          </View>

          {/* Payment Details */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <PaymentModeIndicator mode={item.paymentMode} />
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginBottom: 4
              }}>
                Paid Amount
              </Text>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '700', 
                color: '#1e40af'
              }}>
                ₹{item.paidAmount}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Action Buttons */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          backgroundColor: '#ffffff', 
          padding: 16,
          borderTopWidth: 1,
          borderTopColor: '#f1f5f9'
        }}>
          <TouchableOpacity 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              padding: 8
            }}
            onPress={() => console.log('View Payment', item.billNo)}
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
            onPress={() => console.log('Download Receipt', item.billNo)}
          >
            <Icon name="download" size={20} color="#3b82f6" style={{ marginRight: 8 }} />
            <Text style={{ color: '#3b82f6', fontWeight: '600' }}>Download</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              padding: 8
            }}
            onPress={() => console.log('Share Receipt', item.billNo)}
          >
            <Icon name="share-outline" size={20} color="#3b82f6" style={{ marginRight: 8 }} />
            <Text style={{ color: '#3b82f6', fontWeight: '600' }}>Share</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center',
              padding: 8
            }}
            onPress={() => console.log('Print Receipt', item.billNo)}
          >
            <Icon name="printer-outline" size={20} color="#3b82f6" style={{ marginRight: 8 }} />
            <Text style={{ color: '#3b82f6', fontWeight: '600' }}>Print</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

// Filter Modal Component
const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
  const [tempFilter, setTempFilter] = useState(currentFilter);

  const filters = ['All', 'Cheque', 'Bank Transfer', 'Online Payment', 'Cash'];

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
              Filter Payments
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
              Payment Mode
            </Text>
            {filters.map((mode) => (
              <TouchableOpacity
                key={mode}
                style={{
                  padding: 16,
                  borderRadius: 16,
                  borderWidth: 2,
                  borderColor: (tempFilter === mode || (mode === 'All' && !tempFilter)) 
                    ? '#3b82f6' 
                    : '#e5e7eb',
                  backgroundColor: (tempFilter === mode || (mode === 'All' && !tempFilter)) 
                    ? '#eff6ff' 
                    : '#ffffff'
                }}
                onPress={() => setTempFilter(mode === 'All' ? null : mode)}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: (tempFilter === mode || (mode === 'All' && !tempFilter))
                    ? '#3b82f6'
                    : '#374151'
                }}>
                  {mode}
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

// Main Bill Payments Screen Component
const BillPaymentsScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterMode, setFilterMode] = useState(null);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const filteredBillPaymentList = useMemo(() => {
    let result = [...billPaymentData];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.billNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.transactionRefNo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply payment mode filter
    if (filterMode) {
      result = result.filter(item => item.paymentMode === filterMode);
    }
    
    return result;
  }, [filterMode, searchQuery]);

  if (isLoading) {
    return (
      <MainLayout title="Bill Payments">
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
              Loading bill payments...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Bill Payments">
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
                Bill Payments
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {filteredBillPaymentList.length} payments • {filterMode || 'All modes'}
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
                  placeholder="Search bill no, reference no..."
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
              {filterMode && (
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
                    {filterMode}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Bill Payment List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredBillPaymentList.length > 0 ? (
            filteredBillPaymentList.map((item) => (
              <BillPaymentCard
                key={item.id}
                item={item}
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
              <Icon name="credit-card-outline" size={64} color="#d1d5db" />
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: '#6b7280',
                marginTop: 16
              }}>
                No bill payments found
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#9ca3af',
                marginTop: 8,
                textAlign: 'center'
              }}>
                {searchQuery ? 
                  'Try adjusting your search terms or filters' : 
                  'No bill payments available'
                }
              </Text>
            </Animated.View>
          )}
        </ScrollView>

        {/* Filter Modal */}
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          currentFilter={filterMode}
          onApplyFilter={setFilterMode}
        />
      </View>
    </MainLayout>
  );
};

export default BillPaymentsScreen;