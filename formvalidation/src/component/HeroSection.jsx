import React from "react";
import banner from "../Images/ban.jpeg";
const HeroSection = () => {
  return (
    <div className="relative  bg-gray-900">
      <img
        className="absolute inset-0 w-full h-full object-cover"
        src={banner}
        alt="Hero Image"
      />

      <div className="absolute inset-0 bg-black opacity-50"></div>

      
      <div className="relative z-10 h-full flex flex-col justify-end items-start px-6 py-32">
        <h1 className="text-4xl sm:text-6xl font-bold text-white mb-4">
          Discover your inner peace
        </h1>
        <p className="text-lg text-white mb-8">
          Join us to discover new adventures.
        </p>
        <button className="bg-indigo-950 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded">
          Join Us
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
