import React, { useState } from 'react';
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
//import { useNavigation } from '@react-navigation/native';

const UpdatePhoneNumber = ({ visible, setVisible,navigation }) => {
  
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
 // const navigation = useNavigation();
  const handleCancel = () => {
    setNewPhoneNumber(''); // Clear the phone number input
    setVisible(false); // Close the modal
  };

  const handleUpdatePhoneNumber = () => {
    // Implement logic to validate and update the phone number
    setVisible(false);
    /*navigation.navigate('AuthStack', {
      screen: 'OTPVerification',
      params: { phoneNumber: newPhoneNumber },
    });*/
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