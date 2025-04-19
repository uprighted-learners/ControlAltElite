import React, { useState } from "react";
import { useFetcher } from "react-router-dom";
import { API_MENTEE_PROFILE } from "../../constants/endpoints";

const MenteeProfileEdit = (props) => {
  // Age
  const [updatedAge, setUpdatedAge] = useState("");
  // Interests
  const [updatedInterests, setUpdatedInterests] = useState("");
  // School
  const [updatedSchool, setUpdatedSchool] = useState("");
  // Guardian Email
  const [updatedGuardianEmail, setUpdatedGuardianEmail] = useState("");

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
        updatedAge,
        updatedInterests,
        updatedSchool,
        updatedGuardianEmail,
      };
      console.log(body);

      //   Request Options
      let requestOption = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      // Send Request
      let response = await fetch(`${API_MENTEE_PROFILE}`, requestOption);

      // Clear input
      setUpdatedAge("");
      setUpdatedInterests("");
      setUpdatedSchool("");
      setUpdatedGuardianEmail("");
      //Toggles update form
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
      {/* <h1> Hello from MenteeProfileEdit </h1> */}
      {/* Toggle button */}
      <button
        className="btn btn-outline"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Update"}
      </button>
      {/* Only shows update input box if the button (above) is clicked */}
      {showForm && (
        <form className="w-xs bg-base-200 border border-base-300 p-4 rounded-box">
          <fieldset className="fieldset">
            {/* Form to update Profile */}

            <label className="label-text">Update Age Here:</label>
            <input
              className="input input-bordered bg-white text-black"
              value={updatedAge}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedAge(e.target.value);
              }}
              id="ageUpdate"
              name="age"
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
            <label className="label-text mt-4">Update School Here:</label>
            <input
              value={updatedSchool}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedSchool(e.target.value);
              }}
              id="schoolToUpdate"
              name="school"
              placeholder="Type Here"
              type="text"
              className="input input-bordered  bg-white text-black"
            />
            <label className="label-text mt-4">
              Update Guardian Email Here:
            </label>
            <input
              value={updatedGuardianEmail}
              onChange={(e) => {
                console.log(e.target.value);
                setUpdatedGuardianEmail(e.target.value);
              }}
              id="guardianEmailToUpdate"
              name="guardianEmail"
              placeholder="Type Here"
              type="text"
              className="input input-bordered  bg-white text-black"
            />
            <button
              className="btn mt-4 btn-soft btn-primary"
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

export default MenteeProfileEdit;
