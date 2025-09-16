import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  TextInput,
  Modal,
  ActivityIndicator
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

// ✅ Sample data for Daily Progress
const progressData = [
  {
    date: '2025-05-27',
    items: [
      { id: '1', activity: 'Field work', title: 'Progress', status: 'Approved', progress: 10 },
      { id: '2', activity: 'Field work', title: 'New update', status: 'Pending', progress: 100 }
    ]
  },
  {
    date: '2025-05-28',
    items: [
      { id: '3', activity: 'Welding', title: 'Welding started', status: 'Approved', progress: 50 },
      { id: '4', activity: 'Welding', title: 'Welding inspection', status: 'Rejected', progress: 20 },
      { id: '5', activity: 'Painting', title: 'First coat done', status: 'Pending', progress: 70 }
    ]
  },
  {
    date: '2025-05-29',
    items: [
      { id: '6', activity: 'Welding', title: 'Material cutting', status: 'Approved', progress: 80 },
      { id: '7', activity: 'Painting', title: 'Surface prep', status: 'Pending', progress: 40 },
      { id: '8', activity: 'Painting', title: 'Touch up', status: 'Approved', progress: 100 }
    ]
  },
  {
    date: '2025-05-30',
    items: [
      { id: '9', activity: 'Inspection', title: 'Final check', status: 'Pending', progress: 0 }
    ]
  }
];

// ✅ Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Approved: { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
    Pending: { color: '#f59e0b', bg: '#fef3c7', icon: 'clock-outline' },
    Rejected: { color: '#ef4444', bg: '#fee2e2', icon: 'close-circle' },
  };

  const cfg = statusConfig[status] || statusConfig['Pending'];

  return (
    <View style={{ 
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: cfg.bg,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 16
    }}>
      <Icon name={cfg.icon} size={14} color={cfg.color} style={{ marginRight: 4 }} />
      <Text style={{ fontSize: 12, fontWeight: '600', color: cfg.color }}>{status}</Text>
    </View>
  );
};

// ✅ Activity Details Modal with Tabs
const ActivityDetailsModal = ({ visible, onClose, item }) => {
  const [activeTab, setActiveTab] = useState('details'); // 'details' or 'documents'

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', padding: 16 }}>
        <Animated.View entering={FadeInUp} style={{
          backgroundColor: '#ffffff',
          borderRadius: 16,
          padding: 0,
          maxHeight: '80%'
        }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 24, paddingBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#1f2937' }}>Activity Details</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Tab Navigation */}
          <View style={{ flexDirection: 'row', paddingHorizontal: 16 }}>
            <TouchableOpacity 
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 2,
                borderBottomColor: activeTab === 'details' ? '#3b82f6' : '#e5e7eb'
              }}
              onPress={() => setActiveTab('details')}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: activeTab === 'details' ? '#3b82f6' : '#6b7280' 
              }}>
                Activity Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{
                flex: 1,
                paddingVertical: 12,
                alignItems: 'center',
                borderBottomWidth: 2,
                borderBottomColor: activeTab === 'documents' ? '#3b82f6' : '#e5e7eb'
              }}
              onPress={() => setActiveTab('documents')}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: activeTab === 'documents' ? '#3b82f6' : '#6b7280' 
              }}>
                Activity Documents
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 16 }}>
            {activeTab === 'details' ? (
              // Activity Details Tab Content
              <>
                {/* Activity Information */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 12 }}>Activity Information</Text>
                  
                  <View style={{ 
                    backgroundColor: '#f9fafb', 
                    borderRadius: 12, 
                    padding: 16,
                    borderWidth: 1,
                    borderColor: '#e5e7eb'
                  }}>
                    <View style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>Activity Name</Text>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937' }}>{item?.activity || 'Field work'}</Text>
                    </View>
                    
                    <View style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>Title</Text>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937' }}>{item?.title || 'Progress'}</Text>
                    </View>
                    
                    <View style={{ marginBottom: 12 }}>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>Status</Text>
                      <View style={{ marginTop: 4 }}>
                        <StatusBadge status={item?.status || 'Approved'} />
                      </View>
                    </View>
                    
                    <View>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>Progress</Text>
                      <View style={{ marginTop: 4 }}>
                        <View style={{ height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
                          <View style={{ 
                            height: 8, 
                            width: `${item?.progress || 10}%`, 
                            backgroundColor: item?.progress === 100 ? '#10b981' : '#3b82f6' 
                          }}/>
                        </View>
                        <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{item?.progress || 10}%</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Material Details Section */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 12 }}>Material Details</Text>
                  
                  <View style={{ 
                    backgroundColor: '#f9fafb', 
                    borderRadius: 12, 
                    padding: 16,
                    borderWidth: 1,
                    borderColor: '#e5e7eb'
                  }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 13, color: '#6b7280' }}>Material</Text>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937' }}>Concrete material</Text>
                      </View>
                    </View>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 13, color: '#6b7280' }}>Quantity</Text>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937' }}>500</Text>
                      </View>
                      <View style={{ flex: 1, alignItems: 'flex-end' }}>
                        <Text style={{ fontSize: 13, color: '#6b7280' }}>Unit</Text>
                        <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937' }}>KG</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            ) : (
              // Activity Documents Tab Content
              <View style={{ marginBottom: 20 }}>
                <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 12 }}>Activity Documents</Text>
                
                <View style={{ 
                  backgroundColor: '#f9fafb', 
                  borderRadius: 12, 
                  padding: 16,
                  borderWidth: 1,
                  borderColor: '#e5e7eb'
                }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>Title Progress</Text>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937' }}>{item?.title || 'Progress'}</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>Added By</Text>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937' }}>Alan David</Text>
                    </View>
                  </View>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>Date</Text>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937' }}>2025-27-05</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 13, color: '#6b7280' }}>Completion Status(%)</Text>
                      <Text style={{ fontSize: 15, fontWeight: '600', color: '#1f2937' }}>{item?.progress || 10}</Text>
                    </View>
                  </View>
                </View>

                {/* Document List (if available) */}
                <View style={{ marginTop: 16 }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', color: '#1f2937', marginBottom: 12 }}>Attached Files</Text>
                  
                  <View style={{ 
                    backgroundColor: '#f9fafb', 
                    borderRadius: 12, 
                    padding: 16,
                    borderWidth: 1,
                    borderColor: '#e5e7eb'
                  }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                      <Icon name="file-document-outline" size={20} color="#3b82f6" style={{ marginRight: 8 }} />
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>Progress_Report.pdf</Text>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>2.4 MB • Added on 2025-05-27</Text>
                      </View>
                      <TouchableOpacity>
                        <Icon name="download-outline" size={20} color="#3b82f6" />
                      </TouchableOpacity>
                    </View>
                    
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Icon name="image-outline" size={20} color="#3b82f6" style={{ marginRight: 8 }} />
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#1f2937' }}>Site_Photo_1.jpg</Text>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>1.8 MB • Added on 2025-05-27</Text>
                      </View>
                      <TouchableOpacity>
                        <Icon name="download-outline" size={20} color="#3b82f6" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            )}
          </ScrollView>

          {/* Close Button */}
          <TouchableOpacity
            style={{
              backgroundColor: '#3b82f6',
              padding: 16,
              borderRadius: 0,
              alignItems: 'center',
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16
            }}
            onPress={onClose}
          >
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#ffffff' }}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ✅ Progress Item Card
const ProgressItemCard = ({ item, onViewItem }) => (
  <View style={{
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13, color: '#6b7280' }}>Activity Name :</Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#1f2937' }}>{item.activity}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 13, color: '#6b7280' }}>Title :</Text>
        <Text style={{ fontSize: 15, fontWeight: '700', color: '#1f2937' }}>{item.title}</Text>
      </View>
    </View>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <StatusBadge status={item.status} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={{ height: 8, backgroundColor: '#e5e7eb', borderRadius: 4, overflow: 'hidden' }}>
          <View style={{ 
            height: 8, 
            width: `${item.progress}%`, 
            backgroundColor: item.progress === 100 ? '#10b981' : '#3b82f6' 
          }}/>
        </View>
        <Text style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{item.progress}%</Text>
      </View>
      <TouchableOpacity 
        onPress={() => onViewItem(item)}
        style={{ marginLeft: 12, padding: 6 }}
      >
        <Icon name="eye-outline" size={20} color="#3b82f6" />
      </TouchableOpacity>
    </View>
  </View>
);

// ✅ Daily Progress Card
const DailyProgressCard = ({ day, expanded, onToggle, onViewItem }) => (
  <Animated.View entering={FadeInDown.duration(400)}>
    <View style={{
      borderRadius: 16,
      backgroundColor: '#ffffff',
      marginBottom: 16,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3
    }}>
      <TouchableOpacity onPress={onToggle}>
        <LinearGradient 
          colors={['#dbeafe', '#bfdbfe']}
          style={{ padding: 16 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: '700', color: '#1e40af' }}>Date: {day.date}</Text>
              <Text style={{ fontSize: 13, color: '#3b82f6' }}>Items: {day.items.length}</Text>
            </View>
            <Icon 
              name={expanded ? 'chevron-up' : 'chevron-down'} 
              size={24} 
              color="#1e40af" 
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>

      {expanded && (
        <Animated.View entering={FadeInUp} exiting={FadeOut} style={{ padding: 16, backgroundColor: '#f8fafc' }}>
          {day.items.map((item) => (
            <ProgressItemCard key={item.id} item={item} onViewItem={onViewItem} />
          ))}
        </Animated.View>
      )}
    </View>
  </Animated.View>
);

// ✅ Filter Modal (WorkOrder style)
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
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: '#1f2937' }}>Filter Progress</Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Options */}
          {filters.map((status) => (
            <TouchableOpacity
              key={status}
              style={{
                padding: 16,
                borderRadius: 16,
                borderWidth: 2,
                borderColor: (tempFilter === status || (status === 'All' && !tempFilter)) ? '#3b82f6' : '#e5e7eb',
                backgroundColor: (tempFilter === status || (status === 'All' && !tempFilter)) ? '#eff6ff' : '#ffffff',
                marginBottom: 12
              }}
              onPress={() => setTempFilter(status === 'All' ? null : status)}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: (tempFilter === status || (status === 'All' && !tempFilter)) ? '#3b82f6' : '#374151'
              }}>
                {status}
              </Text>
            </TouchableOpacity>
          ))}

          {/* Buttons */}
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <TouchableOpacity
              style={{
                flex: 1, backgroundColor: '#f3f4f6', padding: 16,
                borderRadius: 16, alignItems: 'center'
              }}
              onPress={onClose}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1, backgroundColor: '#3b82f6', padding: 16,
                borderRadius: 16, alignItems: 'center'
              }}
              onPress={() => {
                onApplyFilter(tempFilter);
                onClose();
              }}
            >
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#ffffff' }}>Apply Filter</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ✅ Main Screen
const DailyProgressScreen = () => {
  const [expandedDates, setExpandedDates] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null); // null = all
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);

  const toggleExpand = (date) => {
    setExpandedDates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1200);
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setIsDetailsModalVisible(true);
  };

  const filteredData = useMemo(() => {
    let data = progressData;

    // apply search
    if (searchQuery.trim()) {
      data = data.map(day => ({
        ...day,
        items: day.items.filter(item => 
          item.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.status.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(day => day.items.length > 0);
    }

    // apply filter
    if (selectedStatus) {
      data = data.map(day => ({
        ...day,
        items: day.items.filter(item => item.status === selectedStatus)
      })).filter(day => day.items.length > 0);
    }

    return data;
  }, [searchQuery, selectedStatus]);

  // ✅ Refresh Loading State
  if (isRefreshing) {
    return (
      <MainLayout title="Daily Progress">
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
            <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '600', color: '#374151' }}>
              Loading daily progress...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Daily Progress">
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        {/* Header */}
        <View style={{ backgroundColor: '#dbeafe', padding: 16 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 12
          }}>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#1e40af' }}>
                Daily Progress List
              </Text>
              <Text style={{ fontSize: 12, color: '#3b82f6', marginTop: 2 }}>
                {filteredData.length} days • {selectedStatus || 'All statuses'}
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

          {/* Search + Filter Row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* Search Box */}
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
                  placeholder="Search activity, title, status..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholderTextColor="#6b7280"
                  style={{ flex: 1, color: '#1e40af', fontSize: 14, paddingVertical: 0 }}
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
              onPress={() => setIsFilterVisible(true)}
            >
              <Icon name="filter-outline" size={16} color="#1e40af" />
              {selectedStatus && (
                <View style={{ 
                  marginLeft: 4, 
                  backgroundColor: '#3b82f6', 
                  paddingHorizontal: 6,
                  paddingVertical: 2,
                  borderRadius: 8
                }}>
                  <Text style={{ fontSize: 10, color: '#ffffff', fontWeight: '600' }}>
                    {selectedStatus}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* List */}
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {filteredData.length > 0 ? (
            filteredData.map(day => (
              <DailyProgressCard 
                key={day.date}
                day={day}
                expanded={expandedDates[day.date]}
                onToggle={() => toggleExpand(day.date)}
                onViewItem={handleViewItem}
              />
            ))
          ) : (
            <Animated.View entering={FadeInUp} style={{ alignItems: 'center', marginTop: 40 }}>
              <Icon name="file-document-outline" size={64} color="#d1d5db" />
              <Text style={{ marginTop: 16, fontSize: 16, fontWeight: '600', color: '#6b7280' }}>No records found</Text>
            </Animated.View>
          )}
        </ScrollView>
      </View>

      {/* ✅ Filter Modal */}
      <FilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        currentFilter={selectedStatus}
        onApplyFilter={setSelectedStatus}
      />

      {/* ✅ Activity Details Modal */}
      <ActivityDetailsModal
        visible={isDetailsModalVisible}
        onClose={() => setIsDetailsModalVisible(false)}
        item={selectedItem}
      />
    </MainLayout>                               
  );
};

export default DailyProgressScreen;