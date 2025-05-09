import { useEffect, useState } from 'react';
import { typeProductApi } from '../../../services/api';

export default function CreateTypeModal({ isOpen, onClose, onSuccess }) {
  const [typeName, setTypeName] = useState('');
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  // Untuk close modal saat tekan ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleClickOutside = (e) => {
    if (e.target.id === 'modal-overlay') {
      onClose();
    }
  };

  const handleSubmitType = async () => {
    if (!typeName.trim()) return;

    try {
      setLoading(true);
      const data = await typeProductApi.createTypeProduct({ name: typeName });
      onSuccess(data);
      } catch (error) {
        console.log('gagal menyimpan tipe produk', error);
      } finally {
        setLoading(false);
      } 
    };

  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tambah Tipe Baru</h2>
          <button
            type='button'
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-lg font-bold"
          >
            ×
          </button>
        </div>
        <input
          id="typeInput"
          type="text"
          placeholder="Masukkan nama tipe"
          className="w-full border p-2 rounded mb-4"
          value={typeName}
          onChange={(e) => setTypeName(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            type='button'
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 hover:cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSubmitType}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 hover:cursor-pointer"
          >
          {loading ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </div>
  );
};

