import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { 
    id: number;
    name: string;
    category: string;
    price: number;
    description: string; 
  };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"ProductList" as keyof RootStackParamList}>
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ title: "Leah's Shop" }}
        />
        <>stack.Screen
          name="ProductDetails
          component={ProductDetails}
          options={{ title: "Product Details" }}
          </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
