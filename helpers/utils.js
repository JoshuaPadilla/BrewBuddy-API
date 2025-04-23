export const generateUniqueFileName = (originalname, productName) => {
  const extension = originalname.split(".").pop();
  const timestamp = Date.now(); // Get current timestamp
  return `${productName}-${timestamp}.${extension}`;
};

export const getStatus = (quantity, unitOfMeasurement) => {
  if (quantity === 0) {
    return "out";
  }

  const lowerCaseUnit = unitOfMeasurement.toLowerCase();

  if (lowerCaseUnit === "pcs") {
    if (quantity <= 20) {
      return "low";
    } else {
      return "in";
    }
  } else if (lowerCaseUnit === "kg" || lowerCaseUnit === "liters") {
    if (quantity <= 2) {
      return "low";
    } else {
      return "in";
    }
  } else {
    // Handle cases with other units of measurement
    // You might want to set a default low threshold or return a specific status
    if (quantity <= 5) {
      return "low";
    } else {
      return "in";
    }
  }
};
