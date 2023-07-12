import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProductListingScreen from './ProductListingScreen';
import CartScreen from './CartScreen';
import axios from 'axios';
import RootSack from './src/RootStack'
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Tab = createBottomTabNavigator();

const App = () => {

  const [cartItems, setCartItems] = useState([]);

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('https://hashtagloyalty.s3.ap-southeast-1.amazonaws.com/Take+Home+Assignment+-+Thrive.json');
  //       console.log(response.data?.items)
  //       setData(response.data?.items);
  //     } catch (error) {
  //       setError(error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (product) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCartItems);
  };
  return (
    <NavigationContainer>
        <RootSack />
      </NavigationContainer>
      );
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="ProductListing" options={{ title: 'Menu' }}>
          {() => <ProductListingScreen products={data} addToCart={addToCart} />}
        </Tab.Screen>
        <Tab.Screen name="Cart" options={{ title: 'Cart' }}>
          {() => <CartScreen cartItems={cartItems} removeFromCart={removeFromCart} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
