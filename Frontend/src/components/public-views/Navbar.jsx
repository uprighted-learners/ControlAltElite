import React, { useState, useEffect } from "react";
import { navMenu } from "../../constants/data";
import MobileNav from "./MobileNav";

function Navigationbar(props) {
  return (
    <>
      <div className="relative top-0 z-10 w-full bg-[#1b0a5f] border-b-4 border-[#eab246]">
        <div className="container p-4 mx-auto">
          <div className="hidden p-4 text-white uppercase rounded-sm md:block">
            <ul className="flex items-center justify-between">
              {navMenu.map((menu) => (
                <li key={menu.name}>
                  <a className="hover:text-[#eab246] hover:underline hover:underline-offset-4" href={menu.href}>{menu.name}</a>
                </li>
              ))}
              <div className="ml-4 space-x-4">
                <button className="bg-[#eab246] text-white uppercase px-6 py-2 rounded-md"><a href="/signup">Sign Up</a></button>
                <button className="bg-[#eab246] text-white uppercase px-6 py-2 rounded-md"><a href="/login">Login</a></button>
              </div>
            </ul>
          </div>
        </div>
        <MobileNav />
      </div>
    </>
  );
}

export default Navigationbar;
