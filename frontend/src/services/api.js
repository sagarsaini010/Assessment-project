import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Get all products (with optional search)
export const getAllProducts = async (search = '') => {
  const params = search ? { search } : {};
  const response = await api.get('/products', { params });
  return response.data;
};

// Get product by ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Create new product
export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

export default api;
