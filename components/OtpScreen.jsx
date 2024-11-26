
import { StyleSheet,ActivityIndicator, Text, View, TextInput, TouchableOpacity,Alert } from 'react-native'
import "./../global.css";
import { GluestackUIProvider } from "./UI/gluestack-ui-provider";
import React, {useEffect, useState,useRef} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const OTP_LENGTH = 6;

const OTPInput = ({ value, onChange }) => {
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    const newValue = (typeof value === 'string' ? value : '').split('');
    newValue[index] = text;
    onChange(newValue.join(''));

    if (text.length === 1 && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <GluestackUIProvider mode="light"><View style={styles.otpContainer}>
        {[...Array(OTP_LENGTH)].map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="number-pad"
            onChangeText={(text) => handleChange(text, index)}
            value={value[index] || ''}
          />
        ))}
      </View></GluestackUIProvider>
  );
};
export default function OtpScreen({route, navigation}) {
  
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(2*60*60);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const requestBody=route?.params.requestBody;
    const flow = route?.params?.flow;
    const phoneNumber = route?.params?.phoneNumber;
    const aadhar = route?.params?.aadhar;
    
    const [userData, setUserData] = useState(null);
   
    useEffect(() => {
        let interval = null;
        if (timer > 0) {
          interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
          }, 1000);
        } else {
          setCanResend(true);
          clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [timer]);
      useEffect(() => {
        const getData = async () => {
          try {
            const storedData = await AsyncStorage.getItem('userData');
            if (storedData !== null) {
              // Parse the stored data
              setUserData(JSON.parse(storedData));
            
            }
          } catch (e) {
            console.error('Failed to fetch data from AsyncStorage', e);
          }
        };
        getData();
      }, []);
    
    const handleResendOTP = async () => {
        setCanResend(false);
        setTimer(2*60*60);
        try {
          const response = await fetch('http://krishi-bazar.onrender.com/api/auth/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ phoneNumber }),
          });
          
          if (!response.ok) {
            Alert.alert('Error', 'Failed to resend OTP');
          }
        } catch (error) {
          Alert.alert('Error', 'Network error. Please try again.');
        }
      };
    /*  const fetchWithTimeout = async (resource, options = {}, timeout = 50000) => {
        const controller = new AbortController();
        const signal = controller.signal;
        const id = setTimeout(() => controller.abort(), timeout);
      
        try {
          const response = await fetch(resource, { ...options, signal });
          clearTimeout(id);
          return response;
        } catch (err) {
          throw new Error('Request timed out or failed.');
        }
      };*/
      
      const handleVerifyOTP = async () => {
        // Enhanced input validation
        if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
          Alert.alert('Invalid OTP', 'Please enter a valid 6-digit numeric OTP');
          return;
        }
      
        // Additional pre-verification checks
        if (flow === 'signup' && (!userData || !userData.phone_number)) {
          Alert.alert('Error', 'Missing user data. Please restart the signup process.');
          return;
        }
      
        if (flow === 'login' && (!phoneNumber || !aadhar)) {
          Alert.alert('Error', 'Missing required information for login verification.');
          return;
        }
      
        setLoading(true);
      console.log(storedData)
        try {
          const endpoint =
            flow === 'signup'
              ? 'https://krishi-bazar.onrender.com/api/auth/complete-signup'
              : 'https://krishi-bazar.onrender.com/api/auth/complete-login';
      
          const requestBody =
            flow === 'signup'
              ? { 
                  user: requestBody,
                  verification_code: otp 
                  
                }
              : { 
                  phone_number: phoneNumber, 
                  aadhar_number: aadhar, 
                  verification_code: otp 
                };
      
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
           // timeout: 10000 // 10-second timeout
          });
      
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Verification failed');
          }
      
          const responseData = await response.json();
          const { token, user } = responseData;
      
          // Validate response data
          if (!token || !user) {
            throw new Error('Invalid server response');
          }
      
          // Secure storage with error handling
          try {
            await AsyncStorage.setItem('JwtToken', token);
            await AsyncStorage.setItem('userID', JSON.stringify(user));
            await AsyncStorage.removeItem('tempPhone');
          } catch (storageError) {
            console.error('Storage error:', storageError);
            Alert.alert('Storage Error', 'Could not save user data. Please try again.');
            return;
          }
      
          // Clear sensitive data
          resetSensitiveState();
      
          navigation.navigate('HomeTab');
        } catch (error) {
          console.error('Verification error:', error);
          
          // More informative error handling
          const errorMessage = 
            error.message.includes('Network') 
              ? 'Network error. Please check your internet connection.'
              : error.message || 'Verification failed. Please try again.';
          
          Alert.alert('Verification Failed', errorMessage);
        } finally {
          setLoading(false);
        }
      };
      
      // Helper function to reset sensitive state (suggested addition)
      const resetSensitiveState = () => {
        setOtp('');
       // setPhoneNumber('');
       // setAadhar('');
        setUserData(null);
      };
  
    return (
      <GluestackUIProvider mode="light"><View style={styles.container}>
          <Text style={styles.title}>Verify Your Account</Text>
          <Text style={styles.subtitle}>Enter the 6-digit code sent to  {phoneNumber} </Text>
          <OTPInput placeholder='Enter the code' value={otp} onChange={setOtp} keyboardType='number-pad' maxLength={6} style={styles.otpInput}/>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleVerifyOTP}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.buttonText}>Verify OTP</Text>
            )}
          </TouchableOpacity>
          <View style={styles.resendContainer}>
            {!canResend?(
              <Text>Resend OTP in {timer}s</Text>
            ):(
              <TouchableOpacity onPress={handleResendOTP} style={styles.resendButton}>
                <Text style={styles.resendText}> Resend OTP</Text>
              </TouchableOpacity>
            )}

          </View>
        </View></GluestackUIProvider>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 17,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 45,
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    marginBottom:10
  },
  buttonDisabled: {
    backgroundColor: '#bdc3c7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    marginBottom: 10,
  },
  resendButton: {
    marginTop: 20,
  },
  resendText: {
    color: '#3498db',
    fontSize: 16,
  },
});

