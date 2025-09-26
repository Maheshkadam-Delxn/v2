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

const AddBoqItem = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { boqId, boqName: initialBoqName } = route.params || {};

  // Initialize formData with total field
  const [formData, setFormData] = useState({
    boqName: initialBoqName || '',
    itemNo: '',
    quantity: '',
    unitCost: '',
    amount: '',
    unit: '',
    phase: '',
    contractorLabourRate: '',
    description: '',
    remark: '',
    total: '0.00', // Added total field
  });

  const [errors, setErrors] = useState({});
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [loading, setLoading] = useState(false);
  const [boqOptions, setBoqOptions] = useState([]);
  const [loadingBoqData, setLoadingBoqData] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  // Define unitOptions
  const unitOptions = [
    'Ton',
    'Nos',
    'Kg',
    'Meter',
    'Square Meter',
    'Cubic Meter',
    'Liter',
    'Feet',
    'Inch',
    'Piece',
    'Box',
    'Bundle',
  ];

  const phaseOptions = [
    'Phase 1 - Foundation',
    'Phase 2 - Structure',
    'Phase 3 - Roofing',
    'Phase 4 - Finishing',
    'Phase 5 - External Works',
  ];

  // Fetch BOQ data from API
  const fetchBoqData = async () => {
    setLoadingBoqData(true);
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://your-api-endpoint/boq/list'); // Update with real endpoint
      const data = await response.json();

      if (data.success) {
        setBoqOptions(data.boqList || []);
      } else {
        throw new Error('API returned unsuccessful response');
      }
    } catch (error) {
      console.error('Failed to fetch BOQ data:', error);
      // Fallback to sample data
      setBoqOptions([
        { id: 1, name: 'General BOQ' },
        { id: 2, name: 'Structural BOQ' },
        { id: 3, name: 'External BOQ' },
        { id: 4, name: 'Other BOQ' },
        { id: 5, name: 'Variable BOQ' },
      ]);
      Alert.alert('Warning', 'Unable to load BOQ data from server. Using offline data.');
    } finally {
      setLoadingBoqData(false);
    }
  };

  useEffect(() => {
    fetchBoqData(); // Fetch BOQ data on mount
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }

    // Auto-calculate total when quantity or unit cost changes
    if (field === 'quantity' || field === 'unitCost') {
      const quantity = field === 'quantity' ? parseFloat(value) || 0 : parseFloat(formData.quantity) || 0;
      const unitCost = field === 'unitCost' ? parseFloat(value) || 0 : parseFloat(formData.unitCost) || 0;
      const total = quantity * unitCost;

      setFormData((prev) => ({
        ...prev,
        total: isNaN(total) ? '0.00' : total.toFixed(2),
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.boqName.trim()) newErrors.boqName = 'BOQ Name is required';
    if (!formData.itemNo.trim()) newErrors.itemNo = 'Item Number is required';
    if (!formData.quantity.trim()) newErrors.quantity = 'Quantity is required';
    if (!formData.unitCost.trim()) newErrors.unitCost = 'Unit Cost is required';
    if (!formData.amount.trim()) newErrors.amount = 'Amount is required';
    if (!formData.unit.trim()) newErrors.unit = 'Unit is required';

    // Validate numeric fields
    if (formData.quantity && isNaN(parseFloat(formData.quantity))) {
      newErrors.quantity = 'Quantity must be a valid number';
    }
    if (formData.unitCost && isNaN(parseFloat(formData.unitCost))) {
      newErrors.unitCost = 'Unit Cost must be a valid number';
    }
    if (formData.amount && isNaN(parseFloat(formData.amount))) {
      newErrors.amount = 'Amount must be a valid number';
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

    try {
      // Replace with actual API call
      await fetch('https://your-api-endpoint/boq/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      Alert.alert(
        'Success',
        'BOQ Item has been added successfully!',
        [
          {
            text: 'Add Another',
            onPress: () => {
              setFormData({
                boqName: formData.boqName,
                itemNo: '',
                quantity: '',
                unitCost: '',
                amount: '',
                unit: '',
                phase: formData.phase,
                contractorLabourRate: formData.contractorLabourRate,
                description: '',
                remark: '',
                total: '0.00',
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
            {field === 'boqName' && loadingBoqData && (
              <ActivityIndicator size="small" color="#3b82f6" />
            )}
          </View>

          {field === 'boqName' && loadingBoqData ? (
            <View className="p-8 items-center">
              <ActivityIndicator size="large" color="#3b82f6" />
              <Text className="text-gray-500 mt-2">Loading BOQ data...</Text>
            </View>
          ) : (
            <FlatList
              data={options}
              keyExtractor={(item, index) =>
                field === 'boqName' ? (item.id?.toString() || index.toString()) : index.toString()
              }
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-4 border-b border-gray-100"
                  onPress={() => {
                    const value = field === 'boqName' ? (item.name || item) : item;
                    handleInputChange(field, value);
                    setDropdownVisible(null);
                  }}
                  accessible={true}
                  accessibilityLabel={field === 'boqName' ? item.name || item : item}
                >
                  <Text className="text-base text-gray-700">
                    {field === 'boqName' ? (item.name || item) : item}
                  </Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View className="p-4 items-center">
                  <Text className="text-gray-500">No options available</Text>
                  {field === 'boqName' && (
                    <TouchableOpacity
                      className="mt-2 px-4 py-2 bg-blue-500 rounded-lg"
                      onPress={fetchBoqData}
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

    return (
      <View className="mb-4">
        <Text className="text-sm font-medium text-gray-700 mb-2">
          {label}{' '}
          {['boqName', 'itemNo', 'quantity', 'unitCost', 'amount', 'unit'].includes(field) && (
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
            value={formData[field]}
            onChangeText={(value) => handleInputChange(field, value)}
            keyboardType={keyboardType}
            editable={editable && !options}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'center'}
            accessibilityLabel={`${label} input`}
          />
          {options && <Feather name="chevron-down" size={20} color="#6b7280" />}
          {!options && field === 'boqName' && <Feather name="user" size={20} color="#6b7280" />}
          {!options && field === 'itemNo' && <Feather name="hash" size={20} color="#6b7280" />}
          {!options && ['quantity', 'unitCost', 'contractorLabourRate'].includes(field) && (
            <Feather name="hash" size={20} color="#6b7280" />
          )}
          {!options && field === 'amount' && <Feather name="dollar-sign" size={20} color="#6b7280" />}
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
                <View className="flex-row space-x-4 mb-4">
                  <View className="flex-1">
                    {renderInputField('BOQ Name', 'boqName', 'Select BOQ Name', boqOptions)}
                  </View>
                  <View className="flex-1">
                    {renderInputField('Item No', 'itemNo', 'Enter Item No')}
                  </View>
                </View>

                {/* Row 2: Quantity & Unit */}
                <View className="flex-row space-x-4 mb-4">
                  <View className="flex-1">
                    {renderInputField('Quantity', 'quantity', 'Enter Quantity', null, 'numeric')}
                  </View>
                  <View className="flex-1">
                    {renderInputField('Unit', 'unit', 'Select Unit', unitOptions)}
                  </View>
                </View>

                {/* Row 3: Unit Cost & Amount */}
                <View className="flex-row space-x-4 mb-4">
                  <View className="flex-1">
                    {renderInputField('Unit Cost', 'unitCost', 'Enter Unit Cost', null, 'numeric')}
                  </View>
                  <View className="flex-1">
                    {renderInputField('Amount', 'amount', 'Enter Amount', null, 'numeric')}
                  </View>
                </View>

                {/* Row 4: Phase & Labour Rate */}
                <View className="flex-row space-x-4 mb-4">
                  <View className="flex-1">
                    {renderInputField('Phase', 'phase', 'Select Phase', phaseOptions)}
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
                    <Text className="flex-1 text-base text-gray-600">{formData.total}</Text>
                    <Feather name="dollar-sign" size={20} color="#6b7280" />
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row space-x-4 mt-6">
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
                • Amount field is separate from calculation-based totals{'\n'}
                • All fields marked with * are required{'\n'}
                • Use clear, descriptive item numbers for easy tracking
              </Text>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>

        {/* Dropdown Modals */}
        {renderDropdown(boqOptions, 'boqName', 'Select BOQ Name')}
        {renderDropdown(unitOptions, 'unit', 'Select Unit')}
        {renderDropdown(phaseOptions, 'phase', 'Select Phase')}
      </MainLayout>
    </View>
  );
};

export default AddBoqItem;