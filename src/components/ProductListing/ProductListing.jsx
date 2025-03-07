"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GrZoomIn } from "react-icons/gr";
import { PiHeartStraightBold } from "react-icons/pi";
import { AiOutlineClose, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const ProductListing = ({ products }) => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null); // State for editing product
  const [userRole, setUserRole] = useState(""); // State to store user role

  // Fetch user role from localStorage or context
  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT token
      setUserRole(decodedToken.role); // Set user role
    }
  }, []);

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  // Handle edit product
  const handleEditProduct = (product) => {
    setEditingProduct(product); // Set the product being edited
  };

  // Handle save edited product
  const handleSaveProduct = async () => {
    try {
      const formData = new FormData();
  
      // Append all fields to the FormData object
      formData.append("brandName", editingProduct.brandName);
      formData.append("productName", editingProduct.productName);
      formData.append("price", editingProduct.price);
      if (editingProduct.image) {
        formData.append("image", editingProduct.image); // Append the file
      }
  
      // Send the FormData to the backend
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/${editingProduct._id}`, {
        method: "PUT",
        body: formData, // Send FormData instead of JSON
      });
  
      if (response.ok) {
        alert("Product updated successfully");
        setEditingProduct(null); // Close the edit modal
        window.location.reload(); // Reload the page to reflect changes
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Handle input change in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        // Send delete request to the backend
        const response = await fetch(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          alert("Product deleted successfully");
          window.location.reload(); // Reload the page to reflect changes
        } else {
          alert("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div>
      <div className="mx-auto max-w-9xl px-4 py-10 sm:px-6 sm:py-24 lg:px-8">
        <div className="flex justify-center items-center bg-[#F2F4FF] p-10 rounded-md">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            All Collections
          </h2>
        </div>

        {products.length === 0 ? (
          <div className="flex justify-center items-center p-10">
            <h2 className="text-2xl font-semibold text-gray-500">
              No Products Available
            </h2>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {products.map((product) => (
              <div
                key={product._id}
                className="relative group cursor-pointer p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-gray-400 hover:-translate-y-2 w-[370px] mx-auto"
              >
                {/* Edit and Delete Buttons (Visible only for admin) */}
                {userRole === "admin" && (
                  <div className="absolute left-4 top-4 flex flex-col gap-2">
                    <button
                      onClick={() => handleEditProduct(product)}
                      className="text-xl p-2 text-center text-white bg-green-500 w-10 h-10 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-green-600"
                    >
                      <AiOutlineEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-xl p-2 text-center text-white bg-red-500 w-10 h-10 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-red-600"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                )}

                <GrZoomIn className="absolute right-4 text-xl p-2 text-center text-white bg-indigo-500 w-10 h-10 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-indigo-500" />
                <PiHeartStraightBold className="absolute right-4 top-[5rem] text-xl p-2 text-center text-white bg-indigo-500 w-10 h-10 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 hover:bg-indigo-500" />

                <img
                  alt="product-img"
                  src={product.image}
                  className="w-full h-[400px] p-5 rounded-md object-contain"
                  onClick={() => handleProductClick(product._id)}
                />

                <div className="mt-4 text-center border-t-2 border-blue-100">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.brandName}
                  </h3>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {product.productName}
                  </h3>
                  <p className="mt-1 text-md text-blue-600 font-extrabold">
                    Rs.{product.price}
                  </p>
                  <button
                    className="mt-4 bg-blue-500 px-6 py-3 text-md text-white uppercase rounded-lg transition-all duration-300 opacity-100 hover:scale-110 hover:bg-indigo-500"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add to Cart Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900"
              onClick={closeModal}
            >
              <AiOutlineClose size={24} />
            </button>

            <div className="flex flex-col items-center">
              <h5 className="text-green-500">
                ✅ Product successfully added to your shopping cart
              </h5>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.description}
                className="w-[250px] h-[250px] object-contain rounded-md"
              />
              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {selectedProduct.name}
              </h3>
              <p className="text-md text-blue-600 font-extrabold">
                ${selectedProduct.price}
              </p>
              <p className="text-md text-gray-400 font-extrabold">
                Quantity: 1
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 mt-6">
              <button
                className="px-[7rem] py-2 text-sm uppercase bg-blue-500 text-white rounded-md hover:bg-black transition"
                onClick={closeModal}
              >
                Continue Shopping
              </button>
              <button
                className="px-[9rem] text-sm py-2 uppercase bg-gray-300 text-gray-500 rounded-md hover:bg-black transition"
                onClick={() => handleProductClick(selectedProduct._id)}
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full relative">
            <button
              className="absolute top-2 right-3 text-gray-600 hover:text-gray-900"
              onClick={() => setEditingProduct(null)}
            >
              <AiOutlineClose size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSaveProduct();
  }}
  encType="multipart/form-data" // Required for file uploads
>
  <div className="mb-4">
    <label>Brand Name</label>
    <input
      type="text"
      name="brandName"
      value={editingProduct.brandName}
      onChange={handleInputChange}
      className="w-full p-2 border rounded"
    />
  </div>
  <div className="mb-4">
    <label>Product Name</label>
    <input
      type="text"
      name="productName"
      value={editingProduct.productName}
      onChange={handleInputChange}
      className="w-full p-2 border rounded"
    />
  </div>
  <div className="mb-4">
    <label>Price</label>
    <input
      type="number"
      name="price"
      value={editingProduct.price}
      onChange={handleInputChange}
      className="w-full p-2 border rounded"
    />
  </div>
  <div className="mb-4">
    <label>Image</label>
    <input
      type="file"
      name="image"
      onChange={(e) => {
        // Update the editingProduct state with the selected file
        setEditingProduct((prev) => ({
          ...prev,
          image: e.target.files[0], // Store the file object
        }));
      }}
      className="w-full p-2 border rounded"
    />
  </div>
  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded"
  >
    Save Changes
  </button>
</form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListing;