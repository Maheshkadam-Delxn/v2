// import React from 'react';
//   import { View, Text } from 'react-native';

//   export default function ExpenseScreen() {
//     return (
//       <View className="flex-1 justify-center items-center bg-white">
//         <Text className="text-2xl font-bold text-gray-800">Bill of Quantity</Text>
//         <Text className="text-gray-600 mt-2">Manage your bill of quantities here.</Text>
//       </View>
//     );
//   }

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, ScrollView, Modal, Pressable } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Expense data
const expenseData = [
  { id: 1, title: 'Concrete Materials', category: 'Materials', amount: 12500, date: '2023-10-15', status: 'Approved' },
  { id: 2, title: 'Labor Payment', category: 'Labor', amount: 8500, date: '2023-10-14', status: 'Pending' },
  { id: 3, title: 'Equipment Rental', category: 'Equipment', amount: 3200, date: '2023-10-13', status: 'Rejected' },
];

// Tabs
const tabs = [
  { key: 'all', label: 'All' },
  { key: 'general', label: 'General' },
  { key: 'structural', label: 'Structural' },
];

// Format currency with commas
const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function ExpenseScreen() {
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showAddPhaseModal, setShowAddPhaseModal] = useState(false);
  
  // Filter states
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  
  // Add expense form states
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [expenseDescription, setExpenseDescription] = useState('');

  // Filter functions
  const getFilteredExpenses = () => {
    let filtered = expenseData;
    
    // Apply tab filter
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => 
        item.category.toLowerCase() === activeTab.toLowerCase()
      );
    }
    
    // Apply search filter
    if (search) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    // Apply date range filter
    if (dateFrom && dateTo) {
      filtered = filtered.filter(item => {
        const itemDate = new Date(item.date);
        const fromDate = new Date(dateFrom);
        const toDate = new Date(dateTo);
        return itemDate >= fromDate && itemDate <= toDate;
      });
    }
    
    return filtered;
  };

  // Handle apply filters
  const applyFilters = () => {
    setShowFilterModal(false);
  };

  // Handle reset filters
  const resetFilters = () => {
    setCategoryFilter('');
    setStatusFilter('');
    setDateFrom('');
    setDateTo('');
    setShowFilterModal(false);
  };

  // Handle add expense
  const submitExpense = () => {
    // Here you would typically add to your data array or make an API call
    console.log('Adding expense:', { 
      expenseTitle, 
      expenseCategory, 
      expenseAmount, 
      expenseDate, 
      expenseDescription 
    });
    setShowAddExpenseModal(false);
    // Reset form
    setExpenseTitle('');
    setExpenseCategory('');
    setExpenseAmount('');
    setExpenseDate('');
    setExpenseDescription('');
  };

  // Handle add phase
  const submitPhase = () => {
    // Here you would typically add a new phase
    console.log('Adding new phase');
    setShowAddPhaseModal(false);
  };

  // Render expense card
  const renderExpenseCard = ({ item }) => {
    const getStatusColor = () => {
      switch(item.status) {
        case 'Approved': return 'bg-green-100 text-green-800';
        case 'Pending': return 'bg-yellow-100 text-yellow-800';
        case 'Rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    return (
      <View className="bg-white rounded-lg mb-3 shadow-sm border border-gray-100 p-4">
        <View className="flex-row justify-between items-start mb-2">
          <View className="flex-1">
            <Text className="text-base font-semibold text-gray-800">{item.title}</Text>
            <Text className="text-sm text-gray-500">{item.category}</Text>
          </View>
          <View className={`px-2 py-1 rounded-full ${getStatusColor()}`}>
            <Text className="text-xs font-medium">{item.status}</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-xs text-gray-500">Amount</Text>
            <Text className="text-lg font-bold text-gray-800">₹{formatCurrency(item.amount)}</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-500">Date</Text>
            <Text className="text-sm text-gray-600">{item.date}</Text>
          </View>
          <View className="flex-row">
            <TouchableOpacity className="bg-blue-50 p-1.5 mr-2 rounded-md">
              <Icon name="pencil-outline" size={16} color="#3B82F6" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-red-50 p-1.5 rounded-md">
              <Icon name="delete-outline" size={16} color="#EF4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <MainLayout title="Expenses">
      <View className="flex-1 bg-gray-50">
        {/* Tabs */}
        <View className="flex-row justify-between border-b border-gray-200 bg-white px-4">
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              className={`py-3 px-2 ${activeTab === tab.key ? 'border-b-2 border-blue-500' : ''}`}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text className={`text-sm ${activeTab === tab.key ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Header with Search and Action Buttons */}
        <View className="flex-row items-center p-3 bg-white border-b border-gray-100">
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
            <Icon name="magnify" size={18} color="#6B7280" style={{ marginRight: 6 }} />
            <TextInput
              className="flex-1 text-gray-800 text-sm"
              placeholder="Search expenses..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          
          <View className="flex-row ml-2">
            <TouchableOpacity 
              className="p-2 mr-2 rounded-md bg-gray-100"
              onPress={() => setShowFilterModal(true)}
            >
              <Icon name="filter-outline" size={18} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="p-2 mr-2 rounded-md bg-gray-100"
              onPress={() => {/* Handle download */}}
            >
              <Icon name="download" size={18} color="#6B7280" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="p-2 mr-2 rounded-md bg-blue-600"
              onPress={() => setShowAddExpenseModal(true)}
            >
              <Icon name="plus" size={18} color="#fff" />
              <Text className="text-white text-xs">Add Expense</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="p-2 rounded-md bg-green-600"
              onPress={() => setShowAddPhaseModal(true)}
            >
              <Icon name="plus" size={18} color="#fff" />
              <Text className="text-white text-xs">Add Phase</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Expense List */}
        <View className="flex-1 p-3">
          <FlatList
            data={getFilteredExpenses()}
            keyExtractor={item => item.id.toString()}
            renderItem={renderExpenseCard}
            ListEmptyComponent={
              <View className="items-center justify-center py-10">
                <Icon name="database-search" size={40} color="#D1D5DB" />
                <Text className="text-gray-500 mt-2 text-base">No expenses found</Text>
                <Text className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</Text>
              </View>
            }
          />
        </View>

        {/* Filter Modal */}
        <Modal
          visible={showFilterModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowFilterModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/70">
            <View className="bg-white rounded-lg p-5 w-11/12 max-w-md">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">Filter Expenses</Text>
                <Pressable onPress={() => setShowFilterModal(false)}>
                  <Icon name="close" size={24} color="#6B7280" />
                </Pressable>
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Category</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={categoryFilter}
                  onChangeText={setCategoryFilter}
                  placeholder="Filter by category"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Status</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={statusFilter}
                  onChangeText={setStatusFilter}
                  placeholder="Filter by status"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Date From</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={dateFrom}
                  onChangeText={setDateFrom}
                  placeholder="YYYY-MM-DD"
                />
              </View>
              
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-1">Date To</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={dateTo}
                  onChangeText={setDateTo}
                  placeholder="YYYY-MM-DD"
                />
              </View>
              
              <View className="flex-row justify-between">
                <TouchableOpacity 
                  className="bg-gray-200 py-3 rounded-lg flex-1 mr-2"
                  onPress={resetFilters}
                >
                  <Text className="text-gray-800 text-center font-semibold">Reset</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="bg-blue-600 py-3 rounded-lg flex-1 ml-2"
                  onPress={applyFilters}
                >
                  <Text className="text-white text-center font-semibold">Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Add Expense Modal */}
        <Modal
          visible={showAddExpenseModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowAddExpenseModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/70">
            <View className="bg-white rounded-lg p-5 w-11/12 max-w-md">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">Add New Expense</Text>
                <Pressable onPress={() => setShowAddExpenseModal(false)}>
                  <Icon name="close" size={24} color="#6B7280" />
                </Pressable>
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Title</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={expenseTitle}
                  onChangeText={setExpenseTitle}
                  placeholder="Enter expense title"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Category</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={expenseCategory}
                  onChangeText={setExpenseCategory}
                  placeholder="Enter category"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Amount</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={expenseAmount}
                  onChangeText={setExpenseAmount}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                />
              </View>
              
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Date</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  value={expenseDate}
                  onChangeText={setExpenseDate}
                  placeholder="YYYY-MM-DD"
                />
              </View>
              
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-1">Description</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3 h-20"
                  value={expenseDescription}
                  onChangeText={setExpenseDescription}
                  placeholder="Enter description"
                  multiline
                />
              </View>
              
              <TouchableOpacity 
                className="bg-blue-600 py-3 rounded-lg"
                onPress={submitExpense}
              >
                <Text className="text-white text-center font-semibold">Add Expense</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Add Phase Modal */}
        <Modal
          visible={showAddPhaseModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowAddPhaseModal(false)}
        >
          <View className="flex-1 justify-center items-center bg-black/70">
            <View className="bg-white rounded-lg p-5 w-11/12 max-w-md">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-xl font-bold">Add New Phase</Text>
                <Pressable onPress={() => setShowAddPhaseModal(false)}>
                  <Icon name="close" size={24} color="#6B7280" />
                </Pressable>
              </View>
              
              <View className="mb-6">
                <Text className="text-sm font-medium text-gray-700 mb-1">Phase Name</Text>
                <TextInput
                  className="border border-gray-300 rounded-lg p-3"
                  placeholder="Enter phase name"
                />
              </View>
              
              <TouchableOpacity 
                className="bg-green-600 py-3 rounded-lg"
                onPress={submitPhase}
              >
                <Text className="text-white text-center font-semibold">Add Phase</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout>
  );
}