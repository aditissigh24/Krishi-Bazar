import React,{useState,useEffect} from 'react';
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import { View, StyleSheet, FlatList, Image, Text , TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../Store/AuthContext';


const orders = [
    {
      id: '1',
      imageUrl: 'https://example.com/product1.jpg',
      name: 'Product 1',
      quantity: 2,
      price: 19.99,
      seller: 'Seller A',
      buyer: 'Buyer X',
    },
    {
      id: '2',
      imageUrl: 'https://example.com/product2.jpg',
      name: 'Product 2',
      quantity: 1,
      price: 29.99,
      seller: 'Seller B',
      buyer: 'Buyer Y',
    },
    {
        id: '3',
        imageUrl: 'https://example.com/product2.jpg',
        name: 'Product 3',
        quantity: 1,
        price: 29.99,
        seller: 'Seller B',
        buyer: 'Buyer Y',
      },
      {
        id: '4',
        imageUrl: 'https://example.com/product2.jpg',
        name: 'Product 4',
        quantity: 1,
        price: 29.99,
        seller: 'Seller B',
        buyer: 'Buyer Y',
      },
    // Add more order objects as needed
  ];




const ViewOrders = ({navigation}) => {

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
 const { user_id } = useAuth();
 
 //const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM4MjQ1ODIsInVzZXJfaWQiOjEsInVzZXJfdHlwZSI6ImZhcm1lciJ9.3DCo4LmnbMGL3jS-SP2TmQkEKW8tkympsh8zwc25lzI';
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('Fetching token...');
      console.log('Token:', token);
      console.log(user_id)
        // Fetch orders from API with token in the header
        const response = await fetch(`https://krishi-bazar.onrender.com/api/v1/user/1/orders`, {
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
          console.log('Orders fetched successfully:', data);
          setOrders(data); // Adjust based on your API response structure
        } else {
          console.error('Failed to fetch orders:', response.status, response.statusText);
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

    fetchOrders();
  }, [token]);

  const renderProduct = ({ item}) => (
    <TouchableOpacity style={styles.orderCard}  onPress={() => navigation.navigate('SpecificOrder', { orderId: item.order_details.order_id })}>
      <View >
            <View style={styles.orderRow}>
              <View style={styles.productImage}>
                <Image source={{ uri: item.imageUrl }} style={styles.circleImage} />
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.productName}>{item.order_details.product_name}</Text>
                <Text style={styles.detailtext}>Quantity: <Text style={styles.detailText}>{item.order_details.quantity_in_kg}</Text> </Text>
                <Text style={styles.detailtext}>Price: <Text style={styles.pricetext}>${item.order_details.total_price.toFixed(2)}</Text> </Text>
                <Text style={styles.detailtext}>Seller: <Text style={styles.detailText}>{item.seller_details.farmer_first_name}{item.seller_details.farmer_last_name}</Text> </Text>
                <Text style={styles.detailtext}>Buyer: <Text style={styles.detailText}>{item.buyer_details.buyer_first_name} {item.buyer_details.buyer_last_name}</Text></Text>
              </View>
            </View>
          </View>
    </TouchableOpacity>
  );
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
    <LinearGradient
    colors={['#f5f5f5', '#f5f5f5']}
    style={styles.container}
  >
    <GluestackUIProvider mode="light">
      
        <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
        <Icon name= 'chevrons-left' size={24} color="#333" />
      </TouchableOpacity>
          <Text style={styles.headerText}>My Orders</Text>
        </View>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.order_details.order_id.toString()}
          renderItem={renderProduct}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Loading...</Text>
            </View>
          }
        />
      </GluestackUIProvider>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection:'row',
    
    
  },
  headerText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:10
  },
  orderCard: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 2,
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  productImage: {
    marginRight: 16,
  },
  circleImage: {
    width: 90,
    height: 90,
    borderRadius: 4,
    backgroundColor:'black'
  },
  orderDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detailtext:{
    color:'#666',
    fontWeight:'500'
  },
  pricetext:{
   color: '#2E7D32',
   fontWeight:'500'
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  emptyContainer:{
    alignSelf:'center',
    margin:20
  },
  emptyText:{
    fontSize:20,
    fontWeight:'bold',
  }
});

export default ViewOrders;