import React, { useState, useCallback, useMemo, useEffect } from 'react';
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
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeOut, FadeInUp, SlideInRight } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;
const cardWidth = Math.min(screenWidth - 32, 600);

// Base URL for APIs (placeholder - replace with actual base URL)
const API_BASE_URL = 'https://api.example.com/snagging';

// Sample Snagging Report data (initial, will be replaced by API)
const initialSnaggingData = [
  {
    snagId: 'PROJ-002-SNAG-00001',
    dateOfChecking: '2023-10-15',
    status: 'Reported',
    responsibleParty: 'Contractor A',
    drawingReference: 'DRW-001',
    reportedBy: 'John Doe',
    description: 'Crack in the wall on the east side',
    location: 'Building A, Level 3',
    priority: 'High',
    dueDate: '2023-10-20',
    category: 'Structural',
    attachments: [],
  },
  {
    snagId: 'PROJ-002-SNAG-00002',
    dateOfChecking: '2023-10-16',
    status: 'In Progress',
    responsibleParty: 'Contractor B',
    drawingReference: 'DRW-002',
    reportedBy: 'Jane Smith',
    description: 'Leaking pipe in bathroom',
    location: 'Building B, Level 2',
    priority: 'Medium',
    dueDate: '2023-10-21',
    category: 'Plumbing',
    attachments: [],
  },
  {
    snagId: 'PROJ-002-SNAG-00003',
    dateOfChecking: '2023-10-17',
    status: 'Resolved',
    responsibleParty: 'Contractor C',
    drawingReference: 'DRW-003',
    reportedBy: 'Mike Johnson',
    description: 'Faulty electrical wiring',
    location: 'Building C, Level 1',
    priority: 'High',
    dueDate: '2023-10-22',
    category: 'Electrical',
    attachments: [],
  },
  {
    snagId: 'PROJ-002-SNAG-00004',
    dateOfChecking: '2023-10-18',
    status: 'Resolved',
    responsibleParty: 'Contractor A',
    drawingReference: 'DRW-004',
    reportedBy: 'Sarah Wilson',
    description: 'Damaged floor tiles',
    location: 'Building A, Level 4',
    priority: 'Low',
    dueDate: '2023-10-23',
    category: 'Finishes',
    attachments: [],
  },
];

// Status Indicator Component
const StatusIndicator = ({ status }) => {
  const statusConfig = {
    Open: { color: '#f59e0b', bg: '#fef3c7', icon: 'alert-circle-outline' },
    'In Progress': { color: '#3b82f6', bg: '#dbeafe', icon: 'progress-clock' },
    Resolved: { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
    Closed: { color: '#6b7280', bg: '#f3f4f6', icon: 'lock-check' },
  };

  const statusCfg = statusConfig[status] || statusConfig['Open'];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: statusCfg.bg,
        alignSelf: 'flex-start',
      }}>
      <Icon name={statusCfg.icon} size={14} color={statusCfg.color} style={{ marginRight: 4 }} />
      <Text
        style={{
          fontSize: 12,
          fontWeight: '600',
          color: statusCfg.color,
        }}>
        {status}
      </Text>
    </View>
  );
};

// Snagging Report Card Component
const SnaggingCard = ({
  item,
  expanded,
  onToggle,
  onEdit,
  onDelete,
  onApprove,
  onReject,
  onDownload,
  onEmail,
}) => {
  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <View
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
        }}>
        {/* Header - Applying light blue theme here */}
        <TouchableOpacity onPress={onToggle}>
          <LinearGradient
            colors={['#dbeafe', '#bfdbfe']} // Light blue gradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '700',
                    color: '#1e40af', // Darker blue for contrast
                    marginBottom: 4,
                  }}>
                  {item.snagId}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#3b82f6', // Medium blue
                    marginBottom: 8,
                  }}>
                  {item.location}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#3b82f6', // Medium blue
                    marginBottom: 4,
                  }}>
                  {item.dateOfChecking}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#3b82f6', // Medium blue
                      marginRight: 8,
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
              <View
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 12,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: 12,
                  }}>
                  Snagging Details
                </Text>

                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Date of Checking</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.dateOfChecking}
                    </Text>
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
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.responsibleParty}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Drawing Reference</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.drawingReference}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Reported By</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.reportedBy}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Location</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.location}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Priority</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.priority}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Due Date</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.dueDate}
                    </Text>
                  </View>
                </View>

                <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Category</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.category}
                    </Text>
                  </View>
                </View>

                <View style={{ marginTop: 8 }}>
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>Description</Text>
                  <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                    {item.description}
                  </Text>
                </View>

                {/* Attachments */}
                <View style={{ marginTop: 16 }}>
                  <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
                    Attachments
                  </Text>
                  {item.attachments.length > 0 ? (
                    item.attachments.map((attach, index) => (
                      <View key={index} style={{ marginBottom: 8 }}>
                        {attach.endsWith('.jpg') || attach.endsWith('.png') ? (
                          <Image
                            source={{ uri: attach }}
                            style={{ width: 100, height: 100, borderRadius: 8 }}
                          />
                        ) : (
                          <Text style={{ fontSize: 14, color: '#374151' }}>{attach}</Text>
                        )}
                      </View>
                    ))
                  ) : (
                    <Text style={{ fontSize: 14, color: '#374151' }}>No attachments</Text>
                  )}
                </View>
              </View>

              {/* Action Buttons */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  backgroundColor: '#ffffff',
                  borderRadius: 12,
                  padding: 16,
                  flexWrap: 'wrap',
                }}>
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 8,
                  }}
                  onPress={() => console.log('View', item.snagId)}>
                  <Icon name="eye-outline" size={20} color="#3b82f6" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#3b82f6', fontWeight: '600' }}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 8,
                  }}
                  onPress={() => onEdit(item)}>
                  <Icon
                    name="pencil-outline"
                    size={20}
                    color="#10b981"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ color: '#10b981', fontWeight: '600' }}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 8,
                  }}
                  onPress={() => onDelete(item.snagId)}>
                  <Icon
                    name="delete-outline"
                    size={20}
                    color="#ef4444"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ color: '#ef4444', fontWeight: '600' }}>Delete</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 8,
                  }}
                  onPress={() => onDownload(item.snagId)}>
                  <Icon name="download" size={20} color="#6b7280" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#6b7280', fontWeight: '600' }}>Download</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 8,
                  }}
                  onPress={() => onEmail(item.snagId)}>
                  <Icon name="email-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
                  <Text style={{ color: '#ef4444', fontWeight: '600' }}>Email</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 8,
                  }}
                  onPress={() => onApprove(item.snagId)}>
                  <Icon
                    name="thumb-up-outline"
                    size={20}
                    color="#10b981"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ color: '#10b981', fontWeight: '600' }}>Approve</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 8,
                  }}
                  onPress={() => onReject(item.snagId)}>
                  <Icon
                    name="thumb-down-outline"
                    size={20}
                    color="#ef4444"
                    style={{ marginRight: 8 }}
                  />
                  <Text style={{ color: '#ef4444', fontWeight: '600' }}>Reject</Text>
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
        <Animated.View
          entering={FadeInUp}
          style={{
            backgroundColor: '#ffffff',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                color: '#1f2937',
              }}>
              Filter Snagging Reports
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <View style={{ gap: 12 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#374151',
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
                  borderColor:
                    tempFilter === status || (status === 'All' && !tempFilter)
                      ? '#3b82f6'
                      : '#e5e7eb',
                  backgroundColor:
                    tempFilter === status || (status === 'All' && !tempFilter)
                      ? '#eff6ff'
                      : '#ffffff',
                }}
                onPress={() => setTempFilter(status === 'All' ? null : status)}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color:
                      tempFilter === status || (status === 'All' && !tempFilter)
                        ? '#3b82f6'
                        : '#374151',
                  }}>
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'row',
              gap: 12,
              marginTop: 24,
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#f3f4f6',
                padding: 16,
                borderRadius: 16,
                alignItems: 'center',
              }}
              onPress={onClose}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
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
                alignItems: 'center',
              }}
              onPress={() => {
                onApplyFilter(tempFilter);
                onClose();
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#ffffff',
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
          padding: 12,
        }}
        onPress={onToggle}>
        <Text
          style={
            value
              ? {
                  fontSize: 14,
                  color: '#1f2937',
                }
              : {
                  fontSize: 14,
                  color: '#9ca3af',
                }
          }>
          {value || placeholder}
        </Text>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
      </TouchableOpacity>

      {isOpen && (
        <Animated.View
          entering={FadeInUp}
          style={{
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
            overflow: 'hidden',
          }}>
          <ScrollView>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  padding: 12,
                  borderBottomWidth: index < options.length - 1 ? 1 : 0,
                  borderBottomColor: '#f3f4f6',
                }}
                onPress={() => {
                  onSelect(option);
                  onToggle();
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#1f2937',
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
const FormModal = ({ visible, onClose, onSubmit, selectedItem }) => {
  const [formData, setFormData] = useState({
    dateOfChecking: '',
    status: '',
    responsibleParty: '',
    drawingReference: '',
    reportedBy: '',
    description: '',
    location: '',
    priority: '',
    dueDate: '',
    category: '',
  });
  const [files, setFiles] = useState([]);

  const [dropdownsOpen, setDropdownsOpen] = useState({
    status: false,
    responsibleParty: false,
    drawingReference: false,
    reportedBy: false,
    priority: false,
    category: false,
  });

  // Dropdown options (fetched or sample)
  const [statusOptions, setStatusOptions] = useState(['Reported', 'In Progress', 'Resolved']);
  const [responsiblePartyOptions, setResponsiblePartyOptions] = useState([
    'Contractor A',
    'Contractor B',
    'Contractor C',
    'Contractor D',
  ]);
  const [drawingReferenceOptions, setDrawingReferenceOptions] = useState([
    'DRW-001',
    'DRW-002',
    'DRW-003',
    'DRW-004',
    'DRW-005',
  ]);
  const [reportedByOptions, setReportedByOptions] = useState([
    'John Doe',
    'Jane Smith',
    'Mike Johnson',
    'Sarah Wilson',
    'Robert Brown',
  ]);
  const priorityOptions = ['Low', 'Medium', 'High', 'Critical'];
  const categoryOptions = [
    'Structural',
    'Plumbing',
    'Electrical',
    'Finishes',
    'External',
    'Heating',
    'Other',
  ];

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
      setFiles(selectedItem.attachments || []);
    } else {
      setFormData({
        dateOfChecking: '',
        status: '',
        responsibleParty: '',
        drawingReference: '',
        reportedBy: '',
        description: '',
        location: '',
        priority: '',
        dueDate: '',
        category: '',
      });
      setFiles([]);
    }
  }, [selectedItem]);

  useEffect(() => {
    // Request permissions for image picker
    (async () => {
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    })();

    // Fetch dropdown lists (API integration)
    const fetchDropdowns = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getDropdownList`);
        const data = await response.json();
        setStatusOptions(data.status || statusOptions);
        setResponsiblePartyOptions(data.responsibleParty || responsiblePartyOptions);
        setDrawingReferenceOptions(data.drawingReference || drawingReferenceOptions);
        setReportedByOptions(data.reportedBy || reportedByOptions);
        // Add more if API provides
      } catch (error) {
        console.error('Error fetching dropdowns:', error);
      }
    };
    fetchDropdowns();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleDropdown = (dropdown) => {
    setDropdownsOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleFileUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFiles((prev) => [...prev, uri]);
    }
  };

  // const handleSubmit = async () => {
  //   // Validate required fields
  //   const requiredFields = ['dateOfChecking', 'status', 'responsibleParty', 'drawingReference', 'reportedBy', 'description', 'location', 'priority', 'dueDate', 'category'];
  //   if (requiredFields.some(field => !formData[field])) {
  //     alert('Please fill all required fields');
  //     return;
  //   }

  //   let uploadedAttachments = [];
  //   for (const file of files) {
  //     try {
  //       // Get unique number
  //       const uniqueRes = await fetch(`${API_BASE_URL}/getUniqueNumberForFileUpload`);
  //       const uniqueData = await uniqueRes.json();
  //       const uniqueNumber = uniqueData.uniqueNumber;

  //       // Upload file
  //       const formDataUpload = new FormData();
  //       formDataUpload.append('file', {
  //         uri: file,
  //         type: 'image/jpeg', // Assume image, adjust as needed
  //         name: 'attachment.jpg',
  //       });
  //       formDataUpload.append('uniqueNumber', uniqueNumber);

  //       const uploadRes = await fetch(`${API_BASE_URL}/documentFilesForUpload`, {
  //         method: 'POST',
  //         body: formDataUpload,
  //       });
  //       const uploadData = await uploadRes.json();
  //       uploadedAttachments.push(uploadData.fileUrl || file); // Assume returns url
  //     } catch (error) {
  //       console.error('File upload error:', error);
  //     }
  //   }

  //   const submitData = { ...formData, attachments: uploadedAttachments };

  //   onSubmit(submitData, !!selectedItem);
  //   onClose();
  // };
  const handleSubmit = async () => {
    console.log('Submitting form data:', formData);

    const userData = await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    try {
      // Validate required fields (only include fields that are currently in your form)
      const requiredFields = [
        'dateOfChecking',
        'status',
        'responsibleParty',
        'drawingReference',
        'reportedBy',
        'description',
        'location',
      ];

      if (requiredFields.some((field) => !formData[field])) {
        alert('Please fill all required fields');
        return;
      }

      // Step 1: Generate unique ID
      const idResponse = await fetch(
        'https://api-v2-skystruct.prudenttec.com/commonControl/get-common-generated-id',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`, // Replace with your actual token
            'X-Menu-Id': 'ERkvlKwRG7x',
          },
          body: JSON.stringify({
            type: 'SNAG_ID',
            lableName: 'SNAG',
          }),
        }
      );

      console.log("ID generation response:", idResponse);
      

      // if (!idResponse.ok) {
      //   throw new Error('Failed to generate ID');
      // }

      const idData = await idResponse.json();
      console.log("ID generation data:", idData);
      

      // if (!idData.status) {
      //   throw new Error('ID generation failed');
      // }

      const generatedSnagId = idData.idGeneratedBean.moduleLable;

      // Step 2: Prepare snag data for submission with correct structure
      const snagData = {
        snaggingReportFormBean: {
          snagId: generatedSnagId,
          location: formData.location,
          dateOfChecking: formData.dateOfChecking,
          reportedBy: formData.reportedBy,
          responsibleParty: formData.responsibleParty,
          description: formData.description,
          drawingReference: formData.drawingReference,
          snagStatus: formData.status, // Map 'status' to 'snagStatus'
        },
      };

      // Step 3: Submit snag data
      const submitResponse = await fetch('https://api-v2-skystruct.prudenttec.com/snagging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedData.jwtToken}`, // Replace with your actual token
          'X-Menu-Id': 'ERkvlKwRG7x',
        },
        body: JSON.stringify(snagData),
      });

      if (!submitResponse.ok) {
        throw new Error('Failed to submit snag data');
      }

      const submitResult = await submitResponse.json();

      if (submitResult.status) {
        // Success - call the original onSubmit callback if needed
        if (onSubmit) {
          onSubmit(snagData.snaggingReportFormBean, !!selectedItem);
        }
        onClose();
        alert('Snag report submitted successfully!');
      } else {
        throw new Error(submitResult.message || 'Submission failed');
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}>
        <Animated.View
          entering={FadeInUp}
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 24,
            padding: 24,
            width: '100%',
            maxWidth: 500,
            maxHeight: '80%',
          }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#1f2937',
                }}>
                {selectedItem ? 'Edit Snagging Report' : 'Add Snagging Report'}
              </Text>
              <TouchableOpacity onPress={onClose}>
                <Icon name="close" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>

            {/* Snag Id (read-only for edit, generated for add) */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
                }}>
                Snag Id
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '600',
                  color: '#3b82f6',
                }}>
                {selectedItem ? selectedItem.snagId : 'Generated on submit'}
              </Text>
            </View>

            {/* Date Of Checking */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
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
                  color: '#1f2937',
                }}
                placeholder="Enter date (YYYY-MM-DD)"
                value={formData.dateOfChecking}
                onChangeText={(text) => handleInputChange('dateOfChecking', text)}
              />
            </View>

            {/* Status */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
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
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
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
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
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
                  color: '#1f2937',
                }}
                placeholder="Enter location"
                value={formData.location}
                onChangeText={(text) => handleInputChange('location', text)}
              />
            </View>

            {/* Drawing Reference */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
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
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
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

            {/* Priority */}
            {/* <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Priority *
              </Text>
              <Dropdown
                options={priorityOptions}
                value={formData.priority}
                onSelect={(value) => handleInputChange('priority', value)}
                placeholder="Select Priority"
                isOpen={dropdownsOpen.priority}
                onToggle={() => toggleDropdown('priority')}
              />
            </View> */}

            {/* Due Date */}
            {/* <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Due Date *
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
                placeholder="Enter due date (YYYY-MM-DD)"
                value={formData.dueDate}
                onChangeText={(text) => handleInputChange('dueDate', text)}
              />
            </View> */}

            {/* Category */}
            {/* <View style={{ marginBottom: 16 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Category *
              </Text>
              <Dropdown
                options={categoryOptions}
                value={formData.category}
                onSelect={(value) => handleInputChange('category', value)}
                placeholder="Select Category"
                isOpen={dropdownsOpen.category}
                onToggle={() => toggleDropdown('category')}
              />
            </View> */}

            {/* Description */}
            <View style={{ marginBottom: 16 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: 8,
                }}>
                Description *
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
                  textAlignVertical: 'top',
                }}
                placeholder="Enter description"
                multiline={true}
                value={formData.description}
                onChangeText={(text) => handleInputChange('description', text)}
              />
            </View>

            {/* Attachments */}
            {/* <View style={{ marginBottom: 24 }}>
              <Text style={{ 
                fontSize: 14, 
                fontWeight: '600', 
                color: '#374151',
                marginBottom: 8
              }}>
                Attachments
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#3b82f6',
                  padding: 12,
                  borderRadius: 8,
                  alignItems: 'center',
                  marginBottom: 8
                }}
                onPress={handleFileUpload}
              >
                <Text style={{ color: '#ffffff', fontWeight: '600' }}>Upload File</Text>
              </TouchableOpacity>
              {files.map((file, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                  <Text style={{ flex: 1, fontSize: 14, color: '#374151' }}>{file.split('/').pop()}</Text>
                  <TouchableOpacity onPress={() => setFiles(files.filter((_, i) => i !== index))}>
                    <Icon name="close" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              ))}
            </View> */}

            {/* Buttons */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                gap: 12,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: 16,
                  borderRadius: 16,
                  minWidth: 100,
                  alignItems: 'center',
                }}
                onPress={onClose}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#374151',
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
                  alignItems: 'center',
                }}
                onPress={handleSubmit}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#ffffff',
                  }}>
                  {selectedItem ? 'Update' : 'Submit'}
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
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const [snaggingList, setSnaggingList] = useState(initialSnaggingData);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/snaggingFilterList`);
        const data = await response.json();
        setSnaggingList(data || initialSnaggingData);
      } catch (error) {
        console.error('Error fetching snagging list:', error);
        setSnaggingList(initialSnaggingData);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/snaggingFilterList`);
      const data = await response.json();
      setSnaggingList(data || initialSnaggingData);
    } catch (error) {
      console.error('Error refreshing:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleItem = useCallback((snagId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [snagId]: !prev[snagId],
    }));
  }, []);

  const handleFormSubmit = async (formData, isUpdate) => {
    try {
      let snagId = formData.snagId;
      if (!isUpdate) {
        const refResponse = await fetch(`${API_BASE_URL}/getReferenceNumber`);
        const refData = await refResponse.json();
        snagId = refData.reference;
      }

      const endpoint = isUpdate ? 'updateSnag' : 'addSnag';
      await fetch(`${API_BASE_URL}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, snagId }),
      });

      handleRefresh();
    } catch (error) {
      console.error('Submit error:', error);
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowFormModal(true);
  };

  const handleDelete = async (snagId) => {
    try {
      await fetch(`${API_BASE_URL}/deleteById?id=${snagId}`, { method: 'DELETE' });
      handleRefresh();
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleApprove = async (snagId) => {
    try {
      await fetch(`${API_BASE_URL}/approveandReject?id=${snagId}&action=approve`, {
        method: 'POST',
      });
      handleRefresh();
    } catch (error) {
      console.error('Approve error:', error);
    }
  };

  const handleReject = async (snagId) => {
    try {
      await fetch(`${API_BASE_URL}/approveandReject?id=${snagId}&action=reject`, {
        method: 'POST',
      });
      handleRefresh();
    } catch (error) {
      console.error('Reject error:', error);
    }
  };

  const handleDownload = (snagId) => {
    console.log('Download', snagId);
    // Implement download logic, e.g., generate PDF
  };

  const handleEmail = async (snagId) => {
    try {
      const mailBodyRes = await fetch(`${API_BASE_URL}/getSnaggingMailBodyById?id=${snagId}`);
      const mailBody = await mailBodyRes.json();

      await fetch(`${API_BASE_URL}/sendSnaggingMail`, {
        method: 'POST',
        body: JSON.stringify({ id: snagId, body: mailBody }),
      });
    } catch (error) {
      console.error('Email error:', error);
    }
  };

  const filteredSnaggingList = useMemo(() => {
    let result = [...snaggingList];

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(
        (item) =>
          item.snagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus) {
      result = result.filter((item) => item.status === filterStatus);
    }

    return result;
  }, [filterStatus, searchQuery, snaggingList]);

  if (isLoading) {
    return (
      <MainLayout title="Snagging Report">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              padding: 32,
              borderRadius: 24,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text
              style={{
                marginTop: 16,
                fontSize: 16,
                fontWeight: '600',
                color: '#374151',
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 12,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#1e40af',
                }}>
                Snagging Report
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  color: '#3b82f6',
                  marginTop: 2,
                }}>
                {filteredSnaggingList.length} snagging reports • {filterStatus || 'All statuses'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: 12,
                }}
                onPress={handleRefresh}>
                <Icon name="refresh" size={18} color="#1e40af" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search and Filter Row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}>
            {/* Search Bar */}
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: 12,
                paddingHorizontal: 12,
                height: 40,
                justifyContent: 'center',
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
                    paddingVertical: 0,
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
                justifyContent: 'center',
              }}
              onPress={() => setShowFilterModal(true)}>
              <Icon name="filter-outline" size={16} color="#1e40af" />
              {filterStatus && (
                <View
                  style={{
                    marginLeft: 4,
                    backgroundColor: '#3b82f6',
                    paddingHorizontal: 6,
                    paddingVertical: 2,
                    borderRadius: 8,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      color: '#ffffff',
                      fontWeight: '600',
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
                justifyContent: 'center',
              }}
              onPress={() => {
                setSelectedItem(null);
                setShowFormModal(true);
              }}>
              <Icon name="plus" size={16} color="#1e40af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Snagging Report List */}
        <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
          {filteredSnaggingList.length > 0 ? (
            filteredSnaggingList.map((item) => (
              <SnaggingCard
                key={item.snagId}
                item={item}
                expanded={expandedItems[item.snagId]}
                onToggle={() => toggleItem(item.snagId)}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onApprove={handleApprove}
                onReject={handleReject}
                onDownload={handleDownload}
                onEmail={handleEmail}
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
                margin: 16,
              }}>
              <Icon name="file-document-outline" size={64} color="#d1d5db" />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#6b7280',
                  marginTop: 16,
                }}>
                No snagging reports found
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: '#9ca3af',
                  marginTop: 8,
                  textAlign: 'center',
                }}>
                {searchQuery
                  ? 'Try adjusting your search terms or filters'
                  : 'No snagging reports available'}
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
          selectedItem={selectedItem}
        />
      </View>
    </MainLayout>
  );
};

export default SnaggingReportScreen;
