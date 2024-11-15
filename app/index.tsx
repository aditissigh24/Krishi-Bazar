import { Redirect} from "expo-router";

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading';
import { Text, View } from "react-native";
import RootTabs from "../components/Navigator/RootTabs";
import AuthStack from '../components/Navigator/AuthStack';



export default function Index() {
  const [isauthorized, setIsAuthorized]=useState(true);
     return(
    
      <NavigationContainer independent={true}>
        <RootTabs/>
        
        
      </NavigationContainer>
    
    
   
  );
}

     
        //<RootLayout/>
      
    
      
     //<Redirect href='/tabs/home'/>
    
    
  
