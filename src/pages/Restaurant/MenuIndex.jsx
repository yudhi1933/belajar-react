// src/pages/Restaurant/MenuIndex.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productApi } from '../../services/api';

const MenuIndex = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Menggunakan READ API untuk mendapatkan semua produk
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProducts();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Gagal memuat data. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Menu</h1>
        <Link 
          to="/restaurant/create" 
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
        >
          Tambah Menu
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-md text-center">
          <p className="text-gray-600">Belum ada menu yang tersedia.</p>
          <Link 
            to="/restaurant/create" 
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Tambah Menu Pertama
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(product => (
            <div key={product.id} className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="p-4">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-green-600 font-bold">Rp {product.price}</p>
                <p className="text-gray-600 mt-2">{product.description}</p>
              </div>
              <div className="bg-gray-50 px-4 py-3 border-t flex justify-end gap-2">
                <Link 
                  to={`/restaurant/edit/${product.id}`}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Edit
                </Link>
                <Link 
                  to={`/restaurant/delete/${product.id}`}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                >
                  Hapus
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuIndex;