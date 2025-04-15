import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/custom_button";
import { useAuthStore } from "@/store/useAuth";

const Account = () => {
  const { logout } = useAuthStore();

  return (
    <SafeAreaView className="flex-1 items-center justify-center">
      <CustomButton title="Logout" onPress={logout} />
    </SafeAreaView>
  );
};

export default Account;
