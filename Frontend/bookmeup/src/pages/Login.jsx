import { React, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../contexts/AuthContext.jsx";
import { CiLogin } from "react-icons/ci";

const Login = () => {
  const { setisloggedin } = useAuth();
  const API = import.meta.env.VITE_API_URL;

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    e.preventDefault();
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(`${API}/users/signin`, formdata, {
        withCredentials: true,
      });

      toast.success(res?.data?.message);
      setisloggedin(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Server Error");
      console.log(err);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center p-4">
      <div className="container bg-gr px-[50px] py-[30px] w-sm xl:w-lg h-3xl border-2 border-gray-300 rounded-4xl md:mt-[-20px] mt-[-90px] shadow-xl">
        <div className="logo">
          <img src={logo} alt="LOGO" className="w-sm" />
        </div>
        <div className="flex flex-col items-center mt-[-60px] w-[100%]">
          <h1 className="text-white text-3xl font-bold text-center p-[20px]">
            LOGIN
          </h1>
          <form
            onSubmit={(e) => {
              handlesubmit(e);
            }}
            className=" logfrm flex flex-col"
          >
            <input
              type="text"
              placeholder="EMAIL"
              name="email"
              value={formdata.email}
              onChange={(e) => {
                handlechange(e);
              }}
              className="bg-white text-black rounded-md p-[10px] mb-4 xl:w-sm"
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              name="password"
              value={formdata.password}
              onChange={(e) => {
                handlechange(e);
              }}
              className="bg-white text-black rounded-md p-[10px] mb-1"
              required
            />
            <button
              type="submit"
              className="bg-[#FF8C09] px-1 py-2 w-3xs mx-auto mt-5 mb-1 rounded-md text-center text-2xl font-semibold hover:scale-110 cursor-pointer transition ease-in-out duration-300 flex justify-center gap-1 items-center"
            >
              <CiLogin className="text-4xl -ml-3" /> LOGIN
            </button>
          </form>
        </div>
        <a
          href="/register"
          className="cursor-pointer text-blue-500 hover:underline"
        >
          Not registered yet?
        </a>
      </div>
    </div>
  );
};

export default Login;
