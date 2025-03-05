'use client'
import React, { useState } from "react";
import { LuUser } from "react-icons/lu"; // Ensure this import is correct
import { MdAlternateEmail } from "react-icons/md"; // Ensure this import is correct
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"; // Ensure this import is correct
import Link from "next/link"; // Corrected import for Next.js Link

const Page = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="w-1/2 relative flex items-center justify-center bg-gray-100">
        <img src="/Model.svg" alt="Model" className="w-full h-full object-cover" />
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-xl font-semibold">No Hazzles</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center px-16 bg-gray-10">
        <h1 className="text-left text-2xl font-bold">Create your free account</h1>
        <p className="mt-2 text-gray-600 text-left">
          Already registered?{" "}
          <span className="text-green-500 cursor-pointer">
            <Link href="/login">Signin</Link>
          </span>
        </p>

        {/* Form */}
        <div className="shadow-md p-10 mt-6 w-full max-w-md">
          <div className="flex gap-10">
            <div className="w-1/2">
              <label className="block text-gray-700">First Name</label>
              <div className="flex border-b border-gray-300">
                <input type="text" className="w-full p-2 focus:outline-none" />
                <LuUser className="mt-3" />
              </div>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Last Name</label>
              <div className="flex border-b border-gray-300">
                <input type="text" className="w-full p-2 focus:outline-none" />
                <LuUser className="mt-3" />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <div className="flex border-b border-gray-300">
              <input type="text" className="h-10 indent-0 w-full p-2 focus:outline-none" />
              <MdAlternateEmail className="mt-3" />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex border-b border-gray-300">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type
                className="h-10 w-full p-2 focus:outline-none"
              />
              <button
                onClick={togglePasswordVisibility}
                className="focus:outline-none"
                type="button"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="mt-3" />
                ) : (
                  <IoEyeOutline className="mt-3" />
                )}
              </button>
            </div>
          </div>
          <button className="w-full mt-6 bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition">
            Continue
          </button>
        </div>

        <p className="mt-4 text-gray-600 text-sm right-10">
          By signing up, you agree to our{" "}
          <span className="text-green-500">Terms</span> and{" "}
          <span className="text-green-500">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Page; // Ensure this is the default export