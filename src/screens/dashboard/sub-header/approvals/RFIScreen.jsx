// import React from 'react';
//   import { View, Text } from 'react-native';

//   export default function RFIScreen() {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <Text className="text-2xl font-bold text-gray-800">Bill of Quantity</Text>
//         <Text className="text-gray-600 mt-2">Manage your bill of quantities here.</Text>
//       </View>
//     );
//   }

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

// Sample RFI data based on the image content
const rfiData = [
  {
    id: 'RFI-001',
    title: 'Foundation Reinforcement Query',
    project: 'GH101',
    category: 'Structural',
    status: 'Open',
    date: '2023-10-15',
    assignedTo: 'John Doe',
    priority: 'High',
    description: 'Clarification needed for reinforcement specifications in section 4.5 of structural drawings.'
  },
  {
    id: 'RFI-002',
    title: 'Electrical Conduit Routing',
    project: 'GH101',
    category: 'General',
    status: 'Answered',
    date: '2023-10-12',
    assignedTo: 'Jane Smith',
    priority: 'Medium',
    description: 'Need confirmation on conduit routing through structural beams in level 3.'
  },
  {
    id: 'RFI-003',
    title: 'Concrete Mix Design Approval',
    project: 'GH101',
    category: 'Structural',
    status: 'Closed',
    date: '2023-10-08',
    assignedTo: 'Robert Johnson',
    priority: 'High',
    description: 'Request for approval of alternative concrete mix design for columns.'
  },
  {
    id: 'RFI-004',
    title: 'HVAC Equipment Location',
    project: 'GH102',
    category: 'General',
    status: 'Open',
    date: '2023-10-05',
    assignedTo: 'Sarah Wilson',
    priority: 'Low',
    description: 'Clarification needed for HVAC equipment room dimensions and access requirements.'
  }
];

// Status Indicator Component
const StatusIndicator = ({ status }) => {
  const statusConfig = {
    'Open': { color: '#f59e0b', bg: '#fef3c7', icon: 'clock-outline' },
    'Answered': { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
    'Closed': { color: '#6b7280', bg: '#f3f4f6', icon: 'lock' },
  };

  const statusCfg = statusConfig[status] || statusConfig['Open'];

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

// Priority Indicator Component
const PriorityIndicator = ({ priority }) => {
  const priorityConfig = {
    'High': { color: '#ef4444', icon: 'arrow-up-bold' },
    'Medium': { color: '#f59e0b', icon: 'minus' },
    'Low': { color: '#10b981', icon: 'arrow-down-bold' },
  };

  const priorityCfg = priorityConfig[priority] || priorityConfig['Medium'];

  return (
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'center',
    }}>
      <Icon name={priorityCfg.icon} size={14} color={priorityCfg.color} style={{ marginRight: 4 }} />
      <Text style={{ 
        fontSize: 12, 
        fontWeight: '600', 
        color: priorityCfg.color 
      }}>
        {priority}
      </Text>
    </View>
  );
};

// RFI Card Component
const RFICard = ({ item, expanded, onToggle }) => {
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
                  {item.id}
                </Text>
                <Text style={{ 
                  fontSize: 16, 
                  color: '#3b82f6', // Medium blue
                  marginBottom: 8
                }}>
                  {item.title}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ 
                  fontSize: 12, 
                  color: '#3b82f6', // Medium blue
                  marginBottom: 8
                }}>
                  {item.date}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <StatusIndicator status={item.status} />
                  <PriorityIndicator priority={item.priority} />
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
                  RFI Details
                </Text>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Project</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.project}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Category</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.category}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Assigned To</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.assignedTo}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Date</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.date}</Text>
                  </View>
                </View>
                
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Description</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.description}</Text>
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
                  onPress={() => console.log('View', item.id)}
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
                  onPress={() => console.log('Edit', item.id)}
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
                  onPress={() => console.log('Respond', item.id)}
                >
                  <Icon name="reply" size={20} color="#f59e0b" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#f59e0b', fontWeight: '600' }}>Respond</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{ 
                    flexDirection: 'row', 
                    alignItems: 'center',
                    padding: 8
                  }}
                  onPress={() => console.log('Close', item.id)}
                >
                  <Icon name="lock" size={20} color="#6b7280" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#6b7280', fontWeight: '600' }}>Close</Text>
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

  const statusFilters = ['All', 'Open', 'Answered', 'Closed'];
  const categoryFilters = ['All', 'Structural', 'General'];

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
              Filter RFIs
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>
          
          <View style={{ gap: 16 }}>
            <View>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 12
              }}>
                Status
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {statusFilters.map((status) => (
                  <TouchableOpacity
                    key={status}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 16,
                      borderWidth: 2,
                      borderColor: (tempFilter?.status === status || (status === 'All' && !tempFilter?.status)) 
                        ? '#3b82f6' 
                        : '#e5e7eb',
                      backgroundColor: (tempFilter?.status === status || (status === 'All' && !tempFilter?.status)) 
                        ? '#eff6ff' 
                        : '#ffffff'
                    }}
                    onPress={() => setTempFilter(prev => ({
                      ...prev,
                      status: status === 'All' ? null : status
                    }))}
                  >
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: (tempFilter?.status === status || (status === 'All' && !tempFilter?.status))
                        ? '#3b82f6'
                        : '#374151'
                    }}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            
            <View>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 12
              }}>
                Category
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {categoryFilters.map((category) => (
                  <TouchableOpacity
                    key={category}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 16,
                      borderWidth: 2,
                      borderColor: (tempFilter?.category === category || (category === 'All' && !tempFilter?.category)) 
                        ? '#3b82f6' 
                        : '#e5e7eb',
                      backgroundColor: (tempFilter?.category === category || (category === 'All' && !tempFilter?.category)) 
                        ? '#eff6ff' 
                        : '#ffffff'
                    }}
                    onPress={() => setTempFilter(prev => ({
                      ...prev,
                      category: category === 'All' ? null : category
                    }))}
                  >
                    <Text style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: (tempFilter?.category === category || (category === 'All' && !tempFilter?.category))
                        ? '#3b82f6'
                        : '#374151'
                    }}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
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

// Main RFI Screen Component
const RFIScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filter, setFilter] = useState({});
  const [expandedItems, setExpandedItems] = useState({});
  const [activeTab, setActiveTab] = useState('All');

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

  const filteredRFIList = useMemo(() => {
    let result = [...rfiData];
    
    // Apply tab filter
    if (activeTab !== 'All') {
      result = result.filter(item => item.category === activeTab);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filter.status) {
      result = result.filter(item => item.status === filter.status);
    }
    
    // Apply category filter
    if (filter.category) {
      result = result.filter(item => item.category === filter.category);
    }
    
    return result;
  }, [filter, searchQuery, activeTab]);

  if (isLoading) {
    return (
      <MainLayout title="RFI">
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
              Loading RFIs...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="RFI">
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        {/* Header - Matching the inventory screen header */}
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
                RFI
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {filteredRFIList.length} RFIs • {filter.status || 'All statuses'}
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
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: 12 
                }}
                onPress={() => console.log('Add new RFI')}
              >
                <Icon name="plus" size={18} color="#1e40af" />
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
                  placeholder="Search RFIs..."
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
              {(filter.status || filter.category) && (
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
                    {(filter.status ? 1 : 0) + (filter.category ? 1 : 0)}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={{ 
          flexDirection: 'row', 
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: '#e5e7eb'
        }}>
          {['All', 'Structural', 'General'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={{
                flex: 1,
                paddingVertical: 16,
                alignItems: 'center',
                borderBottomWidth: 2,
                borderBottomColor: activeTab === tab ? '#3b82f6' : 'transparent'
              }}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={{
                fontSize: 14,
                fontWeight: '600',
                color: activeTab === tab ? '#3b82f6' : '#6b7280'
              }}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* RFI List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredRFIList.length > 0 ? (
            filteredRFIList.map((item) => (
              <RFICard
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
                No RFIs found
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#9ca3af',
                marginTop: 8,
                textAlign: 'center'
              }}>
                {searchQuery || filter.status || filter.category ? 
                  'Try adjusting your search terms or filters' : 
                  'No RFIs available'
                }
              </Text>
            </Animated.View>
          )}
        </ScrollView>

        {/* Filter Modal */}
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          currentFilter={filter}
          onApplyFilter={setFilter}
        />
      </View>
    </MainLayout>
  );
};

export default RFIScreen;