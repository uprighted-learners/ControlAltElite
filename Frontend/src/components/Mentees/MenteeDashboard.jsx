// Mentee Dashboard
import React, { useState, useEffect } from "react";
import MentorProfile from "../Mentors/MentorProfile";
import MentorDirectory from "../public-views/MentorDirectory";

const MenteeDashboard = (props) => {
  const [mentor, setMentor] = useState({});

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
  }, []);

  // Function to handle mentor selection
  const handleSubmit = (mentor) => {
    // Perform any action with the selected mentor
    console.log("Selected Mentor:", mentor);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="bg-[#1b0a5f] text-white flex flex-col md:flex-row items-center justify-center md:justify-between p-4 rounded-md">
          <h1 className="text-center uppercase text-2xl">Mentee Name</h1>
          <div className="flex gap-2.5">
            <select name="mentee" id="mentee">
              <option value="" disabled selected>
                Select an option
              </option>
              <option value="edit">edit profile</option>
              <option value="resources">Resources</option>
            </select>
          </div>
        </div>
        <div className="container">
          <div className="flex items-center justify-center bg-gray-400/70 max-w-[450px] mx-auto text-white p-4 rounded-md mt-4">
            <p>Match Request Sent</p>
          </div>
          <div className="flex items-center justify-center bg-gray-400/70 max-w-[650px] mx-auto text-white text-center p-4 rounded-md mt-4">
            <p>Your request to connect with [Mentor Name] has  been sent. They will be notified and will review your profile.</p>
          </div>
          <div className="flex items-center justify-center bg-gray-400/70 max-w-[650px] mx-auto text-white text-center p-4 rounded-md mt-4">
            <p>You will receive an email notification when they respond to your request. You can also check the status in your dashboard.</p>
          </div>
          <div className="flex items-center justify-center text-white text-center p-4 rounded-md mt-4">
            <button className="bg-[#1b0a5f] px-12 py-2 rounded-md uppercase"><a href="">Mentor List</a></button>
          </div>
          <div className="flex items-center justify-center text-white text-center p-4 rounded-md mt-4">
            <button className="bg-[#1b0a5f] px-12 py-2 rounded-md uppercase"><a href="/mentor">Dashboard</a></button>
          </div>
        </div>
      </div>
      {/* <MentorProfile mentor={mentor} onMentorSelect={handleSubmit} /> */}
    </>
  );
};

export default MenteeDashboard;
