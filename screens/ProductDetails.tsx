import React from "react";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import type { RootStackParamList } from "../types/navigation";
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
      <Text style={styles.price}>₱{price.toFixed(2)}</Text>
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
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 12,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  category: {
    fontSize: 18,
    marginBottom: 8,
    color: "#888",
    textAlign: "center",
  },
  price: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    color: "#e91e63",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    lineHeight: 22,
    textAlign: "center",
  },
});
