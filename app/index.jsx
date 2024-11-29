import "./../global.css";
import { GluestackUIProvider } from "../components/UI/gluestack-ui-provider";
import React, { useState, useEffect } from 'react';
import { NavigationIndependentTree, KeyboardAvoidingView,Platform } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Text, View, SafeAreaView,StyleSheet } from "react-native";
import RootTabs from "../components/Navigator/RootTabs";
import AuthStack from '../components/Navigator/AuthStack';
import{AuthProvider,useAuth} from './../Store/AuthContext'
import OtpScreen from "@/components/OtpScreen";








export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('JwtToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

    
  if (isLoading) {
    return (
      <GluestackUIProvider mode="light">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Loading...</Text>
        </View>
      </GluestackUIProvider>
    );
  }

     return (
      <AuthProvider>
        <GluestackUIProvider mode="light">
        
         <View style={styles.container}>
       
        <NavigationIndependentTree>
       
        {isAuthenticated ? <RootTabs /> : <AuthStack />}
       </NavigationIndependentTree>
       </View>
       
       </GluestackUIProvider>
       
       </AuthProvider>
       
       
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
    });
    
    
