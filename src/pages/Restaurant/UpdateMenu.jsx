// src/pages/Restaurant/UpdateMenu.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productApi, typeProductApi } from "../../services/api";
import UpdateTypeProduct from "../../components/Restaurant/TypeProduct/UpdateTypeProduct";
import EditTypeProductModal from "../../components/Restaurant/TypeProduct/EditTypeProductModal";

const UpdateMenu = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type_id: "",
    price: "",
    stock: "",
    img: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTypeProduct, setEditedTypeProduct] = useState([]);
  // Menggunakan READ API untuk mendapatkan semua produk
  const [typeProduct, setTypeProduct] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const products = await productApi.getProducts();
        const product = products.find((p) => p.id == id);
        if (product) {
          setFormData(product);
        } else {
          setError("Menu tidak ditemukan");
          console.error("Menu tidak ditemukan");
          navigate("/restaurant");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Gagal memuat data menu. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    // Panggil fungsi untuk mendapatkan data tipe produk
    const fetchTypeProduct = async () => {
      try {
        const result = await typeProductApi.getAllTypeProduct();
        setTypeProduct(result);
      } catch (error) {
        console.error("Gagal ambil data tipe produk:", error);
      }
    };
    fetchTypeProduct();
  }, []);

  // Fungsi untuk menangani tombol "Edit" di UpdateTypeProduct
  const handleEditTypeProduct = (idTypeProduct) => {
    // setEditedTypeProduct(typeProduct); // Kirim data typeProduct ke modal
    console.log("idTypeProduct", idTypeProduct);
    console.log(typeProduct.find((p) => p.id == idTypeProduct));
    setEditedTypeProduct(typeProduct.find((p) => p.id  == idTypeProduct)); // Kirim data typeProduct ke modal
    setShowEditModal(true); // Tampilkan modal
  };

  // Fungsi untuk menangani perubahan pada data yang diedit
  const handleEditedChange = (index, newValue) => {
    const updatedData = { ...editedTypeProduct };
    updatedData[index] = { ...updatedData[index], name: newValue}; // Update nama tipe produk yang diedit
    setEditedTypeProduct(updatedData);
  };

  const handleSaveEdit = async () => {
    try {
      setSaving(true);
      setError(null);
      await typeProductApi.updateTypeProduct(editedTypeProduct.id, editedTypeProduct);
      setTypeProduct(editedTypeProduct); // Update state typeProduct dengan data yang diedit
      setShowEditModal(false); // Tutup modal
    } catch (error) {
      console.error("Error updating type product:", error);
      console.log('Detail error', error.response.data);
      setError("Gagal memperbarui tipe produk. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Menggunakan UPDATE API
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);
      await productApi.updateProduct(id, formData);
      navigate("/restaurant");
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Gagal memperbarui menu. Silakan coba lagi.");
    } finally {
      setSaving(false);
    }
  };

  // Cek apakah form valid (untuk tombol submit)
  const isEmpty = (val) =>
    val === "" || val === null || val === undefined;

  const isFormValid = 
    !isEmpty(formData.name.trim()) &&
    !isEmpty(formData.type_id) &&
    !isEmpty(formData.price) &&
    !isEmpty(formData.stock) &&
    !isEmpty(formData.img.trim()) &&
    !isEmpty(formData.description.trim());

  // Helper function untuk menentukan warna border field
  const getFieldBorderColor = (fieldValue) => {
    if (isEmpty(fieldValue)) {
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
        <h1 className="text-2xl font-bold text-gray-800">Edit Menu</h1>
        <p className="text-gray-600 mt-1">Perbarui informasi menu</p>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
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
                  disabled={saving}
                />
              </div>

              {/* Tipe Menu (Select) */}

              <div>
                <UpdateTypeProduct
                  formData={formData}
                  handleChange={handleChange}
                  typeProduct={typeProduct}
                  saving={saving}
                  onEditTypeProduct={handleEditTypeProduct}
                />

                {
                  showEditModal && (
                    <EditTypeProductModal
                      // show={showEditModal}
                      editedTypeProduct={editedTypeProduct}
                      onChange={handleEditedChange}
                      onClose={() => setShowEditModal(false)}
                      onSave={handleSaveEdit}
                    />
                  )
                }
                {/* <EditTypeProductModal show={showEditModal} editedTypeProduct={editedTypeProduct} onChange={handleEditedChange} onClose={() => setShowEditModal(false)} onSave={handleSaveEdit} /> */}
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
                  min="0"
                  disabled={saving}
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
                  min="0"
                  disabled={saving}
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
                  disabled={saving}
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
                  disabled={saving}
                />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/restaurant")}
                className="hover:cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={saving}
              >
                Batal
              </button>
              <button
                type="submit"
                className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isFormValid ? "bg-blue-600 hover:bg-blue-700 hover:cursor-pointer" : "bg-gray-400 cursor-not-allowed"}`}
                disabled={saving || !isFormValid}
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Menyimpan...
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </button>
            </div>

            {!isFormValid && <div className="mt-2 text-center text-red-500 text-sm">Harap lengkapi semua bidang yang ditandai (*) untuk menyimpan menu</div>}
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateMenu;
