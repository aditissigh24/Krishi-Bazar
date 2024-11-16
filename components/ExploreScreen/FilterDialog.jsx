import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal
} from 'react-native';

const FilterDialog = ({ activeFilters, onFilterChange, visible, setVisible }) => {
  const handleFilterSelect = (filterType, value) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: activeFilters[filterType] === value ? '' : value,
    };
    onFilterChange(newFilters);
  };

  const farmers = ['John Doe', 'Jane Smith', 'Bob Wilson', 'Alice Brown'];
  const priceRanges = [
    { label: '₹0 - ₹500', min: 0, max: 500 },
    { label: '₹501 - ₹1000', min: 501, max: 1000 },
    { label: '₹1001 - ₹2000', min: 1001, max: 2000 },
    { label: '₹2000+', min: 2000, max: Infinity },
  ];
  const closeModal = () => {
    setVisible(false);
  };


  return (
    <Modal visible={visible} transparent animationType="fade"  onRequestClose={closeModal}>
    <View style={styles.card}>
      <View style={styles.Modalhead}>
      <Text style={styles.title}>Filter Options</Text>
      <TouchableOpacity
                onPress={closeModal}
                style={styles.cutButton}
              >
                <Text style={styles.cutButtonText}>✕</Text>
              </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Product Type</Text>
        <View style={styles.optionsRow}>
          <TouchableOpacity
            style={[
              styles.option,
              activeFilters.productType === 'Zari' && styles.activeOption,
            ]}
            onPress={() => handleFilterSelect('productType', 'Zari')}
          >
            <Text
              style={[
                styles.optionText,
                activeFilters.productType === 'Zari' && styles.activeOptionText,
              ]}
            >
              Zari Products
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              activeFilters.productType === 'Mushroom' && styles.activeOption,
            ]}
            onPress={() => handleFilterSelect('productType', 'Mushroom')}
          >
            <Text
              style={[
                styles.optionText,
                activeFilters.productType === 'Mushroom' && styles.activeOptionText,
              ]}
            >
              Mushroom Products
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Farmers</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {farmers.map((farmer) => (
            <TouchableOpacity
              key={farmer}
              style={[
                styles.option,
                activeFilters.farmerName === farmer && styles.activeOption,
              ]}
              onPress={() => handleFilterSelect('farmerName', farmer)}
            >
              <Text
                style={[
                  styles.optionText,
                  activeFilters.farmerName === farmer && styles.activeOptionText,
                ]}
              >
                {farmer}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Price Range</Text>
        <View style={styles.optionsRow}>
          {priceRanges.map((range) => (
            <TouchableOpacity
              key={range.label}
              style={[
                styles.option,
                activeFilters.priceRange === range.label && styles.activeOption,
              ]}
              onPress={() => handleFilterSelect('priceRange', range.label)}
            >
              <Text
                style={[
                  styles.optionText,
                  activeFilters.priceRange === range.label && styles.activeOptionText,
                ]}
              >
                {range.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  Modalhead: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Title on the left, button on the right
    alignItems: 'center', // Vertically align items
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
   
  },
  section: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  option: {
    marginHorizontal: 4,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  cutButton: {
    paddingHorizontal: 8,
  paddingVertical: 4,
  },
  cutButtonText: {
    fontSize: 24,
    color: '#666',
  },
  activeOption: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  optionText: {
    color: '#666',
    fontSize: 14,
  },
  activeOptionText: {
    color: '#fff',
  },
});

export default FilterDialog;
