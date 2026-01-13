import api from "./api";

// Create new order
export const createOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get user's orders
export const getMyOrders = async () => {
  try {
    const response = await api.get("/orders/my-orders");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get single order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Mark order as paid
export const payOrder = async (orderId, paymentData) => {
  try {
    const response = await api.put(`/orders/${orderId}/pay`, paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get order history
export const getOrderHistory = async () => {
  try {
    const response = await api.get("/orders/history");
    return response.data;
  } catch (error) {
    throw error;
  }
};
