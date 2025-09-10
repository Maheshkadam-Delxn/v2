import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import towerImage from '../../assets/image.jpg'; // Correct path based on folder structure

export default function HomeScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All Projects');
  const navigation = useNavigation();

  const projects = [
    {
      id: 1,
      name: 'Acura Heights Tower',
      progress: '64%',
      duration: '18 months',
      amount: '$2.5M',
      image: towerImage,
      status: 'Under Construction',
    },
    {
      id: 2,
      name: 'Commercial Residences',
      progress: '89%',
      duration: '14 months',
      amount: '$1.8M',
      image: towerImage,
      status: 'Under Construction',
    },
    {
      id: 3,
      name: 'Corporate Landmark Project',
      progress: '52%',
      duration: '24 months',
      amount: '$3.2M',
      image: towerImage,
      status: 'In Design',
    },
  ];

  const filterOptions = [
    'All Projects',
    'In Planning',
    'In Design',
    'In Tender',
    'Under Construction',
    'Completed',
    'On Hold',
    'Cancelled',
  ];

  const getProgressColor = (progress) => {
    const percentage = parseInt(progress);
    if (percentage >= 80) return '#10b981'; // Green
    if (percentage >= 60) return '#f59e0b'; // Orange
    return '#ef4444'; // Red
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <ScrollView className="flex-1 bg-gray-50" showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View className="bg-blue-100 px-6 pb-6 pt-14 shadow-sm">
          <View className="mb-6 flex-row items-center justify-between">
            <View>
              <Text className="mb-1 text-2xl font-bold text-gray-800">Project Overview</Text>
              <Text className="text-sm text-gray-500">Managing your construction projects</Text>
            </View>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-blue-100">
              <Feather name="bell" size={20} color="#2563eb" />
            </TouchableOpacity>
          </View>

          {/* Filter Tabs with Project Counts */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
            <View className="flex-row">
              {filterOptions.map((filter, index) => (
                <TouchableOpacity
                  key={filter}
                  onPress={() => setSelectedFilter(filter)}
                  className={`mr-3 flex-row items-center rounded-full px-4 py-2 ${
                    selectedFilter === filter ? 'bg-blue-600' : 'bg-gray-100'
                  }`}>
                  <Text
                    className={`font-medium ${
                      selectedFilter === filter ? 'text-white' : 'text-gray-600'
                    }`}>
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Create New Project Section */}
        <View className="mb-8 px-6 py-6">
          <View className="flex-row items-center">
            <View className="mr-2 flex-1 flex-row items-center rounded-2xl bg-gray-100 px-4 py-3">
              <Feather name="search" size={20} color="#6b7280" style={{ marginRight: 8 }} />
              <TextInput
                className="flex-1 text-base"
                placeholder="Search projects..."
                placeholderTextColor="#6b7280"
              />
            </View>
            <TouchableOpacity
              className="rounded-2xl bg-blue-600 p-3 px-4 shadow-lg active:scale-95"
              onPress={() => navigation.navigate('AddNewProject')}>
              <Feather name="plus" size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Project Detail Section */}
        <View className="px-6">
          <Text className="mb-4 text-lg font-bold text-gray-800">Project Detail</Text>

          {projects
            .filter(
              (project) => selectedFilter === 'All Projects' || project.status === selectedFilter
            )
            .map((project) => (
              <TouchableOpacity
                key={project.id}
                className="mb-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                activeOpacity={0.7}
                onPress={() => navigation.navigate('Dashboard', { projectId: project.id })}>
                <View className="flex-row">
                  {/* Project Image */}
                  <Image
                    source={project.image}
                    className="mr-4 h-20 w-20 rounded-xl"
                    resizeMode="cover"
                  />

                  {/* Project Details */}
                  <View className="flex-1">
                    <Text className="mb-1 text-lg font-bold text-gray-800">{project.name}</Text>

                    <View className="mb-2 flex-row items-center">
                      <Text className="mr-4 text-sm text-gray-500">📅 {project.duration}</Text>
                      <Text className="text-sm font-semibold text-green-600">{project.amount}</Text>
                    </View>

                    {/* Progress Bar */}
                    <View className="mb-2">
                      <View className="mb-1 flex-row items-center justify-between">
                        <Text className="text-xs text-gray-500">Progress</Text>
                        <Text
                          className="text-xs font-semibold"
                          style={{ color: getProgressColor(project.progress) }}>
                          {project.progress}
                        </Text>
                      </View>
                      <View className="h-2 w-full rounded-full bg-gray-200">
                        <View
                          className="h-2 rounded-full"
                          style={{
                            width: project.progress,
                            backgroundColor: getProgressColor(project.progress),
                          }}
                        />
                      </View>
                    </View>

                    {/* Action Buttons */}
                    {/* <View className="flex-row space-x-2 mt-2">
                      <TouchableOpacity className="bg-blue-50 px-3 py-1 rounded-full">
                        <Text className="text-blue-600 text-xs font-medium">View Details</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className="bg-gray-50 px-3 py-1 rounded-full">
                        <Text className="text-gray-600 text-xs font-medium">Edit</Text>
                      </TouchableOpacity>
                    </View> */}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </>
  );
}
