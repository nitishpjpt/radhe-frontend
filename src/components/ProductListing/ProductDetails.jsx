import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details based on the ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/product/product/${id}`
        );
        setProduct(response.data.product || []);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Product not found");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const decodeToken = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode the token payload
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  // Example usage
  const token = localStorage.getItem("user");
  // const decodedToken = decodeToken(token);

  // Handle add to cart
  const handleAddToCart = async () => {
    const token = localStorage.getItem("user");
    const productId = id; // Product ID from URL
    const quantity = 1; // Default quantity
  
    if (!token) {
      // Guest user: Store cart in localStorage
      const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
      const existingItem = guestCart.find((item) => item.productId === productId);
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // Fetch product details before storing in localStorage
        try {
          const productResponse = await axios.get(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/product/product/${productId}`
          );
              const product = productResponse.data;
            console.log(product)
  
          guestCart.push({
            // productId,
            quantity,
             product // Store full product details
          });
  
          localStorage.setItem("guestCart", JSON.stringify(guestCart));
          toast.success("Product added to cart!");
          
        } catch (error) {
          console.error("Error fetching product details:", error);
          alert("Failed to fetch product details. Please try again.");
        }
      }
    } else {
      // Logged-in user: Send request to backend
      const decodedToken = decodeToken(token);
      const customerId = decodedToken?.id;
  
      if (!customerId) {
        alert("Invalid token. Please log in again.");
        return;
      }
  
      try {
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/cart/add`,
          { customerId, productId, quantity },
          { headers: { "Content-Type": "application/json" } }
        );
  
        toast.success("Product added to cart!");
      } catch (error) {
        console.error("Add to cart error:", error);
        alert("Failed to add product to cart. Please try again.");
      }
    }
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.productName}
              className="w-full h-auto max-h-[500px] object-contain rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {product.productName}
            </h1>
            <p className="text-lg text-gray-600">{product.brandName}</p>
            <p className="text-2xl font-bold text-blue-600">
              Rs. {product.price}
            </p>
            <p className="text-gray-700 whitespace-pre-line">
              {product.description}
            </p>
         <div className="flex  gap-2">
         <button
              className="mt-6 bg-blue-500 px-6 py-3 text-md text-white uppercase rounded-lg transition-all duration-300 hover:scale-105 hover:bg-indigo-500"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
            <button
              className="mt-6 bg-blue-500 px-6 py-3 text-md text-white uppercase rounded-lg transition-all duration-300 hover:scale-105 hover:bg-indigo-500"
             
            >
             <Link to="/add-to-cart">
              go to cart
             </Link>
            </button>
         </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
