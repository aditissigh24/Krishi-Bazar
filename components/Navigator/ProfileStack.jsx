import { View, Text } from 'react-native'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//screens


import ProfileScreen from "./../ProfileScreen/ProfileScreen";
import UpdatePhoneNumber from './../ProfileScreen/UpdatePhoneNumber';
const Stack=createStackNavigator();
export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Profile" component={ProfileScreen}/>
    <Stack.Screen name="UpdatePhoneNumber" component={UpdatePhoneNumber}/>
    
</Stack.Navigator>
  )
}