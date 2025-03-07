import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import {
  AiOutlineSafetyCertificate,
  AiOutlineTruck,
  AiOutlineUndo,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddToCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]); // State to store cart items
  const [totalPrice, setTotalPrice] = useState(0); // State for total price
  const [totalWeight, setTotalWeight] = useState(0); // State for total weight

  // Fetch cart items from the backend or localStorage
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("user");
        if (token) {
          // Decode the token to get the customer ID
          const decodedToken = JSON.parse(atob(token.split(".")[1]));
          const customerId = decodedToken.id;

          // Fetch cart items from the backend
          const response = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/custumer/cart/all`,
            { customerId }, // Send customerId in the request body
            {
              headers: {
                "Content-Type": "application/json", // Ensure the content type is set
              },
            }
          );

          setCartItems(response.data.cart);
          console.log(response.data.cart)

        } else {
          // Fetch cart items from localStorage for guest users
          let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
           // Fix nested product structure if necessary
              guestCart = guestCart.map((item) => ({
          product: item.product.product || item.product, // Fix nested structure
          quantity: item.quantity,
        }));

        setCartItems(guestCart);
        console.log(guestCart)
      
         
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate total price and weight whenever cart items change
  useEffect(() => {
    let price = 0;
    let weight = 0;

    cartItems.forEach((item) => {
      if (item.product) {
        price += item.quantity * item.product.price; // Access price from the product object
        weight += item.quantity * (item.product.weight || 0); // Assuming weight is optional
      }
    });

    setTotalPrice(price);
    setTotalWeight(weight.toFixed(2));
  }, [cartItems]);

  // Handle quantity change for a specific item
  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const token = localStorage.getItem("user");
      if (token) {
        // Decode the token to get the customer ID
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const customerId = decodedToken.id;

        // Update quantity in the backend for logged-in users
        await axios.put(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/custumer/cart/update`,
          {
            customerId, // Pass customerId
            productId, // Pass productId
            quantity: newQuantity, // Pass newQuantity
          }
        );

        // Fetch updated cart items
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/cart/all`,
          { customerId }
        );
        setCartItems(response.data.cart);
      } else {
        // Update quantity in localStorage for guest users
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const updatedCart = guestCart.map((item) =>
          item.product._id === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle remove item
  const handleRemoveItem = async (productId, customerId = null) => {
    console.log("Product ID to remove:", productId); // Debugging line
    console.log("Customer ID:", customerId); // Debugging line

    try {
      if (customerId) {
        // Remove item from the backend for logged-in users
        await axios.delete(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/custumer/cart/remove/${productId}`,
          { data: { customerId } } // Pass customerId in the request body
        );

        // Fetch updated cart items
        const response = await axios.post(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/cart/all`,
          { customerId }
        );
        setCartItems(response.data.cart);
      } else {
        // Remove item from localStorage for guest users
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const updatedCart = guestCart.filter(
          (item) => item.product._id !== productId // Use item.product._id
        );
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  
  // Navigate to checkout
  const checkoutPage = () => {
    navigate(`/checkout`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-8xl mx-auto bg-white p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Your Shopping Cart
        </h2>

        {/* Product Section */}
        {cartItems.length > 0 ? (
          cartItems.map(
            (item) =>
              item.product && ( // Ensure item.product exists
                <div
                  key={item.product._id} // Use product._id as the key
                  className="flex flex-col md:flex-row items-center justify-between p-6 mb-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  {/* Product Image and Details */}
                  <div className="flex items-center gap-6 mb-4 md:mb-0">
                    <img
                      src={item.product.image} // Access image from the product object
                      alt={item.product.productName} // Use productName as alt text
                      className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">
                        {item.product.productName} {/* Display product name */}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Price: ${item.product.price}
                      </p>{" "}
                      {/* Display price */}
                    </div>
                  </div>

                  {/* Quantity Input and Total Price */}
                  <div className="flex items-center gap-8">
                    {/* Quantity Input */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                      <button
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity - 1
                          )
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center outline-none bg-transparent"
                        value={item.quantity}
                        min={1}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.product._id, // Ensure this is the correct productId
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <button
                        className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200"
                        onClick={() =>
                          handleQuantityChange(
                            item.product._id,
                            item.quantity + 1
                          )
                        }
                      >
                        +
                      </button>
                    </div>

                    {/* Total Price */}
                    <p className="text-lg font-semibold text-gray-800">
                      ${(item.quantity * item.product.price).toFixed(2)}{" "}
                      {/* Calculate total price */}
                    </p>

                    {/* Remove Button */}
                    <button
                      className="text-gray-500 hover:text-red-500 transition-colors duration-200"
                      onClick={() => {
                        const token = localStorage.getItem("user");
                        if (token) {
                          const decodedToken = JSON.parse(
                            atob(token.split(".")[1])
                          );
                          const customerId = decodedToken.id; // Get customerId from the token
                          console.log(
                            "Product ID in onClick:",
                            item.product._id
                          ); // Debugging line
                          console.log("Customer ID in onClick:", customerId); // Debugging line
                          handleRemoveItem(item.product._id, customerId); // Pass both productId and customerId
                        } else {
                          console.log(
                            "Product ID in onClick:",
                            item.product._id
                          ); // Debugging line
                          handleRemoveItem(item.product._id); // For guest users, only pass productId
                        }
                      }}
                    >
                      <FiTrash2 className="w-6 h-6" /> {/* Use a trash icon */}
                    </button>
                  </div>
                </div>
              )
          )
        ) : (
          <p className="text-center text-gray-600 py-10">Your cart is empty.</p>
        )}

        {/* Order Summary and Policies Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mt-6">
          {/* Policies Section */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-lg  border-gray-300">
            <h3 className="text-sm font-semibold text-gray-800 mb-4">
              Policies
            </h3>
            <div className="space-y-3">
              <h4 className="cursor-pointer hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2">
                <AiOutlineSafetyCertificate className="text-lg" />
                Security policy
              </h4>
              <p className="cursor-pointer hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2">
                <AiOutlineTruck className="text-lg" />
                Delivery policy
              </p>
              <p className="cursor-pointer hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2">
                <AiOutlineUndo className="text-lg" />
                Return policy
              </p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-gray-100 p-6 rounded-lg border border-gray-300 ">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h3>
            <div className="space-y-3">
              <p className="text-gray-700">Total {cartItems.length} item(s)</p>
              <p className="text-gray-700">Total weight {totalWeight} lb</p>
              <p className="text-xl font-bold text-blue-600">
                Total price: ${totalPrice.toFixed(2)}
              </p>
            </div>
            <button
              onClick={checkoutPage}
              className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
