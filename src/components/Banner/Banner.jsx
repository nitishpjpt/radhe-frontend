import React from "react";
import BannerImg from "../../assets/banner.png"; // Use the same image
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-[#161130] text-white py-12 md:py-20 px-4 md:px-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Text */}
        <div className="text-center lg:text-left flex-1">
          <p className="text-blue-400 font-semibold tracking-wide text-lg md:text-xl">
            CREATING A FEATURE NOW!
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mt-3 leading-tight">
            Best <br /> Laptops!
          </h1>
          <p className="text-gray-300 mt-4 text-lg md:text-xl">
            Our extensive collection of men’s and women’s!
          </p>
          <Link to="products">
            <button className="mt-6 bg-blue-500 hover:bg-blue-600 uppercase text-white font-semibold py-2 px-6 rounded-lg text-lg">
              SHOP Now
            </button>
          </Link>
        </div>

        {/* Centered Image */}
        <div className="flex-shrink-0 mx-8">
          <img
            src={BannerImg}
            alt="Laptop"
            className="w-64 sm:w-72 md:w-80 lg:w-96 xl:w-112 h-auto"
          />
        </div>

        {/* Right Text */}
        <div className="text-center lg:text-right flex-1">
          <p className="text-gray-300 text-lg md:text-xl">
            Great deals every weekend!
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto lg:mx-0 mt-3"></div>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">From Rs.10,999</h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;