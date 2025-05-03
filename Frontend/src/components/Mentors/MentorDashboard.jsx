import React, { useState, useEffect } from "react";
import MenteePreview from "./MenteePreview";
import MentorNavbar from "./MentorNavbar";
import MentorPendingRequest from "./MentorPendingRequest";
import {
  API_MENTOR_PROFILE_PREVIEW,
  API_VIEW_MENTOR_MATCH,
} from "../../constants/endpoints";
import MentorProfileEdit from "./MentorProfileEdit";

const MentorDashboard = (props) => {
  const [showMenteePreview, setShowMenteePreview] = useState(false);
  const [mentorName, setMentorName] = useState("");
  const [mentor, setMentor] = useState({});

  const togglePreview = () => {
    setShowMenteePreview(!showMenteePreview);
  };

  useEffect(() => {
    const fetchMentorInfo = async () => {
      try {
        const res = await fetch(API_MENTOR_PROFILE_PREVIEW, {
          headers: {
            Authorization: `${props.token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log("MENTOR DASHBOARD DATA", data);
        if (data && data.user) {
          setMentor(data.user);
        }
      } catch (error) {
        console.error("Error fetching mentor info:", error);
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
            Mentor Name:{" "}
            {mentor.firstName && mentor.lastName
              ? `${mentor.firstName} ${mentor.lastName}`
              : "Loading..."}
          </h1>
        </div>
      </div>

      {/* View Pending Requests */}
      <MentorPendingRequest token={props.token} />

      {/* Toggle Preview Button */}
      <button className="mt-4 btn" onClick={togglePreview}>
        {showMenteePreview ? "Hide Matched Mentee " : "View Matched Mentee"}
      </button>
      <div className="flex flex-col-reverse items-center justify-center p-4 mt-4 text-center text-black rounded-md">
        <MentorProfileEdit token={props.token} />
      </div>

      {showMenteePreview && (
        <div className="p-4 mt-4 rounded-md shadow bg-base-200">
          <MenteePreview token={props.token} key={refreshKey} />
        </div>
      )}
    </>
  );
};

export default MentorDashboard;
