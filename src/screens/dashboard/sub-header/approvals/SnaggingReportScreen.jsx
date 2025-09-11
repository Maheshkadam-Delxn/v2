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

// Sample Snagging Report data
const snaggingData = [
  {
    snagId: 'PROJ-002-SNAG-00001',
    dateOfChecking: '2023-10-15',
    status: 'Open',
    responsibleParty: 'Contractor A',
    drawingReference: 'DRW-001',
    reportedBy: 'John Doe',
    description: 'Crack in the wall on the east side',
    location: 'Building A, Level 3'
  },
  {
    snagId: 'PROJ-002-SNAG-00002',
    dateOfChecking: '2023-10-16',
    status: 'In Progress',
    responsibleParty: 'Contractor B',
    drawingReference: 'DRW-002',
    reportedBy: 'Jane Smith',
    description: 'Leaking pipe in bathroom',
    location: 'Building B, Level 2'
  },
  {
    snagId: 'PROJ-002-SNAG-00003',
    dateOfChecking: '2023-10-17',
    status: 'Resolved',
    responsibleParty: 'Contractor C',
    drawingReference: 'DRW-003',
    reportedBy: 'Mike Johnson',
    description: 'Faulty electrical wiring',
    location: 'Building C, Level 1'
  },
  {
    snagId: 'PROJ-002-SNAG-00004',
    dateOfChecking: '2023-10-18',
    status: 'Closed',
    responsibleParty: 'Contractor A',
    drawingReference: 'DRW-004',
    reportedBy: 'Sarah Wilson',
    description: 'Damaged floor tiles',
    location: 'Building A, Level 4'
  }
];

// Status Indicator Component
const StatusIndicator = ({ status }) => {
  const statusConfig = {
    'Open': { color: '#f59e0b', bg: '#fef3c7', icon: 'alert-circle-outline' },
    'In Progress': { color: '#3b82f6', bg: '#dbeafe', icon: 'progress-clock' },
    'Resolved': { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
    'Closed': { color: '#6b7280', bg: '#f3f4f6', icon: 'lock-check' },
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

// Snagging Report Card Component
const SnaggingCard = ({ item, expanded, onToggle }) => {
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
                  {item.snagId}
                </Text>
                <Text style={{ 
                  fontSize: 13, 
                  color: '#3b82f6', // Medium blue
                  marginBottom: 8
                }}>
                  {item.location}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ 
                  fontSize: 12, 
                  color: '#3b82f6', // Medium blue
                  marginBottom: 4
                }}>
                  {item.dateOfChecking}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ 
                    fontSize: 12, 
                    color: '#3b82f6', // Medium blue
                    marginRight: 8
                  }}>
                    {item.responsibleParty}
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
                  Snagging Details
                </Text>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Date of Checking</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.dateOfChecking}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Status</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <StatusIndicator status={item.status} />
                    </View>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Responsible Party</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.responsibleParty}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Drawing Reference</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.drawingReference}</Text>
                  </View>
                </View>
                
                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Reported By</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.reportedBy}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Location</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.location}</Text>
                  </View>
                </View>
                
                <View style={{ marginTop: 8 }}>
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
                  onPress={() => console.log('View', item.snagId)}
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
                  onPress={() => console.log('Edit', item.snagId)}
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
                  onPress={() => console.log('Download', item.snagId)}
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
                  onPress={() => console.log('Email', item.snagId)}
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

  const filters = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];

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
              Filter Snagging Reports
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

// Dropdown Component
const Dropdown = ({ options, value, onSelect, placeholder, isOpen, onToggle }) => {
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 8,
          padding: 12
        }}
        onPress={onToggle}
      >
        <Text style={value ? { 
          fontSize: 14, 
          color: '#1f2937' 
        } : { 
          fontSize: 14, 
          color: '#9ca3af' 
        }}>
          {value || placeholder}
        </Text>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
      </TouchableOpacity>
      
      {isOpen && (
        <Animated.View entering={FadeInUp} style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 8,
          marginTop: 4,
          zIndex: 10,
          maxHeight: 200,
          overflow: 'hidden'
        }}>
          <ScrollView>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 12,
                  borderBottomWidth: index < options.length - 1 ? 1 : 0,
                  borderBottomColor: '#f3f4f6'
                }}
                onPress={() => {
                  onSelect(option);
                  onToggle();
                }}
              >
                <Text style={{ 
                  fontSize: 14, 
                  color: '#1f2937' 
                }}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
};

// Form Modal Component
const FormModal = ({ visible, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    dateOfChecking: '',
    status: '',
    responsibleParty: '',
    drawingReference: '',
    reportedBy: '',
    description: '',
    location: ''
  });
  
  const [dropdownsOpen, setDropdownsOpen] = useState({
    status: false,
    responsibleParty: false,
    drawingReference: false,
    reportedBy: false
  });

  // Sample data for dropdowns
  const statusOptions = ['Open', 'In Progress', 'Resolved', 'Closed'];
  const responsiblePartyOptions = ['Contractor A', 'Contractor B', 'Contractor C', 'Contractor D'];
  const drawingReferenceOptions = ['DRW-001', 'DRW-002', 'DRW-003', 'DRW-004', 'DRW-005'];
  const reportedByOptions = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'Robert Brown'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleDropdown = (dropdown) => {
    setDropdownsOpen(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.dateOfChecking || !formData.status || !formData.responsibleParty || 
        !formData.drawingReference || !formData.reportedBy || !formData.description || !formData.location) {
      alert('Please fill all required fields');
      return;
    }
    
    onSubmit(formData);
    setFormData({
      dateOfChecking: '',
      status: '',
      responsibleParty: '',
      drawingReference: '',
      reportedBy: '',
      description: '',
      location: ''
    });
  };

  const handleCancel = () => {
    setFormData({
      dateOfChecking: '',
      status: '',
      responsibleParty: '',
      drawingReference: '',
      reportedBy: '',
      description: '',
      location: ''
    });
    setDropdownsOpen({
      status: false,
      responsibleParty: false,
      drawingReference: false,
      reportedBy: false
    });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center', padding: 16 }}>
        <Animated.View entering={FadeInUp} style={{ 
          backgroundColor: '#ffffff', 
          borderRadius: 24,
          padding: 24,
          width: '100%',
          maxWidth: 500,
          maxHeight: '80%'
        }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: 20
            }}>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '700', 
                color: '#1f2937' 
              }}>
                Snagging Report
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            
            {/* Snag Id */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Snag Id
              </Text>
              <Text style={{ 
                fontSize: 16, 
                fontWeight: '600', 
                color: '#3b82f6' 
              }}>
                PROJ-002-SNAG-00001
              </Text>
            </View>

            {/* Date Of Checking */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Date Of Checking *
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 14,
                  color: '#1f2937'
                }}
                placeholder="Enter date (YYYY-MM-DD)"
                value={formData.dateOfChecking}
                onChangeText={(text) => handleInputChange('dateOfChecking', text)}
              />
            </View>

            {/* Status */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Status *
              </Text>
              <Dropdown
                options={statusOptions}
                value={formData.status}
                onSelect={(value) => handleInputChange('status', value)}
                placeholder="Select Status"
                isOpen={dropdownsOpen.status}
                onToggle={() => toggleDropdown('status')}
              />
            </View>

            {/* Responsible Party */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Responsible Party *
              </Text>
              <Dropdown
                options={responsiblePartyOptions}
                value={formData.responsibleParty}
                onSelect={(value) => handleInputChange('responsibleParty', value)}
                placeholder="Select Responsible Party"
                isOpen={dropdownsOpen.responsibleParty}
                onToggle={() => toggleDropdown('responsibleParty')}
              />
            </View>

            {/* Location */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Location *
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 14,
                  color: '#1f2937'
                }}
                placeholder="Enter location"
                value={formData.location}
                onChangeText={(text) => handleInputChange('location', text)}
              />
            </View>

            {/* Drawing Reference */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Drawing Reference *
              </Text>
              <Dropdown
                options={drawingReferenceOptions}
                value={formData.drawingReference}
                onSelect={(value) => handleInputChange('drawingReference', value)}
                placeholder="Select Drawing Reference"
                isOpen={dropdownsOpen.drawingReference}
                onToggle={() => toggleDropdown('drawingReference')}
              />
            </View>

            {/* Reported By */}
            <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Reported By *
              </Text>
              <Dropdown
                options={reportedByOptions}
                value={formData.reportedBy}
                onSelect={(value) => handleInputChange('reportedBy', value)}
                placeholder="Select Reported By"
                isOpen={dropdownsOpen.reportedBy}
                onToggle={() => toggleDropdown('reportedBy')}
              />
            </View>

            {/* Description */}
            <View style={{ marginBottom: 24 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Enter Description *
              </Text>
              <TextInput
                style={{
                  borderWidth: 1,
                  borderColor: '#d1d5db',
                  borderRadius: 8,
                  padding: 12,
                  fontSize: 14,
                  color: '#1f2937',
                  height: 100,
                  textAlignVertical: 'top'
                }}
                placeholder="Enter description"
                multiline={true}
                value={formData.description}
                onChangeText={(text) => handleInputChange('description', text)}
              />
            </View>

            {/* Buttons */}
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'flex-end',
              gap: 12
            }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: 16,
                  borderRadius: 16,
                  minWidth: 100,
                  alignItems: 'center'
                }}
                onPress={handleCancel}
              >
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '600', 
                  color: '#374151' 
                }}>
                  Close
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3b82f6',
                  padding: 16,
                  borderRadius: 16,
                  minWidth: 100,
                  alignItems: 'center'
                }}
                onPress={handleSubmit}
              >
                <Text style={{ 
                  fontSize: 14, 
                  fontWeight: '600', 
                  color: '#ffffff' 
                }}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Main Snagging Report Screen Component
const SnaggingReportScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [snaggingList, setSnaggingList] = useState(snaggingData);

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const toggleItem = useCallback((snagId) => {
    setExpandedItems(prev => ({
      ...prev,
      [snagId]: !prev[snagId]
    }));
  }, []);

  const handleFormSubmit = useCallback((formData) => {
    // Generate a new snag ID
    const newSnagId = `PROJ-002-SNAG-${String(snaggingList.length + 1).padStart(5, '0')}`;
    
    // Add the new snag to the list
    const newSnag = {
      snagId: newSnagId,
      ...formData
    };
    
    setSnaggingList(prev => [newSnag, ...prev]);
    setShowFormModal(false);
  }, [snaggingList.length]);

  const filteredSnaggingList = useMemo(() => {
    let result = [...snaggingList];
    
    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(item => 
        item.snagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterStatus) {
      result = result.filter(item => item.status === filterStatus);
    }
    
    return result;
  }, [filterStatus, searchQuery, snaggingList]);

  if (isLoading) {
    return (
      <MainLayout title="Snagging Report">
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
              Loading snagging reports...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Snagging Report">
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
                Snagging Report
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {filteredSnaggingList.length} snagging reports • {filterStatus || 'All statuses'}
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
                  placeholder="Search snag IDs, locations..."
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

            {/* Add Button */}
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
              onPress={() => setShowFormModal(true)}
            >
              <Icon name="plus" size={16} color="#1e40af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Snagging Report List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredSnaggingList.length > 0 ? (
            filteredSnaggingList.map((item) => (
              <SnaggingCard
                key={item.snagId}
                item={item}
                expanded={expandedItems[item.snagId]}
                onToggle={() => toggleItem(item.snagId)}
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
                No snagging reports found
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: '#9ca3af',
                marginTop: 8,
                textAlign: 'center'
              }}>
                {searchQuery ? 
                  'Try adjusting your search terms or filters' : 
                  'No snagging reports available'
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

        {/* Form Modal */}
        <FormModal
          visible={showFormModal}
          onClose={() => setShowFormModal(false)}
          onSubmit={handleFormSubmit}
        />
      </View>
    </MainLayout>
  );
};

export default SnaggingReportScreen;