import { View, Text,TouchableOpacity,StyleSheet,Image,Alert } from 'react-native'
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import React,{useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdatePhoneNumber from './UpdatePhoneNumber';
import { ScrollView } from 'react-native-gesture-handler';

import {useAuth} from './../../Store/AuthContext'


export default function ProfileScreen({navigation}) {
  
  const [phoneNumber,setPhoneNumber]=useState('');
 
  const [isloading, setIsLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState([]);
 const [error, setError] = useState(null);
 const { token } = useAuth();
 const { setToken, setUserID } = useAuth();
  //const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM4MjQ1ODIsInVzZXJfaWQiOjEsInVzZXJfdHlwZSI6ImZhcm1lciJ9.3DCo4LmnbMGL3jS-SP2TmQkEKW8tkympsh8zwc25lzI';
  const toggleModal = () => {
    setModalVisible(true)  // Toggle the visibility of modal
  };
  const handlePhoneNumberUpdate = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);  // Update phone number in state
    
  };
 // const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(userData.phoneNumber);
 //const { user, token, setToken, setUser } = useAuth();

 const logout = async () => {
  try {
    // Confirm logout
    Alert.alert('Confirm Logout', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: async () => {
          // Clear data from AsyncStorage        
          await AsyncStorage.removeItem('JwtToken');
          await AsyncStorage.removeItem('userID');  
          console.log('AsyncStorage cleared');
          // Reset Auth Context states
          console.log('Before logout:', token);
          setToken(null); 
          setUserID(null); 
          console.log('After logout:', token);          
          // Navigate to LoginScreen
          navigation.replace('WelcomeScreen'); 
          // Adjust the screen name as per your navigation
        },
      },
    ]);
  } catch (error) {
    console.error('Error during logout:', error);
    Alert.alert('Logout Failed', 'Something went wrong. Please try again.');
  }

 };

 useEffect(() => {
   const fetchUser = async () => {
     try {
       console.log('Fetching token...');
     console.log('Token:', token);
       // Fetch orders from API with token in the header
       const response = await fetch('https://krishi-bazar.onrender.com/api/v1/user/1', {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           Authorization: `Bearer ${token}`, // Add token in Authorization header
         },
       });
       console.log('Response status:', response.status);
       console.log('token', token)
       if (response.ok) {
         const data = await response.json();
         console.log('User details fetched successfully:', data);
         setUser(data); // Adjust based on your API response structure
       } else {
         console.error('Failed to fetch user details:', response.status, response.statusText);
         const errorDetails = await response.json(); // Additional error details from the API
         console.error('Error details:', errorDetails);
        // console.error('Failed to fetch orders:', response.status);
       }
     } catch (error) {
       console.error('Error fetching orders:', error);
     } finally {
       setIsLoading(false);
     }
   };

   fetchUser();
 }, [token]);
  
 
  return (
    <GluestackUIProvider mode="light"><ScrollView style={styles.container}>
      
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}>
            <Image
              source={require('./../../assets/images/download.jpg')}
              style={styles.profileImage}
            />
          
          </View>
          
          <Text style={styles.name}>{user.first_name} {user.last_name}</Text>
          <Text style={styles.name}>({user.user_type})</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>Phone Number : {user.phone_number}</Text>
          </View>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>Email : {user.email}</Text>
          </View>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>Aadhar Number : {user.aadhar_number}</Text>
          </View>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>Address : {user.address}</Text>

          </View>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>City : {user.city}</Text>
            
          </View>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>State : {user.state}</Text>
            
          </View>
          <View style={styles.infoItem}>
           
            <Text style={styles.infoText}>Pincode : {user.pin_code}</Text>
            
          </View>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={toggleModal}>
          <Text style={styles.updateButtonText}>Update Phone Number</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.updateButton}  onPress={() => navigation.navigate('CreateProduct')}>
          <Text style={styles.updateButtonText}>Create Product</Text>
        </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={logout}>
      <Text style={styles.buttonText}>Logout</Text>
    </TouchableOpacity>
        
        {/* Conditionally render the UpdatePhoneNumber component */}
        {modalVisible && (
           <UpdatePhoneNumber
             currentPhoneNumber={phoneNumber}
             onUpdate={handlePhoneNumberUpdate}  // Pass update handler
             onClose={toggleModal} 
             visible={modalVisible} 
             setVisible={setModalVisible}// Pass function to close modal
             aadhar={user.aadhar_number}
           />
         )}
      </ScrollView>
      </GluestackUIProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 35,
    paddingVertical: 60,
  },

  profileContainer: {
    alignItems: 'center',
   marginBottom:10
    
  },
  profilePicture: {
   // margin:30,
    width: 150,
    height: 150,
    borderRadius: 70,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom:30,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 16,
    fontWeight:"500"
  },
  buttonContainer:{
    flexDirection:'row'
  },
  updateButton: {
    paddingVertical: 12,
    paddingHorizontal:12,
    borderRadius: 8,
    marginRight:38,
    backgroundColor:'#3B82F6',
    marginBottom:20
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF6347',
    paddingHorizontal: 15,
    paddingVertical: 12,
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
    
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

  
