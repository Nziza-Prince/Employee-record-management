"use client";
import React, { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/utils/validation/userSchema";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = form;

  const onSubmitForm: SubmitHandler<LoginSchema> = async (data: LoginSchema) => {
    try {
      setError("");
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error); // Display NextAuth-specific error
      } else {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again."); // Generic fallback error
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Image Section */}
      <div className="w-1/2 relative flex items-center justify-center bg-gray-100">
        <Image src="/Model.svg" alt="Model" className="w-full h-full object-cover" />
        <div className="absolute bottom-10 left-10 text-white">
          <h2 className="text-xl font-semibold">No Hazzles</h2>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="w-1/2 flex flex-col justify-center items-center px-16 bg-gray-10">
        <h1 className="text-left text-2xl font-bold">Login into your account</h1>
        <p className="mt-2 text-gray-600 text-left">
          Don’t have an account?{" "}
          <span className="text-green-500 cursor-pointer">
            <Link href="/signup">Signup</Link>
          </span>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-600 mt-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmitForm)} className="shadow-md p-10 mt-6 w-full max-w-md">
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
                type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <IoEyeOffOutline className="mt-3" />
                ) : (
                  <IoEyeOutline className="mt-3" />
                )}
              </button>
            </div>
            <p className="text-red-600">{errors.password?.message}</p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`cursor-pointer w-full mt-6 bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Signing in..." : "Signin"}
          </button>
        </form>

        <p className="mt-4 text-gray-600 text-sm right-10">
          By signing in, you agree to our{" "}
          <span className="text-green-500">Terms</span> and{" "}
          <span className="text-green-500">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Page;