
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function Sidebar() {
  const navigation = useNavigation();
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleLogout = () => {
    // TODO: Implement logout logic (e.g., clear auth token)
    navigation.navigate('SignIn');
  };

  return (
    <View className="w-64 bg-blue-900 h-full p-4 ">
      <TouchableOpacity
        onPress={() => navigation.navigate('Dashboard', { projectId: 1 })} // Default projectId
        className="mb-6"
      >
        <Text className="text-white text-xl font-bold">Project Dashboard</Text>
      </TouchableOpacity>

      {/* Profile */}
      <TouchableOpacity
        className="flex-row items-center py-3 px-2 mb-2 rounded-lg hover:bg-blue-800"
        onPress={() => navigation.navigate('Profile')}
      >
        <Feather name="user" size={20} color="#ffffff" />
        <Text className="text-white ml-3 text-base">Profile</Text>
      </TouchableOpacity>

      {/* Project Overview */}
      <TouchableOpacity
        className="flex-row items-center py-3 px-2 mb-2 rounded-lg hover:bg-blue-800"
        onPress={() => navigation.navigate('ProjectOverview')}
      >
        <Feather name="file-text" size={20} color="#ffffff" />
        <Text className="text-white ml-3 text-base">Project Overview</Text>
      </TouchableOpacity>

      {/* Organization Email */}
      <TouchableOpacity
        className="flex-row items-center py-3 px-2 mb-2 rounded-lg hover:bg-blue-800"
        onPress={() => navigation.navigate('OrganizationEmail')}
      >
        <Feather name="mail" size={20} color="#ffffff" />
        <Text className="text-white ml-3 text-base">Organization Email</Text>
      </TouchableOpacity>

      {/* Users Dropdown */}
      <TouchableOpacity
        className="flex-row items-center py-3 px-2 mb-2 rounded-lg hover:bg-blue-800"
        onPress={() => setIsUsersOpen(!isUsersOpen)}
      >
        <Feather name="users" size={20} color="#ffffff" />
        <Text className="text-white ml-3 text-base">Users</Text>
        <Feather
          name={isUsersOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#ffffff"
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>
      {isUsersOpen && (
        <View className="ml-4">
          <TouchableOpacity
            className="flex-row items-center py-2 px-2 mb-1 rounded-lg hover:bg-blue-700"
            onPress={() => navigation.navigate('UsersMembers')}
          >
            <Text className="text-white text-sm">Members</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center py-2 px-2 mb-1 rounded-lg hover:bg-blue-700"
            onPress={() => navigation.navigate('UsersVendors')}
          >
            <Text className="text-white text-sm">Vendors</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Settings Dropdown */}
      <TouchableOpacity
        className="flex-row items-center py-3 px-2 mb-2 rounded-lg hover:bg-blue-800"
        onPress={() => setIsSettingsOpen(!isSettingsOpen)}
      >
        <Feather name="settings" size={20} color="#ffffff" />
        <Text className="text-white ml-3 text-base">Settings</Text>
        <Feather
          name={isSettingsOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#ffffff"
          style={{ marginLeft: 'auto' }}
        />
      </TouchableOpacity>
      {isSettingsOpen && (
        <View className="ml-4">
          <TouchableOpacity
            className="flex-row items-center py-2 px-2 mb-1 rounded-lg hover:bg-blue-700"
            onPress={() => navigation.navigate('SettingsPermission')}
          >
            <Text className="text-white text-sm">Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center py-2 px-2 mb-1 rounded-lg hover:bg-blue-700"
            onPress={() => navigation.navigate('SettingsEvents')}
          >
            <Text className="text-white text-sm">Events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center py-2 px-2 mb-1 rounded-lg hover:bg-blue-700"
            onPress={() => navigation.navigate('SettingsReminder')}
          >
            <Text className="text-white text-sm">Reminder</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center py-2 px-2 mb-1 rounded-lg hover:bg-blue-700"
            onPress={() => navigation.navigate('SettingsSchedule')}
          >
            <Text className="text-white text-sm">Schedule</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* My Projects */}
      <TouchableOpacity
        className="flex-row items-center py-3 px-2 mb-2 rounded-lg hover:bg-blue-800"
        onPress={() => navigation.navigate('MyProjects')}
      >
        <Feather name="briefcase" size={20} color="#ffffff" />
        <Text className="text-white ml-3 text-base">My Projects</Text>
      </TouchableOpacity>

      {/* Logout */}
      <TouchableOpacity
        className="flex-row items-center py-3 px-2 mb-2 rounded-lg hover:bg-blue-800"
        onPress={handleLogout}
      >
        <Feather name="log-out" size={20} color="#ffffff" />
        <Text className="text-white ml-3 text-base">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}