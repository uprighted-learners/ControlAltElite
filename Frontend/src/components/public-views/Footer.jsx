import React from "react";

const Footer = () => {
  return (
    <div className="bg-[#1b0a5f] border-t-4 border-[#eab246] py-4">
      <div className="container mx-auto">
        <div className="flex items-center space-x-4">
          <p className="text-white text-lg">
            Thank you: This website was created by the UpRight team Control Altelite,{" "}
            <span>
              <a className="text-red-600" href="#">
                learn more
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
