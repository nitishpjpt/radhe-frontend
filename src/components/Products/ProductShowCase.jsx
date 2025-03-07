import React from "react";
import headphonesDark from "../../assets/headphone1.png"; // Add your images
import headphonesLight from "../../assets/product2.png";
import smartwatch1 from "../../assets/product3.png";
import headphone from "../../assets/headphone2.png";
import smartWatch from "../../assets/smartWatch.png";

const ProductShowcase = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 px-4 sm:px-6 lg:px-8">
      {/* Headphones Section */}
      <div className="bg-[#F1F4FF] p-6 md:p-10 lg:p-[4rem] py-[2rem] rounded-lg flex flex-col relative overflow-hidden">
        <h5 className="text-indigo-600 font-extrabold uppercase text-sm tracking-wide">
          Great Headphones
        </h5>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2C2C54] leading-tight mt-2">
          Find your <br /> sound!
        </h2>
        <button className="bg-indigo-600 px-4 py-2 w-full sm:w-[12vw] my-2 text-white rounded-lg uppercase text-sm sm:text-base">
          Shop Now
        </button>
        {/* Images */}
        <img
          src={headphonesDark}
          alt="Dark Headphones"
          className="absolute bottom-[2rem] -right-[9rem] md:-right-[6rem] lg:-right-[9rem] rotate-30 w-[50vw] md:w-[40vw] lg:w-[50vw]"
        />
        <img
          src={headphone}
          alt="Dark Headphones"
          className="absolute -right-[2rem] top-1 -rotate-40 w-[13vw] md:w-[10vw] lg:w-[13vw]"
        />
        <img
          src={headphonesLight}
          alt="Light Headphones"
          className="absolute -bottom-[13px] -left-4 w-32 md:w-40 lg:w-52 -rotate-45 opacity-80"
        />
      </div>

      {/* Smartwatch Section */}
      <div className="bg-[#485AD8] p-6 md:p-8 lg:p-[2rem] text-white rounded-lg flex flex-col relative overflow-hidden min-h-[20rem] sm:min-h-[25rem] md:min-h-[30rem]">
        <div className="text-start">
          <h5 className="text-white font-semibold uppercase text-sm tracking-wide">
            Best Smartwatches for you in 2025
          </h5>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mt-2">
            Smartwatch <br /> for you !
          </h2>
          <button className="bg-white px-4 py-2 w-full sm:w-[12vw] my-2 text-black rounded-lg uppercase text-sm sm:text-base">
            Shop Now
          </button>
        </div>
        {/* Images */}
        <img
          src={smartWatch}
          alt="Smartwatch 1"
          className="absolute bottom-2 right-8 w-[26vw] md:w-[20vw] lg:w-[26vw]"
        />
      </div>
    </div>
  );
};

export default ProductShowcase;