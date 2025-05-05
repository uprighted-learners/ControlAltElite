// Mentor Profile
import React, { useEffect, useState } from "react";
import { API_MENTOR_PROFILE_PREVIEW } from "../../constants/endpoints.js";
import MentorProfileEdit from "./MentorProfileEdit.jsx";

const MentorProfile = ({ token, onProfileUpdate, profileComplete }) => {
  const [mentor, setMentor] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [imageError, setImageError] = useState(false);


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
      console.log("Mentor data:", data);
      setMentor(data.user || data);

     // Check if the profile is complete and pass to parent
       const requiredFields = ["firstName", "lastName", "profilePhoto", "bio", "email"];
       const isComplete = requiredFields.every((field) => data.user[field]);
       onProfileUpdate(isComplete); // Trigger parent update with completeness status
      // Reset image error state when we get new data
      setImageError(false);
    } catch (error) {
      console.error("Error fetching mentor data:", error);
    }
  };

  // Call this function when component mounts
  useEffect(() => {
    if (token) fetchMentorData();
  }, [token]);

  // Handle image loading errors
  const handleImageError = () => {
    console.log("Image failed to load");
    setImageError(true);
  };


  if (!mentor) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Title + Button on same row */}
      <div className="flex justify-between items-center border-b border-blue-500 pb-2 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-600">
          My Profile:
        </h2>
        <button
          className="btn btn-soft btn-primary text-lg px-6"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "Update"}
        </button>
      </div>
      {/* Conditionally show edit form */}
      {showForm && (
        <div className="mb-6">
          <MentorProfileEdit
            // fetchMentorData={fetchMentorData}
            mentor={mentor}
            setMentor={setMentor}
            setShowForm={setShowForm}
            token={token}
            onProfileUpdate={onProfileUpdate}
          />
        </div>
      )}

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
        {/* Profile Photo - with error handling */}
        <div className="flex justify-center items-center px-4 pt-6">
          <img
            src={
              // Use profile photo if available and not errored, otherwise fallback to default
              imageError || !mentor.profilePhoto
                ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                : mentor.profilePhoto
            }
            alt={`${mentor.firstName} ${mentor.lastName}`}
            className="w-32 h-32 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-md"
            onError={handleImageError}
          />
        </div>
        {/* Interest List */}
        <div className="flex flex-col items-center text-center py-4">
          <p className="font-bold text-xl text-gray-700 mb-1">Interests:</p>
          <ul className="list-disc list-inside text-left text-gray-900 text-lg space-y-1">
            {mentor.interests && mentor.interests.length > 0 ? (
              mentor.interests.map((interest, index) => (
                <li key={index}>{interest}</li>
              ))
            ) : (
              <li>No interests listed</li>
            )}
          </ul>
        </div>
        {/* Mentor's question */}
        <div className="flex flex-col items-center text-center py-4">
          <p className="font-bold text-xl text-gray-700 mb-1">Question:</p>
          <span className="text-gray-900 text-xl italic">
            {mentor.questionToAsk || "No question set"}
          </span>
        </div>
        {/* Mentor's email */}
        <div className="bg-sky-100 p-4 rounded-md text-center">
          <p className="italic text-gray-500 text-sm mb-1">
            Only visible to you
          </p>
          <div className="flex items-center justify-center">
            <p className="font-bold text-xl text-gray-700 mr-2">Email:</p>
            <span className="text-blue-500 text-xl font-bold">
              {mentor.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;