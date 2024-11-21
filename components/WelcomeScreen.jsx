

import React from 'react';
import "./../global.css";
import { GluestackUIProvider } from "./UI/gluestack-ui-provider";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,ScrollView,
  ImageBackground,
  Image
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
   
    <GluestackUIProvider mode="light">
      
      
        <StatusBar barStyle="dark-content" />
      
        <View style={styles.container}>
          {/* Decorative Elements */}

          <View style={styles.contentContainer}>
            {/* image Container */}
            <View style={styles.imageContainer}>
              <Image source={require('./../assets/images/King-trumpet.png')} style={styles.Image}></Image>
            </View>

            {/* Welcome Text */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome to Krishi-Bazar</Text>
              
              <Text style={styles.subtitle}>
                Discover exquisite zari crafts and premium mushroom products from our community!
              </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => {navigation.navigate('SignUp')
                // Add your navigation logic here
                // navigation.navigate('Home');
              }}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>

            <Text style={styles.communityText}>
              Join our community of craft lovers and food enthusiasts
            </Text>
          </View>
          </View>
        
        
      </GluestackUIProvider>
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:"center",
    backgroundColor: '#f5f5f5',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  contentContainer: {
    width: width * 0.85,
    alignItems: 'center',
    //paddingVertical: 10,
  },
  imageContainer: {
    backgroundColor: 'white',
    marginTop: 130,
    marginBottom:70,
    
    height:320,
    width:360,
   
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  Image:{
    height:'100%',
    width:'100%',
    borderRadius: 12,
  },
  textContainer: {
    alignItems: 'center',
    alignSelf:'center',
    //backgroundColor:'yellow',
    margin:1
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#0096FF',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 20,
    marginTop:70
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  communityText: {
    fontSize: 16,
    color: '#85929e',
    textAlign: 'center',
  },
});

export default WelcomeScreen;