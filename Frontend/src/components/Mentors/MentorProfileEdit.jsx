import React, { useState } from "react";
import { API_MENTOR_PROFILE, API_GET_UPLOAD_URL } from "../../constants/endpoints";

const MentorProfileEdit = (props) => {
  // Form state variables
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  const [updatedLastName, setUpdatedLastName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedBio, setUpdatedBio] = useState("");
  // Update Question
  const [updatedQuestionToAsk, setUpdatedQuestionToAsk] = useState("");
  // Image handling 
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");

  // Handle image selection
  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setSelectedImage(file);
      
      // image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      
      // Reset status message
      setUploadStatus("");
    }
  };

  // Upload image to S3
  const uploadImage = async () => {
    if (!selectedImage) {
      setUploadStatus("Please select an image first");
      return;
    }
    
    try {
      setIsUploading(true);
      setUploadStatus("Getting upload URL...");
      
      // Get signed URL from backend
      const response = await fetch(API_GET_UPLOAD_URL, {
        headers: {
          Authorization: props.token
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to get upload URL");
      }
      
      const uploadUrl = await response.json();
      setUploadStatus("Uploading to S3...");
      
      // Upload to S3
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: selectedImage
      });
      
      if (!uploadResponse.ok) {
        throw new Error("Failed to upload to S3");
      }
      
      // Get URL back from s3 and split
      const imageUrl = uploadUrl.split("?")[0];
      setProfilePhotoUrl(imageUrl);
      setUploadStatus("Upload successful!");
      
      return imageUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadStatus("Upload failed: " + error.message);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      console.log("Submmit Clicked");
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);
      console.log(props.token);
     
      // req.body with only updated fields
      const body = {};
      
      if (updatedFirstName) body.firstName = updatedFirstName;
      if (updatedLastName) body.lastName = updatedLastName;
      if (updatedEmail) body.email = updatedEmail;
      if (updatedBio) body.bio = updatedBio;
      if (updatedQuestionToAsk) body.questionToAsk = updatedQuestionToAsk;
      if (profilePhotoUrl) body.profilePhoto = profilePhotoUrl;
      
      // Only submit if at least one field has been updated
      if (Object.keys(body).length === 0) {
        alert("Please update at least one field");
        return;
      }
      
      // Set up request
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: props.token
        },
        body: JSON.stringify(body)
      };
      
      // Send update request
      const response = await fetch(API_MENTOR_PROFILE, requestOptions);
      
      if (!response.ok) {
        throw new Error("Profile update failed");
      }
      
      const data = await response.json();
      
      // Reset form
      setUpdatedFirstName("");
      setUpdatedLastName("");
      setUpdatedEmail("");
      setUpdatedBio("");
      setUpdatedQuestionToAsk("");
      setSelectedImage(null);
      setImagePreview(null);
      setProfilePhotoUrl("");
      
      // Close form and refresh data
      props.setShowForm(false);
      // efresh in dashboard
      if (props.onProfileUpdate) {
        props.onProfileUpdate(); 
      }
      
      alert(data.message || "Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile: " + error.message);
    }
  }

  return (
    <>
      <form className="w-full max-w-5xl bg-sky-50 p-6 rounded-xl mx-auto shadow-lg flex flex-col justify-center items-center">
        <fieldset className="fieldset w-full space-y-4">
          {/* Form to update Profile */}
          <div className="flex flex-col items-center w-full">
            <label className="label-text font-bold text-lg text-center mb-2 mt-2">Update First Name Here:</label>
            <input
              className="input input-bordered bg-white text-black w-full max-w-xl mb-2 mt-2"
              value={updatedFirstName}
              onChange={(e) => setUpdatedFirstName(e.target.value)}
              id="firstNameUpdate"
              name="firstName"
              placeholder={props.mentor.firstName || "Type Here"}
              type="text"
            />
            
            <label className="label-text font-bold text-lg text-center mb-2 mt-2">Update Last Name Here:</label>
            <input
              className="input input-bordered bg-white text-black w-full max-w-xl mb-2 mt-2"
              value={updatedLastName}
              onChange={(e) => setUpdatedLastName(e.target.value)}
              id="lastNameUpdate"
              name="LastName"
              placeholder={props.mentor.lastName || "Type Here"}
              type="text"
            />
            
            <label className="label-text font-bold text-lg text-center mb-2 mt-2">Update Email Here:</label>
            <input
              className="input input-bordered bg-white text-black w-full max-w-xl mb-2 mt-2"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              id="emailUpdate"
              name="email"
              placeholder={props.mentor.email || "Type Here"}
              type="text"
            />
            
            <label className="label-text font-bold text-lg text-center mb-2 mt-2">Update Bio Here:</label>
            <input
              className="input input-bordered bg-white text-black w-full max-w-xl mb-2 mt-2"
              value={updatedBio}
              onChange={(e) => setUpdatedBio(e.target.value)}
              id="bioUpdate"
              name="bio"
              placeholder={props.mentor.bio || "Type Here"}
              type="text"
            />
            
            <label className="label-text font-bold text-lg text-center mt-2 mb-2">
              Update Question To Ask Here:
            </label>
            <input
              value={updatedQuestionToAsk}
              onChange={(e) => setUpdatedQuestionToAsk(e.target.value)}
              id="questionToAskUpdate"
              name="questionToAsk"
              placeholder={props.mentor.questionToAsk || "Type Here"}
              type="text"
              className="input input-bordered bg-white text-black w-full max-w-xl mb-2 mt-2"
            />
            {/* Profile Photo Upload Section */}
            <label className="label-text font-bold text-lg text-center mb-2 mt-4">Upload Profile Photo:</label>
            <div className="flex flex-col items-center w-full max-w-xl pb-6">
              {/* Show image preview (circle) */}
              {imagePreview && (
                <div className="mb-4">
                  <img 
                    src={imagePreview} 
                    alt="Profile Preview" 
                    className="w-32 h-32 object-cover rounded-full"
                  />
                </div>
              )}
              
              {/* file selection */}
              <input
                className="file-input file-input-bordered w-full max-w-xl mb-4"
                onChange={handleImageSelect}
                id="profilePhotoUpdate"
                name="profilePhoto"
                type="file"
                accept="image/*"
              />
              
              {/* Upload button */}
              <button
                type="button"
                onClick={uploadImage}
                disabled={!selectedImage || isUploading}
                className="btn btn-primary mb-2"
              >
                {isUploading ? "Uploading..." : "Upload Photo"}
              </button>
              
              {/* Status message */}
              {uploadStatus && (
                <p className={`text-sm ${uploadStatus.includes("failed") ? "text-red-500" : 
                              uploadStatus.includes("successful") ? "text-green-500" : "text-blue-500"}`}>
                  {uploadStatus}
                </p>
              )}
            </div>
            
            <div className="w-full flex justify-center">
              <button
                type="button"
                className="btn btn-soft btn-primary text-lg mt-4"
                onClick={handleSubmit}
              >
                Update Profile
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default MentorProfileEdit;