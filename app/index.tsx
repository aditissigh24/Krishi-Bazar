import { Redirect} from "expo-router";

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from 'expo-app-loading';
import { Text, View } from "react-native";
import RootLayout from "./_layout";
import RootStack from './../components/Navigator/RootStack';
import OtpScreen from "@/components/OtpScreen";
import TabLayout from "./tabs/_layout";

export default function Index() {
     return(
    <NavigationContainer independent={true}>
    <RootStack/>
    </NavigationContainer>
  );
}

     
        //<RootLayout/>
      
    
      
     //<Redirect href='/tabs/home'/>
    
    
  
