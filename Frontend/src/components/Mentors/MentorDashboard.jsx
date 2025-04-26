import React, { useState, useEffect } from "react";
import MenteePreview from "./MenteePreview";
import MentorNavbar from "./MentorNavbar";
import MentorProfileEdit from "./MentorProfileEdit";
import MentorPendingRequest from "./MentorPendingRequest";

const MentorDashboard = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const [hasPengingMatch, setHasPendingMatch] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <MentorNavbar />
      <MentorPendingRequest token={props.token} />
      <div className="flex flex-col-reverse items-center justify-center text-black text-center p-4 rounded-md mt-4">
        <MentorProfileEdit token={props.token} />
      </div>
      <div className="p-4">
        {/* Header Container with Flex */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold"> Mentor Name:</h1>
          <div>
            <div
              tabIndex={0}
              role="button"
              className="btn m-1"
              onClick={toggleDropdown}
            >
              Click ⬇️
            </div>
            <ul tabIndex={0} className={isOpen ? "block" : "hidden"}>
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MentorDashboard;
