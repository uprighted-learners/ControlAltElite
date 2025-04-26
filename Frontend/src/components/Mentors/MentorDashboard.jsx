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
     <MentorPendingRequest token={props.token} />

      <div className="flex flex-col-reverse items-center justify-center text-black text-center p-4 rounded-md mt-4">
        <MentorProfileEdit token={props.token} />
      </div>
      <div className="container mx-auto p-4 h-full">
        <div className="bg-[#1b0a5f] text-white flex flex-col md:flex-row items-center justify-center md:justify-between p-4 rounded-md">
          <h1 className="text-center uppercase text-2xl font-bold">
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

      <button className="btn mt-4" onClick={togglePreview}>
        {showMenteePreview ? "Hide Mentee Preview" : "View Pending Mentee"}
      </button>

      {/* Conditionally render preview */}
      {showMenteePreview && (
        <div className="mt-4 bg-base-200 p-4 rounded-md shadow">
          <MenteePreview />
        </div>
      )}

    </>
  );
};

export default MentorDashboard;
