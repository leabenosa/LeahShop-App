import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';
import { RootStackParamList } from './types/navigation';
import { CartProvider } from "./context/CartContext";
import CartScreen from './screens/CartScreen';
import { CartIcon } from "./components/CartIcon"; 


const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <CartProvider>
    <NavigationContainer>
       <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={({ navigation }) => ({
          title: "Leah's Shop",
          headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
          options={({ navigation }) => ({
             title: "Product Details",
            headerRight:() => <CartIcon navigation={navigation} />,
           })}
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
