import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRoute, useNavigation } from '@react-navigation/native';
import MainLayout from '../../../../components/MainLayout';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
const AddBoqItem = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { boqId: initialBoqId, boqName: initialBoqName } = route.params || {};
  // Initialize formData with totalCost field
  const [formData, setFormData] = useState({
    boqId: initialBoqId || '',
    itemNo: '',
    quantity: '',
    unitCost: '',
    totalCost: '0.00',
    unit: '',
    phase: '',
    contractorLabourRate: '',
    description: '',
    remark: '',
  });
  const [displayData, setDisplayData] = useState({
    boqId: initialBoqName || '',
    unit: '',
  });
  const [errors, setErrors] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [boqOptions, setBoqOptions] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);
  const [loadingBoqData, setLoadingBoqData] = useState(false);
  const [loadingUnitData, setLoadingUnitData] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    fetchBoqData();
    fetchUnitData();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  const fetchBoqData = async () => {
    setLoadingBoqData(true);
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      setLoadingBoqData(false);
      return;
    }
    const parsedData = JSON.parse(userData);
    try {
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/boq/boq-list', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': '19Ab9n5HF73',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "category": "GUbvuPLB50r"
        }),
      });
      const data = await response.json();
      console.log("data input : - ", data.boqFormBeans);
     
      // Map the boqFormBeans to include a 'name' field for consistency in dropdown rendering
      const mappedBoqOptions = (data.boqFormBeans || []).map(item => ({
        ...item,
        name: item.title // Use 'title' as the display name for BOQ
      }));
     
      console.log("InitialBoqId",initialBoqId);
     
      let boqToSet = mappedBoqOptions;
      if (initialBoqId) {
        boqToSet = mappedBoqOptions.filter((f) => f.autoId === initialBoqId);
      }
     
      console.log("BOQID :- ",boqToSet);
      console.log(mappedBoqOptions);
     
      setBoqOptions(boqToSet);
    } catch (error) {
      console.error('Error fetching BOQ data:', error);
    } finally {
      setLoadingBoqData(false);
    }
  };
  const fetchUnitData = async () => {
    setLoadingUnitData(true);
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      setLoadingUnitData(false);
      return;
    }
    const parsedData = JSON.parse(userData);
    try {
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/unit/get-list', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': '19Ab9n5HF73',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({type:"Material"})
      });
      const data = await response.json();
      console.log("unit data : - ", data.unitFormBeans);
     
      // Assuming the units are in data.unitFormBeans; fallback to empty array
      const unitList = data.unitFormBeans || [];
      // Map to include 'name'
      const mappedUnitOptions = unitList.map(item => ({
        ...item,
        name: item.unit
      }));
     
      console.log("hellooooooooo",mappedUnitOptions);
     
      setUnitOptions(mappedUnitOptions);
    } catch (error) {
      console.error('Error fetching unit data:', error);
    } finally {
      setLoadingUnitData(false);
    }
  };
  const handleInputChange = (field, value, id = null) => {
    setFormData((prev) => ({
      ...prev,
      [field]: id || value,
    }));
    if (id) {
      setDisplayData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
    // Auto-calculate total when quantity or unit cost changes
    if (field === 'quantity' || field === 'unitCost') {
      const quantity = field === 'quantity' ? parseFloat(id || value) || 0 : parseFloat(formData.quantity) || 0;
      const unitCost = field === 'unitCost' ? parseFloat(id || value) || 0 : parseFloat(formData.unitCost) || 0;
      const total = quantity * unitCost;
      setFormData((prev) => ({
        ...prev,
        totalCost: isNaN(total) ? '0.00' : total.toFixed(2),
      }));
    }
  };
  const validateForm = () => {
    const newErrors = {};
    if (!formData.boqId.trim()) newErrors.boqId = 'BOQ Name is required';
    if (!formData.itemNo.trim()) newErrors.itemNo = 'Item Number is required';
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';
    if (!formData.unitCost.trim()) newErrors.unitCost = 'Unit Cost is required';
    if (!formData.unit.trim()) newErrors.unit = 'Unit is required';
    // Validate numeric fields
    if (formData.quantity && isNaN(parseFloat(formData.quantity))) {
      newErrors.quantity = 'Quantity must be a valid number';
    }
    if (formData.unitCost && isNaN(parseFloat(formData.unitCost))) {
      newErrors.unitCost = 'Unit Cost must be a valid number';
    }
    if (formData.contractorLabourRate && isNaN(parseFloat(formData.contractorLabourRate))) {
      newErrors.contractorLabourRate = 'Labour Rate must be a valid number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please correct the highlighted fields');
      return;
    }
    setLoading(true);
    const userData = await AsyncStorage.getItem('userData');
    if (!userData) {
      console.log('❌ No user data found in storage');
      setLoading(false);
      return;
    }
    const parsedData = JSON.parse(userData);
    try {
      // Construct payload matching the provided structure
      const payload = {
        boqItemFormBean: {
          itemNumber: formData.itemNo,
          quantity: formData.quantity,
          unitCost: formData.unitCost,
          totalCost: formData.totalCost,
          itemName: formData.description,
          unit: formData.unit,
          category: formData.phase,
          contractorCost: formData.contractorLabourRate,
          remark: formData.remark,
          boqId: formData.boqId,
        },
      };
      console.log("payload : -", payload);
     
      // Replace with actual API call
      const response = await fetch('https://api-v2-skystruct.prudenttec.com/boq/item', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${parsedData.jwtToken}`,
          'X-Menu-Id': '19Ab9n5HF73',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data : - ",data);
     
      Alert.alert(
        'Success',
        'BOQ Item has been added successfully!',
        [
          {
            text: 'Add Another',
            onPress: () => {
              setFormData({
                boqId: formData.boqId,
                itemNo: '',
                quantity: '',
                unitCost: '',
                totalCost: '0.00',
                unit: '',
                phase: formData.phase,
                contractorLabourRate: formData.contractorLabourRate,
                description: '',
                remark: '',
              });
              setDisplayData({
                boqId: displayData.boqId,
                unit: '',
              });
            },
          },
          {
            text: 'Done',
            style: 'default',
            onPress: () => navigation.goBack(),
          },
        ],
      );
    } catch (error) {
      console.error('Failed to save BOQ item:', error);
      Alert.alert('Error', 'Failed to save BOQ item. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const renderDropdown = (options, field, placeholder) => (
    <Modal
      visible={dropdownVisible === field}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setDropdownVisible(null)}
      accessible={true}
      accessibilityLabel={`Select ${placeholder}`}
    >
      <TouchableOpacity
        className="flex-1 bg-black/50 justify-center px-6"
        activeOpacity={1}
        onPress={() => setDropdownVisible(null)}
      >
        <View className="bg-white rounded-lg max-h-80 shadow-lg">
          <View className="p-4 border-b border-gray-200 flex-row items-center justify-between">
            <Text className="text-lg font-semibold text-gray-800">{placeholder}</Text>
            {(field === 'boqId' && loadingBoqData) || (field === 'unit' && loadingUnitData) ? (
              <ActivityIndicator size="small" color="#3b82f6" />
            ) : null}
          </View>
          {((field === 'boqId' && loadingBoqData) || (field === 'unit' && loadingUnitData)) ? (
            <View className="p-8 items-center">
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text className="text-gray-500 mt-2">Loading data...</Text>
            </View>
          ) : (
            <FlatList
              data={options}
              keyExtractor={(item, index) =>
                (field === 'boqId' || field === 'unit' || field === 'phase') ? (item.id?.toString() || item.autoId || index.toString()) : index.toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4 border-b border-gray-100"
                  onPress={() => {
                    const displayValue = field === 'boqId' ? item.name || item.title : (field === 'unit' ? (item.name || item.unit) : item);
                    const idValue = item.id || item.autoId;
                    handleInputChange(field, displayValue, idValue);
                    setDropdownVisible(null);
                  }}
                  accessible={true}
                  accessibilityLabel={field === 'boqId' ? item.name || item.title : (field === 'unit' ? item.name || item.unit : item)}
                >
                  <Text className="text-base text-gray-700">
                    {field === 'boqId' ? (item.name || item.title) : (field === 'unit' ? (item.name || item.unit) : item)}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View className="p-4 items-center">
                  <Text className="text-gray-500">No options available</Text>
                  {field === 'boqId' && (
                    <TouchableOpacity
                      className="mt-2 px-4 py-2 bg-blue-500 rounded-lg"
                      onPress={fetchBoqData}
                    >
                      <Text className="text-white text-sm">Retry</Text>
                    </TouchableOpacity>
                  )}
                  {field === 'unit' && (
                    <TouchableOpacity
                      className="mt-2 px-4 py-2 bg-blue-500 rounded-lg"
                      onPress={fetchUnitData}
                    >
                      <Text className="text-white text-sm">Retry</Text>
                    </TouchableOpacity>
                  )}
                </View>
              }
            />
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
  const renderInputField = (
    label,
    field,
    placeholder,
    options = null,
    keyboardType = 'default',
    editable = true,
    multiline = false,
  ) => {
    const hasError = errors[field];
    const isDropdown = !!options;
    const inputValue = isDropdown ? (displayData[field] || '') : formData[field];
    return (
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">
          {label}{' '}
          {['boqId', 'itemNo', 'quantity', 'unitCost', 'unit'].includes(field) && (
            <Text className="text-red-500">*</Text>
          )}
        </Text>
        <TouchableOpacity
          disabled={!options || !editable}
          onPress={() => options && setDropdownVisible(field)}
          className={`flex-row items-center border rounded-lg px-3 py-3 ${
            hasError ? 'border-red-300 bg-red-50' : 'border-gray-300'
          } ${!editable ? 'bg-gray-50' : 'bg-white'}`}
          accessible={true}
          accessibilityLabel={label}
        >
          <TextInput
            className={`flex-1 text-base ${multiline ? 'min-h-[80px]' : ''} ${
              !editable ? 'text-gray-600' : 'text-gray-800'
            }`}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            value={inputValue}
            onChangeText={(value) => handleInputChange(field, value)}
            keyboardType={keyboardType}
            editable={editable && !options}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
            accessibilityLabel={`${label} input`}
          />
          {options && <Feather name="chevron-down" size={20} color="#6b7280" />}
          {!options && field === 'boqId' && <Feather name="user" size={20} color="#6b7280" />}
          {!options && field === 'itemNo' && <Feather name="hash" size={20} color="#6b7280" />}
          {!options && ['quantity', 'unitCost', 'contractorLabourRate'].includes(field) && (
            <Feather name="hash" size={20} color="#6b7280" />
          )}
        </TouchableOpacity>
        {hasError && <Text className="text-red-500 text-xs mt-1 ml-1">{hasError}</Text>}
      </View>
    );
  };
  return (
    <View className="flex-1 bg-gray-50">
      <StatusBar style="auto" />
      <MainLayout title="Add BOQ Item">
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            className="flex-1 px-6 py-6"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Animated.View style={{ opacity: fadeAnim }} className="bg-white rounded-2xl shadow-sm">
              <LinearGradient
                colors={['#3b82f6', '#1d4ed8']}
                className="px-6 py-4 rounded-t-2xl"
              >
                <Text className="text-white text-lg font-semibold">Item Information</Text>
                <Text className="text-blue-100 text-sm">Fill in the details below</Text>
              </LinearGradient>
              <View className="p-6">
                {/* Row 1: BOQ Name & Item No */}
                <View className="flex-row space-x-4 gap-2 mb-4">
                  <View className="flex-1">
                    {renderInputField('BOQ Name', 'boqId', 'Select BOQ Name', boqOptions)}
                  </View>
                  <View className="flex-1">
                    {renderInputField('Item No', 'itemNo', 'Enter Item No')}
                  </View>
                </View>
                {/* Row 2: Quantity & Unit */}
                <View className="flex-row space-x-4 gap-2 mb-4">
                  <View className="flex-1">
                    {renderInputField('Quantity', 'quantity', 'Enter Quantity', null, 'numeric')}
                  </View>
                  <View className="flex-1">
                    {renderInputField('Unit', 'unit', 'Select Unit', unitOptions)}
                  </View>
                </View>
                {/* Unit Cost (single since amount removed) */}
                {renderInputField('Unit Cost', 'unitCost', 'Enter Unit Cost', null, 'numeric')}
                {/* Row 4: Phase & Labour Rate */}
                <View className="flex-row space-x-4 gap-2 mb-4">
                  <View className="flex-1">
                    {renderInputField('Phase', 'phase', 'Enter Phase...', null, 'default')}
                  </View>
                  <View className="flex-1">
                    {renderInputField('Labour Rate', 'contractorLabourRate', 'Enter Rate', null, 'numeric')}
                  </View>
                </View>
                {/* Description */}
                {renderInputField('Description', 'description', 'Enter description...', null, 'default', true, true)}
                {/* Remark */}
                {renderInputField('Remark', 'remark', 'Enter remark...', null, 'default', true, true)}
                {/* Total Display */}
                <View className="mb-4">
                  <Text className="text-sm font-medium text-gray-700 mb-2">Calculated Total</Text>
                  <View className="flex-row items-center border border-gray-300 rounded-lg px-3 py-3 bg-gray-50">
                    <Text className="flex-1 text-base text-gray-600">{formData.totalCost}</Text>
                    <Feather name="dollar-sign" size={20} color="#6b7280" />
                  </View>
                </View>
                {/* Action Buttons */}
                <View className="flex-row gap-4 mt-6">
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    className="flex-1 border border-gray-300 rounded-lg py-3 items-center"
                    accessible={true}
                    accessibilityLabel="Cancel adding BOQ item"
                  >
                    <Text className="text-gray-700 font-medium text-base">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    disabled={loading}
                    className="flex-1 rounded-lg py-3 items-center"
                    style={{
                      backgroundColor: loading ? '#9ca3af' : '#3b82f6',
                    }}
                    accessible={true}
                    accessibilityLabel="Submit BOQ item"
                  >
                    {loading ? (
                      <View className="flex-row items-center">
                        <Text className="text-white font-semibold text-base mr-2">Saving...</Text>
                        <ActivityIndicator size="small" color="#ffffff" />
                      </View>
                    ) : (
                      <Text className="text-white font-semibold text-base">Submit</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
            {/* Quick Tips Card */}
            <View className="bg-blue-50 border border-blue-200 rounded-2xl p-4 mt-4">
              <View className="flex-row items-center mb-2">
                <Feather name="info" size={16} color="#3b82f6" />
                <Text className="text-blue-800 font-medium ml-2">Quick Tips</Text>
              </View>
              <Text className="text-blue-700 text-sm leading-5">
                • BOQ Name is fetched from server automatically{'\n'}
                • All fields marked with * are required{'\n'}
                • Use clear, descriptive item numbers for easy tracking
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {/* Dropdown Modals */}
        {renderDropdown(boqOptions, 'boqId', 'Select BOQ Name')}
        {renderDropdown(unitOptions, 'unit', 'Select Unit')}
      </MainLayout>
    </View>
  );
};
export default AddBoqItem;