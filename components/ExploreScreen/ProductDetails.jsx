import React from 'react';
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
import { Feather } from '@expo/vector-icons'; // Assuming using Expo, if not, use appropriate icon library

const ProductDetails = ({ navigation }) => {
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
              source={{ uri: product.image }}
              style={[styles.image, styles.card]}
              resizeMode="cover"
            />
          </View>

          {/* Product Info Section */}
          <View style={styles.infoContainer}>
            <Text style={styles.productName}>{product.name}</Text>
            
            <View style={styles.basicInfo}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{product.type}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Feather name="star" size={16} color="#FFB800" />
                <Text style={styles.ratingText}>{product.rating}</Text>
              </View>
            </View>

            {/* Price and Quantity */}
            <View style={styles.priceSection}>
              <Text style={styles.price}>₹{product.price}</Text>
              <Text style={styles.quantity}>Quantity: {product.quantity}</Text>
            </View>

            {/* Farmer Info */}
            <View style={[styles.farmerSection , styles.card]}>
              <Text style={styles.sectionTitle}>Farmer Details</Text>
              <View style={styles.farmerInfo}>
                <View style={styles.farmerIconContainer}>
                  <Feather name="user" size={24} color="#666" />
                </View>
                <View style={styles.farmerDetails}>
                  <Text style={styles.farmerName}>{product.farmer.name}</Text>
                  <Text style={styles.farmerLocation}>
                    <Feather name="map-pin" size={14} color="#666" /> {product.farmer.location}
                  </Text>
                  <Text style={styles.farmerExperience}>
                    Experience: {product.farmer.experience}
                  </Text>
                </View>
              </View>
            </View>

            {/* Product Description */}
            <View style={styles.descriptionSection}>
              <Text style={styles.sectionTitle}>Product Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </View>
        </ScrollView>
        {/* Bottom Buy Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={styles.buyButton}
            onPress={() => { navigation.navigate('BuyOrder', { productId: product.id })
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
    backgroundColor: 'white',
  },
  
  header: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor:'#FAF6E3'
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
    backgroundColor: '#FAF6E3',
    padding: 15,
    borderRadius: 12,
  },
  farmerIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#fff',
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
  farmerLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  farmerExperience: {
    fontSize: 14,
    color: '#666',
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
    backgroundColor: '#FAF6E3',
  },
  buyButton: {
    backgroundColor: '#088395',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProductDetails;