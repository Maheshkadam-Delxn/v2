// // import React, { useState } from 'react';
// // import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
// // import { useNavigation } from '@react-navigation/native';
// // import { LinearGradient } from 'expo-linear-gradient';

// // export default function SignUpScreen() {
// //   const navigation = useNavigation();
// //   const [fullName, setFullName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [phoneNumber, setPhoneNumber] = useState('');
// //   const [selectedCountry, setSelectedCountry] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
  
// //   // Focus states
// //   const [fullNameFocused, setFullNameFocused] = useState(false);
// //   const [emailFocused, setEmailFocused] = useState(false);
// //   const [passwordFocused, setPasswordFocused] = useState(false);
// //   const [phoneFocused, setPhoneFocused] = useState(false);
// //   const [countryFocused, setCountryFocused] = useState(false);

// //   return (
// //     <>
// //       <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
// //       <LinearGradient
// //         colors={['#1e40af', '#3b82f6', '#60a5fa']}
// //         className="flex-1"
// //         start={{ x: 0, y: 0 }}
// //         end={{ x: 1, y: 1 }}
// //       >
// //         <ScrollView className="flex-1 px-6 py-8" showsVerticalScrollIndicator={false}>
// //           {/* Background Decorative Elements */}
// //           <View className="absolute top-20 right-8 w-32 h-32 bg-white/10 rounded-full" />
// //           <View className="absolute top-40 left-12 w-20 h-20 bg-white/5 rounded-full" />
// //           <View className="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-full" />

// //           {/* Logo Section */}
// //           <View className="items-center mt-8 mb-8">
// //             <View className="mb-6 relative">
// //               {/* Glassmorphism effect for logo container */}
// //               <View className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-2xl items-center justify-center mb-4 shadow-2xl border border-white/30">
// //                 <LinearGradient
// //                   colors={['#fbbf24', '#f59e0b', '#d97706']}
// //                   className="w-12 h-12 rounded-xl items-center justify-center"
// //                 >
// //                   <Text className="text-white font-bold text-xl">SS</Text>
// //                 </LinearGradient>
// //               </View>
// //             </View>
// //             <Text className="text-white text-2xl font-bold tracking-wide mb-2">SKYSTRUCT</Text>
// //             <Text className="text-white/90 text-lg font-medium mb-2">Create a Developer Account</Text>
// //             <Text className="text-white/70 text-sm text-center leading-6 px-4">
// //               Simplifying Construction Management{'\n'}for a Modern Workforce
// //             </Text>
// //           </View>

// //           {/* Main Content Card */}
// //           <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 mb-4">
            
// //             {/* Full Name Input */}
// //             <View className="mb-4">
// //               <View className="relative">
// //                 <TextInput
// //                   className={`border-2 rounded-2xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
// //                     fullNameFocused ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
// //                   }`}
// //                   placeholder=""
// //                   value={fullName}
// //                   onChangeText={setFullName}
// //                   onFocus={() => setFullNameFocused(true)}
// //                   onBlur={() => setFullNameFocused(false)}
// //                 />
// //                 <Text className={`absolute left-4 transition-all duration-200 ${
// //                   fullNameFocused || fullName ? 'top-2 text-xs text-blue-500 font-semibold' : 'top-5 text-base text-gray-500'
// //                 }`}>
// //                   Full Name
// //                 </Text>
// //                 <View className="absolute right-4 top-5">
// //                   <Text className="text-gray-400 text-lg">👤</Text>
// //                 </View>
// //               </View>
// //             </View>

// //             {/* Email Input */}
// //             <View className="mb-4">
// //               <View className="relative">
// //                 <TextInput
// //                   className={`border-2 rounded-2xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
// //                     emailFocused ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
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
// //                   emailFocused || email ? 'top-2 text-xs text-blue-500 font-semibold' : 'top-5 text-base text-gray-500'
// //                 }`}>
// //                   Email Address
// //                 </Text>
// //                 <View className="absolute right-4 top-5">
// //                   <Text className="text-gray-400 text-lg">✉️</Text>
// //                 </View>
// //               </View>
// //             </View>

// //             {/* Password Input */}
// //             <View className="mb-4">
// //               <View className="relative">
// //                 <TextInput
// //                   className={`border-2 rounded-2xl px-4 pt-6 pb-4 pr-16 text-gray-800 font-medium ${
// //                     passwordFocused ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
// //                   }`}
// //                   placeholder=""
// //                   value={password}
// //                   onChangeText={setPassword}
// //                   secureTextEntry={!showPassword}
// //                   onFocus={() => setPasswordFocused(true)}
// //                   onBlur={() => setPasswordFocused(false)}
// //                 />
// //                 <Text className={`absolute left-4 transition-all duration-200 ${
// //                   passwordFocused || password ? 'top-2 text-xs text-blue-500 font-semibold' : 'top-5 text-base text-gray-500'
// //                 }`}>
// //                   Password
// //                 </Text>
// //                 <TouchableOpacity
// //                   className="absolute right-4 top-5 w-8 h-6 items-center justify-center"
// //                   onPress={() => setShowPassword(!showPassword)}
// //                 >
// //                   <Text className="text-gray-400 text-lg">{showPassword ? '🙈' : '👁️'}</Text>
// //                 </TouchableOpacity>
// //                 <View className="absolute right-14 top-5">
// //                   <Text className="text-gray-400 text-lg">🔒</Text>
// //                 </View>
// //               </View>
// //             </View>

// //             {/* Phone Number Input */}
// //             <View className="mb-4">
// //               <View className="relative">
// //                 <TextInput
// //                   className={`border-2 rounded-2xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
// //                     phoneFocused ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
// //                   }`}
// //                   placeholder=""
// //                   value={phoneNumber}
// //                   onChangeText={setPhoneNumber}
// //                   keyboardType="phone-pad"
// //                   onFocus={() => setPhoneFocused(true)}
// //                   onBlur={() => setPhoneFocused(false)}
// //                 />
// //                 <Text className={`absolute left-4 transition-all duration-200 ${
// //                   phoneFocused || phoneNumber ? 'top-2 text-xs text-blue-500 font-semibold' : 'top-5 text-base text-gray-500'
// //                 }`}>
// //                   Phone number
// //                 </Text>
// //                 <View className="absolute right-4 top-5">
// //                   <Text className="text-gray-400 text-lg">📱</Text>
// //                 </View>
// //               </View>
// //             </View>

// //             {/* Country Selection */}
// //             <View className="mb-6">
// //               <Text className="text-blue-500 text-sm font-semibold mb-2">Select Country</Text>
// //               <View className="relative">
// //                 <TouchableOpacity
// //                   className={`border-2 rounded-2xl px-4 py-5 flex-row justify-between items-center ${
// //                     countryFocused ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
// //                   }`}
// //                   onPress={() => {
// //                     // Add country selection logic here
// //                     setCountryFocused(!countryFocused);
// //                     console.log('Country selection pressed');
// //                   }}
// //                 >
// //                   <Text className={selectedCountry ? 'text-gray-800 font-medium' : 'text-gray-500'}>
// //                     {selectedCountry || 'Select Country'}
// //                   </Text>
// //                   <Text className="text-gray-400 text-lg">🌍</Text>
// //                 </TouchableOpacity>
// //               </View>
// //             </View>

// //             {/* Already have account */}
// //             <View className="flex-row justify-center mb-6">
// //               <Text className="text-gray-600 text-sm font-medium">Already have an Account? </Text>
// //               <TouchableOpacity onPress={() => navigation.goBack()}>
// //                 <Text className="text-blue-500 text-sm font-bold">Login</Text>
// //               </TouchableOpacity>
// //             </View>

// //             {/* Verify Account Button with Gradient */}
// //             <TouchableOpacity 
// //               className="rounded-2xl py-4 mb-4 shadow-lg active:scale-95"
// //               onPress={() => navigation.navigate('OTP')}
// //             >
// //               <LinearGradient
// //                 colors={['#3b82f6', '#1d4ed8', '#1e40af']}
// //                 className="rounded-2xl py-1 px-6"
// //                 start={{ x: 0, y: 0 }}
// //                 end={{ x: 1, y: 0 }}
// //               >
// //                 <Text className="text-white text-center font-bold text-lg py-3">Verify Account</Text>
// //               </LinearGradient>
// //             </TouchableOpacity>

// //             {/* Privacy Policy */}
// //             <View className="flex-row justify-center flex-wrap">
// //               <Text className="text-gray-400 text-xs">For more information, Check our </Text>
// //               <TouchableOpacity onPress={() => console.log('Privacy policy pressed')}>
// //                 <Text className="text-blue-500 text-xs font-semibold underline">Privacy Policy</Text>
// //               </TouchableOpacity>
// //             </View>
// //           </View>

// //           {/* Demo Navigation Button - For Development */}
// //           <View className="mb-8">
// //             <TouchableOpacity 
// //               onPress={() => navigation.navigate('OTP')}
// //               className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl py-3 active:scale-95"
// //             >
// //               <Text className="text-white text-center font-semibold">🚀 Continue to OTP</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </ScrollView>
// //       </LinearGradient>
// //     </>
// //   );
// // }
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import SkyStructLogo from '../../assets/SkystructLogo.png';

// export default function SignUpScreen() {
//   const navigation = useNavigation();
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
  
//   // Focus states
//   const [fullNameFocused, setFullNameFocused] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [phoneFocused, setPhoneFocused] = useState(false);
//   const [countryFocused, setCountryFocused] = useState(false);

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
//       <LinearGradient
//         colors={['#1e40af', '#3b82f6', '#60a5fa']}
//         className="flex-1"
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <ScrollView className="flex-1 px-6 py-8" showsVerticalScrollIndicator={false}>
//           {/* Logo Section */}
//           <View className="items-center mt-8 mb-8">
//             <View className="mb-6 relative">
//               <View className="w-24 h-24 bg-white backdrop-blur-lg rounded-2xl items-center justify-center mb-4  border border-white/30">
//                 <Image
//                   source={SkyStructLogo}
//                   className="h-20 w-20 rounded-xl"
//                   resizeMode="cover"
//                 />
//               </View>
//             </View>
//             <Text className="text-white text-3xl font-bold tracking-wide mb-2">SKYSTRUCT</Text>
//             <Text className="text-white/80 text-base text-center leading-6 px-4">
//               Create Your Account
//             </Text>
//           </View>

//           {/* Main Content Card */}
//           <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6  border border-white/20 mb-8">
//             {/* Full Name Input */}
//             <View className="mb-5">
//               <View className="relative">
//                 <TextInput
//                   className={`border-2 rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
//                     fullNameFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
//                   }`}
//                   placeholder=""
//                   value={fullName}
//                   onChangeText={setFullName}
//                   onFocus={() => setFullNameFocused(true)}
//                   onBlur={() => setFullNameFocused(false)}
//                 />
//                 <Text className={`absolute left-4 transition-all duration-200 ${
//                   fullNameFocused || fullName ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-gray-500'
//                 }`}>
//                   Full Name
//                 </Text>
//                 <View className="absolute right-4 top-5">
//                   <Ionicons 
//                     name="person-outline" 
//                     size={20} 
//                     color={fullNameFocused ? '#3b82f6' : '#9ca3af'} 
//                   />
//                 </View>
//               </View>
//             </View>

//             {/* Email Input */}
//             <View className="mb-5">
//               <View className="relative">
//                 <TextInput
//                   className={`border-2 rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
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
//                 <Text className={`absolute left-4 transition-all duration-200 ${
//                   emailFocused || email ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-gray-500'
//                 }`}>
//                   Email Address
//                 </Text>
//                 <View className="absolute right-4 top-5">
//                   <Ionicons 
//                     name="mail-outline" 
//                     size={20} 
//                     color={emailFocused ? '#3b82f6' : '#9ca3af'} 
//                   />
//                 </View>
//               </View>
//             </View>

//             {/* Password Input */}
//             <View className="mb-3">
//               <View className="relative">
//                 <TextInput
//                   className={`border-2 rounded-xl px-4 pt-6 pb-4 pr-14 text-gray-800 font-medium ${
//                     passwordFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
//                   }`}
//                   placeholder=""
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={!showPassword}
//                   onFocus={() => setPasswordFocused(true)}
//                   onBlur={() => setPasswordFocused(false)}
//                 />
//                 <Text className={`absolute left-4 transition-all duration-200 ${
//                   passwordFocused || password ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-gray-500'
//                 }`}>
//                   Password
//                 </Text>
//                 <TouchableOpacity
//                   className="absolute right-4 top-5 w-6 h-6 items-center justify-center"
//                   onPress={() => setShowPassword(!showPassword)}
//                 >
//                   <Ionicons 
//                     name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
//                     size={20} 
//                     color="#6b7280" 
//                   />
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Phone Number Input */}
//             <View className="mb-5">
//               <View className="relative">
//                 <TextInput
//                   className={`border-2 rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
//                     phoneFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
//                   }`}
//                   placeholder=""
//                   value={phoneNumber}
//                   onChangeText={setPhoneNumber}
//                   keyboardType="phone-pad"
//                   onFocus={() => setPhoneFocused(true)}
//                   onBlur={() => setPhoneFocused(false)}
//                 />
//                 <Text className={`absolute left-4 transition-all duration-200 ${
//                   phoneFocused || phoneNumber ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-gray-500'
//                 }`}>
//                   Phone Number
//                 </Text>
//                 <View className="absolute right-4 top-5">
//                   <Ionicons 
//                     name="call-outline" 
//                     size={20} 
//                     color={phoneFocused ? '#3b82f6' : '#9ca3af'} 
//                   />
//                 </View>
//               </View>
//             </View>

//             {/* Country Selection */}
//             <View className="mb-6">
//               <View className="relative">
//                 <TouchableOpacity
//                   className={`border-2 rounded-xl px-4 pt-6 pb-4 flex-row justify-between items-center ${
//                     countryFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
//                   }`}
//                   onPress={() => {
//                     setCountryFocused(!countryFocused);
//                     console.log('Country selection pressed');
//                   }}
//                 >
//                   <Text className={`${selectedCountry ? 'text-gray-800' : 'text-gray-500'} font-medium`}>
//                     {selectedCountry || 'Select Country'}
//                   </Text>
//                   <Ionicons 
//                     name="chevron-down-outline" 
//                     size={20} 
//                     color="#6b7280" 
//                   />
//                 </TouchableOpacity>
//                 <Text className={`absolute left-4 transition-all duration-200 ${
//                   countryFocused || selectedCountry ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-gray-500'
//                 }`}>
//                   Country
//                 </Text>
//               </View>
//             </View>

//             {/* Sign Up Button */}
//             <TouchableOpacity 
//               className="mb-6 active:opacity-90"
//               onPress={() => navigation.navigate('OTP')}
//             >
//               <LinearGradient
//                 colors={['#0956B5', '#0956B5', '#0956B5']}
//                 className="py-4"
//                 style={{ borderRadius: 16 }}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <Text className="text-white text-center font-bold text-base">Create Account</Text>
//               </LinearGradient>
//             </TouchableOpacity>

//             {/* Already have account */}
//             <View className="flex-row justify-center mb-4">
//               <Text className="text-gray-600 text-sm">Already have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.goBack()}>
//                 <Text className="text-blue-600 text-sm font-semibold">Sign In</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Privacy Policy */}
//             <View className="flex-row justify-center flex-wrap">
//               <Text className="text-gray-500 text-xs">By creating an account, you agree to our </Text>
//               <TouchableOpacity onPress={() => console.log('Privacy policy pressed')}>
//                 <Text className="text-blue-600 text-xs font-medium underline">Privacy Policy</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </LinearGradient>
//     </>
//   );
// }
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SkyStructLogo from '../../assets/SkystructLogo.png';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Focus states
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [countryFocused, setCountryFocused] = useState(false);

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
              Create Your Account
            </Text>
          </View>

          {/* Main Content Card */}
          <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            {/* Full Name Input */}
            <View className="mb-5">
              <View className="relative">
                <TextInput
                  className={`border rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
                    fullNameFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder=""
                  value={fullName}
                  onChangeText={setFullName}
                  onFocus={() => setFullNameFocused(true)}
                  onBlur={() => setFullNameFocused(false)}
                />
                <Text className={`absolute left-4 transition-all duration-200 ${
                  fullNameFocused || fullName ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
                }`}>
                  Full Name
                </Text>
                <View className="absolute right-4 top-5">
                  <Ionicons 
                    name="person-outline" 
                    size={20} 
                    color={fullNameFocused ? '#3b82f6' : '#90a1b9'} 
                  />
                </View>
              </View>
            </View>

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
                <Text className={`absolute left-4 transition-all duration-200 ${
                  emailFocused || email ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
                }`}>
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
                <Text className={`absolute left-4 transition-all duration-200 ${
                  passwordFocused || password ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
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
                    color="#90a1b9" 
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Phone Number Input */}
            <View className="mb-5">
              <View className="relative">
                <TextInput
                  className={`border rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
                    phoneFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
                  }`}
                  placeholder=""
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => setPhoneFocused(false)}
                />
                <Text className={`absolute left-4 transition-all duration-200 ${
                  phoneFocused || phoneNumber ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
                }`}>
                  Phone Number
                </Text>
                <View className="absolute right-4 top-5">
                  <Ionicons 
                    name="call-outline" 
                    size={20} 
                    color={phoneFocused ? '#3b82f6' : '#90a1b9'} 
                  />
                </View>
              </View>
            </View>

            {/* Country Selection */}
            <View className="mb-6">
              <View className="relative">
                <TouchableOpacity
                  className={`border rounded-xl px-4 pt-6 pb-4 flex-row justify-between items-center ${
                    countryFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
                  }`}
                  onPress={() => {
                    setCountryFocused(!countryFocused);
                    console.log('Country selection pressed');
                  }}
                >
                  <Text className={`${selectedCountry ? 'text-gray-800' : 'text-slate-400'} font-medium`}>
                    {selectedCountry || 'Select Country'}
                  </Text>
                  <Ionicons 
                    name="chevron-down-outline" 
                    size={20} 
                    color="#90a1b9" 
                  />
                </TouchableOpacity>
                <Text className={`absolute left-4 transition-all duration-200 ${
                  countryFocused || selectedCountry ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
                }`}>
                  Country
                </Text>
              </View>
            </View>

            {/* Create Account Button */}
            <TouchableOpacity 
              className="mb-6 active:opacity-90"
              onPress={() => navigation.navigate('OTP')}
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

            {/* Already have account */}
            <View className="flex-row justify-center mb-4">
              <Text className="text-gray-600 text-sm">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text className="text-blue-600 text-sm font-semibold">Sign In</Text>
              </TouchableOpacity>
            </View>

            {/* Privacy Policy */}
            <View className="flex-row justify-center flex-wrap">
              <Text className="text-gray-500 text-xs">By creating an account, you agree to our </Text>
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