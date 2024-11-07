import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Colors } from './../../constants/Colors';
export default function TabLayout
() {
  return (
    <Tabs screenOptions={{
      headerShown:false,
      tabBarActiveTintColor:Colors.PRIMARY
      }}>
        <Tabs.Screen name='home'
        options={{
          tabBarLabel:'Home',
          tabBarIcon:({color})=><Ionicons name="home-sharp" size={24} color={color} />}}/>
        <Tabs.Screen name='explore' 
        options={{
          tabBarLabel:'Explore',
          tabBarIcon:({color})=><AntDesign name="appstore1" size={24} color={color} />}}/>
        <Tabs.Screen name='profile' 
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="person-sharp" size={24} color={color} />}}/>
    </Tabs>
  )
}

const styles = StyleSheet.create({})