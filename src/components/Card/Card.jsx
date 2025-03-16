import React, { useState, useContext } from "react";
import { ProductContext } from "../../Context/ProductContext/ProductContext";
import { useNavigate } from "react-router-dom";

const CardCarousel = () => {
  const navigate = useNavigate();

  // Handle product click to navigate to product details page
  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  const { productDetails } = useContext(ProductContext); // Access productDetails from context
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter products to only include those with the category "laptops"
  const accessoriesProducts = productDetails.filter(
    (product) => product.category.toLowerCase() === "laptops"
  );

  // Handle next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= accessoriesProducts.length ? 0 : prevIndex + 3
    );
  };

  // Handle previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0
        ? Math.max(0, accessoriesProducts.length - 3)
        : prevIndex - 3
    );
  };

  // If there are no product details, show a loading or empty state
  if (!accessoriesProducts || accessoriesProducts.length === 0) {
    return (
      <div className="text-center text-gray-500">No laptops available.</div>
    );
  }

  // Get the current three items to display
  const currentItems = accessoriesProducts.slice(currentIndex, currentIndex + 3);

  return (
    <div className="relative flex items-center justify-center p-4">
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-8 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition z-10"
      >
        ⬅
      </button>

      {/* Carousel Items */}
      <div className="grid grid-cols-1 sm:grid-cols-3  gap-6 w-full max-w-6xl mx-auto">
        {currentItems.map((item) => (
          <div
            key={item._id} // Use item._id as the key
            className="shadow-xl rounded-xl overflow-hidden text-center p-6 transition flex flex-col justify-between cursor-pointer"
            style={{
              backgroundColor: item.bgColor || "#F1F4FF", // Fallback color
              color: item.textColor || "#41415E", // Fallback color
            }}
            onClick={() => handleProductClick(item._id)} // Navigate to product details on click
          >
            {/* Display optional fields if they exist */}
            {item.brandName && (
              <h5 className="text-lg font-semibold">{item.brandName}</h5>
            )}
            <h2 className="text-xl font-semibold">{item.productName}</h2>
            <img
              src={item.image}
              alt={item.productName}
              className="w-full h-55 object-contain rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-8 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition z-10"
      >
        ➡
      </button>
    </div>
  );
};

export default CardCarousel;