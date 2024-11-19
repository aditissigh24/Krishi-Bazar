import { View, Text } from 'react-native'
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
//screens


import ExploreScreen from './../ExploreScreen/ExploreScreen';
import ProductDetails from './../ExploreScreen/ProductDetails';
import BuyOrder from './../ExploreScreen/CreateOrder';
import Card from '../Card/Card';
const Stack=createStackNavigator();
export default function ProfileStack() {
  return (
    <GluestackUIProvider mode="light"><Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Explore" component={ExploreScreen}/>
        <Stack.Screen name="ProductDetails" component={ProductDetails}/>
        <Stack.Screen name="BuyOrder" component={BuyOrder}/>
        <Stack.Screen name="Card" component={Card}/>
      </Stack.Navigator></GluestackUIProvider>
  );
}