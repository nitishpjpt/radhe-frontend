import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import PrivateRoute from "./ProtectedRotues/ProtectedRoute"; // Import PrivateRoute
import AdminRoute from "./ProtectedRotues/AdminRoutes"; // Import AdminRoute

// Importing components
import Home from "./pages/Home";
import Login from "./components/loginPage/login";
// import Register from "./components/Register/Register";
import ProductListing from "./components/ProductListing/ProductListing";
import AddToCart from "./components/ProductListing/AddToCart";
import Checkout from "./components/CheckOut/Checkout";
import ContactUs from "./components/ContactUs/ContactUs";
import Collections from "./components/Collections/Collections";
import { useState } from "react";
import AddProduct from "./adminDashboard/Dashboard/AddProduct";
import Filter from "./components/ProductListing/FilterSidebar";
import ProductDetail from "./components/ProductListing/ProductDetails";
import AdminLogin from "./adminDashboard/AdminLogin";
import Register from "./components/Register/Register";
import RefundPolicy from "./components/PolicyPages.jsx/RefundPolicy";
import WarranyPolicy from "./components/PolicyPages.jsx/WarranyPolicy";
import TermsOfUse from "./components/PolicyPages.jsx/TermsOfUse";
import PrivacyPolicy from "./components/PolicyPages.jsx/PrivacyPolicy";
import TermsCondition from "./components/PolicyPages.jsx/TermsCondition";

const decodeToken = (token) => {
  if (!token) {
    return null;
  }

  try {
    const [payload] = token.split(".");
    const decodedPayload = JSON.parse(atob(payload));
    return decodedPayload;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const App = () => {
  const isAuthPage = window.location.pathname === "/login";
  // window.location.pathname === "/register";

  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const decodedAdminToken = decodeToken(adminToken);
    console.log("Decoded Admin Token:", decodedAdminToken);

    const userToken = localStorage.getItem("user");
    const decodedUserToken = decodeToken(userToken);
    console.log("Decoded User Token:", decodedUserToken);
  }, []);

  const isAuthenticated = !!authToken; // Admin authentication status

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {!isAuthPage && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

        {/* Protected Routes (Only for Logged-in Users) */}
        <Route path="/products/collections" element={<ProductListing />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Filter />} />
        {/* <Route path="/product/:id" element={<AddToCart />} /> */}4
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/all-collections" element={<Collections />} />
        <Route path="/add-to-cart" element={<AddToCart />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin/>}/>


        {/* other pages */}
        <Route path="/refund-policy" element={<RefundPolicy/>}/>
        <Route path="/warranty-policy" element={<WarranyPolicy/>}/>
        <Route path="/terms-of-use" element={<TermsOfUse/>}/>
        <Route path="/privacy-policy" element={<PrivacyPolicy/>}/>
        <Route path="/terms-and-conditions" element={<TermsCondition/>}/>



        {/* admin routes */}
        <Route path="/add/products" element={<AddProduct />} />

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!isAuthPage && <Footer />}
    </>
  );
};

export default App;
