import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add JWT token automatically

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});




  //  AUTH APIs


export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

export const registerUser = (data) => {
  return api.post("/auth/register", data);
};




  //  PRODUCT APIs


export const getAllProducts = () => {
  return api.get("/products");
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

export const createProduct = (data) => {
  return api.post("/admin/product", data);
};

export const updateProduct = (id, data) => {
  return api.put(`/admin/product/${id}`, data);
};

export const deleteProduct = (id) => {
  return api.delete(`/admin/product/${id}`);
};




  //  CART APIs


export const getCart = (userId) => {
  return api.get(`/api/cart/user/${userId}`);
};

export const addToCart = (userId, productId, quantity) => {
  return api.post(
    `/api/cart/add?userId=${userId}&productId=${productId}&quantity=${quantity}`,
  );
};

export const updateCartItem = (id, quantity) => {
  return api.put(`/api/cart/update/${id}?quantity=${quantity}`);
};

export const removeCartItem = (id) => {
  return api.delete(`/api/cart/remove/${id}`);
};




  //  ORDER APIs

export const placeOrder = (userId) => {
  return api.post(`/api/orders/create/${userId}`);
};

export const getOrders = (userId) => {
  return api.get(`/api/orders/user/${userId}`);
};



  //  ADMIN APIs


export const getUsers = () => {
  return api.get("/admin/users");
};

export const getUserCount = () => {
  return api.get("/admin/users/count");
};

export const getProductCount = () => {
  return api.get("/admin/products/count");
};

export const getOrderCount = () => {
  return api.get("/admin/orders/count");
};

export default api;
