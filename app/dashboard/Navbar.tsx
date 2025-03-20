"use client";

import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const { data: session, status } = useSession();
  
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: '/login' });
  };
  
  return (
    <div className="w-full bg-white p-4 flex justify-between shadow-md pr-10">
      <Image className="w-32" width={32} height={32} src="/Bitmap.svg" alt="Logo" />
      <div className="flex gap-3 mt-2 items-center">
        {status === "authenticated" ? (
          <>
            
              <Image className='rounded-full' src="/profile.png" width={32} height={32} alt='Profile pic'/>
           
            <h1>Hi {session?.user?.name || "User"}</h1>
            <button 
              onClick={handleLogout}
              className="bg-red-600 text-white px-3 py-1 rounded-sm hover-red-400 cursor-pointer"
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