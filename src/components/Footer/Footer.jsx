import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Newsletter Section */}
      <div className="bg-blue-100 py-6 text-center">
        <h2 className="text-2xl font-semibold">
          Get our latest news and special sales
        </h2>
        <p className="text-gray-600 mt-2">
          You may unsubscribe at any moment. For that purpose, please find our
          contact info in the legal notice.
        </p>
        <div className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-2 w-80 border rounded-l-md outline-none"
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
            Subscribe
          </button>
        </div>
      </div>

      {/* Footer Links Section */}
      <div className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 text-center md:text-left">
          {/* Logo & Social Media Section */}
          <div className="flex flex-col items-center">
            <img className="h-20 sm:h-24 w-auto" src={Logo} alt="Radhe Laptops Logo" />

            <h5 className="text-sm font-semibold uppercase mt-4">Follow us on</h5>
            <div className="flex space-x-4 mt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF className="text-gray-400 hover:text-blue-500 cursor-pointer text-xl" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-gray-400 hover:text-blue-400 cursor-pointer text-xl" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="text-gray-400 hover:text-pink-500 cursor-pointer text-xl" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="text-gray-400 hover:text-red-500 cursor-pointer text-xl" />
              </a>
            </div>
          </div>

          {/* Featured Products */}
          <div>
            <h3 className="text-lg font-semibold uppercase mb-4">Featured Products</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/products/hard-disk" className="hover:text-white">Hard Disk</a></li>
              <li><a href="/products/keyboard" className="hover:text-white">Keyboard</a></li>
              <li><a href="/products/mouse" className="hover:text-white">Mouse</a></li>
              <li><a href="/products/ram" className="hover:text-white">RAM</a></li>
              <li><a href="/products/processor" className="hover:text-white">Processor</a></li>
              <li><a href="/products/cooling-fan" className="hover:text-white">Cooling Fan</a></li>
              <li><a href="/products/graphic-card" className="hover:text-white">Graphic Card</a></li>
            </ul>
          </div>

          {/* Laptop Brands */}
          <div>
            <h3 className="text-lg font-semibold uppercase mb-4">Laptop Brands</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/brands/asus" className="hover:text-white">Asus</a></li>
              <li><a href="/brands/lenovo" className="hover:text-white">Lenovo</a></li>
              <li><a href="/brands/mi" className="hover:text-white">Mi</a></li>
              <li><a href="/brands/apple" className="hover:text-white">Apple</a></li>
              <li><a href="/brands/dell" className="hover:text-white">Dell</a></li>
              <li><a href="/brands/hp" className="hover:text-white">HP</a></li>
              <li><a href="/brands/acer" className="hover:text-white">Acer</a></li>
              <li><a href="/brands/toshiba" className="hover:text-white">Toshiba</a></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold uppercase mb-4">Help & Support</h3>
            <ul className="space-y-2 text-gray-400">
              {/* <li><a href="/faq" className="hover:text-white">FAQ</a></li> */}
              <li><a href="/contact-us" className="hover:text-white">Contact Us</a></li>
              <li><a href="/warranty-policy" className="hover:text-white">Warranty Policy</a></li>
              <li><a href="/refund-policy" className="hover:text-white">Refund Policy</a></li>
            </ul>
          </div>

          {/* More Info */}
          <div>
            <h3 className="text-lg font-semibold uppercase mb-4">More Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</a></li>
              <li><a href="/privacy-policy" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="/terms-of-use" className="hover:text-white">Terms of Use</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-8 text-gray-400">
          <p>Copyright © 2025 <span className="font-semibold">Radhe Laptops</span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
