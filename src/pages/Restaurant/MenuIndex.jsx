import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { productApi, typeProductApi } from "../../services/api";
import MenuCard from "../../components/Restaurant/MenuCard";

const MenuIndex = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [activeTab, setActiveTab] = useState("all");
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk pencarian
  const [typeProduct, setTypeProduct] = useState([]); // State untuk tipe produk

  // Menggunakan READ API untuk mendapatkan semua produk
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productApi.getProducts();
        setProducts(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Gagal memuat data. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    const fetchTypeProducts = async () => {
      try {
        setLoading(true);
        const data = await typeProductApi.getAllTypeProduct();
        setTypeProduct(data);
        setError(null);
      } catch (error) {
        console.error("Error fetching type products:", error);
        setError("Gagal memuat data. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };


    fetchTypeProducts();
    fetchProducts();
  }, []);

  // Filter produk berdasarkan tipe dan search query
  const filteredProducts = () => {
    // Filter by search query first
    let filtered = searchQuery ? products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()) || (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()))) : products;

    // Then filter by type
    if (activeTab === 0) // kalau semua menu
      return filtered;
    else // di filter berdasarkan id type
      return filtered.filter((product) => product.type_id === typeProduct.find((type) => type.id === activeTab).id);

    return filtered;
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50 ">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Menu</h1>
        <Link to="/restaurant/create" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
          Tambah Menu
        </Link>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500"
            placeholder="Cari menu..."
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="w-4 h-4 text-gray-500 hover:text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Tab Filter */}
      <div className="mb-6 w-full overflow-x-auto">
        <div className="flex space-x-4 whitespace-nowrap">
          <button onClick={() => setActiveTab(0)} className={`py-2 px-4 ${activeTab === 0 ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}>
            Semua Menu
          </button>
          {typeProduct.map((type) => (
            <button key={type.id} onClick={() => setActiveTab(type.id)} className={`py-2 px-4 ${activeTab === type.id ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"}`}>
              {type.name}
            </button>
          ))}
        </div>
      </div>

      {/* Search results info */}
      {searchQuery && (
        <div className="mb-4 text-gray-600">
          Hasil pencarian untuk "{searchQuery}": {filteredProducts().length} menu ditemukan
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredProducts().length === 0 ? (
        <div className="bg-gray-100 p-6 rounded-md text-center">
          {searchQuery ? (
            <p className="text-gray-600">Tidak ada menu yang cocok dengan pencarian "{searchQuery}".</p>
          ) : (
            <p className="text-gray-600">{activeTab === "all" ? "Belum ada menu yang tersedia." : activeTab === "food" ? "Belum ada menu makanan yang tersedia." : "Belum ada menu minuman yang tersedia."}</p>
          )}
          <Link to="/restaurant/create" className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Tambah Menu Baru
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts().map((product) => (
            <MenuCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuIndex;
