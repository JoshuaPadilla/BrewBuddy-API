import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { images } from "@/constants/images";
import CustomButton from "./custom_button";

interface ComponentProps {
  orderItem: OrderItem;
}

const CartItem = ({ orderItem }: ComponentProps) => {
  return (
    <View className="flex-row gap-4">
      <Image source={images.p1} className="size-32 rounded-lg" />

      <View className="gap-2 flex-row justify-between flex-1">
        <View className="">
          <Text className="font-poppins-semibold text-black-100 text-xl max-w-40">
            {orderItem.productID.productName}
          </Text>
        </View>
        <CustomButton title="checkout" />
      </View>
    </View>
  );
};

export default CartItem;
