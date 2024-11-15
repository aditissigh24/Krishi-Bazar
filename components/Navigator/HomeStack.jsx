import { View, Text } from 'react-native'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//screens
import HomeScreen from "./../HomeScreen/HomeScreen";
import ExploreScreen from './../ExploreScreen/ExploreScreen';
import ProfileScreen from "./../ProfileScreen/ProfileScreen";
import ProfileStack from './ProfileStack';
import ViewOrders from './../HomeScreen/ViewOrders'
const Stack=createStackNavigator();
export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Explore" component={ExploreScreen}/>
    <Stack.Screen name="Profile" component={ProfileScreen}/>
    <Stack.Screen name="ViewOrders" component={ViewOrders}/>
</Stack.Navigator>
  )
}