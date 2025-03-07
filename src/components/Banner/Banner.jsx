import React from "react";
import BannerImg from "../../assets/banner.png";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-[#161130] text-white py-22 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10">
        
        {/* Left Content */}
        <div className="text-center lg:text-left max-w-lg">
          <p className="text-blue-400 font-semibold tracking-wide text-lg md:text-xl">
            CREATING A FEATURE NOW!
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mt-3 leading-tight">
            Best <br /> Laptops!
          </h1>
          <p className="text-gray-300 mt-4 text-lg md:text-xl">
            Our extensive collection of men’s and women’s!
          </p>
          <button className="mt-6 bg-blue-500 hover:bg-blue-600 uppercase text-white font-semibold py-2 px-6 rounded-lg text-lg">
           <Link to="products">SHOP Now</Link>
          </button>
        </div>

        {/* Laptop Image - Increased size and reduced gap */}
        <div className="flex-1 flex justify-center lg:justify-center">
          <img
            src={BannerImg}
            alt="Laptop"
            className="w-[300%] max-w-lg md:max-w-xl lg:max-w-4xl h-auto"
          />
        </div>

        {/* Right Content */}
        <div className="text-center lg:text-right">
          <p className="text-gray-300 text-lg md:text-xl">
            Great deals every weekend!
          </p>
          <div className="w-16 h-1 bg-blue-500 mx-auto lg:mx-0 mt-3"></div>
          <h2 className="text-4xl md:text-5xl font-bold mt-3">From Rs.10,999</h2>
        </div>
      </div>
    </div>
  );
};

export default Banner;
