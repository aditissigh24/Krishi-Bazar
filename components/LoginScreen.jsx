
import React, { useState } from 'react';
import "./../global.css";
import { GluestackUIProvider } from "./UI/gluestack-ui-provider";
import { View, Text, TextInput,Platform, StatusBar, TouchableOpacity, StyleSheet, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aadhar, setAadhar]= useState('');
  const flow = 'login';

  
  

  const handlesendOTP = async() => {
   
     //Implement OTP sending logic here
   setLoading(true);
   try{
    const requestBody={
      email: email,
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
      navigation.navigate('OTPVerification', { email,aadhar, flow  });
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
    <GluestackUIProvider mode="light"><View  style={styles.container}>
        
        <View style={styles.content}>
         
           <Text style={styles.wmtext}>Welcome Back!</Text>
           <Text style={styles.lgtext}>Login to your account</Text>
          <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail}/>
          <TextInput style={styles.input} placeholder='Aadhar no.' value={aadhar} onChangeText={setAadhar}/>
         
          <TouchableOpacity style={styles.button} onPress={handlesendOTP} disabled={loading}>
           <Text style={styles.buttonText}>Get OTP</Text>
          </TouchableOpacity>
           </View>
          <View style={styles.subcontainer}>
           <Text style={styles.subtext}>Don't have an account? <Text onPress={()=> navigation.navigate('SignUp')} style={styles.signuptext}>SignUp</Text></Text>
          </View>
        
      </View></GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 12,
   marginTop:220,
    marginLeft:30,
    marginRight:30,
    marginBottom:20,
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
  title: {
    fontSize: 45,
    alignSelf:'center',
    fontWeight: 'bold',
    paddingTop:120,
    marginBottom: 40,
    color:'#333'
  },
  wmtext:{
    fontSize:35,
    color:"#333",
    fontWeight:'bold'
  },
  lgtext:{
    fontSize:19,
    fontWeight:'bold',
    color:'#666',
    marginBottom:30
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
  button: {
    paddingVertical: 12,
    paddingHorizontal:20,
    borderRadius: 5,
    alignSelf:'center',
    justifyContent: 'flex-start',
    backgroundColor:'#0096FF',
    marginBottom:10,
    marginTop:20
    
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
  },
  subtext:{
     fontSize:18,
    color:'#85929e'
  },
  signuptext:{
    color:'#0096FF',
    fontSize:18,
    fontWeight:'bold'
  }
});

export default LoginScreen;

