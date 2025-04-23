import React, { useState } from "react";
import { API_MENTOR_PROFILE } from "../../constants/endpoints";

const MentorProfileEdit = (props) => {
  // Update First Name
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  // Update Last Name
  const [updatedLastName, setUpdatedLastName] = useState();
  // Update Email
  const [updatedEmail, setUpdatedEmail] = useState("");
  // Update Bio
  const [updatedBio, setUpdatedBio] = useState("");
  // Update Profile Photo
  // const [updatedProfilePhoto, setUpdatedProfilePhoto] = useState("");
  // Update Question
  const [updatedQuestionToAsk, setUpdatedQuestionToAsk] = useState("");

  // Toggle for update form
  const [showForm, setShowForm] = useState(false);

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
      setShowForm(false);
      // Response Object
      let data = await response.json();
      console.log(data);
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
          // onSubmit={handleSubmit}
          className="w-xs bg-base-200 border border-base-300 p-4 rounded-box " class="flex flex-col justify-center items-center"
        >
          <fieldset className="fieldset">
            {/* Form to update Profile */}

            <label className="label-text font-bold">Update First Name Here:</label>
            <input
              className="input input-bordered bg-white text-black"
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
            <label className="label-text font-bold">Update Last Name Here:</label>
            <input
              className="input input-bordered bg-white text-black"
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
            <label className="label-text font-bold">Update Email Here:</label>
            <input
              className="input input-bordered bg-white text-black"
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
            <label className="label-text font-bold">
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
              className="input input-bordered  bg-white text-black"
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
