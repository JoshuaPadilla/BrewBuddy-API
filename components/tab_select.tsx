import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

interface ComponentProps {
  options: string[];
  selected: string;
  setSelected: (option: string) => void;
}

const TabSelect = ({ options, selected, setSelected }: ComponentProps) => {
  const handleSelect = (option: string) => {
    setSelected(option);
  };

  return (
    <View className="flex-row justify-around items-center">
      {options.map((option, index) => {
        const isSelected = option === selected;

        return (
          <TouchableOpacity
            className={`${
              isSelected ? "border-b-2 border-primary-100" : ""
            } p-4 flex-1 items-center`}
            onPress={() => handleSelect(option)}
            key={index}
          >
            <Text
              className={`text-black-100 text-xl ${
                isSelected ? "font-poppins-semibold " : "font-poppins-regular"
              }`}
            >
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabSelect;
