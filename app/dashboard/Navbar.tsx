"use client";

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

const Navbar = () => {
  const { data: session, status } = useSession();
  
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };
  
  return (
    <div className="w-full bg-white p-4 flex justify-between shadow-md pr-10">
      <img className="w-32" src="/Bitmap.svg" alt="Logo" />
      <div className="flex gap-3 mt-2 items-center">
        {status === "authenticated" ? (
          <>
            <div className="bg-gray-600 rounded-full w-6 h-6"></div>
            <h1>Hi {session?.user?.name || "User"}</h1>
            <button 
              onClick={handleLogout}
              className="ml-4 text-sm text-red-500 hover:text-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-green-500 hover:text-green-600">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;