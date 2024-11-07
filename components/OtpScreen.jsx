import { StyleSheet, Text, View } from 'react-native'
import React, {useEffect, useState} from 'react'

export default function OtpScreen({route, navigation}) {
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);
    const [loading, setLoading] = useState(false);
    const { phoneNumber } = route.params;
    React.useEffect(() => {
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
    const handleResendOTP = async () => {
        setCanResend(false);
        setTimer(60);
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
    const handleVerifyOTP = async () => {
        if (otp.length !== 6) {
          Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP');
          return;
        }
        setLoading(true);
    try {
      const response = await fetch('http://krishi-bazar.onrender.com/api/auth/complete-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(data.user));
        await AsyncStorage.setItem('authToken', data.token);
        
        // Remove temporary phone storage
        await AsyncStorage.removeItem('tempPhone');
        
        // Navigate to home screen or complete profile screen
        navigation.replace('Home');
      } else {
        Alert.alert('Error', data.message || 'Invalid OTP');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the OTP sent to {phoneNumber}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChangeText={setOtp}
          keyboardType="number-pad"
          maxLength={6}
        />
        <TouchableOpacity 
          style={styles.button}
          onPress={handleVerifyOTP}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.resendContainer}>
          {!canResend ? (
            <Text>Resend OTP in {timer}s</Text>
          ) : (
            <TouchableOpacity onPress={handleResendOTP}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#fff',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
      },
      subtitle: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
        color: '#666',
      },
      input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        fontSize: 16,
      },
      button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      resendContainer: {
        marginTop: 20,
        alignItems: 'center',
      },
      resendText: {
        color: '#007AFF',
        fontSize: 16,
      },
    });
