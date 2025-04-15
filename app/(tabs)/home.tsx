import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/product_card";
import SearchBar from "@/components/search_bar";
import { useAuthStore } from "@/store/useAuth";
import CustomButton from "@/components/custom_button";
import { images } from "@/constants/images";

const HomeTab = () => {
  const { authUser } = useAuthStore();
  const [query, setQuery] = useState("");

  return (
    <SafeAreaView className="px-4 py-8 flex-1">
      {/* headings */}
      <View className="flex-row mt-4 mb-8 justify-between items-center">
        <Text className="font-poppins-bold text-black-100 text-xl">
          Ready to Place an order?
        </Text>

        <CustomButton iconLeft={images.sample_avatar} iconSize="size-12" />
      </View>

      {/* search bar */}
      <View className="p-2 mb-4">
        <SearchBar
          onSubmit={() => {}}
          placeholder="search"
          queryValue={query}
          setQuery={setQuery}
        />
      </View>

      {/* product list */}
      <ScrollView
        contentContainerClassName="flex-row justify-between flex-wrap"
        showsVerticalScrollIndicator={false}
      >
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeTab;
