import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, TextInput, Modal } from 'react-native';
import MainLayout from '../../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = Math.min(screenWidth - 32, 600);

// Sample inspection data with types
const inspectionData = [
  {
    id: '1',
    referenceNo: 'GH101-IR-00004',
    title: 'New Work Inspection',
    revision: '1',
    raisedBy: 'Sonalika',
    raisedTo: 'Martin, Mukesh Sinha',
    raisedDate: '2025-08-20',
    description: 'New Work Inspection',
    status: 'pending',
    type: 'Work Inspection'
  },
  {
    id: '2',
    referenceNo: 'GH101-IR-00005',
    title: 'Structural Inspection',
    revision: '2',
    raisedBy: 'Rajesh',
    raisedTo: 'John, Michael',
    raisedDate: '2025-08-21',
    description: 'Structural integrity check',
    status: 'completed',
    type: 'Work Inspection'
  },
  {
    id: '3',
    referenceNo: 'GH101-IR-00006',
    title: 'Electrical Inspection',
    revision: '1',
    raisedBy: 'Priya',
    raisedTo: 'David, Robert',
    raisedDate: '2025-08-22',
    description: 'Electrical systems verification',
    status: 'inProgress',
    type: 'Work Inspection'
  },
  {
    id: '4',
    referenceNo: 'GH101-MT-00001',
    title: 'Concrete Material Check',
    revision: '1',
    raisedBy: 'Quality Control',
    raisedTo: 'Materials Department',
    raisedDate: '2025-08-24',
    description: 'Concrete quality verification',
    status: 'completed',
    type: 'Material Inspection'
  }
];

// Status Badge Component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    pending: { color: 'text-amber-500', bgColor: 'bg-amber-100', text: 'Pending' },
    completed: { color: 'text-emerald-500', bgColor: 'bg-emerald-100', text: 'Completed' },
    inProgress: { color: 'text-blue-500', bgColor: 'bg-blue-100', text: 'In Progress' },
    rejected: { color: 'text-red-500', bgColor: 'bg-red-100', text: 'Rejected' }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <View className={`flex-row items-center ${config.bgColor} px-2 py-1 rounded-xl self-start`}>
      <View className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')} mr-1`} />
      <Text className={`text-xs font-semibold ${config.color}`}>
        {config.text}
      </Text>
    </View>
  );
};

// Inspection Card Component
const InspectionCard = ({ item, expanded, onToggle }) => {
  return (
    <View className="rounded-2xl bg-white mb-4 overflow-hidden shadow-lg">
      <TouchableOpacity onPress={onToggle} activeOpacity={0.7}>
        <View className="p-5 bg-blue-100">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-lg font-bold text-blue-900 mb-1">
                {item.referenceNo}
              </Text>
              <Text className="text-sm text-blue-600 mb-2">
                {item.title}
              </Text>
            </View>
            <View className="items-end mr-3">
              <Text className="text-xs text-blue-600 mb-1">
                Rev: {item.revision}
              </Text>
              <StatusBadge status={item.status} />
            </View>
            <Icon
              name={expanded ? 'chevron-up' : 'chevron-down'}
              size={24}
              color="#1e40af"
            />
          </View>
        </View>
      </TouchableOpacity>

      {expanded && (
        <View className="p-4 bg-slate-50">
          <View className="bg-white rounded-xl p-4 mb-3">
            <Text className="text-base font-bold text-gray-800 mb-3">
              Inspection Details
            </Text>
            <View className="flex-row mb-2">
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Raised By</Text>
                <Text className="text-sm font-semibold text-gray-700">{item.raisedBy}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Raised To</Text>
                <Text className="text-sm font-semibold text-gray-700">{item.raisedTo}</Text>
              </View>
            </View>
            <View className="flex-row mb-2">
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Raised Date</Text>
                <Text className="text-sm font-semibold text-gray-700">{item.raisedDate}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-xs text-gray-500">Type</Text>
                <Text className="text-sm font-semibold text-gray-700">{item.type}</Text>
              </View>
            </View>
            <View className="mb-2">
              <Text className="text-xs text-gray-500">Description</Text>
              <Text className="text-sm font-semibold text-gray-700">{item.description}</Text>
            </View>
          </View>

          <View className="flex-row justify-between bg-white rounded-xl p-4">
            <TouchableOpacity className="items-center p-2 flex-1">
              <Icon name="pencil-outline" size={24} color="#10b981" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center p-2 flex-1">
              <Icon name="clipboard-check-outline" size={24} color="#8b5cf6" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center p-2 flex-1">
              <Icon name="graph-outline" size={24} color="#f97316" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center p-2 flex-1">
              <Icon name="delete-outline" size={24} color="#ef4444" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center p-2 flex-1">
              <Icon name="file-document-outline" size={24} color="#3b82f6" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center p-2 flex-1">
              <Icon name="email-outline" size={24} color="#6366f1" />
            </TouchableOpacity>
            <TouchableOpacity className="items-center p-2 flex-1">
              <Icon name="comment-text-outline" size={24} color="#06b6d4" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

// Empty State Component
const EmptyState = ({ searchQuery, tabName }) => (
  <View className="items-center justify-center p-10 bg-white rounded-3xl m-4">
    <Icon name="clipboard-list-outline" size={64} color="#d1d5db" />
    <Text className="text-lg font-semibold text-gray-500 mt-4">
      No inspections found
    </Text>
    <Text className="text-sm text-gray-400 mt-2 text-center">
      {searchQuery ? 'Try adjusting your search terms' : `No ${tabName.toLowerCase()} available`}
    </Text>
  </View>
);

// Add Inspection Type Modal Component
const AddInspectionTypeModal = ({ visible, onClose, onAddType }) => {
  const [typeName, setTypeName] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = () => {
    if (typeName.trim()) {
      onAddType(typeName.trim(), status);
      setTypeName('');
      setStatus('active');
      onClose();
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white rounded-2xl w-11/12 max-w-lg shadow-2xl">
          {/* Header */}
          <View className="bg-blue-500 rounded-t-2xl p-5 flex-row justify-between items-center">
            <Text className="text-xl font-bold text-white">
              New Inspection Type
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Icon name="close" size={24} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View className="p-5">
            <View className="mb-5">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Inspection Type Name
              </Text>
              <TextInput
                value={typeName}
                onChangeText={setTypeName}
                placeholder="Enter inspection type name"
                className="bg-gray-100 rounded-xl p-3 text-base text-gray-700 border border-gray-200"
                placeholderTextColor="#9ca3af"
              />
            </View>

            <View className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-2">
                Status
              </Text>
              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => setStatus('active')}
                  className={`flex-1 rounded-xl p-3 items-center border-2 ${
                    status === 'active' 
                      ? 'bg-emerald-100 border-emerald-500' 
                      : 'bg-gray-100 border-gray-200'
                  }`}
                >
                  <Text className={`text-sm font-semibold ${
                    status === 'active' ? 'text-emerald-500' : 'text-gray-500'
                  }`}>
                    Active
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setStatus('deactive')}
                  className={`flex-1 rounded-xl p-3 items-center border-2 ${
                    status === 'deactive' 
                      ? 'bg-red-100 border-red-500' 
                      : 'bg-gray-100 border-gray-200'
                  }`}
                >
                  <Text className={`text-sm font-semibold ${
                    status === 'deactive' ? 'text-red-500' : 'text-gray-500'
                  }`}>
                    Deactive
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 bg-gray-100 rounded-xl p-4 items-center"
              >
                <Text className="text-base font-semibold text-gray-500">
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                className="flex-1 bg-blue-500 rounded-xl p-4 items-center"
              >
                <Text className="text-base font-semibold text-white">
                  Add Type
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Main Work Inspection Screen Component
const WorkInspectionScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  
  // Dynamic tabs state
  const [tabs, setTabs] = useState([
    { key: 'all', label: 'All' },
    { key: 'work', label: 'Work' },
    { key: 'material', label: 'Material' },
  ]);

  const handleRefresh = useCallback(() => {
    // Refresh logic
  }, []);

  const toggleItem = useCallback((id) => {
    setExpandedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  }, []);

  const handleAddInspectionType = useCallback((typeName, status) => {
    const newTab = {
      key: typeName.toLowerCase().replace(/\s+/g, '_'),
      label: typeName
    };
    setTabs(prev => [...prev, newTab]);
  }, []);

  const filteredInspections = useMemo(() => {
    let result = [...inspectionData];

    if (activeTab !== 'all') {
      result = result.filter(item => {
        if (activeTab === 'work') return item.type === 'Work Inspection';
        else if (activeTab === 'material') return item.type === 'Material Inspection';
        return true;
      });
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.referenceNo.toLowerCase().includes(query) ||
        item.raisedBy.toLowerCase().includes(query) ||
        item.raisedTo.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      );
    }

    return result;
  }, [searchQuery, activeTab]);

  const renderContent = () => {
    if (filteredInspections.length > 0) {
      return (
        <ScrollView className="p-4">
          {filteredInspections.map((item) => (
            <InspectionCard
              key={item.id}
              item={item}
              expanded={expandedItems[item.id]}
              onToggle={() => toggleItem(item.id)}
            />
          ))}
        </ScrollView>
      );
    }
    return <EmptyState searchQuery={searchQuery} tabName={tabs.find(tab => tab.key === activeTab)?.label || 'inspections'} />;
  };

  return (
    <MainLayout title="Work Inspection">
      <View className="flex-1 bg-slate-50">
        {/* Header */}
        <View className="bg-blue-100 p-4">
          <View className="flex-row justify-between items-center mb-3">
            <View>
              <Text className="text-xl font-bold text-blue-900">Work Inspection</Text>
              <Text className="text-xs text-blue-600 mt-0.5">
                {filteredInspections.length} inspections
              </Text>
            </View>
            <View className="flex-row gap-2">
              <TouchableOpacity
                className="p-2.5 bg-white/80 rounded-xl"
                onPress={handleRefresh}
              >
                <Icon name="refresh" size={18} color="#1e40af" />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2.5 bg-white/80 rounded-xl"
                onPress={() => setModalVisible(true)}
              >
                <Icon name="plus-box" size={18} color="#1e40af" />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2.5 bg-white/80 rounded-xl"
                onPress={() => navigation.navigate('AddInspectionChecklist')}
              >
                <Icon name="clipboard-plus-outline" size={18} color="#1e40af" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar with Add Inspection Button */}
          <View className="flex-row gap-2 items-center">
            <View className="flex-1 bg-white/80 rounded-xl px-3 flex-row items-center">
              <Icon name="magnify" size={20} color="#6b7280" />
              <TextInput
                placeholder="Search inspections..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                className="flex-1 p-3 text-base text-gray-700"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <TouchableOpacity
              className="bg-blue-500 rounded-xl p-3 flex-row items-center gap-1.5"
              onPress={() => navigation.navigate('AddInspection')}
            >
              <Icon name="plus" size={20} color="#ffffff" />
              <Text className="text-sm font-semibold text-white">
                Add
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Tabs */}
        <View className="flex-row justify-between border-b border-gray-200 bg-white px-4">
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.key}
              className="py-3 px-2 flex-1 items-center"
              style={{
                borderBottomWidth: activeTab === tab.key ? 2 : 0,
                borderBottomColor: activeTab === tab.key ? '#3b82f6' : 'transparent'
              }}
              onPress={() => setActiveTab(tab.key)}
            >
              <Text className={`text-sm text-center ${
                activeTab === tab.key 
                  ? 'font-semibold text-blue-600' 
                  : 'font-normal text-gray-500'
              }`}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        {renderContent()}

        {/* Add Inspection Type Modal */}
        <AddInspectionTypeModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onAddType={handleAddInspectionType}
        />
      </View>
    </MainLayout>
  );
};

export default WorkInspectionScreen;