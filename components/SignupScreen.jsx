import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen  ({navigation})  {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName]=useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadhar, setAadhar]= useState('');
  const [email, setemail]= useState('');
  const [isFarmer, setIsFarmer]=useState('');
  const [address, setAddress]=useState('');
  const [city, setCity]=useState('');
  const [state, setState]=useState('');
  const [pincode, setPincode]=useState('');
  const [farmsize, setFarmsize]=useState('');
  const [loading, setLoading] = useState(false);
  
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]\d{9}$/;
    return phoneRegex.test(number.trim());
  };
  const handleSendOTP = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      return;
    }
    setLoading(true);
    try {
      const requestBody = {
        first_name: FirstName,
        last_name: LastName,
        aadhar_number: aadhar,
        email: email,
        phone_number: phoneNumber,
        is_farmer: isFarmer,
        address: address,
        city: city,
        state: state,
        pin_code: pincode,
        farm_size: farmsize
        
      };

      
      const response = await fetch('http://krishi-bazar.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestBody }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store phone number temporarily
        Alert.alert('OTP Sent', 'Please check your phone for the OTP');
        await AsyncStorage.setItem('tempPhone', phoneNumber);
        navigation.navigate('OTPVerification', { phoneNumber });
      } else {
        console.log(data)
        Alert.alert('Error', data.message || 'Failed to send OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };




  const handleSignUp = async () => {
    if (!FirstName || !phoneNumber || !LastName || !aadhar ||!email ||!isFarmer ||!address ||!city ||!state ||!pincode ||!farmsize) {
     Alert.alert('Error', 'Please fill in all fields');
      return;
    }};

 const handleSignUpAndSendOtp = async () => {
      await handleSignUp(); // Call the handleSignUp function
     await handleSendOTP(); // Call the handleSendOtp function
    };

    //try {
     // await AsyncStorage.setItem('user', JSON.stringify({ name, phone }));
     // await AsyncStorage.setItem('isAuthenticated', 'true');
    //  navigation.replace('MainScreen');
   // } catch (error) {
     // Alert.alert('Error', 'Failed to create account');
   // }
  //};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={FirstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={LastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCompleteType='tel'
      />
      <TextInput
        style={styles.input}
        placeholder="Aadhar Number"
        value={aadhar}
        onChangeText={setAadhar}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setemail}
      />
      <Text>Are youu a farmer?</Text>
      <TextInput
        style={styles.input}
        placeholder="yes or no"
        value={isFarmer}
        onChangeText={setIsFarmer}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        value={pincode}
        onChangeText={setPincode}
      />
      <TextInput
        style={styles.input}
        placeholder="Farm-size"
        value={farmsize}
        onChangeText={setFarmsize}
      />


      <TouchableOpacity 
        style={styles.button}
        onPress={handleSendOTP}
        disabled={loading}
      >
        <Text style={styles.buttonText} > {loading ? 'Sending OTP...' : 'Send OTP'}</Text>
      </TouchableOpacity>
      <Text>Already have an account? <Text onPress={()=> navigation.navigate('Login')}>Login</Text></Text>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

