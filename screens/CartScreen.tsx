import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useCart } from "../context/CartContext";

export default function CartScreen() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Text style={styles.itemText}>
                  {item.name} - ₱{item.price.toFixed(2)}
                </Text>
                <Button title="Remove" onPress={() => removeFromCart(item.id)} />
              </View>
            )}
          />
          <Text style={styles.total}>Total: ₱{total.toFixed(2)}</Text>
          <Button title="Clear Cart" onPress={clearCart} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  emptyText: { fontSize: 18, textAlign: "center", marginTop: 20 },
  cartItem: { flexDirection: "row", justifyContent: "space-between", marginVertical: 8 },
  itemText: { fontSize: 16 },
  total: { fontSize: 20, fontWeight: "bold", marginVertical: 20 },
});
