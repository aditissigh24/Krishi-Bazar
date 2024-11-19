import { StyleSheet, Text, View } from 'react-native'
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from './../../constants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import ExploreStack from './ExploreStack'


const Tab = createBottomTabNavigator();
export default function RootTabs
() {
  return (
    <GluestackUIProvider mode="light"><Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:'#d4ac0d ',
        //tabBarInactiveTintColor:'#d4ac0d',
        tabBarStyle: {
          backgroundColor: 'white', // Tab bar background color
          height: 60, // Adjust the height as needed
        },
        }}>
        <Tab.Screen name='HomeTab' component={HomeStack}
        options={{
          //tabBarLabel:'Home',
          tabBarIcon:({color})=><Ionicons name="home-sharp" size={24} color={color} />}}/>
        <Tab.Screen name='ExploreTab' component={ExploreStack}
        options={{
          //tabBarLabel:'Explore',
          tabBarIcon:({color})=><AntDesign name="appstore1" size={24} color={color} />}}/>
        <Tab.Screen name='ProfileTab' component={ProfileStack}
        options={{
          //tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="person-sharp" size={24} color={color} />}}/>
      </Tab.Navigator></GluestackUIProvider>
  );
}

const styles = StyleSheet.create({})