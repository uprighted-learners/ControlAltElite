// showing up on the mentees dashboard
// TODO: make a match to see if this works
import React, {useEffect, useState} from "react" 
import { API_VIEW_MENTOR_MATCH } from "../../constants/endpoints"

const MentorPreview = ({ token }) => {
    const [mentor, setMentor] = useState(null);
  
    useEffect(() => {
      const fetchMentorData = async () => {
        try {
          const response = await fetch(API_VIEW_MENTOR_MATCH, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `${token}`,
            },
          });
  
          if (!response.ok) throw new Error("Failed to fetch mentor data");
  
          const data = await response.json();
          console.log("Mentor data from match:", data); // Check structure in console
  
          // Example assuming response like { mentor: { name, interest, ... }, mentee: { interest, answer } }
          setMentor(data.matches[0] || data);
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
          Matched Mentor: {mentor.name}
        </h2>
  
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-medium text-gray-700">Mentor Interest:</span>
            <span className="text-gray-900">{mentor.interest}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-medium text-gray-700">Your Interest:</span>
            <span className="text-gray-900">{mentor.menteeInterest}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <span className="font-medium text-gray-700">Your Answer:</span>
            <span className="text-gray-900">{mentor.menteeAnswer}</span>
          </div>
        </div>
      </div>
    );
  };
  
  export default MentorPreview;