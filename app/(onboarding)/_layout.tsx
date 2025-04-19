import React, { useEffect } from "react";
import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/store/useAuth";
import { useProductStore } from "@/store/useProduct";

const AuthLayout = () => {
  const { fetchAllProducts } = useProductStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (authUser?.role === "user") return <Redirect href="/(tabs)/home" />;
  if (authUser?.role === "admin")
    return <Redirect href="/(staff)/orders_screen" />;

  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
