import { Redirect} from "expo-router";

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, View } from "react-native";
import RootLayout from "./_layout";
import RootStack from './../components/Navigator/RootStack';

export default function Index() {
  
 
     return(
    <NavigationContainer independent={true}>
    <RootStack/>
    </NavigationContainer>
  );
}

     
        //<RootLayout/>
      
    
      
     //<Redirect href='/tabs/home'/>
    
    
  
