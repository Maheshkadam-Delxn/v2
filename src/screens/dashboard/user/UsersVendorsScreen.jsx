import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput,
  Dimensions 
} from 'react-native';
import MainLayout from '../../components/MainLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';

const screenWidth = Dimensions.get('window').width;

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

export default function UsersVendorsScreen({ navigation }) {
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
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        {/* Header */}
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
            marginBottom: 12
          }}>
            <View>
              <Text style={{ 
                fontSize: 20, 
                fontWeight: '700', 
                color: colors.text 
              }}>
                Vendors
              </Text>
              <Text style={{ 
                fontSize: 12, 
                color: colors.textMuted,
                marginTop: 4
              }}>
                List of vendors associated with the project
              </Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: colors.surface, 
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: colors.border
                }}
                onPress={() => console.log('Refresh')}
              >
                <Icon name="refresh" size={20} color={colors.info} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ 
                  padding: 10, 
                  backgroundColor: colors.info,
                  borderRadius: 12
                }}
                onPress={() => navigation.navigate('AddVendor')}
              >
                <Icon name="plus" size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Search and Action Row */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ 
              flex: 1,
              backgroundColor: colors.surface, 
              borderRadius: 12, 
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon name="magnify" size={18} color={colors.textMuted} style={{ marginRight: 8 }} />
                <TextInput
                  placeholder="Search vendors..."
                  placeholderTextColor={colors.textMuted}
                  style={{ 
                    flex: 1, 
                    color: colors.text, 
                    fontSize: 14 
                  }}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{ 
                minWidth:56,
                backgroundColor: colors.surface,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => navigation.navigate('AddDocumentType')}
            >
              <Icon name="file-document-outline" size={16} color={colors.info} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ 
                minWidth: 56,
                backgroundColor: colors.surface,
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.border,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onPress={() => navigation.navigate('AddVendortype')}
            >
              <Icon name="account-group" size={16} color={colors.info} />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Vendors List */}
        <ScrollView 
          contentContainerStyle={{ padding: 16 }}
          showsVerticalScrollIndicator={false}
        >
          {vendors.map((vendor, index) => (
            <View key={index} style={{ 
              backgroundColor: colors.surface, 
              borderRadius: 16, 
              padding: 16, 
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
              borderWidth: 1,
              borderColor: colors.border
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Image 
                    source={{ uri: vendor.image }} 
                    style={{ width: 56, height: 56, borderRadius: 12, marginRight: 16, borderWidth: 1, borderColor: colors.border }} 
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, fontWeight: '700', color: colors.text }}>{vendor.name}</Text>
                    <Text style={{ fontSize: 12, color: colors.info, fontWeight: '600', marginTop: 4 }}>{vendor.email}</Text>
                  </View>
                </View>
                
                {/* Edit and Delete icons */}
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <TouchableOpacity 
                    style={{ padding: 8, marginLeft: 8 }}
                    onPress={() => navigation.navigate('AddVendor', { vendor, isEdit: true })}
                  >
                    <Icon name="pencil-outline" size={20} color={colors.info} />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ padding: 8, marginLeft: 8 }}>
                    <Icon name="trash-can-outline" size={20} color={colors.danger} />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={{ borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 16 }}>
                {/* Vendor Code */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{ 
                    backgroundColor: `${colors.info}15`, 
                    padding: 8, 
                    borderRadius: 8, 
                    marginRight: 12 
                  }}>
                    <Icon name="barcode" size={16} color={colors.info} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 2 }}>Vendor Code</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{vendor.vendorCode}</Text>
                  </View>
                </View>
                
                {/* Tax No. */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{ 
                    backgroundColor: `${colors.secondary}15`, 
                    padding: 8, 
                    borderRadius: 8, 
                    marginRight: 12 
                  }}>
                    <Icon name="receipt" size={16} color={colors.secondary} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 2 }}>Tax No.</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{vendor.taxNo}</Text>
                  </View>
                </View>
                
                {/* GSTIN No. */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{ 
                    backgroundColor: `${colors.success}15`, 
                    padding: 8, 
                    borderRadius: 8, 
                    marginRight: 12 
                  }}>
                    <Icon name="file-document" size={16} color={colors.success} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 2 }}>GSTIN No.</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{vendor.gstinNo}</Text>
                  </View>
                </View>
                
                {/* Vendor Type */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                  <View style={{ 
                    backgroundColor: `${colors.info}15`, 
                    padding: 8, 
                    borderRadius: 8, 
                    marginRight: 12 
                  }}>
                    <Icon name="office-building" size={16} color={colors.info} />
                  </View>
                  <View>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 2 }}>Vendor Type</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{vendor.vendorType}</Text>
                  </View>
                </View>
                
                {/* Address */}
                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                  <View style={{ 
                    backgroundColor: `${colors.textMuted}15`, 
                    padding: 8, 
                    borderRadius: 8, 
                    marginRight: 12,
                    marginTop: 2
                  }}>
                    <Icon name="map-marker" size={16} color={colors.textMuted} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 12, color: colors.textMuted, marginBottom: 2 }}>Address</Text>
                    <Text style={{ fontSize: 14, fontWeight: '600', color: colors.text }}>{vendor.address}</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </MainLayout>
  );
}