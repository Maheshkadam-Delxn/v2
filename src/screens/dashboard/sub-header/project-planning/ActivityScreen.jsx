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
  nestingColors: ['#DBEAFE', '#EFF6FF', '#E5E7EB'],
};

const activities = [
  {
    id: '1',
    name: 'Granite Horizon',
    actNo: 'GH101-WBS-00001',
    progress: 25,
    startDate: '2025-06-07',
    endDate: '2025-06-16',
    duration: 10,
    status: 'Not Started',
    approvalStatus: 'Pending',
    assignedTo: 'Sonalika, Alan David',
    tags: ['Construction', 'Phase 1'],
    budget: '$125,000',
    subActivities: [
      {
        id: '101',
        name: 'Survey',
        actNo: '1080',
        progress: 25,
        startDate: '2025-06-07',
        endDate: '2025-06-16',
        duration: 10,
        status: 'Not Started',
        approvalStatus: 'Approved',
        assignedTo: 'Sonalika, Alan David',
        budget: '$15,000',
        subActivities: [
          {
            id: '1011',
            name: 'Test',
            actNo: '1170',
            progress: 25,
            startDate: '2025-07-08',
            endDate: '2025-07-22',
            duration: 15,
            status: 'Not Started',
            approvalStatus: 'Pending',
            assignedTo: 'Sonalika, Mukesh Sinha',
            budget: '$10,000',
          },
          {
            id: '1012',
            name: 'Pre construction test',
            actNo: '1200',
            progress: 25,
            startDate: '2025-07-01',
            endDate: '2025-07-30',
            duration: 30,
            status: 'In Progress',
            approvalStatus: 'Approved',
            assignedTo: 'Mukesh Sinha',
            budget: '$20,000',
          },
          {
            id: '1013',
            name: 'Test',
            actNo: '1210',
            progress: 25,
            startDate: '2025-07-08',
            endDate: '2025-07-22',
            duration: 15,
            status: 'Not Started',
            approvalStatus: 'Approved',
            assignedTo: 'Sonalika, Mukesh Sinha',
            budget: '$12,000',
          },
          {
            id: '1014',
            name: 'Land survey and soil investigation',
            actNo: '1220',
            progress: 25,
            startDate: '2025-08-27',
            endDate: '2025-09-05',
            duration: 10,
            status: 'Not Started',
            approvalStatus: 'Pending',
            assignedTo: 'Mukesh Sinha',
            budget: '$18,000',
          },
          {
            id: '1015',
            name: 'Brick wall',
            actNo: '1290',
            progress: 25,
            startDate: '2025-09-06',
            endDate: '2025-09-15',
            duration: 10,
            status: 'Not Started',
            approvalStatus: 'Approved',
            assignedTo: 'Mukesh Sinha',
            budget: '$25,000',
          },
          {
            id: '1016',
            name: 'Pre construction test',
            actNo: '1300',
            progress: 25,
            startDate: '2025-07-01',
            endDate: '2025-07-30',
            duration: 30,
            status: 'Not Started',
            approvalStatus: 'Approved',
            assignedTo: 'Mukesh Sinha',
            budget: '$22,000',
          },
          {
            id: '1017',
            name: 'Survey',
            actNo: '1310',
            progress: 25,
            startDate: '2025-06-07',
            endDate: '2025-06-16',
            duration: 10,
            status: 'Not Started',
            approvalStatus: 'Approved',
            assignedTo: 'Sonalika, Alan David',
            budget: '$15,000',
          },
        ],
      },
    ],
  },
  {
    id: '2',
    name: 'A Wing',
    actNo: 'GH101-WBS-00002',
    progress: 25,
    startDate: '2025-07-23',
    endDate: '2025-08-01',
    duration: 10,
    status: 'Not Started',
    approvalStatus: 'Pending',
    assignedTo: 'Mukesh Sinha',
    tags: ['Building', 'Wing A'],
    budget: '$200,000',
    subActivities: [
      {
        id: '201',
        name: 'Wing1',
        actNo: '2001',
        progress: 25,
        startDate: '2025-07-23',
        endDate: '2025-08-01',
        duration: 10,
        status: 'Not Started',
        approvalStatus: 'Pending',
        assignedTo: 'Mukesh Sinha',
        budget: '$100,000',
        subActivities: [
          {
            id: '2011',
            name: 'Wall1',
            actNo: '20011',
            progress: 25,
            startDate: '2025-07-23',
            endDate: '2025-07-30',
            duration: 8,
            status: 'Not Started',
            approvalStatus: 'Pending',
            assignedTo: 'Mukesh Sinha',
            description: 'Construction of primary wall for Wing 1',
            budget: '$50,000',
          },
          {
            id: '2012',
            name: 'Wall2',
            actNo: '20012',
            progress: 25,
            startDate: '2025-07-31',
            endDate: '2025-08-07',
            duration: 8,
            status: 'Not Started',
            approvalStatus: 'Pending',
            assignedTo: 'Mukesh Sinha',
            description: 'Construction of secondary wall for Wing 1',
            budget: '$50,000',
          },
        ],
      },
     
    ],
  },
];


// Helper function to get all child IDs recursively
const getAllChildIds = (activity) => {
  let childIds = [];
  if (activity.subActivities && activity.subActivities.length > 0) {
    activity.subActivities.forEach(subActivity => {
      childIds.push(subActivity.id);
      childIds = [...childIds, ...getAllChildIds(subActivity)];
    });
  }
  return childIds;
};

// Find activity by ID in the hierarchy
const findActivityById = (id, activitiesList) => {
  for (const activity of activitiesList) {
    if (activity.id === id) return activity;
    if (activity.subActivities && activity.subActivities.length > 0) {
      const found = findActivityById(id, activity.subActivities);
      if (found) return found;
    }
  }
  return null;
};

// Circular Progress Component
const CircularProgress = ({ progress, size = 44, strokeWidth = 4 }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return colors.success;
    if (progress >= 50) return colors.warning;
    if (progress >= 20) return colors.info;
    return colors.danger;
  };

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.surfaceVariant,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: strokeWidth,
        borderColor: colors.border
      }}>
        <View style={{
          width: size - strokeWidth * 2,
          height: size - strokeWidth * 2,
          borderRadius: (size - strokeWidth * 2) / 2,
          backgroundColor: `${getProgressColor(progress)}10`,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <Text style={{ 
            fontSize: 12, 
            fontWeight: '700', 
            color: getProgressColor(progress) 
          }}>
            {progress}%
          </Text>
        </View>
      </View>
    </View>
  );
};

// Status Indicator Component
const StatusIndicator = ({ status, approvalStatus }) => {
  const statusConfig = {
    'Not Started': { color: colors.textMuted, bg: colors.surfaceVariant, icon: 'clock-outline' },
    'In Progress': { color: colors.warning, bg: `${colors.warning}10`, icon: 'progress-clock' },
    'Completed': { color: colors.success, bg: `${colors.success}10`, icon: 'check-circle' },
  };

  const approvalConfig = {
    'Pending': { color: colors.warning, bg: `${colors.warning}10` },
    'Approved': { color: colors.success, bg: `${colors.success}10` },
  };

  const config = statusConfig[status] || statusConfig['Not Started'];
  const approvalStyle = approvalConfig[approvalStatus] || approvalConfig['Pending'];

  return (
    <View style={{ alignItems: 'flex-end', gap: 4 }}>
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: config.bg 
      }}>
        <Icon name={config.icon} size={14} color={config.color} style={{ marginRight: 4 }} />
        <Text style={{ 
          fontSize: 12, 
          fontWeight: '600', 
          color: config.color 
        }}>
          {status}
        </Text>
      </View>
      <View style={{ 
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        backgroundColor: approvalStyle.bg
      }}>
        <Text style={{ 
          fontSize: 11, 
          fontWeight: '600', 
          color: approvalStyle.color 
        }}>
          {approvalStatus}
        </Text>
      </View>
    </View>
  );
};

// Activity Card Component with improved hierarchy display and rounded corners
const ActivityCard = ({ item, level = 0, toggleExpand, expandedItems }) => {
  const [showDetails, setShowDetails] = useState(false);
  const hasChildren = item.subActivities && item.subActivities.length > 0;
  const isExpanded = expandedItems[item.id];
  const nestingColor = colors.nestingColors[Math.min(level, colors.nestingColors.length - 1)];

  return (
    <Animated.View entering={FadeInDown.delay(level * 100)} exiting={FadeOut}>
      <TouchableOpacity
        onPress={() => hasChildren && toggleExpand(item.id)}
        style={{
          backgroundColor: colors.surface,
          marginBottom: 16,
          marginLeft: 0,
          width: cardWidth,
          borderRadius: 16,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 3,
        }}
      >
        {/* Header */}
        <LinearGradient
          colors={[nestingColor, '#FFFFFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: colors.border }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              {hasChildren && (
                <Icon
                  name={isExpanded ? 'chevron-down' : 'chevron-right'}
                  size={20}
                  color={colors.textMuted}
                  style={{ marginRight: 8 }}
                />
              )}
              {!hasChildren && (
                <Icon
                  name="circle-small"
                  size={20}
                  color={colors.textMuted}
                  style={{ marginRight: 8, opacity: 0.7 }}
                />
              )}
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: level === 0 ? 16 : 14, 
                  fontWeight: '700', 
                  color: colors.text,
                  marginBottom: 4
                }}>
                  {item.name}
                </Text>
                <Text style={{ 
                  fontSize: 12, 
                  color: colors.textMuted,
                  marginBottom: 8
                }}>
                  {item.actNo}
                </Text>
                {item.tags && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 4 }}>
                    {item.tags.map((tag, index) => (
                      <View key={index} style={{ 
                        backgroundColor: colors.border, 
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12
                      }}>
                        <Text style={{ 
                          fontSize: 10, 
                          color: colors.textSecondary,
                          fontWeight: '600'
                        }}>
                          {tag}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
            <CircularProgress progress={item.progress} size={44} strokeWidth={4} />
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={{ padding: 16, gap: 12 }}>
          {/* Key Info */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 12, color: colors.textMuted }}>Duration</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="calendar-range" size={16} color={colors.textMuted} />
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '600', 
                  color: colors.text,
                  marginLeft: 8
                }}>
                  {item.duration} days
                </Text>
              </View>
            </View>
            <View style={{ flex: 1, gap: 4 }}>
              <Text style={{ fontSize: 12, color: colors.textMuted }}>Budget</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="currency-usd" size={16} color={colors.textMuted} />
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '600', 
                  color: colors.text,
                  marginLeft: 8
                }}>
                  {item.budget || 'N/A'}
                </Text>
              </View>
            </View>
            <StatusIndicator status={item.status} approvalStatus={item.approvalStatus} />
          </View>

          {/* Dates */}
          <View style={{ 
            backgroundColor: colors.surfaceVariant, 
            padding: 12,
            borderRadius: 12,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{ gap: 4 }}>
              <Text style={{ fontSize: 12, color: colors.textMuted }}>Start Date</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                {item.startDate}
              </Text>
            </View>
            <View style={{ alignItems: 'flex-end', gap: 4 }}>
              <Text style={{ fontSize: 12, color: colors.textMuted }}>End Date</Text>
              <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>
                {item.endDate}
              </Text>
            </View>
          </View>

          {/* Assigned To */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="account-group" size={16} color={colors.textMuted} />
            <Text style={{ 
              fontSize: 14, 
              color: colors.textMuted,
              marginLeft: 8
            }}>
              Assigned to:{' '}
            </Text>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '600', 
              color: colors.text
            }}>
              {item.assignedTo}
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'flex-end', 
            gap: 8,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: colors.border
          }}>
            <TouchableOpacity
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: colors.border,
                borderRadius: 12
              }}
              onPress={() => setShowDetails(!showDetails)}
            >
              <Icon name="information-outline" size={16} color={colors.info} />
              <Text style={{ 
                color: colors.info, 
                fontWeight: '600',
                marginLeft: 8,
                fontSize: 14
              }}>
                Details
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center',
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: colors.border,
                borderRadius: 12
              }}
              onPress={() => console.log('Edit', item.id)}
            >
              <Icon name="pencil-outline" size={16} color={colors.info} />
              <Text style={{ 
                color: colors.info, 
                fontWeight: '600',
                marginLeft: 8,
                fontSize: 14
              }}>
                Edit
              </Text>
            </TouchableOpacity>
          </View>

          {/* Expanded Details */}
          {showDetails && (
            <Animated.View entering={FadeInUp} style={{ 
              backgroundColor: colors.surfaceVariant, 
              padding: 12,
              borderRadius: 12,
              marginTop: 8
            }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: colors.text,
                marginBottom: 8
              }}>
                Additional Details
              </Text>
              <View style={{ gap: 4 }}>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>
                  Activity ID: {item.id}
                </Text>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>
                  Approval Status: {item.approvalStatus}
                </Text>
                <Text style={{ fontSize: 12, color: colors.textMuted }}>
                  Progress: {item.progress}% Complete
                </Text>
              </View>
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>

      {/* Sub-activities */}
      {isExpanded && hasChildren && (
        <Animated.View entering={SlideInRight} style={{ marginTop: -8 }}>
          {item.subActivities.map((subItem) => (
            <ActivityCard
              key={subItem.id}
              item={subItem}
              level={level + 1}
              toggleExpand={toggleExpand}
              expandedItems={expandedItems}
            />
          ))}
        </Animated.View>
      )}
    </Animated.View>
  );
};

// Filter Modal Component
const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
  const [tempFilter, setTempFilter] = useState(currentFilter);

  const filters = ['All', 'Not Started', 'In Progress', 'Completed'];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
        <Animated.View entering={FadeInUp} style={{ 
          backgroundColor: colors.surface, 
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16
        }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 16
          }}>
            <Text style={{ 
              fontSize: 18, 
              fontWeight: '700', 
              color: colors.text 
            }}>
              Filter Activities
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
          
          <View style={{ gap: 8 }}>
            <Text style={{ 
              fontSize: 14, 
              fontWeight: '600', 
              color: colors.text 
            }}>
              Status
            </Text>
            {filters.map((status) => (
              <TouchableOpacity
                key={status}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: (tempFilter === status || (status === 'All' && !tempFilter)) 
                    ? colors.border 
                    : colors.surface,
                  borderWidth: 1,
                  borderColor: (tempFilter === status || (status === 'All' && !tempFilter)) 
                    ? colors.info 
                    : colors.border
                }}
                onPress={() => setTempFilter(status === 'All' ? null : status)}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: (tempFilter === status || (status === 'All' && !tempFilter))
                    ? colors.info
                    : colors.textSecondary
                }}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          <View style={{ 
            flexDirection: 'row', 
            gap: 8, 
            marginTop: 16 
          }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.border,
                padding: 12,
                borderRadius: 12,
                alignItems: 'center'
              }}
              onPress={onClose}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: colors.textSecondary 
              }}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: colors.info,
                padding: 12,
                borderRadius: 12,
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

// Main Activity Screen Component
const ActivityScreen = () => {
  const [expandedItems, setExpandedItems] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [filterStatus, setFilterStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const toggleExpand = useCallback((id) => {
    setExpandedItems(prev => {
      const newState = { ...prev };
      const activity = findActivityById(id, activities);
      
      if (newState[id]) {
        // If we're collapsing this item, also collapse all its children
        const childIds = getAllChildIds(activity);
        childIds.forEach(childId => {
          newState[childId] = false;
        });
      }
      
      // Toggle the current item
      newState[id] = !newState[id];
      return newState;
    });
  }, []);

  const handleSort = useCallback((key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  }, []);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const sortedAndFilteredActivities = useMemo(() => {
    let result = [...activities];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.actNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus) {
      result = result.filter(item => item.status === filterStatus);
    }
    
    // Apply sorting
    return result.sort((a, b) => {
      const aValue = a[sortConfig.key] || '';
      const bValue = b[sortConfig.key] || '';
      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [sortConfig, filterStatus, searchQuery]);

  if (isLoading) {
    return (
      <MainLayout title="Activity">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
          <View style={{ 
            backgroundColor: colors.surface, 
            padding: 32, 
            borderRadius: 16,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}>
            <ActivityIndicator size="large" color={colors.info} />
            <Text style={{ 
              marginTop: 16, 
              fontSize: 16, 
              fontWeight: '600', 
              color: colors.text 
            }}>
              Loading activities...
            </Text>
            <Text style={{ 
              marginTop: 8, 
              fontSize: 14, 
              color: colors.textMuted 
            }}>
              Please wait while we fetch your data
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Activity">
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
        <LinearGradient 
          colors={['#f0f7ff', '#e6f0ff']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ padding: 16 }}
        >
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
                color: colors.text 
              }}>
                Project Activities
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: colors.textMuted,
                marginTop: 4
              }}>
                {sortedAndFilteredActivities.length} activities • {filterStatus || 'All statuses'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: colors.surface, 
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
                onPress={handleRefresh}
              >
                <Icon name="refresh" size={20} color={colors.info} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: colors.info,
                  borderRadius: 12
                }}
                onPress={() => console.log('Add activity')}
              >
                <Icon name="plus" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search and Filter Row */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ 
              flex: 1,
              backgroundColor: colors.surface, 
              borderRadius: 12, 
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="magnify" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                <TextInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  placeholder="Search activities, IDs, or assignees..."
                  placeholderTextColor={colors.textMuted}
                  style={{ 
                    flex: 1, 
                    color: colors.text, 
                    fontSize: 14 
                  }}
                />
                {searchQuery.length > 0 && (
                  <TouchableOpacity onPress={() => setSearchQuery('')}>
                    <Icon name="close-circle" size={18} color={colors.textMuted} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={{ 
                minWidth: 60,
                backgroundColor: colors.info,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => setShowFilterModal(true)}
            >
              <Icon name="filter-outline" size={16} color="#ffffff" />
              {filterStatus && (
                <View style={{ 
                  marginLeft: 8, 
                  backgroundColor: '#ffffff', 
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8
                }}>
                  <Text style={{ 
                    fontSize: 12, 
                    color: colors.info,
                    fontWeight: '600'
                  }}>
                    {filterStatus}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Sort Controls */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={{ marginTop: 12 }}
            contentContainerStyle={{ gap: 8 }}
          >
            {[
              { key: 'name', label: 'Name' },
              { key: 'progress', label: 'Progress' },
              { key: 'status', label: 'Status' },
              { key: 'approvalStatus', label: 'Approval' }
            ].map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                onPress={() => handleSort(key)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  borderRadius: 12,
                  backgroundColor: sortConfig.key === key 
                    ? colors.info 
                    : colors.surface,
                  borderWidth: 1,
                  borderColor: sortConfig.key === key 
                    ? colors.info 
                    : colors.border
                }}
              >
                <Text style={{ 
                  fontSize: 12, 
                  color: sortConfig.key === key ? '#ffffff' : colors.textSecondary,
                  fontWeight: '600' 
                }}>
                  {label}
                </Text>
                {sortConfig.key === key && (
                  <Icon
                    name={sortConfig.direction === 'asc' ? 'arrow-up' : 'arrow-down'}
                    size={14}
                    color={sortConfig.key === key ? '#ffffff' : colors.textSecondary}
                    style={{ marginLeft: 4 }}
                  />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </LinearGradient>

        {/* Activities List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {sortedAndFilteredActivities.length > 0 ? (
            sortedAndFilteredActivities.map((item) => (
              <ActivityCard
                key={item.id}
                item={item}
                level={0}
                toggleExpand={toggleExpand}
                expandedItems={expandedItems}
              />
            ))
          ) : (
            <Animated.View 
              entering={FadeInUp}
              style={{ 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: 32,
                backgroundColor: colors.surface,
                borderRadius: 16,
                margin: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <Icon name="folder-search-outline" size={64} color={colors.textMuted} />
              <Text style={{ 
                fontSize: 18, 
                fontWeight: '600', 
                color: colors.text,
                marginTop: 16
              }}>
                No activities found
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: colors.textMuted,
                marginTop: 8,
                textAlign: 'center'
              }}>
                {searchQuery ? 
                  'Try adjusting your search terms or filters' : 
                  'Get started by creating your first activity'
                }
              </Text>
              <TouchableOpacity 
                style={{ 
                  backgroundColor: colors.info, 
                  paddingHorizontal: 24,
                  paddingVertical: 12,
                  borderRadius: 12,
                  marginTop: 16
                }}
                onPress={() => console.log('Add first activity')}
              >
                <Text style={{ 
                  color: '#ffffff', 
                  fontWeight: '600',
                  fontSize: 14
                }}>
                  Create Activity
                </Text>
              </TouchableOpacity>
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

export default ActivityScreen;