import React from "react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <>
    <div className="bg-blue-950 text-white py-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h2 className="uppercase">Benn Rising</h2>
          <div className="hidden lg:flex items-center space-x-4">
              <ul>
                <li className="uppercase"><a href="/">Homepage</a></li>
              </ul>
              {/* Get Started button (login/signup) */}
              <button className="bg-[#C6CBFF] hover:bg-[#6C50E1] px-6 py-3 rounded text-lg font-semibold text-shadow-md shadow-md">Get Started</button>
          </div>        
        </div>
      </div>
    </div>
    <MobileNav />
    </>
  );
};

export default Navbar;
