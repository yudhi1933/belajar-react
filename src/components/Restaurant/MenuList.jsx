import React from 'react';
import { Link } from 'react-router-dom';

function MenuList({ menus }) {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4">Daftar Menu</h2>
      
      {menus.length === 0 ? (
        <p className="text-gray-500">Belum ada menu yang ditambahkan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {menus.map(menu => (
            <div key={menu.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="text-lg font-medium">{menu.name}</h3>
              <p className="text-green-600 font-bold">Rp {menu.price}</p>
              <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
              <div className="mt-4 flex gap-2">
                <Link 
                  to={`/restaurant/update/${menu.id}`} 
                  className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                >
                  Edit
                </Link>
                <Link 
                  to={`/restaurant/delete/${menu.id}`} 
                  className="px-3 py-1 bg-red-500 text-white rounded text-sm"
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
}

export default MenuList;