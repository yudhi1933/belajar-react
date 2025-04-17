import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { productApi } from '../../services/api';

const CreateMenu = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type_id: '',
    price: '',
    stock: '',
    img: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Menggunakan CREATE API
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await productApi.createProduct(formData);
      navigate('/restaurant');
    } catch (error) {
      console.error('Error creating product:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Tambah Menu Baru</h1>
      
      <form onSubmit={handleSubmit} className="max-w-md">
        {/* Nama Menu */}
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
        
        {/* Tipe Menu (Select) */}
        <div className="mb-4">
          <label className="block mb-2">Tipe Menu</label>
          <select
            name="type_id"
            value={formData.type_id}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Pilih Tipe Menu</option>
            <option value="1">Minuman</option>
            <option value="2">Makanan</option>
          </select>
        </div>
        
        {/* Harga */}
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
        
        {/* Stok */}
        <div className="mb-4">
          <label className="block mb-2">Stok</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        
        {/* Gambar (URL) */}
        <div className="mb-4">
          <label className="block mb-2">URL Gambar</label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        {/* Deskripsi */}
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
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {loading ? 'Menyimpan...' : 'Simpan Menu'}
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

export default CreateMenu;