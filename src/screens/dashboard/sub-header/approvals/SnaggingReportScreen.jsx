// ✅ Working member suggestions for "Responsible Party" and "Reported By"
// ✅ Added Status dropdown integration
// ✅ Added Drawing Reference dropdown integration

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
  Alert,
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeOut, FadeInUp, SlideInRight } from 'react-native-reanimated';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

const screenWidth = Dimensions.get('window').width;
const cardWidth = Math.min(screenWidth - 32, 600);

// Base URL for APIs
const API_BASE_URL = 'https://api-v2-skystruct.prudenttec.com';

// Status Indicator Component
const StatusIndicator = ({ status }) => {
  const statusConfig = {
    Open: { color: '#f59e0b', bg: '#fef3c7', icon: 'alert-circle-outline' },
    'In Progress': { color: '#3b82f6', bg: '#dbeafe', icon: 'progress-clock' },
    Resolved: { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
    Closed: { color: '#6b7280', bg: '#f3f4f6', icon: 'lock-check' },
    Reported: { color: '#f59e0b', bg: '#fef3c7', icon: 'alert-circle-outline' },
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

// Approval Status Indicator Component
const ApprovalStatusIndicator = ({ status }) => {
  const statusConfig = {
    A: { color: '#10b981', bg: '#d1fae5', icon: 'check-circle', label: 'Approved' },
    N: { color: '#f59e0b', bg: '#fef3c7', icon: 'clock-outline', label: 'Pending' },
    R: { color: '#ef4444', bg: '#fee2e2', icon: 'close-circle', label: 'Rejected' },
  };

  const statusCfg = statusConfig[status] || statusConfig['N'];

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
        {statusCfg.label}
      </Text>
    </View>
  );
};

// AutoCompleteInput Component
// Simple working version
const AutoCompleteInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  suggestions, 
  onSuggestionSelect 
}) => {
  const [show, setShow] = useState(false);

  const filtered = suggestions.filter(member => 
    value ? (member.name?.toLowerCase().includes(value.toLowerCase()) ||
            member.emailId?.toLowerCase().includes(value.toLowerCase())) : true
  ).slice(0, 5);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
        {label} *
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
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        onFocus={() => setShow(true)}
      />
      
      {show && filtered.length > 0 && (
        <View style={{ 
          borderWidth: 1, 
          borderColor: '#d1d5db', 
          backgroundColor: 'white',
          borderRadius: 8,
          marginTop: 4,
          maxHeight: 200,
        }}>
          <ScrollView>
            {filtered.map((member) => (
              <TouchableOpacity
                key={member.autoId}
                style={{ padding: 12, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}
                onPress={() => {
                  onSuggestionSelect(member);
                  setShow(false);
                }}>
                <Text style={{ fontWeight: '600' }}>{member.name}</Text>
                <Text style={{ fontSize: 12, color: '#666' }}>{member.emailId}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
      
      {show && (
        <TouchableOpacity 
          style={{ marginTop: 8 }}
          onPress={() => setShow(false)}>
          <Text style={{ color: '#3b82f6', textAlign: 'center' }}>Close suggestions</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// Dropdown Component for Status and Drawing Reference
const DropdownField = ({ 
  label, 
  value, 
  onValueChange, 
  placeholder, 
  options 
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const selectedOption = options.find(opt => opt.autoId === value);

  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>
        {label} *
      </Text>
      
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#d1d5db',
          borderRadius: 8,
          padding: 12,
          backgroundColor: '#ffffff',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => setShowDropdown(!showDropdown)}>
        <Text style={{ fontSize: 14, color: selectedOption ? '#1f2937' : '#9ca3af' }}>
          {selectedOption ? (selectedOption.dropdownValue || selectedOption.drawingName || selectedOption.name) : placeholder}
        </Text>
        <Icon 
          name={showDropdown ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color="#6b7280" 
        />
      </TouchableOpacity>

      {showDropdown && (
        <View style={{
          borderWidth: 1,
          borderColor: '#d1d5db',
          backgroundColor: 'white',
          borderRadius: 8,
          marginTop: 4,
          maxHeight: 200,
          elevation: 5,
          zIndex: 1000,
        }}>
          <ScrollView>
            {options.map((option) => (
              <TouchableOpacity
                key={option.autoId}
                style={{ 
                  padding: 12, 
                  borderBottomWidth: 1, 
                  borderBottomColor: '#f3f4f6',
                  backgroundColor: value === option.autoId ? '#eff6ff' : '#ffffff',
                }}
                onPress={() => {
                  onValueChange(option.autoId);
                  setShowDropdown(false);
                }}>
                <Text style={{ 
                  fontWeight: value === option.autoId ? '600' : '400',
                  color: value === option.autoId ? '#3b82f6' : '#374151',
                }}>
                  {option.dropdownValue || option.drawingName || option.name}
                </Text>
                {option.drawingNumber && (
                  <Text style={{ fontSize: 12, color: '#6b7280' }}>
                    Drawing #: {option.drawingNumber}
                  </Text>
                )}
                {option.description && (
                  <Text style={{ fontSize: 12, color: '#9ca3af' }} numberOfLines={1}>
                    {option.description}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
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
        {/* Header */}
        <TouchableOpacity onPress={onToggle}>
          <LinearGradient
            colors={['#dbeafe', '#bfdbfe']}
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
                    color: '#1e40af',
                    marginBottom: 4,
                  }}>
                  {item.snagId}
                </Text>
                <Text
                  style={{
                    fontSize: 13,
                    color: '#3b82f6',
                    marginBottom: 8,
                  }}>
                  {item.location}
                </Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#3b82f6',
                    marginBottom: 4,
                  }}>
                  {item.dateOfChecking}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: '#3b82f6',
                      marginRight: 8,
                    }}>
                    {item.responsibleParty}
                  </Text>
                  <StatusIndicator status={item.snagStatus || item.status} />
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
                    marginBottom: 16,
                  }}>
                  Snagging Details
                </Text>

                {/* Row 1: Auto ID and Project ID */}
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Auto ID</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.autoId}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Project ID</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.projectId}
                    </Text>
                  </View>
                </View>

                {/* Row 2: Snag ID and Location */}
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Snag ID</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.snagId}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Location</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.location}
                    </Text>
                  </View>
                </View>

                {/* Row 3: Date of Checking and Reported By */}
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Date of Checking</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.dateOfChecking}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Reported By</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.reportedBy}
                    </Text>
                  </View>
                </View>

                {/* Row 4: Responsible Party and Drawing Reference */}
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
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

                {/* Row 5: Status and Snag Status */}
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Status</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <StatusIndicator status={item.snagStatus || item.status} />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Snag Status</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.snagStatus}
                    </Text>
                  </View>
                </View>

                {/* Row 6: Approval Status and Reject Reason */}
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Approval Status</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <ApprovalStatusIndicator status={item.aprOrNot} />
                    </View>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Reject Reason</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.rejectReason || '-'}
                    </Text>
                  </View>
                </View>

                {/* Row 7: Added By and Is Last Approval */}
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Added By</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.addedBy}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Last Approval</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.isLastApproval ? 'Yes' : 'No'}
                    </Text>
                  </View>
                </View>

                {/* Row 8: Authorized and Audit */}
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Authorized</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.authorized ? 'Yes' : 'No'}
                    </Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: '#6b7280' }}>Audit</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
                      {item.audit ? 'Yes' : 'No'}
                    </Text>
                  </View>
                </View>

                {/* Description - Full Width */}
                <View
                  style={{
                    marginTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: '#e5e7eb',
                    paddingTop: 12,
                  }}>
                  <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>
                    Description
                  </Text>
                  <Text
                    style={{ fontSize: 14, fontWeight: '600', color: '#374151', lineHeight: 20 }}>
                    {item.description}
                  </Text>
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
                  onPress={() => onDelete(item.autoId)}>
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

                {item.aprOrNot !== 'A' && (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 8,
                    }}
                    onPress={() => onApprove(item.autoId)}>
                    <Icon
                      name="thumb-up-outline"
                      size={20}
                      color="#10b981"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={{ color: '#10b981', fontWeight: '600' }}>Approve</Text>
                  </TouchableOpacity>
                )}

                {item.aprOrNot !== 'R' && (
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 8,
                    }}
                    onPress={() => onReject(item.autoId)}>
                    <Icon
                      name="thumb-down-outline"
                      size={20}
                      color="#ef4444"
                      style={{ marginRight: 8 }}
                    />
                    <Text style={{ color: '#ef4444', fontWeight: '600' }}>Reject</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

// Date Picker Component
const DatePickerField = ({ label, value, onChange, placeholder }) => {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
      onChange(formattedDate);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 14, fontWeight: '500', color: '#374151', marginBottom: 8 }}>
        {label}
      </Text>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#e5e7eb',
          borderRadius: 8,
          padding: 12,
          backgroundColor: '#ffffff',
        }}
        onPress={() => setShowDatePicker(true)}>
        <Text style={{ fontSize: 14, color: value ? '#1f2937' : '#9ca3af' }}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

// Filter Modal Component
const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
  const [tempFilter, setTempFilter] = useState({
    startDate: '',
    endDate: '',
    rejectStatus: [],
    status: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setTempFilter(
        currentFilter || {
          startDate: '',
          endDate: '',
          rejectStatus: [],
          status: [],
        }
      );
    }
  }, [visible, currentFilter]);

  const rejectStatusOptions = [
    { label: 'Approved', value: 'A' },
    { label: 'Pending', value: 'N' },
    { label: 'Rejected', value: 'R' },
  ];

  const statusOptions = [
    { label: 'Reported', value: '7lr1YMtlO1N' },
    { label: 'In Progress', value: '2JxnZmhT5Xq' },
    { label: 'Resolved', value: 'H5vEwBWyxFP' },
  ];

  const handleRejectStatusToggle = (value) => {
    setTempFilter((prev) => ({
      ...prev,
      rejectStatus: prev.rejectStatus.includes(value)
        ? prev.rejectStatus.filter((item) => item !== value)
        : [...prev.rejectStatus, value],
    }));
  };

  const handleStatusToggle = (value) => {
    setTempFilter((prev) => ({
      ...prev,
      status: prev.status.includes(value)
        ? prev.status.filter((item) => item !== value)
        : [...prev.status, value],
    }));
  };

  const handleStartDateChange = (date) => {
    setTempFilter((prev) => ({ ...prev, startDate: date }));
  };

  const handleEndDateChange = (date) => {
    setTempFilter((prev) => ({ ...prev, endDate: date }));
  };

  const makeApiCall = async (filterData) => {
    const userData = await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    try {
      setLoading(true);

      const requestBody = {
        startDate: filterData.startDate || '',
        endDate: filterData.endDate || '',
        rejectStatus: filterData.rejectStatus.join(',') || '',
        status: filterData.status.join(',') || '',
      };

      console.log('📤 Making API call with filter data:', JSON.stringify(requestBody, null, 2));

      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/snagging/get-filter-list',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': 'ERkvlKwRG7x',
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('❌ API call failed:', error);
      Alert.alert('Error', 'Failed to fetch filter results. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      const responseData = await makeApiCall(tempFilter);

      // Pass the API response data to parent component
      onApplyFilter({
        filterData: tempFilter,
        apiResponse: responseData,
      });

      onClose();
    } catch (error) {
      console.log('Apply filter failed, keeping modal open');
    }
  };

  const handleReset = () => {
    setTempFilter({
      startDate: '',
      endDate: '',
      rejectStatus: [],
      status: [],
    });
  };

  const isFilterActive = () => {
    return (
      tempFilter.startDate ||
      tempFilter.endDate ||
      tempFilter.rejectStatus.length > 0 ||
      tempFilter.status.length > 0
    );
  };

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
            maxHeight: '80%',
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
              <Text style={{ fontSize: 24, color: '#6b7280' }}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Date Range Section */}
            <View style={{ gap: 16, marginBottom: 24 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>Date Range</Text>

              <View style={{ gap: 12 }}>
                <DatePickerField
                  label="Start Date"
                  value={tempFilter.startDate}
                  onChange={handleStartDateChange}
                  placeholder="Select Start Date (YYYY-MM-DD)"
                />

                <DatePickerField
                  label="End Date"
                  value={tempFilter.endDate}
                  onChange={handleEndDateChange}
                  placeholder="Select End Date (YYYY-MM-DD)"
                />
              </View>
            </View>

            {/* Reject Status Section */}
            <View style={{ gap: 12, marginBottom: 24 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>
                Approval Status
              </Text>
              {rejectStatusOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={{
                    padding: 16,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: tempFilter.rejectStatus.includes(option.value)
                      ? '#3b82f6'
                      : '#e5e7eb',
                    backgroundColor: tempFilter.rejectStatus.includes(option.value)
                      ? '#eff6ff'
                      : '#ffffff',
                  }}
                  onPress={() => handleRejectStatusToggle(option.value)}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: tempFilter.rejectStatus.includes(option.value) ? '#3b82f6' : '#374151',
                    }}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Status Section */}
            <View style={{ gap: 12, marginBottom: 24 }}>
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>Snag Status</Text>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={{
                    padding: 16,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: tempFilter.status.includes(option.value) ? '#3b82f6' : '#e5e7eb',
                    backgroundColor: tempFilter.status.includes(option.value)
                      ? '#eff6ff'
                      : '#ffffff',
                  }}
                  onPress={() => handleStatusToggle(option.value)}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: '600',
                      color: tempFilter.status.includes(option.value) ? '#3b82f6' : '#374151',
                    }}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 24 }}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#f3f4f6',
                padding: 16,
                borderRadius: 16,
                alignItems: 'center',
              }}
              onPress={handleReset}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#f3f4f6',
                padding: 16,
                borderRadius: 16,
                alignItems: 'center',
              }}
              onPress={onClose}
              disabled={loading}>
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#3b82f6',
                padding: 16,
                borderRadius: 16,
                alignItems: 'center',
                opacity: isFilterActive() && !loading ? 1 : 0.5,
                flexDirection: 'row',
                justifyContent: 'center',
                gap: 8,
              }}
              onPress={handleApply}
              disabled={!isFilterActive() || loading}>
              {loading && <ActivityIndicator size="small" color="#ffffff" />}
              <Text style={{ fontSize: 14, fontWeight: '600', color: '#ffffff' }}>
                {loading ? 'Applying...' : 'Apply Filter'}
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Form Modal Component (updated with member suggestions, status dropdown, and drawing reference dropdown)
const FormModal = ({ visible, onClose, onSubmit, selectedItem, members, statusOptions, drawingOptions }) => {
  const [formData, setFormData] = useState({
    dateOfChecking: '',
    status: '',
    statusId: '', // Store the status ID for API
    responsibleParty: '',
    responsiblePartyId: '', // Store the ID for API binding
    drawingReference: '',
    drawingReferenceId: '', // Store the drawing ID for API
    reportedBy: '',
    reportedById: '', // Store the ID for API binding
    description: '',
    location: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        dateOfChecking: selectedItem.dateOfChecking || '',
        status: selectedItem.snagStatus || '',
        statusId: selectedItem.snagStatus || '', // Map to statusId
        responsibleParty: selectedItem.responsibleParty || '',
        responsiblePartyId: selectedItem.responsiblePartyId || '',
        drawingReference: selectedItem.drawingReference || '',
        drawingReferenceId: selectedItem.drawingReference || '', // Map to drawingReferenceId
        reportedBy: selectedItem.reportedBy || '',
        reportedById: selectedItem.reportedById || '',
        description: selectedItem.description || '',
        location: selectedItem.location || '',
      });
    } else {
      setFormData({
        dateOfChecking: '',
        status: '',
        statusId: '',
        responsibleParty: '',
        responsiblePartyId: '',
        drawingReference: '',
        drawingReferenceId: '',
        reportedBy: '',
        reportedById: '',
        description: '',
        location: '',
      });
    }
  }, [selectedItem]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      dateOfChecking: date,
    }));
  };

  const handleStatusChange = (statusId) => {
    const selectedStatus = statusOptions.find(opt => opt.autoId === statusId);
    setFormData((prev) => ({
      ...prev,
      statusId: statusId,
      status: selectedStatus ? selectedStatus.dropdownValue : '',
    }));
  };

  const handleDrawingReferenceChange = (drawingId) => {
    const selectedDrawing = drawingOptions.find(opt => opt.autoId === drawingId);
    setFormData((prev) => ({
      ...prev,
      drawingReferenceId: drawingId,
      drawingReference: selectedDrawing ? selectedDrawing.drawingName : '',
    }));
  };

  const handleResponsiblePartySelect = (member) => {
    console.log('🟢 Responsible Party Selected:', member);
    setFormData((prev) => ({
      ...prev,
      responsibleParty: member.name,
      responsiblePartyId: member.autoId,
    }));
  };

  const handleReportedBySelect = (member) => {
    console.log('🟢 Reported By Selected:', member);
    setFormData((prev) => ({
      ...prev,
      reportedBy: member.name,
      reportedById: member.autoId,
    }));
  };

  const handleSubmit = async () => {
    console.log('Submitting form data:', formData);

    const userData = await AsyncStorage.getItem('userData');
    const parsedData = JSON.parse(userData);
    try {
      const requiredFields = [
        'dateOfChecking',
        'statusId',
        'responsibleParty',
        'drawingReferenceId',
        'reportedBy',
        'description',
        'location',
      ];

      if (requiredFields.some((field) => !formData[field])) {
        alert('Please fill all required fields');
        return;
      }

      // Generate unique ID
      const idResponse = await fetch(
        'https://api-v2-skystruct.prudenttec.com/commonControl/get-common-generated-id',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': 'ERkvlKwRG7x',
          },
          body: JSON.stringify({
            type: 'SNAG_ID',
            lableName: 'SNAG',
          }),
        }
      );

      const idData = await idResponse.json();
      const generatedSnagId = idData.idGeneratedBean.moduleLable;

      // Prepare snag data - use IDs for reportedBy, responsibleParty, status, and drawing reference
      const snagData = {
        snaggingReportFormBean: {
          snagId: generatedSnagId,
          location: formData.location,
          dateOfChecking: formData.dateOfChecking,
          reportedBy: formData.reportedById, // Use ID instead of name
          responsibleParty: formData.responsiblePartyId, // Use ID instead of name
          description: formData.description,
          drawingReference: formData.drawingReferenceId, // Use drawing ID
          snagStatus: formData.statusId, // Use status ID
        },
      };

      console.log('Submitting snag data:', JSON.stringify(snagData, null, 2));

      // Submit snag data
      const submitResponse = await fetch('https://api-v2-skystruct.prudenttec.com/snagging', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': 'ERkvlKwRG7x',
        },
        body: JSON.stringify(snagData),
      });

      if (!submitResponse.ok) {
        throw new Error('Failed to submit snag data');
      }

      const submitResult = await submitResponse.json();

      if (submitResult.status) {
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

            {/* Date Of Checking with Date Picker */}
            <View style={{ marginBottom: 16 }}>
              <DatePickerField
                label="Date Of Checking *"
                value={formData.dateOfChecking}
                onChange={handleDateChange}
                placeholder="Select Date (YYYY-MM-DD)"
              />
            </View>

            {/* Status Field with Dropdown */}
            <DropdownField
              label="Status"
              value={formData.statusId}
              onValueChange={handleStatusChange}
              placeholder="Select Status"
              options={statusOptions}
            />

            {/* Responsible Party with AutoComplete */}
            <AutoCompleteInput
              label="Responsible Party"
              value={formData.responsibleParty}
              onChange={(text) => handleInputChange('responsibleParty', text)}
              placeholder="Search responsible party..."
              suggestions={members || []}
              onSuggestionSelect={handleResponsiblePartySelect}
            />

            {/* Location Field */}
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

            {/* Drawing Reference Field with Dropdown */}
            <DropdownField
              label="Drawing Reference"
              value={formData.drawingReferenceId}
              onValueChange={handleDrawingReferenceChange}
              placeholder="Select Drawing Reference"
              options={drawingOptions}
            />

            {/* Reported By with AutoComplete */}
            <AutoCompleteInput
              label="Reported By"
              value={formData.reportedBy}
              onChange={(text) => handleInputChange('reportedBy', text)}
              placeholder="Search reported by..."
              suggestions={members || []}
              onSuggestionSelect={handleReportedBySelect}
            />

            {/* Description Field */}
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
  const [expandedItems, setExpandedItems] = useState({});
  const [snaggingList, setSnaggingList] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [members, setMembers] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [drawingOptions, setDrawingOptions] = useState([]);

  // Fetch initial data, members, status options, and drawing options
  useEffect(() => {
    fetchInitialData();
    fetchMembers();
    fetchStatusOptions();
    fetchDrawingOptions();
  }, []);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(userData);

      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/snagging/get-filter-list',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': 'ERkvlKwRG7x',
          },
          body: JSON.stringify({
            startDate: '',
            endDate: '',
            rejectStatus: '',
            status: '',
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.snaggingReportFormBeans) {
          setSnaggingList(data.snaggingReportFormBeans);
        }
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
      Alert.alert('Error', 'Failed to load snagging reports');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(userData);

      console.log('Fetching members...');

      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/member/get-all-member-list-by-org',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': '8OMNBJc0dAp',
          },
          body: JSON.stringify({ comment: '' }),
        }
      );

      console.log('Members API response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Members API response:', data);
        if (data.memberFormBeans) {
          setMembers(data.memberFormBeans);
          console.log('Members set:', data.memberFormBeans.length);
        } else {
          console.log('No memberFormBeans in response');
          setMembers([]);
        }
      } else {
        console.log('Members API failed with status:', response.status);
        setMembers([]);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
      setMembers([]);
    }
  };

  const fetchStatusOptions = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(userData);

      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/snagging/snagging-dropdown',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': 'ERkvlKwRG7x',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Dropdown API response:', data);
        
        if (data.dropdownMap && data.dropdownMap.SNAG_STATUS) {
          setStatusOptions(data.dropdownMap.SNAG_STATUS);
          console.log('SNAG_STATUS options loaded:', data.dropdownMap.SNAG_STATUS);
        } else {
          console.log('No SNAG_STATUS found in dropdownMap');
          // Fallback options in case API doesn't return SNAG_STATUS
          setStatusOptions([
            { autoId: '7lr1YMtlO1N', dropdownValue: 'Reported' },
            { autoId: '2JxnZmhT5Xq', dropdownValue: 'In Progress' },
            { autoId: 'H5vEwBWyxFP', dropdownValue: 'Resolved' },
          ]);
        }
      }
    } catch (error) {
      console.error('Error fetching status options:', error);
      // Fallback options in case of error
      setStatusOptions([
        { autoId: '7lr1YMtlO1N', dropdownValue: 'Reported' },
        { autoId: '2JxnZmhT5Xq', dropdownValue: 'In Progress' },
        { autoId: 'H5vEwBWyxFP', dropdownValue: 'Resolved' },
      ]);
    }
  };

  const fetchDrawingOptions = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(userData);

      console.log('Fetching drawing options...');

      const requestBody = {
        startDate: "2025-08-17",
        endDate: "2025-09-30",
        category: "8esGod9ZtCr,3vJzY75y0Hj,CmSLCVgJiRs,igzr4yDzOL",
        id: "IqHniRdscrD,4JCuU5I49Td,Ir8QI5LK97u,LNuNKDCECh7,3WusPiSSnZU,58A0gTZTlb8,IcKEKIR4519,ERkvlKwRG7x",
        status: "JoiAVNfXFsL,9dlHC4eNwBk,1alUiQbZ0y6,52fWDmUCs9u,5lpU2f4CdgX,GZvE8miOTl2,LHqhwckZhoc"
      };

      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/drawing/get-drawing-filter-list',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': 'ERkvlKwRG7x',
          },
          body: JSON.stringify(requestBody),
        }
      );

      console.log('Drawing API response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Drawing API response:', data);
        
        if (data.drawingFormBeans) {
          setDrawingOptions(data.drawingFormBeans);
          console.log('Drawing options loaded:', data.drawingFormBeans.length);
        } else {
          console.log('No drawingFormBeans in response');
          setDrawingOptions([]);
        }
      } else {
        console.log('Drawing API failed with status:', response.status);
        setDrawingOptions([]);
      }
    } catch (error) {
      console.error('Error fetching drawing options:', error);
      setDrawingOptions([]);
    }
  };

  const handleRefresh = useCallback(async () => {
    await fetchInitialData();
  }, []);

  useEffect(() => {
    console.log('FormModal - Members received:', members?.length);
    console.log('FormModal - First member:', members?.[0]);
    console.log('FormModal - Drawing options received:', drawingOptions?.length);
  }, [members, drawingOptions]);

  // Fixed: Toggle individual items properly
  const toggleItem = useCallback((autoId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [autoId]: !prev[autoId],
    }));
  }, []);

  const handleFormSubmit = async (formData, isUpdate) => {
    // Refresh the list after form submission
    await fetchInitialData();
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setShowFormModal(true);
  };

  const handleDelete = async (autoId) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(userData);

      const response = await fetch(`https://api-v2-skystruct.prudenttec.com/snagging/${autoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': 'ERkvlKwRG7x',
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Snag report deleted successfully');
        await fetchInitialData();
      }
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Failed to delete snag report');
    }
  };

  const handleApprove = async (autoId) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(userData);

      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/approval/approve-or-reject-module-details',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': 'ERkvlKwRG7x',
          },
          body: JSON.stringify({
            autoId: autoId,
            status: 'A', // Approve
          }),
        }
      );

      if (response.ok) {
        Alert.alert('Success', 'Snag report approved successfully');
        await fetchInitialData();
      }
    } catch (error) {
      console.error('Approve error:', error);
      Alert.alert('Error', 'Failed to approve snag report');
    }
  };

  const handleReject = async (autoId) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      const parsedData = JSON.parse(userData);

      const response = await fetch(
        'https://api-v2-skystruct.prudenttec.com/snagging/approve-reject',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${parsedData.jwtToken}`,
            'X-Menu-Id': 'ERkvlKwRG7x',
          },
          body: JSON.stringify({
            autoId: autoId,
            status: 'R', // Reject
          }),
        }
      );

      if (response.ok) {
        Alert.alert('Success', 'Snag report rejected successfully');
        await fetchInitialData();
      }
    } catch (error) {
      console.error('Reject error:', error);
      Alert.alert('Error', 'Failed to reject snag report');
    }
  };

  const handleDownload = (snagId) => {
    console.log('Download', snagId);
    // Implement download logic
  };

  const handleEmail = async (snagId) => {
    console.log('Email', snagId);
    // Implement email logic
  };

  // Handle filter application
  const handleApplyFilter = (filterResult) => {
    if (
      filterResult &&
      filterResult.apiResponse &&
      filterResult.apiResponse.snaggingReportFormBeans
    ) {
      setSnaggingList(filterResult.apiResponse.snaggingReportFormBeans);
      setCurrentFilter(filterResult.filterData);
      // Reset expanded items when filter changes
      setExpandedItems({});
    }
  };

  const filteredSnaggingList = useMemo(() => {
    let result = [...snaggingList];

    // Apply search filter
    if (searchQuery.trim()) {
      result = result.filter(
        (item) =>
          item.snagId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.autoId?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [searchQuery, snaggingList]);

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
        {/* Header */}
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
                {filteredSnaggingList.length} snagging reports •{' '}
                {currentFilter ? 'Filtered' : 'All reports'}
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
                  placeholder="Search snag IDs, locations, auto IDs..."
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
              {currentFilter && (
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
                    Filter
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
                key={item.autoId}
                item={item}
                expanded={expandedItems[item.autoId]} // Fixed: Use autoId instead of snagId
                onToggle={() => toggleItem(item.autoId)} // Fixed: Use autoId
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
          currentFilter={currentFilter}
          onApplyFilter={handleApplyFilter}
        />

        {/* Form Modal */}
        <FormModal
          visible={showFormModal}
          onClose={() => setShowFormModal(false)}
          onSubmit={handleFormSubmit}
          selectedItem={selectedItem}
          members={members} // Pass members to FormModal
          statusOptions={statusOptions} // Pass status options to FormModal
          drawingOptions={drawingOptions} // Pass drawing options to FormModal
        />
      </View>
    </MainLayout>
  );
};

export default SnaggingReportScreen;

// import React, { useState, useCallback, useMemo, useEffect } from 'react';
// import {
//   View,
//   Text,
//   ScrollView,
//   TouchableOpacity,
//   Dimensions,
//   ActivityIndicator,
//   TextInput,
//   Modal,
//   Image,
// } from 'react-native';
// import MainLayout from '../../../components/MainLayout';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import { LinearGradient } from 'expo-linear-gradient';
// import Animated, { FadeInDown, FadeOut, FadeInUp, SlideInRight } from 'react-native-reanimated';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const screenWidth = Dimensions.get('window').width;
// const cardWidth = Math.min(screenWidth - 32, 600);

// // Base URL for APIs (placeholder - replace with actual base URL)
// const API_BASE_URL = 'https://api.example.com/snagging';

// // Sample Snagging Report data (initial, will be replaced by API)
// const initialSnaggingData = [
//   {
//     snagId: 'PROJ-002-SNAG-00001',
//     dateOfChecking: '2023-10-15',
//     status: 'Reported',
//     responsibleParty: 'Contractor A',
//     drawingReference: 'DRW-001',
//     reportedBy: 'John Doe',
//     description: 'Crack in the wall on the east side',
//     location: 'Building A, Level 3',
//     priority: 'High',
//     dueDate: '2023-10-20',
//     category: 'Structural',
//     attachments: [],
//   },
//   {
//     snagId: 'PROJ-002-SNAG-00002',
//     dateOfChecking: '2023-10-16',
//     status: 'In Progress',
//     responsibleParty: 'Contractor B',
//     drawingReference: 'DRW-002',
//     reportedBy: 'Jane Smith',
//     description: 'Leaking pipe in bathroom',
//     location: 'Building B, Level 2',
//     priority: 'Medium',
//     dueDate: '2023-10-21',
//     category: 'Plumbing',
//     attachments: [],
//   },
//   {
//     snagId: 'PROJ-002-SNAG-00003',
//     dateOfChecking: '2023-10-17',
//     status: 'Resolved',
//     responsibleParty: 'Contractor C',
//     drawingReference: 'DRW-003',
//     reportedBy: 'Mike Johnson',
//     description: 'Faulty electrical wiring',
//     location: 'Building C, Level 1',
//     priority: 'High',
//     dueDate: '2023-10-22',
//     category: 'Electrical',
//     attachments: [],
//   },
//   {
//     snagId: 'PROJ-002-SNAG-00004',
//     dateOfChecking: '2023-10-18',
//     status: 'Resolved',
//     responsibleParty: 'Contractor A',
//     drawingReference: 'DRW-004',
//     reportedBy: 'Sarah Wilson',
//     description: 'Damaged floor tiles',
//     location: 'Building A, Level 4',
//     priority: 'Low',
//     dueDate: '2023-10-23',
//     category: 'Finishes',
//     attachments: [],
//   },
// ];

// // Status Indicator Component
// const StatusIndicator = ({ status }) => {
//   const statusConfig = {
//     Open: { color: '#f59e0b', bg: '#fef3c7', icon: 'alert-circle-outline' },
//     'In Progress': { color: '#3b82f6', bg: '#dbeafe', icon: 'progress-clock' },
//     Resolved: { color: '#10b981', bg: '#d1fae5', icon: 'check-circle' },
//     Closed: { color: '#6b7280', bg: '#f3f4f6', icon: 'lock-check' },
//   };

//   const statusCfg = statusConfig[status] || statusConfig['Open'];

//   return (
//     <View
//       style={{
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 12,
//         paddingVertical: 6,
//         borderRadius: 16,
//         backgroundColor: statusCfg.bg,
//         alignSelf: 'flex-start',
//       }}>
//       <Icon name={statusCfg.icon} size={14} color={statusCfg.color} style={{ marginRight: 4 }} />
//       <Text
//         style={{
//           fontSize: 12,
//           fontWeight: '600',
//           color: statusCfg.color,
//         }}>
//         {status}
//       </Text>
//     </View>
//   );
// };

// // Snagging Report Card Component
// const SnaggingCard = ({
//   item,
//   expanded,
//   onToggle,
//   onEdit,
//   onDelete,
//   onApprove,
//   onReject,
//   onDownload,
//   onEmail,
// }) => {
//   return (
//     <Animated.View entering={FadeInDown.duration(500)}>
//       <View
//         style={{
//           borderRadius: 20,
//           backgroundColor: '#ffffff',
//           marginBottom: 16,
//           overflow: 'hidden',
//           shadowColor: '#000',
//           shadowOffset: { width: 0, height: 2 },
//           shadowOpacity: 0.1,
//           shadowRadius: 8,
//           elevation: 4,
//         }}>
//         {/* Header - Applying light blue theme here */}
//         <TouchableOpacity onPress={onToggle}>
//           <LinearGradient
//             colors={['#dbeafe', '#bfdbfe']} // Light blue gradient
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 1 }}
//             style={{ padding: 20 }}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//               }}>
//               <View style={{ flex: 1 }}>
//                 <Text
//                   style={{
//                     fontSize: 18,
//                     fontWeight: '700',
//                     color: '#1e40af', // Darker blue for contrast
//                     marginBottom: 4,
//                   }}>
//                   {item.snagId}
//                 </Text>
//                 <Text
//                   style={{
//                     fontSize: 13,
//                     color: '#3b82f6', // Medium blue
//                     marginBottom: 8,
//                   }}>
//                   {item.location}
//                 </Text>
//               </View>
//               <View style={{ alignItems: 'flex-end' }}>
//                 <Text
//                   style={{
//                     fontSize: 12,
//                     color: '#3b82f6', // Medium blue
//                     marginBottom: 4,
//                   }}>
//                   {item.dateOfChecking}
//                 </Text>
//                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                   <Text
//                     style={{
//                       fontSize: 12,
//                       color: '#3b82f6', // Medium blue
//                       marginRight: 8,
//                     }}>
//                     {item.responsibleParty}
//                   </Text>
//                   <StatusIndicator status={item.status} />
//                 </View>
//               </View>
//               <Icon
//                 name={expanded ? 'chevron-up' : 'chevron-down'}
//                 size={24}
//                 color="#1e40af"
//                 style={{ marginLeft: 12 }}
//               />
//             </View>
//           </LinearGradient>
//         </TouchableOpacity>

//         {/* Expanded Content */}
//         {expanded && (
//           <Animated.View entering={FadeInUp} exiting={FadeOut}>
//             <View style={{ padding: 16, backgroundColor: '#f8fafc' }}>
//               {/* Details */}
//               <View
//                 style={{
//                   backgroundColor: '#ffffff',
//                   borderRadius: 12,
//                   padding: 16,
//                   marginBottom: 12,
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 16,
//                     fontWeight: '700',
//                     color: '#1f2937',
//                     marginBottom: 12,
//                   }}>
//                   Snagging Details
//                 </Text>

//                 <View style={{ flexDirection: 'row', marginBottom: 8 }}>
//                   <View style={{ flex: 1 }}>
//                     <Text style={{ fontSize: 12, color: '#6b7280' }}>Date of Checking</Text>
//                     <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
//                       {item.dateOfChecking}
//                     </Text>
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text style={{ fontSize: 12, color: '#6b7280' }}>Status</Text>
//                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                       <StatusIndicator status={item.status} />
//                     </View>
//                   </View>
//                 </View>

//                 <View style={{ flexDirection: 'row', marginBottom: 8 }}>
//                   <View style={{ flex: 1 }}>
//                     <Text style={{ fontSize: 12, color: '#6b7280' }}>Responsible Party</Text>
//                     <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
//                       {item.responsibleParty}
//                     </Text>
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text style={{ fontSize: 12, color: '#6b7280' }}>Drawing Reference</Text>
//                     <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
//                       {item.drawingReference}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={{ flexDirection: 'row', marginBottom: 8 }}>
//                   <View style={{ flex: 1 }}>
//                     <Text style={{ fontSize: 12, color: '#6b7280' }}>Reported By</Text>
//                     <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
//                       {item.reportedBy}
//                     </Text>
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text style={{ fontSize: 12, color: '#6b7280' }}>Location</Text>
//                     <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
//                       {item.location}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={{ flexDirection: 'row', marginBottom: 8 }}>
//                   <View style={{ flex: 1 }}>
//                     <Text style={{ fontSize: 12, color: '#6b7280' }}>Priority</Text>
//                     <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
//                       {item.priority}
//                     </Text>
//                   </View>
//                   <View style={{ flex: 1 }}>
//                     <Text style={{ fontSize: 12, color: '#6b7280' }}>Due Date</Text>
//                     <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
//                       {item.dueDate}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={{ flexDirection: 'row', marginBottom: 8 }}>
//                   <View style={{ flex: 1 }}>
//                     <Text style={{ fontSize: 12, color: '#6b7280' }}>Category</Text>
//                     <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
//                       {item.category}
//                     </Text>
//                   </View>
//                 </View>

//                 <View style={{ marginTop: 8 }}>
//                   <Text style={{ fontSize: 12, color: '#6b7280' }}>Description</Text>
//                   <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>
//                     {item.description}
//                   </Text>
//                 </View>

//                 {/* Attachments */}
//                 <View style={{ marginTop: 16 }}>
//                   <Text style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
//                     Attachments
//                   </Text>
//                   {item.attachments.length > 0 ? (
//                     item.attachments.map((attach, index) => (
//                       <View key={index} style={{ marginBottom: 8 }}>
//                         {attach.endsWith('.jpg') || attach.endsWith('.png') ? (
//                           <Image
//                             source={{ uri: attach }}
//                             style={{ width: 100, height: 100, borderRadius: 8 }}
//                           />
//                         ) : (
//                           <Text style={{ fontSize: 14, color: '#374151' }}>{attach}</Text>
//                         )}
//                       </View>
//                     ))
//                   ) : (
//                     <Text style={{ fontSize: 14, color: '#374151' }}>No attachments</Text>
//                   )}
//                 </View>
//               </View>

//               {/* Action Buttons */}
//               <View
//                 style={{
//                   flexDirection: 'row',
//                   justifyContent: 'space-between',
//                   backgroundColor: '#ffffff',
//                   borderRadius: 12,
//                   padding: 16,
//                   flexWrap: 'wrap',
//                 }}>
//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     padding: 8,
//                   }}
//                   onPress={() => console.log('View', item.snagId)}>
//                   <Icon name="eye-outline" size={20} color="#3b82f6" style={{ marginRight: 8 }} />
//                   <Text style={{ color: '#3b82f6', fontWeight: '600' }}>View</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     padding: 8,
//                   }}
//                   onPress={() => onEdit(item)}>
//                   <Icon
//                     name="pencil-outline"
//                     size={20}
//                     color="#10b981"
//                     style={{ marginRight: 8 }}
//                   />
//                   <Text style={{ color: '#10b981', fontWeight: '600' }}>Edit</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     padding: 8,
//                   }}
//                   onPress={() => onDelete(item.snagId)}>
//                   <Icon
//                     name="delete-outline"
//                     size={20}
//                     color="#ef4444"
//                     style={{ marginRight: 8 }}
//                   />
//                   <Text style={{ color: '#ef4444', fontWeight: '600' }}>Delete</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     padding: 8,
//                   }}
//                   onPress={() => onDownload(item.snagId)}>
//                   <Icon name="download" size={20} color="#6b7280" style={{ marginRight: 8 }} />
//                   <Text style={{ color: '#6b7280', fontWeight: '600' }}>Download</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     padding: 8,
//                   }}
//                   onPress={() => onEmail(item.snagId)}>
//                   <Icon name="email-outline" size={20} color="#ef4444" style={{ marginRight: 8 }} />
//                   <Text style={{ color: '#ef4444', fontWeight: '600' }}>Email</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     padding: 8,
//                   }}
//                   onPress={() => onApprove(item.snagId)}>
//                   <Icon
//                     name="thumb-up-outline"
//                     size={20}
//                     color="#10b981"
//                     style={{ marginRight: 8 }}
//                   />
//                   <Text style={{ color: '#10b981', fontWeight: '600' }}>Approve</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity
//                   style={{
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                     padding: 8,
//                   }}
//                   onPress={() => onReject(item.snagId)}>
//                   <Icon
//                     name="thumb-down-outline"
//                     size={20}
//                     color="#ef4444"
//                     style={{ marginRight: 8 }}
//                   />
//                   <Text style={{ color: '#ef4444', fontWeight: '600' }}>Reject</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Animated.View>
//         )}
//       </View>
//     </Animated.View>
//   );
// };

// // Filter Modal Component
// const FilterModal = ({ visible, onClose, currentFilter, onApplyFilter }) => {
//   const [tempFilter, setTempFilter] = useState(currentFilter);

//   const filters = ['All', 'Open', 'In Progress', 'Resolved', 'Closed'];

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
//         <Animated.View
//           entering={FadeInUp}
//           style={{
//             backgroundColor: '#ffffff',
//             borderTopLeftRadius: 24,
//             borderTopRightRadius: 24,
//             padding: 24,
//           }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: 24,
//             }}>
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: '700',
//                 color: '#1f2937',
//               }}>
//               Filter Snagging Reports
//             </Text>
//             <TouchableOpacity onPress={onClose}>
//               <Icon name="close" size={24} color="#6b7280" />
//             </TouchableOpacity>
//           </View>

//           <View style={{ gap: 12 }}>
//             <Text
//               style={{
//                 fontSize: 16,
//                 fontWeight: '600',
//                 color: '#374151',
//               }}>
//               Status
//             </Text>
//             {filters.map((status) => (
//               <TouchableOpacity
//                 key={status}
//                 style={{
//                   padding: 16,
//                   borderRadius: 16,
//                   borderWidth: 2,
//                   borderColor:
//                     tempFilter === status || (status === 'All' && !tempFilter)
//                       ? '#3b82f6'
//                       : '#e5e7eb',
//                   backgroundColor:
//                     tempFilter === status || (status === 'All' && !tempFilter)
//                       ? '#eff6ff'
//                       : '#ffffff',
//                 }}
//                 onPress={() => setTempFilter(status === 'All' ? null : status)}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontWeight: '600',
//                     color:
//                       tempFilter === status || (status === 'All' && !tempFilter)
//                         ? '#3b82f6'
//                         : '#374151',
//                   }}>
//                   {status}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>

//           <View
//             style={{
//               flexDirection: 'row',
//               gap: 12,
//               marginTop: 24,
//             }}>
//             <TouchableOpacity
//               style={{
//                 flex: 1,
//                 backgroundColor: '#f3f4f6',
//                 padding: 16,
//                 borderRadius: 16,
//                 alignItems: 'center',
//               }}
//               onPress={onClose}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   color: '#374151',
//                 }}>
//                 Cancel
//               </Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={{
//                 flex: 1,
//                 backgroundColor: '#3b82f6',
//                 padding: 16,
//                 borderRadius: 16,
//                 alignItems: 'center',
//               }}
//               onPress={() => {
//                 onApplyFilter(tempFilter);
//                 onClose();
//               }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   color: '#ffffff',
//                 }}>
//                 Apply Filter
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// // Dropdown Component
// const Dropdown = ({ options, value, onSelect, placeholder, isOpen, onToggle }) => {
//   return (
//     <View>
//       <TouchableOpacity
//         style={{
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           borderWidth: 1,
//           borderColor: '#d1d5db',
//           borderRadius: 8,
//           padding: 12,
//         }}
//         onPress={onToggle}>
//         <Text
//           style={
//             value
//               ? {
//                   fontSize: 14,
//                   color: '#1f2937',
//                 }
//               : {
//                   fontSize: 14,
//                   color: '#9ca3af',
//                 }
//           }>
//           {value || placeholder}
//         </Text>
//         <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#6b7280" />
//       </TouchableOpacity>

//       {isOpen && (
//         <Animated.View
//           entering={FadeInUp}
//           style={{
//             position: 'absolute',
//             top: '100%',
//             left: 0,
//             right: 0,
//             backgroundColor: '#ffffff',
//             borderWidth: 1,
//             borderColor: '#d1d5db',
//             borderRadius: 8,
//             marginTop: 4,
//             zIndex: 10,
//             maxHeight: 200,
//             overflow: 'hidden',
//           }}>
//           <ScrollView>
//             {options.map((option, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={{
//                   padding: 12,
//                   borderBottomWidth: index < options.length - 1 ? 1 : 0,
//                   borderBottomColor: '#f3f4f6',
//                 }}
//                 onPress={() => {
//                   onSelect(option);
//                   onToggle();
//                 }}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     color: '#1f2937',
//                   }}>
//                   {option}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// // Form Modal Component
// const FormModal = ({ visible, onClose, onSubmit, selectedItem }) => {
//   const [formData, setFormData] = useState({
//     dateOfChecking: '',
//     status: '',
//     responsibleParty: '',
//     drawingReference: '',
//     reportedBy: '',
//     description: '',
//     location: '',
//     priority: '',
//     dueDate: '',
//     category: '',
//   });
//   const [files, setFiles] = useState([]);

//   const [dropdownsOpen, setDropdownsOpen] = useState({
//     status: false,
//     responsibleParty: false,
//     drawingReference: false,
//     reportedBy: false,
//     priority: false,
//     category: false,
//   });

//   // Dropdown options (fetched or sample)
//   const [statusOptions, setStatusOptions] = useState(['Reported', 'In Progress', 'Resolved']);
//   const [responsiblePartyOptions, setResponsiblePartyOptions] = useState([
//     'Contractor A',
//     'Contractor B',
//     'Contractor C',
//     'Contractor D',
//   ]);
//   const [drawingReferenceOptions, setDrawingReferenceOptions] = useState([
//     'DRW-001',
//     'DRW-002',
//     'DRW-003',
//     'DRW-004',
//     'DRW-005',
//   ]);
//   const [reportedByOptions, setReportedByOptions] = useState([
//     'John Doe',
//     'Jane Smith',
//     'Mike Johnson',
//     'Sarah Wilson',
//     'Robert Brown',
//   ]);
//   const priorityOptions = ['Low', 'Medium', 'High', 'Critical'];
//   const categoryOptions = [
//     'Structural',
//     'Plumbing',
//     'Electrical',
//     'Finishes',
//     'External',
//     'Heating',
//     'Other',
//   ];

//   useEffect(() => {
//     if (selectedItem) {
//       setFormData(selectedItem);
//       setFiles(selectedItem.attachments || []);
//     } else {
//       setFormData({
//         dateOfChecking: '',
//         status: '',
//         responsibleParty: '',
//         drawingReference: '',
//         reportedBy: '',
//         description: '',
//         location: '',
//         priority: '',
//         dueDate: '',
//         category: '',
//       });
//       setFiles([]);
//     }
//   }, [selectedItem]);

//   useEffect(() => {
//     // Request permissions for image picker
//     (async () => {
//       await ImagePicker.requestMediaLibraryPermissionsAsync();
//     })();

//     // Fetch dropdown lists (API integration)
//     const fetchDropdowns = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/getDropdownList`);
//         const data = await response.json();
//         setStatusOptions(data.status || statusOptions);
//         setResponsiblePartyOptions(data.responsibleParty || responsiblePartyOptions);
//         setDrawingReferenceOptions(data.drawingReference || drawingReferenceOptions);
//         setReportedByOptions(data.reportedBy || reportedByOptions);
//         // Add more if API provides
//       } catch (error) {
//         console.error('Error fetching dropdowns:', error);
//       }
//     };
//     fetchDropdowns();
//   }, []);

//   const handleInputChange = (field, value) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const toggleDropdown = (dropdown) => {
//     setDropdownsOpen((prev) => ({
//       ...prev,
//       [dropdown]: !prev[dropdown],
//     }));
//   };

//   const handleFileUpload = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: false,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       const uri = result.assets[0].uri;
//       setFiles((prev) => [...prev, uri]);
//     }
//   };

//   // const handleSubmit = async () => {
//   //   // Validate required fields
//   //   const requiredFields = ['dateOfChecking', 'status', 'responsibleParty', 'drawingReference', 'reportedBy', 'description', 'location', 'priority', 'dueDate', 'category'];
//   //   if (requiredFields.some(field => !formData[field])) {
//   //     alert('Please fill all required fields');
//   //     return;
//   //   }

//   //   let uploadedAttachments = [];
//   //   for (const file of files) {
//   //     try {
//   //       // Get unique number
//   //       const uniqueRes = await fetch(`${API_BASE_URL}/getUniqueNumberForFileUpload`);
//   //       const uniqueData = await uniqueRes.json();
//   //       const uniqueNumber = uniqueData.uniqueNumber;

//   //       // Upload file
//   //       const formDataUpload = new FormData();
//   //       formDataUpload.append('file', {
//   //         uri: file,
//   //         type: 'image/jpeg', // Assume image, adjust as needed
//   //         name: 'attachment.jpg',
//   //       });
//   //       formDataUpload.append('uniqueNumber', uniqueNumber);

//   //       const uploadRes = await fetch(`${API_BASE_URL}/documentFilesForUpload`, {
//   //         method: 'POST',
//   //         body: formDataUpload,
//   //       });
//   //       const uploadData = await uploadRes.json();
//   //       uploadedAttachments.push(uploadData.fileUrl || file); // Assume returns url
//   //     } catch (error) {
//   //       console.error('File upload error:', error);
//   //     }
//   //   }

//   //   const submitData = { ...formData, attachments: uploadedAttachments };

//   //   onSubmit(submitData, !!selectedItem);
//   //   onClose();
//   // };

//   // const handleSubmit = async () => {
//   //   console.log('Submitting form data:', formData);

//   //   const userData = await AsyncStorage.getItem('userData');
//   //   const parsedData = JSON.parse(userData);
//   //   try {
//   //     // Validate required fields (only include fields that are currently in your form)
//   //     const requiredFields = [
//   //       'dateOfChecking',
//   //       'status',
//   //       'responsibleParty',
//   //       'drawingReference',
//   //       'reportedBy',
//   //       'description',
//   //       'location',
//   //     ];

//   //     if (requiredFields.some((field) => !formData[field])) {
//   //       alert('Please fill all required fields');
//   //       return;
//   //     }

//   //     // Step 1: Generate unique ID
//   //     const idResponse = await fetch(
//   //       'https://api-v2-skystruct.prudenttec.com/commonControl/get-common-generated-id',
//   //       {
//   //         method: 'POST',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           Authorization: `Bearer ${parsedData.jwtToken}`, // Replace with your actual token
//   //           'X-Menu-Id': 'ERkvlKwRG7x',
//   //         },
//   //         body: JSON.stringify({
//   //           type: 'SNAG_ID',
//   //           lableName: 'SNAG',
//   //         }),
//   //       }
//   //     );

//   //     console.log('ID generation response:', idResponse);

//   //     // if (!idResponse.ok) {
//   //     //   throw new Error('Failed to generate ID');
//   //     // }

//   //     const idData = await idResponse.json();
//   //     console.log('ID generation data:', idData);

//   //     // if (!idData.status) {
//   //     //   throw new Error('ID generation failed');
//   //     // }

//   //     const generatedSnagId = idData.idGeneratedBean.moduleLable;

//   //     // Step 2: Prepare snag data for submission with correct structure
//   //     const snagData = {
//   //       snaggingReportFormBean: {
//   //         snagId: generatedSnagId,
//   //         location: formData.location,
//   //         dateOfChecking: formData.dateOfChecking,
//   //         reportedBy: formData.reportedBy,
//   //         responsibleParty: formData.responsibleParty,
//   //         description: formData.description,
//   //         drawingReference: formData.drawingReference,
//   //         snagStatus: formData.status, // Map 'status' to 'snagStatus'
//   //       },
//   //     };

//   //     // Step 3: Submit snag data
//   //     const submitResponse = await fetch('https://api-v2-skystruct.prudenttec.com/snagging', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         Authorization: `Bearer ${parsedData.jwtToken}`, // Replace with your actual token
//   //         'X-Menu-Id': 'ERkvlKwRG7x',
//   //       },
//   //       body: JSON.stringify(snagData),
//   //     });

//   //     if (!submitResponse.ok) {
//   //       throw new Error('Failed to submit snag data');
//   //     }

//   //     const submitResult = await submitResponse.json();

//   //     if (submitResult.status) {
//   //       // Success - call the original onSubmit callback if needed
//   //       if (onSubmit) {
//   //         onSubmit(snagData.snaggingReportFormBean, !!selectedItem);
//   //       }
//   //       onClose();
//   //       alert('Snag report submitted successfully!');
//   //     } else {
//   //       throw new Error(submitResult.message || 'Submission failed');
//   //     }
//   //   } catch (error) {
//   //     console.error('Submission error:', error);
//   //     alert(`Error: ${error.message}`);
//   //   }
//   // };
//   const handleSubmit = async () => {
//     console.log('Submitting form data:', formData);

//     const userData = await AsyncStorage.getItem('userData');
//     const parsedData = JSON.parse(userData);

//     try {
//       // Validate required fields
//       const requiredFields = [
//         'dateOfChecking',
//         'status',
//         'responsibleParty',
//         'drawingReference',
//         'reportedBy',
//         'description',
//         'location',
//       ];

//       const missingFields = requiredFields.filter((field) => !formData[field]);
//       if (missingFields.length > 0) {
//         alert(`Please fill all required fields. Missing: ${missingFields.join(', ')}`);
//         return;
//       }

//       let generatedSnagId = '';

//       // Only generate new ID for new entries (not for updates)
//       if (!selectedItem) {
//         // Step 1: Generate unique ID
//         const idResponse = await fetch(
//           'https://api-v2-skystruct.prudenttec.com/commonControl/get-common-generated-id',
//           {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               Authorization: `Bearer ${parsedData.jwtToken}`,
//               'X-Menu-Id': 'ERkvlKwRG7x',
//             },
//             body: JSON.stringify({
//               type: 'SNAG_ID',
//               lableName: 'SNAG',
//             }),
//           }
//         );

//         console.log('ID generation response status:', idResponse.status);

//         // if (!idResponse.ok) {
//         //   throw new Error(`Failed to generate ID: ${idResponse.status}`);
//         // }

//         const idData = await idResponse.json();
//         console.log('ID generation data:', idData);

//         // if (!idData.status) {
//         //   throw new Error('ID generation failed: ' + (idData.message || 'Unknown error'));
//         // }

//         generatedSnagId = idData.idGeneratedBean?.moduleLable;
//         if (!generatedSnagId) {
//           throw new Error('No snag ID generated');
//         }
//       }

//       // Step 2: Prepare snag data with correct structure
//       const snagData = {
//         snaggingReportFormBean: {
//           ...(selectedItem && { autoId: selectedItem.autoId }), // Include autoId for updates
//           snagId: selectedItem ? selectedItem.snagId : generatedSnagId,
//           location: formData.location,
//           dateOfChecking: formData.dateOfChecking,
//           reportedBy: formData.reportedBy,
//           responsibleParty: formData.responsibleParty,
//           description: formData.description,
//           drawingReference: formData.drawingReference,
//           snagStatus: formData.status,
//           ...(selectedItem && { addedBy: parsedData.userId }), // Include addedBy for updates if needed
//         },
//       };

//       console.log('Submitting data:', JSON.stringify(snagData, null, 2));

//       // Step 3: Submit snag data
//       const submitResponse = await fetch('https://api-v2-skystruct.prudenttec.com/snagging', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${parsedData.jwtToken}`,
//           'X-Menu-Id': 'ERkvlKwRG7x',
//         },
//         body: JSON.stringify(snagData),
//       });

//       console.log('Submit response status:', submitResponse.status);

//       if (!submitResponse.ok) {
//         const errorText = await submitResponse.text();
//         throw new Error(`HTTP error! status: ${submitResponse.status}, message: ${errorText}`);
//       }

//       const submitResult = await submitResponse.json();
//       console.log('Submit result:', submitResult);

//       if (submitResult.status) {
//         // Success
//         if (onSubmit) {
//           onSubmit(snagData.snaggingReportFormBean, !!selectedItem);
//         }
//         onClose();
//         alert('Snag report ' + (selectedItem ? 'updated' : 'submitted') + ' successfully!');

//         // Refresh the list
//         // handleRefresh();
//       } else {
//         throw new Error(submitResult.message || 'Submission failed');
//       }
//     } catch (error) {
//       console.error('Submission error:', error);
//       alert(`Error: ${error.message}`);
//     }
//   };

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View
//         style={{
//           flex: 1,
//           backgroundColor: 'rgba(0, 0, 0, 0.5)',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: 16,
//         }}>
//         <Animated.View
//           entering={FadeInUp}
//           style={{
//             backgroundColor: '#ffffff',
//             borderRadius: 24,
//             padding: 24,
//             width: '100%',
//             maxWidth: 500,
//             maxHeight: '80%',
//           }}>
//           <ScrollView showsVerticalScrollIndicator={false}>
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 marginBottom: 20,
//               }}>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontWeight: '700',
//                   color: '#1f2937',
//                 }}>
//                 {selectedItem ? 'Edit Snagging Report' : 'Add Snagging Report'}
//               </Text>
//               <TouchableOpacity onPress={onClose}>
//                 <Icon name="close" size={24} color="#6b7280" />
//               </TouchableOpacity>
//             </View>

//             {/* Snag Id (read-only for edit, generated for add) */}
//             <View style={{ marginBottom: 16 }}>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: '600',
//                   color: '#374151',
//                   marginBottom: 8,
//                 }}>
//                 Snag Id
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 16,
//                   fontWeight: '600',
//                   color: '#3b82f6',
//                 }}>
//                 {selectedItem ? selectedItem.snagId : 'Generated on submit'}
//               </Text>
//             </View>

//             {/* Date Of Checking */}
//             <View style={{ marginBottom: 16 }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   color: '#374151',
//                   marginBottom: 8,
//                 }}>
//                 Date Of Checking *
//               </Text>
//               <TextInput
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#d1d5db',
//                   borderRadius: 8,
//                   padding: 12,
//                   fontSize: 14,
//                   color: '#1f2937',
//                 }}
//                 placeholder="Enter date (YYYY-MM-DD)"
//                 value={formData.dateOfChecking}
//                 onChangeText={(text) => handleInputChange('dateOfChecking', text)}
//               />
//             </View>

//             {/* Status */}
//             <View style={{ marginBottom: 16 }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   color: '#374151',
//                   marginBottom: 8,
//                 }}>
//                 Status *
//               </Text>
//               <Dropdown
//                 options={statusOptions}
//                 value={formData.status}
//                 onSelect={(value) => handleInputChange('status', value)}
//                 placeholder="Select Status"
//                 isOpen={dropdownsOpen.status}
//                 onToggle={() => toggleDropdown('status')}
//               />
//             </View>

//             {/* Responsible Party */}
//             <View style={{ marginBottom: 16 }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   color: '#374151',
//                   marginBottom: 8,
//                 }}>
//                 Responsible Party *
//               </Text>
//               <Dropdown
//                 options={responsiblePartyOptions}
//                 value={formData.responsibleParty}
//                 onSelect={(value) => handleInputChange('responsibleParty', value)}
//                 placeholder="Select Responsible Party"
//                 isOpen={dropdownsOpen.responsibleParty}
//                 onToggle={() => toggleDropdown('responsibleParty')}
//               />
//             </View>

//             {/* Location */}
//             <View style={{ marginBottom: 16 }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   color: '#374151',
//                   marginBottom: 8,
//                 }}>
//                 Location *
//               </Text>
//               <TextInput
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#d1d5db',
//                   borderRadius: 8,
//                   padding: 12,
//                   fontSize: 14,
//                   color: '#1f2937',
//                 }}
//                 placeholder="Enter location"
//                 value={formData.location}
//                 onChangeText={(text) => handleInputChange('location', text)}
//               />
//             </View>

//             {/* Drawing Reference */}
//             <View style={{ marginBottom: 16 }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   color: '#374151',
//                   marginBottom: 8,
//                 }}>
//                 Drawing Reference *
//               </Text>
//               <Dropdown
//                 options={drawingReferenceOptions}
//                 value={formData.drawingReference}
//                 onSelect={(value) => handleInputChange('drawingReference', value)}
//                 placeholder="Select Drawing Reference"
//                 isOpen={dropdownsOpen.drawingReference}
//                 onToggle={() => toggleDropdown('drawingReference')}
//               />
//             </View>

//             {/* Reported By */}
//             <View style={{ marginBottom: 16 }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   color: '#374151',
//                   marginBottom: 8,
//                 }}>
//                 Reported By *
//               </Text>
//               <Dropdown
//                 options={reportedByOptions}
//                 value={formData.reportedBy}
//                 onSelect={(value) => handleInputChange('reportedBy', value)}
//                 placeholder="Select Reported By"
//                 isOpen={dropdownsOpen.reportedBy}
//                 onToggle={() => toggleDropdown('reportedBy')}
//               />
//             </View>

//             {/* Priority */}
//             {/* <View style={{ marginBottom: 16 }}>
//               <Text style={{
//                 fontSize: 14,
//                 fontWeight: '600',
//                 color: '#374151',
//                 marginBottom: 8
//               }}>
//                 Priority *
//               </Text>
//               <Dropdown
//                 options={priorityOptions}
//                 value={formData.priority}
//                 onSelect={(value) => handleInputChange('priority', value)}
//                 placeholder="Select Priority"
//                 isOpen={dropdownsOpen.priority}
//                 onToggle={() => toggleDropdown('priority')}
//               />
//             </View> */}

//             {/* Due Date */}
//             {/* <View style={{ marginBottom: 16 }}>
//               <Text style={{
//                 fontSize: 14,
//                 fontWeight: '600',
//                 color: '#374151',
//                 marginBottom: 8
//               }}>
//                 Due Date *
//               </Text>
//               <TextInput
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#d1d5db',
//                   borderRadius: 8,
//                   padding: 12,
//                   fontSize: 14,
//                   color: '#1f2937'
//                 }}
//                 placeholder="Enter due date (YYYY-MM-DD)"
//                 value={formData.dueDate}
//                 onChangeText={(text) => handleInputChange('dueDate', text)}
//               />
//             </View> */}

//             {/* Category */}
//             {/* <View style={{ marginBottom: 16 }}>
//               <Text style={{
//                 fontSize: 14,
//                 fontWeight: '600',
//                 color: '#374151',
//                 marginBottom: 8
//               }}>
//                 Category *
//               </Text>
//               <Dropdown
//                 options={categoryOptions}
//                 value={formData.category}
//                 onSelect={(value) => handleInputChange('category', value)}
//                 placeholder="Select Category"
//                 isOpen={dropdownsOpen.category}
//                 onToggle={() => toggleDropdown('category')}
//               />
//             </View> */}

//             {/* Description */}
//             <View style={{ marginBottom: 16 }}>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   fontWeight: '600',
//                   color: '#374151',
//                   marginBottom: 8,
//                 }}>
//                 Description *
//               </Text>
//               <TextInput
//                 style={{
//                   borderWidth: 1,
//                   borderColor: '#d1d5db',
//                   borderRadius: 8,
//                   padding: 12,
//                   fontSize: 14,
//                   color: '#1f2937',
//                   height: 100,
//                   textAlignVertical: 'top',
//                 }}
//                 placeholder="Enter description"
//                 multiline={true}
//                 value={formData.description}
//                 onChangeText={(text) => handleInputChange('description', text)}
//               />
//             </View>

//             {/* Attachments */}
//             {/* <View style={{ marginBottom: 24 }}>
//               <Text style={{
//                 fontSize: 14,
//                 fontWeight: '600',
//                 color: '#374151',
//                 marginBottom: 8
//               }}>
//                 Attachments
//               </Text>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#3b82f6',
//                   padding: 12,
//                   borderRadius: 8,
//                   alignItems: 'center',
//                   marginBottom: 8
//                 }}
//                 onPress={handleFileUpload}
//               >
//                 <Text style={{ color: '#ffffff', fontWeight: '600' }}>Upload File</Text>
//               </TouchableOpacity>
//               {files.map((file, index) => (
//                 <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
//                   <Text style={{ flex: 1, fontSize: 14, color: '#374151' }}>{file.split('/').pop()}</Text>
//                   <TouchableOpacity onPress={() => setFiles(files.filter((_, i) => i !== index))}>
//                     <Icon name="close" size={20} color="#ef4444" />
//                   </TouchableOpacity>
//                 </View>
//               ))}
//             </View> */}

//             {/* Buttons */}
//             <View
//               style={{
//                 flexDirection: 'row',
//                 justifyContent: 'flex-end',
//                 gap: 12,
//               }}>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#f3f4f6',
//                   padding: 16,
//                   borderRadius: 16,
//                   minWidth: 100,
//                   alignItems: 'center',
//                 }}
//                 onPress={onClose}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontWeight: '600',
//                     color: '#374151',
//                   }}>
//                   Close
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity
//                 style={{
//                   backgroundColor: '#3b82f6',
//                   padding: 16,
//                   borderRadius: 16,
//                   minWidth: 100,
//                   alignItems: 'center',
//                 }}
//                 onPress={handleSubmit}>
//                 <Text
//                   style={{
//                     fontSize: 14,
//                     fontWeight: '600',
//                     color: '#ffffff',
//                   }}>
//                   {selectedItem ? 'Update' : 'Submit'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </ScrollView>
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

// // Main Snagging Report Screen Component
// const SnaggingReportScreen = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showFilterModal, setShowFilterModal] = useState(false);
//   const [showFormModal, setShowFormModal] = useState(false);
//   const [filterStatus, setFilterStatus] = useState(null);
//   const [expandedItems, setExpandedItems] = useState({});
//   const [snaggingList, setSnaggingList] = useState(initialSnaggingData);
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${API_BASE_URL}/snaggingFilterList`);
//         const data = await response.json();
//         setSnaggingList(data || initialSnaggingData);
//       } catch (error) {
//         console.error('Error fetching snagging list:', error);
//         setSnaggingList(initialSnaggingData);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleRefresh = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const response = await fetch(`${API_BASE_URL}/snaggingFilterList`);
//       const data = await response.json();
//       setSnaggingList(data || initialSnaggingData);
//     } catch (error) {
//       console.error('Error refreshing:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   const toggleItem = useCallback((snagId) => {
//     setExpandedItems((prev) => ({
//       ...prev,
//       [snagId]: !prev[snagId],
//     }));
//   }, []);

//   const handleFormSubmit = async (formData, isUpdate) => {
//     try {
//       let snagId = formData.snagId;
//       if (!isUpdate) {
//         const refResponse = await fetch(`${API_BASE_URL}/getReferenceNumber`);
//         const refData = await refResponse.json();
//         console.log('Reference data:', refData);

//         snagId = refData.reference;
//       }

//       const endpoint = isUpdate ? 'updateSnag' : 'addSnag';
//       await fetch(`${API_BASE_URL}/${endpoint}`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'X-Menu-Id': 'ERkvlKwRG7x' },
//         body: JSON.stringify({ ...formData, snagId }),
//       });

//       handleRefresh();
//     } catch (error) {
//       console.error('Submit error:', error);
//     }
//   };

//   const handleEdit = (item) => {
//     setSelectedItem(item);
//     setShowFormModal(true);
//   };

//   const handleDelete = async (snagId) => {
//     try {
//       await fetch(`${API_BASE_URL}/deleteById?id=${snagId}`, { method: 'DELETE' });
//       handleRefresh();
//     } catch (error) {
//       console.error('Delete error:', error);
//     }
//   };

//   const handleApprove = async (snagId) => {
//     try {
//       await fetch(`${API_BASE_URL}/approveandReject?id=${snagId}&action=approve`, {
//         method: 'POST',
//       });
//       handleRefresh();
//     } catch (error) {
//       console.error('Approve error:', error);
//     }
//   };

//   const handleReject = async (snagId) => {
//     try {
//       await fetch(`${API_BASE_URL}/approveandReject?id=${snagId}&action=reject`, {
//         method: 'POST',
//       });
//       handleRefresh();
//     } catch (error) {
//       console.error('Reject error:', error);
//     }
//   };

//   const handleDownload = (snagId) => {
//     console.log('Download', snagId);
//     // Implement download logic, e.g., generate PDF
//   };

//   const handleEmail = async (snagId) => {
//     try {
//       const mailBodyRes = await fetch(`${API_BASE_URL}/getSnaggingMailBodyById?id=${snagId}`);
//       const mailBody = await mailBodyRes.json();

//       await fetch(`${API_BASE_URL}/sendSnaggingMail`, {
//         method: 'POST',
//         body: JSON.stringify({ id: snagId, body: mailBody }),
//       });
//     } catch (error) {
//       console.error('Email error:', error);
//     }
//   };

//   const filteredSnaggingList = useMemo(() => {
//     let result = [...snaggingList];

//     // Apply search filter
//     if (searchQuery.trim()) {
//       result = result.filter(
//         (item) =>
//           item.snagId.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
//           item.description.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Apply status filter
//     if (filterStatus) {
//       result = result.filter((item) => item.status === filterStatus);
//     }

//     return result;
//   }, [filterStatus, searchQuery, snaggingList]);

//   if (isLoading) {
//     return (
//       <MainLayout title="Snagging Report">
//         <View
//           style={{
//             flex: 1,
//             justifyContent: 'center',
//             alignItems: 'center',
//             backgroundColor: '#f8fafc',
//           }}>
//           <View
//             style={{
//               backgroundColor: '#ffffff',
//               padding: 32,
//               borderRadius: 24,
//               alignItems: 'center',
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 4 },
//               shadowOpacity: 0.1,
//               shadowRadius: 8,
//               elevation: 4,
//             }}>
//             <ActivityIndicator size="large" color="#3b82f6" />
//             <Text
//               style={{
//                 marginTop: 16,
//                 fontSize: 16,
//                 fontWeight: '600',
//                 color: '#374151',
//               }}>
//               Loading snagging reports...
//             </Text>
//           </View>
//         </View>
//       </MainLayout>
//     );
//   }

//   return (
//     <MainLayout title="Snagging Report">
//       <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>
//         {/* Header - Matching the Work Order Screen header */}
//         <View style={{ backgroundColor: '#dbeafe', padding: 16 }}>
//           <View
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               marginBottom: 12,
//             }}>
//             <View>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   fontWeight: '700',
//                   color: '#1e40af',
//                 }}>
//                 Snagging Report
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 12,
//                   color: '#3b82f6',
//                   marginTop: 2,
//                 }}>
//                 {filteredSnaggingList.length} snagging reports • {filterStatus || 'All statuses'}
//               </Text>
//             </View>
//             <View style={{ flexDirection: 'row', gap: 8 }}>
//               <TouchableOpacity
//                 style={{
//                   padding: 10,
//                   backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                   borderRadius: 12,
//                 }}
//                 onPress={handleRefresh}>
//                 <Icon name="refresh" size={18} color="#1e40af" />
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Search and Filter Row */}
//           <View
//             style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: 8,
//             }}>
//             {/* Search Bar */}
//             <View
//               style={{
//                 flex: 1,
//                 backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                 borderRadius: 12,
//                 paddingHorizontal: 12,
//                 height: 40,
//                 justifyContent: 'center',
//               }}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <Icon name="magnify" size={18} color="#3b82f6" style={{ marginRight: 8 }} />
//                 <TextInput
//                   value={searchQuery}
//                   onChangeText={setSearchQuery}
//                   placeholder="Search snag IDs, locations..."
//                   placeholderTextColor="#6b7280"
//                   style={{
//                     flex: 1,
//                     color: '#1e40af',
//                     fontSize: 14,
//                     paddingVertical: 0,
//                   }}
//                 />
//                 {searchQuery.length > 0 && (
//                   <TouchableOpacity onPress={() => setSearchQuery('')}>
//                     <Icon name="close-circle" size={18} color="#6b7280" />
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>

//             {/* Filter Button */}
//             <TouchableOpacity
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                 paddingHorizontal: 12,
//                 height: 40,
//                 borderRadius: 12,
//                 minWidth: 60,
//                 justifyContent: 'center',
//               }}
//               onPress={() => setShowFilterModal(true)}>
//               <Icon name="filter-outline" size={16} color="#1e40af" />
//               {filterStatus && (
//                 <View
//                   style={{
//                     marginLeft: 4,
//                     backgroundColor: '#3b82f6',
//                     paddingHorizontal: 6,
//                     paddingVertical: 2,
//                     borderRadius: 8,
//                   }}>
//                   <Text
//                     style={{
//                       fontSize: 10,
//                       color: '#ffffff',
//                       fontWeight: '600',
//                     }}>
//                     {filterStatus}
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>

//             {/* Add Button */}
//             <TouchableOpacity
//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 backgroundColor: 'rgba(255, 255, 255, 0.8)',
//                 paddingHorizontal: 12,
//                 height: 40,
//                 borderRadius: 12,
//                 minWidth: 60,
//                 justifyContent: 'center',
//               }}
//               onPress={() => {
//                 setSelectedItem(null);
//                 setShowFormModal(true);
//               }}>
//               <Icon name="plus" size={16} color="#1e40af" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* Snagging Report List */}
//         <ScrollView contentContainerStyle={{ padding: 16 }} showsVerticalScrollIndicator={false}>
//           {filteredSnaggingList.length > 0 ? (
//             filteredSnaggingList.map((item) => (
//               <SnaggingCard
//                 key={item.snagId}
//                 item={item}
//                 expanded={expandedItems[item.snagId]}
//                 onToggle={() => toggleItem(item.snagId)}
//                 onEdit={handleEdit}
//                 onDelete={handleDelete}
//                 onApprove={handleApprove}
//                 onReject={handleReject}
//                 onDownload={handleDownload}
//                 onEmail={handleEmail}
//               />
//             ))
//           ) : (
//             <Animated.View
//               entering={FadeInUp}
//               style={{
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 padding: 40,
//                 backgroundColor: '#ffffff',
//                 borderRadius: 24,
//                 margin: 16,
//               }}>
//               <Icon name="file-document-outline" size={64} color="#d1d5db" />
//               <Text
//                 style={{
//                   fontSize: 18,
//                   fontWeight: '600',
//                   color: '#6b7280',
//                   marginTop: 16,
//                 }}>
//                 No snagging reports found
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 14,
//                   color: '#9ca3af',
//                   marginTop: 8,
//                   textAlign: 'center',
//                 }}>
//                 {searchQuery
//                   ? 'Try adjusting your search terms or filters'
//                   : 'No snagging reports available'}
//               </Text>
//             </Animated.View>
//           )}
//         </ScrollView>

//         {/* Filter Modal */}
//         <FilterModal
//           visible={showFilterModal}
//           onClose={() => setShowFilterModal(false)}
//           currentFilter={filterStatus}
//           onApplyFilter={setFilterStatus}
//         />

//         {/* Form Modal */}
//         <FormModal
//           visible={showFormModal}
//           onClose={() => setShowFormModal(false)}
//           onSubmit={handleFormSubmit}
//           selectedItem={selectedItem}
//         />
//       </View>
//     </MainLayout>
//   );
// };

// export default SnaggingReportScreen;
