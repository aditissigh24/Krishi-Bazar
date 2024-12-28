import React, { useState,useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; 


const ManageSpecificProduct = ({ route, navigation }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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
  const Id = route?.params?.Id;
  const { token } = useAuth();
   const { user_id } = useAuth();
  //const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM4MjQ1ODIsInVzZXJfaWQiOjEsInVzZXJfdHlwZSI6ImZhcm1lciJ9.3DCo4LmnbMGL3jS-SP2TmQkEKW8tkympsh8zwc25lzI';
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        console.log('product id',Id)
        console.log('Fetching token...');
      console.log('Token:', token);
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


  const handleUpdateAvailability =async () => {
    try {
      console.log('Fetching token...');
    console.log('Token:', token);
      // Fetch orders from API with token in the header
      const response = await fetch(`https://krishi-bazar.onrender.com/api/v1/product/${Id}/mark-unavailable`, {
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
        setOrders(data);
        Alert.alert(
          'Availability Updated', 
          `Product is now Available`
        ); // Adjust based on your API response structure
      } else {
        console.error('Failed to fetch api:', response.status, response.statusText);
        const errorDetails = await response.json(); // Additional error details from the API
        Alert.alert(
          'Error', 
          `Couldn't update the availability`
        ); 
        console.error('Error details:', errorDetails);
       // console.error('Failed to fetch orders:', response.status);
      }
    } catch (error) {
      console.error('Error fetching the product details:', error);
    }
    setProduct(prevProduct => ({
      ...prevProduct,
      isAvailable: !prevProduct.isAvailable
    }));
    
    
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
          onPress: async () => {
            // Implement delete logic here
            try {
              console.log('Fetching token...');
            console.log('Token:', token);
              // Fetch orders from API with token in the header
              const response = await fetch(`https://krishi-bazar.onrender.com/api/v1/product/${Id}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`, // Add token in Authorization header
                },
              });
              console.log('Response status:', response.status);
              console.log(response)
              console.log('token', token)
              if (response.ok) {
                const data = await response.json();
                console.log('product deleted successfully:', data);
                Alert.alert(
                  "Product deleted successfully"
                )
                setOrders(data); // Adjust based on your API response structure
              } else {
                
                console.error('Failed to delete product:', response.status, response.statusText);
                const errorDetails = await response.json(); // Additional error details from the API
                console.error('Error details:', errorDetails);

               // console.error('Failed to fetch orders:', response.status);
              }
            } catch (error) {
              console.error('Error in deleting product:', error);
            }
            
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
        source={{ uri: orders.img }} 
        style={styles.productImage} 
        resizeMode="cover"
      />
      </View>
      <View style={styles.card}>
        <Text style={styles.productName}>{orders.name}</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Type:</Text>
          <Text>{orders.type}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Quantity:</Text>
          <Text>{orders.quantity_in_kg} kg</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text> ₹ {orders.rate_per_kg}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Availability:</Text>
          <Text style={product.isAvailable ? styles.availableText : styles.unavailableText}>
            {product.isAvailable ? 'Available' : 'Unavailable'}
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Farmer:</Text>
          <Text>{orders.farmers_first_name} {orders.farmers_last_name}</Text>
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
    backgroundColor: '#f5f5f5'
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
    width:'100%',
    marginTop:20,
    marginBottom:30,
    
  },
  productImage: {
    width: '100%',
    height: '100%',
    
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