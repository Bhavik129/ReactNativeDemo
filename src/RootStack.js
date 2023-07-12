import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductScreen from './Product'
import ProductDetailPage from './ProductDetailPage ';
const Stack = createNativeStackNavigator();

function RootSack() {
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false
      }}
    >

      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailPage} />
    </Stack.Navigator>
  );
}

export default RootSack;