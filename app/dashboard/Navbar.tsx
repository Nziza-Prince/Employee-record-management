import React from 'react';
import {useSession} from "next-auth/react"

const Navbar = () => {
  const {data:session} = useSession()
  return (
    <div className="w-full bg-white p-4 flex justify-between shadow-md pr-10">
      <img className="w-32" src="/Bitmap.svg" alt="Logo" />
      <div className="flex gap-3 mt-2 items-center">
        <div className="bg-gray-600 rounded-full w-6 h-6"></div>
        <h1>Hi {session?.user?.name}</h1>
      </div>
    </div>
  );
};

export default Navbar;