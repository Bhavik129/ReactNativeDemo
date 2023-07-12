import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { icons } from './Images';
import { useNavigation } from '@react-navigation/native';
const ProductScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sort, setSort] = useState(false);
  useEffect(() => {
    fetchProducts();
  }, []);


  useEffect(() => {
    filterProducts();
  }, [searchText, products]);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterProducts = () => {
    const filtered = products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchText.toLowerCase()) ||
        product.category.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  const sortProduct = () =>{

    const multiplier = sort  ? 1 : -1;
    setSort(!sort)
    // return array.sort((a, b) => multiplier * (a.price - b.price))
    const filtered = products.sort((a, b) => multiplier * (a.price - b.price));
    setFilteredProducts(filtered);
  }
  const handleLikeButtonPress = (productId) => {
    console.log(`Like button pressed for product ID: ${productId}`);
  };
  const handleProductPress = (productId) => {
    navigation.navigate('ProductDetail', { productId:productId });
  };


  const renderProductItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleProductPress(item.id)}
    key={index} style={{ flex: 1, flexDirection: 'column', marginRight: index % 2 === 0 ? 15 : 0, padding: 15, marginBottom: 15, borderRadius: 15, backgroundColor: '#FFFFFF' }}
    >
      <TouchableOpacity
        style={{ alignSelf: 'flex-end', marginTop: 5 }}
        onPress={() => handleLikeButtonPress(item.id)}
      >
        <Image source={icons.like} style={{ height: 20, width: 20 }} resizeMode={'contain'} />
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={{ width: 150, height: 150 }} />
      <Text style={{ marginTop: 10, color: 'black', fontSize: 16, fontWeight: '400', }} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={{ marginVertical: 7, color: '#7C7A7A', fontSize: 13, fontWeight: '400', }}>{item.category}</Text>
      <Text style={{ marginTop: 5, color: 'black', fontSize: 14, fontWeight: '400', }}>${item.price}</Text>
      
    </TouchableOpacity>
  );


  return (
    <View style={{ flex: 1, backgroundColor: '#F4F4F4', paddingTop: 20 }}>
      <View style={{ paddingHorizontal: 20, flex: 1 }}>
        <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}>
          <Image source={icons.menu} style={{ width: 27, height: 20 }} />
          <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', backgroundColor: '#FFFFFF', marginLeft: 20, paddingVertical: 10, borderRadius: 15 }}>
            <TouchableOpacity onPress={() => filterProducts()} >
              <Image source={icons.search} style={{ width: 22, height: 22, marginLeft: 20 }} />
            </TouchableOpacity>
            <TextInput
              style={{ height: 40, borderColor: 'gray', paddingHorizontal: 10 }}
              placeholder="Search Product"
              value={searchText}
              onChangeText={(value) => setSearchText(value)}
            />
          </View>
        </View>
        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <Text style={{ fontSize: 30, fontWeight: '800', color: '#000000' }}>Products</Text>
          <View style={{flexDirection:'row'}}>
            <TouchableOpacity onPress={sortProduct}>
            <Image source={icons.sorting} style={{height:24,width:24, marginRight:10}} />
          
            </TouchableOpacity>
          <Image source={icons.filter} style={{height:24,width:24}} />
          </View>
          
        </View>
        <Text style={{marginBottom:20}}>{filteredProducts.length} products found</Text>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductItem}
          numColumns={2}
        />

      </View>
      <View style={{ justifyContent: 'flex-end', width: '100%' }}>
        <Image source={icons.bottomMenu} resizeMode={'cover'} style={{ width: '100%', height: 40 }} />
      </View>
    </View>
  );
};

export default ProductScreen;
