import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderDetails = () => {
  const [orderHistory, setOrderHistory] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [customerId, setCustomerId] = useState(null); // State to store customerId

  // Retrieve customerId from localStorage
  useEffect(() => {
    const decodeToken = (token) => {
      if (!token) return null;

      try {
        const [header, payload, signature] = token.split(".");
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload;
      } catch (error) {
        console.error("Error decoding token:", error);
        return null;
      }
    };

    try {
      const token = localStorage.getItem("user");
      if (token) {
        const decodedToken = decodeToken(token); // Decode the token
        const id = decodedToken?.id; // Extract customerId from the decoded token
        setCustomerId(id); // Set customerId in state
      } else {
        throw new Error("No token found in localStorage.");
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      setError("Failed to retrieve customer information.");
      setLoading(false);
    }
  }, []);

  // Debug: Log the customerId
  console.log("Customer ID:", customerId);

  // Fetch order history from the backend
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        if (!customerId) {
          throw new Error("Customer ID is undefined.");
        }

        const response = await axios.get(
          `${
            import.meta.env.VITE_REACT_APP_BACKEND_BASEURL
          }/custumer/${customerId}/order-history`
        );
        // Ensure orderHistory is an array
        setOrderHistory(response.data.orderHistory || []);
      } catch (err) {
        setError("Failed to fetch order history.");
        console.error("Error fetching order history:", err);
      } finally {
        setLoading(false);
      }
    };

    if (customerId) {
      fetchOrderHistory();
    }
  }, [customerId]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Order History</h1>
        {!orderHistory || orderHistory.length === 0 ? (
          <p className="text-center text-gray-600">No orders found.</p>
        ) : (
          <div className="space-y-6">
            {orderHistory.map((order, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Order #{index + 1}</h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.paymentStatus === "Success"
                        ? "bg-green-100 text-green-700"
                        : order.paymentStatus === "Failed"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="space-y-4">
                  {order.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center space-x-4"
                    >
                      {/* Handle cases where product is null */}
                      {item.product ? (
                        <>
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h3 className="text-lg font-medium">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-600">
                              <strong>Brand:</strong> {item.product.brandName}
                            </p>
                            <p className="text-gray-600">
                              <strong>Quantity:</strong> {item.quantity}
                            </p>
                            <p className="text-gray-600">
                              <strong>Price:</strong> Rs. {item.product.price}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="text-red-500">
                          Product details not available.
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-gray-600">
                    <strong>Total Price:</strong> Rs. {order.totalPrice}
                  </p>
                  <p className="text-gray-600">
                    <strong>Shipping Cost:</strong> Rs. {order.shippingCost}
                  </p>
                  <p className="text-gray-600">
                    <strong>Shipping Country:</strong> {order.country}
                  </p>
                  <p className="text-gray-600">
                    <strong>Order Date:</strong>{" "}
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;