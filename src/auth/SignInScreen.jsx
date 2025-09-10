import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      <LinearGradient
        colors={['#1e40af', '#3b82f6', '#60a5fa']}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-1 px-6 py-8">
          {/* Background Decorative Elements */}
          <View className="absolute top-20 right-8 w-32 h-32 bg-white/10 rounded-full" />
          <View className="absolute top-40 left-12 w-20 h-20 bg-white/5 rounded-full" />
          <View className="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-full" />

          {/* Logo Section */}
          <View className="items-center mt-16 mb-12">
            <View className="mb-6 relative">
              {/* Glassmorphism effect for logo container */}
              <View className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl items-center justify-center mb-4 shadow-2xl border border-white/30">
                <LinearGradient
                  colors={['#fbbf24', '#f59e0b', '#d97706']}
                  className="w-12 h-12 rounded-xl items-center justify-center"
                >
                  <Text className="text-white font-bold text-xl">SS</Text>
                </LinearGradient>
              </View>
            </View>
            <Text className="text-white text-2xl font-bold tracking-wide mb-2">SKYSTRUCT</Text>
            {/* <Text className="text-white/90 text-lg font-medium mb-2">Welcome Back</Text> */}
            <Text className="text-white/70 text-sm text-center leading-6 px-4">
              Simplifying Construction Management{'\n'}for a Modern Workforce
            </Text>
          </View>

          {/* Main Content Card */}
          <View className="flex-1 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            {/* Email Input with Floating Label */}
            <View className="mb-5">
              <View className="relative">
                <TextInput
                  className={`border-2 rounded-2xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
                    emailFocused ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
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
                  emailFocused || email ? 'top-2 text-xs text-blue-500 font-semibold' : 'top-5 text-base text-gray-500'
                }`}>
                  Email Address
                </Text>
              </View>
            </View>

            {/* Password Input with Floating Label */}
            <View className="mb-3">
              <View className="relative">
                <TextInput
                  className={`border-2 rounded-2xl px-4 pt-6 pb-4 pr-14 text-gray-800 font-medium ${
                    passwordFocused ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder=""
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <Text className={`absolute left-4 transition-all duration-200 ${
                  passwordFocused || password ? 'top-2 text-xs text-blue-500 font-semibold' : 'top-5 text-base text-gray-500'
                }`}>
                  Password
                </Text>
                <TouchableOpacity
                  className="absolute right-4 top-5 w-6 h-6 items-center justify-center"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text className="text-gray-400 text-lg">{showPassword ? '🙈' : '👁️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity 
              className="mb-6"
              onPress={() => console.log('Forgot password pressed')}
            >
              <Text className="text-blue-500 text-sm font-semibold text-right">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button with Gradient */}
            <TouchableOpacity 
              className="rounded-2xl py-4 mb-6 shadow-lg active:scale-95"
              onPress={() => navigation.navigate('Main')}
            >
              <LinearGradient
                colors={['#3b82f6', '#1d4ed8', '#1e40af']}
                className="rounded-2xl py-1 px-6"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-white text-center font-bold text-lg py-3">Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Elegant Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <View className="bg-gray-100 rounded-full px-4 py-2 mx-4">
                <Text className="text-gray-500 text-sm font-medium">or continue with</Text>
              </View>
              <View className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </View>

            {/* Google Sign In Button - Now Below Sign In */}
            <TouchableOpacity 
              className="flex-row items-center justify-center bg-white border border-gray-200 rounded-2xl py-4 px-6 mb-6 shadow-lg active:scale-95"
              style={{ elevation: 3 }}
              onPress={() => console.log('Google Sign In pressed')}
            >
              <View className="w-5 h-5 bg-red-500 rounded-full mr-3" />
              <Text className="text-gray-700 font-semibold text-base">Continue with Google</Text>
            </TouchableOpacity>

            {/* Create Account */}
            <View className="flex-row justify-center mb-4">
              <Text className="text-gray-600 text-sm font-medium">Dont have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text className="text-blue-500 text-sm font-bold">Create Account</Text>
              </TouchableOpacity>
            </View>

            {/* Privacy Policy */}
            <View className="flex-row justify-center flex-wrap">
              <Text className="text-gray-400 text-xs">By continuing, you agree to our </Text>
              <TouchableOpacity onPress={() => console.log('Privacy policy pressed')}>
                <Text className="text-blue-500 text-xs font-semibold underline">Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>

      
        </View>
      </LinearGradient>
    </>
  );
}
