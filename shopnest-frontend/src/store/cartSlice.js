import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../api/axiosConfig";

const calculateTotal = (items) =>
  items.reduce((sum, item) => {
    if (!item.product) {
      return sum;
    }

    const unitPrice = item.product.discountedPrice ?? item.product.price;
    return sum + unitPrice * item.quantity;
  }, 0);

const getUserId = (state) => state.auth.user?.id;

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const userId = getUserId(getState());

      if (!userId) {
        return rejectWithValue("Please log in to view your cart.");
      }

      const response = await api.get(`/api/cart/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to load cart.",
      );
    }
  },
);

export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async ({ productId, quantity = 1 }, { getState, rejectWithValue }) => {
    try {
      const userId = getUserId(getState());

      if (!userId) {
        return rejectWithValue("Please log in to add items to your cart.");
      }

      const response = await api.post(
        `/api/cart/add?userId=${userId}&productId=${productId}&quantity=${quantity}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add item to cart.",
      );
    }
  },
);

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ id, quantity }, { rejectWithValue }) => {
    if (quantity < 1) {
      return rejectWithValue("Quantity must be at least 1.");
    }

    try {
      const response = await api.put(`/api/cart/update/${id}?quantity=${quantity}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart item.",
      );
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/api/cart/remove/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove cart item.",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    total: 0,
    loading: false,
    error: null,
    actionLoading: false,
    actionError: null,
    successMessage: null,
  },
  reducers: {
    clearCartMessages: (state) => {
      state.error = null;
      state.actionError = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.items = action.payload;
        state.total = calculateTotal(action.payload);
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load cart.";
      })
      .addCase(addCartItem.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
        state.successMessage = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        const existingItem = state.items.find((item) => item.id === action.payload.id);

        if (existingItem) {
          existingItem.quantity = action.payload.quantity;
          existingItem.price = action.payload.price;
          existingItem.product = action.payload.product;
        } else {
          state.items.push(action.payload);
        }

        state.total = calculateTotal(state.items);
        state.actionLoading = false;
        state.successMessage = "Item added to cart.";
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload || "Failed to add item to cart.";
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        const updatedItem = action.payload;
        const itemIndex = state.items.findIndex((item) => item.id === updatedItem.id);

        if (itemIndex !== -1) {
          state.items[itemIndex] = {
            ...state.items[itemIndex],
            ...updatedItem,
          };
        }

        state.total = calculateTotal(state.items);
        state.actionLoading = false;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload || "Failed to update cart item.";
      })
      .addCase(removeCartItem.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.total = calculateTotal(state.items);
        state.actionLoading = false;
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload || "Failed to remove cart item.";
      });
  },
});

export const { clearCartMessages } = cartSlice.actions;
export default cartSlice.reducer;
