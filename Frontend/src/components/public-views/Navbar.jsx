import React, { useState, useEffect } from "react";
import { navMenu } from "../../constants/data";
import MobileNav from "./MobileNav";

function Navigationbar(props) {
  return (
    <>
      <div className="relative top-0 z-10 w-full bg-[#1b0a5f] border-b-4 border-[#eab246]">
        <div className="container mx-auto p-4">
          <div className="hidden rounded-sm p-4 text-white uppercase md:block">
            <ul className="flex items-center justify-between">
              {navMenu.map((menu) => (
                <li key={menu.name}>
                  <a className="hover:text-[#eab246] hover:underline hover:underline-offset-4" href={menu.href}>{menu.name}</a>
                </li>
              ))}
              <button className="bg-[#eab246] text-white uppercase px-6 py-2 rounded-md"><a href="/signup">Sign Up</a></button>
            </ul>
          </div>
        </div>
        <MobileNav />
      </div>
    </>
  );
}

export default Navigationbar;
