// Mentor Dashboard Page
import React, {  useEffect, useState } from "react";
import { API_VIEW_MENTOR_MATCH } from "../../constants/endpoints";

const MenteePreview = ({ token }) => {
  const [mentee, setMentee] = useState(null);

  useEffect(() => {
    const fetchMenteeData = async () => {
      try {
        const response = await fetch(API_VIEW_MENTOR_MATCH, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch mentee data");

        const data = await response.json();
        console.log("API Response:", data)

        // Adjust this depending on the shape of your backend response
        setMentee(data.matches[0] || data); 
      } catch (error) {
        console.error("Error fetching mentee data:", error);
      }
    };

    if (token) fetchMenteeData();
  }, [token]);

  if (!mentee) return <div className="text-center mt-10">Loading...</div>;
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto">
  {/* Title */}
  <h2 className="text-2xl sm:text-3xl text-center font-bold text-blue-600 mb-6 border-b pb-2">
    Matched Mentee Profile:
  </h2>

  {/* Mentee Info Card */}
  <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 space-y-4 pt-6">
    {/* Name */}
    <div className="text-center">
      <h1 className="text-gray-900 text-xl sm:text-2xl md:text-3xl font-bold underline" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.15)' }}>
        {mentee.firstName + " " + mentee.lastName}
      </h1>
    </div>

    {/* School */}
    <div className="flex items-center justify-center pt-4">
      <p className="font-bold text-xl text-gray-700 mr-2">School:</p>
      <span className="text-blue-500 text-xl font-bold">{mentee.school}</span>
    </div>

    {/* Interests */}
    <div className="flex flex-col items-center text-center py-4">
      <p className="font-bold text-xl text-gray-700 mb-1">Interests:</p>
      <ul className="list-disc list-inside text-left text-gray-900 text-lg space-y-1">
  {mentee.interests.map((interest, index) => (
    <li key={index}>{interest}</li>
  ))}
</ul>
    </div>
  </div>
</div>
    // <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto">
    //   {/* Project Title */}
    //   <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 border-b pb-2">
    //     Project: {mentee.project}
    //   </h2>

    //   {/* Mentee Info Card */}
    //   <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
    //     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    //       <span className="font-medium text-gray-700">Name:</span>
    //       <span className="text-gray-900 text-lg">{mentee.firstName+" "+mentee.lastName}</span>
    //     </div>
    //     <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
    //       <span className="font-medium text-gray-700">Interests: {mentee.interests}</span>
    //       <span className="text-gray-900 text-lg">{mentee.interests}</span>
    //     </div>
    //   </div>
    // </div>
  );
};

export default MenteePreview;