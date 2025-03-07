import React from "react";

const Testinominal = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Trustpilot Header */}
      <div className="text-center mb-2">
        <p className="text-gray-500 text-lg">Reviews from:</p>
        <div className="flex items-center justify-center space-x-2">
          <span className="text-blue-700 text-2xl font-bold">&#9733; Trustpilot</span>
        </div>
      </div>
      
      {/* Review Card */}
      <div className="bg-[#121421] text-white p-6 rounded-lg w-[450px] shadow-lg text-center">
        <div className="flex justify-center mb-2">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-yellow-400 text-xl">&#9733;</span>
          ))}
        </div>
        <p className="text-sm mb-4">
          Thank you again and again! I have experienced the fastest support ever. My order arrived
          on my doorstep the following day. Your team is always friendly and very helpful. You
          managed to exceed my expectations!
        </p>
        <p className="font-bold">Sam Kromstain</p>
      </div>

      {/* Carousel Dots */}
      <div className="flex mt-4 space-x-2">
        <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
      </div>
    </div>
  );
};

export default Testinominal;
