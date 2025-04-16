import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants/images";

interface ComponentProps {
  item: OrderItem;
}

const CheckoutItemCard = ({ item }: ComponentProps) => {
  return (
    <View className="bg-white">
      <View className="flex-row gap-4  py-4 pl-4 rounded-lg">
        <Image source={images.p1} className="size-20 rounded-lg" />
      </View>

      <View className="flex-row justify-end">
        <Text>{item.itemTotalPrice}</Text>
      </View>
    </View>
  );
};

export default CheckoutItemCard;
