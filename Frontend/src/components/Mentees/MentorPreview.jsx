// showing up on the mentees dashboard
// TODO: make a match to see if this works
import React, { useEffect, useState } from "react";
import { API_VIEW_MENTOR_MATCH } from "../../constants/endpoints";

const MentorPreview = ({ token }) => {
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch(API_VIEW_MENTOR_MATCH, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch mentor data");

        const data = await response.json();
        console.log("API response:", JSON.stringify(data, null, 2));

        // Example assuming response like { mentor: { name, interest, ... }, mentee: { interest, answer } }
        if (data.matches && data.matches.length > 0) {
          setMentor(data.matches[0]); // <-- This match object contains `mentor`, `menteeInterest`, etc.
        }
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    if (token) fetchMentorData();
  }, [token]);

  if (!mentor) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
          {/* Mentor Info Card */}
          <div className="bg-sky-50 rounded-2xl shadow-lg p-4 sm:p-6 space-y-4">
        {/* Mentor's first and last name */}
        <div className="text-center">
          <h1
            className="text-gray-900 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center underline"
            style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.15)" }}
          >
            {mentor.firstName + " " + mentor.lastName}
          </h1>
        </div>
        <div className="flex items-center justify-center">
          {/* Project Category */}
          <p className="font-bold text-xl text-gray-700 mr-2">
            Project Category:
          </p>
          <span className="text-blue-500 text-xl font-bold">
            {mentor.projectCategory}
          </span>
        </div>
        {/* Profile Photo */}
        <div className="flex justify-center items-center px-4 pt-6">
          <img
            src={
              mentor.profilePhoto
                ? mentor.profilePhoto
                : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Mentor"
            className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-md"
          />
        </div>
        {/* Interest List */}
        <div className="flex flex-col items-center text-center py-4">
          <p className="font-bold text-xl text-gray-700 mb-1">Interests:</p>
          <ul className="list-disc list-inside text-left text-gray-900 text-lg space-y-1">
            {mentor.interests.map((interest, index) => (
              <li key={index}>{interest}</li>
            ))}
          </ul>
        </div>
        {/* Mentor's question */}
        <div className="flex flex-col items-center text-center py-4">
          <p className="font-bold text-xl text-gray-700 mb-1">Question:</p>
          <span className="text-gray-900 text-xl italic">
            {mentor.questionToAsk}
          </span>
        </div>
      </div>
    </>
    // <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    //   {/* Mentor Name */}
    //   <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-6 border-b pb-2">
    //     Matched Mentor: {mentor.firstName} {mentor.lastName}
    //   </h2>
    //   <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
    //     <div className="flex flex-col sm:flex-row sm:justify-between">
    //       <span className="font-medium text-gray-700">Interest:</span>
    //       <span className="text-gray-900">{mentor.interests}</span>
    //     </div>
    //     <div className="flex flex-col sm:flex-row sm:justify-between">
    //       <span className="font-medium text-gray-700">Project:</span>
    //       <span className="text-gray-900">{mentor.projectCategory}</span>
    //     </div>
    //     <div className="flex flex-col sm:flex-row sm:justify-between">
    //       <span className="font-medium text-gray-700">Question:</span>
    //       <span className="text-gray-900">{mentor.questionToAsk}</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default MentorPreview;
