// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   TextInput, 
//   TouchableOpacity, 
//   StatusBar, 
//   Image, 
//   ScrollView,
//   Animated,
//   Dimensions,
//   Platform,
//   KeyboardAvoidingView
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import SkyStructLogo from '../../assets/SkystructLogo.png';
// import GoogleLogo from '../../assets/GoogleLogo.png';

// const { width, height } = Dimensions.get('window');

// export default function SignInScreen() {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [showPassword, setShowPassword] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Animation values
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const slideUpAnim = useRef(new Animated.Value(30)).current;
//   const logoAnim = useRef(new Animated.Value(0.8)).current;

//   useEffect(() => {
//     // Entrance animations
//     Animated.parallel([
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//       Animated.timing(slideUpAnim, {
//         toValue: 0,
//         duration: 600,
//         useNativeDriver: true,
//       }),
//       Animated.timing(logoAnim, {
//         toValue: 1,
//         duration: 600,
//         useNativeDriver: true,
//       })
//     ]).start();
//   }, []);

//   const handleSignIn = async () => {
//     setIsLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false);
//       navigation.navigate('Main');
//     }, 2000);
//   };

//   return (
//     <KeyboardAvoidingView 
//       style={{ flex: 1 }} 
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
//       <ScrollView 
//         contentContainerStyle={{ 
//           flexGrow: 1, 
//           paddingHorizontal: 24, 
//           paddingTop: Platform.OS === 'ios' ? 60 : 40,
//           paddingBottom: 40 
//         }}
//         keyboardShouldPersistTaps="handled"
//         showsVerticalScrollIndicator={false}
//         className="bg-white"
//       >
//         <Animated.View 
//           className="flex-1 justify-center"
//           style={{
//             opacity: fadeAnim,
//             transform: [{ translateY: slideUpAnim }]
//           }}
//         >
//           {/* Logo Section */}
//           <Animated.View 
//             className="items-center mb-10"
//             style={{
//               transform: [{ scale: logoAnim }]
//             }}
//           >
//             <View className="mb-6">
//               <View className="w-24 h-24 bg-blue-50 rounded-2xl items-center justify-center shadow-sm border border-blue-100">
//                 <Image
//                   source={SkyStructLogo}
//                   className="h-20 w-20"
//                   resizeMode="contain"
//                 />
//               </View>
//             </View>
            
//             <Text className="text-blue-900 text-2xl font-bold mb-2 text-center">
//               SKYSTRUCT
//             </Text>
//             <Text className="text-gray-600 text-sm text-center px-4 font-medium">
//               Simplifying Construction Management for a Modern Workforce
//             </Text>
//           </Animated.View>

//           {/* Main Content Card */}
//           <View 
//             className="bg-blue-50 rounded-2xl p-6 border border-blue-100"
//           >
//             {/* Welcome Section */}
//             <View className="mb-6">
//               <Text className="text-blue-900 text-xl font-bold mb-1">Welcome back</Text>
//               <Text className="text-gray-600 text-base">
//                 Sign in to access your construction dashboard
//               </Text>
//             </View>

//             {/* Email Input */}
//             <View className="mb-5">
//               <View className="relative">
//                 <TextInput
//                   className={`border rounded-lg px-4 pt-5 pb-3 text-gray-800 font-normal ${
//                     emailFocused ? 'border-blue-500 bg-white' : 'border-gray-300 bg-white'
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
//                   emailFocused || email ? 'top-1 text-xs text-blue-600 font-medium' : 'top-3 text-sm text-gray-500'
//                 }`}>
//                   Email Address
//                 </Text>
//                 <View className="absolute right-4 top-3">
//                   <Ionicons 
//                     name="mail-outline" 
//                     size={20} 
//                     color={emailFocused ? '#3b82f6' : '#9ca3af'} 
//                   />
//                 </View>
//               </View>
//             </View>

//             {/* Password Input */}
//             <View className="mb-4">
//               <View className="relative">
//                 <TextInput
//                   className={`border rounded-lg px-4 pt-5 pb-3 pr-12 text-gray-800 font-normal ${
//                     passwordFocused ? 'border-blue-500 bg-white' : 'border-gray-300 bg-white'
//                   }`}
//                   placeholder=""
//                   value={password}
//                   onChangeText={setPassword}
//                   secureTextEntry={!showPassword}
//                   onFocus={() => setPasswordFocused(true)}
//                   onBlur={() => setPasswordFocused(false)}
//                 />
//                 <Text className={`absolute left-4 transition-all duration-200 ${
//                   passwordFocused || password ? 'top-1 text-xs text-blue-600 font-medium' : 'top-3 text-sm text-gray-500'
//                 }`}>
//                   Password
//                 </Text>
//                 <TouchableOpacity
//                   className="absolute right-4 top-3 w-6 h-6 items-center justify-center"
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

//             {/* Forgot Password */}
//             <TouchableOpacity 
//               className="mb-6 self-end"
//               onPress={() => console.log('Forgot password pressed')}
//             >
//               <Text className="text-blue-600 text-sm font-medium">
//                 Forgot Password?
//               </Text>
//             </TouchableOpacity>

//             {/* Sign In Button */}
//             <TouchableOpacity 
//               className="mb-6 active:opacity-90"
//               onPress={handleSignIn}
//               disabled={isLoading}
//             >
//               <LinearGradient
//                 colors={isLoading ? ['#cbd5e1', '#94a3b8'] : ['#1e40af', '#3b82f6']}
//                 className="py-3 rounded-lg"
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 0 }}
//               >
//                 <View className="flex-row items-center justify-center">
//                   {isLoading && (
//                     <MaterialIcons name="refresh" size={22} color="white" className="mr-2" />
//                   )}
//                   <Text className="text-white text-center font-semibold text-base">
//                     {isLoading ? 'Signing In...' : 'Sign In'}
//                   </Text>
//                 </View>
//               </LinearGradient>
//             </TouchableOpacity>

//             {/* Divider */}
//             <View className="flex-row items-center mb-6">
//               <View className="flex-1 h-px bg-gray-300" />
//               <Text className="text-gray-500 text-xs font-medium mx-3">
//                 or continue with
//               </Text>
//               <View className="flex-1 h-px bg-gray-300" />
//             </View>

//             {/* Google Sign In */}
//             <TouchableOpacity 
//               className="flex-row items-center justify-center bg-white border border-gray-300 rounded-lg py-3 px-6 mb-6 active:bg-gray-50"
//               onPress={() => console.log('Google Sign In pressed')}
//             >
//               <Image
//                 source={GoogleLogo}
//                 className="w-5 h-5 mr-3"
//                 resizeMode="contain"
//               />
//               <Text className="text-gray-700 font-medium text-sm">
//                 Continue with Google
//               </Text>
//             </TouchableOpacity>

//             {/* Create Account Section */}
//             <View className="flex-row justify-center mb-4">
//               <Text className="text-gray-600 text-sm">Don't have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//                 <Text className="text-blue-600 text-sm font-medium">
//                   Create Account
//                 </Text>
//               </TouchableOpacity>
//             </View>

//             {/* Privacy Policy */}
//             <View className="flex-row justify-center flex-wrap">
//               <Text className="text-gray-500 text-xs">By continuing, you agree to our </Text>
//               <TouchableOpacity onPress={() => console.log('Privacy policy pressed')}>
//                 <Text className="text-blue-600 text-xs font-medium underline">
//                   Privacy Policy
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </Animated.View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }


import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import SkyStructLogo from '../../assets/SkystructLogo.png'; // Correct path based on folder structure
import GoogleLogo from '../../assets/GoogleLogo.png'; // Ensure this image exists in your assets folder

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
        <View className="flex-1 px-6 py-8 justify-center">
          {/* Logo Section */}
          <View className="items-center mb-10">
            <View className="mb-6 relative">
              {/* Professional logo container */}
              <View className="w-24  h-24 bg-white backdrop-blur-lg rounded-2xl items-center justify-center border border-white/60">
                <Image
                  source={SkyStructLogo}
                  className="h-20 w-20"
                  resizeMode="cover"
                />
              </View>
            </View>
            <Text className="text-white text-3xl font-bold tracking-wide mb-2">SKYSTRUCT</Text>
            <Text className="text-white/80 text-base text-center leading-6 px-4">
              Simplifying Construction Management for a Modern Workforce
            </Text>
          </View>

          {/* Main Content Card */}
          <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6  border border-white/20">
            {/* Email Input with Floating Label */}
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

            {/* Password Input with Floating Label */}
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

            {/* Forgot Password */}
            <TouchableOpacity 
              className="mb-6"
              onPress={() => console.log('Forgot password pressed')}
            >
              <Text className="text-[#0956B5] text-sm font-semibold text-right">Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button with Gradient */}
            {/* <TouchableOpacity 
              className="rounded- mb-6 shadow-lg active:opacity-90"
              onPress={() => navigation.navigate('Main')}
            >
              <LinearGradient
                colors={['#0956B5', '#0956B5', '#0956B5']}
                className=" py-4"
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                
              >
                <Text className="text-white text-center font-bold text-base">Sign In</Text>
              </LinearGradient>
            </TouchableOpacity> */}
            <TouchableOpacity 
  className="mb-6  active:opacity-90"
  onPress={() => navigation.navigate('Main')}
>
  <LinearGradient
    colors={['#0956B5', '#0956B5', '#0956B5']}
    className="py-4"
    style={{ borderRadius: 16 }} // Equivalent to rounded-xl (adjust value as needed)
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

            {/* Google Sign In Button with Image */}
            <TouchableOpacity 
              className="flex-row items-center justify-center bg-white border border-gray-200 rounded-xl py-4 px-6 mb-6  active:opacity-90"
              onPress={() => console.log('Google Sign In pressed')}
            >
              <Image
                source={GoogleLogo}
                className="w-6 h-6 mr-3"
                resizeMode="contain"
              />
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