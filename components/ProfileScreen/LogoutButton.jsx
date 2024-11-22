import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LogoutButton = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      // Remove stored tokens and user data
      await AsyncStorage.multiRemove(['JwtToken', 'user']);
      
      // Navigate to welcome/auth screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'AuthStack' }]
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <TouchableOpacity 
      onPress={handleLogout} 
      style={{
        padding: 10,
        backgroundColor: 'red',
        borderRadius: 5,
        alignItems: 'center'
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold' }}>
        Logout
      </Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;