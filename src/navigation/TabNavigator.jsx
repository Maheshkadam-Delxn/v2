
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/dashboard/sidebar/ProfileScreen';
import SettingsScreen from '../screens/dashboard/settings/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function MyTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide header for all tabs
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: 'Construction Dashboard',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SignIn')} // Directly navigate to SignIn
              style={{ marginRight: 15 }}
            >
              <Ionicons name="log-in" size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}