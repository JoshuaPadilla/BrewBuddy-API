import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { priceFormatted } from "@/helpers/utils";

interface ComponentProps {
  item: OrderItem;
}

const CheckoutItemCard = ({ item }: ComponentProps) => {
  return (
    <View className="bg-white">
      <View className="flex-row gap-4  py-4 px-4 rounded-lg">
        <Image source={images.p1} className="size-16 rounded-lg" />

        {/* Info */}
        <View className="flex-1">
          {/* first row */}
          <View className="flex-row justify-between">
            {/* name and qunatity */}
            <View className="flex-row gap-2 items-start">
              <Text className="font-poppins-semibold text-black-100 text-lg">
                {item.quantity}x
              </Text>
              <Text className="font-poppins-semibold text-black-100 text-lg max-w-52">
                {item.productID.productName.replace("Milk Tea", "")}
              </Text>
            </View>

            <Text className="font-poppins-bold text-primary-100 text-lg">
              {priceFormatted(item.productID.productBasePrice)}
            </Text>
          </View>

          {/* Second row size*/}
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-1 items-start">
              <Text className="font-poppins-regular text-black-100/80 text-sm max-w-52">
                size:
              </Text>
              <Text className="font-poppins-semibold text-black-100 text-sm max-w-52">
                {item.itemSize.name}
              </Text>
            </View>

            <Text className="font-poppins-bold text-primary-100/70 text-lg">
              {priceFormatted(item.itemSize.price)}
            </Text>
          </View>

          {/* third row sweet */}
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-1 items-start">
              <Text className="font-poppins-regular text-black-100/80 text-sm max-w-52">
                sweetness:
              </Text>
              <Text className="font-poppins-semibold text-black-100 text-sm max-w-52">
                {item.sweetnessLevel.name}
              </Text>
            </View>

            <Text className="font-poppins-bold text-primary-100/70 text-lg">
              {priceFormatted(item.sweetnessLevel.price)}
            </Text>
          </View>

          {/* fourt row addons*/}
          <View className="flex-row justify-between items-center">
            <View className="flex-row gap-1 items-start">
              <Text className="font-poppins-regular text-black-100/80 text-sm max-w-52">
                add on:
              </Text>
              <Text className="font-poppins-semibold text-black-100 text-sm max-w-52">
                {item.addOns.name || "None"}
              </Text>
            </View>

            <Text className="font-poppins-bold text-primary-100/70 text-lg">
              {priceFormatted(item.addOns.price)}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row justify-end p-4 gap-2 items-center">
        <Text className="font-poppins-medium">Subtotal:</Text>
        <Text className="font-poppins-bold text-primary-100 text-lg">
          {priceFormatted(item.itemTotalPrice)}
        </Text>
      </View>
    </View>
  );
};

export default CheckoutItemCard;
