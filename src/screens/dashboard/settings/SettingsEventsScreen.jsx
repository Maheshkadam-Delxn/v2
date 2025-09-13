import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  ActivityIndicator,
  TextInput,
  Modal,
  Switch
} from 'react-native';
import MainLayout from '../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeOut, 
  FadeInUp 
} from 'react-native-reanimated';

export default function SettingsEventsScreen() {
  const [expandedCards, setExpandedCards] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  
  // Form state
  const [project, setProject] = useState('');
  const [module, setModule] = useState('');
  const [actionType, setActionType] = useState('');
  const [specific, setSpecific] = useState('');
  const [sentTo, setSentTo] = useState('');
  const [alertType, setAlertType] = useState([]);
  const [message, setMessage] = useState('');
  const [isActive, setIsActive] = useState(true);
  
  // Filter state
  const [filterProject, setFilterProject] = useState('');
  const [filterModule, setFilterModule] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  
  // Dropdown visibility states
  const [showProjectDropdown, setShowProjectDropdown] = useState(false);
  const [showModuleDropdown, setShowModuleDropdown] = useState(false);
  const [showActionTypeDropdown, setShowActionTypeDropdown] = useState(false);
  const [showSpecificDropdown, setShowSpecificDropdown] = useState(false);
  const [showSentToDropdown, setShowSentToDropdown] = useState(false);
  const [showAlertTypeDropdown, setShowAlertTypeDropdown] = useState(false);
  
  // Dropdown options
  const projectOptions = [
    {label: 'Granite Horizon', value: 'granite_horizon'},
    {label: 'Project B', value: 'project_b'},
    {label: 'Project C', value: 'project_c'},
  ];
  
  const moduleOptions = [
    {label: 'RFI', value: 'rfi'},
    {label: 'Submittal Log', value: 'submittal_log'},
    {label: 'Activity', value: 'activity'},
    {label: 'BOQ', value: 'boq'},
  ];
  
  const actionTypeOptions = [
    {label: 'Created', value: 'created'},
    {label: 'Updated', value: 'updated'},
    {label: 'Deleted', value: 'deleted'},
    {label: 'Approved', value: 'approved'},
    {label: 'Rejected', value: 'rejected'},
  ];
  
  const specificOptions = [
    {label: 'Specific Option 1', value: 'specific_1'},
    {label: 'Specific Option 2', value: 'specific_2'},
    {label: 'Specific Option 3', value: 'specific_3'},
  ];
  
  const sentToOptions = [
    {label: 'Mukesh Sinha', value: 'mukesh_sinha'},
    {label: 'Project Team', value: 'project_team'},
    {label: 'All Members', value: 'all_members'},
    {label: 'Finance Team', value: 'finance_team'},
  ];
  
  const alertTypeOptions = [
    {label: 'SMS', value: 'sms'},
    {label: 'Mail', value: 'mail'},
    {label: 'Notification', value: 'notification'},
  ];

  // Initial events data
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'RFI Creation',
      module: 'RFI',
      project: 'Granite Horizon',
      actionType: 'Created',
      alertType: 'Mail, Notification',
      sentTo: 'Mukesh Sinha',
      message: '{{Title}} {{From_User}}{{To_User}}\n{{Submission_Date}}\n{{Expected_Reply.Date}}{{Priority}}\n{{Time_Impact}}{{Cost_Impact}}>{{Status}}\n{{Project}}={{Category}}{{Description}}\n{{Reference_Number}}',
      isActive: true
    },
    {
      id: 2,
      name: 'Submittal Log creation',
      module: 'Submittal Log',
      project: 'Granite Horizon',
      actionType: 'Created',
      alertType: 'Mail, Notification',
      sentTo: 'Project Team',
      message: '{{Document_Number}} {{Submittal_No}}{{Status}}{{Date}}{{Revision}}{{Document_Title}}{{Location}}{{Project}}{{Description}}{{Descipline}}',
      isActive: true
    },
    {
      id: 3,
      name: 'Activity created',
      module: 'Activity',
      project: 'Granite Horizon',
      actionType: 'Created',
      alertType: 'Notification',
      sentTo: 'All Members',
      message: 'New activity has been created in the system',
      isActive: true
    },
    {
      id: 4,
      name: 'BOQ Updated',
      module: 'BOQ',
      project: 'Granite Horizon',
      actionType: 'Updated',
      alertType: 'Mail, Notification',
      sentTo: 'Finance Team',
      message: 'Bill of Quantities has been updated with new items',
      isActive: true
    }
  ]);

  const toggleCard = (index) => {
    setExpandedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };
  
  const handleAddEvent = () => {
    // Validate all required fields
    if (!project || !module || !actionType || !sentTo || alertType.length === 0) {
      alert('Please fill all required fields');
      return;
    }
    
    const newEvent = {
      id: events.length + 1,
      name: `${module} ${actionType}`,
      module: moduleOptions.find(opt => opt.value === module)?.label,
      project: projectOptions.find(opt => opt.value === project)?.label,
      actionType: actionTypeOptions.find(opt => opt.value === actionType)?.label,
      alertType: alertType.map(type => alertTypeOptions.find(opt => opt.value === type)?.label).join(', '),
      sentTo: sentToOptions.find(opt => opt.value === sentTo)?.label,
      message,
      isActive
    };
    
    setEvents([...events, newEvent]);
    
    // Reset form and close modal
    resetForm();
    setShowAddModal(false);
  };
  
  const handleEditEvent = () => {
    if (!project || !module || !actionType || !sentTo || alertType.length === 0) {
      alert('Please fill all required fields');
      return;
    }
    
    const updatedEvents = events.map(event => {
      if (event.id === editingEvent.id) {
        return {
          ...event,
          name: `${module} ${actionType}`,
          module: moduleOptions.find(opt => opt.value === module)?.label,
          project: projectOptions.find(opt => opt.value === project)?.label,
          actionType: actionTypeOptions.find(opt => opt.value === actionType)?.label,
          alertType: alertType.map(type => alertTypeOptions.find(opt => opt.value === type)?.label).join(', '),
          sentTo: sentToOptions.find(opt => opt.value === sentTo)?.label,
          message,
          isActive
        };
      }
      return event;
    });
    
    setEvents(updatedEvents);
    resetForm();
    setShowAddModal(false);
    setEditingEvent(null);
  };
  
  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };
  
  const handleToggleEventStatus = (id) => {
    setEvents(events.map(event => {
      if (event.id === id) {
        return { ...event, isActive: !event.isActive };
      }
      return event;
    }));
  };
  
  const openEditModal = (event) => {
    setEditingEvent(event);
    
    // Pre-fill form with event data
    setProject(projectOptions.find(opt => opt.label === event.project)?.value || '');
    setModule(moduleOptions.find(opt => opt.label === event.module)?.value || '');
    setActionType(actionTypeOptions.find(opt => opt.label === event.actionType)?.value || '');
    setSentTo(sentToOptions.find(opt => opt.label === event.sentTo)?.value || '');
    setMessage(event.message);
    setIsActive(event.isActive);
    
    // Parse alert types
    const alertTypes = event.alertType.split(', ').map(type => {
      const found = alertTypeOptions.find(opt => opt.label === type);
      return found ? found.value : '';
    }).filter(Boolean);
    
    setAlertType(alertTypes);
    
    setShowAddModal(true);
  };
  
  const resetForm = () => {
    setProject('');
    setModule('');
    setActionType('');
    setSpecific('');
    setSentTo('');
    setAlertType([]);
    setMessage('');
    setIsActive(true);
    setEditingEvent(null);
  };
  
  const toggleAlertType = (type) => {
    if (alertType.includes(type)) {
      setAlertType(alertType.filter(t => t !== type));
    } else {
      setAlertType([...alertType, type]);
    }
  };

  const applyFilters = () => {
    // In a real app, you would filter the events based on the filter criteria
    // For this example, we'll just log the filter values and close the modal
    console.log('Applying filters:', {
      project: filterProject,
      module: filterModule,
      status: filterStatus
    });
    
    setShowFilterModal(false);
  };
  
  const resetFilters = () => {
    setFilterProject('');
    setFilterModule('');
    setFilterStatus('');
  };

  const filteredEvents = events.filter(event => {
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (
        !event.name.toLowerCase().includes(query) &&
        !event.module.toLowerCase().includes(query) &&
        !event.project.toLowerCase().includes(query) &&
        !event.actionType.toLowerCase().includes(query) &&
        !event.sentTo.toLowerCase().includes(query)
      ) {
        return false;
      }
    }
    
    // Apply other filters
    if (filterProject && event.project !== filterProject) return false;
    if (filterModule && event.module !== filterModule) return false;
    if (filterStatus) {
      if (filterStatus === 'active' && !event.isActive) return false;
      if (filterStatus === 'inactive' && event.isActive) return false;
    }
    
    return true;
  });

  if (isLoading) {
    return (
      <MainLayout title="Events">
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
              Loading events...
            </Text>
          </View>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Events">
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
                Events
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {filteredEvents.length} events • All statuses
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              {/* Plus Button */}
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: 12 
                }}
                onPress={() => {
                  resetForm();
                  setShowAddModal(true);
                }}
              >
                <Icon name="plus" size={18} color="#1e40af" />
              </TouchableOpacity>
              
              {/* Refresh Button */}
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
                  placeholder="Search events..."
                  placeholderTextColor="#6b7280"
                  style={{ 
                    flex: 1, 
                    color: '#1e40af', 
                    fontSize: 14,
                    paddingVertical: 8
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
            </TouchableOpacity>
          </View>
        </View>

        {/* Events List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredEvents.map((event, index) => (
            <Animated.View 
              key={event.id} 
              entering={FadeInDown.duration(500)}
              style={{
                borderRadius: 20,
                backgroundColor: '#ffffff',
                marginBottom: 16,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 4,
              }}
            >
              {/* Header - Applying light blue theme */}
              <TouchableOpacity onPress={() => toggleCard(index)}>
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
                        {event.name}
                      </Text>
                      <Text style={{ 
                        fontSize: 13, 
                        color: '#3b82f6',
                        marginBottom: 8
                      }}>
                        Module: {event.module}
                      </Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ 
                        fontSize: 13, 
                        color: '#3b82f6',
                        marginBottom: 8
                      }}>
                        {event.project}
                      </Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon 
                          name={expandedCards[index] ? 'chevron-up' : 'chevron-down'} 
                          size={24} 
                          color="#1e40af" 
                          style={{ marginLeft: 12 }} 
                        />
                      </View>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Expanded Content */}
              {expandedCards[index] && (
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
                        Event Details
                      </Text>
                      
                      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>Action Type</Text>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{event.actionType}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>Alert Type</Text>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{event.alertType}</Text>
                        </View>
                      </View>
                      
                      <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>Sent To</Text>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{event.sentTo}</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>Status</Text>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                            {event.isActive ? 'Active' : 'Inactive'}
                          </Text>
                        </View>
                      </View>
                      
                      <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                          <Text style={{ fontSize: 12, color: '#6b7280' }}>Message Template</Text>
                          <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                            {event.message}
                          </Text>
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
                        onPress={() => openEditModal(event)}
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
                        onPress={() => handleToggleEventStatus(event.id)}
                      >
                        <Icon 
                          name={event.isActive ? "toggle-switch" : "toggle-switch-off"} 
                          size={24} 
                          color={event.isActive ? "#10b981" : "#6b7280"} 
                          style={{ marginRight: 8 }} 
                        />
                        <Text style={{ color: event.isActive ? '#10b981' : '#6b7280', fontWeight: '600' }}>
                          {event.isActive ? 'Disable' : 'Enable'}
                        </Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={{ 
                          flexDirection: 'row', 
                          alignItems: 'center',
                          padding: 8
                        }}
                        onPress={() => handleDeleteEvent(event.id)}
                      >
                        <Icon name="delete-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
                        <Text style={{ color: '#ef4444', fontWeight: '600' }}>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Animated.View>
              )}
            </Animated.View>
          ))}
        </ScrollView>

        {/* Add/Edit Event Modal */}
        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowAddModal(false);
            setEditingEvent(null);
            resetForm();
          }}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
            <View style={{ 
              backgroundColor: 'white', 
              borderTopLeftRadius: 20, 
              borderTopRightRadius: 20,
              maxHeight: Dimensions.get('window').height * 0.9,
              padding: 20
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e40af' }}>
                  {editingEvent ? 'Edit Event' : 'New Event'}
                </Text>
                <TouchableOpacity onPress={() => {
                  setShowAddModal(false);
                  setEditingEvent(null);
                  resetForm();
                }}>
                  <Icon name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>
              
              <ScrollView>
                {/* Project Dropdown */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>Project *</Text>
                  <TouchableOpacity 
                    style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      padding: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onPress={() => setShowProjectDropdown(!showProjectDropdown)}
                  >
                    <Text style={{ color: project ? '#374151' : '#9ca3af' }}>
                      {project ? projectOptions.find(opt => opt.value === project)?.label : 'Select Project'}
                    </Text>
                    <Icon name={showProjectDropdown ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
                  </TouchableOpacity>
                  
                  {showProjectDropdown && (
                    <View style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      marginTop: 4,
                      backgroundColor: 'white',
                      maxHeight: 150
                    }}>
                      <ScrollView>
                        {projectOptions.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{ 
                              padding: 12,
                              borderBottomWidth: index < projectOptions.length - 1 ? 1 : 0,
                              borderBottomColor: '#f3f4f6'
                            }}
                            onPress={() => {
                              setProject(option.value);
                              setShowProjectDropdown(false);
                            }}
                          >
                            <Text style={{ color: '#374151' }}>{option.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
                
                {/* Module Dropdown */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>Module *</Text>
                  <TouchableOpacity 
                    style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      padding: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onPress={() => setShowModuleDropdown(!showModuleDropdown)}
                  >
                    <Text style={{ color: module ? '#374151' : '#9ca3af' }}>
                      {module ? moduleOptions.find(opt => opt.value === module)?.label : 'Select Module'}
                    </Text>
                    <Icon name={showModuleDropdown ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
                  </TouchableOpacity>
                  
                  {showModuleDropdown && (
                    <View style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      marginTop: 4,
                      backgroundColor: 'white',
                      maxHeight: 150
                    }}>
                      <ScrollView>
                        {moduleOptions.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{ 
                              padding: 12,
                              borderBottomWidth: index < moduleOptions.length - 1 ? 1 : 0,
                              borderBottomColor: '#f3f4f6'
                            }}
                            onPress={() => {
                              setModule(option.value);
                              setShowModuleDropdown(false);
                            }}
                          >
                            <Text style={{ color: '#374151' }}>{option.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
                
                {/* Action Type Dropdown */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>Action Type *</Text>
                  <TouchableOpacity 
                    style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      padding: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onPress={() => setShowActionTypeDropdown(!showActionTypeDropdown)}
                  >
                    <Text style={{ color: actionType ? '#374151' : '#9ca3af' }}>
                      {actionType ? actionTypeOptions.find(opt => opt.value === actionType)?.label : 'Select Action Type'}
                    </Text>
                    <Icon name={showActionTypeDropdown ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
                  </TouchableOpacity>
                  
                  {showActionTypeDropdown && (
                    <View style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      marginTop: 4,
                      backgroundColor: 'white',
                      maxHeight: 150
                    }}>
                      <ScrollView>
                        {actionTypeOptions.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{ 
                              padding: 12,
                              borderBottomWidth: index < actionTypeOptions.length - 1 ? 1 : 0,
                              borderBottomColor: '#f3f4f6'
                            }}
                            onPress={() => {
                              setActionType(option.value);
                              setShowActionTypeDropdown(false);
                            }}
                          >
                            <Text style={{ color: '#374151' }}>{option.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
                
                {/* Specific Dropdown */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>Specific</Text>
                  <TouchableOpacity 
                    style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      padding: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onPress={() => setShowSpecificDropdown(!showSpecificDropdown)}
                  >
                    <Text style={{ color: specific ? '#374151' : '#9ca3af' }}>
                      {specific ? specificOptions.find(opt => opt.value === specific)?.label : 'Select Specific Option'}
                    </Text>
                    <Icon name={showSpecificDropdown ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
                  </TouchableOpacity>
                  
                  {showSpecificDropdown && (
                    <View style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      marginTop: 4,
                      backgroundColor: 'white',
                      maxHeight: 150
                    }}>
                      <ScrollView>
                        {specificOptions.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{ 
                              padding: 12,
                              borderBottomWidth: index < specificOptions.length - 1 ? 1 : 0,
                              borderBottomColor: '#f3f4f6'
                            }}
                            onPress={() => {
                              setSpecific(option.value);
                              setShowSpecificDropdown(false);
                            }}
                          >
                            <Text style={{ color: '#374151' }}>{option.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
                
                {/* Sent To Dropdown */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>Sent To *</Text>
                  <TouchableOpacity 
                    style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      padding: 12,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                    onPress={() => setShowSentToDropdown(!showSentToDropdown)}
                  >
                    <Text style={{ color: sentTo ? '#374151' : '#9ca3af' }}>
                      {sentTo ? sentToOptions.find(opt => opt.value === sentTo)?.label : 'Select Recipient'}
                    </Text>
                    <Icon name={showSentToDropdown ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
                  </TouchableOpacity>
                  
                  {showSentToDropdown && (
                    <View style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      marginTop: 4,
                      backgroundColor: 'white',
                      maxHeight: 150
                    }}>
                      <ScrollView>
                        {sentToOptions.map((option, index) => (
                          <TouchableOpacity
                            key={index}
                            style={{ 
                              padding: 12,
                              borderBottomWidth: index < sentToOptions.length - 1 ? 1 : 0,
                              borderBottomColor: '#f3f4f6'
                            }}
                            onPress={() => {
                              setSentTo(option.value);
                              setShowSentToDropdown(false);
                            }}
                          >
                            <Text style={{ color: '#374151' }}>{option.label}</Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>
                
                {/* Alert Type Selection */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>Alert Type *</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    {alertTypeOptions.map((option, index) => (
                      <TouchableOpacity
                        key={index}
                        style={{ 
                          flex: 1,
                          padding: 12,
                          borderRadius: 12,
                          backgroundColor: alertType.includes(option.value) ? '#dbeafe' : '#f9fafb',
                          borderWidth: 1,
                          borderColor: alertType.includes(option.value) ? '#3b82f6' : '#d1d5db',
                          marginHorizontal: 4,
                          alignItems: 'center'
                        }}
                        onPress={() => toggleAlertType(option.value)}
                      >
                        <Text style={{ 
                          color: alertType.includes(option.value) ? '#1e40af' : '#6b7280',
                          fontWeight: '600'
                        }}>
                          {option.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
                
                {/* Message Input */}
                <View style={{ marginBottom: 16 }}>
                  <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>Message</Text>
                  <TextInput
                    value={message}
                    onChangeText={setMessage}
                    placeholder="Enter message template"
                    multiline={true}
                    numberOfLines={4}
                    style={{ 
                      borderWidth: 1,
                      borderColor: '#d1d5db',
                      borderRadius: 12,
                      padding: 12,
                      textAlignVertical: 'top',
                      minHeight: 100,
                    }}
                  />
                </View>
                
                {/* Status Toggle */}
                <View style={{ 
                  flexDirection: 'row', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginBottom: 24
                }}>
                  <Text style={{ fontWeight: '600', color: '#374151' }}>Status</Text>
                  <Switch
                    value={isActive}
                    onValueChange={setIsActive}
                    thumbColor={isActive ? '#3b82f6' : '#f4f4f5'}
                    trackColor={{ false: '#e5e7eb', true: '#bfdbfe' }}
                  />
                </View>
                
                {/* Action Buttons */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: '#e5e7eb',
                      borderRadius: 12,
                      padding: 16,
                      alignItems: 'center'
                    }}
                    onPress={() => {
                      setShowAddModal(false);
                      setEditingEvent(null);
                      resetForm();
                    }}
                  >
                    <Text style={{ color: '#374151', fontWeight: '600' }}>Cancel</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: '#3b82f6',
                      borderRadius: 12,
                      padding: 16,
                      alignItems: 'center'
                    }}
                    onPress={editingEvent ? handleEditEvent : handleAddEvent}
                  >
                    <Text style={{ color: 'white', fontWeight: '600' }}>
                      {editingEvent ? 'Update Event' : 'Create Event'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Filter Modal */}
        <Modal
          visible={showFilterModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowFilterModal(false)}
        >
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
            <View style={{ 
              backgroundColor: 'white', 
              borderTopLeftRadius: 20, 
              borderTopRightRadius: 20,
              maxHeight: Dimensions.get('window').height * 0.6,
              padding: 20
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1e40af' }}>Filter Events</Text>
                <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                  <Icon name="close" size={24} color="#6b7280" />
                </TouchableOpacity>
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>Project</Text>
                <View style={{ 
                  flexDirection: 'row', 
                  flexWrap: 'wrap',
                  gap: 8
                }}>
                  <TouchableOpacity
                    style={{ 
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: filterProject === '' ? '#3b82f6' : '#f3f4f6',
                    }}
                    onPress={() => setFilterProject('')}
                  >
                    <Text style={{ color: filterProject === '' ? 'white' : '#374151' }}>All</Text>
                  </TouchableOpacity>
                  {projectOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{ 
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        backgroundColor: filterProject === option.label ? '#3b82f6' : '#f3f4f6',
                      }}
                      onPress={() => setFilterProject(option.label)}
                    >
                      <Text style={{ color: filterProject === option.label ? 'white' : '#374151' }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>Module</Text>
                <View style={{ 
                  flexDirection: 'row', 
                  flexWrap: 'wrap',
                  gap: 8
                }}>
                  <TouchableOpacity
                    style={{ 
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: filterModule === '' ? '#3b82f6' : '#f3f4f6',
                    }}
                    onPress={() => setFilterModule('')}
                  >
                    <Text style={{ color: filterModule === '' ? 'white' : '#374151' }}>All</Text>
                  </TouchableOpacity>
                  {moduleOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={{ 
                        paddingHorizontal: 16,
                        paddingVertical: 8,
                        borderRadius: 20,
                        backgroundColor: filterModule === option.label ? '#3b82f6' : '#f3f4f6',
                      }}
                      onPress={() => setFilterModule(option.label)}
                    >
                      <Text style={{ color: filterModule === option.label ? 'white' : '#374151' }}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={{ marginBottom: 24 }}>
                <Text style={{ marginBottom: 8, fontWeight: '600', color: '#374151' }}>Status</Text>
                <View style={{ 
                  flexDirection: 'row', 
                  flexWrap: 'wrap',
                  gap: 8
                }}>
                  <TouchableOpacity
                    style={{ 
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: filterStatus === '' ? '#3b82f6' : '#f3f4f6',
                    }}
                    onPress={() => setFilterStatus('')}
                  >
                    <Text style={{ color: filterStatus === '' ? 'white' : '#374151' }}>All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ 
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: filterStatus === 'active' ? '#3b82f6' : '#f3f4f6',
                    }}
                    onPress={() => setFilterStatus('active')}
                  >
                    <Text style={{ color: filterStatus === 'active' ? 'white' : '#374151' }}>Active</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ 
                      paddingHorizontal: 16,
                      paddingVertical: 8,
                      borderRadius: 20,
                      backgroundColor: filterStatus === 'inactive' ? '#3b82f6' : '#f3f4f6',
                    }}
                    onPress={() => setFilterStatus('inactive')}
                  >
                    <Text style={{ color: filterStatus === 'inactive' ? 'white' : '#374151' }}>Inactive</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 16,
                    alignItems: 'center'
                  }}
                  onPress={resetFilters}
                >
                  <Text style={{ color: '#374151', fontWeight: '600' }}>Reset</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#3b82f6',
                    borderRadius: 12,
                    padding: 16,
                    alignItems: 'center'
                  }}
                  onPress={applyFilters}
                >
                  <Text style={{ color: 'white', fontWeight: '600' }}>Apply Filters</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Help button */}
        <TouchableOpacity 
          style={{
            margin: 16,
            backgroundColor: '#3b82f6',
            borderRadius: 12,
            padding: 16,
            alignItems: 'center',
            marginBottom: 20
          }}
          onPress={() => console.log('Need help')}
        >
          <Text style={{ color: '#ffffff', fontWeight: '600' }}>Need Help?</Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}