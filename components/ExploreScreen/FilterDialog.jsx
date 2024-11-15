import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';

const FilterDialog = ({ onFilterChange }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    productType: '',
    priceRange: '',
    farmerName: '',
    deliveryDate: '',
  });

  // Sample data for demonstration
  const farmers = [
    "John Doe",
    "Jane Smith",
    "Bob Wilson",
    "Alice Brown",
  ];

  const priceRanges = [
    { label: "₹0 - ₹500", min: 0, max: 500 },
    { label: "₹501 - ₹1000", min: 501, max: 1000 },
    { label: "₹1001 - ₹2000", min: 1001, max: 2000 },
    { label: "₹2000+", min: 2000, max: Infinity },
  ];

  const deliveryDates = [
    "Today",
    "Tomorrow",
    "This Week",
    "Next Week",
  ];

  const handleFilterSelect = (filterType, value) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: activeFilters[filterType] === value ? '' : value
    };
    
    setActiveFilters(newFilters);
    
    // Call the parent component's filter handler
    onFilterChange(newFilters);
  };

  const renderActiveFilters = () => {
    const filters = Object.entries(activeFilters)
      .filter(([_, value]) => value !== '')
      .map(([key, value]) => ({
        type: key,
        value: value
      }));

    if (filters.length === 0) return null;

    return (
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.activeFiltersContainer}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity
            key={index}
            style={styles.activeFilterPill}
            onPress={() => handleFilterSelect(filter.type, filter.value)}
          >
            <Text style={styles.activeFilterText}>
              {`${filter.value} ×`}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
        {renderActiveFilters()}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Options</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.filterOptions}>
              {/* Product Type Section */}
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Product Type</Text>
                <View style={styles.optionsRow}>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      activeFilters.productType === 'Zari' && styles.activeOption
                    ]}
                    onPress={() => handleFilterSelect('productType', 'Zari')}
                  >
                    <Text style={[
                      styles.optionText,
                      activeFilters.productType === 'Zari' && styles.activeOptionText
                    ]}>Zari Products</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.filterOption,
                      activeFilters.productType === 'Mushroom' && styles.activeOption
                    ]}
                    onPress={() => handleFilterSelect('productType', 'Mushroom')}
                  >
                    <Text style={[
                      styles.optionText,
                      activeFilters.productType === 'Mushroom' && styles.activeOptionText
                    ]}>Mushroom Products</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Farmers Section */}
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Farmers</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.optionsRow}>
                    {farmers.map((farmer) => (
                      <TouchableOpacity
                        key={farmer}
                        style={[
                          styles.filterOption,
                          activeFilters.farmerName === farmer && styles.activeOption
                        ]}
                        onPress={() => handleFilterSelect('farmerName', farmer)}
                      >
                        <Text style={[
                          styles.optionText,
                          activeFilters.farmerName === farmer && styles.activeOptionText
                        ]}>{farmer}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* Price Range Section */}
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Price Range</Text>
                <View style={styles.priceOptions}>
                  {priceRanges.map((range) => (
                    <TouchableOpacity
                      key={range.label}
                      style={[
                        styles.filterOption,
                        activeFilters.priceRange === range.label && styles.activeOption
                      ]}
                      onPress={() => handleFilterSelect('priceRange', range.label)}
                    >
                      <Text style={[
                        styles.optionText,
                        activeFilters.priceRange === range.label && styles.activeOptionText
                      ]}>{range.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Delivery Date Section */}
              <View style={styles.filterSection}>
                <Text style={styles.sectionTitle}>Delivery Date</Text>
                <View style={styles.dateOptions}>
                  {deliveryDates.map((date) => (
                    <TouchableOpacity
                      key={date}
                      style={[
                        styles.filterOption,
                        activeFilters.deliveryDate === date && styles.activeOption
                      ]}
                      onPress={() => handleFilterSelect('deliveryDate', date)}
                    >
                      <Text style={[
                        styles.optionText,
                        activeFilters.deliveryDate === date && styles.activeOptionText
                      ]}>{date}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity
              style={styles.doneButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  activeFiltersContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  activeFilterPill: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
  },
  activeFilterText: {
    color: '#007AFF',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  filterOptions: {
    padding: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  filterOption: {
    marginHorizontal: 4,
    marginVertical: 4,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
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
  priceOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  dateOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  doneButton: {
    margin: 16,
    padding: 12,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    alignItems: 'center',
  },
  doneButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default FilterDialog;