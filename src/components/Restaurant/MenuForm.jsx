import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MenuForm({ initialData = {}, onSubmit }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    price: initialData.price || '',
    description: initialData.description || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 max-w-md">
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">
          Nama Menu
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="price">
          Harga (Rp)
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          required
          min="0"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Deskripsi
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded-md px-3 py-2"
          rows="3"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md"
        >
          Simpan
        </button>
        <button
          type="button"
          onClick={() => navigate('/restaurant')}
          className="px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Batal
        </button>
      </div>
    </form>
  );
}

export default MenuForm;