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
        duration: 300,
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
      badge: `${stats.totalProducts} Items`,
      color:'#FF9900'
    },
    {
      title: 'View Products',
      icon: 'shopping-cart',
      screen: 'ExploreTab',
      description: 'View and order Products',
      badge: `${stats.activeOrders} Active`,
      color:'#FFCC00'
    },
    {
      title: 'Zari Products',
      icon: 'trending-up',
      screen: 'ZariProducts',
      category:'Zari',
      description: 'Explore items made with zari',
      color:'#990033'
    },
    {
      title: 'Mushroom Products',
      icon: 'users',
      screen: 'MushroomProducts',
      category:'Mushroom',
      description: 'Explore Mushrooms',
      color:'#6600CC'
    },
    {title: 'Manage Products',
      icon: 'settings',
      screen: 'ManageProducts',
      description: 'view and manage products',
      color:'#009933'
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
    
  
    <GluestackUIProvider mode="light">
       <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }] } >
        
        <StatusBar barStyle='light-content' />
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back! </Text>
          
          <View style={styles.card}>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          
            <View style={styles.farmerBadge}>
              <Icon name="award" size={16} color="#2E7D32" />
              <Text style={styles.farmerText}>Verified {isFarmer}</Text>
              </View>
            
          
        
        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('ProfileTab')}
        >
          
            <Icon name="user" size={20} color="#1F75FE" />
            <Text style={styles.profileButtonText}>View Profile</Text>
          
        </TouchableOpacity></View></View>
        {/* Navigation Buttons in Pairs */}
        
        
        <View style={styles.menuGrid}>
          {chunk(menuItems, 2).map((pair, rowIndex) => (
            <View key={rowIndex} style={styles.menuRow}>
              {pair.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.menuItem}
                  onPress={() => handleButtonPress(item.screen)}
                >
                  <LinearGradient
                    colors={['#1F2833', '#1f2833']}
                    style={styles.menuItemGradient}
                  >
                    <Icon name={item.icon} size={24} color="white" />
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          ))}

        </View>
        
        </Animated.View></GluestackUIProvider>
        
  );
}
const styles = StyleSheet.create({
    container:{
      backgroundColor:'#f5f5f5'
    },
    content:{
      flex:1
    },
    header:{
      margin:10,
      marginTop:150,
      padding:6,
      marginBottom:90
    },
    greeting: {
      fontSize: 28,
      fontWeight: '600',
      color: 'black',
      marginBottom:16,
      marginLeft:10
    },
    card: {
      backgroundColor: '#0A71EB',
      padding: 10,
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
    name: {
      fontSize: 22,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 3,
      marginLeft:20
    },
    farmerBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#E8F5E9',
      paddingVertical: 2,
      paddingHorizontal: 6,
      borderRadius: 20,
      alignSelf: 'flex-start',
      marginBottom:10,
      marginLeft:16
    },
    farmerText: {
      marginLeft: 8,
      color: '#2E7D32',
      fontWeight: '600',
    },
    profileButton: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 11,
    flexDirection:'row',
    alignItems:'center',
    alignSelf:'flex-start',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 6,
    marginLeft:20
    },
    
    profileButtonText: {
      color: '#0A71EB',
      fontSize: 16,
      fontWeight: '600',
      marginLeft:10
    },
    menuGrid: {
      flex: 1,
      margin:20
    },
    menuRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 18,
    },
    menuItem: {
      marginHorizontal: 10,
      borderRadius: 10,
      overflow: 'hidden',
      elevation: 3,
      height:70,
      width:'45%'
    },
    menuItemGradient: {
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      //aspectRatio: 1,
    },
    menuItemText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
     // marginTop: 8,
      textAlign: 'center',
      marginBottom:10
      
    },
   
  })