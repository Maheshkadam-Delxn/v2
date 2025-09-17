// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StatusBar,
//   Image,
//   ScrollView,
//   Modal,                 // ← new
//   Pressable,             // ← new
//   FlatList,              // ← new
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Ionicons } from '@expo/vector-icons';
// import SkyStructLogo from '../../assets/SkystructLogo.png';

// export default function SignUpScreen() {
//   const navigation = useNavigation();

//   /* ---------- form fields ---------- */
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);

//   /* ---------- focus flags ---------- */
//   const [fullNameFocused, setFullNameFocused] = useState(false);
//   const [emailFocused, setEmailFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);
//   const [phoneFocused, setPhoneFocused] = useState(false);

//   /* ---------- country list ---------- */
//   const [countries, setCountries] = useState([
   
//   ]);

//   /* ---------- modal visibility ---------- */
//   const [showCountryModal, setShowCountryModal] = useState(false);

//   /* ---------- fetch real list ---------- */
//   useEffect(() => {
//     fetch('https://api-v2-skystruct.prudenttec.com/member/time-offset-list')
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.timeZoneMasterBeans?.length) setCountries(data.timeZoneMasterBeans);
//       })
//       .catch(() => {/* keep defaults */});
//   }, []);
// const handledata=async()=>{
//       const url = 'https://api-v2-skystruct.prudenttec.com/member/generate-otp';
//        const body = {
//       memberFormBean: {
//         name: fullName,
//         emailId: email,
//         mobileNumber: phoneNumber,
//         zoneId: selectedCountry.countryId,
//         password: password,
//         otpType: "SIGNUP_OTP"
//       }
//     };

//   try{
//     const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//       });

//       const data = await response.json();

//       if (response.ok) {
       
//         console.log('Response:', data);
//       } else {
       
//         console.error('Error:', data);
//       }



//   }catch(err){
//     console.log("Internal server error",err)
//   }

  
// }
//   /* ---------- render ---------- */
//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
//       <LinearGradient
//         colors={['#1e40af', '#3b82f6', '#60a5fa']}
//         style={{ flex: 1 }}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//           <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 32, justifyContent: 'center' }}>
//             {/* --------------- logo --------------- */}
//             <View style={{ alignItems: 'center', marginBottom: 40 }}>
//               <View
//                 style={{
//                   width: 96,
//                   height: 96,
//                   backgroundColor: 'rgba(255,255,255,0.95)',
//                   borderRadius: 16,
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   borderWidth: 1,
//                   borderColor: 'rgba(255,255,255,0.6)',
//                 }}
//               >
//                 <Image source={SkyStructLogo} style={{ width: 80, height: 80 }} resizeMode="contain" />
//               </View>
//               <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 8 }}>SKYSTRUCT</Text>
//               <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, textAlign: 'center', marginTop: 4 }}>
//                 Create Your Account
//               </Text>
//             </View>

//             {/* --------------- card --------------- */}
//             <View
//               style={{
//                 backgroundColor: 'rgba(255,255,255,0.95)',
//                 borderRadius: 24,
//                 padding: 24,
//                 borderWidth: 1,
//                 borderColor: 'rgba(255,255,255,0.2)',
//               }}
//             >
//               {/* ---- full name ---- */}
//               <View style={{ marginBottom: 20 }}>
//                 <View>
//                   <TextInput
//                     style={{
//                       borderWidth: 1,
//                       borderColor: fullNameFocused ? '#3b82f6' : '#e5e7eb',
//                       backgroundColor: fullNameFocused ? 'rgba(59,130,246,0.05)' : '#f9fafb',
//                       borderRadius: 12,
//                       paddingHorizontal: 16,
//                       paddingTop: 24,
//                       paddingBottom: 12,
//                       fontSize: 14,
//                       color: '#111827',
//                     }}
//                     placeholder=""
//                     value={fullName}
//                     onChangeText={setFullName}
//                     onFocus={() => setFullNameFocused(true)}
//                     onBlur={() => setFullNameFocused(false)}
//                   />
//                   <Text
//                     style={{
//                       position: 'absolute',
//                       left: 16,
//                       top: fullName || fullNameFocused ? 6 : 16,
//                       fontSize: fullName || fullNameFocused ? 11 : 14,
//                       color: fullNameFocused ? '#3b82f6' : '#9ca3af',
//                     }}
//                   >
//                     Full Name
//                   </Text>
//                   <Ionicons
//                     name="person-outline"
//                     size={20}
//                     color={fullNameFocused ? '#3b82f6' : '#9ca3af'}
//                     style={{ position: 'absolute', right: 16, top: 18 }}
//                   />
//                 </View>
//               </View>

//               {/* ---- email ---- */}
//               <View style={{ marginBottom: 20 }}>
//                 <View>
//                   <TextInput
//                     style={{
//                       borderWidth: 1,
//                       borderColor: emailFocused ? '#3b82f6' : '#e5e7eb',
//                       backgroundColor: emailFocused ? 'rgba(59,130,246,0.05)' : '#f9fafb',
//                       borderRadius: 12,
//                       paddingHorizontal: 16,
//                       paddingTop: 24,
//                       paddingBottom: 12,
//                       fontSize: 14,
//                       color: '#111827',
//                     }}
//                     placeholder=""
//                     value={email}
//                     onChangeText={setEmail}
//                     keyboardType="email-address"
//                     autoCapitalize="none"
//                     onFocus={() => setEmailFocused(true)}
//                     onBlur={() => setEmailFocused(false)}
//                   />
//                   <Text
//                     style={{
//                       position: 'absolute',
//                       left: 16,
//                       top: email || emailFocused ? 6 : 16,
//                       fontSize: email || emailFocused ? 11 : 14,
//                       color: emailFocused ? '#3b82f6' : '#9ca3af',
//                     }}
//                   >
//                     Email Address
//                   </Text>
//                   <Ionicons
//                     name="mail-outline"
//                     size={20}
//                     color={emailFocused ? '#3b82f6' : '#9ca3af'}
//                     style={{ position: 'absolute', right: 16, top: 18 }}
//                   />
//                 </View>
//               </View>

//               {/* ---- password ---- */}
//               <View style={{ marginBottom: 20 }}>
//                 <View>
//                   <TextInput
//                     style={{
//                       borderWidth: 1,
//                       borderColor: passwordFocused ? '#3b82f6' : '#e5e7eb',
//                       backgroundColor: passwordFocused ? 'rgba(59,130,246,0.05)' : '#f9fafb',
//                       borderRadius: 12,
//                       paddingHorizontal: 16,
//                       paddingTop: 24,
//                       paddingBottom: 12,
//                       paddingRight: 50,
//                       fontSize: 14,
//                       color: '#111827',
//                     }}
//                     placeholder=""
//                     value={password}
//                     onChangeText={setPassword}
//                     secureTextEntry={!showPassword}
//                     onFocus={() => setPasswordFocused(true)}
//                     onBlur={() => setPasswordFocused(false)}
//                   />
//                   <Text
//                     style={{
//                       position: 'absolute',
//                       left: 16,
//                       top: password || passwordFocused ? 6 : 16,
//                       fontSize: password || passwordFocused ? 11 : 14,
//                       color: passwordFocused ? '#3b82f6' : '#9ca3af',
//                     }}
//                   >
//                     Password
//                   </Text>
//                   <TouchableOpacity
//                     style={{ position: 'absolute', right: 16, top: 18 }}
//                     onPress={() => setShowPassword((v) => !v)}
//                   >
//                     <Ionicons
//                       name={showPassword ? 'eye-off-outline' : 'eye-outline'}
//                       size={20}
//                       color="#9ca3af"
//                     />
//                   </TouchableOpacity>
//                 </View>
//               </View>

//               {/* ---- phone ---- */}
//               <View style={{ marginBottom: 20 }}>
//                 <View>
//                   <TextInput
//                     style={{
//                       borderWidth: 1,
//                       borderColor: phoneFocused ? '#3b82f6' : '#e5e7eb',
//                       backgroundColor: phoneFocused ? 'rgba(59,130,246,0.05)' : '#f9fafb',
//                       borderRadius: 12,
//                       paddingHorizontal: 16,
//                       paddingTop: 24,
//                       paddingBottom: 12,
//                       fontSize: 14,
//                       color: '#111827',
//                     }}
//                     placeholder=""
//                     value={phoneNumber}
//                     onChangeText={setPhoneNumber}
//                     keyboardType="phone-pad"
//                     onFocus={() => setPhoneFocused(true)}
//                     onBlur={() => setPhoneFocused(false)}
//                   />
//                   <Text
//                     style={{
//                       position: 'absolute',
//                       left: 16,
//                       top: phoneNumber || phoneFocused ? 6 : 16,
//                       fontSize: phoneNumber || phoneFocused ? 11 : 14,
//                       color: phoneFocused ? '#3b82f6' : '#9ca3af',
//                     }}
//                   >
//                     Phone Number
//                   </Text>
//                   <Ionicons
//                     name="call-outline"
//                     size={20}
//                     color={phoneFocused ? '#3b82f6' : '#9ca3af'}
//                     style={{ position: 'absolute', right: 16, top: 18 }}
//                   />
//                 </View>
//               </View>

//               {/* ---- country trigger ---- */}
//               <View style={{ marginBottom: 24 }}>
//                 <TouchableOpacity
//                   style={{
//                     borderWidth: 1,
//                     borderColor: '#e5e7eb',
//                     backgroundColor: '#f9fafb',
//                     borderRadius: 12,
//                     paddingHorizontal: 16,
//                     paddingTop: 24,
//                     paddingBottom: 12,
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                   }}
//                   onPress={() => setShowCountryModal(true)}
//                 >
//                   <Text style={{ fontSize: 14, color: selectedCountry ? '#111827' : '#9ca3af' }}>
//                     {selectedCountry
//                       ? `${selectedCountry.territory} (${selectedCountry.utcTimeOffset})`
//                       : 'Select Country'}
//                   </Text>
//                   <Ionicons name="chevron-down-outline" size={20} color="#9ca3af" />
//                 </TouchableOpacity>
//               </View>

//               {/* ---- create account button ---- */}
//               <TouchableOpacity
//                 style={{ marginBottom: 24 }}
//                  onPress={() => {
//     if (fullName && email && password && phoneNumber && selectedCountry) {
//       const zoneId=selectedCountry.countryId;
//       console.log({
//         fullName,
//         email,
//         password,
//         phoneNumber,
//         zoneId
//       });
//       handledata();
//       // navigation.navigate('OTP'); // or perform other actions
//     } else {
//       console.log('Please fill all fields');
//       alert('Please fill all fields');
//     }
//   }}
//                 // onPress={() => navigation.navigate('OTP')}
//               >
//                 <LinearGradient
//                   colors={['#0956B5', '#0956B5', '#0956B5']}
//                   style={{ paddingVertical: 14, borderRadius: 16 }}
//                   start={{ x: 0, y: 0 }}
//                   end={{ x: 1, y: 0 }}
//                 >
//                   <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Create Account</Text>
//                 </LinearGradient>
//               </TouchableOpacity>

//               {/* ---- footer links ---- */}
//               <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
//                 <Text style={{ color: '#4b5563', fontSize: 12 }}>Already have an account? </Text>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                   <Text style={{ color: '#2563eb', fontSize: 12, fontWeight: '600' }}>Sign In</Text>
//                 </TouchableOpacity>
//               </View>
//               <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
//                 <Text style={{ color: '#6b7280', fontSize: 10 }}>By creating an account, you agree to our </Text>
//                 <TouchableOpacity>
//                   <Text style={{ color: '#2563eb', fontSize: 10, textDecorationLine: 'underline' }}>Privacy Policy</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </LinearGradient>

//       {/* --------------- country picker modal --------------- */}
//       <Modal
//         visible={showCountryModal}
//         transparent
//         animationType="slide"
//         onRequestClose={() => setShowCountryModal(false)}
//       >
//         <Pressable style={{ flex: 1 }} onPress={() => setShowCountryModal(false)}>
//           <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
//             <Pressable>
//               <View style={{ maxHeight: 350, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
//                 <View style={{ paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderColor: '#e5e7eb' }}>
//                   <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center' }}>Select Country</Text>
//                 </View>
//                 <FlatList
//                   data={countries}
//                   keyExtractor={(item) => item.autoId}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
//                       style={{ paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderColor: '#f3f4f6' }}
//                       onPress={() => {
//                         setSelectedCountry(item);
//                         setShowCountryModal(false);
//                       }}
//                     >
//                       <Text style={{ fontSize: 14, color: '#111827' }}>
//                         {item.territory} ({item.utcTimeOffset})
//                       </Text>
//                     </TouchableOpacity>
//                   )}
//                 />
//               </View>
//             </Pressable>
//           </View>
//         </Pressable>
//       </Modal>
//     </>
//   );
// }


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import SkyStructLogo from '../../assets/SkystructLogo.png';

export default function SignUpScreen() {
  const navigation = useNavigation();

  /* ---------- form fields ---------- */
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const[otp,setOTP]=useState();

  /* ---------- focus flags ---------- */
  const [fullNameFocused, setFullNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);

  /* ---------- country list ---------- */
  const [countries, setCountries] = useState([]);

  /* ---------- modal visibility ---------- */
  const [showCountryModal, setShowCountryModal] = useState(false);

  /* ---------- fetch real list ---------- */
  useEffect(() => {
    fetch('https://api-v2-skystruct.prudenttec.com/member/time-offset-list')
      .then((res) => res.json())
      .then((data) => {
        if (data.timeZoneMasterBeans?.length) setCountries(data.timeZoneMasterBeans);
      })
      .catch(() => {/* keep defaults */});
  }, []);

  /* ---------- handle API call and navigation ---------- */
  const handleData = async () => {
    if (!fullName || !email || !password || !phoneNumber || !selectedCountry) {
      alert('Please fill all fields');
      return;
    }

    const url = 'https://api-v2-skystruct.prudenttec.com/member/generate-otp';
    const body = {
      memberFormBean: {
        name: fullName,
        emailId: email,
        mobileNumber: phoneNumber,
        zoneId: selectedCountry.countryId,
        password: password,
        otpType: "SIGNUP_OTP"
      }
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await response.json();
    

      if (response.ok) {
        console.log('Response:', data);
        // Navigate to OTP screen and pass form data
        navigation.navigate('OTP', {
          formData: {
            name: fullName,
            emailId: email,
            mobileNumber: phoneNumber,
            zoneId: selectedCountry.countryId,
            password: password,
            encryptedOTP:data.otp
          }
        });
      } else {
        console.error('Error:', data);
        alert('Failed to generate OTP. Please try again.');
      }
    } catch (err) {
      console.error("Internal server error", err);
      alert('Internal server error. Please try again later.');
    }
  };

  /* ---------- render ---------- */
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#1e40af" />
      <LinearGradient
        colors={['#1e40af', '#3b82f6', '#60a5fa']}
        style={{ flex: 1 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ flex: 1, paddingHorizontal: 24, paddingVertical: 32, justifyContent: 'center' }}>
            {/* --------------- logo --------------- */}
            <View style={{ alignItems: 'center', marginBottom: 40 }}>
              <View
                style={{
                  width: 96,
                  height: 96,
                  backgroundColor: 'rgba(255,255,255,0.95)',
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255,255,255,0.6)',
                }}
              >
                <Image source={SkyStructLogo} style={{ width: 80, height: 80 }} resizeMode="contain" />
              </View>
              <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 8 }}>SKYSTRUCT</Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14, textAlign: 'center', marginTop: 4 }}>
                Create Your Account
              </Text>
            </View>

            {/* --------------- card --------------- */}
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderRadius: 24,
                padding: 24,
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.2)',
              }}
            >
              {/* ---- full name ---- */}
              <View style={{ marginBottom: 20 }}>
                <View>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: fullNameFocused ? '#3b82f6' : '#e5e7eb',
                      backgroundColor: fullNameFocused ? 'rgba(59,130,246,0.05)' : '#f9fafb',
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingTop: 24,
                      paddingBottom: 12,
                      fontSize: 14,
                      color: '#111827',
                    }}
                    placeholder=""
                    value={fullName}
                    onChangeText={setFullName}
                    onFocus={() => setFullNameFocused(true)}
                    onBlur={() => setFullNameFocused(false)}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      left: 16,
                      top: fullName || fullNameFocused ? 6 : 16,
                      fontSize: fullName || fullNameFocused ? 11 : 14,
                      color: fullNameFocused ? '#3b82f6' : '#9ca3af',
                    }}
                  >
                    Full Name
                  </Text>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={fullNameFocused ? '#3b82f6' : '#9ca3af'}
                    style={{ position: 'absolute', right: 16, top: 18 }}
                  />
                </View>
              </View>

              {/* ---- email ---- */}
              <View style={{ marginBottom: 20 }}>
                <View>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: emailFocused ? '#3b82f6' : '#e5e7eb',
                      backgroundColor: emailFocused ? 'rgba(59,130,246,0.05)' : '#f9fafb',
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingTop: 24,
                      paddingBottom: 12,
                      fontSize: 14,
                      color: '#111827',
                    }}
                    placeholder=""
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onFocus={() => setEmailFocused(true)}
                    onBlur={() => setEmailFocused(false)}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      left: 16,
                      top: email || emailFocused ? 6 : 16,
                      fontSize: email || emailFocused ? 11 : 14,
                      color: emailFocused ? '#3b82f6' : '#9ca3af',
                    }}
                  >
                    Email Address
                  </Text>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color={emailFocused ? '#3b82f6' : '#9ca3af'}
                    style={{ position: 'absolute', right: 16, top: 18 }}
                  />
                </View>
              </View>

              {/* ---- password ---- */}
              <View style={{ marginBottom: 20 }}>
                <View>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: passwordFocused ? '#3b82f6' : '#e5e7eb',
                      backgroundColor: passwordFocused ? 'rgba(59,130,246,0.05)' : '#f9fafb',
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingTop: 24,
                      paddingBottom: 12,
                      paddingRight: 50,
                      fontSize: 14,
                      color: '#111827',
                    }}
                    placeholder=""
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      left: 16,
                      top: password || passwordFocused ? 6 : 16,
                      fontSize: password || passwordFocused ? 11 : 14,
                      color: passwordFocused ? '#3b82f6' : '#9ca3af',
                    }}
                  >
                    Password
                  </Text>
                  <TouchableOpacity
                    style={{ position: 'absolute', right: 16, top: 18 }}
                    onPress={() => setShowPassword((v) => !v)}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color="#9ca3af"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* ---- phone ---- */}
              <View style={{ marginBottom: 20 }}>
                <View>
                  <TextInput
                    style={{
                      borderWidth: 1,
                      borderColor: phoneFocused ? '#3b82f6' : '#e5e7eb',
                      backgroundColor: phoneFocused ? 'rgba(59,130,246,0.05)' : '#f9fafb',
                      borderRadius: 12,
                      paddingHorizontal: 16,
                      paddingTop: 24,
                      paddingBottom: 12,
                      fontSize: 14,
                      color: '#111827',
                    }}
                    placeholder=""
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    onFocus={() => setPhoneFocused(true)}
                    onBlur={() => setPhoneFocused(false)}
                  />
                  <Text
                    style={{
                      position: 'absolute',
                      left: 16,
                      top: phoneNumber || phoneFocused ? 6 : 16,
                      fontSize: phoneNumber || phoneFocused ? 11 : 14,
                      color: phoneFocused ? '#3b82f6' : '#9ca3af',
                    }}
                  >
                    Phone Number
                  </Text>
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color={phoneFocused ? '#3b82f6' : '#9ca3af'}
                    style={{ position: 'absolute', right: 16, top: 18 }}
                  />
                </View>
              </View>

              {/* ---- country trigger ---- */}
              <View style={{ marginBottom: 24 }}>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    backgroundColor: '#f9fafb',
                    borderRadius: 12,
                    paddingHorizontal: 16,
                    paddingTop: 24,
                    paddingBottom: 12,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onPress={() => setShowCountryModal(true)}
                >
                  <Text style={{ fontSize: 14, color: selectedCountry ? '#111827' : '#9ca3af' }}>
                    {selectedCountry
                      ? `${selectedCountry.territory} (${selectedCountry.utcTimeOffset})`
                      : 'Select Country'}
                  </Text>
                  <Ionicons name="chevron-down-outline" size={20} color="#9ca3af" />
                </TouchableOpacity>
              </View>

              {/* ---- create account button ---- */}
              <TouchableOpacity
                style={{ marginBottom: 24 }}
                onPress={handleData}
              >
                <LinearGradient
                  colors={['#0956B5', '#0956B5', '#0956B5']}
                  style={{ paddingVertical: 14, borderRadius: 16 }}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>Create Account</Text>
                </LinearGradient>
              </TouchableOpacity>

              {/* ---- footer links ---- */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 12 }}>
                <Text style={{ color: '#4b5563', fontSize: 12 }}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={{ color: '#2563eb', fontSize: 12, fontWeight: '600' }}>Sign In</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Text style={{ color: '#6b7280', fontSize: 10 }}>By creating an account, you agree to our </Text>
                <TouchableOpacity>
                  <Text style={{ color: '#2563eb', fontSize: 10, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>

      {/* --------------- country picker modal --------------- */}
      <Modal
        visible={showCountryModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowCountryModal(false)}
      >
        <Pressable style={{ flex: 1 }} onPress={() => setShowCountryModal(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' }}>
            <Pressable>
              <View style={{ maxHeight: 350, backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24 }}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 12, borderBottomWidth: 1, borderColor: '#e5e7eb' }}>
                  <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center' }}>Select Country</Text>
                </View>
                <FlatList
                  data={countries}
                  keyExtractor={(item) => item.autoId}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderColor: '#f3f4f6' }}
                      onPress={() => {
                        setSelectedCountry(item);
                        setShowCountryModal(false);
                      }}
                    >
                      <Text style={{ fontSize: 14, color: '#111827' }}>
                        {item.territory} ({item.utcTimeOffset})
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}