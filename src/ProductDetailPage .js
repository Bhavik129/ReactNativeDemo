import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { icons } from './Images';
import { useNavigation } from '@react-navigation/native';

const ProductDetailPage = ({route}) => {
  const [product, setProduct] = useState(null);
  const navigation = useNavigation();
  const { productId} = route.params;
  useEffect(() => {
    console.log('route.paramsroute.params',productId)
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products/'+productId);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={icons.productDetailBg} resizeMode="cover" style={{height:'100%', width:'100%',  justifyContent:'flex-start', flex:1/2}}>
        <View style={{flexDirection:'row', justifyContent:'space-between',marginHorizontal:20, marginTop:27 }}>
            <TouchableOpacity onPress={()=>navigation.goBack(null)}>
            <Image source={icons.back} style={{height:24, width:12,}} />
            </TouchableOpacity>
            <TouchableOpacity>
            <Image source={icons.like} style={{ height:24, width:29,tintColor:'white' }} resizeMode={'contain'} />
            </TouchableOpacity>
            
        </View>
        <Image source={{uri:product.image}} style={{width:315, height:229,marginTop:16, alignSelf:'center'}} />
      </ImageBackground>  
      
      
      <View style={{marginTop:180, flex:1, marginHorizontal:27}}>
      <View style={styles.row}>
        <Text style={styles.name}>{product.category}</Text>
        <Text style={styles.price}>{`$${product.price}`}</Text>
      </View>
      <Text style={styles.category}>{product.title}</Text>
      <View style={styles.divider} />
      <Text style={styles.details}>{product.description}</Text>
      <View style={styles.divider} />
      <Text style={styles.rating}>{`Rating: ${product.rating.rate}/5`}</Text>
      </View>
      <TouchableOpacity style={styles.addToCart}>
        <Text style={styles.addToCartText}>Add To cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    width: '100%',
    height: '50%',
    borderRadius: 100,
    backgroundColor: 'black',
    alignSelf: 'center',
    overflow: 'hidden',
    marginBottom: 16,
  },
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
  },
  image: {
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    color: 'black',
fontSize: 20,
fontWeight: '800',
textTransform:'capitalize'
  },
  price: {
color: 'black',
fontSize: 20,
fontWeight: '400',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginVertical:10
  },
  category: {
color: 'black',
fontSize: 16,
fontWeight: '400',
  },
  details: {
color: 'black',
 fontSize: 16,
 fontWeight: '400',

  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addToCart:{paddingVertical:24,backgroundColor:'black', alignItems:'center', margin:20, borderRadius:10},
  addToCartText:{
    color: 'white',
     fontSize: 16,
     fontWeight: '700',
     textTransform:'uppercase'
    }
});

export default ProductDetailPage;
