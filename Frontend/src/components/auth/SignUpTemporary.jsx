import React, { useState } from "react";
// TODO import API_SIGNUP route

const API_SIGNUP = "http://localhost:400/user/register"

// ! Remember to remove prefilled defaults (like pwd123)

const SignUp = (props) => {
  //
  // state variable for first name
  const [firstName, setFirstName] = useState("John");
  // state variable for last name
  const [lastName, setLastName] = useState("Smith");
  // state variable for email
  const [email, setEmail] = useState("john@test.com");
  // state variable for password
  const [password, setPassword] = useState("pwd123");
  // state variable for user type (mentee/mentor)
  const [userType, setUserType] = useState("Mentee");
  // state variable for interests
  const [interests, setInterests] = useState("swimming");

  function handleSubmit(e) {
    e.preventDefault();
    signup();
  }

  // Signup function
  async function signup() {
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // Request Body
      let body = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userType: userType,
        interests: interests,
      };
      // Request Options
      let requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };
      // Send Request
      // TODO need to import/link API SIGNUP from endpoints once created
      let response = await fetch(API_SIGNUP, requestOption);
      let data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
        <legend className="fieldset-legend">Sign Up</legend>

        <label className="fieldset-label">First Name</label>
        <input
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          type="text"
          className="input"
          placeholder="First Name"
        />

        <label className="fieldset-label">Last Name</label>
        <input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          type="text"
          className="input"
          placeholder="Last Name"
        />

        <label className="fieldset-label">Email</label>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          className="input"
          placeholder="Email"
        />

        <label className="fieldset-label">Password</label>
        <input
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          className="input"
          placeholder="Password"
        />

        <label className="fieldset-label">Are you a mentor or mentee?</label>
        <label>
          <input
            type="radio"
            name="userType"
            value="Mentor"
            checked={userType === "Mentor"}
            onChange={(e) => setUserType(e.target.value)}
            className="radio"
          />
          Mentor
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="Mentee"
            checked={userType === "Mentee"}
            onChange={(e) => setUserType(e.target.value)}
            className="radio"
          />
          Mentee
        </label>

        <label className="fieldset-label">Interests</label>
        <input
          value={interests}
          onChange={(e) => {
            setInterests(e.target.value);
          }}
          type="text"
          className="input"
          placeholder="Interests"
        />

        <button onClick={handleSubmit} className="btn btn-neutral mt-4">Sign Up</button>
      </fieldset>
    </>
  );
};

export default SignUp;
