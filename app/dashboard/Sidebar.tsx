import Image from 'next/image';
import React from 'react';
import { PiUser,} from "react-icons/pi";
const Sidebar = () => {
  return (
    <div className="bg-white w-24 h-screen p-4 flex flex-col">
      <nav>
        <ul className="space-y-2">
          <li>
            <Image src="/Icon.svg" className="p-2 rounded cursor-pointer hover:bg-gray-200" alt="Icon" />
          </li>
          <li>
            <PiUser/>
          </li>
          <li>
            <Image src="/cards.svg" className="p-2 rounded cursor-pointer hover:bg-gray-200" alt="Cards" />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;