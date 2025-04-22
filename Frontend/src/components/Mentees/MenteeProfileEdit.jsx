import React, { useState } from "react";
import { useFetcher } from "react-router-dom";
import { API_MENTEE_PROFILE } from "../../constants/endpoints";

const MenteeProfileEdit = (props) => {
  // First Name
  const [updatedFirstName, setUpdatedFirstName] = useState("");
  // Last Name
  const [updatedLastName, setUpdatedLastName] = useState("");
  // Email
  const [updatedEmail, setUpdatedEmail] = useState("");
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
        firstName: updatedFirstName,
        lastName: updatedLastName,
        email: updatedEmail,
        guardianEmail: updatedGuardianEmail,
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
      setUpdatedFirstName("");
      setUpdatedLastName("");
      setUpdatedEmail("");
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
        <form className="card bg-base-200 shadow-md p-6 max-w-md">
          <fieldset className="form-control gap-4">
            <label className="label">
              <span className="label-text">First Name</span>
            </label>
            <input
              className="input input-bordered"
              value={updatedFirstName}
              onChange={(e) => setUpdatedFirstName(e.target.value)}
              type="text"
              placeholder="Type here"
            />
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              className="input input-bordered"
              value={updatedLastName}
              onChange={(e) => setUpdatedLastName(e.target.value)}
              type="text"
              placeholder="Type here"
            />
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered"
              value={updatedEmail}
              onChange={(e) => setUpdatedEmail(e.target.value)}
              type="email"
              placeholder="Type here"
            />
            <label className="label">
              <span className="label-text">Guardian Email</span>
            </label>
            <input
              className="input input-bordered"
              value={updatedGuardianEmail}
              onChange={(e) => setUpdatedGuardianEmail(e.target.value)}
              type="email"
              placeholder="Type here"
            />
            <button className="btn btn-primary mt-4" onClick={handleSubmit}>
              Update
            </button>
          </fieldset>
        </form>
      )}
    </>
  );
};

export default MenteeProfileEdit;
