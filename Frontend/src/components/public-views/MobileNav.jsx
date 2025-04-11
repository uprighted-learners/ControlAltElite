import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const MobileNav = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center lg:hidden bg-blue-950">
      <button onClick={handleNav}>
        {nav ? <AiOutlineClose className="absolute top-2.5 right-2.5 z-20" size={32} />: <FaBars className="absolute top-2.5 right-2.5 z-20" size={32} />}
      </button>
      <div className={nav ? "flex flex-col items-center justify-center fixed bg-blue-950 top-0 left-0 w-full h-full z-10" : "hidden"}>
          <ul>
            <li className="uppercase">
              <a href="/">Homepage</a>
            </li>
          </ul>
          {/* Get Started button (login/signup) */}
          <button className="bg-[#C6CBFF] hover:bg-[#6C50E1] px-6 py-3 rounded text-lg font-semibold text-shadow-md shadow-md">Get Started</button>
      </div>
    </div>
  );
};

export default MobileNav;
