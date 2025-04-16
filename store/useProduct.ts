import ProductCard from "@/components/product_card";
import { BASE_URL } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

interface StoreState {
  products: Product[];
  selectedProduct: Product | null;
  isLoading: boolean;

  fetchAllProducts: () => void;
  setSelectedProduct: (product: Product) => void;
}

export const useProductStore = create<StoreState>((set) => ({
  products: [],
  selectedProduct: null,
  isLoading: true,

  fetchAllProducts: async () => {
    try {
      set({ isLoading: true });

      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/product`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ products: data.products });
      } else {
        console.log("failed to fetch all products");
      }
    } catch (error) {
      console.log("error in fetching all products", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedProduct: (product) => {
    set({ selectedProduct: product });
  },
}));
