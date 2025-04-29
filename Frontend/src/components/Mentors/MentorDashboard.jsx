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
      <div className="container h-full p-4 mx-auto">
        <div className="bg-[#1b0a5f] text-white flex flex-col md:flex-row items-center justify-center md:justify-between p-4 rounded-md">
          <h1 className="text-2xl font-bold text-center uppercase">
            //!need to make this dynamic from a GET endpoint
            Mentor Name :
          </h1>
        </div>
      </div>
      <MentorPendingRequest token={props.token} />

      <div className="flex flex-col-reverse items-center justify-center p-4 mt-4 text-center text-black rounded-md">
        <MentorProfileEdit token={props.token} />
      </div>

      <button className="mt-4 btn" onClick={togglePreview}>
        {showMenteePreview ? "Hide Mentee Preview" : "View Pending Mentee"}
      </button>

      {/* Conditionally render preview */}
      {showMenteePreview && (
        <div className="p-4 mt-4 rounded-md shadow bg-base-200">
          <MenteePreview token={props.token} />
        </div>
      )}
    </>
  );
};

export default MentorDashboard;

