import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from './ProductList';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetails: { id: number }; // for later step
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="ProductList"
          component={ProductList}
          options={{ title: "Leah's Shop" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
