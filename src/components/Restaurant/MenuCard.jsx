// src/components/Restaurant/MenuCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const MenuCard = ({ product, typeProduct }) => {
  // Mendapatkan tipe menu berdasarkan id produk

  // Mendapatkan tipe menu berdasarkan id produk
  const getMenuType = typeProduct.find((type) => type.id === product.type_id);

  // Validasi ketika ada price yang 0 maka akan di tampilkan "Gratis"
  const formatPrice = (price) => {
    return price === 0 ? "Gratis" : `Rp ${price.toLocaleString("id-ID")}`;
  };

  return (
    <div className="border rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {product.img && (
        <div className="h-48 overflow-hidden bg-gray-100">
          <img
            src={product.img}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
            }}
          />
        </div>
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-lg font-bold">{product.name}</h2>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">{getMenuType.name}</span>
        </div>
        <p className="text-green-600 font-bold">{formatPrice(product.price)}</p>
        <p className="text-sm text-gray-500 mt-1">Stok: {product.stock}</p>
        {product.description && <p className="text-gray-600 mt-2 text-sm">{product.description}</p>}
      </div>
      <div className="bg-gray-50 px-4 py-3 border-t flex justify-end gap-2">
        <Link to={`/restaurant/edit/${product.id}`} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition-colors">
          Edit
        </Link>
        <Link to={`/restaurant/delete/${product.id}`} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors">
          Hapus
        </Link>
      </div>
    </div>
  );
};

export default MenuCard;
