import React from 'react';

const EditTypeProductModal = ({ show, editedTypeProduct, onChange, onClose, onSave }) => {
  if (!show) return null; // Tidak tampil jika show false

  return (
    <div
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Close modal ketika klik di luar
    >
      <div
        className="bg-white p-6 rounded-md shadow-md w-full max-w-md"
        onClick={(e) => e.stopPropagation()} // Menghentikan event bubbling agar tidak menutup modal
      >
        <h2 className="text-xl font-semibold mb-4">Edit Tipe Produk</h2>

        {editedTypeProduct.map((type, index) => (
          <div key={type.id} className="mb-4">
            <input
              type="text"
              value={type.name}
              onChange={(e) => onChange(index, e.target.value)}
              className="border w-full px-3 py-2 rounded-md"
            />
          </div>
        ))}

        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={onClose} // Fungsi untuk menutup modal
          >
            Batal
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={onSave} // Fungsi untuk menyimpan perubahan
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTypeProductModal;
