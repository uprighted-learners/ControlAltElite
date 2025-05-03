import React, { useState, useEffect } from "react";
import MenteePreview from "./MenteePreview";
import MentorNavbar from "./MentorNavbar";
import MentorPendingRequest from "./MentorPendingRequest";
import { API_VIEW_MENTOR_MATCH } from "../../constants/endpoints";

const MentorDashboard = (props) => {
  const [showMenteePreview, setShowMenteePreview] = useState(false);
  const [mentorName, setMentorName] = useState("");

  const togglePreview = () => {
    setShowMenteePreview(!showMenteePreview);
  };

  useEffect(() => {
    const fetchMentorInfo = async () => {
      try {
        const res = await fetch(API_VIEW_MENTOR_MATCH, {
          headers: {
            Authorization: `${props.token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        // assuming the name is in data.mentor.name or similar
        if (data && data.mentor && data.mentor.name) {
          setMentorName(data.mentor.name);
        } else {
          setMentorName("Mentor");
        }
      } catch (error) {
        console.error("Error fetching mentor name:", error);
      }
    };

    fetchMentorInfo();
  }, [props.token]);


  return (
    <>
      {/* <MentorNavbar /> */}

      <div className="container h-full p-4 mx-auto">
        <div className="bg-[#1b0a5f] text-white flex flex-col md:flex-row items-center justify-center md:justify-between p-4 rounded-md">
          <h1 className="text-2xl font-bold text-center uppercase">
            Mentor Name: {mentorName}
          </h1>
        </div>
      </div>

      {/* View Pending Requests */}
      <MentorPendingRequest token={props.token} />

      {/* Just Project Preview */}
      <div className="p-4 mt-4 rounded-md shadow bg-base-200">
        <MenteePreview token={props.token} />
      </div>

      {/* Toggle Preview Button */}
      <button className="mt-4 btn" onClick={togglePreview}>
        {showMenteePreview ? "Hide Matched Mentee " : "View Matched Mentee"}
      </button>

      {showMenteePreview && (
        <div className="p-4 mt-4 rounded-md shadow bg-base-200">
          <MenteePreview token={props.token} />
        </div>
      )}
    </>
  );
};

export default MentorDashboard;
