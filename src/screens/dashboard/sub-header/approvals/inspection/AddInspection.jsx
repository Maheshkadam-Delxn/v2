import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from 'react-native';
import MainLayout from '../../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const AddInspection = () => {
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState({
    inspectionType: '',
    category: '',
    referenceNo: 'GH101-IR-00006',
    title: '',
    revision: '',
    raisedDate: '',
    raisedBy: '',
    raisedTo: [],
    checkList: '',
    status: '',
    description: '',
    attachment: null
  });

  const [showInspectionTypePicker, setShowInspectionTypePicker] = useState(false);
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [showRaisedByPicker, setShowRaisedByPicker] = useState(false);
  const [showRaisedToPicker, setShowRaisedToPicker] = useState(false);
  const [showCheckListPicker, setShowCheckListPicker] = useState(false);
  const [showStatusPicker, setShowStatusPicker] = useState(false);

  const inspectionTypes = ['Work Inspection', 'Material Inspection', 'Quality Inspection', 'Safety Inspection'];
  const categories = ['Structural', 'Electrical', 'Plumbing', 'HVAC', 'General'];
  const users = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams', 'Tom Brown'];
  const checkLists = ['Daily Check', 'Weekly Check', 'Monthly Check', 'Final Check'];
  const statuses = ['Pending', 'In Progress', 'Completed', 'On Hold'];

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Add your submit logic here
    navigation.goBack();
  };

  const SelectField = ({ label, value, placeholder, onPress, icon = "package-variant" }) => (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-600 mb-2">{label}</Text>
      <TouchableOpacity
        onPress={onPress}
        className="bg-white border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
      >
        <Text className={value ? "text-gray-700 text-base" : "text-gray-400 text-base"}>
          {value || placeholder}
        </Text>
        <Icon name={icon} size={20} color="#6b7280" />
      </TouchableOpacity>
    </View>
  );

  const InputField = ({ label, value, placeholder, onChangeText, icon = "pencil-outline", multiline = false }) => (
    <View className="mb-4">
      <Text className="text-sm font-semibold text-gray-600 mb-2">{label}</Text>
      <View className="bg-white border border-gray-200 rounded-xl flex-row items-center px-4">
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          className="flex-1 py-4 text-base text-gray-700"
          multiline={multiline}
          numberOfLines={multiline ? 4 : 1}
          textAlignVertical={multiline ? "top" : "center"}
        />
        <Icon name={icon} size={20} color="#6b7280" />
      </View>
    </View>
  );

  return (
    <MainLayout title="Inspection Report">
      <View className="flex-1 bg-slate-50">
        {/* Header */}
        <View className="bg-blue-500 p-4 flex-row justify-between items-center">
          <Text className="text-xl font-bold text-white">Inspection Report</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4">
          {/* Two Column Layout for Inspection Type and Category */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-600 mb-2">Inspection Type</Text>
              <TouchableOpacity
                onPress={() => setShowInspectionTypePicker(!showInspectionTypePicker)}
                className="bg-white border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
              >
                <Text className={formData.inspectionType ? "text-gray-700 text-base" : "text-gray-400 text-base"}>
                  {formData.inspectionType || "Select Inspection Type"}
                </Text>
                <Icon name="account" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>

            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-600 mb-2">Category</Text>
              <TouchableOpacity
                onPress={() => setShowCategoryPicker(!showCategoryPicker)}
                className="bg-white border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
              >
                <Text className={formData.category ? "text-gray-700 text-base" : "text-gray-400 text-base"}>
                  {formData.category || "Select Category"}
                </Text>
                <Icon name="account" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Reference No and Title */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <InputField
                label="Reference No"
                value={formData.referenceNo}
                onChangeText={(text) => setFormData({ ...formData, referenceNo: text })}
                placeholder="GH101-IR-00006"
                icon="sync"
              />
            </View>
            <View className="flex-1">
              <InputField
                label="Title"
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholder="Enter Title"
                icon="sync"
              />
            </View>
          </View>

          {/* Revision and Raised Date */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <InputField
                label="Revision"
                value={formData.revision}
                onChangeText={(text) => setFormData({ ...formData, revision: text })}
                placeholder="Enter Revision"
                icon="target"
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-600 mb-2">Raised Date</Text>
              <TouchableOpacity className="bg-white border border-gray-200 rounded-xl p-4 flex-row justify-between items-center">
                <Text className={formData.raisedDate ? "text-gray-700 text-base" : "text-gray-400 text-base"}>
                  {formData.raisedDate || "Select Date"}
                </Text>
                <Icon name="calendar" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Raised By and Raised To */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-600 mb-2">Raised By</Text>
              <TouchableOpacity
                onPress={() => setShowRaisedByPicker(!showRaisedByPicker)}
                className="bg-white border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
              >
                <Text className={formData.raisedBy ? "text-gray-700 text-base" : "text-gray-400 text-base"}>
                  {formData.raisedBy || "Select Raised By"}
                </Text>
                <Icon name="package-variant" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-600 mb-2">Raised To</Text>
              <TouchableOpacity
                onPress={() => setShowRaisedToPicker(!showRaisedToPicker)}
                className="bg-white border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
              >
                <Text className={formData.raisedTo.length > 0 ? "text-gray-700 text-base" : "text-gray-400 text-base"}>
                  {formData.raisedTo.length > 0 ? `${formData.raisedTo.length} selected` : "Select Options"}
                </Text>
                <Icon name="chevron-down" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Check List and Status */}
          <View className="flex-row gap-3 mb-4">
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-600 mb-2">Check List</Text>
              <TouchableOpacity
                onPress={() => setShowCheckListPicker(!showCheckListPicker)}
                className="bg-white border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
              >
                <Text className={formData.checkList ? "text-gray-700 text-base" : "text-gray-400 text-base"}>
                  {formData.checkList || "Select Check Name"}
                </Text>
                <Icon name="package-variant" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-gray-600 mb-2">Status</Text>
              <TouchableOpacity
                onPress={() => setShowStatusPicker(!showStatusPicker)}
                className="bg-white border border-gray-200 rounded-xl p-4 flex-row justify-between items-center"
              >
                <Text className={formData.status ? "text-gray-700 text-base" : "text-gray-400 text-base"}>
                  {formData.status || "Select Status"}
                </Text>
                <Icon name="package-variant" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View className="mb-4">
            <Text className="text-sm font-semibold text-gray-600 mb-2">Description</Text>
            <View className="bg-white border border-gray-200 rounded-xl p-4">
              <TextInput
                value={formData.description}
                onChangeText={(text) => setFormData({ ...formData, description: text })}
                placeholder="Enter Description"
                placeholderTextColor="#9ca3af"
                className="text-base text-gray-700 min-h-[100px]"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
              />
              <View className="absolute bottom-2 right-2">
                <Icon name="pencil" size={16} color="#9ca3af" />
              </View>
            </View>
          </View>

          {/* Attachment */}
          <View className="mb-6">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-base font-semibold text-gray-800">Attachment</Text>
              <TouchableOpacity>
                <Icon name="paperclip" size={24} color="#6b7280" />
              </TouchableOpacity>
            </View>
            <View className="bg-white border border-dashed border-gray-300 rounded-xl p-8 items-center justify-center">
              <Icon name="cloud-upload-outline" size={48} color="#d1d5db" />
              <Text className="text-sm text-gray-400 mt-2">Click to upload or drag and drop</Text>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-500 rounded-xl p-4 items-center mb-8"
          >
            <Text className="text-base font-bold text-white">Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default AddInspection;