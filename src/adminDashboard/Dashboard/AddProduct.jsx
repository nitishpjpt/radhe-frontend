import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    description: "",
    price: "",
    category: "",
    brandName: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", product.productName);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("brandName", product.brandName);
    formData.append("image", product.image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/add`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      toast.success("Product added successfully!");
      
      setProduct({
        productName: "",
        description: "",
        price: "",
        category: "",
        brandName: "",
        image: null,
      });

      document.getElementById("imageInput").value = ""; // Reset file input

      console.log(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 mb-8 p-8 bg-white shadow-xl rounded-xl border border-gray-100">
    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Add New Product</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Brand Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
        <input
          type="text"
          name="brandName"
          value={product.brandName}
          onChange={handleChange}
          placeholder="Enter brand name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          required
        />
      </div>
  
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
        <input
          type="text"
          name="productName"
          value={product.productName}
          onChange={handleChange}
          placeholder="Enter product name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          required
        />
      </div>
  
      {/* Product Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Enter product description"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          rows="4"
          required
        ></textarea>
      </div>
  
      {/* Price */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Enter price"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          required
        />
      </div>
  
      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          required
        >
          <option value="">Select Category</option>
          <option value="accessories">Accessories</option>
          <option value="laptops">Laptops</option>
        </select>
      </div>
  
      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          required
        />
      </div>
  
      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
      >
        Add Product
      </button>
    </form>
  </div>
  );
};

export default AddProduct;
