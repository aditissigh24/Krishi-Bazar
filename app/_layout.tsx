import { Stack } from "expo-router";
import React, { useState } from 'react';
//React Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//Screens
import WelcomeScreen from './../components/WelcomeScreen';
import LoginScreen from "@/components/LoginScreen";
import SignUpScreen from "@/components/SignupScreen";
import TabLayout from './tabs/_layout';
//const Stack = createNativeStackNavigator();
export default function RootLayout() {
  
//const [isAuthenticated, setIsAuthenticated] = useState(false);
  return ( 
   // <NavigationContainer>
    //  <Stack.Navigator screenOptions={{headerShown:false}}>
        
         //   <Stack.Screen name="Welcome" component={WelcomeScreen}/> 
         //   <Stack.Screen name="SignUp"  component={SignUpScreen}/>
          //  <Stack.Screen name="Login"  component={LoginScreen}/>
                
            
          
       // </Stack.Navigator>
       // </NavigationContainer>
        
  //);
    <Stack screenOptions={{headerShown:false}}>
     <Stack.Screen name="tabs"/>
    </Stack>)
  //<WelcomeScreen></WelcomeScreen>
    //<LoginScreen></LoginScreen>
  
}
