import { View, Text,StyleSheet,TouchableOpacity,Dimensions,StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function HomeScreen({navigation}) {
const [firstName, setfirstName]=useState('');
const [lastName, setlastName]=useState('');
const [isFarmer,setIsFarmer]=useState('');
const [loading, setLoading] = useState(true);

 
useEffect(() => {
    // Fetch the user's name from AsyncStorage when the component mounts
    const fetchUserName = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON) {
            const userData=JSON.parse(userDataJSON);
          setfirstName(userData.first_name);
          setlastName(userData.last_name);
          setIsFarmer(userData.is_farmer? 'Farmer': 'Buyer') // Set the user's name
        }
      } catch (error) {
        console.error('Error fetching user name from AsyncStorage:', error);
      } finally {
        setLoading(false); // Hide loading indicator after fetching data
      }
    };

    fetchUserName();
  }, []);
  
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
 // const { width } = Dimensions.get('window');
  //const buttonWidth = (width - 48 - 16) / 2; 
  const menuItems = [
    { title: 'View Orders', icon: 'shopping-cart', color: '#1A1A1D', screen:'ViewOrders'}, 
    { title: 'View Products', icon: 'search', color: '#1A1A1D' , screen: 'Products'}, 
    { title: ' Zari Products', icon: 'bell', color: '#1A1A1D' , screen:'ExploreTab', category:'Zari'}, 
    { title: ' Mushroom Products', icon: 'bell', color: '#1A1A1D', screen: 'ExploreTab', category:'Mushroom' }, 
    { title: 'Manage Products', icon: 'settings', color: '#1A1A1D' , screen: 'manage products'},
  ];

  // Helper function to chunk array into pairs
  const chunk = (arr, size) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  }
  const handleButtonPress = (screen, category) => {
    if (screen === 'ExploreTab' && category) {
      navigation.navigate('ExploreTab', { category });
    } else {
      navigation.navigate(screen);
    }
  };
  


  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
    <View style={styles.subContainer1}>
     <Text style={styles.welcometext}>Welcome</Text>
   </View>
     <View style={styles.subContainer2}>
       <Text style={styles.text}>{firstName} {lastName}</Text>
       <Text style={styles.text}>{isFarmer}</Text>
       <View>
       <TouchableOpacity style={styles.button1}
                activeOpacity={0.7} onPress={()=> navigation.navigate('ProfileTab')}>
                  
                  <Text style={styles.buttonText} >View Profile</Text>
        </TouchableOpacity>
       </View>
       
     </View>
     
         {/* Navigation Buttons in Pairs */}
      <View style={styles.buttoncontainer}>
        {chunk(menuItems, 2).map((pair, rowIndex) => (
          <View key={rowIndex} style={styles.buttonRow}>
            {pair.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.button, { backgroundColor: item.color }]}
                activeOpacity={0.7}
                onPress={() => handleButtonPress(item.screen,item.category)}
              >
                <View style={styles.buttonContent}>
                  <Icon name={item.icon} size={24} color="white" />
                  <Text style={styles.buttonText}>{item.title}</Text>
                </View>
                <Icon name="chevron-right" size={20} color="white" />
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

     </View> 
   
  )
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      padding:15,
      backgroundColor:'#B59F78'
    },
    subContainer1:{
      marginTop:80,
      alignItems:'left',
      paddingleft:20
    },
    subContainer2:{
      backgroundColor:'#FAF6E3',
      height:130,
      width:'100%',
      marginTop:10,
      borderRadius:20,
      
    },
    buttoncontainer:{
      marginTop:60,
      gap:16
    },
    buttonRow: {
      flexDirection: 'row',
      gap: 16,
      justifyContent: 'flex-start',
    },
    button: {
      width: 195 ,
      height:120,
      padding: 8,
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      elevation: 2, // Android shadow
      shadowColor: '#000', // iOS shadow
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
    },
    buttonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    welcometext:{
      fontSize:40,
      color:'#1F2937',
      fontWeight:'bold'
  
    },
    text:{
        fontSize:17,
        fontWeight:'bold',
        paddingLeft:20

    },
    button1: {
      width: 150,
      height: 50,
      backgroundColor: '#2A3663',
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop:15,
      marginBottom:10,
      marginLeft:15
    },
  })