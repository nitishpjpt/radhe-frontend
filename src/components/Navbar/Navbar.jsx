import { Link, useNavigate } from "react-router-dom";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Logo from "../../assets/logo.svg";
import { LuShoppingBag } from "react-icons/lu";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

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

const navigation = [
  { name: "Home", href: "/" },
  { name: "Catelog", href: "/all-collections" },
  { name: "Collection", href: "/products" },
  { name: "Contact Us", href: "/contact-us" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const [loginDetails, setLoginDetails] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("user");
    const decoded = decodeToken(token);
    if (decoded) setUser(decoded);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("user");
        if (token) {
          const decodedToken = decodeToken(token);
          const customerId = decodedToken?.id;

          const response = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/custumer/cart/all`,
            { customerId },
            { headers: { "Content-Type": "application/json" } }
          );

          setCartItems(response.data.cart.length);
        } else {
          const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
          setCartItems(guestCart.length);
         
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (user) {
      fetchCartItems();
    }
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("user");
    const decodedToken = decodeToken(token);
    if (decodedToken) setLoginDetails(decodedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    toast.success("logged out successfully", {
      onClose: () => {
        navigate("/login");
        window.location.reload();
      },
    });
    setTimeout(() => {
      navigate("/");
      window.location.reload();
    }, 300);
    navigate("/login");
  };

  return (
    <Disclosure as="nav" className="bg-[#F2F4FF]">
      <header className="bg-white flex justify-center items-center">
        <div className="container flex flex-row justify-between items-center px-2 w-full max-w-[1200px]">
          <div className="ml-[8rem] flex justify-center flex-grow">
           <Link to="/"><img className="w-[7vw] min-w-[80px]" src={Logo} alt="logo" /></Link>
          </div>

          <div className="flex items-center space-x-6">
            <button className="text-gray-700 hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>

            <div>
              <Menu as="div" className="relative ml-3">
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYogPKR1mzQ6msptbTwja31pVhuddqGPHCvA&s"
                    className="size-8 rounded-full object-cover"
                    alt="User Profile"
                  />
                </MenuButton>
                <MenuItems className="absolute right-0 z-10 mt-2 w-55 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden">
                  <MenuItem>
                    <h4 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <Link to="/login">
                        {loginDetails?.email ? loginDetails.email : "Login"}
                      </Link>
                    </h4>
                  </MenuItem>
                  {user?.role === "admin" && (
                    <MenuItem>
                      <Link
                        to="/add/products"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Add Product
                      </Link>
                    </MenuItem>
                  )}
                  {loginDetails?.email && (
                    <MenuItem>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                      >
                        Logout
                      </button>
                    </MenuItem>
                  )}
                </MenuItems>
              </Menu>
            </div>

            <button className="text-gray-700 hover:text-blue-500 flex flex-row items-center relative">
              <Link to="/add-to-cart">
                <LuShoppingBag className="h-6 w-6" />
              </Link>
              {cartItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {cartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex pt-2 flex-1 justify-center">
              <div className="hidden sm:flex space-x-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="text-[#1A1A1A] rounded-md px-3 py-2 text-sm font-medium font-bold hover:text-blue-500"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Navbar;