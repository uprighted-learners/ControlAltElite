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
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Mentor Name */}
      <h2 className="text-2xl sm:text-3xl font-bold text-purple-700 mb-6 border-b pb-2">
        Matched Mentor: {mentor.firstName} {mentor.lastName}
      </h2>
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-medium text-gray-700">Interest:</span>
          <span className="text-gray-900">{mentor.interests}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-medium text-gray-700">Project:</span>
          <span className="text-gray-900">{mentor.projectCategory}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <span className="font-medium text-gray-700">Question:</span>
          <span className="text-gray-900">{mentor.questionToAsk}</span>
        </div>
      </div>
    </div>
  );
};

export default MentorPreview;
