import { View, Text, ScrollView } from "react-native";
import React from "react";
import { useCartStore } from "@/store/useCart";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { util_icons } from "@/constants/icons";
import CheckoutItemCard from "@/components/checkout_item_card";

const Checkout = () => {
  const { selectedItems } = useCartStore();

  return (
    <SafeAreaView className="flex-1 gap-4">
      {/* Headings */}
      <View className="flex-row items-center p-6">
        <CustomButton iconLeft={util_icons.back_icon} />

        <Text className="font-poppins-bold text-black-100 text-xl">
          Order Summary
        </Text>
      </View>

      <ScrollView
        contentContainerClassName="pb-[100px]"
        showsVerticalScrollIndicator={false}
      >
        {selectedItems.map((item) => (
          <CheckoutItemCard item={item} key={item._id} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Checkout;
