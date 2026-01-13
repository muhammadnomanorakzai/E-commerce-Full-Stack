import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as cartService from "../../services/cartService";

// Fetch Cart
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await cartService.getCart();
      return response.cart;
    } catch (error) {
      if (error.response?.status === 404) {
        return { items: [], totalPrice: 0 };
      }
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

// Add Item
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await cartService.addToCart(productId, quantity);
      return response.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

// Remove Item
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await cartService.removeFromCart(productId);
      return response.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove from cart"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    items: [],
    totalPrice: 0,
    loading: false,
    error: null,
  },
  reducers: {}, // 👈 EMPTY
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.items || [];
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.items = [];
        state.totalPrice = 0;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.items || [];
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cart = action.payload;
        state.items = action.payload.items || [];
        state.totalPrice = action.payload.totalPrice || 0;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default cartSlice.reducer;
