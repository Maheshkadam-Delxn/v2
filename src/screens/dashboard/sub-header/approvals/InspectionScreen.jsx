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

// Updated tabs based on your request
const tabs = [
  { key: 'all', label: 'All' },
  { key: 'excavation', label: 'Excavation' },
  { key: 'work', label: 'Work' },
  { key: 'material', label: 'Material' },
];

// Sample inspection data with types
const inspectionData = [
  {
    id: '1',
    referenceNo: 'GH101-IR-00004',
    title: 'New Work Inspection',
    revision: '1',
    raisedBy: 'Sonalika',
    raisedTo: 'Martin, Mukesh Sinha',
    raisedDate: '2025-08-20',
    description: 'New Work Inspection',
    status: 'pending',
    type: 'Work Inspection'
  },
  {
    id: '2',
    referenceNo: 'GH101-IR-00005',
    title: 'Structural Inspection',
    revision: '2',
    raisedBy: 'Rajesh',
    raisedTo: 'John, Michael',
    raisedDate: '2025-08-21',
    description: 'Structural integrity check',
    status: 'completed',
    type: 'Work Inspection'
  },
  {
    id: '3',
    referenceNo: 'GH101-IR-00006',
    title: 'Electrical Inspection',
    revision: '1',
    raisedBy: 'Priya',
    raisedTo: 'David, Robert',
    raisedDate: '2025-08-22',
    description: 'Electrical systems verification',
    status: 'inProgress',
    type: 'Work Inspection'
  },
  {
    id: '4',
    referenceNo: 'GH101-EX-00001',
    title: 'Foundation Excavation',
    revision: '1',
    raisedBy: 'Construction Team',
    raisedTo: 'Site Inspector',
    raisedDate: '2025-08-23',
    description: 'Foundation excavation inspection',
    status: 'pending',
    type: 'Excavation Inspection'
  },
  {
    id: '5',
    referenceNo: 'GH101-MT-00001',
    title: 'Concrete Material Check',
    revision: '1',
    raisedBy: 'Quality Control',
    raisedTo: 'Materials Department',
    raisedDate: '2025-08-24',
    description: 'Concrete quality verification',
    status: 'completed',
    type: 'Material Inspection'
  }
];

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: '#f59e0b', bgColor: '#fef3c7', text: 'Pending' },
    completed: { color: '#10b981', bgColor: '#d1fae5', text: 'Completed' },
    inProgress: { color: '#3b82f6', bgColor: '#dbeafe', text: 'In Progress' },
    rejected: { color: '#ef4444', bgColor: '#fee2e2', text: 'Rejected' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <View style={{
      flexDirection: 'row', 
      alignItems: 'center',
      backgroundColor: config.bgColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      alignSelf: 'flex-start'
    }}>
      <View style={{
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: config.color,
        marginRight: 4
      }} />
      <Text style={{ 
        fontSize: 12, 
        fontWeight: '600', 
        color: config.color 
      }}>
        {config.text}
      </Text>
    </View>
  );
};

// Inspection Card Component (Restructured to match Work Order cards)
const InspectionCard = ({ item, expanded, onToggle }) => {
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
        {/* Header - Matching Work Order card structure */}
        <TouchableOpacity onPress={onToggle}>
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
                  {item.referenceNo}
                </Text>
                <Text style={{ 
                  fontSize: 13, 
                  color: '#3b82f6',
                  marginBottom: 8
                }}>
                  {item.title}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ 
                  fontSize: 12, 
                  color: '#3b82f6',
                  marginBottom: 4
                }}>
                  Rev: {item.revision}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <StatusBadge status={item.status} />
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
                  Inspection Details
                </Text>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Raised By</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.raisedBy}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Raised To</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.raisedTo}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Raised Date</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.raisedDate}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Type</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.type}</Text>
                  </View>
                </View>
                
                <View style={{ marginBottom: 8 }}>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Description</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.description}</Text>
                </View>
              </View>
              
              {/* Action Buttons - Updated with all seven buttons */}
          <View style={{ 
  flexDirection: 'row', 
  justifyContent: 'space-between',
  backgroundColor: '#ffffff', 
  borderRadius: 12, 
  padding: 16
}}>
  {/* Edit Button */}
  <TouchableOpacity 
    style={{ 
      alignItems: 'center',
      padding: 8,
      flex: 1
    }}
    onPress={() => console.log('Edit', item.referenceNo)}
  >
    <Icon name="pencil-outline" size={24} color="#10b981" />
  </TouchableOpacity>
  
  {/* Audit Button */}
  <TouchableOpacity 
    style={{ 
      alignItems: 'center',
      padding: 8,
      flex: 1
    }}
    onPress={() => console.log('Audit', item.referenceNo)}
  >
    <Icon name="clipboard-check-outline" size={24} color="#8b5cf6" />
  </TouchableOpacity>
  
  {/* Workflow Button */}
  <TouchableOpacity 
    style={{ 
      alignItems: 'center',
      padding: 8,
      flex: 1
    }}
    onPress={() => console.log('Workflow', item.referenceNo)}
  >
    <Icon name="graph-outline" size={24} color="#f97316" />
  </TouchableOpacity>
  
  {/* Delete Button */}
  <TouchableOpacity 
    style={{ 
      alignItems: 'center',
      padding: 8,
      flex: 1
    }}
    onPress={() => console.log('Delete', item.referenceNo)}
  >
    <Icon name="delete-outline" size={24} color="#ef4444" />
  </TouchableOpacity>
  
  {/* Preview Files Button */}
  <TouchableOpacity 
    style={{ 
      alignItems: 'center',
      padding: 8,
      flex: 1
    }}
    onPress={() => console.log('Preview Files', item.referenceNo)}
  >
    <Icon name="file-document-outline" size={24} color="#3b82f6" />
  </TouchableOpacity>
  
  {/* Email Button */}
  <TouchableOpacity 
    style={{ 
      alignItems: 'center',
      padding: 8,
      flex: 1
    }}
    onPress={() => console.log('Email', item.referenceNo)}
  >
    <Icon name="email-outline" size={24} color="#6366f1" />
  </TouchableOpacity>
  
  {/* Comment Button */}
  <TouchableOpacity 
    style={{ 
      alignItems: 'center',
      padding: 8,
      flex: 1
    }}
    onPress={() => console.log('Comment', item.referenceNo)}
  >
    <Icon name="comment-text-outline" size={24} color="#06b6d4" />
  </TouchableOpacity>
</View>
            </View>
          </Animated.View>
        )}
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
    <Icon name="clipboard-list-outline" size={64} color="#d1d5db" />
    <Text style={{ 
      fontSize: 18, 
      fontWeight: '600', 
      color: '#6b7280',
      marginTop: 16
    }}>
      No inspections found
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

// Main Work Inspection Screen Component
const WorkInspectionScreen = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const filteredInspections = useMemo(() => {
    let result = [...inspectionData];
    
    // Apply tab filter
    if (activeTab !== 'all') {
      result = result.filter(item => {
        if (activeTab === 'excavation') {
          return item.type === 'Excavation Inspection';
        } else if (activeTab === 'work') {
          return item.type === 'Work Inspection';
        } else if (activeTab === 'material') {
          return item.type === 'Material Inspection';
        }
        return true;
      });
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.referenceNo.toLowerCase().includes(query) ||
        item.raisedBy.toLowerCase().includes(query) ||
        item.raisedTo.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [searchQuery, activeTab]);

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
              Loading inspections...
            </Text>
          </View>
        </View>
      );
    }

    return (
      <ScrollView 
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredInspections.length > 0 ? (
          filteredInspections.map((item) => (
            <InspectionCard
              key={item.id}
              item={item}
              expanded={expandedItems[item.id]}
              onToggle={() => toggleItem(item.id)}
            />
          ))
        ) : (
          <EmptyState 
            searchQuery={searchQuery} 
            tabName={tabs.find(tab => tab.key === activeTab)?.label || 'inspections'} 
          />
        )}
      </ScrollView>
    );
  };

  return (
    <MainLayout title="Work Inspection">
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
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '700', 
                color: '#1e40af' 
              }}>
                Work Inspection
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {filteredInspections.length} inspections
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
                onPress={() => console.log('Add new inspection')}
              >
                <Icon name="plus" size={18} color="#1e40af" />
              </TouchableOpacity>
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
              placeholder="Search inspections..."
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
                borderBottomColor: activeTab === tab.key ? '#3b82f6' : 'transparent',
                flex: 1,
                alignItems: 'center'
              }}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: activeTab === tab.key ? '600' : '400',
                color: activeTab === tab.key ? '#3b82f6' : '#6b7280',
                textAlign: 'center'
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {renderContent()}
      </View>
    </MainLayout>
  );
};

export default WorkInspectionScreen;