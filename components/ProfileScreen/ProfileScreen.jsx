import { View, Text,TouchableOpacity,StyleSheet,Image } from 'react-native'
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import React,{useState,useEffect} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UpdatePhoneNumber from './UpdatePhoneNumber';
import { ScrollView } from 'react-native-gesture-handler';


export default function ProfileScreen({navigation}) {
  const [firstName, setfirstName]=useState('');
  const [lastName, setlastName]=useState('');
  const [isFarmer,setIsFarmer]=useState('');
  const [phoneNumber,setPhoneNumber]=useState('');
  const [email,setEmail]=useState('');
  const [address,setaddress]=useState('');
  const [city,setcity]=useState('');
  const [aadhar,setAadhar]=useState('');
  const [state,setState]=useState('');
  const [pincode,setPincode]=useState('');

  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  
  const toggleModal = () => {
    setModalVisible(true)  // Toggle the visibility of modal
  };
  const handlePhoneNumberUpdate = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);  // Update phone number in state
    
  };
 // const [updatedPhoneNumber, setUpdatedPhoneNumber] = useState(userData.phoneNumber);
  useEffect(() => {
    // Fetch the user's data from AsyncStorage when the component mounts
    const fetchUserdata = async () => {
      try {
        const userDataJSON = await AsyncStorage.getItem('userData');
        if (userDataJSON) {
            const userData=JSON.parse(userDataJSON);
          setfirstName(userData.first_name);
          setlastName(userData.last_name);
          setIsFarmer(userData.is_farmer? 'Farmer': 'Buyer') 
          setPhoneNumber(userData.phone_number);
          setEmail(userData.email);
          setaddress(userData.address);
          setcity(userData.city);
          setAadhar(userData.aadhar_number);
          setState(userData.state);
          setPincode(userData.pin_code);
        }
      } catch (error) {
        console.error('Error fetching user name from AsyncStorage:', error);
      } finally {
        setLoading(false); // Hide loading indicator after fetching data
      }
    };

    fetchUserdata();
  }, []);
  
 
  return (
    <GluestackUIProvider mode="light"><ScrollView style={styles.container}>
      
        <View style={styles.profileContainer}>
          <View style={styles.profilePicture}>
            <Image
              source={require('./../../assets/images/download.jpg')}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.name}>{firstName} {lastName}</Text>
          <Text style={styles.name}>({isFarmer})</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>Phone Number - {phoneNumber}</Text>
          </View>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>Email - {email}</Text>
          </View>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>Aadhar Number - {aadhar}</Text>
          </View>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>Address - {address}</Text>

          </View>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>City - {city}</Text>
            
          </View>
          <View style={styles.infoItem}>
            
            <Text style={styles.infoText}>State - {state}</Text>
            
          </View>
          <View style={styles.infoItem}>
           
            <Text style={styles.infoText}>Pincode - {pincode}</Text>
            
          </View>
        </View>
        <TouchableOpacity style={styles.updateButton} onPress={toggleModal}>
          <Text style={styles.updateButtonText}>Update Phone Number</Text>
        </TouchableOpacity>
        {/* Conditionally render the UpdatePhoneNumber component */}
        {modalVisible && (
           <UpdatePhoneNumber
             currentPhoneNumber={phoneNumber}
             onUpdate={handlePhoneNumberUpdate}  // Pass update handler
             onClose={toggleModal} 
             visible={modalVisible} 
             setVisible={setModalVisible}// Pass function to close modal
             setAadhar={aadhar} 
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
    paddingVertical: 100,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom:70,
    height:'120'
  },
  profilePicture: {
    margin:30,
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
    fontSize: 24,
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
    fontSize: 18,
    color: '#1F2937',
    marginLeft: 16,
    fontWeight:"500"
  },
  updateButton: {
    paddingVertical: 12,
    paddingHorizontal:20,
    borderRadius: 8,
    alignSelf:'center',
    justifyContent: 'flex-start',
    backgroundColor:'#3B82F6'
  },
  updateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

  
