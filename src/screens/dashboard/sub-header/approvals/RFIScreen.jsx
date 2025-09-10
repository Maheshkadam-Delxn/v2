import React from 'react';
  import { View, Text } from 'react-native';

  export default function RFIScreen() {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-2xl font-bold text-gray-800">Bill of Quantity</Text>
        <Text className="text-gray-600 mt-2">Manage your bill of quantities here.</Text>
      </View>
    );
  }