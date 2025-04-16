import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface RadioButtonProps {
  label: string;
  price: number;
  selected: boolean;
  onPress: () => void;
}

const RadioButton = ({ label, price, selected, onPress }: RadioButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex-row justify-between items-center"
    hitSlop={10}
  >
    <View className="flex-row gap-2 items-center">
      <View
        className={`border-2 border-primary-100 size-4 rounded-full ${
          selected ? "bg-primary-100" : ""
        }`}
      ></View>

      <Text
        className={`font-poppins-medium   ${
          selected ? "text-lg text-primary-100" : "text-m text-black-100"
        }`}
      >
        {label}
      </Text>
    </View>
    <Text
      className={`font-poppins-medium   ${
        selected ? "text-lg text-primary-100" : "text-m text-black-100"
      }`}
    >
      &#8369; {price.toFixed(2)}
    </Text>
  </TouchableOpacity>
);

export default RadioButton;
