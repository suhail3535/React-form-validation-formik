// src/components/Header.js
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "../Images/logo.png";
const Header = () => {
  return (
    <header className="bg-indigo-900 text-white p-4 flex justify-between">
      <div>
        <img src={logo} className=" rounded-lg h-12 w-14" alt="logotitle" />
      </div>
      <h1 className="text-3xl font-semibold text-center">Wellness Retreats</h1>
      <div>
      
        <FaRegUserCircle className="w-20 h-10" />
      </div>
    </header>
  );
};

export default Header;
