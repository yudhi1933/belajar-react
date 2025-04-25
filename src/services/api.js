import axios from 'axios';

const API_URL = 'http://restaurant-app.test/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const productApi = {
  // READ - GET
  getProducts: async () => {
    const response = await apiClient.get('/products');
    return response.data;
  },
  
  // CREATE - POST
  createProduct: async (data) => {
    const response = await apiClient.post('/products', data);
    return response.data;
  },

  // UPDATE - PUT
  updateProduct: async (id, data) => {
    const response = await apiClient.put(`/products/${id}`, data);
    return response.data;
  },
  
  // DELETE - DELETE
  deleteProduct: async (id) => {
    await apiClient.delete(`/products/${id}`);
    return true;
  }
};

export const typeProductApi = {
  getAllTypeProduct: async () => {
    const response = await apiClient.get('/type-products');
    return response.data;
  },

  createTypeProduct: async (data) => {
    const response = await apiClient.post('/type-products',data);
    return response.data;
  },
}