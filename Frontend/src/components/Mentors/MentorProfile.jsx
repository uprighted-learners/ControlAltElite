// Mentor Profile
import React, { useEffect, useState } from "react";
import { API_MENTOR_PROFILE_PREVIEW } from "../../constants/endpoints.js";
import MentorProfileEdit from "./MentorProfileEdit.jsx";

const MentorProfile = ({ token }) => {
  const [mentor, setMentor] = useState("");

  useEffect(() => {
    const fetchMentorData = async () => {
      try {
        const response = await fetch(API_MENTOR_PROFILE_PREVIEW, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch mentor data");

        const data = await response.json();
        console.log(data);

        // Adjust this depending on the shape of your backend response
        setMentor(data.user || data);
      } catch (error) {
        console.error("Error fetching mentor data:", error);
      }
    };

    if (token) fetchMentorData();
  }, [token]);

  if (!mentor) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Project Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 border-b pb-2">
        My Profile:
      </h2>
      {/* Mentor Info Card */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium text-gray-700">Name:</span>
          <span className="text-gray-900 text-lg">
            {mentor.firstName + " " + mentor.lastName}
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium text-gray-700">Interests:</span>
          <span className="text-gray-900 text-lg">{mentor.interests}</span>
        </div>
      </div>
      {/* Update Mentor Profile Button */}
      <div className="flex flex-col-reverse items-center justify-center p-4 mt-4 text-center text-black rounded-md">
        <MentorProfileEdit />
      </div>
    </div>
  );
};

export default MentorProfile;
