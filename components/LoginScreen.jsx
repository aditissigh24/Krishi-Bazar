import React, { useState } from 'react';
import { View, Text, TextInput,Platform, StatusBar, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aadhar, setAadhar]= useState('');
  const flow = 'login';

  
  const validatePhoneNumber = (number) => {
    const phoneRegex = /^[0-9]\d{9}$/;
    return phoneRegex.test(number.trim());
  };

  const handlesendOTP = async() => {
    if (!validatePhoneNumber(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid phone number');
      return;
    }
     //Implement OTP sending logic here
   setLoading(true);
   try{
    const requestBody={
      phone_number: phoneNumber,
      aadhar_number: aadhar,
    };
    
    const response = await fetch('http://krishi-bazar.onrender.com/api/auth/login', {
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
      await AsyncStorage.setItem('logindata', JSON.stringify(requestBody));
     
      navigation.navigate('OTPVerification', { phoneNumber,aadhar, flow  });
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

  //const verifyOTP = async () => {
   // try {
      //if (otp.length === 6) {
        //await AsyncStorage.setItem('isAuthenticated', 'true');
       // navigation.replace('MainScreen');
      //} else {
       // Alert.alert('Error', 'Invalid OTP');
     // }
    //} catch (error) {
     // Alert.alert('Error', 'Verification failed');
    //}
  //};

  return (
   <ImageBackground source={require('./../assets/images/BG14.jpg')} style={styles.bgimage}>
     <View>
      <Text style={styles.title}>Login</Text>
     </View>
     <View style={styles.container}>
      
        <Text style={styles.wmtext}>Welcome Back!</Text>
        <Text style={styles.lgtext}>Login to your account</Text>
       <TextInput style={styles.input} placeholder='Phone-number' value={phoneNumber} onChangeText={setPhoneNumber}/>
       <TextInput style={styles.input} placeholder='Aadhar no.' value={aadhar} onChangeText={setAadhar}/>
       <TouchableOpacity style={styles.button} onPress={() => navigation.replace('RootTabs')} disabled={loading}>
        <Text style={styles.buttonText}>Get OTP</Text>
       </TouchableOpacity>
       <View style={styles.subcontainer}>
        <Text style={{fontSize:17}}>Don't have an account? <Text onPress={()=> navigation.navigate('SignUp')} style={{color:'#196f3d', fontSize:17,fontWeight:'bold'}}>SignUp</Text></Text>
       </View>
     </View>

   </ImageBackground>
  );
};

const styles = StyleSheet.create({
  bgimage:{
    flex:1
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
    fontSize: 45,
    alignSelf:'center',
    fontWeight: 'bold',
    paddingTop:120,
    marginBottom: 40,
    color:'#fbfcfc'
  },
  wmtext:{
    fontSize:35,
    color:"#873600",
    fontWeight:'bold'
  },
  lgtext:{
    fontSize:19,
    fontWeight:'bold',
    color:'#873600',
    marginBottom:30
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
    marginBottom: 15,
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

export default LoginScreen;
