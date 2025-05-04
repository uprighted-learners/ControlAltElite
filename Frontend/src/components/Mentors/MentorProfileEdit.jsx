import React, { useState } from "react";
import { API_MENTOR_PROFILE, API } from "../../constants/endpoints";

const MentorProfileEdit = (props) => {
  // Update First Name
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  // Update Last Name
  const [updatedLastName, setUpdatedLastName] = useState("");
  // Update Email
  const [updatedEmail, setUpdatedEmail] = useState("");
  // Update Bio
  const [updatedBio, setUpdatedBio] = useState("");
  // Update Profile Photo
  const [updatedProfilePhoto, setUpdatedProfilePhoto] = useState("");
  // Update Question
  const [updatedQuestionToAsk, setUpdatedQuestionToAsk] = useState("");

  // Toggle for update form
  const [showForm, setShowForm] = useState(false);
  
  // State for file upload
  const [photoFile, setPhotoFile] = useState(null);
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Handle file selection
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhotoUploadError("");
    
    if (file) {
      setPhotoFile(file);
      
      // Clear previous uploaded photo URL when selecting a new file
      setUpdatedProfilePhoto("");
      
      // Create a preview URL for the image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Handle photo upload to S3
  const uploadPhotoToS3 = async () => {
    if (!photoFile) {
      setPhotoUploadError("Please select a photo first");
      return;
    }

    try {
      setIsPhotoUploading(true);
      setPhotoUploadError("");

      // Step 1: Get signed URL from your backend
      const urlResponse = await fetch(`${API}/geturl`, {
        method: "GET",
        headers: {
          Authorization: props.token,
        }
      });

      if (!urlResponse.ok) {
        throw new Error("Couldn't get upload link");
      }

      const uploadUrl = await urlResponse.json();
      
      // Step 2: Upload directly to S3 using the signed URL
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: photoFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("Photo upload failed");
      }

      // Step 3: Get the permanent URL for the image (removing the query parameters)
      const photoUrl = uploadUrl.split("?")[0];
      
      // Update the profile photo state
      setUpdatedProfilePhoto(photoUrl);
      
      setIsPhotoUploading(false);
    } catch (error) {
      console.error("Upload error:", error);
      setPhotoUploadError("Couldn't upload photo. Try again.");
      setIsPhotoUploading(false);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("Submit Clicked");
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // Add an authorization to the headers if you need a token for that route
      myHeaders.append("Authorization", props.token);
      console.log(props.token);
      // Request Body
      let body = {
        firstName: updatedFirstName,
        lastName: updatedLastName,
        email: updatedEmail,
        bio: updatedBio,
        profilePhoto: updatedProfilePhoto,  // Using the updated profile photo URL
        questionToAsk: updatedQuestionToAsk,
      };
      console.log(body);

      //   Request Options
      let requestOption = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
     // Send Request
     let response = await fetch(`${API_MENTOR_PROFILE}`, requestOption);
    
     // Clear all form state
     setUpdatedFirstName("");
     setUpdatedLastName("");
     setUpdatedEmail("");
     setUpdatedProfilePhoto("");
     setPreviewImage("");
     setPhotoFile(null);
     setUpdatedBio("");
     setUpdatedQuestionToAsk("");
     setShowForm(false);
     
     // Response Object
     let data = await response.json();
     console.log(data);
     
     // Refresh the page 
     window.location.reload();
     
   } catch (error) {
     console.log(error);
   }
 }

  return (
    <>
      {/* Toggle button */}
      <button
        className="btn btn-outline mt-2 btn-soft btn-primary"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Update"}
      </button>
      {/* Only shows update input box if the button (above) is clicked */}
      {showForm && (
        <form
          className="w-xs bg-base-200 border border-base-300 p-4 rounded-box flex flex-col justify-center items-center"
        >
          <fieldset className="fieldset">
            {/* Form to update Profile */}

            <label className="label-text font-bold">Update First Name:</label>
            <input
              className="input input-bordered bg-white text-black"
              value={updatedFirstName}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedFirstName(e.target.value);
              }}
              id="firstNameUpdate"
              name="firstName"
              placeholder={props.mentorInfo.firstName || "Type Here"}
              type="text"
            />
            <label className="label-text font-bold">Update Last Name:</label>
            <input
              className="input input-bordered bg-white text-black"
              value={updatedLastName}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedLastName(e.target.value);
              }}
              id="lastNameUpdate"
              name="LastName"
              placeholder={props.mentorInfo.lastName || "Type Here"}
              type="text"
            />
            <label className="label-text font-bold">Update Email:</label>
            <input
              className="input input-bordered bg-white text-black"
              value={updatedEmail}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedEmail(e.target.value);
              }}
              id="emailUpdate"
              name="email"
              placeholder={props.mentorInfo.email || "Type Here"}
              type="text"
            />
            <label className="label-text font-bold">Update Bio Here:</label>
            <input
              className="input input-bordered bg-white text-black"
              value={updatedBio}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedBio(e.target.value);
              }}
              id="bioUpdate"
              name="bio"
              placeholder={props.mentorInfo.bio || "Type Here"}
              type="text"
            />
            
            {/* Profile Photo Upload Section */}
            <div className="mt-4 mb-4">
              <label className="label-text font-bold">Update Profile Photo:</label>
              <div className="flex flex-col items-center p-4 ">
                {/* Preview the image before uploading */}
                {(previewImage || updatedProfilePhoto) && (
                  <div className="mb-4">
                    <img 
                      src={previewImage || updatedProfilePhoto} 
                      alt="Profile preview" 
                      className="w-32 h-32 object-cover rounded-full border-2 border-[#1b0a5f]"
                    />
                  </div>
                )}
                
                {/* File select */}
                <div className="flex flex-col items-center w-full">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="file-input file-input-bordered w-full max-w-xs mb-4"
                  />
                  
                  {/* Upload photo button */}
                  <button
                    type="button"
                    onClick={uploadPhotoToS3}
                    disabled={!photoFile || isPhotoUploading}
                    className={`btn ${isPhotoUploading ? 'loading' : ''} btn-primary w-full max-w-xs mb-2`}
                  >
                    {isPhotoUploading ? "Uploading..." : "Upload Photo"}
                  </button>
                  
                  {/* Error message */}
                  {photoUploadError && (
                    <div className="text-red-500 mb-2">{photoUploadError}</div>
                  )}
                  
                  {/* Success message */}
                  {updatedProfilePhoto && !photoUploadError && (
                    <div className="text-green-500 mb-2">Photo uploaded successfully!</div>
                  )}
                </div>
              </div>
            </div>
            
            <label className="label-text font-bold">
              Update Question To Ask:
            </label>
            <input
              value={updatedQuestionToAsk}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedQuestionToAsk(e.target.value);
              }}
              id="questionToAskUpdate"
              name="questionToAsk"
              placeholder={props.mentorInfo.questionToAsk || "Type Here"}
              type="text"
              className="input input-bordered bg-white text-black"
            />
            <button
              className="btn mt-2 btn-soft btn-primary"
              onClick={handleSubmit}
            >
              Update
            </button>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default MentorProfileEdit;