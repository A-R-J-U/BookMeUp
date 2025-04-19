import React from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="w-screen h-screen bg-black flex flex-col justify-center items-center p-6">
        <h1 className="text-white text-4xl md:text-6xl font-bold py-5">
          <span className="text-red-600">404 </span>PAGE NOT FOUND
        </h1>
        <img className="w-sm md:w-lg" src={logo} alt="LOGO" />
        <Link to="/">
          <button className="bg-[#FF8C09] p-2 w-3xs mx-auto mt-[-40px] rounded-md text-center text-2xl text-white font-semibold hover:scale-110 cursor-pointer transition ease-in-out duration-300 ">
            Home
          </button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
