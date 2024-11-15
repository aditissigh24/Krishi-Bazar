import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useRoute } from '@react-navigation/native';
import FilterDialog from './FilterDialog';

// Sample product data
const products = [
  {
    id: '1',
    name: 'Product 1',
    price: 19.99,
    image: 'https://via.placeholder.com/150',
    category: 'Zari',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 29.99,
    image: 'https://via.placeholder.com/150',
    category: 'Mushroom',
  },
  {
    id: '3',
    name: 'Product 3',
    price: 14.99,
    image: 'https://via.placeholder.com/150',
    category: 'Zari',
  },
  {
    id: '4',
    name: 'Product 4',
    price: 39.99,
    image: 'https://via.placeholder.com/150',
    category: 'Mushroom',
  },
  {
    id: '5',
    name: 'Product 5',
    price: 24.99,
    image: 'https://via.placeholder.com/150',
    category: 'Mushroom',
  },
];

const ExploreScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const route = useRoute();
  
  const { category } = route.params || {};
  useEffect(() => {
    if (category) {
      setSelectedCategory(category); // Set selected category based on route params
    }
  }, [category]);
  
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) &&
    (selectedCategory === '' || product.category === selectedCategory)
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#6B7280" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedCategory === '' ? styles.activeFilterButton : null,
          ]}
          onPress={() => setSelectedCategory('')}
        >
          <Text style={styles.filterButtonText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedCategory === 'Zari' ? styles.activeFilterButton : null,
          ]}
          onPress={() => setSelectedCategory('Zari')}
        >
          <Text style={styles.filterButtonText}>Zari Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            selectedCategory === 'Mushroom' ? styles.activeFilterButton : null,
          ]}
          onPress={() => setSelectedCategory('Mushroom')}
        >
          <Text style={styles.filterButtonText}>Mushroom</Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={renderProduct}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const productCardWidth = (width - 48) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B59F78',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF6E3',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#1F2937',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterButton: {
    backgroundColor: '#FAF6E3',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activeFilterButton: {
    backgroundColor: '#1A1A1D',
  },
  filterButtonText: {
    color: 'white',
    fontSize: 14,
  },
  productList: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: productCardWidth,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export default ExploreScreen;