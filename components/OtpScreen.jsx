
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
    const [timer, setTimer] = useState(1.5*60);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const requestBody=route?.params.requestBody;
    const flow = route?.params?.flow;
    const email = route?.params?.email;
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
            console.log("retrieved data:", storedData)
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
        setTimer(1.5*60);
        try {
          const response = await fetch('http://krishi-bazar.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, aadhar_number: aadhar }),
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
        console.log('userData in handleVerifyOTP:', userData);
        // Additional pre-verification checks
        if (flow === 'signup' && (!userData)) {
          console.log(userData)
          
          Alert.alert('Error', 'Missing user data. Please restart the signup process.');
          return;
        }
      
        if (flow === 'login' && (!email || !aadhar)) {
          Alert.alert('Error', 'Missing required information for login verification.');
          return;
        }
      
        setLoading(true);
      
        try {
          const endpoint =
            flow === 'signup'
              ? 'https://krishi-bazar.onrender.com/api/auth/complete-signup'
              : 'https://krishi-bazar.onrender.com/api/auth/complete-login';
      
          const RequestBody =
            flow === 'signup'
              ? { 
                  user: requestBody,
                  verification_code: otp 
                  
                }
              : { 
                  email: email, 
                  aadhar_number: aadhar, 
                  verification_code: otp 
                };
      
          const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(RequestBody),
           // timeout: 10000 // 10-second timeout
          });
      
          if (!response.ok) {
            console.log(response)
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
            
          } catch (storageError) {
            console.error('Storage error:', storageError);
            Alert.alert('Storage Error', 'Could not save user data. Please try again.');
            return;
          }
      
          // Clear sensitive data
          resetSensitiveState();
      
          navigation.navigate('RootTab', { screen: 'HomeTab' });
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
      <GluestackUIProvider mode="light">
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Verify Your Account</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to your email
          </Text>
        </View>

        <View style={styles.otpContainer}>
         
        <OTPInput placeholder='Enter the code' value={otp} onChange={setOtp} keyboardType='number-pad' maxLength={6} style={styles.otpInput}/>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={[
            styles.button, 
            (loading || otp.length !== 6) && styles.buttonDisabled
          ]}
          onPress={handleVerifyOTP}
          disabled={loading || otp.length !== 6}
        >
          {loading ? (
            <ActivityIndicator 
              color="#ffffff" 
              size="small" 
            />
          ) : (
            <Text style={styles.buttonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          {!canResend ? (
            <Text style={styles.timerText}>
              Resend OTP in {timer}s
            </Text>
          ) : (
            <TouchableOpacity 
              onPress={handleResendOTP} 
              style={styles.resendButton}
            >
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  otpContainer: {
    marginBottom: 20,
    flexDirection:"row",
    alignSelf:'center'
  },
  otpInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    width: 50,
    height: 45,
    borderColor: '#e0e0e0',
    borderRadius: 10,
    marginRight:5,
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  otpText: {
    fontSize: 18,
    textAlign: 'center',
  },
  errorText: {
    color: '#ff4d4f',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#0096FF',
    borderRadius: 8,
    padding:12,
    width:150,
    alignSelf:"center",
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
  resendContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  timerText: {
    color: '#666',
    fontSize: 16,
  },
  resendButton: {
    padding: 10,
  },
  resendText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});
