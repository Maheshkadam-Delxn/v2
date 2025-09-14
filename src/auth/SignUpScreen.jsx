import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SkyStructLogo from '../../assets/SkystructLogo.png';
import GoogleLogo from '../../assets/GoogleLogo.png';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      <LinearGradient
        colors={['#1e40af', '#3b82f6', '#60a5fa']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-1 px-6 py-8 justify-center">
          {/* Logo Section */}
          <View className="items-center mb-10">
            <View className="mb-6 relative">
              {/* Professional logo container */}
              <View className="w-24 h-24 bg-white backdrop-blur-lg rounded-2xl items-center justify-center mb-4 shadow-lg border border-white/30">
                <Image
                  source={SkyStructLogo}
                  className="h-20 w-20 rounded-xl"
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text className="text-white text-3xl font-bold tracking-wide mb-2">SKYSTRUCT</Text>
            <Text className="text-white/80 text-base text-center leading-6 px-4">
              Create Your Account to Get Started
            </Text>
          </View>

          {/* Main Content Card */}
          <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-lg border border-white/20">
            {/* Full Name Input with Floating Label */}
            <View className="mb-5">
              <View className="relative">
                <TextInput
                  className={`border-2 rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
                    nameFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder=""
                  value={fullName}
                  onChangeText={setFullName}
                  autoCapitalize="words"
                  onFocus={() => setNameFocused(true)}
                  onBlur={() => setNameFocused(false)}
                />
                <Text className={`absolute left-4 transition-all duration-200 ${
                  nameFocused || fullName ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-gray-500'
                }`}>
                  Full Name
                </Text>
                <View className="absolute right-4 top-5">
                  <Ionicons 
                    name="person-outline" 
                    size={20} 
                    color={nameFocused ? '#3b82f6' : '#9ca3af'} 
                  />
                </View>
              </View>
            </View>

            {/* Email Input with Floating Label */}
            <View className="mb-5">
              <View className="relative">
                <TextInput
                  className={`border-2 rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
                    emailFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder=""
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                />
                <Text className={`absolute left-4 transition-all duration-200 ${
                  emailFocused || email ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-gray-500'
                }`}>
                  Email Address
                </Text>
                <View className="absolute right-4 top-5">
                  <Ionicons 
                    name="mail-outline" 
                    size={20} 
                    color={emailFocused ? '#3b82f6' : '#9ca3af'} 
                  />
                </View>
              </View>
            </View>

            {/* Password Input with Floating Label */}
            <View className="mb-5">
              <View className="relative">
                <TextInput
                  className={`border-2 rounded-xl px-4 pt-6 pb-4 pr-14 text-gray-800 font-medium ${
                    passwordFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder=""
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <Text className={`absolute left-4 transition-all duration-200 ${
                  passwordFocused || password ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-gray-500'
                }`}>
                  Password
                </Text>
                <TouchableOpacity
                  className="absolute right-4 top-5 w-6 h-6 items-center justify-center"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons 
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
                    size={20} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input with Floating Label */}
            <View className="mb-6">
              <View className="relative">
                <TextInput
                  className={`border-2 rounded-xl px-4 pt-6 pb-4 pr-14 text-gray-800 font-medium ${
                    confirmPasswordFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder=""
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry={!showConfirmPassword}
                  onFocus={() => setConfirmPasswordFocused(true)}
                  onBlur={() => setConfirmPasswordFocused(false)}
                />
                <Text className={`absolute left-4 transition-all duration-200 ${
                  confirmPasswordFocused || confirmPassword ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-gray-500'
                }`}>
                  Confirm Password
                </Text>
                <TouchableOpacity
                  className="absolute right-4 top-5 w-6 h-6 items-center justify-center"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons 
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} 
                    size={20} 
                    color="#6b7280" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Sign Up Button with Gradient */}
            <TouchableOpacity 
              className="mb-6 shadow-md active:opacity-90"
              onPress={() => navigation.navigate('Main')}
            >
              <LinearGradient
                colors={['#0956B5', '#0956B5', '#0956B5']}
                className="py-4"
                style={{ borderRadius: 16 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-white text-center font-bold text-base">Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="text-gray-500 text-sm font-medium mx-4">or continue with</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Google Sign In Button with Image */}
            <TouchableOpacity 
              className="flex-row items-center justify-center bg-white border border-gray-300 rounded-xl py-4 px-6 mb-6 shadow-sm active:opacity-90"
              onPress={() => console.log('Google Sign Up pressed')}
            >
              <Image
                source={GoogleLogo}
                className="w-6 h-6 mr-3"
                resizeMode="contain"
              />
              <Text className="text-gray-700 font-medium text-base">Continue with Google</Text>
            </TouchableOpacity>

            {/* Already have an account */}
            <View className="flex-row justify-center mb-4">
              <Text className="text-gray-600 text-sm">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text className="text-blue-600 text-sm font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Privacy Policy */}
            <View className="flex-row justify-center flex-wrap">
              <Text className="text-gray-500 text-xs">By creating an account, you agree to our </Text>
              <TouchableOpacity onPress={() => console.log('Terms pressed')}>
                <Text className="text-blue-600 text-xs font-medium underline">Terms of Service</Text>
              </TouchableOpacity>
              <Text className="text-gray-500 text-xs"> and </Text>
              <TouchableOpacity onPress={() => console.log('Privacy policy pressed')}>
                <Text className="text-blue-600 text-xs font-medium underline">Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}