import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="footer flex flex-col gap-0">
      <div className="wrpr flex flex-wrap justify-between items-center w-full p-5 ">
        <div className="img">
          <img src={logo} alt="logo" className=" w-30 md:w-50" />
        </div>

        <div className="p-4">
          <h1 className="font-bold text-[18px] ml-[-10px] pb-1">Links</h1>
          <ul className="text-lg">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-[#FF8C09]" : "text-white"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/venues"
                className={({ isActive }) =>
                  isActive ? "text-[#FF8C09]" : "text-white"
                }
              >
                Venues
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-[#FF8C09]" : "text-white"
                }
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="social flex text-2xl justify-between items-center gap-5 p-3">
          <h1 className="text-lg">Socials</h1>
          <FaInstagram className="hover:text-[#FF8C09] transition-all duration-300 ease-in-out cursor-pointer" />
          <FaGithub className="hover:text-[#FF8C09] transition-all duration-300 ease-in-out cursor-pointer" />
          <FaLinkedin className="hover:text-[#FF8C09] transition-all duration-300 ease-in-out cursor-pointer" />
        </div>
      </div>
      <h1 className="mx-auto -mt-7 p-2">© 2025 ARJ BookMeUp</h1>
    </div>
  );
};

export default Footer;
