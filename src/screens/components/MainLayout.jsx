import React, { useState, useRef } from 'react';
import { View, StatusBar, TouchableOpacity, Animated, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Sidebar from './Sidebar';

export default function MainLayout({ children, title }) {
  const navigation = useNavigation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarAnim = useRef(new Animated.Value(-256)).current; // Sidebar width: 256px

  const toggleSidebar = () => {
    Animated.timing(sidebarAnim, {
      toValue: isSidebarOpen ? -256 : 0, // Slide in (0) or out (-256)
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <View className="flex-1 bg-gray-50 pt-8">
        {/* Sidebar with Animation */}
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            width: 256, // Matches w-64 in Sidebar
            transform: [{ translateX: sidebarAnim }],
            zIndex: 10,
          }}
        >
          <View className="flex-1 bg-blue-900 mt-8">
            {/* Cross Icon to Close Sidebar */}
            {isSidebarOpen && (
              <TouchableOpacity
                className="absolute top-4 right-4 z-20"
                onPress={toggleSidebar}
              >
                <Feather name="x" size={24} color="#ffffff" />
              </TouchableOpacity>
            )}
            <Sidebar />
          </View>
        </Animated.View>

        {/* Main Content */}
        <View className="flex-1">
          {/* Header */}
          <View className="bg-white px-6 py-4 flex-row justify-between items-center shadow-sm">
            <View className="flex-row items-center">
              {/* Hamburger Icon (shown when sidebar is closed) */}
              {!isSidebarOpen && (
                <TouchableOpacity
                  className="mr-4"
                  onPress={toggleSidebar}
                >
                  <Feather name="menu" size={24} color="#2563eb" />
                </TouchableOpacity>
              )}
              <Text className="text-xl font-bold text-gray-800">{title}</Text>
            </View>
            <TouchableOpacity
              className="w-10 h-10 rounded-full bg-blue-100 items-center justify-center"
              onPress={() => navigation.navigate('Profile')}
            >
              <Feather name="user" size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>

          {/* Screen Content */}
          {children}
        </View>
      </View>
    </>
  );
}