import { AppRegistry } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CartScreen from "./screens/CartScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductList from "./screens/ProductList";

import { CartProvider } from "./context/CartContext";
import { CartIcon } from "./components/CartIcon"; 

const APP_NAME = "LeahShop";
const Stack = createNativeStackNavigator();

const ProductListHeaderRight = ({ navigation }) => <CartIcon navigation={navigation} />;
const ProductScreenHeaderRight = ({ navigation }) => <CartIcon navigation={navigation} />;

const App = () => (
  <CartProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{
            title: "Products",
            headerRight: ProductListHeaderRight,
          }}
        />
        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{
            title: "Product Details",
            headerRight: ProductScreenHeaderRight,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: "Your Cart" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </CartProvider>
);

AppRegistry.registerComponent(APP_NAME, () => App);
