import api from "./api";

// Add to cart
export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post("/cart/add", {
      productId,
      quantity,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get cart
export const getCart = async () => {
  try {
    const response = await api.get("/cart");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Remove from cart
export const removeFromCart = async (productId) => {
  try {
    const response = await api.delete(`/cart/remove/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
