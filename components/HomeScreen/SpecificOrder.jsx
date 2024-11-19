import React, { useState } from 'react';
import "./../../global.css";
import { GluestackUIProvider } from "./../UI/gluestack-ui-provider";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SpecificOrder = ({ navigation }) => {
  const [showActionsheet, setShowActionsheet] = React.useState(false)
  const handleClose = () => setShowActionsheet(false)
  // Sample order data - replace with your actual data
  const [order] = useState({
    orderId: "OD123456789",
    status: "Processing",
    product: {
      name: "Zari",
      image: "https://example.com/tomatoes.jpg", // Replace with your image
      price: 249.99,
      quantity: 5
    },
    customer: {
      name: "Aditi Singh",
      phone: "+91 98765 43210",
      address: "123 Farm Road",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001"
    },
    orderDate: "2024-03-15"
  });

  const [orderStatus, setOrderStatus] = useState(order.status);

  const handleStatusUpdate = () => {
    // Toggle between Processing and Delivered
    const newStatus = orderStatus === "Processing" ? "Delivered" : "Processing";
    setOrderStatus(newStatus);
  };

  const handleViewProduct = () => {
    // Navigate to product details screen
     navigation.navigate('ProductDetails', { productId: order.orderId });
  
  };

  return (
    <GluestackUIProvider mode="light"><SafeAreaView style={styles.container}>
        <ScrollView>
          {/* Header Section */}
          <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
          <Icon name= 'chevrons-left' size={24} color="#333" /></TouchableOpacity>
            <Text style={styles.headerTitle}>Order Details</Text>
          </View>

          {/* Order Status Card */}
          <View style={styles.card}>
            <View style={styles.orderIdRow}>
              <Text style={styles.orderId}>Order #{order.orderId}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: orderStatus === "Delivered" ? "#4CAF50" : "#FF9800" }
              ]}>
                <Text style={styles.statusText}>{orderStatus}</Text>
              </View>
            </View>
            <Text style={styles.orderDate}>Ordered on: {order.orderDate}</Text>
          </View>

          {/* Product Details Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Product Details</Text>
            <View style={styles.productContainer}>
              <Image
                source={require('./../../assets/images/BG9.jpg')} // Replace with your image
                style={styles.productImage}
                resizeMode="cover"
              />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{order.product.name}</Text>
                <Text style={styles.price}>₹{order.product.price}</Text>
                <Text style={styles.quantity}>Quantity: {order.product.quantity}</Text>
              </View>
            </View>
          </View>

          {/* Customer Details Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Customer Details</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text style={styles.detailText}>{order.customer.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Phone:</Text>
              <Text style={styles.detailText}>{order.customer.phone}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Address:</Text>
              <Text style={styles.detailText}>
                {`${order.customer.address}, ${order.customer.city}, ${order.customer.state} - ${order.customer.pincode}`}
              </Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleStatusUpdate}
            >
              <Text style={styles.buttonText}>
                {orderStatus === "Processing" ? "Mark as Delivered" : "Mark as Processing"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={handleViewProduct}
            >
              <Text style={styles.buttonText}>View Product</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView></GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6E3',
  },
  header: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection:'row',
  },
  headerTitle: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:10
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
  orderIdRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#2E7D32',
    fontWeight: '600',
    marginBottom: 4,
  },
  quantity: {
    fontSize: 14,
    color: '#666',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 80,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  buttonsContainer: {
    padding: 16,
    gap: 12,
  },
  button: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#088395'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default SpecificOrder;