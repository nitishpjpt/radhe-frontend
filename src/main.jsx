import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./Context/ProductContext/ProductContext.jsx";
import { CartProvider } from "./Context/CartContext/cartContext.jsx";
import { UserProvider } from "./Context/AuthContext/User.Context.jsx";
import { WishlistProvider } from "./Context/WishListContext/WishList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <UserProvider>
          <ProductProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProductProvider>
        </UserProvider>
      </CartProvider>
    </WishlistProvider>
  </StrictMode>
);
