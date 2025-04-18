import { router } from "expo-router";

export const goBack = () => {
  router.back();
};

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

export const goToVoucherAndReward = () => {
  router.push("/(utility_screens)/voucher_rewards");
};

export const goToFAQ = () => {
  router.push("/(utility_screens)/faq");
};

export const goToAccountSettings = () => {
  router.push("/(utility_screens)/account_settings");
};

export const goToHelpCenter = () => {
  router.push("/(utility_screens)/help_center");
};

export const goToEditProfile = () => {
  router.push("/(utility_screens)/edit_profile");
};
