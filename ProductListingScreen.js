
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const ProductListingScreen = ({ products, addToCart }) => {
  const [filteredData, setFilteredData] = useState(products);

  useEffect(() => {
    setFilteredData(products)
  }, [products])
  const handleSearch = (text) => {
    const filtered = products.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()) || item.category.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filtered);
  };
  const handleVegFilter = (text) => {
    if(text==="none")
    {
      setFilteredData(products);
    }
    else{
      const filtered = products.filter(item =>
        item?.item_type === text
      );
      console.log("filters data", filtered)
      setFilteredData(filtered);
    }
    
  };
  const renderProductItem = ({ item }) => (
    <View style={styles.productContainer}>
      {item?.image ? <Image source={{ uri: item?.image }} style={styles.productImage} /> : null}

      <Text style={styles.productName}>{item.name}</Text>
      {item?.description ? <Text style={styles.productDesc}>{item.description}</Text> : null}
      <Text style={styles.productPrice}>Category : {item.category}</Text>
      <Text style={styles.productPrice}>Price : {item.price}</Text>
      <Text style={styles.productPrice}>Item Type : {item.item_type}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(item)} />
    </View>
  );

  return (
    <View style={{ padding: 5, marginBottom: 110 }}>
      <TextInput style={{ height: 40, width: '100%' }} placeholder="Search" onChangeText={text => handleSearch(text)} />
      <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>

        <TouchableOpacity onPress={() => {handleVegFilter('veg')}} style={{ flex: 1, height: 30, width: '100%', margin: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Veg</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {handleVegFilter('non-veg')}} style={{ flex: 1, height: 30, width: '100%', margin: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Non Veg</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {handleVegFilter('none')}} style={{ flex: 1, height: 30, width: '100%', margin: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Remove Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  productContainer: {
    flex: 1,
    //justifyContent: 'center',
    // alignItems: 'center',
    margin: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 160,
    marginBottom: 8,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  productDesc: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  productPrice: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default ProductListingScreen;
