import React, { useState, useRef } from "react";

const ProfilePhotoUpload = (props) => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  // Handle file selection - triggered when hidden input changes
  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setErrorMessage("");
    }
  };

  // Trigger the hidden file input when select button is clicked
  const handleSelectButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle image upload to S3
  const handleUpload = async () => {
    if (!file) {
      setErrorMessage("You must select an image file first");
      return;
    }

    try {
      setIsUploading(true);

      // 1. Get the image URL
      const response = await fetch("/geturl");
      const url = await response.json();

      // 2. Upload image to S3 server
      await fetch(url, {
        method: "PUT",
        body: file,
      });

      // 3. Split and take useful part of URL
      const imageUrl = url.split("?")[0];

      // 4. Tell parent component about successful upload
      props.onPhotoSaved(imageUrl);

      // 5. Reset file input after successful upload
      setFile(null);
      setFileName("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Error uploading image:", error);
      setErrorMessage("There was a problem uploading your image");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full mt-4">
      <label className="label-text font-bold">Profile Photo:</label>
      
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        id="photoInput"
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
      
      {/* File selection button */}
      <div className="flex items-center mt-2">
        <button
          type="button"
          onClick={handleSelectButtonClick}
          className="btn btn-outline btn-primary"
        >
          Select Image
        </button>
        {fileName && (
          <span className="ml-2 text-sm truncate max-w-xs">{fileName}</span>
        )}
      </div>
      
      {/* Upload button - positioned below file selection */}
      <div className="mt-2">
        <button
          type="button"
          onClick={handleUpload}
          disabled={!file || isUploading}
          className="btn btn-primary w-full"
        >
          {isUploading ? "Uploading..." : "Upload Photo"}
        </button>
      </div>
      
      {errorMessage && <p className="text-red-500 mt-1">{errorMessage}</p>}
    </div>
  );
};

export default ProfilePhotoUpload;