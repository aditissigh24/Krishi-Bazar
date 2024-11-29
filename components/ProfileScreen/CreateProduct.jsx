import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { uploadImage } from './../../Store/SupabaseAPI';
import * as ImagePicker from 'expo-image-picker';

const CreateProductScreen = ({navigation}) => {
  const [formData, setFormData] = useState({
    img: '',
    farmer_id: 1,
    name: '',
    type: 'organic',
    quantity_in_kg: '',
    rate_per_kg: '',
    jari_size: 'small',
    expected_delivery: null,
    farmer_phone_number: '',
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Request permission when component mounts
  React.useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        type: 'image',
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        const fileName = `product_${Date.now()}.jpg`;
        const folder='product photos';
        const imageUrl = await uploadImage(result.assets[0].base64,folder, fileName);
        console.log('Uploaded image URL:', imageUrl);
        // Get base64 data
        const base64 = await fetch(imageUrl)
          .then(response => response.blob())
          .then(blob => {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          });

        setSelectedImage(imageUrl);
        // Store base64 image string in formData
        setFormData({ ...formData, img: base64 });
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSubmit = async () => {
    try {
      // Validate form data
      if (!formData.name || !formData.quantity_in_kg || !formData.rate_per_kg || !formData.farmer_phone_number) {
        Alert.alert('Error', 'Please fill all required fields');
        return;
      }

      if (!formData.img) {
        Alert.alert('Error', 'Please select a product image');
        return;
      }
      const token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM4MjQ1ODIsInVzZXJfaWQiOjEsInVzZXJfdHlwZSI6ImZhcm1lciJ9.3DCo4LmnbMGL3jS-SP2TmQkEKW8tkympsh8zwc25lzI';
      // Create JSON payload
      const currentDate = new Date().toISOString();
      const payload = {
        ...formData,
        quantity_in_kg: parseFloat(formData.quantity_in_kg),
        rate_per_kg: parseFloat(formData.rate_per_kg),
        created_at: currentDate,
        updated_at: currentDate,
      };
      
      const response = await fetch('https://krishi-bazar.onrender.com/api/v1/user/1/newproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
     
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create product');
      }

      Alert.alert('Success', 'Product created successfully');
      // Reset form
      setFormData({
        img: '',
        farmer_id: 1,
        name: '',
        type: 'organic',
        quantity_in_kg: '',
        rate_per_kg: '',
        jari_size: 'small',
        expected_delivery: null,
        farmer_phone_number: '',
      });
      setSelectedImage(null);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Rest of the component remains the same...
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData({ ...formData, expected_delivery: selectedDate.toISOString() });
    }
  };

  return (
    <ScrollView style={styles.container}>
         <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
      <Text style={styles.title}>Create New Product</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Image *</Text>
        <TouchableOpacity style={styles.imagePickerButton} onPress={selectImage}>
          <Text style={styles.imagePickerButtonText}>
            {selectedImage ? 'Change Image' : 'Select Image'}
          </Text>
        </TouchableOpacity>
        {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePreview}
              resizeMode="cover"
            />
          </View>
        )}
      </View>

      {/* Rest of the JSX remains the same... */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Product Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Enter product name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Type</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <Picker.Item label="Organic" value="organic" />
            <Picker.Item label="Non-Organic" value="non-organic" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Quantity (kg) *</Text>
        <TextInput
          style={styles.input}
          value={formData.quantity_in_kg}
          onChangeText={(text) => setFormData({ ...formData, quantity_in_kg: text })}
          keyboardType="decimal-pad"
          placeholder="Enter quantity in kg"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Rate per kg *</Text>
        <TextInput
          style={styles.input}
          value={formData.rate_per_kg}
          onChangeText={(text) => setFormData({ ...formData, rate_per_kg: text })}
          keyboardType="decimal-pad"
          placeholder="Enter rate per kg"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Jari Size</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.jari_size}
            onValueChange={(value) => setFormData({ ...formData, jari_size: value })}
          >
            <Picker.Item label="Small" value="small" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Large" value="large" />
          </Picker>
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Expected Delivery</Text>
        <TouchableOpacity 
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>
            {formData.expected_delivery 
              ? new Date(formData.expected_delivery).toLocaleDateString() 
              : 'Select Date'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            onChange={onDateChange}
          />
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Phone Number *</Text>
        <TextInput
          style={styles.input}
          value={formData.farmer_phone_number}
          onChangeText={(text) => setFormData({ ...formData, farmer_phone_number: text })}
          keyboardType="phone-pad"
          placeholder="Enter phone number"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Create Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  // Styles remain the same...
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  imagePickerButton: {
    backgroundColor: '#970747',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});

export default CreateProductScreen;