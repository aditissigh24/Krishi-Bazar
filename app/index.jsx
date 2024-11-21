import { Redirect} from "expo-router";
import  { GestureHandlerRootView } from 'react-native-gesture-handler';

import "./../global.css";
import { GluestackUIProvider } from "../components/UI/gluestack-ui-provider";

import React, { useState, useEffect } from 'react';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading';
import { Text, View } from "react-native";
import RootTabs from "../components/Navigator/RootTabs";
import AuthStack from '../components/Navigator/AuthStack';
import OtpScreen from "@/components/OtpScreen";



export default function Index() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      setIsAuthenticated(!!token); // Set to true if token exists
    };
    checkAuth();
  }, []);

     return (
      
       <GluestackUIProvider mode="light"><NavigationIndependentTree>
           <RootTabs/>
       </NavigationIndependentTree></GluestackUIProvider>
       
     );
}


//<RootLayout/>



//<Redirect href='/tabs/home'/>
    
    
  
