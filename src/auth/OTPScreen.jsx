import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

export default function OTPScreen() {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  // Create refs for each input
  const inputRefs = useRef([]);

  const handleVerification = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 4) {
      // Replace with actual verification logic
      console.log('OTP entered:', otpCode);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Main' }],
      });
    } else {
      Alert.alert('Invalid OTP', 'Please enter all 4 digits');
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const generateOTP = () => {
    // Simulate generating/resending OTP
    Alert.alert('OTP Sent', 'A new 4-digit code has been sent to your registered number.');
  };

  const resendOTP = () => {
    setOtp(['', '', '', '']);
    setFocusedIndex(0);
    inputRefs.current[0]?.focus();
    Alert.alert('OTP Resent', 'A new verification code has been sent to your phone.');
  };

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
            <Text className="text-white/90 text-lg font-medium mb-2">Enter OTP to Continue</Text>
            <Text className="text-white/70 text-sm text-center leading-6 px-4">
              We ve sent a 4-digit code to your{'\n'}registered number.
            </Text>
          </View>

          {/* Main Content Card */}
          <View className="flex-1 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20">
            
            {/* OTP Input Fields */}
            <View className="flex-row justify-center space-x-4 mb-8">
              {otp.map((digit, index) => (
                <View key={index} className="relative">
                  <TextInput
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className={`w-16 h-16 border-2 rounded-2xl text-center text-2xl font-bold ${
                      focusedIndex === index 
                        ? 'border-blue-400 bg-blue-50/50' 
                        : digit 
                        ? 'border-green-400 bg-green-50/50' 
                        : 'border-gray-200 bg-gray-50'
                    }`}
                    maxLength={1}
                    keyboardType="numeric"
                    value={digit}
                    onChangeText={(value) => handleOtpChange(value, index)}
                    onFocus={() => setFocusedIndex(index)}
                    onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                    textAlign="center"
                  />
                  {/* Animated indicator */}
                  {focusedIndex === index && (
                    <View className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </View>
              ))}
            </View>

            {/* Generate OTP Button */}
            <TouchableOpacity 
              className="bg-orange-500/20 border border-orange-400/30 rounded-2xl py-4 mb-6 active:scale-95"
              onPress={generateOTP}
            >
              <Text className="text-orange-600 text-center font-bold text-base">Generate OTP</Text>
            </TouchableOpacity>

            {/* Resend OTP */}
            <View className="flex-row justify-center mb-8">
              <Text className="text-gray-600 text-sm">Didn t receive a OTP? </Text>
              <TouchableOpacity onPress={resendOTP}>
                <Text className="text-blue-500 text-sm font-bold underline">Resend</Text>
              </TouchableOpacity>
            </View>

            {/* Verify Button */}
            <TouchableOpacity 
              className="rounded-2xl py-4 mb-6 shadow-lg active:scale-95"
              onPress={handleVerification}
            >
              <LinearGradient
                colors={['#3b82f6', '#1d4ed8', '#1e40af']}
                className="rounded-2xl py-1 px-6"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-white text-center font-bold text-lg py-3">Verify & Continue</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Privacy Policy */}
            <View className="flex-row justify-center flex-wrap">
              <Text className="text-gray-400 text-xs">For more information, Check our </Text>
              <TouchableOpacity onPress={() => console.log('Privacy policy pressed')}>
                <Text className="text-blue-500 text-xs font-semibold underline">Privacy Policy</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Demo Navigation Buttons - For Development */}
          <View className="mt-4 space-y-3">
            <TouchableOpacity 
              onPress={() => navigation.goBack()}
              className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl py-3 active:scale-95"
            >
              <Text className="text-white text-center font-semibold">⬅️ Back to Sign Up</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={handleVerification}
              className="bg-green-500/20 backdrop-blur-lg border border-green-300/30 rounded-2xl py-3 active:scale-95"
            >
              <Text className="text-white text-center font-semibold">🚀 Verify and Enter App</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}
