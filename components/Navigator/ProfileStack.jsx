import { View, Text } from 'react-native'
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeScreen from '../WelcomeScreen';
import SignUpScreen from '../SignupScreen';
import LoginScreen from '../LoginScreen';
import OtpScreen from '../OtpScreen';
import HomeScreen from '../HomeScreen/HomeScreen';
import AuthStack from './AuthStack';
//screens


import ProfileScreen from "./../ProfileScreen/ProfileScreen";
import UpdatePhoneNumber from './../ProfileScreen/UpdatePhoneNumber';
const Stack=createStackNavigator();
export default function ProfileStack() {
  return (
    <GluestackUIProvider mode="light"><Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="UpdatePhoneNumber" component={UpdatePhoneNumber}/>
        <Stack.Screen name="otpScreen" component={OtpScreen}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="AuthStack" component={AuthStack}/>
        <Stack.Screen name="OTPVerification" component={OtpScreen}/>
      </Stack.Navigator></GluestackUIProvider>
  );
}