// src/pages/Restaurant/DeleteMenu.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productApi } from '../../services/api';

const DeleteMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Mengambil data produk untuk konfirmasi penghapusan
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const products = await productApi.getProducts();
        const product = products.find(p => p.id == id);
        if (product) {
          setProduct(product);
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
  
  // Menggunakan DELETE API
  const handleDelete = async () => {
    try {
      setLoading(true);
      await productApi.deleteProduct(id);
      navigate('/restaurant');
    } catch (error) {
      console.error('Error deleting product:', error);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading || !product) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Hapus Menu</h1>
      
      <div className="bg-red-50 border border-red-200 p-4 rounded-md max-w-md">
        <h2 className="text-xl mb-4">
          Apakah Anda yakin ingin menghapus menu ini?
        </h2>
        
        <div className="bg-white p-4 rounded mb-4">
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-green-600">Rp {product.price}</p>
          {product.description && <p className="text-gray-600 mt-2">{product.description}</p>}
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Menghapus...' : 'Ya, Hapus Menu'}
          </button>
          <button
            onClick={() => navigate('/restaurant')}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteMenu;