import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import type { RootStackParamList } from '../App';
import type { StackScreenProps } from "@react-navigation/stack";


type Props = StackScreenProps<RootStackParamList, "ProductDetails">;

export default function ProductDetails({ route }: Props) {
  const { name, category, price, description, imageUri } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageUri ?? "https://via.placeholder.com/150" }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.category}>{category}</Text>
      <Text style={styles.price}>{`₱${price.toFixed(2)}`}</Text>
      <Text style={styles.description}>{description}</Text>

      <Button
        title="Add to Cart"
        onPress={() => console.log(`Added to cart: ${name}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  category: {
    fontSize: 16,
    marginBottom: 8,
    color: "#888",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
  },
});
