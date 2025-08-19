import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import productsData from '../data/products.json';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../App';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  description?: string;
}

type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

export default function ProductList({ navigation }: { navigation: ProductListNavigationProp }) {

  const [products] = useState<Product[]>(productsData);
  const [filtered, setFiltered] = useState<Product[]>(productsData);
  const categories = [...new Set(productsData.map(p => p.category))];
  const categoryColors: Record<string, string> = {
    Pastries: '#f9d6faff',   
    Breads: '#ec9ce2ff',     
    Cakes: '#fc72a0ff',     
    Cupcakes: '#fa8fc5ff',  
  };

  const maxPrice = products.length > 0 
    ? Math.max(...products.map(p => p.price)) 
    : 0;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [sortOption, setSortOption] = useState<string>('');

  const filterAndSort = useCallback(() => {
    let list = [...products];

    if (selectedCategories.length > 0) {
      list = list.filter(p => selectedCategories.includes(p.category));
    }

    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortOption === 'priceAsc') list.sort((a, b) => a.price - b.price);
    if (sortOption === 'priceDesc') list.sort((a, b) => b.price - a.price);
    if (sortOption === 'nameAsc') list.sort((a, b) => a.name.localeCompare(b.name));
    if (sortOption === 'nameDesc') list.sort((a, b) => b.name.localeCompare(a.name));

    setFiltered(list);
  }, [products, selectedCategories, priceRange, sortOption]);

  useEffect(() => {
    filterAndSort();
  }, [filterAndSort]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, maxPrice]);
    setSortOption('');
    setFiltered(products);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.shopName}>Leah’s Shop</Text>
      </View>

      <View style={styles.filters}> 
        <Text style={styles.filterTitle}>Categories</Text> 
        <View style={styles.categoryList}>
          {categories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={styles.checkboxContainer}
              onPress={() => toggleCategory(cat)}
            >
              <View
                style={[
                  styles.checkboxRow,
                  { backgroundColor: categoryColors[cat] || '#ccc' },
                  selectedCategories.includes(cat) && styles.selectedCheckboxRow
                ]}
              >
                <Text style={styles.checkboxText}>
                  {selectedCategories.includes(cat) ? '☑' : '☐'}
                </Text>
                <Text>{cat}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.filterTitle}>Price Range</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Max Price"
          value={priceRange[1].toString()}
          onChangeText={(value) => {
            const num = parseFloat(value) || 0;
            setPriceRange([0, num]);
          }}
        />

        <Text style={styles.filterTitle}>Sort By</Text>
        <View style={styles.sortButtons}>
          <TouchableOpacity
            style={[styles.sortButton, sortOption === 'priceAsc' && styles.activeSortButton]}
            onPress={() => setSortOption('priceAsc')}
          >
            <Text style={styles.sortButtonText}>Price ↑</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sortButton, sortOption === 'priceDesc' && styles.activeSortButton]}
            onPress={() => setSortOption('priceDesc')}
          >
            <Text style={styles.sortButtonText}>Price ↓</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sortButton, sortOption === 'nameAsc' && styles.activeSortButton]}
            onPress={() => setSortOption('nameAsc')}
          >
            <Text style={styles.sortButtonText}>Name A-Z</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.sortButton, sortOption === 'nameDesc' && styles.activeSortButton]}
            onPress={() => setSortOption('nameDesc')}
          >
            <Text style={styles.sortButtonText}>Name Z-A</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
          <Text style={styles.resetButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => {
          const categoryStyle = {
            backgroundColor: categoryColors[item.category] || '#fff',
            borderLeftColor: categoryColors[item.category] || '#ccc',
            borderLeftWidth: 4,
          };

          return (
            <TouchableOpacity
              style={[styles.productCard, categoryStyle]}
              onPress={() =>
                navigation.navigate('ProductDetails', {
                  name: item.name,
                  category: item.category,
                  price: item.price,
                  description: item.description ?? 'This is a dummy description for now.',
                  imageUri: undefined,
                })
              }
            >
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={[styles.categoryText, { color: categoryColors[item.category] || '#000' }]}>
                {item.category}
              </Text>
              <Text>₱{item.price.toFixed(2)}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create
({
  container: 
  { flex: 1, 
    backgroundColor: '#f5a9c0ff', 
    padding: 10 
  },
  header: 
  { flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 10 
  },
  logo: 
  { width: 80, 
    height: 80, 
    marginRight: 10 
  },
  title: 
  { fontSize: 24, 
    fontWeight: 'bold' 
  },
  filters: 
  { backgroundColor: 'white', 
    padding: 10, 
    borderRadius: 8, 
    marginBottom: 10 
  },
  filterTitle: 
  { fontWeight: 'bold', 
    marginTop: 10 
  },
  categoryList: 
  { flexDirection: 'row', 
    flexWrap: 'wrap', 
    gap: 10 
  },
  checkboxContainer: 
  { marginRight: 10, 
    marginTop: 5 
  },
  sortButtons: 
  { flexDirection: 'row', 
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  input: {
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 8,
  marginVertical: 5,
  borderRadius: 5,
  backgroundColor: '#f8e5f0ff',
},
shopName: {
    fontSize: 30,
    fontFamily: 'Calistoga-Regular',
    fontWeight: 'normal',
    marginLeft: 25,
  },
  resetButton: {
   backgroundColor: '#ec70a0ff',
  paddingVertical: 10,
  paddingHorizontal: 20,
  borderRadius: 8,
  alignItems: 'center',
},
resetButtonText: {
  color: '#fcf5f5ff',
  fontWeight: 'bold',
  fontSize: 16,
},
sortButton: {
  backgroundColor: '#f782afff',
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 6,
  marginHorizontal: 1,
  width: 85,
},
sortButtonText: {
  color: 'black',
  fontWeight: 'bold',
  fontSize: 12,
   lineHeight: 18,
},
activeSortButton: {
  backgroundColor: '#f73e85e5',
},
activeSortButtonText: {
  color: 'white', 
  },
  arrowText: {
    fontSize: 14
},
  checkboxRow: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 8,
  borderRadius: 6,
  marginBottom: 0,
  marginRight: -15,
  borderWidth: 1,
  borderColor: 'transparent',
},
selectedCheckboxRow: {
  borderWidth: 2,
  borderColor: 'black',
},
  checkboxText: {
    fontSize: 18,
    marginRight: 1,
  },
  productCard: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  productName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  categoryText: 
  {
    fontSize: 14,
  }
});
