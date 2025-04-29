import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { navMenu } from "../../constants/data";

const MobileNav = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  return (
    <div className="flex flex-col gap-4 items-center justify-center md:hidden  p-4  uppercase">
      <button onClick={handleNav}>{nav ? <AiOutlineClose className="text-white absolute top-5.5 right-5.5 z-30" size={32} /> : <FaBars className="absolute top-5.5 right-5.5 z-30 text-white" size={32} />}</button>
      <div className={nav ? "flex flex-col items-center justify-center fixed bg-[#1b0a5f] top-0 left-0 w-full h-full z-20" : "hidden"}>
        <h2 className="text-white text-4xl text-center py-12">Benn Rising Mentorship Program</h2>
        <p className="uppercase text-2xl text-white">Goal Statement</p>
        <ul className="w-full flex flex-col items-center justify-center gap-4 text-white text-2xl font-semibold">
          {navMenu.map((menu) => (
            <a key={menu.name} className="py-8 w-full hover:opacity-30 text-center" href={menu.href}>
              <li>
                {menu.name}
              </li>
            </a>
          ))}
        </ul>
        {/* Get Started button (login/signup) */}
        {/* <button className="bg-[#C6CBFF] hover:bg-[#6C50E1] px-6 py-3 rounded text-lg font-semibold text-shadow-md shadow-md">Get Started</button> */}
      </div>
    </div>
  );
};

export default MobileNav;
