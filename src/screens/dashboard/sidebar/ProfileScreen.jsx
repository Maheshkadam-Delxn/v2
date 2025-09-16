import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput, Animated, TouchableWithoutFeedback, Keyboard, Alert, StatusBar } from 'react-native';
import MainLayout from '../../components/MainLayout';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// Custom Animated Input Component (updated styling)
const AnimatedInput = ({ label, value, onChangeText, secureTextEntry = false, keyboardType = 'default', iconName, onIconPress, editable = true, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value || isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, isFocused, animatedValue]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleEyeIconPress = () => {
    if (secureTextEntry) {
      setIsPasswordVisible(!isPasswordVisible);
    }
    if (onIconPress) {
      onIconPress();
    }
  };

  const labelStyle = {
    position: 'absolute',
    left: 12,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -8],
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [14, 12],
    }),
    color: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['#6b7280', '#2563eb'],
    }),
    backgroundColor: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['transparent', '#fff'],
    }),
    paddingHorizontal: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 4],
    }),
    zIndex: 1,
  };

  return (
    <View className="relative mb-4">
      <Animated.Text style={labelStyle}>
        {label}
      </Animated.Text>
      <View className="relative">
        <TextInput
          className={`bg-gray-100 rounded-2xl py-3 px-4 text-base ${iconName ? 'pr-10' : ''} ${!editable ? 'bg-gray-100' : ''}`}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          editable={editable}
          placeholderTextColor="#6b7280"
          {...props}
        />
        {iconName && (
          <TouchableOpacity
            className="absolute right-3 top-3"
            onPress={handleEyeIconPress}
          >
            <Ionicons
              name={secureTextEntry ? (isPasswordVisible ? "eye-off-outline" : "eye-outline") : iconName}
              size={20}
              color="#6b7280"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Department Dropdown Component (updated styling)
const DepartmentDropdown = ({ value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  const departments = [
    'Architectural',
    'Engineering',
    'Construction',
    'Design',
    'Planning',
    'Management'
  ];

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value || isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value, isFocused, animatedValue]);

  const labelTop = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [16, -8],
  });

  const labelFontSize = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [14, 12],
  });

  const labelColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#6b7280', '#2563eb'],
  });

  const labelBackgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', '#fff'],
  });

  const labelPaddingHorizontal = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 4],
  });

  return (
    <View className="relative mb-4">
      <Animated.View
        style={{
          position: 'absolute',
          left: 12,
          top: labelTop,
          backgroundColor: labelBackgroundColor,
          paddingHorizontal: labelPaddingHorizontal,
          zIndex: 2,
        }}
      >
        <Animated.Text style={{
          fontSize: labelFontSize,
          color: labelColor,
        }}>
          Department
        </Animated.Text>
      </Animated.View>
      <TouchableOpacity
        className="bg-gray-100 rounded-2xl py-3 px-4 flex-row justify-between items-center"
        onPress={() => {
          setIsOpen(!isOpen);
          setIsFocused(true);
        }}
      >
        <Text className={`text-base ${value ? 'text-gray-800' : 'text-gray-400'}`}>
          {value || 'Select Department'}
        </Text>
        <Feather
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#6b7280"
        />
      </TouchableOpacity>

      {isOpen && (
        <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl mt-1 z-20 shadow-lg max-h-60">
          <ScrollView keyboardShouldPersistTaps="handled">
            {departments.map((dept, index) => (
              <TouchableOpacity
                key={index}
                className="p-4 border-b border-gray-100 last:border-b-0"
                onPress={() => {
                  onValueChange(dept);
                  setIsOpen(false);
                  setIsFocused(false);
                }}
              >
                <Text className="text-gray-800 text-base">{dept}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState({
    name: 'Alan David',
    email: 'viyipa4378@acedby.com',
    phone: '+919764585655',
    password: 'Admin@321',
    discipline: 'Architecture',
    organization: 'Alan David',
    receiverEmail: 'notifications+bi_da@email.skystruct.com',
    department: 'Architectural',
    staffNo: '1',
    code: '',
    grade: '',
    preferredLanguage: 'English',
    signature: 'https://via.placeholder.com/150x60/2563eb/ffffff?text=Alan+David',
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80',
  });

  const updateField = (field, value) => {
    setProfileData({
      ...profileData,
      [field]: value
    });
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        updateField('profileImage', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const uploadSignature = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'Sorry, we need camera roll permissions to make this work!');
        return;
      }

      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 1],
        quality: 1,
      });

      if (!result.canceled) {
        updateField('signature', result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error uploading signature:', error);
      Alert.alert('Error', 'Failed to upload signature');
    }
  };

  const deleteSignature = () => {
    Alert.alert(
      "Delete Signature",
      "Are you sure you want to delete your signature?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => updateField('signature', ''),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <MainLayout title="Profile">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1 bg-gray-50 pt-6" keyboardShouldPersistTaps="handled">
            <View className="px-6 pb-8">
              {/* Profile Header Card */}
              <View className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
                <View className="flex-row items-center mb-6">
                  <Image
                    source={{ uri: profileData.profileImage }}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <View className="flex-1">
                    <Text className="text-xl font-bold text-gray-800">{profileData.name}</Text>
                    <Text className="text-sm text-gray-600">{profileData.email}</Text>
                    <Text className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full mt-1 self-start">
                      Project Admin
                    </Text>
                  </View>
                  <TouchableOpacity
                    className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
                    onPress={pickImage}
                  >
                    <Feather name="camera" size={20} color="#2563eb" />
                  </TouchableOpacity>
                </View>

                {/* Personal Information Section */}
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-gray-800 mb-4">Personal Information</Text>
                  <AnimatedInput
                    label="Name"
                    value={profileData.name}
                    onChangeText={(text) => updateField('name', text)}
                    iconName="person-outline"
                  />
                  <AnimatedInput
                    label="Email"
                    value={profileData.email}
                    onChangeText={(text) => updateField('email', text)}
                    keyboardType="email-address"
                    iconName="mail-outline"
                  />
                  <AnimatedInput
                    label="Mobile No"
                    value={profileData.phone}
                    onChangeText={(text) => updateField('phone', text)}
                    keyboardType="phone-pad"
                    iconName="call-outline"
                  />
                  <AnimatedInput
                    label="Password"
                    value={profileData.password}
                    onChangeText={() => { }}
                    secureTextEntry={true}
                    editable={false}
                    iconName="eye-outline"
                  />
                </View>

                {/* Discipline Information Section */}
                <View className="mb-6">
                  <Text className="text-lg font-semibold text-gray-800 mb-4">Discipline</Text>
                  <AnimatedInput
                    label="Discipline"
                    value={profileData.discipline}
                    onChangeText={(text) => updateField('discipline', text)}
                    iconName="school-outline"
                  />
                  <AnimatedInput
                    label="Organization Name"
                    value={profileData.organization}
                    onChangeText={(text) => updateField('organization', text)}
                    iconName="business-outline"
                  />

                  <DepartmentDropdown
                    value={profileData.department}
                    onValueChange={(value) => updateField('department', value)}
                  />

                  <AnimatedInput
                    label="Staff No"
                    value={profileData.staffNo}
                    onChangeText={(text) => updateField('staffNo', text)}
                    keyboardType="numeric"
                    iconName="id-card-outline"
                  />
                  <AnimatedInput
                    label="Code"
                    value={profileData.code}
                    onChangeText={(text) => updateField('code', text)}
                    iconName="code-outline"
                  />
                  <AnimatedInput
                    label="Grade"
                    value={profileData.grade}
                    onChangeText={(text) => updateField('grade', text)}
                    iconName="star-outline"
                  />
                  <AnimatedInput
                    label="Preferred Language"
                    value={profileData.preferredLanguage}
                    onChangeText={(text) => updateField('preferredLanguage', text)}
                    iconName="language-outline"
                  />
                  <AnimatedInput
                    label="Receiver Email"
                    value={profileData.receiverEmail}
                    onChangeText={(text) => updateField('receiverEmail', text)}
                    keyboardType="email-address"
                    iconName="notifications-outline"
                  />
                </View>

                {/* Signature Section */}
                <View className="mb-6">
                  <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-lg font-semibold text-gray-800">Signature</Text>
                    <View className="flex-row">
                      <TouchableOpacity
                        className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-2"
                        onPress={uploadSignature}
                      >
                        <Feather name="upload" size={20} color="#2563eb" />
                      </TouchableOpacity>
                      <TouchableOpacity
                        className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center"
                        onPress={deleteSignature}
                      >
                        <Feather name="trash-2" size={20} color="#ef4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View className="bg-gray-100 rounded-2xl p-4 items-center">
                    {profileData.signature ? (
                      <Image
                        source={{ uri: profileData.signature }}
                        className="w-40 h-16 mb-3"
                        resizeMode="contain"
                      />
                    ) : (
                      <Text className="text-gray-600 mb-3">No signature uploaded</Text>
                    )}
                    <Text className="text-xs text-gray-600">Your digital signature</Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <TouchableOpacity className="bg-blue-600 rounded-2xl py-3 px-4 shadow-lg active:scale-95 mb-4">
                  <Text className="text-white text-center text-base font-medium">Update Profile</Text>
                </TouchableOpacity>
                
                <TouchableOpacity className="bg-white border border-gray-300 rounded-2xl py-3 px-4">
                  <Text className="text-gray-800 text-center text-base font-medium">Need Help?</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </MainLayout>
    </>
  );
};