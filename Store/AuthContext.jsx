import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user_id, setUserID] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem('JwtToken');
      const storedUser = await AsyncStorage.getItem('userID');

      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUserID(JSON.parse(storedUser));
      }
    };

    fetchToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user_id, setUserID}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
