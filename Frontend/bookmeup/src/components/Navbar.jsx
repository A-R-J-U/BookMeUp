import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext.jsx";
import Logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { CiLogout } from "react-icons/ci";
import { IoMdHome } from "react-icons/io";
import { FaBuilding } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";


const Navbar = () => {
  
  const [toggle, setToggle] = useState(false);

  const { setisloggedin, setuser } = useAuth();

  const signout = () => {
    axios
      .get(`api/users/signout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        setisloggedin(false);
        setuser(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-between items-center h-20 px-5 z-50 bg-black">
      <div className="itm w-1/2">
        <ul className=" desktop hidden md:flex text-lg gap-10 font-bold justify-around items-center ">
          <li className="hover:text-[#FF8C09] hover:scale-105 transition-all duration-300 ease-in-out">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-[#FF8C09]" : "text-white"
              }
            >
              <span className="flex gap-1 justify-center items-center">
                <IoMdHome className=" text-2xl" />
                Home
              </span>
            </NavLink>
          </li>
          <li className="hover:text-[#FF8C09] hover:scale-105 transition-all duration-300 ease-in-out">
            <NavLink
              to="/venues"
              className={({ isActive }) =>
                isActive ? "text-[#FF8C09]" : "text-white"
              }
            >
              <span className="flex gap-1 justify-center items-center">
                <FaBuilding className="text-lg" />
                Venues
              </span>
            </NavLink>
          </li>
          <li className="hover:text-[#FF8C09] hover:scale-105 transition-all duration-300 ease-in-out">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "text-[#FF8C09]" : "text-white"
              }
            >
              <span className="flex gap-2 justify-center items-center">
                <FaUserLarge className="text-lg" />
                Profile
              </span>
            </NavLink>
          </li>
          <li>
            <button
              className="btn bg-[#FF8C09] text-lg px-5 py-3 rounded-xl hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer flex gap-1 justify-center items-center"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              <CiLogout className="text-2xl" />
              Logout
            </button>

            <dialog id="my_modal_1" className="modal z-50">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Logout?</h3>
                <p className="py-4">
                  Are you sure you want to logout? You will be redirected to the
                  login page.
                </p>
                <div className="modal-action">
                  <form method="dialog">
                    <button
                      className="btn hover:bg-[#FF8C09]"
                      onClick={() => signout()}
                    >
                      Yes
                    </button>
                    <button className="btn hover:bg-[#FF8C09]">No</button>
                  </form>
                </div>
              </div>
            </dialog>
          </li>
        </ul>

        <button
          onClick={() => {
            setToggle(true);
          }}
          className={`${
            toggle ? "hidden" : "block"
          } text-3xl md:hidden text-[#FF8C09] mt-[-10px]`}
        >
          <RxHamburgerMenu />
        </button>

        <div
          className={`mobile ${
            toggle ? "left-0" : "-left-[1000px]"
          } md:hidden fixed top-0 w-full z-30 h-screen flex justify-center items-center backdrop-blur-3xl transition-all duration-300 ease-in-out`}
        >
          <ul
            className={`flex flex-col text-lg gap-10 font-bold justify-around items-center `}
          >
            <li
              onClick={() => {
                setToggle(false);
              }}
              className="text-4xl"
            >
              <IoClose />
            </li>
            <li className="hover:text-[#FF8C09] transition-all duration-300 ease-in-out">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-[#FF8C09]" : "text-white"
                }
              >
                <span className="flex gap-1 justify-center items-center">
                  <IoMdHome className="-mt-1 text-2xl" />
                  Home
                </span>
              </NavLink>
            </li>
            <li className="hover:text-[#FF8C09] transition-all duration-300 ease-in-out">
              <NavLink
                to="/venues"
                className={({ isActive }) =>
                  isActive ? "text-[#FF8C09]" : "text-white"
                }
              >
                <span className="flex gap-1 justify-center items-center">
                  <FaBuilding className="text-lg" />
                  Venues
                </span>
              </NavLink>
            </li>
            <li className="hover:text-[#FF8C09] transition-all duration-300 ease-in-out">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "text-[#FF8C09]" : "text-white"
                }
              >
                <span className="flex gap-2 justify-center items-center">
                  <FaUserLarge className="text-lg" />
                  Profile
                </span>
              </NavLink>
            </li>
            <li>
              <button
                className="btn bg-[#FF8C09] text-lg px-5 py-3 rounded-xl hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer flex gap-1 justify-center items-center"
                onClick={() => signout()}
              >
                <CiLogout className="text-2xl" />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="logo  px-5 pt-4">
        <img src={Logo} alt="Logo" className="w-32" />
      </div>
    </div>
  );
};

export default Navbar;
