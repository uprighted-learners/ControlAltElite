// Mentee Dashboard
import React, { useState, useEffect } from "react";
import MentorProfile from "../Mentors/MentorProfile";
import { API_MENTEE_PROFILE_PREVIEW, API_VIEW_MENTORS } from "../../constants/endpoints";
import MentorDirectory from "../public-views/MentorDirectory";
import MenteeProfile from "./MenteeProfile";
import MentorPreview from "./MentorPreview";

const MenteeDashboard = (props) => {
  const [mentor, setMentor] = useState({});
  const [showMentorPreview, setShowMentorPreview] = useState(false);
  const [mentee, setMentee] = useState({});
  const toggleMentorPreview = () => {
    setShowMentorPreview(!showMentorPreview);
  };

  async function getMentee() {
    //Headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);
  //Request
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
  //Send Request
    let response = await fetch(API_MENTEE_PROFILE_PREVIEW, requestOptions);
    let menteeData = await response.json();
    setMentee(menteeData.user);
  }

  async function getMentor() {
    //Headers
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", props.token);
    //Request Options
    let requestOptions = {
      method: "GET",
      headers: myHeaders,
    };
    //Send Request
    let response = await fetch(API_VIEW_MENTORS, requestOptions);

    //Response Object
    let data = await response.json();
    console.log(data);
    setMentor(data);
  }

  useEffect(() => {
    getMentor();
    getMentee();
  }, []);

  // Function to handle mentor selection
  const handleSubmit = (mentor) => {
    // Perform any action with the selected mentor
    console.log("Selected Mentor:", mentor);
  };

  return (
    <>
      <div className="container h-full p-4 mx-auto">
        <div className="bg-[#1b0a5f] text-white flex flex-col md:flex-row items-center justify-center md:justify-between p-4 rounded-md">
          <h1 className="text-2xl text-center uppercase">Mentee Name: {`${mentee?.firstName} ${mentee?.lastName}` || "Loading..."}</h1>
        </div>
        <div className="container mx-auto py-18">
          <MentorDirectory token={props.token} />
          <MenteeProfile token={props.token} />
          {/* Show or Hide Matched Mentor */}
          <div className="p-4 mt-4 rounded-md shadow bg-base-200">
            <button
              className="mt-4 btn bg-[#1b0a5f] text-white hover:bg-[#6c50e1] rounded-md"
              onClick={toggleMentorPreview}
            >
              {showMentorPreview ? "Hide Matched Mentor" : "View Matched Mentor"}
            </button>

            {showMentorPreview && <MentorPreview token={props.token} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteeDashboard;
