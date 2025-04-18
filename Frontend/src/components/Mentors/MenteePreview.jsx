// Mentor Dashboard Page
import React, { useCallback, useEffect, useState } from "react";

const MenteePreview = () => {
  //mentee holding the data like name etc/ setMentee used to update/null cause no data yet
  const [mentee, setMentee] = useState(null);

  useEffect(() => {
    //calling API to get data with fetchMenteeData
    const fetchMenteeData = async () => {
      const menteeData = {
        //!need to fetch call to backend for mentee data
      };
    };
    fetchMenteeData();

    //empty array to run useEffect
  }, []);

  //Before mentee data loads, once loaded it will show dashboard
  // if (!mentee) return <div className="text-center mt-10">Loading...</div>;

  //styling with tailwind
  return (
   
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      {/* Project Title */}
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-600 mb-6 border-b pb-2">
        Project: {false && mentee.project} 
      </h2>

      {/* Mentee Info Card */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium text-gray-700">Name:</span>
          <span className="text-gray-900 text-lg">{false && mentee.name}</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <span className="font-medium text-gray-700">Interest:</span>
          <span className="text-gray-900 text-lg">{false && mentee.interest}</span> 
        </div>
      </div>
    </div>
  );
};

export default MenteePreview;
