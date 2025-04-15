import { BASE_URL } from "@/constants";
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Alert } from "react-native";

interface StoreState {
  authUser: User | null;
  isLoggingIn: boolean;
  isRegistering: boolean;
  isCheckingAuth: boolean;
  isLoggingOut: boolean;
  register: (form: RegistrationForm) => void;
  login: (formData: LoginForm) => void;
  checkAuth: () => void;
  logout: () => void;
}

export const useAuthStore = create<StoreState>((set) => ({
  authUser: null,
  isLoggingIn: false,
  isRegistering: false,
  isCheckingAuth: false,
  isLoggingOut: false,

  register: async (form) => {
    try {
      set({ isRegistering: true });

      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        set({ authUser: data.user });
        await AsyncStorage.setItem("token", data.token);

        router.replace("/(tabs)/home");
      } else {
        Alert.alert(`${data.message}`);
      }
    } catch (error) {
      console.log("error in registration", error);
      Alert.alert("registration Error");
    } finally {
      set({ isRegistering: false });
    }
  },

  login: async (form) => {
    try {
      set({ isLoggingIn: true });
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.status === "success") {
        // Set the user data and token in storage

        set({ authUser: data.user });
        await AsyncStorage.setItem("token", data.token);

        router.push("/(tabs)/home");
      } else {
        Alert.alert("Login Failed, try again");
      }
    } catch (error) {
      console.log("error in login store", error);
      Alert.alert("Login Error");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoggingOut: true });
      await AsyncStorage.removeItem("token");
      set({ authUser: null });
    } catch (error) {
      Alert.alert("Error logging out");
      console.log(error);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ isCheckingAuth: true });
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        console.log("No token found.");
        return;
      }

      const res = await fetch(`${BASE_URL}/auth/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Add this line
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.user) {
        const isAdmin = data.user.role === "admin";
        set({ authUser: data.user });

        // Import usePetStore at the top of the file and use it here
        // to fetch pets after successful signin
      }
    } catch (error) {
      console.log(error);
    } finally {
      set({ isCheckingAuth: false });
    }
  },
}));
