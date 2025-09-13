import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions, 
  ActivityIndicator,
  TextInput,
  Modal,
  FlatList,
  Pressable
} from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  FadeInDown, 
  FadeOut, 
  FadeInUp
} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const cardWidth = Math.min(screenWidth - 32, 600);

// Resource data
const labourData = [
  { id: 1, designation: 'Labour', hourCost: 123, dailyCost: 2133, monthlyCost: 45200 },
  { id: 2, designation: 'Supervisor', hourCost: 200, dailyCost: 4000, monthlyCost: 45000 },
];

const materialData = [
  { id: 1, title: 'Cement layout', area: '10 Sq.Ft', cost: 177500, materials: 1 },
  { id: 2, title: 'Steel Frame', area: '5 Sq.Ft', cost: 29380, materials: 1 },
  { id: 3, title: 'Bricks Form', area: '50 Sq.Ft', cost: 71583, materials: 1 },
  { id: 4, title: 'Earth Leveling', area: '2 Sq.Ft', cost: 26810, materials: 2 },
];

const nonLabourData = [
  { id: 1, title: 'Excavator', resourceId: 'RESC-00001', hourCost: 1251, dailyCost: 50000 },
];

// Updated tabs with Non Labour instead of Equipment
const tabs = [
  { key: 'Labour', label: 'Labour', icon: 'account-hard-hat' },
  { key: 'Material', label: 'Materials', icon: 'cube' },
  { key: 'NonLabour', label: 'Non Labour', icon: 'tools' },
];

// Format currency with commas
const formatCurrency = (amount) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Resource Card Component (Updated to match Inspection card style)
const ResourceCard = ({ item, type, expanded, onToggle }) => {
  const getGradientColors = () => {
    switch(type) {
      case 'Labour': return ['#dbeafe', '#bfdbfe'];
      case 'Material': return ['#dbeafe', '#bfdbfe'];
      case 'NonLabour': return ['#dbeafe', '#bfdbfe'];
      default: return ['#dbeafe', '#bfdbfe'];
    }
  };

  const getIconColor = () => {
    switch(type) {
      case 'Labour': return '#1e40af';
      case 'Material': return '#1e40af';
      case 'NonLabour': return '#1e40af';
      default: return '#1e40af';
    }
  };

  const getIconName = () => {
    switch(type) {
      case 'Labour': return 'account-hard-hat';
      case 'Material': return 'cube';
      case 'NonLabour': return 'tools';
      default: return 'account-hard-hat';
    }
  };

  return (
    <Animated.View entering={FadeInDown.duration(500)}>
      <View style={{
        borderRadius: 20,
        backgroundColor: '#ffffff',
        marginBottom: 16,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}>
        {/* Header - Matching Inspection card structure */}
        <TouchableOpacity onPress={onToggle}>
          <LinearGradient 
            colors={getGradientColors()}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 20 }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Icon 
                  name={getIconName()} 
                  size={24} 
                  color={getIconColor()} 
                  style={{ marginRight: 12 }} 
                />
                <View style={{ flex: 1 }}>
                  <Text style={{ 
                    fontSize: 18, 
                    fontWeight: '700', 
                    color: getIconColor(),
                    marginBottom: 4
                  }}>
                    {type === 'Labour' ? item.designation : item.title}
                  </Text>
                  {type === 'NonLabour' && (
                    <Text style={{ 
                      fontSize: 13, 
                      color: getIconColor(),
                      marginBottom: 8
                    }}>
                      {item.resourceId}
                    </Text>
                  )}
                </View>
              </View>
              <Icon 
                name={expanded ? 'chevron-up' : 'chevron-down'} 
                size={24} 
                color={getIconColor()} 
                style={{ marginLeft: 12 }} 
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Expanded Content */}
        {expanded && (
          <Animated.View entering={FadeInUp} exiting={FadeOut}>
            <View style={{ padding: 16, backgroundColor: '#f8fafc' }}>
              {/* Details */}
              <View style={{ 
                backgroundColor: '#ffffff', 
                borderRadius: 12, 
                padding: 16,
                marginBottom: 12
              }}>
                <Text style={{ 
                  fontSize: 16, 
                  fontWeight: '700', 
                  color: '#1f2937',
                  marginBottom: 12
                }}>
                  {type} Details
                </Text>
                
                {type === 'Labour' && (
                  <>
                    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>Hourly Cost</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>₹{formatCurrency(item.hourCost)}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>Daily Cost</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>₹{formatCurrency(item.dailyCost)}</Text>
                      </View>
                    </View>
                    
                    <View style={{ marginBottom: 8 }}>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>Monthly Cost</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>₹{formatCurrency(item.monthlyCost)}</Text>
                    </View>
                  </>
                )}
                
                {type === 'Material' && (
                  <>
                    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>Area</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.area}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>Cost</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>₹{formatCurrency(item.cost)}</Text>
                      </View>
                    </View>
                    
                    <View style={{ marginBottom: 8 }}>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>Materials</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.materials}</Text>
                    </View>
                  </>
                )}
                
                {type === 'NonLabour' && (
                  <>
                    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>Hourly Cost</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>₹{formatCurrency(item.hourCost)}</Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 12, color: '#6b7280' }}>Daily Cost</Text>
                        <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>₹{formatCurrency(item.dailyCost)}</Text>
                      </View>
                    </View>
                    
                    <View style={{ marginBottom: 8 }}>
                      <Text style={{ fontSize: 12, color: '#6b7280' }}>Resource ID</Text>
                      <Text style={{ fontSize: 14, fontWeight: '600', color: '#374151' }}>{item.resourceId}</Text>
                    </View>
                  </>
                )}
              </View>
              
              {/* Action Buttons */}
              <View style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                backgroundColor: '#ffffff', 
                borderRadius: 12, 
                padding: 16
              }}>
                {/* Edit Button */}
                <TouchableOpacity 
                  style={{ 
                    alignItems: 'center',
                    padding: 8,
                    flex: 1
                  }}
                  onPress={() => console.log('Edit', item.id)}
                >
                  <Icon name="pencil-outline" size={24} color="#10b981" />
                </TouchableOpacity>
                
                {/* Delete Button */}
                <TouchableOpacity 
                  style={{ 
                    alignItems: 'center',
                    padding: 8,
                    flex: 1
                  }}
                  onPress={() => console.log('Delete', item.id)}
                >
                  <Icon name="delete-outline" size={24} color="#ef4444" />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}
      </View>
    </Animated.View>
  );
};

// Empty State Component
const EmptyState = ({ searchQuery, tabName }) => (
  <Animated.View 
    entering={FadeInUp}
    style={{ 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: 40,
      backgroundColor: '#ffffff',
      borderRadius: 24,
      margin: 16
    }}
  >
    <Icon name="database-search" size={64} color="#d1d5db" />
    <Text style={{ 
      fontSize: 18, 
      fontWeight: '600', 
      color: '#6b7280',
      marginTop: 16
    }}>
      No resources found
    </Text>
    <Text style={{ 
      fontSize: 14, 
      color: '#9ca3af',
      marginTop: 8,
      textAlign: 'center'
    }}>
      {searchQuery ? 
        'Try adjusting your search terms' : 
        `No ${tabName.toLowerCase()} available`
      }
    </Text>
  </Animated.View>
);

export default function ResourceScreen() {
  const [activeTab, setActiveTab] = useState('Labour');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedItems, setExpandedItems] = useState({});
  const [showLabourForm, setShowLabourForm] = useState(false);
  const [showMaterialForm, setShowMaterialForm] = useState(false);
  const [showNonLabourForm, setShowNonLabourForm] = useState(false);
  
  // Form states
  const [designation, setDesignation] = useState('');
  const [hourCost, setHourCost] = useState('');
  const [dailyCost, setDailyCost] = useState('');
  const [monthlyCost, setMonthlyCost] = useState('');
  
  const [materialTitle, setMaterialTitle] = useState('');
  const [unit, setUnit] = useState('');
  const [area, setArea] = useState('');
  const [material, setMaterial] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  
  const [nonLabourTitle, setNonLabourTitle] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [nonLabourHourCost, setNonLabourHourCost] = useState('');
  const [nonLabourDailyCost, setNonLabourDailyCost] = useState('');
  const [nonLabourMonthlyCost, setNonLabourMonthlyCost] = useState('');

  const handleRefresh = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  }, []);

  const toggleItem = useCallback((id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  // Filter functions
  const getFiltered = useCallback((data) => {
    if (!searchQuery) return data;
    return data.filter(item =>
      (item.designation || item.title || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Get current data based on active tab
  const getCurrentData = useCallback(() => {
    switch(activeTab) {
      case 'Labour': return getFiltered(labourData);
      case 'Material': return getFiltered(materialData);
      case 'NonLabour': return getFiltered(nonLabourData);
      default: return [];
    }
  }, [activeTab, getFiltered]);

  const filteredResources = useMemo(() => getCurrentData(), [getCurrentData]);

  // Handle add button press
  const handleAddPress = () => {
    if (activeTab === 'Labour') {
      setShowLabourForm(true);
    } else if (activeTab === 'Material') {
      setShowMaterialForm(true);
    } else {
      setShowNonLabourForm(true);
    }
  };

  // Reset all form states
  const resetForms = () => {
    setDesignation('');
    setHourCost('');
    setDailyCost('');
    setMonthlyCost('');
    
    setMaterialTitle('');
    setUnit('');
    setArea('');
    setMaterial('');
    setQuantity('');
    setPrice('');
    
    setNonLabourTitle('');
    setResourceId('');
    setNonLabourHourCost('');
    setNonLabourDailyCost('');
    setNonLabourMonthlyCost('');
  };

  // Submit handlers
  const submitLabourForm = () => {
    console.log('Adding labour:', { designation, hourCost, dailyCost, monthlyCost });
    setShowLabourForm(false);
    resetForms();
  };

  const submitMaterialForm = () => {
    console.log('Adding material:', { materialTitle, unit, area, material, quantity, price });
    setShowMaterialForm(false);
    resetForms();
  };

  const submitNonLabourForm = () => {
    console.log('Adding non labour:', { nonLabourTitle, resourceId, nonLabourHourCost, nonLabourDailyCost, nonLabourMonthlyCost });
    setShowNonLabourForm(false);
    resetForms();
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
          <View style={{ 
            backgroundColor: '#ffffff', 
            padding: 32, 
            borderRadius: 24,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 4
          }}>
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text style={{ 
              marginTop: 16, 
              fontSize: 16, 
              fontWeight: '600', 
              color: '#374151' 
            }}>
              Loading resources...
            </Text>
          </View>
        </View>
      );
    }

    return (
      <ScrollView 
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {filteredResources.length > 0 ? (
          filteredResources.map((item) => (
            <ResourceCard
              key={item.id}
              item={item}
              type={activeTab}
              expanded={expandedItems[item.id]}
              onToggle={() => toggleItem(item.id)}
            />
          ))
        ) : (
          <EmptyState 
            searchQuery={searchQuery} 
            tabName={tabs.find(tab => tab.key === activeTab)?.label || 'resources'} 
          />
        )}
      </ScrollView>
    );
  };

  return (
    <MainLayout title="Resources">
      <View style={{ flex: 1, backgroundColor: '#f8fafc' }}>

        {/* Header - Matching Work Inspection header style */}
        <View style={{ backgroundColor: '#dbeafe', padding: 16 }}>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: 12
          }}>
            <View>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '700', 
                color: '#1e40af' 
              }}>
                Resources
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: '#3b82f6',
                marginTop: 2
              }}>
                {filteredResources.length} resources
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: 12 
                }}
                onPress={handleRefresh}
              >
                <Icon name="refresh" size={18} color="#1e40af" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: 12 
                }}
                onPress={handleAddPress}
              >
                <Icon name="plus" size={18} color="#1e40af" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 12,
            paddingHorizontal: 12,
            flexDirection: 'row',
            alignItems: 'center'
          }}>
            <Icon name="magnify" size={20} color="#6b7280" />
            <TextInput
              placeholder="Search resources..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={{
                flex: 1,
                padding: 12,
                fontSize: 16,
                color: '#374151'
              }}
              placeholderTextColor="#9ca3af"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle-outline" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Tabs - Updated to match Work Inspection style */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          borderBottomWidth: 1, 
          borderBottomColor: '#e5e7eb', 
          backgroundColor: '#ffffff',
          paddingHorizontal: 16
        }}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              style={{ 
                paddingVertical: 12,
                paddingHorizontal: 8,
                borderBottomWidth: activeTab === tab.key ? 2 : 0,
                borderBottomColor: activeTab === tab.key ? '#3b82f6' : 'transparent',
                flex: 1,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center'
              }}
              onPress={() => setActiveTab(tab.key)}
            >
              <Icon 
                name={tab.icon} 
                size={16} 
                color={activeTab === tab.key ? '#3b82f6' : '#6b7280'} 
                style={{ marginRight: 4 }}
              />
              <Text style={{ 
                fontSize: 14, 
                fontWeight: activeTab === tab.key ? '600' : '400',
                color: activeTab === tab.key ? '#3b82f6' : '#6b7280',
                textAlign: 'center'
              }}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {renderContent()}

        {/* Labour Form Modal */}
        <Modal
          visible={showLabourForm}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowLabourForm(false)}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <View style={{backgroundColor: 'white', borderRadius: 12, padding: 20, width: '90%', maxWidth: 400}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                <Text style={{fontSize: 20, fontWeight: '700'}}>Add Labour</Text>
                <Pressable onPress={() => setShowLabourForm(false)}>
                  <Icon name="close" size={24} color="#6B7280" />
                </Pressable>
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Designation</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={designation}
                  onChangeText={setDesignation}
                  placeholder="Enter designation"
                />
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Hour Cost</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={hourCost}
                  onChangeText={setHourCost}
                  placeholder="Enter hour cost"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Daily Cost</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={dailyCost}
                  onChangeText={setDailyCost}
                  placeholder="Enter daily cost"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={{marginBottom: 24}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Monthly Cost</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={monthlyCost}
                  onChangeText={setMonthlyCost}
                  placeholder="Enter monthly cost"
                  keyboardType="numeric"
                />
              </View>
              
              <TouchableOpacity 
                style={{backgroundColor: '#3b82f6', padding: 12, borderRadius: 8}}
                onPress={submitLabourForm}
              >
                <Text style={{color: 'white', textAlign: 'center', fontWeight: '600'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Material Form Modal */}
        <Modal
          visible={showMaterialForm}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowMaterialForm(false)}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <View style={{backgroundColor: 'white', borderRadius: 12, padding: 20, width: '90%', maxWidth: 400}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                <Text style={{fontSize: 20, fontWeight: '700'}}>Add Material Formulation</Text>
                <Pressable onPress={() => setShowMaterialForm(false)}>
                  <Icon name="close" size={24} color="#6B7280" />
                </Pressable>
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Title</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={materialTitle}
                  onChangeText={setMaterialTitle}
                  placeholder="Enter title"
                />
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Unit</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={unit}
                  onChangeText={setUnit}
                  placeholder="Enter unit"
                />
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Area</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={area}
                  onChangeText={setArea}
                  placeholder="Enter area"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Material</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={material}
                  onChangeText={setMaterial}
                  placeholder="Enter material"
                />
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Quantity</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={quantity}
                  onChangeText={setQuantity}
                  placeholder="Enter quantity"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={{marginBottom: 24}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Price</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={price}
                  onChangeText={setPrice}
                  placeholder="Enter price"
                  keyboardType="numeric"
                />
              </View>
              
              <TouchableOpacity 
                style={{backgroundColor: '#3b82f6', padding: 12, borderRadius: 8}}
                onPress={submitMaterialForm}
              >
                <Text style={{color: 'white', textAlign: 'center', fontWeight: '600'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Non Labour Form Modal */}
        <Modal
          visible={showNonLabourForm}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowNonLabourForm(false)}
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
            <View style={{backgroundColor: 'white', borderRadius: 12, padding: 20, width: '90%', maxWidth: 400}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                <Text style={{fontSize: 20, fontWeight: '700'}}>Add Non Labour</Text>
                <Pressable onPress={() => setShowNonLabourForm(false)}>
                  <Icon name="close" size={24} color="#6B7280" />
                </Pressable>
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Title</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={nonLabourTitle}
                  onChangeText={setNonLabourTitle}
                  placeholder="Enter title"
                />
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Resource ID</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={resourceId}
                  onChangeText={setResourceId}
                  placeholder="Enter resource ID"
                />
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Hour Cost</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={nonLabourHourCost}
                  onChangeText={setNonLabourHourCost}
                  placeholder="Enter hour cost"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={{marginBottom: 16}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Daily Cost</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={nonLabourDailyCost}
                  onChangeText={setNonLabourDailyCost}
                  placeholder="Enter daily cost"
                  keyboardType="numeric"
                />
              </View>
              
              <View style={{marginBottom: 24}}>
                <Text style={{fontSize: 14, fontWeight: '600', color: '#374151', marginBottom: 4}}>Monthly Cost</Text>
                <TextInput
                  style={{borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8, padding: 12}}
                  value={nonLabourMonthlyCost}
                  onChangeText={setNonLabourMonthlyCost}
                  placeholder="Enter monthly cost"
                  keyboardType="numeric"
                />
              </View>
              
              <TouchableOpacity 
                style={{backgroundColor: '#3b82f6', padding: 12, borderRadius: 8}}
                onPress={submitNonLabourForm}
              >
                <Text style={{color: 'white', textAlign: 'center', fontWeight: '600'}}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </MainLayout>
  );
}