import React, { useEffect } from "react";
import { Redirect, Stack } from "expo-router";
import { useAuthStore } from "@/store/useAuth";

const AuthLayout = () => {
  const { authUser } = useAuthStore();

  if (authUser) return <Redirect href="/(tabs)/home" />;
  return (
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
