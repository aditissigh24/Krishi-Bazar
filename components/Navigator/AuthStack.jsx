import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//screens
import WelcomeScreen from '../WelcomeScreen';
import LoginScreen from '../LoginScreen';
import SignupScreen from '../SignupScreen';
import OtpScreen from '../OtpScreen';

const Stack= createStackNavigator();
export default  function AuthStack() {
    return(
        
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Welcome" component={WelcomeScreen}/>
                <Stack.Screen name="SignUp" component={SignupScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen name="OTPVerification" component={OtpScreen}/>
            </Stack.Navigator>
        
    )
}