import { router } from "expo-router";

export const goToHome = () => {
  router.push("/(tabs)/home");
};

export const goToLogin = () => {
  router.replace("/(onboarding)/login");
};

export const goToRegister = () => {
  router.replace("/(onboarding)/register");
};

export const goToCheckout = () => {
  router.push("/(ordering_screens)/checkout");
};
