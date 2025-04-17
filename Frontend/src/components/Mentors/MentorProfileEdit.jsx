import React, { useState } from "react";
import { API_MENTOR_PROFILE } from "../../constants/endpoints";

const MentorProfileEdit = (props) => {
  // Update Bio
  const [updatedBio, setUpdatedBio] = useState("");
  // Update Interests
  const [updatedInterests, setUpdatedInterests] = useState("");
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
        updatedBio,
        updatedInterests,
        updatedQuestionToAsk,
        
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
      setUpdatedBio("");
      setUpdatedInterests("");
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
        className="btn btn-outline"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Update"}
      </button>
      {/* Only shows update input box if the button (above) is clicked */}
      {showForm && (
        <form
          // onSubmit={handleSubmit}
          className="w-xs bg-base-200 border border-base-300 p-4 rounded-box"
        >
          <fieldset className="fieldset" >
            {/* Form to update Profile */}

            <label className="label-text">Update Bio Here:</label>
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
            <label className="label-text mt-4">Update Interests Here:</label>
            <input
              className="input input-bordered  bg-white text-black"
              value={updatedInterests}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedInterests(e.target.value);
              }}
              id="interestUpdate"
              name="interests"
              placeholder="Type Here"
              type="text"
            />
            <label className="label-text mt-4">
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
            <button className="btn mt-4 btn-soft btn-primary" onClick={handleSubmit}>
              Update
            </button>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default MentorProfileEdit;
