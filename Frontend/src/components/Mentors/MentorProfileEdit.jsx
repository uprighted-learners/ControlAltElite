import React, { useState } from "react";
import { API_MENTOR_PROFILE } from "../../constants/endpoints";

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
  // const [updatedProfilePhoto, setUpdatedProfilePhoto] = useState("");
  // Update Question
  const [updatedQuestionToAsk, setUpdatedQuestionToAsk] = useState("");

  // Toggle for update form
  // const [showForm, setShowForm] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      console.log("Submmit Clicked");
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
        // profilePhoto: updatedProfilePhoto,
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
      //  Clear input box
      setUpdatedFirstName("");
      setUpdatedLastName("");
      setUpdatedEmail("");
      // setUpdatedProfilePhoto("");
      setUpdatedBio("");
      setUpdatedQuestionToAsk("");
      // Toggles whether the update form is shown
      props.setShowForm(false);
      //Fetch mentor data
      props.fetchMentorData();
      // Response Object
      console.log("Token:", props.token);
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      
        <form
          // onSubmit={handleSubmit}
          className="w-full max-w-5xl bg-sky-50 p-6 rounded-xl mx-auto shadow-lg flex flex-col justify-center items-center"
        >
          <fieldset className="fieldset w-full space-y-4">
            {/* Form to update Profile */}
            <div className="flex flex-col items-center w-full">
            <label className="label-text font-bold text-lg text-center mb-2 mt-2">Update First Name Here:</label>
            <input
              className="input input-bordered bg-white text-black w-full max-w-xl mb-2 mt-2"
              value={updatedFirstName}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedFirstName(e.target.value);
              }}
              id="firstNameUpdate"
              name="firstName"
              placeholder="Type Here"
              type="text"
            />
            <label className="label-text font-bold text-lg text-center mb-2 mt-2">Update Last Name Here:</label>
            <input
              className="input input-bordered bg-white text-black w-full max-w-xl mb-2 mt-2"
              value={updatedLastName}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedLastName(e.target.value);
              }}
              id="lastNameUpdate"
              name="LastName"
              placeholder="Type Here"
              type="text"
            />
            <label className="label-text font-bold text-lg text-center mb-2 mt-2">Update Email Here:</label>
            <input
              className="input input-bordered bg-white text-black w-full max-w-xl mb-2 mt-2"
              value={updatedEmail}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedEmail(e.target.value);
              }}
              id="emailUpdate"
              name="email"
              placeholder="Type Here"
              type="text"
            />
            <label className="label-text font-bold text-lg text-center mb-2 mt-2">Update Bio Here:</label>
            <input
              className="input input-bordered bg-white text-black w-full max-w-xl mb-2 mt-2"
              value={updatedBio}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedBio(e.target.value);
              }}
              id="bioUpdate"
              name="bio"
              placeholder="Type Here"
              type="text"
            />
            {/* <label className="label-text mt-4">Update Profile Photo Here:</label>
            <input
              className="input input-bordered  bg-white text-black"
              value={updatedProfilePhoto}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedProfilePhoto(e.target.value);
              }}
              id="emailUpdate"
              name="Email"
              placeholder="Type Here"
              type="text"
            /> */}
            <label className="label-text font-bold text-lg text-center mt-2 mb-2">
              Update Question To Ask Here:
            </label>
            <input
              value={updatedQuestionToAsk}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedQuestionToAsk(e.target.value);
              }}
              id="questionToAskUpdate"
              name="questionToAsk"
              placeholder="Type Here"
              type="text"
              className="input input-bordered bg-white text-black w-full max-w-xl mb-2 mt-2"
            />
            <div className="w-full flex justify-center">
            <button
              className="btn btn-soft btn-primary text-lg mt-4"
              onClick={handleSubmit}
            >
              Update
            </button>
            </div></div>
          </fieldset>
        </form>

    </>
  );
};

export default MentorProfileEdit;
