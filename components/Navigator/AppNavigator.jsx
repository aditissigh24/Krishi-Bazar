import React from "react";
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider"
import { createStackNavigator } from "@react-navigation/stack";
//screens
import Authstack from './AuthStack'
import RootTabs from './RootTabs'

const Stack= createStackNavigator();
export default  function AppNavigator() {
    return (
        <GluestackUIProvider mode="light">
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="AuthStack" component={Authstack}/>
                <Stack.Screen name="RootTabs" component={RootTabs}/>               
                {/* <Stack.Screen name="Home" component={HomeScreen}/> */}
            </Stack.Navigator>
        </GluestackUIProvider>
    );
}