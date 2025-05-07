// src/pages/Restaurant/CreateMenu.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { productApi, typeProductApi } from "../../services/api";
import CreateTypeModal from "../../components/Restaurant/TypeProduct/CreateTypeModal"; // Import komponen untuk menambah type menu

const CreateMenu = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type_id: "",
    price: "",
    stock: "",
    img: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Menggunakan READ type product API untuk mendapatkan semua produk
  const [typeProduct, setTypeProduct] = useState([]);
  // menggunakan POST type product API untuk menambah type product
  const [isModalOpen, setIsModalOpen] = useState(false); // State untuk mengontrol modal
  // const [showModal, setShowModal] = useState(false);

  // ambil data semua type product dari API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await typeProductApi.getAllTypeProduct();
        setTypeProduct(result);
      } catch (error) {
        console.error("Gagal ambil data tipe produk:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fungsi dipanggil setelah berhasil tambah type baru
  const handleCreateType = (typeBaru) => {
    setTypeProduct((prev) => [...prev, typeBaru]); // tambah ke list
    setFormData((prev) => ({ ...prev, type_id: typeBaru.id })); // langsung pilih
    console.warning("Tipe produk baru ditambahkan:", typeBaru);
    console.warning(formData);
    setIsModalOpen(false); // tutup modal
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Menggunakan CREATE API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      await productApi.createProduct(formData);
      navigate("/restaurant");
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Gagal menambahkan menu. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Cek apakah form valid (untuk tombol submit)
  const isFormValid = formData.name.trim() !== "" && formData.type_id !== "" && formData.price !== "" && formData.stock !== "" && formData.img.trim() !== "" && formData.description.trim() !== "";

  // Helper function untuk menentukan warna border field
  const getFieldBorderColor = (fieldValue) => {
    if (!fieldValue || fieldValue === "") {
      return "border-red-500"; // Belum diisi (merah)
    }
    return "border-green-500"; // Sudah diisi (hijau)
  };

  // Preview gambar
  const imagePreview = formData.img ? (
    <div className="mt-2">
      <img
        src={formData.img}
        alt="Preview"
        className="h-40 object-cover rounded-md"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x200?text=Broken+Image";
        }}
      />
    </div>
  ) : null;

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Tambah Menu Baru</h1>
        <p className="text-gray-600 mt-1">Masukkan informasi untuk menu baru</p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nama Menu */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
                Nama Menu <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full border-2 ${getFieldBorderColor(formData.name)} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Masukkan nama menu"
                disabled={loading}
              />
            </div>

            {/* Tipe Menu (Select) */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="type_id">
                Tipe Menu <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <select
                  id="type_id"
                  name="type_id"
                  value={formData.type_id}
                  onChange={handleChange}
                  className={`w-full border-2 ${getFieldBorderColor(formData.type_id)} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
                  disabled={loading}
                >
                  <option value="">Pilih Tipe Menu</option>
                  {typeProduct.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 mb-4 hover:cursor-pointer ml-2" disabled={loading}>
                  Tambah
                </button>
                <CreateTypeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={handleCreateType} />
              </div>
            </div>
            {/* Harga */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="price">
                Harga (Rp) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={`w-full border-2 ${getFieldBorderColor(formData.price)} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Masukkan harga"
                min="0"
                disabled={loading}
              />
            </div>

            {/* Stok */}
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="stock">
                Stok <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full border-2 ${getFieldBorderColor(formData.stock)} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="Masukkan jumlah stok"
                min="0"
                disabled={loading}
              />
            </div>

            {/* Gambar (URL) */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="img">
                URL Gambar <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="img"
                name="img"
                value={formData.img}
                onChange={handleChange}
                className={`w-full border-2 ${getFieldBorderColor(formData.img)} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="https://example.com/image.jpg"
                disabled={loading}
              />
              {imagePreview}
            </div>

            {/* Deskripsi */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="description">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`w-full border-2 ${getFieldBorderColor(formData.description)} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                rows="4"
                placeholder="Deskripsi menu..."
                disabled={loading}
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => navigate("/restaurant")}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isFormValid ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Menyimpan...
                </>
              ) : (
                "Simpan Menu"
              )}
            </button>
          </div>

          {!isFormValid && <div className="mt-2 text-center text-red-500 text-sm">Harap lengkapi semua bidang yang ditandai (*) untuk menyimpan menu</div>}
        </form>
      </div>
    </div>
  );
};

export default CreateMenu;
