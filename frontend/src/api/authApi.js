import API from "../utils/axiosInstance";

// Customer Registration
export const registerCustomer = async (formData) => {
  try {
    const res = await API.post("/auth/register/customer", formData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || "Registration failed";
  }
};

// Admin Registration
export const registerAdmin = async (formData) => {
  try {
    const res = await API.post("/auth/register/admin", formData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || "Registration failed";
  }
};

// Admin Login
export const loginAdmin = async (formData) => {
  try {
    const res = await API.post("/auth/login/admin", formData);
    return res.data;
  } catch (error) {
    throw error.response?.data?.error || "Login failed";
  }
};
