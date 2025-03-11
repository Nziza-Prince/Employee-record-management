"use client";
import React, { useState } from "react";
import { LuUser } from "react-icons/lu";
import { MdAlternateEmail } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { userSchema, UserSchema } from "@/utils/validation/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation"; // Added for navigation

const Page = () => {
  const router = useRouter(); // Added router
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(""); // Added error state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const onSubmitForm: SubmitHandler<UserSchema> = async (data: UserSchema) => {
    try {
      setError(""); // Clear previous errors
      const response = await axios.post("http://localhost:3000/api/auth/signup", data); // Pass form data
      console.log("Signup successful:", response.data);
      router.push("/login"); // Redirect to login page after success
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Something went wrong during signup."); // Display error to user
    }
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

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmitForm)} className="shadow-md p-10 mt-6 w-full max-w-md">
          <div className="flex gap-10">
            <div className="w-1/2">
              <label className="block text-gray-700">First Name</label>
              <div className="flex border-b border-gray-300">
                <input
                  type="text"
                  className="w-full p-2 focus:outline-none"
                  {...register("firstname")}
                />
                <LuUser className="mt-3" />
              </div>
              <p className="text-red-600">{errors.firstname?.message}</p>
            </div>
            <div className="w-1/2">
              <label className="block text-gray-700">Last Name</label>
              <div className="flex border-b border-gray-300">
                <input
                  type="text"
                  className="w-full p-2 focus:outline-none"
                  {...register("lastname")}
                />
                <LuUser className="mt-3" />
              </div>
              <p className="text-red-600">{errors.lastname?.message}</p>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Email</label>
            <div className="flex border-b border-gray-300">
              <input
                type="text"
                className="h-10 indent-0 w-full p-2 focus:outline-none"
                {...register("email")}
              />
              <MdAlternateEmail className="mt-3" />
            </div>
            <p className="text-red-600">{errors.email?.message}</p>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Password</label>
            <div className="flex border-b border-gray-300">
              <input
                type={showPassword ? "text" : "password"}
                className="h-10 w-full p-2 focus:outline-none"
                {...register("password")}
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
            <p className="text-red-600">{errors.password?.message}</p> {/* Moved inside div */}
          </div>
          <button
            type="submit"
            disabled={isSubmitting} // Disable button during submission
            className={`cursor-pointer w-full mt-6 bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm right-10">
          By signing up, you agree to our{" "}
          <span className="text-green-500">Terms</span> and{" "}
          <span className="text-green-500">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Page;