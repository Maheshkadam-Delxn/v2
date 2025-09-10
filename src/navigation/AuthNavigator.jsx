// src/navigation/AuthNavigator.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../auth/SignInScreen';
import SignUpScreen from '../auth/SignUpScreen';
import OTPScreen from '../auth/OTPScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="OTP" component={OTPScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;