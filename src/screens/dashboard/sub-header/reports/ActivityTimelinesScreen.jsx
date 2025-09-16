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

// Sample Activity Timeline data based on the image content
const activityData = [
  {
    id: '1020',
    title: 'Site Clearing and Grading',
    groupName: 'A Wing',
    startDate: '2025-05-28',
    endDate: '2025-06-02',
    expectedDuration: '9',
    actualDuration: '5',
    status: 'Completed',
    progress: 100
  },
  {
    id: '1070',
    title: 'Field work',
    groupName: 'B Wing',
    startDate: '2025-05-27',
    endDate: '2025-05-27',
    expectedDuration: '19',
    actualDuration: '0',
    status: 'Completed',
    progress: 100
  },
  {
    id: '1100',
    title: 'Earthwork',
    groupName: 'B Wing',
    startDate: '2025-05-28',
    endDate: '2025-05-31',
    expectedDuration: '9',
    actualDuration: '3',
    status: 'Completed',
    progress: 100
  },
  {
    id: '1110',
    title: 'Staircase formwork and casting',
    groupName: 'Floor 1',
    startDate: '2025-05-29',
    endDate: '2025-05-31',
    expectedDuration: '4',
    actualDuration: '2',
    status: 'Completed',
    progress: 100
  }
];

// Status Indicator Component
const StatusIndicator = ({ status }) => {
  const statusConfig = {
    'Completed': { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
    'In Progress': { color: '#3b82f6', bg: '#dbeafe', icon: 'progress-clock' },
    'Not Started': { color: '#6b7280', bg: '#f3f4f6', icon: 'clock-outline' },
    'Delayed': { color: '#ef4444', bg: '#fee2e2', icon: 'alert-circle' },
  };

  const statusCfg = statusConfig[status] || statusConfig['Not Started'];

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

// Progress Bar Component
const ProgressBar = ({ progress }) => {
  return (
    <View style={{ marginTop: 8 }}>
      <View style={{ 
        width: '100%', 
        height: 8, 
        backgroundColor: '#e5e7eb', 
        borderRadius: 4,
        overflow: 'hidden'
      }}>
        <View style={{ 
          width: `${progress}%`, 
          height: '100%', 
          backgroundColor: '#3b82f6',
          borderRadius: 4
        }} />
      </View>
      <Text style={{ 
        fontSize: 12, 
        color: '#6b7280', 
        textAlign: 'right',
        marginTop: 4
      }}>
        {progress}%
      </Text>
    </View>
  );
};

// Activity Timeline Card Component
const ActivityCard = ({ item }) => {
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
            <StatusIndicator status={item.status} />
          </View>
        </LinearGradient>

        {/* Expanded Content - Always expanded as requested */}
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
              Activity Timeline Details
            </Text>
            
            <View style={{ flexDirection: 'row', marginBottom: 8 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Group Name</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.groupName}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Title</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.title} ({item.id})</Text>
              </View>
            </View>
            
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
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Expected/Actual Duration</Text>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                  {item.expectedDuration} / {item.actualDuration} (In days)
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, color: '#6b7280' }}>Status</Text>
                <StatusIndicator status={item.status} />
              </View>
            </View>
            
            <ProgressBar progress={item.progress} />
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

// Filter Modal Component
const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
  const [tempFilter, setTempFilter] = useState(currentFilter);

  const filters = ['All', 'Completed', 'In Progress', 'Not Started', 'Delayed'];

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
              Filter Activities
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

// Main Activity Timeline Screen Component
const ActivityTimelineScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const filteredActivityList = useMemo(() => {
    let result = [...activityData];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.groupName.toLowerCase().includes(searchQuery.toLowerCase())
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
      <MainLayout title="Activity Timeline">
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
              Loading activity timeline...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Activity Timeline">
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
                Activity Timeline
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {filteredActivityList.length} activities • {filterStatus || 'All statuses'}
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
                  placeholder="Search activities, groups..."
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

        {/* Activity Timeline List */}
        <ScrollView 
  contentContainerStyle={{ padding: 16 }}
  showsVerticalScrollIndicator={false}
>
  {filteredActivityList.length > 0 ? (
    filteredActivityList.map((item) => (
      <ActivityCard
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
      <Icon name="calendar-clock" size={64} color="#d1d5db" />
      <Text style={{ 
        fontSize: 18, 
        fontWeight: '600', 
        color: '#6b7280',
        marginTop: 16
      }}>
        No activities found
      </Text>
      <Text style={{ 
        fontSize: 14, 
        color: '#9ca3af',
        marginTop: 8,
        textAlign: 'center'
      }}>
        {searchQuery ? 
          'Try adjusting your search terms or filters' : 
          'No activity timeline data available'
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

export default ActivityTimelineScreen;