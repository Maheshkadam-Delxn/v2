import React, { useState, useRef } from 'react';
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
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../components/MainLayout';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';

const EmailBoq = () => {
  const navigation = useNavigation();
  const [to, setTo] = useState('');
  const [cc, setCc] = useState('');
  const [bcc, setBcc] = useState('');
  const [subject, setSubject] = useState('');
  const [label, setLabel] = useState('');
  const [body, setBody] = useState('');
  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [showFormatMenu, setShowFormatMenu] = useState(false);
  const [errors, setErrors] = useState({});
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  React.useEffect(() => {
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

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!to.trim()) {
      newErrors.to = 'Recipient email is required';
    } else if (!validateEmail(to.trim())) {
      newErrors.to = 'Invalid email address';
    }
    
    if (!subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (cc && !validateEmail(cc.trim())) {
      newErrors.cc = 'Invalid CC email address';
    }
    
    if (bcc && !validateEmail(bcc.trim())) {
      newErrors.bcc = 'Invalid BCC email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  const handleSend = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please correct the highlighted fields');
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
        to: to.trim(),
        cc: cc.trim(),
        bcc: bcc.trim(),
        subject: subject.trim(),
        label: label.trim(),
        body: body,
        attachments: attachments.map(att => ({
          name: att.name,
          uri: att.uri,
          type: att.mimeType,
          size: att.size,
        })),
      };

      console.log('Email payload:', payload);

      // Replace with your actual API endpoint
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/email/send', {
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
      console.log('Email sent:', data);

      Alert.alert(
        'Success',
        'Email has been sent successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.error('Failed to send email:', error);
      Alert.alert('Error', 'Failed to send email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDiscard = () => {
    Alert.alert(
      'Discard Email',
      'Are you sure you want to discard this email?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  const renderRecipientField = (
    fieldLabel,
    value,
    setValue,
    placeholder,
    field,
    showRemove = false,
    onRemove = null
  ) => {
    const hasError = errors[field];
    
    return (
      <View className="border-b border-gray-200 px-4 py-3">
        <View className="flex-row items-center">
          <Text className="text-sm font-semibold text-gray-600 w-12">{fieldLabel}</Text>
          <View className="flex-1">
            <TextInput
              className="text-base text-gray-900 py-1"
              placeholder={placeholder}
              placeholderTextColor="#9ca3af"
              value={value}
              onChangeText={(text) => {
                setValue(text);
                if (errors[field]) {
                  setErrors({ ...errors, [field]: null });
                }
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>
          {showRemove && onRemove && (
            <TouchableOpacity onPress={onRemove} className="ml-2 p-1">
              <Feather name="x-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
          {!showRemove && field === 'to' && (
            <TouchableOpacity
              onPress={() => setShowCc(!showCc)}
              className="ml-2 px-3 py-1 bg-gray-100 rounded-full"
            >
              <Text className="text-xs font-medium text-gray-600">Cc</Text>
            </TouchableOpacity>
          )}
        </View>
        {hasError && (
          <View className="flex-row items-center mt-1">
            <Feather name="alert-circle" size={12} color="#ef4444" />
            <Text className="text-red-500 text-xs ml-1">{hasError}</Text>
          </View>
        )}
      </View>
    );
  };

  const renderFormatButton = (icon, isActive, onPress, label) => (
    <TouchableOpacity
      onPress={onPress}
      className={`p-2.5 rounded-lg mr-2 ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}
      accessible={true}
      accessibilityLabel={label}
    >
      <Feather name={icon} size={18} color={isActive ? '#3b82f6' : '#4b5563'} />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      <MainLayout title="New Message">
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
            {/* Header with gradient */}
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              className="px-5 py-4 flex-row items-center justify-between"
            >
              <View className="flex-row items-center flex-1">
                <View className="bg-white/20 rounded-full p-2 mr-3">
                  <Feather name="mail" size={20} color="#ffffff" />
                </View>
                <Text className="text-white text-lg font-bold">New Message</Text>
              </View>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="bg-white/20 rounded-full p-2"
              >
                <Feather name="x" size={20} color="#ffffff" />
              </TouchableOpacity>
            </LinearGradient>

            <ScrollView className="flex-1 bg-white" keyboardShouldPersistTaps="handled">
              {/* To Field */}
              {renderRecipientField('To', to, setTo, 'Enter recipient email', 'to')}

              {/* Cc Field */}
              {showCc && renderRecipientField(
                'Cc',
                cc,
                setCc,
                'Add Cc',
                'cc',
                true,
                () => {
                  setShowCc(false);
                  setCc('');
                }
              )}

              {/* Bcc Field */}
              {showBcc && renderRecipientField(
                'Bcc',
                bcc,
                setBcc,
                'Add Bcc',
                'bcc',
                true,
                () => {
                  setShowBcc(false);
                  setBcc('');
                }
              )}

              {/* Show Bcc Button */}
              {!showBcc && showCc && (
                <View className="border-b border-gray-200 px-4 py-2">
                  <TouchableOpacity
                    onPress={() => setShowBcc(true)}
                    className="self-start px-3 py-1 bg-gray-100 rounded-full"
                  >
                    <Text className="text-xs font-medium text-gray-600">Add Bcc</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* Subject Field */}
              <View className="border-b border-gray-200 px-4 py-3">
                <View className="flex-row items-center">
                  <Text className="text-sm font-semibold text-gray-600 w-20">Subject*</Text>
                  <View className="flex-1">
                    <TextInput
                      className="text-base text-gray-900 py-1 font-medium"
                      placeholder="BOQ Details"
                      placeholderTextColor="#9ca3af"
                      value={subject}
                      onChangeText={(text) => {
                        setSubject(text);
                        if (errors.subject) {
                          setErrors({ ...errors, subject: null });
                        }
                      }}
                    />
                  </View>
                  <TouchableOpacity className="ml-2">
                    <Feather name="copy" size={18} color="#6b7280" />
                  </TouchableOpacity>
                </View>
                {errors.subject && (
                  <View className="flex-row items-center mt-1">
                    <Feather name="alert-circle" size={12} color="#ef4444" />
                    <Text className="text-red-500 text-xs ml-1">{errors.subject}</Text>
                  </View>
                )}
              </View>

              {/* Label Field */}
              <View className="border-b border-gray-200 px-4 py-3">
                <View className="flex-row items-center">
                  <Text className="text-sm font-semibold text-gray-600 w-20">Label:</Text>
                  <View className="flex-1">
                    <TextInput
                      className="text-base text-gray-900 py-1"
                      placeholder="Add label (optional)"
                      placeholderTextColor="#9ca3af"
                      value={label}
                      onChangeText={setLabel}
                    />
                  </View>
                  <TouchableOpacity className="ml-2">
                    <Feather name="copy" size={18} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Formatting Toolbar */}
              <View className="border-b border-gray-200 px-4 py-3 bg-gray-50">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row items-center">
                    <TouchableOpacity className="mr-2 px-3 py-2 bg-white rounded-lg border border-gray-200">
                      <Text className="text-sm text-gray-700">Paragraph</Text>
                    </TouchableOpacity>
                    {renderFormatButton('bold', isBold, () => setIsBold(!isBold), 'Bold')}
                    {renderFormatButton('italic', isItalic, () => setIsItalic(!isItalic), 'Italic')}
                    {renderFormatButton('underline', isUnderline, () => setIsUnderline(!isUnderline), 'Underline')}
                    <TouchableOpacity className="p-2.5 rounded-lg mr-2 bg-gray-100">
                      <Feather name="type" size={18} color="#4b5563" />
                    </TouchableOpacity>
                    <TouchableOpacity className="p-2.5 rounded-lg mr-2 bg-gray-100">
                      <Feather name="more-horizontal" size={18} color="#4b5563" />
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>

              {/* Body Field */}
              <View className="px-4 py-4 min-h-[300px]">
                <TextInput
                  className="text-base text-gray-900 leading-6"
                  placeholder="Hello Team,&#10;&#10;Please find the Structural BOQ BOQ with below details :&#10;Category Name : Structural ,&#10;Responsible Name : Mukesh Sinha&#10;BOQ Items : 1 ,&#10;BOQ Amount : 11,200&#10;&#10;Thanks & Regards"
                  placeholderTextColor="#9ca3af"
                  value={body}
                  onChangeText={setBody}
                  multiline
                  textAlignVertical="top"
                  style={{
                    fontWeight: isBold ? 'bold' : 'normal',
                    fontStyle: isItalic ? 'italic' : 'normal',
                    textDecorationLine: isUnderline ? 'underline' : 'none',
                  }}
                />
              </View>

              {/* Attachments Section */}
              {attachments.length > 0 && (
                <View className="px-4 py-3 border-t border-gray-200">
                  <Text className="text-sm font-semibold text-gray-700 mb-3">
                    Attachments ({attachments.length})
                  </Text>
                  {attachments.map((attachment, index) => (
                    <View
                      key={index}
                      className="flex-row items-center bg-gray-50 rounded-lg p-3 mb-2 border border-gray-200"
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
              )}
            </ScrollView>

            {/* Bottom Action Bar */}
            <View className="bg-white border-t border-gray-200 px-4 py-3">
              <View className="flex-row items-center justify-between mb-3">
                <View className="flex-row items-center">
                  <TouchableOpacity
                    onPress={handleAttachment}
                    className="mr-4 p-2"
                    accessible={true}
                    accessibilityLabel="Attach file"
                  >
                    <Feather name="paperclip" size={22} color="#4b5563" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Link', 'Insert link functionality')}
                    className="mr-4 p-2"
                  >
                    <Feather name="link" size={22} color="#4b5563" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => Alert.alert('Image', 'Insert image functionality')}
                    className="p-2"
                  >
                    <Feather name="image" size={22} color="#4b5563" />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => Alert.alert('More options', 'Additional options')}
                  className="p-2"
                >
                  <Feather name="more-vertical" size={22} color="#4b5563" />
                </TouchableOpacity>
              </View>

              {/* Send and Discard Buttons */}
              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={handleDiscard}
                  className="flex-1 border-2 border-gray-300 rounded-xl py-3.5 items-center justify-center bg-white"
                >
                  <View className="flex-row items-center">
                    <Feather name="trash-2" size={18} color="#ef4444" />
                    <Text className="text-red-600 font-bold text-base ml-2">Discard</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleSend}
                  disabled={loading}
                  className="flex-1 rounded-xl py-3.5 items-center justify-center"
                  style={{
                    backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                    shadowColor: loading ? '#9ca3af' : '#3b82f6',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 5,
                    elevation: 5,
                  }}
                >
                  {loading ? (
                    <View className="flex-row items-center">
                      <ActivityIndicator size="small" color="#ffffff" />
                      <Text className="text-white font-bold text-base ml-2">Sending...</Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center">
                      <Feather name="send" size={18} color="#ffffff" />
                      <Text className="text-white font-bold text-base ml-2">Send</Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </KeyboardAvoidingView>
      </MainLayout>
    </View>
  );
};

export default EmailBoq;