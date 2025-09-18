// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StatusBar, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import SkyStructLogo from '../../assets/SkystructLogo.png';

// export default function ForgotPasswordScreen() {
//   const navigation = useNavigation();
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [otpFocused, setOtpFocused] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

 
// const [enotp,setenotp]=useState();


//   const handleGenerateOTP = async () => {
//      console.log(email)
//   if (email.trim()) {
//     setIsLoading(true);
//     try {
//       const response = await fetch('https://api-v2-skystruct.prudenttec.com/member/generate-otp', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
       
//         body: JSON.stringify({
//           memberFormBean: {
//             emailId: email,
//             otpType: 'FORGOT_OTP'
//           }
//         }),
//       });
//  const data = await response.json();
//  console.log(data);
//       if (data.status) {
//        enotp(data.otp)
//         setOtpSent(true);
//         console.log('OTP sent:', data);
//       } else {
//         const errorData = await response.json();
//         console.error('Error sending OTP:', errorData);
//       }
//     } catch (error) {
//       console.error('Network error:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   } else {
//     console.log('Please enter a valid email address');
//   }
// };
// const handleSubmitOTP = async () => {
//   if (otp.trim()) {
//     try {
//       const response = await fetch("https://api-v2-skystruct.prudenttec.com/member/forgot-password", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           memberFormBean: {
//             emailId: email,          // <-- from your state/props
//             otp: otp.trim(),         // <-- from input
//             encryptedOTP: enotp, // <-- replace with actual encrypted OTP if dynamic
//           },
//         }),
//       });

//       if (response.status) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("OTP verification response:", data);

//       // ✅ Navigate after success
     
//     } catch (err) {
//       console.error("Error verifying OTP:", err);
//     }
//   } else {
//     console.log("Please enter the OTP");
//   }
// };

//   // const handleSubmitOTP = () => {
//   //   if (otp.trim()) {

//   //     // Navigate to create new password screen or handle OTP verification
//   //     // navigation.navigate('OTP', { email: email, otp: otp, type: 'forgot-password' });
//   //   } else {
//   //     console.log('Please enter the OTP');
//   //   }
//   // };

//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
//       <LinearGradient
//         colors={['#1e40af', '#3b82f6', '#60a5fa']}
//         className="flex-1"
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <View className="flex-1 px-6 py-8">
//           {/* Back Button */}
//           <View className="flex-row items-center mt-8 mb-6">
//             <TouchableOpacity 
//               className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-4"
//               onPress={() => navigation.goBack()}
//             >
//               <Ionicons name="arrow-back" size={20} color="white" />
//             </TouchableOpacity>
//             <Text className="text-white text-lg font-semibold">Forgot Password</Text>
//           </View>

//           {/* Content Container */}
//           <View className="flex-1 justify-center">
//             {/* Logo Section */}
//             <View className="items-center mb-10">
//               <View className="mb-6">
//                 <View className="w-20 h-20 bg-white/90 backdrop-blur-lg rounded-xl items-center justify-center border border-white/60">
//                   <Image
//                     source={SkyStructLogo}
//                     className="h-16 w-16"
//                     resizeMode="cover"
//                   />
//                 </View>
//               </View>
//               <Text className="text-white text-2xl font-bold mb-2">Reset Password</Text>
//               <Text className="text-white/80 text-center text-base leading-6 px-6">
//                 Enter your email address and we'll send you a verification code to reset your password
//               </Text>
//             </View>

//             {/* Main Content Card */}
//             <View className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
//               {/* Email Input with Floating Label */}
//               <View className="mb-6">
//                 <View className="relative">
//                   <TextInput
//                     className={`border rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
//                       emailFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
//                     }`}
//                     placeholder=""
//                     value={email}
//                     onChangeText={setEmail}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     onFocus={() => setEmailFocused(true)}
//                     onBlur={() => setEmailFocused(false)}
//                     editable={!otpSent}
//                   />
//                   <Text className={`absolute left-4 transition-all duration-200 ${
//                     emailFocused || email ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
//                   }`}>
//                     Email Address
//                   </Text>
//                   <View className="absolute right-4 top-5">
//                     {otpSent ? (
//                       <Ionicons name="checkmark-circle" size={20} color="#10b981" />
//                     ) : (
//                       <Ionicons 
//                         name="mail-outline" 
//                         size={20} 
//                         color={emailFocused ? '#3b82f6' : '#90a1b9'} 
//                       />
//                     )}
//                   </View>
//                 </View>
//               </View>

//               {/* Success Message */}
//               {otpSent && (
//                 <View className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
//                   <View className="flex-row items-center">
//                     <Ionicons name="checkmark-circle" size={16} color="#10b981" />
//                     <Text className="text-green-700 text-sm font-medium ml-2">
//                       OTP sent successfully to {email}
//                     </Text>
//                   </View>
//                 </View>
//               )}

//               {/* OTP Input (shown after email is verified) */}
//               {otpSent && (
//                 <View className="mb-6">
//                   <View className="relative">
//                     <TextInput
//                       className={`border rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium text-center tracking-widest ${
//                         otpFocused ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 bg-gray-50'
//                       }`}
//                       placeholder=""
//                       value={otp}
//                       onChangeText={setOtp}
//                       keyboardType="numeric"
//                       maxLength={6}
//                       onFocus={() => setOtpFocused(true)}
//                       onBlur={() => setOtpFocused(false)}
//                     />
//                     <Text className={`absolute left-4 transition-all duration-200 ${
//                       otpFocused || otp ? 'top-2 text-xs text-blue-600 font-semibold' : 'top-5 text-base text-slate-400'
//                     }`}>
//                       Enter 6-digit OTP
//                     </Text>
//                     <View className="absolute right-4 top-5">
//                       <Ionicons 
//                         name="key-outline" 
//                         size={20} 
//                         color={otpFocused ? '#3b82f6' : '#90a1b9'} 
//                       />
//                     </View>
//                   </View>
                  
//                   {/* Resend OTP */}
//                   <View className="flex-row justify-center mt-3">
//                     <Text className="text-gray-600 text-sm">Didn't receive OTP? </Text>
//                     <TouchableOpacity onPress={handleGenerateOTP}>
//                       <Text className="text-blue-600 text-sm font-semibold">Resend</Text>
//                     </TouchableOpacity>
//                   </View>
//                 </View>
//               )}

//               {/* Generate/Submit OTP Button */}
//               <TouchableOpacity 
//                 className="mb-6 active:opacity-90"
//                 onPress={otpSent ? handleSubmitOTP : handleGenerateOTP}
//                 disabled={isLoading}
//               >
//                 <LinearGradient
//                   colors={isLoading ? ['#9ca3af', '#9ca3af', '#9ca3af'] : ['#0956B5', '#0956B5', '#0956B5']}
//                   className="py-4"
//                   style={{ borderRadius: 16 }}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                 >
//                   <View className="flex-row items-center justify-center">
//                     {isLoading && (
//                       <View className="mr-2">
//                         <Ionicons name="refresh" size={18} color="white" />
//                       </View>
//                     )}
//                     <Text className="text-white text-center font-bold text-base">
//                       {isLoading ? 'Sending OTP...' : otpSent ? 'Submit OTP' : 'Generate OTP'}
//                     </Text>
//                   </View>
//                 </LinearGradient>
//               </TouchableOpacity>

//               {/* Back to Sign In */}
//               <View className="flex-row justify-center">
//                 <Text className="text-gray-600 text-sm">Remember your password? </Text>
//                 <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
//                   <Text className="text-blue-600 text-sm font-semibold">Sign In</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>

//             {/* Help Section */}
//             <View className="mt-8 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
//               <View className="flex-row items-center mb-2">
//                 <Ionicons name="information-circle-outline" size={20} color="white" />
//                 <Text className="text-white font-semibold text-sm ml-2">Need Help?</Text>
//               </View>
//               <Text className="text-white/80 text-xs leading-5">
//                 {otpSent 
//                   ? 'Enter the 6-digit code sent to your email. Code expires in 10 minutes.'
//                   : 'If you don\'t receive the OTP within 5 minutes, please check your spam folder or contact support.'
//                 }
//               </Text>
//             </View>
//           </View>
//         </View>
//       </LinearGradient>
//     </>
//   );
// }

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import SkyStructLogo from "../../assets/SkystructLogo.png";

export default function ForgotPasswordScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [otpFocused, setOtpFocused] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enotp, setEnotp] = useState(""); // encrypted OTP from API

  // 🔹 Generate OTP
  const handleGenerateOTP = async () => {
    if (email.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api-v2-skystruct.prudenttec.com/member/generate-otp",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              memberFormBean: {
                emailId: email,
                otpType: "FORGOT_OTP",
              },
            }),
          }
        );

        const data = await response.json();
        console.log("Generate OTP response:", data);

        if (data.status) {
          setEnotp(data.otp); // ✅ Save encrypted OTP
          setOtpSent(true);
          console.log("OTP sent successfully:", data.otp);
        } else {
          console.error("Error generating OTP:", data);
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Please enter a valid email address");
    }
  };

  // 🔹 Submit OTP
  const handleSubmitOTP = async () => {
    if (otp.trim()) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api-v2-skystruct.prudenttec.com/member/forgot-password",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              memberFormBean: {
                emailId: email,
                otp: otp.trim(),
                encryptedOTP: enotp,
              },
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("OTP verification response:", data);

        if (data.status) {
          // ✅ Navigate to CreateNewPassword screen
           navigation.navigate("SignIn");
        } else {
          console.error("Invalid OTP:", data);
        }
      } catch (err) {
        console.error("Error verifying OTP:", err);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Please enter the OTP");
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      <LinearGradient
        colors={["#1e40af", "#3b82f6", "#60a5fa"]}
        className="flex-1"
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View className="flex-1 px-6 py-8">
          {/* Back Button */}
          <View className="flex-row items-center mt-8 mb-6">
            <TouchableOpacity
              className="w-10 h-10 bg-white/20 rounded-full items-center justify-center mr-4"
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={20} color="white" />
            </TouchableOpacity>
            <Text className="text-white text-lg font-semibold">
              Forgot Password
            </Text>
          </View>

          {/* Content */}
          <View className="flex-1 justify-center">
            {/* Logo */}
            <View className="items-center mb-10">
              <View className="mb-6">
                <View className="w-20 h-20 bg-white/90 rounded-xl items-center justify-center border border-white/60">
                  <Image
                    source={SkyStructLogo}
                    className="h-16 w-16"
                    resizeMode="cover"
                  />
                </View>
              </View>
              <Text className="text-white text-2xl font-bold mb-2">
                Reset Password
              </Text>
              <Text className="text-white/80 text-center text-base leading-6 px-6">
                Enter your email address and we'll send you a verification code
                to reset your password
              </Text>
            </View>

            {/* Main Card */}
            <View className="bg-white/95 rounded-3xl p-6 border border-white/20">
              {/* Email */}
              <View className="mb-6">
                <View className="relative">
                  <TextInput
                    className={`border rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium ${
                      emailFocused
                        ? "border-blue-500 bg-blue-50/50"
                        : "border-gray-200 bg-gray-50"
                    }`}
                    placeholder=""
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                    editable={!otpSent}
                  />
                  <Text
                    className={`absolute left-4 transition-all duration-200 ${
                      emailFocused || email
                        ? "top-2 text-xs text-blue-600 font-semibold"
                        : "top-5 text-base text-slate-400"
                    }`}
                  >
                    Email Address
                  </Text>
                  <View className="absolute right-4 top-5">
                    {otpSent ? (
                      <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                    ) : (
                      <Ionicons
                        name="mail-outline"
                        size={20}
                        color={emailFocused ? "#3b82f6" : "#90a1b9"}
                      />
                    )}
                  </View>
                </View>
              </View>

              {/* OTP Sent Message */}
              {otpSent && (
                <View className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
                  <View className="flex-row items-center">
                    <Ionicons name="checkmark-circle" size={16} color="#10b981" />
                    <Text className="text-green-700 text-sm font-medium ml-2">
                      OTP sent successfully to {email}
                    </Text>
                  </View>
                </View>
              )}

              {/* OTP Input */}
              {otpSent && (
                <View className="mb-6">
                  <View className="relative">
                    <TextInput
                      className={`border rounded-xl px-4 pt-6 pb-4 text-gray-800 font-medium text-center tracking-widest ${
                        otpFocused
                          ? "border-blue-500 bg-blue-50/50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                      placeholder=""
                      value={otp}
                      onChangeText={setOtp}
                      keyboardType="numeric"
                      maxLength={6}
                      onFocus={() => setOtpFocused(true)}
                      onBlur={() => setOtpFocused(false)}
                    />
                    <Text
                      className={`absolute left-4 transition-all duration-200 ${
                        otpFocused || otp
                          ? "top-2 text-xs text-blue-600 font-semibold"
                          : "top-5 text-base text-slate-400"
                      }`}
                    >
                      Enter 6-digit OTP
                    </Text>
                    <View className="absolute right-4 top-5">
                      <Ionicons
                        name="key-outline"
                        size={20}
                        color={otpFocused ? "#3b82f6" : "#90a1b9"}
                      />
                    </View>
                  </View>

                  {/* Resend OTP */}
                  <View className="flex-row justify-center mt-3">
                    <Text className="text-gray-600 text-sm">
                      Didn't receive OTP?{" "}
                    </Text>
                    <TouchableOpacity onPress={handleGenerateOTP}>
                      <Text className="text-blue-600 text-sm font-semibold">
                        Resend
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}

              {/* Action Button */}
              <TouchableOpacity
                className="mb-6 active:opacity-90"
                onPress={otpSent ? handleSubmitOTP : handleGenerateOTP}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={
                    isLoading
                      ? ["#9ca3af", "#9ca3af", "#9ca3af"]
                      : ["#0956B5", "#0956B5", "#0956B5"]
                  }
                  className="py-4"
                  style={{ borderRadius: 16 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View className="flex-row items-center justify-center">
                    {isLoading && (
                      <View className="mr-2">
                        <Ionicons name="refresh" size={18} color="white" />
                      </View>
                    )}
                    <Text className="text-white text-center font-bold text-base">
                      {isLoading
                        ? "Please wait..."
                        : otpSent
                        ? "Submit OTP"
                        : "Generate OTP"}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>

              {/* Back to Sign In */}
              <View className="flex-row justify-center">
                <Text className="text-gray-600 text-sm">
                  Remember your password?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text className="text-blue-600 text-sm font-semibold">
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
}
