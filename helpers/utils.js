export const generateUniqueFileName = (originalname, productName) => {
  const extension = originalname.split(".").pop();
  const timestamp = Date.now(); // Get current timestamp
  return `${productName}-${timestamp}.${extension}`;
};
