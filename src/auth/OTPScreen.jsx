// import React, { useState, useRef } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert ,Image} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import SkyStructLogo from '../../assets/SkystructLogo.png'; // Correct path based on folder structure

// export default function OTPScreen() {
//   const navigation = useNavigation();
//   const [otp, setOtp] = useState(['', '', '', '']);
//   const [focusedIndex, setFocusedIndex] = useState(0);
  
//   // Create refs for each input
//   const inputRefs = useRef([]);

//   const handleVerification = () => {
//     const otpCode = otp.join('');
//     if (otpCode.length === 4) {
//       // Replace with actual verification logic
//       console.log('OTP entered:', otpCode);
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Main' }],
//       });
//     } else {
//       Alert.alert('Invalid OTP', 'Please enter all 4 digits');
//     }
//   };

//   const handleOtpChange = (value, index) => {
//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     // Auto focus next input
//     if (value !== '' && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (key, index) => {
//     if (key === 'Backspace' && otp[index] === '' && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const resendOTP = () => {
//     setOtp(['', '', '', '']);
//     setFocusedIndex(0);
//     inputRefs.current[0]?.focus();
//     Alert.alert('OTP Resent', 'A new verification code has been sent to your phone.');
//   };

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
//       <LinearGradient
//         colors={['#1e40af', '#3b82f6', '#60a5fa']}
//         className="flex-1"
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <View className="flex-1 px-6 py-8 justify-center">
//           {/* Logo Section */}
//           <View className="items-center mb-10">
//             <View className="mb-6 relative">
//               <View className="w-24 h-24 bg-white backdrop-blur-lg rounded-2xl items-center justify-center border border-white/60">
//                 {/* <Ionicons name="lock-closed-outline" size={40} color="#1e40af" /> */}
//                 <Image
//                   source={SkyStructLogo}
//                   className="h-20 w-20"
//                   resizeMode="cover"
//                 />
//               </View>
//             </View>
//             <Text className="text-white text-3xl font-bold tracking-wide mb-2">SKYSTRUCT</Text>
//             <Text className="text-white/80 text-base text-center leading-6 px-4">
//               Enter verification code
//             </Text>
//           </View>

//           {/* Main Content Card */}
//           <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
//             {/* OTP Title */}
//             <View className="mb-8">
//               <Text className="text-blue-900 text-xl font-bold mb-1 text-center">Verify Your Account</Text>
//               <Text className="text-gray-600 text-base text-center">
//                 Enter the 4-digit code sent to your phone
//               </Text>
//             </View>

//             {/* OTP Input Fields */}
//             <View className="flex-row justify-center space-x-4 mb-8">
//               {otp.map((digit, index) => (
//                 <View key={index} className="relative">
//                   <TextInput
//                     ref={(ref) => (inputRefs.current[index] = ref)}
//                     className={`w-16 h-16 border rounded-xl text-center text-2xl font-bold ${
//                       focusedIndex === index 
//                         ? 'border-blue-500 bg-blue-50' 
//                         : digit 
//                         ? 'border-green-400 bg-green-50' 
//                         : 'border-gray-200 bg-gray-50'
//                     }`}
//                     maxLength={1}
//                     keyboardType="numeric"
//                     value={digit}
//                     onChangeText={(value) => handleOtpChange(value, index)}
//                     onFocus={() => setFocusedIndex(index)}
//                     onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
//                     textAlign="center"
//                   />
//                   {/* Focus indicator */}
//                   {focusedIndex === index && (
//                     <View className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full" />
//                   )}
//                 </View>
//               ))}
//             </View>

//             {/* Resend OTP */}
//             <View className="flex-row justify-center mb-6">
//               <Text className="text-gray-600 text-sm">Didn't receive a code? </Text>
//               <TouchableOpacity onPress={resendOTP}>
//                 <Text className="text-blue-600 text-sm font-semibold">Resend</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Verify Button */}
//             <TouchableOpacity 
//               className="mb-6 active:opacity-90"
//               onPress={handleVerification}
//             >
//               <LinearGradient
//                 colors={['#0956B5', '#0956B5', '#0956B5']}
//                 className="py-4"
//                 style={{ borderRadius: 16 }}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Text className="text-white text-center font-bold text-base">Verify & Continue</Text>
//               </LinearGradient>
//             </TouchableOpacity>

//             {/* Back to Sign Up */}
//             <View className="flex-row justify-center">
//               <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Text className="text-blue-600 text-sm font-semibold">← Back to Sign Up</Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           {/* Privacy Policy */}
//           <View className="flex-row justify-center flex-wrap mt-6">
//             <Text className="text-white/70 text-xs">By verifying, you agree to our </Text>
//             <TouchableOpacity onPress={() => console.log('Privacy policy pressed')}>
//               <Text className="text-white text-xs font-medium underline">Privacy Policy</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </LinearGradient>
//     </>
//   );
// }
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Alert ,Image} from 'react-native';
import { useNavigation ,useRoute} from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import SkyStructLogo from '../../assets/SkystructLogo.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OTPScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { formData } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  
  const inputRefs = useRef([]);
console.log("ok google",formData)
  // const handleVerification =async () => {
  //   const url = 'https://api-v2-skystruct.prudenttec.com/member/signup-developer-details';
    
  //   const otpCode = otp.join('');
  //   if (otpCode.length === 4) {
  //     console.log('OTP entered:', otpCode);
  //     const body = {
  //     memberFormBean: {
  //       ...formData,
  //       otp: otpCode,
       
  //     }
  //   };
  //     console.log("changes done",body);
      
  //     try {
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify(body)
  //     });

  //     const data = await response.json();
  //     console.log("all ok nothing doen",data);

  //     if (data.status) {
  //       console.log('OTP Verification Response:', data);
  //       console.log("adsf",data);
  //       navigation.reset({
  //         index: 0,
  //         routes: [{ name: 'Main' }],
  //       });
  //     } else {
  //       console.error('Verification Error:', data);
  //       Alert.alert('Verification Failed', 'Invalid OTP. Please try again.');
  //     }
  //   } catch (err) {
  //     console.error('Internal server error', err);
  //     Alert.alert('Error', 'Internal server error. Please try again later.');
  //   }
  //   } else {
  //     Alert.alert('Invalid OTP', 'Please enter all 4 digits');
  //   }
  // };
const handleVerification = async () => {
  const url = 'https://api-v2-skystruct.prudenttec.com/member/signup-developer-details';

  const otpCode = otp.join('');
  if (otpCode.length === 4) {
    console.log('OTP entered:', otpCode);

    const body = {
      memberFormBean: {
        ...formData,
        otp: otpCode,
      },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log('API Response:', data);

      if (data.status) {
        // ✅ Store data in AsyncStorage
        try {
          await AsyncStorage.setItem('userData', JSON.stringify(data));
          await AsyncStorage.setItem('jwtToken', data.jwtToken); // store token separately if needed
          console.log('User data saved in AsyncStorage');
        } catch (err) {
          console.error('AsyncStorage Error:', err);
        }

        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        console.error('Verification Error:', data);
        Alert.alert('Verification Failed', 'Invalid OTP. Please try again.');
      }
    } catch (err) {
      console.error('Internal server error', err);
      Alert.alert('Error', 'Internal server error. Please try again later.');
    }
  } else {
    Alert.alert('Invalid OTP', 'Please enter all 4 digits');
  }
};

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
  };

  const handleKeyPress = (key, index) => {
    if (key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
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
        <View className="flex-1 px-6 py-8 justify-center">
          {/* Logo Section */}
          <View className="items-center mb-10">
            <View className="mb-6 relative">
              <View className="w-24 h-24 bg-white backdrop-blur-lg rounded-2xl items-center justify-center border border-white/60">
                <Image
                  source={SkyStructLogo}
                  className="h-20 w-20"
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text className="text-white text-3xl font-bold tracking-wide mb-2">SKYSTRUCT</Text>
            <Text className="text-white/80 text-base text-center leading-6 px-4">
              Enter verification code
            </Text>
          </View>

          {/* Main Content Card */}
          <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            {/* OTP Title */}
            <View className="mb-8">
              <Text className="text-blue-900 text-xl font-bold mb-1 text-center">Verify Your Account</Text>
              <Text className="text-gray-600 text-base text-center">
                Enter the 4-digit code sent to your phone
              </Text>
            </View>

            {/* OTP Input Fields */}
            <View className="flex-row justify-center space-x-4 mb-8">
              {otp.map((digit, index) => (
                <View key={index} className="relative">
                  <TextInput
                    ref={(ref) => (inputRefs.current[index] = ref)}
                    className={`w-16 h-16 border rounded-xl text-center text-2xl font-bold ${
                      focusedIndex === index 
                        ? 'border-blue-500 bg-blue-50' 
                        : digit !== '' 
                        ? 'border-green-400 bg-green-50' 
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
                  {/* Focus indicator - only show blue dot for focused field, not for filled fields */}
                  {focusedIndex === index && (
                    <View className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                </View>
              ))}
            </View>

            {/* Resend OTP */}
            <View className="flex-row justify-center mb-6">
              <Text className="text-gray-600 text-sm">Didn't receive a code? </Text>
              <TouchableOpacity onPress={resendOTP}>
                <Text className="text-blue-600 text-sm font-semibold">Resend</Text>
              </TouchableOpacity>
            </View>

            {/* Verify Button */}
            <TouchableOpacity 
              className="mb-6 active:opacity-90"
              onPress={handleVerification}
            >
              <LinearGradient
                colors={['#0956B5', '#0956B5', '#0956B5']}
                className="py-4"
                style={{ borderRadius: 16 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-white text-center font-bold text-base">Verify & Continue</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Back to Sign Up */}
            <View className="flex-row justify-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text className="text-blue-600 text-sm font-semibold">← Back to Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Privacy Policy */}
          <View className="flex-row justify-center flex-wrap mt-6">
            <Text className="text-white/70 text-xs">By verifying, you agree to our </Text>
            <TouchableOpacity onPress={() => console.log('Privacy policy pressed')}>
              <Text className="text-white text-xs font-medium underline">Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}