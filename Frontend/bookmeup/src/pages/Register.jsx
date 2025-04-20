import { React, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import logo from "../assets/logo.png";

const Register = () => {
  

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    e.preventDefault();
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post(`api/users/signup`, formdata, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="container  px-[50px] py-[30px] w-sm xl:w-lg h-3xl border-2 border-gray-300 rounded-4xl md:mt-[-20px] mt-[-80px] shadow-xl">
        <div className="logo">
          <img src={logo} alt="LOGO" className="w-md" />
        </div>
        <div className="flex flex-col items-center mt-[-60px] w-[100%]">
          <h1 className="text-white text-3xl font-bold text-center p-[20px]">
            REGISTER
          </h1>
          <form onSubmit={handlesubmit} className=" regfrm flex flex-col">
            <input
              type="text"
              placeholder="NAME"
              name="name"
              value={formdata.name}
              onChange={handlechange}
              className="bg-white text-black rounded-md p-[10px] mb-4 xl:w-sm"
              required
            />
            <input
              type="text"
              placeholder="EMAIL"
              name="email"
              value={formdata.email}
              onChange={handlechange}
              className="bg-white text-black rounded-md p-[10px] mb-4 "
              required
            />
            <input
              type="password"
              placeholder="PASSWORD"
              name="password"
              value={formdata.password}
              onChange={handlechange}
              className="bg-white text-black rounded-md p-[10px] mb-4"
              required
            />
            <button
              type="submit"
              className="bg-[#FF8C09] px-1 py-3 w-3xs mx-auto mt-4 mb-2 rounded-md text-center text-2xl font-semibold hover:scale-110 cursor-pointer transition ease-in-out duration-300 "
            >
              REGISTER
            </button>
          </form>
        </div>
        <a
          href="/login"
          className="cursor-pointer text-blue-500 hover:underline"
        >
          Already have an account?
        </a>
      </div>
    </div>
  );
};

export default Register;
