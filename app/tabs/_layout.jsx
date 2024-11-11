import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from './../../constants/Colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import Explore from './explore';
import Profile from './profile';
const Tab = createBottomTabNavigator();
export default function TabLayout
() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:Colors.PRIMARY
      }}>
        <Tab.Screen name='Home' component={Home}
        options={{
          tabBarLabel:'Home',
          tabBarIcon:({color})=><Ionicons name="home-sharp" size={24} color={color} />}}/>
        <Tab.Screen name='explore' component={Explore}
        options={{
          tabBarLabel:'Explore',
          tabBarIcon:({color})=><AntDesign name="appstore1" size={24} color={color} />}}/>
        <Tab.Screen name='profile' component={Profile}
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="person-sharp" size={24} color={color} />}}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})