import React from 'react';

function MenuDetail({ menu }) {
  if (!menu) {
    return <div>Menu tidak ditemukan</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-2">{menu.name}</h2>
      <p className="text-green-600 font-bold text-xl mb-4">Rp {menu.price}</p>
      
      <div className="mb-4">
        <h3 className="text-gray-700 font-semibold mb-1">Deskripsi:</h3>
        <p className="text-gray-600">{menu.description || 'Tidak ada deskripsi'}</p>
      </div>
    </div>
  );
}

export default MenuDetail;