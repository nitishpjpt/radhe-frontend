"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState("India");
  const [shippingCost, setShippingCost] = useState(0);
  const [cart, setCart] = useState([]);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  // Check if the customer is logged in
  const isLoggedIn = () => {
    const token = localStorage.getItem("user");
    if (!token) return false;

    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      return !!decodedToken.id; // Return true if customerId exists
    } catch (err) {
      return false; // Invalid token
    }
  };
  // Fetch cart details from the backend
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

          setCart(response.data.cart);
          console.log(response.data.cart);
        } else {
          // Fetch cart items from localStorage for guest users
          let guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
          // Fix nested product structure if necessary
          guestCart = guestCart.map((item) => ({
            product: item.product.product || item.product, // Fix nested structure
            quantity: item.quantity,
          }));

          setCart(guestCart);
          console.log(guestCart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // Calculate the total price of the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Calculate shipping cost based on the selected country
  useEffect(() => {
    switch (country) {
      case "India":
        setShippingCost(0);
        break;
      case "USA":
        setShippingCost(15);
        break;
      case "UK":
        setShippingCost(10);
        break;
      default:
        setShippingCost(0);
    }
  }, [country]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle Razorpay payment
  const handlePayment = async () => {
    if (!isLoggedIn()) {
      toast.error("Please log in to proceed with the payment.");
      return;
    }

    try {
      const token = localStorage.getItem("user");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const customerId = decodedToken.id;

      // Prepare order details
      const orderDetails = {
        amount: (totalPrice + shippingCost) * 100, // Amount in paise (e.g., 1000 = ₹10)
        currency: "INR",
        receipt: `order_${Date.now()}`, // Shortened receipt
        payment_capture: 1, // Auto-capture payment
      };

      // Create an order on your backend
      const response = await axios.post(
        `${
          import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
        }/custumer/create-order`,
        orderDetails
      );

      const { id: orderId } = response.data;

      // Prepare order summary for email and clearCart API
      const orderSummary = {
        items: cart.map((item) => ({
          productName: item.product.productName,
          quantity: item.quantity,
          price: item.product.price,
        })),
        totalPrice: totalPrice + shippingCost,
        shippingCost,
        country,
      };

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Key ID
        amount: orderDetails.amount,
        currency: orderDetails.currency,
        name: "Radhe Laptops",
        description: "Payment for your order",
        order_id: orderId,
        handler: async (response) => {
          // Handle successful payment
          const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
            response;

          // Verify payment on your backend
          const verificationResponse = await axios.post(
            `${
              import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
            }/custumer/verify-payment`,
            {
              razorpay_payment_id,
              razorpay_order_id,
              razorpay_signature,
            }
          );

          if (verificationResponse.data.success) {
            setPaymentSuccess(true);
            toast.success(
              "Payment successful! Order summary sent to your email."
            );

            // Save customer information
            await axios.post(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/custumer/save-customer-info`,
              {
                customerId,
                ...formData,
                cart,
              }
            );

            // Clear the cart and update order history
            await axios.post(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/custumer/clear-cart`,
              {
                customerId,
                orderSummary,
              }
            );

            // Send order summary email
            await axios.post(
              `${
                import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
              }/custumer/send-order-summary`,
              {
                customerId,
                orderSummary,
              }
            );

            // Clear the cart in the frontend
            setCart([]);
          } else {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone || "9999999999", // Use customer's phone number if available
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Open Razorpay checkout modal
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
      setError(
        err.response?.data?.message || "Payment failed. Please try again."
      );
      toast.error("Payment failed. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-2xl font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-2">
      {/* Left Section */}
      <div className="lg:w-2/3 bg-white p-6 rounded-md">
        <h2 className="text-lg font-semibold">Contact</h2>
        <input
          type="text"
          name="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded mt-2"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        {/* Delivery Section */}
        <h2 className="text-lg font-semibold mt-4">Delivery</h2>
        <select
          className="w-full border p-2 rounded mt-2"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        >
          <option>India</option>
          <option>USA</option>
          <option>UK</option>
        </select>
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            className="w-1/2 border p-2 rounded"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            className="w-1/2 border p-2 rounded"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <input
          type="text"
          name="address"
          placeholder="Address"
          className="w-full border p-2 rounded mt-2"
          value={formData.address}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          placeholder="Apartment, suite, etc. (optional)"
          className="w-full border p-2 rounded mt-2"
        />
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-1/3 border p-2 rounded"
            value={formData.city}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            className="w-1/3 border p-2 rounded"
            value={formData.state}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="pinCode"
            placeholder="PIN code"
            className="w-1/3 border p-2 rounded"
            value={formData.pinCode}
            onChange={handleInputChange}
            required
          />
        </div>
        {/* <div className="mt-2">
          <input type="checkbox" id="save-info" className="mr-2" />
          <label htmlFor="save-info">Save this information for next time</label>
        </div> */}

        <button
          className={`w-full bg-blue-600 text-white p-3 rounded mt-4 hover:bg-blue-700 transition-colors duration-200 ${
            !isLoggedIn() ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePayment}
          disabled={!isLoggedIn()}
        >
          {isLoggedIn() ? "Pay now" : "Please log in to proceed"}
        </button>
        <div className="flex justify-between text-sm text-gray-600 mt-4">
          <a href="/refund-policy" className="hover:underline">
            Refund policy
          </a>
          <a href="/privacy-policy" className="hover:underline">
            Privacy policy
          </a>
          <a href="/terms-of-use" className="hover:underline">
            Terms of service
          </a>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/3 bg-[#F2F4FF] p-6 rounded-md ml-0 lg:ml-6 mt-6 lg:mt-0">
        {/* Display Cart Items */}
        <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex justify-between items-center mb-4"
          >
            <div className="flex items-center gap-2">
              <img
                src={item.product.image}
                alt={item.product.productName}
                className="w-12 h-12 rounded-md"
              />
              <div>
                <span className="text-sm font-semibold">
                  {item.product.productName}
                </span>
                <p className="text-xs text-gray-600">
                  Quantity: {item.quantity}
                </p>
              </div>
            </div>
            <span className="font-semibold">
              Rs. {(item.product.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}

        <hr className="my-4" />
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span className="text-lg">
            Rs. {(totalPrice + shippingCost).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
