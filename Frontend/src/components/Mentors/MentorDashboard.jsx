import React, { useState, useEffect } from "react";
import MenteePreview from "./MenteePreview";
import MentorNavbar from "./MentorNavbar";
import MentorProfileEdit from "./MentorProfileEdit";
import MentorPendingRequest from "./MentorPendingRequest";


const MentorDashboard = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenteePreview, setShowMenteePreview] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const togglePreview = () => {
    setShowMenteePreview(!showMenteePreview);
  };
  return (
    <>
      <MentorNavbar />
      <div className="flex flex-col-reverse items-center justify-center p-4 mt-4 text-center text-black rounded-md">
        <MentorProfileEdit token={props.token} />
      </div>
      <div className="p-4">
        {/* Header Container with Flex */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold"> Mentor Name:</h1>
          <div>
            <div tabIndex={0} role="button" className="m-1 btn" onClick={toggleDropdown}>
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
      <MenteePreview token={props.token} />

     <MentorPendingRequest token={props.token} />

      <div className="flex flex-col-reverse items-center justify-center p-4 mt-4 text-center text-black rounded-md">
        <MentorProfileEdit token={props.token} />
      </div>
      <div className="container h-full p-4 mx-auto">
        <div className="bg-[#1b0a5f] text-white flex flex-col md:flex-row items-center justify-center md:justify-between p-4 rounded-md">
          <h1 className="text-2xl font-bold text-center uppercase">
            Mentor Name
          </h1>
          <div className="flex gap-2.5 mt-2 md:mt-0">
            <select
              name="mentor-options"
              id="mentor-options"
              className="select select-bordered bg-white text-[#1b0a5f] font-medium px-4 py-2 rounded-md"
            >
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="pending">View Pending Mentees</option>
              <option value="profile">Edit Profile</option>
            </select>
          </div>
        </div>
      </div>

      <button className="mt-4 btn" onClick={togglePreview}>
        {showMenteePreview ? "Hide Mentee Preview" : "View Pending Mentee"}
      </button>

      {/* Conditionally render preview */}
      {showMenteePreview && (
        <div className="p-4 mt-4 rounded-md shadow bg-base-200">
          <MenteePreview />
        </div>
      )}

    </>
  );
};

export default MentorDashboard;
