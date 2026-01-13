import api from "./api";

// Get all users (admin only)
export const getAllUsers = async () => {
  try {
    const response = await api.get("/admin/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get all orders (admin only)
export const getAllOrders = async () => {
  try {
    const response = await api.get("/orders");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update order status (admin only)
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await api.put(`/orders/${orderId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create new product (admin only)
export const createProduct = async (productData) => {
  try {
    const response = await api.post("/products", productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update product (admin only)
export const updateProduct = async (productId, productData) => {
  try {
    const response = await api.put(`/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete product (admin only)
export const deleteProduct = async (productId) => {
  try {
    const response = await api.delete(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// adminService.js mein add karein:
export const updateUserRole = async (userId, role) => {
  try {
    const response = await api.put(`/admin/user/${userId}`, { role });
    return response.data;
  } catch (error) {
    throw error;
  }
};
