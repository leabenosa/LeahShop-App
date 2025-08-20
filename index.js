import { AppRegistry } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "./screens/CartScreen";
import ProductDetails from "./screens/ProductDetails";
import ProductList from "./screens/ProductList";

import { CartProvider } from "./context/CartContext";
import { CartIcon } from "./components/CartIcon";

const APP_NAME = "LeahShop";
const Stack = createNativeStackNavigator();


function CartHeaderRight({ navigation }) {
  return <CartIcon navigation={navigation} />;
}


const productListOptions = ({ navigation }) => ({
  title: "Products",
  headerRight: () => <CartHeaderRight navigation={navigation} />,
});

const productDetailsOptions = ({ navigation }) => ({
  title: "Product Details",
  headerRight: () => <CartHeaderRight navigation={navigation} />,
});

const cartOptions = {
  title: "Your Cart",
};

const App = () => (
  <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={productListOptions}
        />
        <Stack.Screen
          name="Product"
          component={ProductDetails}
          options={productDetailsOptions}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={cartOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </CartProvider>
);

AppRegistry.registerComponent(APP_NAME, () => App);
