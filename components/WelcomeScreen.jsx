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
  ImageBackground
} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  return (
   
    <GluestackUIProvider mode="light">
      
      
        <StatusBar barStyle="dark-content" />
      
        <ImageBackground source={require('./../assets/images/White-oyster-3.png')} style={styles.container}>
          {/* Decorative Elements */}
          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />

          <View style={styles.contentContainer}>
            {/* Logo Container */}
            

            {/* Welcome Text */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome to Zari & Mushrooms</Text>
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
          </View></ImageBackground>
        
        
      </GluestackUIProvider>
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: height * 0.1,
    right: width * 0.1,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: height * 0.15,
    left: width * 0.1,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(251, 146, 60, 0.2)',
  },
  contentContainer: {
    width: width * 0.85,
    alignItems: 'center',
    paddingVertical: 20,
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FCD34D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoText: {
    fontSize: 50,
  },
  textContainer: {
    alignItems: 'center',
    marginTop:140,
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 18,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 30,
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
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});

export default WelcomeScreen;