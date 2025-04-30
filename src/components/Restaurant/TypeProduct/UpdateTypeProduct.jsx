import React from "react";

// const UpdateTypeProduct = ({ formData, handleChange, typeProduct, saving, onEditTypeProduct }) => {
const getFieldBorderColor = (value) => {
  return value ? "border-green-500" : "border-red-500";
};

const UpdateTypeProduct = ({ formData, handleChange, typeProduct, saving, onEditTypeProduct }) => {
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
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <button className="px-3 py-2 bg-yellow-400 text-white font-semibold rounded-md hover:bg-yellow-500 focus:outline-none" onClick={onEditTypeProduct}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default UpdateTypeProduct;
