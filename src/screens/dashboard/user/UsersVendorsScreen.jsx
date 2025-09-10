import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import MainLayout from '../../components/MainLayout';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function UsersVendorsScreen() {
  const vendors = [
    {
      name: 'ABC Constructions',
      email: 'abc@constructions.com',
      vendorCode: 'VEND-00001',
      taxNo: '8855',
      gstinNo: '52GDFD65SD',
      vendorType: 'General Contractor',
      address: '123 Builder Lane, Mumbai, MH',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80'
    },
    {
      name: 'XYZ Suppliers',
      email: 'xyz@supplies.in',
      vendorCode: 'VEND-00002',
      taxNo: '455',
      gstinNo: '45S4DGFD556',
      vendorType: 'Subcontractor',
      address: '45 Supply Road, Bengaluru, KA',
      image: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto-format&fit=crop&w=870&q=80'
    },
    {
      name: 'Prime Electricals',
      email: 'info@primeelectricals.com',
      vendorCode: 'VEND-00003',
      taxNo: '6743',
      gstinNo: '27AABFP1352F1Z5',
      vendorType: 'Electrical Contractor',
      address: '78 Electronics City, Hyderabad, TS',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    },
    { 
      name: 'Metro Plumbing Services',
      email: 'service@metroplumbing.in',
      vendorCode: 'VEND-00004',
      taxNo: '3321',
      gstinNo: '07AABCU9603R1ZM',
      vendorType: 'Plumbing Contractor',
      address: '22 Waterworks Road, Delhi, DL',
      image: 'https://images.unsplash.com/photo-1621544402535-5cf6a8a5c6e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
    }
  ];

  return (
    <MainLayout title="Vendors">
      <ScrollView className="flex-1 px-5 py-4 bg-gray-50">
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">Vendors</Text>
          <Text className="text-sm text-gray-500">List of vendors associated with the project</Text>
        </View>
        
        {/* Search bar and action buttons row */}
        <View className="flex-row items-center mb-6">
          {/* Search bar */}
          <View className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-200">
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              placeholder="Search vendors..."
              className="ml-2 flex-1 text-gray-700"
              placeholderTextColor="#9ca3af"
            />
          </View>
          
          {/* Plus icon with box and radius */}
          <TouchableOpacity className="ml-3 bg-blue-600 w-12 h-12 rounded-xl items-center justify-center shadow-sm"> {/* Changed to blue-600 */}
            <Ionicons name="add" size={24} color="white" />
          </TouchableOpacity>
          
          {/* Add document icon */}
          <TouchableOpacity className="ml-3 bg-white w-12 h-12 rounded-xl items-center justify-center shadow-sm border border-gray-200">
            <Ionicons name="document-attach" size={24} color="#2563eb" /> {/* Changed to blue-600 */}
          </TouchableOpacity>
          
          {/* User details icon */}
          <TouchableOpacity className="ml-3 bg-white w-12 h-12 rounded-xl items-center justify-center shadow-sm border border-gray-200">
            <Ionicons name="people" size={24} color="#2563eb" /> {/* Changed to blue-600 */}
          </TouchableOpacity>
        </View>
        
        {/* Vendors list with increased spacing */}
        <View className="space-y-6">
          {vendors.map((vendor, index) => (
            <View key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center flex-1">
                  <Image 
                    source={{ uri: vendor.image }} 
                    className="w-14 h-14 rounded-xl mr-4 border border-gray-200" 
                  />
                  <View className="flex-1">
                    <Text className="text-lg font-bold text-gray-900">{vendor.name}</Text>
                    <Text className="text-sm text-blue-600 font-medium">{vendor.email}</Text> {/* Changed to blue-600 */}
                  </View>
                </View>
                
                {/* Edit and Delete icons */}
                <View className="flex-row items-center">
                  <TouchableOpacity className="p-2 ml-2">
                    <Ionicons name="create-outline" size={20} color="#2563eb" /> {/* Changed to blue-600 */}
                  </TouchableOpacity>
                  <TouchableOpacity className="p-2 ml-2">
                    <Ionicons name="trash-outline" size={20} color="#ef4444" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View className="border-t border-gray-100 pt-4">
                {/* Vendor Code */}
                <View className="flex-row items-center mb-3">
                  <View className="bg-blue-100 p-2 rounded-lg mr-3"> {/* Changed to blue-100 */}
                    <Ionicons name="barcode-outline" size={16} color="#2563eb" /> {/* Changed to blue-600 */}
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500 font-medium">Vendor Code</Text>
                    <Text className="text-sm font-semibold text-gray-900">{vendor.vendorCode}</Text>
                  </View>
                </View>
                
                {/* Tax No. */}
                <View className="flex-row items-center mb-3">
                  <View className="bg-purple-100 p-2 rounded-lg mr-3">
                    <Ionicons name="receipt-outline" size={16} color="#8b5cf6" />
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500 font-medium">Tax No.</Text>
                    <Text className="text-sm font-semibold text-gray-900">{vendor.taxNo}</Text>
                  </View>
                </View>
                
                {/* GSTIN No. */}
                <View className="flex-row items-center mb-3">
                  <View className="bg-green-100 p-2 rounded-lg mr-3">
                    <Ionicons name="document-text-outline" size={16} color="#10b981" />
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500 font-medium">GSTIN No.</Text>
                    <Text className="text-sm font-semibold text-gray-900">{vendor.gstinNo}</Text>
                  </View>
                </View>
                
                {/* Vendor Type */}
                <View className="flex-row items-center mb-3">
                  <View className="bg-blue-100 p-2 rounded-lg mr-3"> {/* Changed to blue-100 */}
                    <Ionicons name="business-outline" size={16} color="#2563eb" /> {/* Changed to blue-600 */}
                  </View>
                  <View>
                    <Text className="text-xs text-gray-500 font-medium">Vendor Type</Text>
                    <Text className="text-sm font-semibold text-gray-900">{vendor.vendorType}</Text>
                  </View>
                </View>
                
                {/* Address */}
                <View className="flex-row items-start">
                  <View className="bg-gray-100 p-2 rounded-lg mr-3 mt-1">
                    <Ionicons name="location-outline" size={16} color="#6b7280" />
                  </View>
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500 font-medium">Address</Text>
                    <Text className="text-sm font-semibold text-gray-900">{vendor.address}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
        
        {/* Help button */}
        <TouchableOpacity className="mt-6 bg-blue-600 rounded-xl p-4 items-center shadow-sm mb-20"> {/* Changed to blue-600 */}
          <Text className="text-white text-sm font-medium">Need Help?</Text>
        </TouchableOpacity>
      </ScrollView>
    </MainLayout>
  );
}