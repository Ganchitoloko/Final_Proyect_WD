import axios from "axios";

// Función para login
export const loginUser = async (credentials) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al iniciar sesión.");
  }
};

// Función para registro
export const registerUser = async (userData) => {
  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", userData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error al registrarse.");
  }
};
