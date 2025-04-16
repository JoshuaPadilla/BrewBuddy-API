import { View, Text, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import CartItem from "@/components/cart_item";
import { useCartStore } from "@/store/useCart";
import Spinner from "react-native-loading-spinner-overlay";

const Cart = () => {
  const { cart, isLoading, fetchUserCartitems } = useCartStore();

  useEffect(() => {
    fetchUserCartitems();
  }, []);

  return (
    <SafeAreaView className="flex-1 p-4 gap-8">
      <Spinner
        visible={isLoading}
        textContent={"fetching cart items..."}
        textStyle={{ color: "#FFF" }}
      />

      {/* headings */}
      <View className="flex-row justify-between">
        <CustomButton title="back" />
        <Text>Cart</Text>
        <CustomButton title="edit" />
      </View>

      {/* main */}

      <ScrollView contentContainerClassName="pb-[100px] gap-2">
        {cart &&
          cart.map((orderItem, index) => (
            <CartItem orderItem={orderItem} key={index} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cart;
