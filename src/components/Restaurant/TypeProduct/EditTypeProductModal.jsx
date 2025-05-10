import React, { useEffect } from "react";

const EditTypeProductModal = ({ editedTypeProduct, onChange, onClose, onSave }) => {

  useEffect(() => {
    console.log("editedTypeProduct", editedTypeProduct);
  }, [editedTypeProduct]);

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-semibold mb-4">Edit Tipe Produk</h2>

        {Object.keys(editedTypeProduct)
        .filter((key) => key === "name")
        .map((key,index ) => (
        // .map((key) => (
        <div key={key} className="mb-4">
            <input type="text"
              value={index.name}
              onChange={(e) => onChange(key, e.target.value)}
              className="border w-full px-3 py-2 rounded-md"
            />
          </div>
        ))}

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            className="hover:cursor-pointer bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            onClick={onClose} // Fungsi untuk menutup modal
          >
            Batal
          </button>
          <button
            type="button"
            className="hover:cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
