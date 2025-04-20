export const generateUniqueFileName = (originalname, productName) => {
  const extension = originalname.split(".").pop();
  const timestamp = Date.now(); // Get current timestamp
  return `${productName}-${timestamp}.${extension}`;
};

export const getStatus = (quantity) => {
  if (quantity === 0) {
    return "out";
  } else if (quantity < 5) {
    return "low";
  } else {
    return "in";
  }
};
