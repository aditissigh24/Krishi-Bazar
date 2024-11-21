import React, { useState } from 'react';
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import { useNavigation } from '@react-navigation/native';

const UpdatePhoneNumber = ({ visible, setVisible,navigation, setAadhar}) => {
  
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
 // const navigation = useNavigation();
  const handleCancel = () => {
    setNewPhoneNumber(''); // Clear the phone number input
    setVisible(false); // Close the modal
  };
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]\d{9}$/;
    return phoneRegex.test(number.trim());
  };
  const handleUpdatePhoneNumber = async() => {
    if (!validatePhoneNumber(newPhoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      return;
    }
     //Implement OTP sending logic here
   setLoading(true);
   try{
    const requestBody={
      phone_number: newPhoneNumber,
      aadhar_number: aadhar,
    };
    
    const response = await fetch('https://krishi-bazar.onrender.com/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify( requestBody ),
    });
    const data = await response.json();
    if (response.ok) {
      Alert.alert('OTP Sent', 'Please check your phone for the OTP');
      await AsyncStorage.setItem('logindata', JSON.stringify(requestBody));
     console.log(response);
      navigation.navigate('OTPVerification', { phoneNumber,aadhar, flow  });
    }
       else {
      console.log(data)
      Alert.alert('Error', data.message || 'Failed to send OTP');
    }}
  catch (error) {
    console.log("Network error:", error);
    Alert.alert('Error', 'Network error. Please try again.');
  } finally {
    setLoading(false);
   }
  };

  
  return (
    <>
     

      <Modal visible={visible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Update Phone Number</Text>
            <View style={styles.inputContainer}>
              <Icon name="phone" size={24} color="#6B7280" />
              <TextInput
                style={styles.input}
                placeholder="Enter new phone number"
                keyboardType="phone-pad"
                value={newPhoneNumber}
                onChangeText={setNewPhoneNumber}
              />
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={handleUpdatePhoneNumber}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: '#3B82F6',
    fontSize: 16,
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1F2937',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
  },
  cancelButton: {
    marginRight: 12,
    backgroundColor: '#E5E7EB',
  },
});

export default UpdatePhoneNumber;