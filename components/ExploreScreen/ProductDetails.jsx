import React, {useState,useEffect} from 'react';
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Feather';// Assuming using Expo, if not, use appropriate icon library

const ProductDetails = ({ navigation, route}) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFarmer,setIsFarmer]=useState('');
  const Id = route?.params?.Id;
  // Sample product data - replace with your actual data
  const product = {
    id:1,
    name: "Pretty Mushroom",
    image: 'BG9.jpg', // Replace with your image
    type: "Mushroom",
    quantity: "500g",
    price: 299,
    farmer: {
      name: "Aditi Singh",
      location: "Himachal Pradesh",
      experience: "15+ years"
    },
    description: "Fresh, organic golden oyster mushrooms grown in controlled environments. Rich in nutrients and perfect for gourmet cooking.",
  };
const { token } = useAuth();
 //const { user_id } = useAuth();
 // const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM4MjQ1ODIsInVzZXJfaWQiOjEsInVzZXJfdHlwZSI6ImZhcm1lciJ9.3DCo4LmnbMGL3jS-SP2TmQkEKW8tkympsh8zwc25lzI';
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('Fetching token...');
      console.log('Token:', token);
      console.log('productid:' ,Id)
        // Fetch orders from API with token in the header
        const response = await fetch(`https://krishi-bazar.onrender.com/api/v1/product/${Id}`, {
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
          console.log('product fetched successfully:', data);
          setOrders(data); // Adjust based on your API response structure
        } else {
          console.error('Failed to fetch product:', response.status, response.statusText);
          const errorDetails = await response.json(); // Additional error details from the API
          console.error('Error details:', errorDetails);
         // console.error('Failed to fetch orders:', response.status);
        }
      } catch (error) {
        console.error('Error fetching the product details:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  useEffect(() => {
    // Fetch the user's name from AsyncStorage when the component mounts
    const loadUserData = async () => {
      try {
        const userDataJSON= await AsyncStorage.getItem('userData');
        
        if (userDataJSON) {
            const userData=JSON.parse(userDataJSON);
          console.log(userData)
          setIsFarmer(userData.is_farmer? 'Farmer': 'Buyer') 
          
          
        }
      } catch (error) {
        console.error('Error fetching user name from AsyncStorage:', error);
      } finally {
        setIsLoading(false); // Hide loading indicator after fetching data 
      }
    };

    loadUserData();
  }, []);

  if (isLoading) {
    return (
      <LinearGradient colors={['#f5f5f5', '#f5f5f5']} style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      </LinearGradient>
    );
  }
  if (error) {
    return (
      <LinearGradient colors={['#f5f5f5', '#f5f5f5']} style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </LinearGradient>
    );
  }

  return (
    <GluestackUIProvider mode="light"><SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scrollView}>
          {/* Product Image */}
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: orders.img }}
              style={[styles.image, styles.card]}
              resizeMode="cover"
            />
          </View>

          {/* Product Info Section */}
          <View style={styles.infoContainer}>
            <Text style={styles.productName}>{orders.name}</Text>
            
            <View style={styles.basicInfo}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{orders.type}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Feather name="star" size={16} color="#FFB800" />
                <Text style={styles.ratingText}>{orders.rating}</Text>
              </View>
            </View>

            {/* Price and Quantity */}
            <View style={styles.priceSection}>
              <Text style={styles.price}>₹{orders.rate_per_kg}</Text>
              <Text style={styles.quantity}>Quantity: {orders.quantity_in_kg}</Text>
            </View>

            {/* Farmer Info */}
            <View style={[styles.farmerSection , styles.card]}>
              <Text style={styles.sectionTitle}>Farmer Details</Text>
              <View style={styles.farmerInfo}>
                <View style={styles.farmerIconContainer}>
                  <Feather name="user" size={24} color="#666" />
                </View>
                <View style={styles.farmerDetails}>
                  <Text style={styles.farmerName}>{orders.farmers_first_name}{orders.farmers_last_name}</Text>
                  {/* <Text style={styles.farmerLocation}>
                    <Feather name="map-pin" size={14} color="#666" /> {orders.farmer.location}
                  </Text> */}
                   <View style={styles.phoneItem}>
                   <Feather name="phone" size={18} color="#666" height='25' width="25" />
                       <Text style={styles.phonetext}> {orders.farmer_phone_number}</Text>
                  </View>
                  <View style={styles.farmerBadge}>
                   <Icon name="award" size={16} color="#2E7D32" />
                  <Text style={styles.farmerText}>Verified {isFarmer}</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Product Description */}
            {/* <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Product Description</Text>
              <Text style={styles.description}>{orders.description}</Text>
            </View> */}
          </View>
        </ScrollView>
        {/* Bottom Buy Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.buyButton}
            onPress={() => { navigation.navigate('BuyOrder', {Id: orders.id, image:orders.img, productName: orders.name, productRate: orders.rate_per_kg} )
              // Add your purchase logic here
            }}
          >
            <Text style={[styles.buyButtonText, styles.card]}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView></GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  header: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor:'white'
  },
  backButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    backgroundColor: '#B59F78',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  basicInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  badge: {
    backgroundColor: '#E3F2E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 15,
  },
  badgeText: {
    color: '#2F9461',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F9461',
  },
  quantity: {
    fontSize: 16,
    color: '#666',
  },
  farmerSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  farmerInfo: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
  },
  farmerIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#FFCC00',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  farmerDetails: {
    flex: 1,
  },
  farmerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  phoneItem:{
    flexDirection:'row'
  },
  phonetext:{
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  farmerLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  farmerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  farmerText: {
    marginLeft: 8,
    color: '#2E7D32',
    fontWeight: '600',
  },
  descriptionSection: {
    marginBottom: 20,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#f5f5f5',
  },
  buyButton: {
    paddingVertical: 12,
    paddingHorizontal:20,
    borderRadius: 8,
    alignSelf:'center',
    justifyContent: 'flex-start',
    backgroundColor:'#3B82F6'
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetails;