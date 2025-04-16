import { View, Text } from "react-native";
import React from "react";
import CustomButton from "./custom_button";

interface Props {
  currentValue: number;
  onAdd: () => void;
  onSub: () => void;
}

const QuatityButton = ({ currentValue, onAdd, onSub }: Props) => {
  return (
    <View className="flex-row items-center">
      <CustomButton
        title="-"
        textClassname="font-poppins-bold text-white"
        btnClassname="items-center px-3 bg-primary-100 rounded-lg"
        onPress={onSub}
      />

      <View className="px-5">
        <Text className="font-poppins-bold text-primary-100 text-xl">
          {currentValue}
        </Text>
      </View>

      <CustomButton
        title="+"
        textClassname="font-poppins-bold text-white"
        btnClassname="items-center px-3 bg-primary-100 rounded-lg"
        onPress={onAdd}
      />
    </View>
  );
};

export default QuatityButton;
