import React from "react";
import Banner from "../../assets/hero.png";

const HeroSection = () => {
  return (
    <div className="relative w-full p-[4rem] flex items-center justify-center bg-[#190D3A]  px-10">
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between text-white">
        {/* Left - Image Section */}
       <div className="flex-1 flex justify-center lg:justify-center ">
               <img
                 src={Banner}
                 alt="Laptop"
                 className="w-[400%] max-w-lg md:max-w-xl lg:max-w-4xl h-auto"
               />
             </div>

        {/* Right - Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-4 ">
          <p className="text-blue-500 uppercase tracking-widest text-3xl">
            All New Trend Tablets
          </p>
          <h1 className="text-6xl font-extrabold leading-tight">
            Top rated <br />
            <span className="text-blue-400">tablets!</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Doing it <span className="font-bold">all,</span> in all new ways.
          </p>
          <button className="mt-5 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-500 transition">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
