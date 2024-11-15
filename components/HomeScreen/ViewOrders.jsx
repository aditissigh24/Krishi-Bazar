import React from 'react';
import { View, StyleSheet, FlatList, Image, Text , TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';


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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.orderRow}>
              <View style={styles.productImage}>
                <Image source={{ uri: item.imageUrl }} style={styles.circleImage} />
              </View>
              <View style={styles.orderDetails}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.detailText}>Quantity: {item.quantity}</Text>
                <Text style={styles.detailText}>Price: ${item.price}</Text>
                <Text style={styles.detailText}>Seller: {item.seller}</Text>
                <Text style={styles.detailText}>Buyer: {item.buyer}</Text>
              </View>
            </View>
          </View>
        )}
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