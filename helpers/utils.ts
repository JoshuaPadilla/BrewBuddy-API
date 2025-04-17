import { Alert } from "react-native";

export const isRegistrationFormValid = (form: RegistrationForm) => {
  if (
    !form.email.trim() ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(form.email)
  ) {
    Alert.alert("invalid email");
    return false;
  }

  if (form.password.length < 8) {
    Alert.alert("password must be atleast 8 characters long");
    return false;
  }

  if (form.password !== form.confirmPassword) {
    Alert.alert("passwords do not match");
    return false;
  }

  if (!form.number || !form.firstName || !form.lastName) {
    Alert.alert("Please fill in all fields");
    return false;
  }

  return true;
};

export const textShortener = (originalWord: string, maxNumOfLetter: number) => {
  if (!originalWord) {
    return ""; // Handle null or empty input
  }

  if (originalWord.length <= maxNumOfLetter) {
    return originalWord; // Return original if short enough
  }

  return originalWord.substring(0, maxNumOfLetter) + "...";
};

export const priceFormatted = (price?: number): string => {
  if (!price || typeof price !== "number") return "₱ 0.00";

  return `₱ ${price!.toFixed(2)}`;
};

export const generateUniqueID = (): string => {
  const timestamp = Date.now().toString(36);

  return `${Math.random().toString(36).substring(2, 12)} ${timestamp}`;
};
