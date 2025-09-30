import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
  Image,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../components/MainLayout';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';

const AuditTrail = () => {
  const navigation = useNavigation();
  const [assignedUser, setAssignedUser] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [feedText, setFeedText] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userOptions, setUserOptions] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [errors, setErrors] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: 'Alan David',
    avatar: null,
    timestamp: new Date().toISOString(),
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    fetchUsers();
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      setLoadingUsers(false);
      return;
    }
    const parsedData = JSON.parse(userData);
    
    try {
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/users/list', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': '19Ab9n5HF73',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUserOptions(data.users || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const handleAttachment = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (result.type === 'success') {
        setAttachments([...attachments, result]);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to attach file');
    }
  };

  const removeAttachment = (index) => {
    const newAttachments = attachments.filter((_, i) => i !== index);
    setAttachments(newAttachments);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedUserId) {
      newErrors.assignedUser = 'Please select a user';
    }
    
    if (!feedText.trim()) {
      newErrors.feedText = 'Feed text is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fill in all required fields');
      return;
    }

    setLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      setLoading(false);
      return;
    }
    const parsedData = JSON.parse(userData);

    try {
      const payload = {
        assignedUserId: selectedUserId,
        feedText: feedText.trim(),
        attachments: attachments.map(att => ({
          name: att.name,
          uri: att.uri,
          type: att.mimeType,
          size: att.size,
        })),
        timestamp: new Date().toISOString(),
      };

      console.log('Audit Trail payload:', payload);

      const response = await fetch('https://api-v2-skystruct.prudenttec.com/audit/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': '19Ab9n5HF73',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Audit Trail created:', data);

      Alert.alert('Success', 'Audit trail entry has been created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Failed to create audit trail:', error);
      Alert.alert('Error', 'Failed to create audit trail. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (feedText.trim() || attachments.length > 0) {
      Alert.alert('Discard Changes', 'Are you sure you want to discard your changes?', [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]);
    } else {
      navigation.goBack();
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  const renderUserDropdown = () => (
    <Modal
      visible={showUserDropdown}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowUserDropdown(false)}
    >
      <TouchableOpacity
        className="flex-1 bg-black/60 justify-center px-6"
        activeOpacity={1}
        onPress={() => setShowUserDropdown(false)}
      >
        <View className="bg-white rounded-2xl max-h-96 shadow-2xl overflow-hidden">
          <LinearGradient
            colors={['#3b82f6', '#2563eb']}
            className="px-6 py-5 flex-row items-center justify-between"
          >
            <View>
              <Text className="text-white text-lg font-bold">Select User</Text>
              <Text className="text-blue-100 text-xs mt-0.5">Choose a user to assign</Text>
            </View>
            {loadingUsers ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Feather name="users" size={22} color="#ffffff" />
            )}
          </LinearGradient>

          {loadingUsers ? (
            <View className="p-12 items-center">
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text className="text-gray-500 mt-3 text-sm">Loading users...</Text>
            </View>
          ) : (
            <FlatList
              data={userOptions}
              keyExtractor={(item, index) => item.id?.toString() || index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="px-6 py-4 border-b border-gray-100 active:bg-blue-50"
                  onPress={() => {
                    setAssignedUser(item.name || item.username);
                    setSelectedUserId(item.id || item.userId);
                    setShowUserDropdown(false);
                    if (errors.assignedUser) {
                      setErrors({ ...errors, assignedUser: null });
                    }
                  }}
                >
                  <View className="flex-row items-center">
                    <View className="bg-blue-100 rounded-full w-10 h-10 items-center justify-center mr-3">
                      <Text className="text-blue-600 font-bold text-base">
                        {(item.name || item.username)?.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-base text-gray-800 font-medium">
                        {item.name || item.username}
                      </Text>
                      {item.email && (
                        <Text className="text-xs text-gray-500">{item.email}</Text>
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View className="p-8 items-center">
                  <Feather name="users" size={40} color="#d1d5db" />
                  <Text className="text-gray-500 mt-3 text-sm">No users available</Text>
                  <TouchableOpacity
                    className="mt-4 px-6 py-2.5 bg-blue-500 rounded-full"
                    onPress={fetchUsers}
                  >
                    <Text className="text-white text-sm font-semibold">Retry</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      <MainLayout title="Audit Trail">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
        >
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }}
            className="flex-1"
          >
            {/* Header */}
            {/* <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              className="px-5 py-4 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <View className="bg-white/20 rounded-full p-2 mr-3">
                  <Feather name="file-text" size={20} color="#ffffff" />
                </View>
                <Text className="text-white text-lg font-bold">Audit Trail</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-white/20 rounded-full p-2"
              >
                <Feather name="x" size={20} color="#ffffff" />
              </TouchableOpacity>
            </LinearGradient> */}

            <ScrollView
              className="flex-1"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <View className="p-5">
                {/* Main Card */}
                <View className="bg-white rounded-2xl shadow-lg overflow-hidden">
                  <View className="p-5">
                    {/* Assign Users Field */}
                    <View className="mb-5">
                      <Text className="text-sm font-semibold text-gray-700 mb-2.5">
                        Assign Users <Text className="text-red-500">*</Text>
                      </Text>
                      <TouchableOpacity
                        onPress={() => setShowUserDropdown(true)}
                        className={`flex-row items-center rounded-xl px-4 py-3.5 ${
                          errors.assignedUser
                            ? 'border-2 border-red-400 bg-red-50'
                            : 'border-2 border-gray-200 bg-white'
                        }`}
                        style={{
                          shadowColor: errors.assignedUser ? '#ef4444' : '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: errors.assignedUser ? 0.15 : 0.05,
                          shadowRadius: 3,
                          elevation: errors.assignedUser ? 3 : 1,
                        }}
                      >
                        <View className="mr-3">
                          <Feather name="user" size={20} color="#3b82f6" />
                        </View>
                        <Text
                          className={`flex-1 text-base ${
                            assignedUser ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        >
                          {assignedUser || 'Select user to assign'}
                        </Text>
                        <Feather name="chevron-down" size={20} color="#6b7280" />
                      </TouchableOpacity>
                      {errors.assignedUser && (
                        <View className="flex-row items-center mt-2 ml-1">
                          <Feather name="alert-circle" size={14} color="#ef4444" />
                          <Text className="text-red-500 text-xs ml-1.5 font-medium">
                            {errors.assignedUser}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Create New Feed Field */}
                    <View className="mb-5">
                      <Text className="text-sm font-semibold text-gray-700 mb-2.5">
                        Create New Feed <Text className="text-red-500">*</Text>
                      </Text>
                      <View
                        className={`rounded-xl px-4 py-3.5 ${
                          errors.feedText
                            ? 'border-2 border-red-400 bg-red-50'
                            : 'border-2 border-gray-200 bg-white'
                        }`}
                        style={{
                          shadowColor: errors.feedText ? '#ef4444' : '#000',
                          shadowOffset: { width: 0, height: 1 },
                          shadowOpacity: errors.feedText ? 0.15 : 0.05,
                          shadowRadius: 3,
                          elevation: errors.feedText ? 3 : 1,
                        }}
                      >
                        <TextInput
                          className="text-base text-gray-900 min-h-[100px]"
                          placeholder="Enter feed details..."
                          placeholderTextColor="#9ca3af"
                          value={feedText}
                          onChangeText={(text) => {
                            setFeedText(text);
                            if (errors.feedText) {
                              setErrors({ ...errors, feedText: null });
                            }
                          }}
                          multiline
                          textAlignVertical="top"
                        />
                      </View>
                      {errors.feedText && (
                        <View className="flex-row items-center mt-2 ml-1">
                          <Feather name="alert-circle" size={14} color="#ef4444" />
                          <Text className="text-red-500 text-xs ml-1.5 font-medium">
                            {errors.feedText}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* Attachment Section */}
                    <View className="mb-5">
                      <View className="flex-row items-center justify-between mb-2.5">
                        <Text className="text-sm font-semibold text-gray-700">Attachment</Text>
                        <TouchableOpacity
                          onPress={handleAttachment}
                          className="flex-row items-center bg-blue-50 px-3 py-2 rounded-lg"
                        >
                          <Feather name="paperclip" size={16} color="#3b82f6" />
                          <Text className="text-blue-600 font-medium text-xs ml-1.5">
                            Add File
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {attachments.length > 0 ? (
                        <View className="space-y-2">
                          {attachments.map((attachment, index) => (
                            <View
                              key={index}
                              className="flex-row items-center bg-gray-50 rounded-xl p-3 border border-gray-200"
                            >
                              <View className="bg-blue-100 rounded-lg p-2 mr-3">
                                <Feather name="file" size={20} color="#3b82f6" />
                              </View>
                              <View className="flex-1">
                                <Text className="text-sm font-medium text-gray-900" numberOfLines={1}>
                                  {attachment.name}
                                </Text>
                                <Text className="text-xs text-gray-500">
                                  {(attachment.size / 1024).toFixed(2)} KB
                                </Text>
                              </View>
                              <TouchableOpacity
                                onPress={() => removeAttachment(index)}
                                className="p-2"
                              >
                                <Feather name="x" size={18} color="#ef4444" />
                              </TouchableOpacity>
                            </View>
                          ))}
                        </View>
                      ) : (
                        <View className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 items-center">
                          <Feather name="upload" size={32} color="#9ca3af" />
                          <Text className="text-gray-500 text-sm mt-2">No attachments added</Text>
                        </View>
                      )}
                    </View>

                    {/* Action Buttons */}
                    <View className="flex-row space-x-3 mt-2 gap-4">
                      <TouchableOpacity
                        onPress={handleCancel}
                        className="flex-1 border-2 border-gray-300 rounded-xl py-3.5 items-center justify-center bg-white"
                        // style={{
                        //   shadowColor: '#000',
                        //   shadowOffset: { width: 0, height: 2 },
                        //   shadowOpacity: 0.1,
                        //   shadowRadius: 3,
                        //   elevation: 2,
                        // }}
                      >
                        <View className="flex-row items-center">
                          <Feather name="x" size={18} color="#374151" />
                          <Text className="text-gray-700 font-bold text-base ml-2">Cancel</Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handleSave}
                        disabled={loading}
                        className="flex-1 rounded-xl py-3.5 items-center justify-center"
                        style={{
                          backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                        //   shadowColor: loading ? '#9ca3af' : '#3b82f6',
                        //   shadowOffset: { width: 0, height: 4 },
                        //   shadowOpacity: 0.3,
                        //   shadowRadius: 5,
                        //   elevation: 5,
                        }}
                      >
                        {loading ? (
                          <View className="flex-row items-center">
                            <ActivityIndicator size="small" color="#ffffff" />
                            <Text className="text-white font-bold text-base ml-2">Saving...</Text>
                          </View>
                        ) : (
                          <View className="flex-row items-center">
                            <Feather name="check" size={18} color="#ffffff" />
                            <Text className="text-white font-bold text-base ml-2">Save</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* User Info Card */}
                <View className="bg-white rounded-2xl shadow-md p-4 mt-4">
                  <View className="flex-row items-center">
                    <View className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full w-12 h-12 items-center justify-center mr-3">
                      <Text className="text-white font-bold text-lg">
                        {currentUser.name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                    <View className="flex-1">
                      <Text className="text-base font-bold text-gray-900">{currentUser.name}</Text>
                      <Text className="text-xs text-gray-500">
                        {formatTimestamp(currentUser.timestamp)}
                      </Text>
                    </View>
                    <View className="bg-green-100 rounded-full px-3 py-1">
                      <Text className="text-green-700 font-semibold text-xs">Active</Text>
                    </View>
                  </View>
                </View>

                {/* Info Card */}
                <View className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 mt-4 mb-4">
                  <View className="flex-row items-center mb-3">
                    <View className="bg-blue-500 rounded-full p-2">
                      <Feather name="info" size={16} color="#ffffff" />
                    </View>
                    <Text className="text-blue-900 font-bold text-base ml-3">Quick Tips</Text>
                  </View>
                  <View className="space-y-2">
                    <View className="flex-row items-start mb-2">
                      <Feather name="check-circle" size={16} color="#3b82f6" style={{ marginTop: 2 }} />
                      <Text className="text-blue-800 text-sm leading-5 ml-2 flex-1">
                        Select a user to assign this audit trail entry
                      </Text>
                    </View>
                    <View className="flex-row items-start mb-2">
                      <Feather name="check-circle" size={16} color="#3b82f6" style={{ marginTop: 2 }} />
                      <Text className="text-blue-800 text-sm leading-5 ml-2 flex-1">
                        Provide detailed information in the feed
                      </Text>
                    </View>
                    <View className="flex-row items-start">
                      <Feather name="check-circle" size={16} color="#3b82f6" style={{ marginTop: 2 }} />
                      <Text className="text-blue-800 text-sm leading-5 ml-2 flex-1">
                        Attach relevant documents for reference
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </Animated.View>
        </KeyboardAvoidingView>

        {/* User Dropdown Modal */}
        {renderUserDropdown()}
      </MainLayout>
    </View>
  );
};

export default AuditTrail;