import Image from 'next/image';
import React from 'react';
import { LuUsersRound } from "react-icons/lu";

import { PiUser} from "react-icons/pi";
const Sidebar = () => {
  return (
    <div className="bg-white w-24 h-screen p-4 flex flex-col">
      <nav>
        <ul className="space-y-2">
          <li>
            <Image width={40} height={40} src="/Icon.svg" className="p-2 rounded cursor-pointer hover:bg-gray-200" alt="Icon" />
          </li>
          <li className="ml-1 font-semibold text-gray-500 text-lg p-2 rounded cursor-pointer hover:bg-gray-200 w-1/2">
          <LuUsersRound />
          </li>
          <li>
            <Image width={40} height={40} src="/cards.svg" className="p-2 rounded cursor-pointer hover:bg-gray-200" alt="Cards" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;