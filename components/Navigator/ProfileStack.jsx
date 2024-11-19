import { View, Text } from 'react-native'
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//screens


import ProfileScreen from "./../ProfileScreen/ProfileScreen";
import UpdatePhoneNumber from './../ProfileScreen/UpdatePhoneNumber';
const Stack=createStackNavigator();
export default function ProfileStack() {
  return (
    <GluestackUIProvider mode="light"><Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Profile" component={ProfileScreen}/>
        <Stack.Screen name="UpdatePhoneNumber" component={UpdatePhoneNumber}/>
      </Stack.Navigator></GluestackUIProvider>
  );
}