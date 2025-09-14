import React, { useState, useMemo } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  ScrollView, 
  Modal, 
  Pressable 
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

// Color palette to match InventoryScreen
const colors = {
  primary: '#1D4ED8',
  secondary: '#6366F1',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6',
  background: '#FFFFFF',
  surface: '#FFFFFF',
  surfaceVariant: '#F8FAFC',
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#6B7280',
  border: '#E2E8F0',
};

// Expense data
const expenseData = [
  { id: 1, title: 'Concrete Materials', category: 'Materials', amount: 12500, date: '2023-10-15', status: 'Approved' },
  { id: 2, title: 'Labor Payment', category: 'Labor', amount: 8500, date: '2023-10-14', status: 'Pending' },
  { id: 3, title: 'Equipment Rental', category: 'Equipment', amount: 3200, date: '2023-10-13', status: 'Rejected' },
];

// Tabs - Updated to match the three-tab structure
const tabs = [
  { key: 'all', label: 'All Expenses' },
  { key: 'materials', label: 'Materials' },
  { key: 'labor', label: 'Labor' },
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

  const filteredExpenses = useMemo(getFilteredExpenses, [
    activeTab, search, categoryFilter, statusFilter, dateFrom, dateTo
  ]);

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
    console.log('Adding new phase');
    setShowAddPhaseModal(false);
  };

  // Render expense card
  const renderExpenseCard = ({ item }) => {
    const getStatusStyles = () => {
      switch(item.status) {
        case 'Approved': return { backgroundColor: '#d1fae5', color: '#10b981' };
        case 'Pending': return { backgroundColor: '#fef3c7', color: '#f59e0b' };
        case 'Rejected': return { backgroundColor: '#fee2e2', color: '#ef4444' };
        default: return { backgroundColor: '#f3f4f6', color: '#6b7280' };
      }
    };

    return (
      <View style={{
        backgroundColor: '#ffffff',
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        padding: 16,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#374151' }}>{item.title}</Text>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>{item.category}</Text>
          </View>
          <View style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 16,
            backgroundColor: getStatusStyles().backgroundColor,
            alignSelf: 'flex-start',
          }}>
            <Text style={{
              fontSize: 12,
              fontWeight: '600',
              color: getStatusStyles().color,
            }}>
              {item.status}
            </Text>
          </View>
        </View>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Amount</Text>
            <Text style={{ fontSize: 18, fontWeight: '700', color: '#374151' }}>₹{formatCurrency(item.amount)}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 12, color: '#6b7280' }}>Date</Text>
            <Text style={{ fontSize: 14, color: '#374151' }}>{item.date}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={{
              backgroundColor: '#eff6ff',
              padding: 6,
              marginRight: 8,
              borderRadius: 8,
            }}>
              <Icon name="pencil-outline" size={16} color="#3b82f6" />
            </TouchableOpacity>
            <TouchableOpacity style={{
              backgroundColor: '#fee2e2',
              padding: 6,
              borderRadius: 8,
            }}>
              <Icon name="delete-outline" size={16} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <MainLayout title="Expenses">
      <View style={{ flex: 1, backgroundColor: colors.surfaceVariant }}>
        {/* Header - Matching InventoryScreen structure */}
        <LinearGradient 
          colors={['#f0f7ff', '#e6f0ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{ padding: 16 }}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
          }}>
            <View>
              <Text style={{
                fontSize: 20,
                fontWeight: '700',
                color: colors.text,
              }}>
                Expenses
              </Text>
              <Text style={{
                fontSize: 12,
                color: colors.textMuted,
                marginTop: 4,
              }}>
                {filteredExpenses.length} expenses • {statusFilter || 'All statuses'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: colors.surface,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border,
                }}
                onPress={() => {/* Handle download */}}
              >
                <Icon name="download" size={20} color={colors.info} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: colors.info,
                  borderRadius: 12,
                }}
                onPress={() => setShowAddExpenseModal(true)}
              >
                <Icon name="plus" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search and Filter Row - Matching InventoryScreen structure */}
          <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
            <View style={{ 
              flex: 1,
              height: 44,
              backgroundColor: colors.surface, 
              borderRadius: 12, 
              paddingHorizontal: 12,
              borderWidth: 1,
              borderColor: colors.border,
              justifyContent: 'center',
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="magnify" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search expenses..."
                  placeholderTextColor={colors.textMuted}
                  style={{ 
                    flex: 1, 
                    color: colors.text, 
                    fontSize: 14,
                    height: 40,
                  }}
                />
                {search.length > 0 && (
                  <TouchableOpacity onPress={() => setSearch('')}>
                    <Icon name="close-circle" size={18} color={colors.textMuted} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <TouchableOpacity
              style={{ 
                height: 44,
                minWidth: 44,
                backgroundColor: colors.info,
                paddingHorizontal: 12,
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => setShowFilterModal(true)}
            >
              <Icon name="filter-outline" size={16} color="#ffffff" />
              {statusFilter && (
                <View style={{ 
                  marginLeft: 8, 
                  backgroundColor: '#ffffff', 
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 8,
                }}>
                  <Text style={{ 
                    fontSize: 12, 
                    color: colors.info,
                    fontWeight: '600',
                  }}>
                    {statusFilter}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Tabs - Moved outside the header with increased gap */}
        <View style={{ 
          marginTop: 16, // Increased gap between header and tabs
          marginHorizontal: 16,
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          borderBottomWidth: 1, 
          borderBottomColor: '#e5e7eb', 
          backgroundColor: '#ffffff',
          borderRadius: 12,
          overflow: 'hidden',
        }}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={{ 
                flex: 1,
                paddingVertical: 14,
                paddingHorizontal: 8,
                borderBottomWidth: activeTab === tab.key ? 2 : 0,
                borderBottomColor: activeTab === tab.key ? '#3b82f6' : 'transparent',
                alignItems: 'center',
              }}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text style={{ 
                fontSize: 14, 
                fontWeight: activeTab === tab.key ? '600' : '400',
                color: activeTab === tab.key ? '#3b82f6' : '#6b7280'
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Expense List */}
        <View style={{ flex: 1, padding: 16 }}>
          <FlatList
            data={filteredExpenses}
            keyExtractor={item => item.id.toString()}
            renderItem={renderExpenseCard}
            ListEmptyComponent={
              <View style={{ 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: 40,
                backgroundColor: '#ffffff',
                borderRadius: 24,
                marginTop: 16,
              }}>
                <Icon name="database-search" size={64} color="#d1d5db" />
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: '600', 
                  color: '#6b7280', 
                  marginTop: 16 
                }}>
                  No expenses found
                </Text>
                <Text style={{ 
                  fontSize: 14, 
                  color: '#9ca3af', 
                  marginTop: 8, 
                  textAlign: 'center' 
                }}>
                  {search ? 
                    'Try adjusting your search terms or filters' : 
                    'Get started by adding your first expense'
                  }
                </Text>
                <TouchableOpacity 
                  style={{ 
                    backgroundColor: colors.info, 
                    paddingHorizontal: 24,
                    paddingVertical: 12,
                    borderRadius: 12,
                    marginTop: 16,
                  }}
                  onPress={() => setShowAddExpenseModal(true)}
                >
                  <Text style={{ 
                    color: '#ffffff', 
                    fontWeight: '600',
                    fontSize: 14,
                  }}>
                    Add Expense
                  </Text>
                </TouchableOpacity>
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
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
            <View style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#1f2937',
                }}>
                  Filter Expenses
                </Text>
                <Pressable onPress={() => setShowFilterModal(false)}>
                  <Icon name="close" size={24} color="#6b7280" />
                </Pressable>
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Category</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    color: '#374151',
                  }}
                  value={categoryFilter}
                  onChangeText={setCategoryFilter}
                  placeholder="Filter by category"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Status</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    color: '#374151',
                  }}
                  value={statusFilter}
                  onChangeText={setStatusFilter}
                  placeholder="Filter by status"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Date From</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    color: '#374151',
                  }}
                  value={dateFrom}
                  onChangeText={setDateFrom}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Date To</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    color: '#374151',
                  }}
                  value={dateTo}
                  onChangeText={setDateTo}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity 
                  style={{
                    flex: 1,
                    backgroundColor: '#f3f4f6',
                    padding: 16,
                    borderRadius: 16,
                    alignItems: 'center',
                  }}
                  onPress={resetFilters}
                >
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#374151',
                  }}>
                    Reset
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{
                    flex: 1,
                    backgroundColor: colors.info,
                    padding: 16,
                    borderRadius: 16,
                    alignItems: 'center',
                  }}
                  onPress={applyFilters}
                >
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#ffffff',
                  }}>
                    Apply
                  </Text>
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
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
            <View style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#1f2937',
                }}>
                  Add New Expense
                </Text>
                <Pressable onPress={() => setShowAddExpenseModal(false)}>
                  <Icon name="close" size={24} color="#6b7280" />
                </Pressable>
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Title</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    color: '#374151',
                  }}
                  value={expenseTitle}
                  onChangeText={setExpenseTitle}
                  placeholder="Enter expense title"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Category</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    color: '#374151',
                  }}
                  value={expenseCategory}
                  onChangeText={setExpenseCategory}
                  placeholder="Enter category"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Amount</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    color: '#374151',
                  }}
                  value={expenseAmount}
                  onChangeText={setExpenseAmount}
                  placeholder="Enter amount"
                  keyboardType="numeric"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Date</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    color: '#374151',
                  }}
                  value={expenseDate}
                  onChangeText={setExpenseDate}
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9ca3af"
                />
              </View>
              
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Description</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    color: '#374151',
                    height: 80,
                  }}
                  value={expenseDescription}
                  onChangeText={setExpenseDescription}
                  placeholder="Enter description"
                  placeholderTextColor="#9ca3af"
                  multiline
                />
              </View>
              
              <TouchableOpacity 
                style={{
                  backgroundColor: colors.info,
                  padding: 16,
                  borderRadius: 16,
                  alignItems: 'center',
                }}
                onPress={submitExpense}
              >
                <Text style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: '#ffffff',
                }}>
                  Add Expense
                </Text>
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
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'flex-end' }}>
            <View style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 24,
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 24,
              }}>
                <Text style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#1f2937',
                }}>
                  Add New Phase
                </Text>
                <Pressable onPress={() => setShowAddPhaseModal(false)}>
                  <Icon name="close" size={24} color="#6b7280" />
                </Pressable>
              </View>
              
              <View style={{ marginBottom: 24 }}>
                <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 8 }}>Phase Name</Text>
                <TextInput
                  style={{
                    borderWidth: 1,
                    borderColor: '#e5e7eb',
                    borderRadius: 12,
                    padding: 12,
                    fontSize: 14,
                    color: '#374151',
                    placeholderTextColor: '#9ca3af',
                  }}
                  placeholder="Enter phase name"
                />
              </View>
              
              <TouchableOpacity 
                style={{
                  backgroundColor: colors.success,
                  padding: 16,
                  borderRadius: 16,
                  alignItems: 'center',
                }}
                onPress={submitPhase}
                >
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '600',
                    color: '#ffffff',
                  }}>
                    Add Phase
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </MainLayout>
    );
  }