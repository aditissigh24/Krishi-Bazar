import React, { useState } from 'react';
import "./../global.css";
import { GluestackUIProvider } from "./UI/gluestack-ui-provider";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, Platform, ScrollView, Switch, KeyboardAvoidingView, ImageBackground, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

export default function SignUpScreen  ({navigation})  {
  const [FirstName, setFirstName] = useState('');
  const [LastName, setLastName]=useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [aadhar, setAadhar]= useState('');
  const [email, setemail]= useState('');
  const [isFarmer, setIsFarmer]=useState(false);
  const [address, setAddress]=useState('');
  const [city, setCity]=useState('');
  const [state, setState]=useState('');
  const [pincode, setPincode]=useState('');
  const [farmsize, setFarmsize]=useState('');
  const [loading, setLoading] = useState(false);
  const flow='signup';
  
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

      
      const response = await fetch('https://krishi-bazar.onrender.com/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify( requestBody ),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Store phone number temporarily
        Alert.alert('OTP Sent', 'Please check your phone for the OTP');
        await AsyncStorage.setItem('userData', JSON.stringify(requestBody));
        
        navigation.navigate('OTPVerification', { requestBody, flow});
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
    if (!FirstName || !phoneNumber || !LastName || !aadhar ||!email ||!address ||!city ||!state ||!pincode ||!farmsize) {
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
    
    <GluestackUIProvider mode="light">
       
      <View style={styles.container}>
     
        <View style={styles.titleContainer}>
         <Text style={styles.title}>Register Now!</Text>
        </View>
        <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView>
        <View style={styles.inputContainer}>
         
         <TextInput style={styles.input} placeholder='FirstName' value={FirstName} onChangeText={setFirstName}/>
         <TextInput style={styles.input} placeholder='LastName' value={LastName} onChangeText={setLastName}/>
         <TextInput style={styles.input} placeholder='Phone-number' value={phoneNumber} onChangeText={setPhoneNumber}/>
         <TextInput style={styles.input} placeholder='E-mail' value={email} onChangeText={setemail}/>
         <TextInput style={styles.input} placeholder='Aadhar no.' value={aadhar} onChangeText={setAadhar}/>
         <TextInput style={styles.input} placeholder='Address' value={address} onChangeText={setAddress}/>
         <TextInput style={styles.input} placeholder='City' value={city} onChangeText={setCity}/>
         <TextInput style={styles.input} placeholder='State' value={state} onChangeText={setState}/>
         <TextInput style={styles.input} placeholder='Pincode' value={pincode} onChangeText={setPincode}/>
         <TextInput style={styles.input} placeholder='Farm size' value={farmsize} onChangeText={setFarmsize}/>
          <View style={styles.togglecontainer}>
           <Text style={styles.farmertext}>Are you a farmer?</Text>
           <Switch trackColor={{ false: '#767577', true: '#0096FF' }} 
                   value={isFarmer} 
                   onValueChange={(value) => setIsFarmer(value)}
                  />
          </View>
          </View>
          <View>
          <TouchableOpacity style={styles.button} onPress={handleSignUpAndSendOtp} disabled={loading}> 
           <Text style={styles.buttonText}>Sign Up!</Text>
          </TouchableOpacity>
          <View style={styles.subcontainer}>
           <Text style={styles.subtext}>Already have an account? 
            <Text onPress={()=> navigation.navigate('Login')} style={styles.logintext}>Login</Text>
          </Text>
           
          </View>
          </View>
          </ScrollView>
     </KeyboardAvoidingView>
     </View>
      </GluestackUIProvider>
      
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f5f5f5',
  },
  inputContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    margin:10,
    marginLeft:30,
    marginRight:30,
    padding: 13,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    alignItems:'center'
  },
  titleContainer:{
    alignItems:'center',
    marginTop:40
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color:'#333'
  },
    input: {
    height: 50,
    width: '80%',
    borderWidth: 1,
    borderColor: '#85929e',
    backgroundColor:'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    marginTop:8,
  },
  togglecontainer:{
    flexDirection: 'row',
     alignItems: 'center', 
 },
 
 farmertext:{
  fontSize:18,
  alignSelf:'center',
  fontWeight:'400',
  marginRight:65
  
 },
  button: {
    paddingVertical: 12,
    paddingHorizontal:20,
    borderRadius: 5,
    alignSelf:'center',
    justifyContent: 'flex-start',
    backgroundColor:'#0096FF',
    marginBottom:10
  },
  buttonText: {
    color: '#fbfcfc',
    fontSize: 18,
    fontWeight: '600',
  },
  subcontainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  },
  subtext:{
    fontSize:18,
    color:'#85929e' 
  },
  logintext:{
    color:'#0096FF',
    fontSize:18,
    fontWeight:'bold'
  }
});

