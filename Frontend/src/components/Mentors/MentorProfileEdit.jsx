import React, { useState, useEffect } from "react";
import MentorProfileEdit from "./MentorProfileEdit";
import { API_MENTOR_PROFILE } from "../../constants/endpoints";

const MentorProfile = (props) => {
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch mentor profile data when component mounts
  useEffect(() => {
    const fetchMentorProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_MENTOR_PROFILE, {
          method: "GET",
          headers: {
            Authorization: props.token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch mentor profile");
        }

        const data = await response.json();
        setMentor(data.user);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching mentor profile:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMentorProfile();
  }, [props.token]);

  if (loading)
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span> Loading
        profile...
      </div>
    );

  if (error)
    return (
      <div className="p-8 text-red-500">Error loading profile: {error}</div>
    );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Mentor Profile</h1>

      {mentor && (
        <div className="bg-base-200 p-4 rounded-md shadow mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile photo */}
            <div className="flex flex-col items-center">
              {mentor.profilePhoto ? (
                <img
                  src={mentor.profilePhoto}
                  alt="Profile"
                  className="w-40 h-40 object-cover rounded-full border-4 border-[#1b0a5f]"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center border-4 border-[#1b0a5f]">
                  <span className="text-gray-500">No Photo</span>
                </div>
              )}
            </div>

            {/* Profile details */}
            <div className="flex-1">
              <h2 className="text-xl font-bold">
                {mentor.firstName} {mentor.lastName}
              </h2>
              <p className="text-gray-600 mb-2">{mentor.email}</p>

              <h3 className="font-bold mt-4">Bio</h3>
              <p>{mentor.bio || "No bio provided"}</p>

              <h3 className="font-bold mt-4">Interests</h3>
              <p>{mentor.interests || "No interests provided"}</p>

              <h3 className="font-bold mt-4">Question to Ask</h3>
              <p>{mentor.questionToAsk || "No question provided"}</p>

              <h3 className="font-bold mt-4">Project Category</h3>
              <p>{mentor.projectCategory || "No category specified"}</p>
            </div>
          </div>
        </div>
      )}

      {/* Profile Edit Component */}
      <div className="mt-4">
        <MentorProfileEdit token={props.token} />
      </div>
    </div>
  );
};

export default MentorProfile;
