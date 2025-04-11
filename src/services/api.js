// import axios from 'axios';

// const api = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com',
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   }
// });

// export default api;
// ini atas yang lama jangan dihapus





// src/services/api.js
// File ini berisi fungsi untuk berinteraksi dengan API backend

import axios from 'axios';

// Ganti BASE_URL dengan URL API backend Anda
const BASE_URL = 'https://api.restaurant-backend.com/api';

// Konfigurasi axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Tambahkan header autentikasi jika diperlukan
    // 'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export const api = {
  // Mendapatkan semua menu
  getMenus: async () => {
    try {
      const response = await apiClient.get('/menus');
      return response.data;
    } catch (error) {
      console.error('Error fetching menus:', error);
      throw error;
    }
  },
  
  // Mendapatkan menu berdasarkan ID
  getMenuById: async (id) => {
    try {
      const response = await apiClient.get(`/menus/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching menu ${id}:`, error);
      throw error;
    }
  },
  
  // Menambahkan menu baru
  createMenu: async (menuData) => {
    try {
      const response = await apiClient.post('/menus', menuData);
      return response.data;
    } catch (error) {
      console.error('Error creating menu:', error);
      throw error;
    }
  },
  
  // Memperbarui menu yang ada
  updateMenu: async (id, menuData) => {
    try {
      const response = await apiClient.put(`/menus/${id}`, menuData);
      return response.data;
    } catch (error) {
      console.error(`Error updating menu ${id}:`, error);
      throw error;
    }
  },
  
  // Menghapus menu
  deleteMenu: async (id) => {
    try {
      await apiClient.delete(`/menus/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting menu ${id}:`, error);
      throw error;
    }
  }
};