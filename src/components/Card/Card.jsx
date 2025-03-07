import React from "react";
import card1 from "../../assets/card1.png";
import card2 from "../../assets/card2.png";
import card3 from "../../assets/card3.png";

const items = [
  {
    title: "Mac Desktops",
    description: "Powerful performance!",
    img: card1,
    bgColor: "bg-[#F1F4FF]",
    textColor: "text-[#41415E]",
  },
  {
    title: "BIG SALE",
    description: "Grab your smartphone!",
    otherText: "Upto 30% off",
    img: card2,
    bgColor: "bg-[#485AD8]",
    textColor: "text-white",
  },
  {
    title: "Computers",
    description: "Upgrade your tech!",
    img: card3,
    bgColor: "bg-[#F1F4FF]",
    textColor: "text-[#41415E]",
  },
];

const CardCarousel = () => {
  return (
    <div className="relative flex items-center justify-center">
      {/* Left Arrow on First Card */}
      <button className="absolute left-8 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition">
        ⬅
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={`shadow-xl rounded-xl overflow-hidden text-center p-6 transition ${item.bgColor} ${item.textColor} flex flex-col justify-between`}
          >
            <h5 className="text-lg font-semibold">{item.otherText}</h5>
            <h2 className="text-3xl font-semibold">{item.title}</h2>
            <p className="text-gray-500">{item.description}</p>
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Right Arrow on Last Card */}
      <button className="absolute right-8 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-600 transition">
        ➡
      </button>
    </div>
  );
};

export default CardCarousel;
