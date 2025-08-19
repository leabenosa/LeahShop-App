import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';
import { RootStackParamList } from './types/navigation';
import { CartProvider } from "./context/CartContext";
import CartScreen from './screens/CartScreen';


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
       <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ title: "Leah's Shop" }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={{ title: "Product Details" }}
        />
         <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: "My Cart" }}
          />
      </Stack.Navigator>
    </NavigationContainer>
    </CartProvider>
  );
}
