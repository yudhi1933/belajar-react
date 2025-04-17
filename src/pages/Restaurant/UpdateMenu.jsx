// src/pages/Restaurant/UpdateMenu.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../../services/api';

const UpdateMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);
  
  // Mengambil data produk untuk diedit
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const products = await productApi.getProducts();
        const product = products.find(p => p.id == id);
        if (product) {
          setFormData(product);
        } else {
          alert('Produk tidak ditemukan');
          navigate('/restaurant');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Menggunakan UPDATE API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await productApi.updateProduct(id, formData);
      navigate('/restaurant');
    } catch (error) {
      console.error('Error updating product:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Menu</h1>
      
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block mb-2">Nama Menu</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Harga</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-2">Deskripsi</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="4"
          />
        </div>
        
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Perbarui Menu'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/restaurant')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMenu;
