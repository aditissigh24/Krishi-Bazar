import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, Platform, ScrollView, Switch, KeyboardAvoidingView, ImageBackground, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LinearGradient} from 'react-native-linear-gradient'

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

      
      const response = await fetch('http://krishi-bazar.onrender.com/api/auth/signup', {
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
    <ImageBackground source={require('./../assets/images/BG14.jpg')} style={styles.bgimage}> 
     <View>
      <Text style={styles.title}>Signup</Text>
     </View>
     <View style={styles.container}>
      
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
       <View style={{flexDirection: 'row', alignSelf:'baseline',alignItems:"center", paddingLeft:50}}>
        <Text style={styles.farmertext}>Are you a farmer?</Text>
        <Switch trackColor={{ false: '#767577', true: '#196f3d' }} 
                value={isFarmer} 
                onValueChange={setIsFarmer}
               />
       </View>
       <TouchableOpacity style={styles.button} onPress={handleSignUpAndSendOtp} disabled={loading}> 
        <Text style={styles.buttonText}>Sign Up!</Text>
       </TouchableOpacity>
       <View style={styles.subcontainer}>
        <Text style={{fontSize:17}}>Already have an account? <Text onPress={()=> navigation.navigate('Login')} style={{color:'#196f3d', fontSize:17,fontWeight:'bold'}}>Login</Text></Text>
        
       </View>
       </View>
       
      </ImageBackground>
      
  );
};

const styles = StyleSheet.create({
  bgimage:{
    flex:1,
    
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    height:70,
    width:'100%',
    paddingTop:  Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#f5f5dc',
    borderTopLeftRadius:130,
  },
  title: {
    fontSize: 40,
    alignSelf:'center',
    fontWeight: 'bold',
    paddingTop:40,
    marginBottom: 35,
    color:'#fbfcfc'
  },
  gradient: {
    flex: 1,
  },
  inputcontainer:{
    width:'100%'
  },
  input: {
    height: 50,
    width: '80%',
    borderWidth: 3,
    borderColor: '#196f3d',
    backgroundColor:'#fcf3cf',
    borderRadius: 100,
    paddingHorizontal: 20,
    marginTop:5,
    marginBottom: 5,
  },
  togglecontainer:{
    flexDirection: 'row',
    alignSelf:'left',
     alignItems: 'center',

     marginBottom: 15
 },
 
 farmertext:{
  fontSize:18,
  marginRight:90,
  fontWeight:'bold'
  
 },
  button: {
    width: 150,
    height: 50,
    backgroundColor: '#d4ac0d',
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10
  },
  buttonText: {
    color: '#fbfcfc',
    fontSize: 16,
    fontWeight: '600',
  },
  subcontainer:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'center'
  }
});

