import React from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';

const CartScreen = ({ cartItems, removeFromCart }) => {
  const renderCartItem = ({ item }) => (
    <View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Price : {item.price}</Text>
      <Button title="Remove from Cart" onPress={() => removeFromCart(item)} />
    </View>
  );

  const subTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach(item => {
      totalPrice += item.price;
    });
    return totalPrice;
  };

  const calculateTotalPrice = () => {
    let subtotal = 0;
    cartItems.forEach(item => {
      subtotal += item.price;
    });

    const tax = subtotal * 0.05;
    const total = subtotal + tax;
    return total;
  };

  const finalJson = () => {

    let finalObject = { subTotal: subTotalPrice(), grandTotal: calculateTotalPrice(), items: cartItems }

    console.log("final", finalObject)
    Alert.alert("Order Completed")
  }
  return (
    <View style={{ flex: 1 }}>
      <View>
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <Text style={styles.productPrice}>Sub Total : {subTotalPrice()}</Text>
        <Text style={styles.productPrice}>Grand Total(5% Tax Included)  : {calculateTotalPrice()}</Text>
        <Button title="Checkout" onPress={() => cartItems.length > 0 ? finalJson() : Alert.alert("Please add product")} />
      </View>

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
    color: '#000',
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
    color: '#000',
  },
});
export default CartScreen;
