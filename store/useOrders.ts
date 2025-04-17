import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "@/constants";
import { Alert } from "react-native";
import { router } from "expo-router";

interface StoreState {
  isCreating: boolean;
  createOrder: (order: OrderForm) => void;
}

export const useOrderStore = create<StoreState>((set) => ({
  isCreating: false,

  createOrder: async (order) => {
    try {
      set({ isCreating: true });

      const token = await AsyncStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      const data = await res.json();

      if (data.status === "success") {
        router.replace("/(ordering_screens)/thank_you");
      } else {
        Alert.alert("failed to place your order, please try again");
      }
    } catch (error) {
      console.log("Creating order: ", error);
    } finally {
      set({ isCreating: false });
    }
  },
}));
