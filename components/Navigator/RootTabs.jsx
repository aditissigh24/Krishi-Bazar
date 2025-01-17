import { StyleSheet, Text, View, KeyboardAvoidingView,Platform } from 'react-native'
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

    <GluestackUIProvider mode="light">
      
      <View style={styles.container}> {/* Add background here */}
        <Tab.Navigator screenOptions={({route})=>({
        headerShown:false,
        tabBarInactiveTintColor:'#bf9819 ',
        tabBarActiveTintColor:'#0A71EB',
        tabBarHideOnKeyboard:true,
        tabBarStyle: {
          backgroundColor: 'white',
          //position:'absolute',
          //bottom:20,
          marginLeft:70,
          marginRight:70, // Tab bar background color
          height: 60, // Adjust the height as needed
          borderRadius:10,
          //marginBottom:40,
          //alignSelf:"center",
          elevation:7,
          
          
        },
        tabBarLabelStyle: {
          fontSize: 12, // Font size of labels
          fontWeight: '600', // Font weight of labels
          //color: '', // Label color
        },
        })}>
        <Tab.Screen name='HomeTab' component={HomeStack}
        options={{
          tabBarLabel:'Home',
          tabBarIcon:({color})=><Ionicons name="home-sharp" size={30} color={color} />}}/>
        <Tab.Screen name='ExploreTab' component={ExploreStack}
        options={{
          tabBarLabel:'Marketplace',
          tabBarIcon:({color})=><AntDesign name="appstore1" size={30} color={color} />}}/>
        <Tab.Screen name='ProfileTab' component={ProfileStack}
        options={{
          tabBarLabel:'Profile',
          tabBarIcon:({color})=><Ionicons name="person-sharp" size={30} color={color} />}}/>
     
      </Tab.Navigator>
      </View>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent:'center',
    //alignItems:'center',
    backgroundColor: '#f5f5f5', // Match app background to avoid visual artifacts
  },
})