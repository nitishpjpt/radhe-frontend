import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import Logo from "../../assets/logo.svg";

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Newsletter Section */}
      <div className="bg-blue-100 py-6 text-center">
        <h2 className="text-2xl font-semibold">Get our latest news and special sales</h2>
        <p className="text-gray-600 mt-2">
          You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.
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
              <li><Link to="/products/hard-disk" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Hard Disk</Link></li>
              <li><Link to="/products/keyboard" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Keyboard</Link></li>
              <li><Link to="/products/mouse" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Mouse</Link></li>
              <li><Link to="/products/ram" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">RAM</Link></li>
              <li><Link to="/products/processor" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Processor</Link></li>
              <li><Link to="/products/cooling-fan" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Cooling Fan</Link></li>
              <li><Link to="/products/graphic-card" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Graphic Card</Link></li>
            </ul>
          </div>

          {/* Laptop Brands */}
          <div>
            <h3 className="text-lg font-semibold uppercase mb-4">Laptop Brands</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/brands/asus" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Asus</Link></li>
              <li><Link to="/brands/lenovo" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Lenovo</Link></li>
              <li><Link to="/brands/mi" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Mi</Link></li>
              <li><Link to="/brands/apple" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Apple</Link></li>
              <li><Link to="/brands/dell" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Dell</Link></li>
              <li><Link to="/brands/hp" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">HP</Link></li>
              <li><Link to="/brands/acer" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Acer</Link></li>
              <li><Link to="/brands/toshiba" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Toshiba</Link></li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="text-lg font-semibold uppercase mb-4">Help & Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/contact-us" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Contact Us</Link></li>
              <li><Link to="/warranty-policy" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Warranty Policy</Link></li>
              <li><Link to="/refund-policy" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>

          {/* More Info */}
          <div>
            <h3 className="text-lg font-semibold uppercase mb-4">More Info</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/terms-and-conditions" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms-of-use" onClick={() => window.scrollTo(0, 0)} className="hover:text-white">Terms of Use</Link></li>
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
