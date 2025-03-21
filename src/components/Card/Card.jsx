import React, { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../Context/ProductContext/ProductContext";
import { useNavigate } from "react-router-dom";

const CardCarousel = () => {
  const navigate = useNavigate();
  const { productDetails } = useContext(ProductContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1); // Default to 1 item per page

  // Filter products to only include those with the category "laptops"
  const accessoriesProducts = productDetails.filter(
    (product) => product.category.toLowerCase() === "laptops"
  );

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(3); // Large screens
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(2); // Medium screens
      } else {
        setItemsPerPage(1); // Small screens
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Handle next slide
  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= accessoriesProducts.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  // Handle previous slide
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? Math.max(0, accessoriesProducts.length - itemsPerPage)
        : prevIndex - itemsPerPage
    );
  };

  if (!accessoriesProducts || accessoriesProducts.length === 0) {
    return <div className="text-center text-gray-500">No laptops available.</div>;
  }

  // Get the current items based on itemsPerPage
  const currentItems = accessoriesProducts.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto">
        {currentItems.map((item) => (
          <div
            key={item._id}
            className="shadow-xl rounded-xl overflow-hidden text-center p-6 transition flex flex-col justify-between cursor-pointer"
            style={{
              backgroundColor: item.bgColor || "#F1F4FF",
              color: item.textColor || "#41415E",
            }}
            onClick={() => navigate(`/product/${item._id}`)}
          >
            {item.brandName && <h5 className="text-lg font-semibold">{item.brandName}</h5>}
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
