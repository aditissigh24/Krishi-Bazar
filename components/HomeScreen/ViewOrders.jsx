import React, {useState,useEffect} from 'react';
import { View, StyleSheet, FlatList, Image, Text , TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';



  

const ViewOrders = ({navigation}) => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // State to handle loading

  const renderProduct = ({ item,navigation }) => (
    <TouchableOpacity style={styles.orderCard} onPress={()=> navigation.navigate('SpecificOrder')} >
       <View >
            <View style={styles.orderRow}>
              <View style={styles.productImage}>
                <Image source={{ uri: item.imageUrl }} style={styles.circleImage} />
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.productName}>{item.order_details.product_name}</Text>
                <Text style={styles.detailText}>Quantity: {item.order_details.quantity_in_kg} kg</Text>
                <Text style={styles.detailText}>Quantity: {item.order_details.quantity_in_kg} kg</Text>
                <Text style={styles.detailText}>Seller: {item.seller_details.farmer_first_name} {item.seller_details.farmer_last_name}</Text>
                <Text style={styles.detailText}>Buyer: {item.buyer_details.buyer_first_name} {item.buyer_details.buyer_last_name}</Text>
                <Text style={styles.detailText}>Status: {item.order_details.status}</Text>
              </View>
            </View>
          </View>
    </TouchableOpacity>
  );
 
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('https://krishi-bazar.onrender.com/api/v1/user/1/orders');
        const data = await response.json();
        setOrders(data); // Set orders to the fetched data
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false); // Set loading to false once the data is fetched
      }
    };

    fetchOrders();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
      <Icon name= 'chevrons-left' size={24} color="white" />
    </TouchableOpacity>
        <Text style={styles.headerText}>My Orders</Text>
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.order_details.order_id.toString()}
        renderItem={(item) => renderProduct({ ...item, navigation })}
        
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B59F78',
  },
  header: {
    backgroundColor: '#1A1A1D',
    padding: 22,
    flexDirection:'row',
    
    
  },
  headerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:10
  },
  orderCard: {
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#FAF6E3',
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
});

export default ViewOrders;