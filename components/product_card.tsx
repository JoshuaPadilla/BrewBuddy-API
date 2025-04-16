import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { images } from "@/constants/images";
import { useProductStore } from "@/store/useProduct";
import { textShortener } from "@/helpers/utils";
import CustomButton from "./custom_button";
import { util_icons } from "@/constants/icons";
import { useAuthStore } from "@/store/useAuth";
import { goToLogin } from "@/helpers/router_function";

interface ProductCardProps {
  product: Product;
  onAddToCartPress?: () => void;
}

const ProductCard = ({ product, onAddToCartPress }: ProductCardProps) => {
  const { authUser } = useAuthStore();
  const { setSelectedProduct } = useProductStore();

  const handleProductPress = () => {
    if (!authUser) {
      return goToLogin();
    }

    setSelectedProduct(product);
  };

  const handleAddToCart = () => {
    setSelectedProduct(product);
    onAddToCartPress && onAddToCartPress();
  };

  return (
    <View className="p-2 w-[48%] h-[250px] mb-4 items-center gap-2">
      {/* product image */}
      <TouchableOpacity
        className="bg-blue-100 w-52 h-52 overflow-hidden"
        onPress={handleProductPress}
      >
        <Image
          source={images.p1}
          resizeMode="contain"
          className="size-full rounded-lg"
        />
      </TouchableOpacity>

      {/* product name and price */}
      <View className="flex-row justify-between w-full items-end">
        <View>
          <Text className="font-poppins-medium">
            {textShortener(product.productName, 16)}
          </Text>
          <Text className="font-poppins-semibold text-primary-100">
            &#8369; {product.productBasePrice.toFixed(2)}
          </Text>
        </View>

        <CustomButton
          iconLeft={util_icons.add_to_cart_icon}
          iconSize="size-8"
          onPress={handleAddToCart}
        />
      </View>
    </View>
  );
};

export default ProductCard;
