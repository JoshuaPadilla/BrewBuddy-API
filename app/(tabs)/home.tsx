import {
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductCard from "@/components/product_card";
import SearchBar from "@/components/search_bar";
import CustomButton from "@/components/custom_button";
import { images } from "@/constants/images";
import { useProductStore } from "@/store/useProduct";
import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";
import BottomSheetComponent from "@/components/bottomSheetContent";
import { useCartStore } from "@/store/useCart";

const HomeTab = () => {
  const sheetRef = useRef<BottomSheetMethods>(null);

  const { products, isLoading, fetchAllProducts, selectedProduct } =
    useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const handleCartPress = () => {
    sheetRef.current?.open();
  };

  const handleAddToCartSubmit = () => {
    sheetRef.current?.close();
  };

  const [query, setQuery] = useState("");

  return (
    <>
      <SafeAreaView className="px-4 py-8 flex-1">
        {/* headings */}
        <View className="flex-row mt-4 mb-4 justify-between items-center">
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
          contentContainerClassName="items-center overflow-hidden"
          showsVerticalScrollIndicator={false}
        >
          {isLoading ? (
            <ActivityIndicator
              color={"#73C088"}
              className="p-32"
              size={"large"}
            />
          ) : (
            <View className="flex-row justify-between flex-wrap overflow-hidden">
              {products.length > 0 &&
                products.map((product, index) => (
                  <ProductCard
                    key={index}
                    product={product}
                    onAddToCartPress={handleCartPress}
                  />
                ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <BottomSheet
        ref={sheetRef}
        height="90%"
        modal={false}
        closeDuration={100}
        style={{ backgroundColor: "#FFFFFF" }}
        disableBodyPanning={true}
      >
        <View>
          {selectedProduct && (
            <BottomSheetComponent onSubmit={handleAddToCartSubmit} />
          )}
        </View>
      </BottomSheet>
    </>
  );
};

export default HomeTab;
