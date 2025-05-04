// ProfilePhotoUpload.jsx
import React, { useState } from "react";
import { API } from "../../constants/endpoints";

const ProfilePhotoUpload = ({ token, onPhotoUpload, currentPhoto }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentPhoto || "");
  const [uploadError, setUploadError] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // Reset error state
    setUploadError("");
    
    if (file) {
      setSelectedFile(file);
      
      // Create a preview URL for the image
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(file);
    }
  };

  // Handle the upload to S3
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Select an image file first");
      return;
    }

    try {
      setIsUploading(true);
      setUploadError("");

      // Step 1: Get URL from backend
      const urlResponse = await fetch(`${API}/geturl`, {
        method: "GET",
        headers: {
          Authorization: token,
        }
      });

      if (!urlResponse.ok) {
        throw new Error("Failed to get upload URL");
      }

      const url = await urlResponse.json();
      
      // Step 2: Upload directly to S3 using the signed URL
      const uploadResponse = await fetch(url, {
        method: "PUT",
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload to S3");
      }

      // Step 3: Get the URL back from s3 and trim
      const imageURL = url.split("?")[0];
      
      // Step 4: update when succesful upload happens
      onPhotoUpload(imageURL);
      
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Failed to upload image. Please try again.");
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4 p-4 border-2 border-dashed border-[#1b0a5f] rounded-md">
      <h3 className="text-lg font-bold mb-4">Profile Photo</h3>
      
      {/* image preview (circle)*/}
      {previewUrl && (
        <div className="mb-4">
          <img 
            src={previewUrl} 
            alt="Profile preview" 
            className="w-32 h-32 object-cover rounded-full border-2 border-[#1b0a5f]"
          />
        </div>
      )}
      
      {/* file selection */}
      <div className="flex flex-col items-center w-full">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="file-input file-input-bordered w-full max-w-xs mb-4"
        />
        
        {/* Upload button */}
        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className={`btn ${isUploading ? 'loading' : ''} btn-primary w-full max-w-xs`}
        >
          {isUploading ? "Uploading..." : "Upload Photo"}
        </button>
        
        {/* Error message */}
        {uploadError && (
          <div className="text-red-500 mt-2">{uploadError}</div>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;