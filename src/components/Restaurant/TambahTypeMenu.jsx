import React, { useState } from 'react';
import {typeProductApi } from '../../services/api';
// import TambahTypeMenu from './TambahTypeMenu';

export default function TambahTypeMenu({ onSukses, onClose }) {
  const [nama, setNama] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSimpan = async () => {
    if (!nama.trim()) return; // validasi input kosong
  
    try {
      setLoading(true); // set loading state
      const data = await typeProductApi.createTypeProduct({name:nama}); // pakai method dari API
      onSukses(data); // kirim balik ke parent (misalnya buat refresh list, close modal, dsb)
    } catch (error) {
      console.error('Gagal menyimpan tipe produk:', error);
      // bisa tambahkan notifikasi error di sini
    } finally {
      setLoading(false); // reset loading state
    }
  };

  return (

    <div className="mt-4 border p-4 rounded shadow-md w-full max-w-md bg-gray-100">
    <h3 className="font-semibold mb-2">Tambah Type Menu</h3>
    <input
      type="text"
      value={nama}
      onChange={(e) => setNama(e.target.value)}
      placeholder="Nama Type"
      className="w-full border rounded px-3 py-2 mb-2"
    />
    <div className="flex gap-2">
      <button onClick={handleSimpan} disabled={loading} className="bg-blue-500 text-white px-4 py-1 rounded">
        Simpan
      </button>
      <button onClick={onClose} className="bg-gray-400 text-white px-4 py-1 rounded">
        Batal
      </button>
    </div>
  </div>
  );
};