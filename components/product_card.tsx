import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "@/constants/images";

const ProductCard = () => {
  const handleProductPress = () => {};

  return (
    <TouchableOpacity
      className="p-2 w-[48%] h-[250px] mb-4 items-center gap-2"
      onPress={handleProductPress}
    >
      <View className="bg-blue-100 w-52 h-52 overflow-hidden">
        <Image
          source={images.p1}
          resizeMode="contain"
          className="size-full rounded-lg"
        />
      </View>

      <View className="w-full">
        <Text className="font-poppins-medium">Classic Black Milk Tea</Text>
        <Text className="font-poppins-semibold text-primary-100">
          &#8369; 69.00
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
