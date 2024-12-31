import React, { useState,useEffect } from 'react';
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,Alert,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker'
import { useAuth } from '@/Store/AuthContext';
const BuyOrder = ({ navigation, route }) => {
  // Sample product data - replace with your actual data
  const product = {
    name: "Golden Oyster Mushrooms",
    image: "https://example.com/mushroom.jpg",
    price: 299,
    availableQuantity: 500,
  };
  const Id = route?.params?.Id;
  const image = route?.params?.image;
  const productName = route?.params?.productName;
  const productRate = route?.params?.productRate;
  const [quantity, setQuantity] = useState(1);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [deliveryMode, setDeliveryMode] = useState('standard'); // or 'express'
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    quantity_in_kg:'0',
    delivery_address: "",
    delivery_city: "",
    delivery_address_zip:'',
    mode_of_delivery: "standard",
  });

  const handleCreateOrder = async () => {
    setLoading(true);
    try {
      // Simulate API call
      if (!formData.quantity_in_kg || !formData.delivery_address || !formData.delivery_city || !formData.delivery_address_zip||!formData.mode_of_delivery) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }
      const { token } = useAuth();
      //const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM4MjQ1ODIsInVzZXJfaWQiOjEsInVzZXJfdHlwZSI6ImZhcm1lciJ9.3DCo4LmnbMGL3jS-SP2TmQkEKW8tkympsh8zwc25lzI';
      // Create JSON payload
      const payload = {
        ...formData,
        quantity_in_kg: parseFloat(formData.quantity_in_kg),
      };
      console.log('Payload:', payload);
      const response = await fetch(`https://krishi-bazar.onrender.com/api/v1/product/${Id}/order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      await new Promise(resolve => setTimeout(resolve, 2000));
     
      console.log(response)
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error('Order Failed, try again!');
        }
        console.log(error)
      setShowSuccessModal(true);
      setFormData({
        quantity_in_kg:'0',
        delivery_address: "",
        delivery_city: "",
        delivery_address_zip:'',
        mode_of_delivery: "standard",
      });
    } catch (error) {
      console.log(error)
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const StatusModal = ({ visible, onClose, success }) => (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={[styles.modalIcon, 
            { backgroundColor: success ? '#E7F5EE' : '#FFE9E9' }]}>
            <Feather 
              name={success ? "check-circle" : "x-circle"} 
              size={40} 
              color={success ? '#2F9461' : '#FF4D4D'}
            />
          </View>
          <Text style={styles.modalTitle}>
            {success ? 'Order Created Successfully!' : 'Order Failed'}
          </Text>
          <Text style={styles.modalMessage}>
            {success 
              ? 'Your order has been placed successfully. You will receive a confirmation shortly.'
              : 'Something went wrong. Please try again later.'}
          </Text>
          <TouchableOpacity
            style={[styles.modalButton, 
              { backgroundColor: success ? '#2F9461' : '#FF4D4D' }]}
            onPress={onClose}
          >
            <Text style={styles.modalButtonText}>
              {success ? 'View Order' : 'Try Again'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <GluestackUIProvider mode="light"><SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Order</Text>
        </View>
        <ScrollView style={styles.scrollView}>
          {/* Product Summary */}
          <View style={styles.productSummary}>
            <Image
              source={{ uri: image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{productName}</Text>
              <Text style={styles.productPrice}>₹{productRate}</Text>
            </View>
          </View>

          {/* Order Details Form */}
          <View style={styles.form}>
            {/* Quantity Selector */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Quantity</Text>
              <Text style={styles.label}>Quantity (kg) *</Text>
              <TextInput
                style={styles.input}
                value={formData.quantity_in_kg}
                onChangeText={(text) => setFormData({ ...formData, quantity_in_kg: text })}
                keyboardType="decimal-pad"
                placeholder="Enter quantity in kg"
                />
            </View>

            {/* Phone Number */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={formData.buyers_phone_number}
                onChangeText={(text) => setFormData({ ...formData, buyers_phone_number: text })}
                placeholder="Enter your phone number"
                keyboardType="phone-pad"
              />
            </View>

            {/* Delivery Address */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Delivery Address</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.delivery_address}
                onChangeText={(text) => setFormData({ ...formData, delivery_address : text })}
                placeholder="Enter delivery address"
                multiline
                numberOfLines={3}
              /></View>
               <View style={styles.formGroup}>
               <Text style={styles.label}>Delivery City</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.delivery_city}
                onChangeText={(text) => setFormData({ ...formData, delivery_city : text })}
                placeholder="Enter city"
                numberOfLines={3}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Pin Code</Text>
              <TextInput
                style={styles.input}
                value={formData.delivery_address_zip}
                onChangeText={(text) => setFormData({ ...formData, delivery_address_zip: text })}
                placeholder="Enter the pincode"
                keyboardType="phone-pad"
              />
            </View>

            {/* Delivery Date */}
            {/* <View style={styles.formGroup}>
              <Text style={styles.label}>Delivery Date</Text>
              <TouchableOpacity 
                style={styles.dateSelector}
                onPress={() => setShowDatePicker(true)}
              >
                <Text>{deliveryDate.toLocaleDateString()}</Text>
                <Feather name="calendar" size={20} color="#666" />
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={deliveryDate}
                  mode="date"
                  minimumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDeliveryDate(selectedDate);
                  }}
                />
              )}
            </View> */}

            {/* Delivery Mode */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>Delivery Mode</Text>
              <View style={styles.deliveryModeContainer}>
                <TouchableOpacity 
                  style={[
                    styles.deliveryModeButton,
                    deliveryMode === 'standard' && styles.deliveryModeActive
                  ]}
                  onPress={(text) => setFormData({ ...formData, mode_of_delivery: text })}
                >
                  <Text style={[
                    styles.deliveryModeText,
                    deliveryMode === 'standard' && styles.deliveryModeTextActive
                  ]}>Standard</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[
                    styles.deliveryModeButton,
                    deliveryMode === 'express' && styles.deliveryModeActive
                  ]}
                  onPress={(text) => setFormData({ ...formData, mode_of_delivery: text })}
                >
                  <Text style={[
                    styles.deliveryModeText,
                    deliveryMode === 'express' && styles.deliveryModeTextActive
                  ]}>Express</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>aa
        {/* Create Order Button */}
        <View style={styles.bottomContainer}>
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>₹{productRate * formData.quantity_in_kg}</Text>
          </View>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateOrder}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.createButtonText}>Create Order</Text>
            )}
          </TouchableOpacity>
        </View>
        {/* Status Modals */}
        <StatusModal 
          visible={showSuccessModal} 
          onClose={() => {
            setShowSuccessModal(false);
            navigation.navigate('ProductDetails'); // Navigate to orders screen
          }}
          success={true}
        />
        <StatusModal 
          visible={showErrorModal} 
          onClose={() => setShowErrorModal(false)}
          success={false}
        />
      </SafeAreaView></GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor:'white'
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  scrollView: {
    flex: 1,
  },
  productSummary: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor:'white'
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f5f5f5',
  },
  productInfo: {
    marginLeft: 16,
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F9461',
  },
  form: {
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor:'white'
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    backgroundColor:'white'
  },
  quantityButton: {
    padding: 4,
    backgroundColor:'#F4CE14',
    borderRadius:8
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 16,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    backgroundColor:'white'
  },
  deliveryModeContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  deliveryModeButton: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
  },
  deliveryModeActive: {
    backgroundColor: '#F4CE14',
  },
  deliveryModeText: {
    color: '#666',
  },
  deliveryModeTextActive: {
    color: '#fff',
  },
  bottomContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2F9461',
  },
  createButton: {
    paddingVertical: 12,
    paddingHorizontal:20,
    borderRadius: 8,
    alignSelf:'center',
    justifyContent: 'flex-start',
    backgroundColor:'#3B82F6'
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
    
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BuyOrder;