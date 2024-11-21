import React,{useState,useEffect} from 'react';
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import { View, StyleSheet, FlatList, Image, Text , TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator } from 'react-native';

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
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    try {
      const response = await fetch('http://krishi-bazar.onrender.com/api/v1/user/1/orders');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      setOrders(data);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

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
      <LinearGradient colors={['#FAF6E3', '#FAF6E3']} style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      </LinearGradient>
    );
  }
  if (error) {
    return (
      <LinearGradient colors={['#FAF6E3', '#FAF6E3']} style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </LinearGradient>
    );
  }

  
  return (
    <LinearGradient
    colors={['#FAF6E3', '#FAF6E3']}
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
              <Text style={styles.emptyText}>No orders found</Text>
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
});

export default ViewOrders;