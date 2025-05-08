import React, { useEffect } from "react";

const UpdateTypeProduct = ({ formData, handleChange, typeProduct, saving, onEditTypeProduct }) => {
  const [statusTypeProduct, setStatusTypeProduct] = React.useState();

  useEffect(() => {
    setStatusTypeProduct(formData.type_id);
  },[formData.type_id]);
  
  // Fungsi untuk mendapatkan warna border berdasarkan nilai field
  const getFieldBorderColor = (value) => {
    if (!value) return "border-red-300"; // Warna border default
    return "border-green-500"; // Warna border jika ada nilai
  };
    
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2" htmlFor="type_id">
        Tipe Menu <span className="text-red-500">*</span>
      </label>
      <div className="flex gap-2">
        <select
          id="type_id"
          name="type_id"
          value={formData.type_id}
          onChange={handleChange}
          disabled={saving}
          className={`w-full border-2 ${getFieldBorderColor(formData.type_id)} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white`}
        >
          <option value="">Pilih Tipe Menu</option>
          {typeProduct.map((type) => (
            <option key={type.id} value={type.id} onClick={() => setStatusTypeProduct(type.id)}>
              {type.name}
            </option>
          ))}
        </select>

        < button type="button" className="px-3 py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500 focus:outline-none hover:cursor-pointer" onClick={() => onEditTypeProduct(statusTypeProduct)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default UpdateTypeProduct;
