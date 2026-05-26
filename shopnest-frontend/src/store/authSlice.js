import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Api/axiosConfig";

const getStoredAuth = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return {
    token,
    user,
    isAuthenticated: Boolean(token && user),
  };
};

const initialAuth = getStoredAuth();

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/auth/login", { email, password });
      return response.data;
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        return rejectWithValue(
          "Cannot connect to the backend at http://localhost:8080. Start the backend server and try again.",
        );
      }

      const serverMessage =
        typeof error.response?.data === "string"
          ? error.response.data
          : error.response?.data?.message;

      return rejectWithValue(
        serverMessage || "Login failed. Please check your email and password.",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: initialAuth.token,
    user: initialAuth.user,
    loading: false,
    isInitialized: true,
    isAuthenticated: initialAuth.isAuthenticated,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { token, user } = action.payload;

        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        state.token = token;
        state.user = user;
        state.loading = false;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed. Please try again.";
      });
  },
});

export const { logoutUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
