// Mentee Profile
import React, {  useEffect, useState } from "react";
import { API_MENTEE_PROFILE_PREVIEW } from "../../constants/endpoints.js";

const MenteeProfile = ({token}) => {
   const [mentee, setMentee] = useState("");
  
    useEffect(() => {
      const fetchMenteeData = async () => {
        try {
          const response = await fetch(API_MENTEE_PROFILE_PREVIEW, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `${token}`,
            },
          });
  
          if (!response.ok) throw new Error("Failed to fetch mentee data");
  
          const data = await response.json();
          console.log(data)
  
          // Adjust this depending on the shape of your backend response
          setMentee(data.user || data); 
        } catch (error) {
          console.error("Error fetching mentee data:", error);
        }
      };
  
      if (token) fetchMenteeData();
    }, [token]);
  
    if (!mentee) return <div className="text-center mt-10">Loading...</div>;
  
    return (
      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        {/* Project Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 border-b pb-2">
          Project: {mentee.project}
        </h2>
  
        {/* Mentee Info Card */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-gray-700">Name:</span>
            <span className="text-gray-900 text-lg">{mentee.firstName+" "+mentee.lastName}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="font-medium text-gray-700">Interests:</span>
            <span className="text-gray-900 text-lg">{mentee.interests}</span>
          </div>
        </div>
      </div>
    );
}

export default MenteeProfile