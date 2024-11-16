import { View, Text } from 'react-native'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//screens


import ExploreScreen from './../ExploreScreen/ExploreScreen';
import ProductDetails from './../ExploreScreen/ProductDetails';
import CreateOrder from './../ExploreScreen/CreateOrder';
const Stack=createStackNavigator();
export default function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Explore" component={ExploreScreen}/>
    <Stack.Screen name="ProductDetails" component={ProductDetails}/>
    <Stack.Screen name="CreateOrder" component={CreateOrder}/>
    
</Stack.Navigator>
  )
}