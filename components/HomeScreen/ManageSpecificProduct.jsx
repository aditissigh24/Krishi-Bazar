import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; 
const ManageSpecificProduct = ({ route, navigation }) => {
  const [product, setProduct] = useState({
    image: 'https://example.com/product-image.jpg',
    name: 'Organic Tomatoes',
    type: 'Vegetable',
    quantity: '50 kg',
    price: '$25',
    isAvailable: true,
    farmerName: 'John Doe',
    deliveryDate: '2024-06-15'
  });

  const handleUpdateAvailability = () => {
    setProduct(prevProduct => ({
      ...prevProduct,
      isAvailable: !prevProduct.isAvailable
    }));
    
    Alert.alert(
      'Availability Updated', 
      `Product is now ${!product.isAvailable ? 'Available' : 'Unavailable'}`
    );
  };

  const handleDeleteProduct = () => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            // Implement delete logic here
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
          <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
        <Icon name= 'chevrons-left' size={24} color="#333" />
      </TouchableOpacity>
          <Text style={styles.headerText}>My Orders</Text>
        </View>
    <View style={styles.imagecontainer}>
      <Image 
        source={{ uri: product.image }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      </View>
      <View style={styles.card}>
        <Text style={styles.productName}>{product.name}</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Type:</Text>
          <Text>{product.type}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Quantity:</Text>
          <Text>{product.quantity}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text>{product.price}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Availability:</Text>
          <Text style={product.isAvailable ? styles.availableText : styles.unavailableText}>
            {product.isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Farmer:</Text>
          <Text>{product.farmerName}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Delivery Date:</Text>
          <Text>{product.deliveryDate}</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.updateButton} 
            onPress={handleUpdateAvailability}
          >
            <Text style={styles.buttonText}>
              {product.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.deleteButton} 
            onPress={handleDeleteProduct}
          >
            <Text style={styles.buttonText}>Delete Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6E3'
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
  imagecontainer:{
    backgroundColor:'white',
    marginTop:5,
    height:250,
    width:'100%'
  },
  productImage: {
    width: '100%',
    height: '100%'
  },
  card: {
    backgroundColor: 'white',
    margin: 12,
    padding: 16,
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
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 10,
    width: 120
  },
  availableText: {
    color: 'green'
    
  },
  unavailableText: {
    color: 'red'
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  updateButton: {
    backgroundColor: '#088395',
    padding: 15,
    borderRadius: 10,
    flex: 0.48
  },
  deleteButton: {
    backgroundColor: '#F4CE14',
    padding: 15,
    borderRadius: 10,
    flex: 0.48
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default ManageSpecificProduct;