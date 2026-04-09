import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// LOGIN USER

export const login = async (email, password) => {

  const response = await axios.post(`${API_URL}/login`, {
    email,
    password
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
  }

  return response.data;
};


// REGISTER USER

export const register = async (name, email, password) => {

  const response = await axios.post(`${API_URL}/register`, {
    name,
    email,
    password
  });

  return response.data;
};


// LOGOUT USER

export const logout = () => {

  localStorage.removeItem("token");
  localStorage.removeItem("user");

};



// GET TOKEN

export const getToken = () => {

  return localStorage.getItem("token");

};


// CHECK AUTH

export const isAuthenticated = () => {

  return !!localStorage.getItem("token");

};
