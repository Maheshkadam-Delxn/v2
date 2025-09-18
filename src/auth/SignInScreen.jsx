

// // import React, { useState,useEffect } from 'react';
// // import { View, Text, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { LinearGradient } from 'expo-linear-gradient';
// // import AsyncStorage from '@react-native-async-storage/async-storage';
// // import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// // import SkyStructLogo from '../../assets/SkystructLogo.png'; // Correct path based on folder structure
// // import GoogleLogo from '../../assets/GoogleLogo.png'; // Ensure this image exists in your assets folder

// // export default function SignInScreen() {
// //   const navigation = useNavigation();
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [emailFocused, setEmailFocused] = useState(false);
// //   const [passwordFocused, setPasswordFocused] = useState(false);
// // useEffect(() => {
// //     const checkLoginStatus = async () => {
// //       try {
// //         const userData = await AsyncStorage.getItem('userData');
// //         if (userData) {
// //           const parsedData = JSON.parse(userData);
// //           if (parsedData.isLoggedIn) {
// //             navigation.reset({
// //               index: 0,
// //               routes: [{ name: 'Main' }],
// //             });
// //           }
// //         }
// //       } catch (err) {
// //         console.error('Error checking login status:', err);
// //       }
// //     };

// //     checkLoginStatus();
// //   }, []);
// //   return (
// //     <>
// //       <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
// //       <LinearGradient
// //         colors={['#1e40af', '#3b82f6', '#60a5fa']}
// //         className="flex-1"
// //         start={{ x: 0, y: 0 }}
// //         end={{ x: 1, y: 1 }}
// //       >
// //         <View className="flex-1 px-6 py-8 justify-center">
// //           {/* Logo Section */}
// //           <View className="items-center mb-10">
// //             <View className="mb-6 relative">
// //               {/* Professional logo container */}
// //               <View className="w-24  h-24 bg-white backdrop-blur-lg rounded-2xl items-center justify-center border border-white/60">
// //                 <Image
// //                   source={SkyStructLogo}
// //                   className="h-20 w-20"
// //                   resizeMode="cover"
// //                 />
// //               </View>
// //             </View>
// //             <Text className="text-white text-3xl font-bold tracking-wide mb-2">SKYSTRUCT</Text>
// //             <Text className="text-white/80 text-base text-center leading-6 px-4">
// //               Simplifying Construction Management for a Modern Workforce
// //             </Text>
// //           </View>

// //           {/* Main Content Card */}
// //           <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6  border border-white/20">
// //             {/* Email Input with Floating Label */}
// //             <View className="mb-5">
// //               <View className="relative">
// //                 <TextInput
// //                   className={`border rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
// //                     emailFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
// //                   }`}
// //                   placeholder=""
// //                   value={email}
// //                   onChangeText={setEmail}
// //                   keyboardType="email-address"
// //                   autoCapitalize="none"
// //                   onFocus={() => setEmailFocused(true)}
// //                   onBlur={() => setEmailFocused(false)}
// //                 />
// //                 <Text className={`absolute left-4 transition-all duration-200 ${
// //                   emailFocused || email ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
// //                 }`}>
// //                   Email Address
// //                 </Text>
// //                 <View className="absolute right-4 top-5">
// //                   <Ionicons 
// //                     name="mail-outline" 
// //                     size={20} 
// //                     color={emailFocused ? '#3b82f6' : '#90a1b9'} 
// //                   />
// //                 </View>
// //               </View>
// //             </View>

// //             {/* Password Input with Floating Label */}
// //             <View className="mb-3">
// //               <View className="relative">
// //                 <TextInput
// //                   className={`border rounded-xl px-4 pt-6 pb-4 pr-14 text-gray-800 font-medium ${
// //                     passwordFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
// //                   }`}
// //                   placeholder=""
// //                   value={password}
// //                   onChangeText={setPassword}
// //                   secureTextEntry={!showPassword}
// //                   onFocus={() => setPasswordFocused(true)}
// //                   onBlur={() => setPasswordFocused(false)}
// //                 />
// //                 <Text className={`absolute left-4 transition-all duration-200 ${
// //                   passwordFocused || password ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
// //                 }`}>
// //                   Password
// //                 </Text>
// //                 <TouchableOpacity
// //                   className="absolute right-4 top-5 w-6 h-6 items-center justify-center"
// //                   onPress={() => setShowPassword(!showPassword)}
// //                 >
// //                   <Ionicons 
// //                     name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
// //                     size={20} 
// //                     color="#90a1b9" 
// //                   />
// //                 </TouchableOpacity>
// //               </View>
// //             </View>

// //             {/* Forgot Password */}
// //             <TouchableOpacity 
// //               className="mb-6"
// //               onPress={() => console.log('Forgot password pressed')}
// //             >
// //               <Text className="text-[#0956B5] text-sm font-semibold text-right">Forgot Password?</Text>
// //             </TouchableOpacity>

// //             {/* Login Button with Gradient */}
// //             {/* <TouchableOpacity 
// //               className="rounded- mb-6 shadow-lg active:opacity-90"
// //               onPress={() => navigation.navigate('Main')}
// //             >
// //               <LinearGradient
// //                 colors={['#0956B5', '#0956B5', '#0956B5']}
// //                 className=" py-4"
// //                 start={{ x: 0, y: 0 }}
// //                 end={{ x: 1, y: 0 }}
                
// //               >
// //                 <Text className="text-white text-center font-bold text-base">Sign In</Text>
// //               </LinearGradient>
// //             </TouchableOpacity> */}
// //             <TouchableOpacity 
// //   className="mb-6  active:opacity-90"
// //   onPress={() => navigation.navigate('Main')}
// // >
// //   <LinearGradient
// //     colors={['#0956B5', '#0956B5', '#0956B5']}
// //     className="py-4"
// //     style={{ borderRadius: 16 }} // Equivalent to rounded-xl (adjust value as needed)
// //     start={{ x: 0, y: 0 }}
// //     end={{ x: 1, y: 0 }}
// //   >
// //     <Text className="text-white text-center font-bold text-base">Sign In</Text>
// //   </LinearGradient>
// // </TouchableOpacity>

// //             {/* Divider */}
// //             <View className="flex-row items-center mb-6">
// //               <View className="flex-1 h-px bg-gray-300" />
// //               <Text className="text-gray-500 text-sm font-medium mx-4">or continue with</Text>
// //               <View className="flex-1 h-px bg-gray-300" />
// //             </View>

// //             {/* Google Sign In Button with Image */}
// //             <TouchableOpacity 
// //               className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-4 px-6 mb-6  active:opacity-90"
// //               onPress={() => console.log('Google Sign In pressed')}
// //             >
// //               <Image
// //                 source={GoogleLogo}
// //                 className="w-6 h-6 mr-3"
// //                 resizeMode="contain"
// //               />
// //               <Text className="text-gray-700 font-medium text-base">Continue with Google</Text>
// //             </TouchableOpacity>

// //             {/* Create Account */}
// //             <View className="flex-row justify-center mb-4">
// //               <Text className="text-gray-600 text-sm">Don't have an account? </Text>
// //               <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
// //                 <Text className="text-blue-600 text-sm font-semibold">Create Account</Text>
// //               </TouchableOpacity>
// //             </View>

// //             {/* Privacy Policy */}
// //             <View className="flex-row justify-center flex-wrap">
// //               <Text className="text-gray-500 text-xs">By continuing, you agree to our </Text>
// //               <TouchableOpacity onPress={() => console.log('Privacy policy pressed')}>
// //                 <Text className="text-blue-600 text-xs font-medium underline">Privacy Policy</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>
// //         </View>
// //       </LinearGradient>
// //     </>
// //   );
// // }

// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StatusBar, Image, Alert } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import CryptoJS from 'crypto-js';
// import SkyStructLogo from '../../assets/SkystructLogo.png';
// import GoogleLogo from '../../assets/GoogleLogo.png';

// export default function SignInScreen() {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);

//   // Encryption parameters
//   const secretKey = CryptoJS.enc.Utf8.parse('KrGTV5YuvM41LA60'); // 16 bytes
//   const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 bytes

//   // Encryption function
//   const encrypt = (data) => {
//     const encrypted = CryptoJS.AES.encrypt(data, secretKey, {
//       iv: iv,
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     });
//     return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
//   };

//   // Check for cached user data on mount
//   useEffect(() => {
//     const checkLoginStatus = async () => {
//       try {
//         const userData = await AsyncStorage.getItem('jwtToken');
//         if (userData) {
//           const parsedData = JSON.parse(userData);
//           if (parsedData.isLoggedIn) {
//             navigation.reset({
//               index: 0,
//               routes: [{ name: 'Main' }],
//             });
//           }
//         }
//       } catch (err) {
//         console.error('Error checking login status:', err);
//       }
//     };

//     checkLoginStatus();
//   }, [navigation]);

//   // Handle login API call with encrypted password
//   const handleSignIn = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password');
//       return;
//     }

//     const encryptedPassword = encrypt(password);
//     const url = 'https://api-v2-skystruct.prudenttec.com/validateMember';
//     const body = {
//       emailId: email,
//       password: encryptedPassword,
//     };

//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//       });

//       const data = await response.json();
//       console.log("A",data.jwtToken)

//        if (data.status) {
//          try {
//                   await AsyncStorage.setItem('userData', JSON.stringify(data));
//                   await AsyncStorage.setItem('jwtToken', data.jwtToken); // store token separately if needed
//                   console.log('User data saved in AsyncStorage');
//                 } catch (err) {
//                   console.error('AsyncStorage Error:', err);
//                 }
//                   navigation.reset({
//           index: 0,
//           routes: [{ name: 'Main' }],
//         });
      
//        } else {
//          console.error('Login Error:', data);
//          Alert.alert('Login Failed', data.message || 'Invalid email or password');
//        }
//     } catch (err) {
//       console.error('Internal server error', err);
//       Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
//     }
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
//                 <Image
//                   source={SkyStructLogo}
//                   className="h-20 w-20"
//                   resizeMode="cover"
//                 />
//               </View>
//             </View>
//             <Text className="text-white text-3xl font-bold tracking-wide mb-2">SKYSTRUCT</Text>
//             <Text className="text-white/80 text-base text-center leading-6 px-4">
//               Simplifying Construction Management for a Modern Workforce
//             </Text>
//           </View>

//           {/* Main Content Card */}
//           <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
//             {/* Email Input with Floating Label */}
//             <View className="mb-5">
//               <View className="relative">
//                 <TextInput
//                   className={`border rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
//                     emailFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
//                   }`}
//                   placeholder=""
//                   value={email}
//                   onChangeText={setEmail}
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   onFocus={() => setEmailFocused(true)}
//                   onBlur={() => setEmailFocused(false)}
//                 />
//                 <Text
//                   className={`absolute left-4 transition-all duration-200 ${
//                     emailFocused || email ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
//                   }`}
//                 >
//                   Email Address
//                 </Text>
//                 <View className="absolute right-4 top-5">
//                   <Ionicons
//                     name="mail-outline"
//                     size={20}
//                     color={emailFocused ? '#3b82f6' : '#90a1b9'}
//                   />
//                 </View>
//               </View>
//             </View>

//             {/* Password Input with Floating Label */}
//             <View className="mb-3">
//               <View className="relative">
//                 <TextInput
//                   className={`border rounded-xl px-4 pt-6 pb-4 pr-14 text-gray-800 font-medium ${
//                     passwordFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
//                   }`}
//                   placeholder=""
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={!showPassword}
//                   onFocus={() => setPasswordFocused(true)}
//                   onBlur={() => setPasswordFocused(false)}
//                 />
//                 <Text
//                   className={`absolute left-4 transition-all duration-200 ${
//                     passwordFocused || password ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
//                   }`}
//                 >
//                   Password
//                 </Text>
//                 <TouchableOpacity
//                   className="absolute right-4 top-5 w-6 h-6 items-center justify-center"
//                   onPress={() => setShowPassword(!showPassword)}
//                 >
//                   <Ionicons
//                     name={showPassword ? 'eye-off-outline' : 'eye-outline'}
//                     size={20}
//                     color="#90a1b9"
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Forgot Password */}
//             <TouchableOpacity
//               className="mb-6"
//               onPress={() => navigation.navigate('ForgotPassword')}
//             >
//               <Text className="text-[#0956B5] text-sm font-semibold text-right">Forgot Password?</Text>
//             </TouchableOpacity>

//             {/* Login Button with Gradient */}
//             <TouchableOpacity
//               className="mb-6 active:opacity-90"
//               onPress={handleSignIn}
//             >
//               <LinearGradient
//                 colors={['#0956B5', '#0956B5', '#0956B5']}
//                 className="py-4"
//                 style={{ borderRadius: 16 }}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Text className="text-white text-center font-bold text-base">Sign In</Text>
//               </LinearGradient>
//             </TouchableOpacity>

//             {/* Divider */}
//             <View className="flex-row items-center mb-6">
//               <View className="flex-1 h-px bg-gray-300" />
//               <Text className="text-gray-500 text-sm font-medium mx-4">or continue with</Text>
//               <View className="flex-1 h-px bg-gray-300" />
//             </View>

//             {/* Google Sign In Button with Image */}
//             <TouchableOpacity
//               className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-4 px-6 mb-6 active:opacity-90"
//               onPress={() => console.log('Google Sign In pressed')}
//             >
//               <Image
//                 source={GoogleLogo}
//                 className="w-6 h-6 mr-3"
//                 resizeMode="contain"
//               />
//               <Text className="text-gray-700 font-medium text-base">Continue with Google</Text>
//             </TouchableOpacity>

//             {/* Create Account */}
//             <View className="flex-row justify-center mb-4">
//               <Text className="text-gray-600 text-sm">Don't have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//                 <Text className="text-blue-600 text-sm font-semibold">Create Account</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Privacy Policy */}
//             <View className="flex-row justify-center flex-wrap">
//               <Text className="text-gray-500 text-xs">By continuing, you agree to our </Text>
//               <TouchableOpacity onPress={() => console.log('Privacy policy pressed')}>
//                 <Text className="text-blue-600 text-xs font-medium underline">Privacy Policy</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>
//       </LinearGradient>
//     </>
//   );
// }

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import CryptoJS from 'crypto-js';
import SkyStructLogo from '../../assets/SkystructLogo.png';
import GoogleLogo from '../../assets/GoogleLogo.png';

export default function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Encryption parameters
  const secretKey = CryptoJS.enc.Utf8.parse('KrGTV5YuvM41LA60'); // 16 bytes
  const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); // 16 bytes

  // Encryption function
  const encrypt = (data) => {
    const encrypted = CryptoJS.AES.encrypt(data, secretKey, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  };

  // Check for cached user data on mount
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          console.log("🔑 Stored JWT:", parsedData.jwtToken); // check if token exists
          if (parsedData?.isLoggedIn && parsedData?.jwtToken) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Main' }],
            });
          }
        }
      } catch (err) {
        console.error('Error checking login status:', err);
      }
    };

    checkLoginStatus();
  }, [navigation]);

  // Handle login API call with encrypted password
  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const encryptedPassword = encrypt(password);
    const url = 'https://api-v2-skystruct.prudenttec.com/validateMember';
    const body = {
      emailId: email,
      password: encryptedPassword,
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

      if (data.status && data.jwtToken) {
        try {
          // Save everything in one object
          const userData = {
            ...data,
            jwtToken: data.jwtToken,
            isLoggedIn: true,
          };

          await AsyncStorage.setItem('userData', JSON.stringify(userData));

          // Verify storage
          const check = await AsyncStorage.getItem('userData');
          if (check) {
            const parsedCheck = JSON.parse(check);
            console.log("✅ JWT successfully stored:", parsedCheck.jwtToken);
          } else {
            console.warn("⚠️ JWT not stored!");
          }

          navigation.reset({
            index: 0,
            routes: [{ name: 'Main' }],
          });
        } catch (err) {
          console.error('AsyncStorage Error:', err);
        }
      } else {
        console.error('Login Error:', data);
        Alert.alert('Login Failed', data.message || 'Invalid email or password');
      }
    } catch (err) {
      console.error('Internal server error', err);
      Alert.alert('Error', 'Unable to connect to the server. Please try again later.');
    }
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
                <Image source={SkyStructLogo} className="h-20 w-20" resizeMode="cover" />
              </View>
            </View>
            <Text className="text-white text-3xl font-bold tracking-wide mb-2">SKYSTRUCT</Text>
            <Text className="text-white/80 text-base text-center leading-6 px-4">
              Simplifying Construction Management for a Modern Workforce
            </Text>
          </View>

          {/* Main Content Card */}
          <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            {/* Email Input */}
            <View className="mb-5">
              <View className="relative">
                <TextInput
                  className={`border rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
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
                <Text
                  className={`absolute left-4 transition-all duration-200 ${
                    emailFocused || email
                      ? 'top-2 text-xs text-blue-600 font-semibold'
                      : 'top-5 text-base text-slate-400'
                  }`}
                >
                  Email Address
                </Text>
                <View className="absolute right-4 top-5">
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={emailFocused ? '#3b82f6' : '#90a1b9'}
                  />
                </View>
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-3">
              <View className="relative">
                <TextInput
                  className={`border rounded-xl px-4 pt-6 pb-4 pr-14 text-gray-800 font-medium ${
                    passwordFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder=""
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!showPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                />
                <Text
                  className={`absolute left-4 transition-all duration-200 ${
                    passwordFocused || password
                      ? 'top-2 text-xs text-blue-600 font-semibold'
                      : 'top-5 text-base text-slate-400'
                  }`}
                >
                  Password
                </Text>
                <TouchableOpacity
                  className="absolute right-4 top-5 w-6 h-6 items-center justify-center"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#90a1b9"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Forgot Password */}
            <TouchableOpacity className="mb-6" onPress={() => navigation.navigate('ForgotPassword')}>
              <Text className="text-[#0956B5] text-sm font-semibold text-right">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            <TouchableOpacity className="mb-6 active:opacity-90" onPress={handleSignIn}>
              <LinearGradient
                colors={['#0956B5', '#0956B5', '#0956B5']}
                className="py-4"
                style={{ borderRadius: 16 }}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Text className="text-white text-center font-bold text-base">Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-gray-300" />
              <Text className="text-gray-500 text-sm font-medium mx-4">or continue with</Text>
              <View className="flex-1 h-px bg-gray-300" />
            </View>

            {/* Google Sign In */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-4 px-6 mb-6 active:opacity-90"
              onPress={() => console.log('Google Sign In pressed')}
            >
              <Image source={GoogleLogo} className="w-6 h-6 mr-3" resizeMode="contain" />
              <Text className="text-gray-700 font-medium text-base">Continue with Google</Text>
            </TouchableOpacity>

            {/* Create Account */}
            <View className="flex-row justify-center mb-4">
              <Text className="text-gray-600 text-sm">Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text className="text-blue-600 text-sm font-semibold">Create Account</Text>
              </TouchableOpacity>
            </View>

            {/* Privacy Policy */}
            <View className="flex-row justify-center flex-wrap">
              <Text className="text-gray-500 text-xs">By continuing, you agree to our </Text>
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
