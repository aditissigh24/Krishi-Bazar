import { View,
   Text,
   StyleSheet,
   TouchableOpacity,
   Dimensions,
   StatusBar,
  ScrollView,
SafeAreaView,
Image,Animated,
RefreshControl,
Platform , Easing
} from 'react-native'
import {LinearGradient} from 'expo-linear-gradient';

import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
const { width } = Dimensions.get('window');

export default function HomeScreen({navigation}) {
const [firstName, setfirstName]=useState('');
const [lastName, setlastName]=useState('');
const [isFarmer,setIsFarmer]=useState('');

const [loading, setLoading] = useState(true);
const [greeting, setGreeting] = useState('');

const [refreshing, setRefreshing] = useState(false);
const fadeAnim = useState(new Animated.Value(0))[0]; 
const slideAnim = new Animated.Value(-50);// Animation for fade-in effect

useEffect(() => {
  // Set greeting based on time of day
  const hour = new Date().getHours();
  if (hour < 12) setGreeting('Good Morning');
  else if (hour < 18) setGreeting('Good Afternoon');
  else setGreeting('Good Evening');
  Animated.parallel([
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }),
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }),
  ]).start();
}, []);
  
const [stats, setStats] = useState({
    totalProducts: 45,
    activeOrders: 12,
    totalEarnings: 2850
  });
 
 
  const quickActions = [
    { id: 1, title: 'Add Product', icon: 'plus-circle', screen: 'AddProduct' },
    { id: 2, title: 'Orders', icon: 'shopping-bag', screen: 'Orders' },
    { id: 3, title: 'Messages', icon: 'message-circle', screen: 'Messages' },
    { id: 4, title: 'Analytics', icon: 'bar-chart-2', screen: 'Analytics' },
  ];

useEffect(() => {
    // Fetch the user's name from AsyncStorage when the component mounts
    const loadUserData = async () => {
      try {
        const userDataJSON= await AsyncStorage.getItem('userData');
        
        if (userDataJSON) {
            const userData=JSON.parse(userDataJSON);
          console.log(userData)
            
            
          setfirstName(userData.first_name);
          setlastName(userData.last_name);
          setIsFarmer(userData.is_farmer? 'Farmer': 'Buyer') 
          
          
        }
      } catch (error) {
        console.error('Error fetching user name from AsyncStorage:', error);
      } finally {
        setLoading(false); // Hide loading indicator after fetching data 
      }
    };

    loadUserData();
  }, []);
  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.ease,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);
  /*const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      loadUserData();
      setRefreshing(false);
    }, 1500);
  }, []);*/
  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" />; // Show a loading indicator while data is being fetched
  }
 
 // const { width } = Dimensions.get('window');
  //const buttonWidth = (width - 48 - 16) / 2; 

  const menuItems = [
    {
      title: 'View Orders',
      icon: 'package',
      screen: 'ViewOrders',
      description: 'View your previous Orders',
      badge: `${stats.totalProducts} Items`
    },
    {
      title: 'View Products',
      icon: 'shopping-cart',
      screen: 'Explore',
      description: 'View and order Products',
      badge: `${stats.activeOrders} Active`
    },
    {
      title: 'Zari Products',
      icon: 'trending-up',
      screen: 'ZariProducts',
      category:'Zari',
      description: 'Explore items made with zari'
    },
    {
      title: 'Mushroom Products',
      icon: 'users',
      screen: 'MushroomProducts',
      category:'Mushroom',
      description: 'Explore Mushrooms'
    },
    {title: 'Manage Products',
      icon: 'settings',
      screen: 'ManageProducts',
      description: 'view and manage products'
    }
  ];



  // Helper function to chunk array into pairs
  const chunk = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }
  const handleButtonPress = (screen) => {
 
      navigation.navigate(screen);
    
  };
  


  return (
    <LinearGradient
    colors={['#FAF6E3', '#F5F5F5']}
    style={styles.container}
  >
    <GluestackUIProvider mode="light">
       <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }] } >
        
        <StatusBar barStyle="dark-content" />
        <View style={styles.header}>
          <Text style={styles.greeting}>{greeting}</Text>
          <Text style={styles.name}>Aditi Singh</Text>
          
            <View style={styles.farmerBadge}>
              <Icon name="award" size={16} color="#2E7D32" />
              <Text style={styles.farmerText}>Verified Farmer</Text>
            </View>
          
        </View>
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('ProfileTab')}
        >
          <LinearGradient
            colors={['#088395', '#088395']}
            style={styles.profileGradient}
          >
            <Icon name="user" size={20} color="white" />
            <Text style={styles.profileButtonText}>View Profile</Text>
          </LinearGradient>
        </TouchableOpacity>
        {/* Navigation Buttons in Pairs */}
        
        
        <ScrollView style={styles.menuGrid}>
          {chunk(menuItems, 2).map((pair, rowIndex) => (
            <View key={rowIndex} style={styles.menuRow}>
              {pair.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleButtonPress(item.screen)}
                >
                  <LinearGradient
                    colors={['#579BB1', '#BAD7E9']}
                    style={styles.menuItemGradient}
                  >
                    <Icon name={item.icon} size={24} color="white" />
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          ))}

        </ScrollView>
        
        </Animated.View></GluestackUIProvider>
        </LinearGradient>
  );
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:20,
      backgroundColor:'#F5F5F5'
    },
    content:{
      flex:1
    },
    header:{
      marginTop:40,
      marginBottom:30
    },
    greeting: {
      fontSize: 26,
      fontWeight: '600',
      color: '#323232',
      marginBottom: 8,
      
    },
    name: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#062C30',
      marginBottom: 12,
    },
    farmerBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E8F5E9',
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
      alignSelf: 'flex-start',
    },
    farmerText: {
      marginLeft: 8,
      color: '#2E7D32',
      fontWeight: '600',
    },
    profileButton: {
      marginBottom: 30,
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 3,
    },
    profileGradient: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    profileButtonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
    },
    menuGrid: {
      flex: 1,
    },
    menuRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    menuItem: {
      flex: 1,
      marginHorizontal: 8,
      borderRadius: 12,
      overflow: 'hidden',
      elevation: 3,
    },
    menuItemGradient: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      aspectRatio: 1,
    },
    menuItemText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
      marginTop: 8,
      textAlign: 'center',
    },
   
  })