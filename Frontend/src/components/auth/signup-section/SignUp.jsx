import React from "react";
import { useState } from "react";
import { API_REGISTER } from "../../../constants/endpoints";

const SignUp = (props) => {
  // TODO: Create state variables for first name, last name, email, and password using the useState hook.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [guardianEmail, setGuardianEmail] = useState(""); // added by nick
  const [school, setSchool] = useState(""); // added by nick
  const [ageCheck, setAgeCheck] = useState(false); // added by nick
  const [project, setProject] = useState(""); //added by Maddie
  const [interests, setInterests] = useState("");//added by Maddie
  // const [zipcode, setZipcode] = useState("");

  // TODO: Create a function called handleSubmit that will console.log("Click Worked")
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Click Worked");
    signUp();
  }

  // TODO: Create the function for adding user to database
  const signUp = async () => {
    console.log("Sign up function acalled");
    try {
      const requestBody = {
        firstName,
        lastName,
        email,
        password,
        userType: "Mentee", // Explicitly set this
        guardianEmail,
        school,
        ageCheck,
        project,
        interests,
      };
      console.log(requestBody);
      const response = await fetch(API_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log("Signup Response:", data);

      // Handle response
      if (data.token) {
        props.updateToken(data.token);

        // Redirect to mentee dashboard page after registere
        window.location.href = "/mentee"; 
        alert(`You were successfully registered! Welcome, ${firstName}!`);
      } else {
        alert(
          data.message ||
            "Registration failed. Please make sure required fields are filled oout and try again."
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-4">
        <div className="bg-blue-500 w-full max-w-[34.375rem] p-8 rounded-sm flex flex-col justify-center items-center">
          <h2 className="text-center font-bold text-3xl">MENTEE SIGN UP</h2>
          {/* Form Goes Here */}
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            {/* Form Group for First Name */}
            <label className="pb-2 uppercase" htmlFor="firstName">
              First Name:
            </label>

            <input
              className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <label className="pb-2 uppercase" htmlFor="lastName">
              Last Name:
            </label>
            <input
              className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <label className="pb-2 uppercase" htmlFor="email">
              Your Email:
            </label>
            <input
              className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
              type="email"
              name="email"
              id="email"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="pb-2 uppercase" htmlFor="password">
              Password:
            </label>
            <input
              className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Guardian Email field */}
            <label className="pb-2 uppercase" htmlFor="guardianEmail">
              Guardian Email:
            </label>
            <input
              className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
              type="email"
              name="guardianEmail"
              id="guardianEmail"
              placeholder="Guardian Email"
              value={guardianEmail}
              onChange={(e) => setGuardianEmail(e.target.value)}
              // required
            />

            {/* TODO dropdown for Select School */}
            <label className="pb-2 uppercase" htmlFor="school">
              School:
            </label>
            <select
              className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
              name="school"
              id="school"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              required
            >
              <option value="">Please select your school</option>
              <option value="Grace Christian School">
                Grace Christian School
              </option>
              <option value="Mount Anthony Middle High School">
                Mount Anthony Middle High School
              </option>
              <option value="Mount Anthony Union High School">
                Mount Anthony Union High School
              </option>
            </select>
            <label className="pb-2 uppercase" htmlFor="interests">
              Interests:
            </label>
            <input
              className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
              type="text"
              name="interests"
              id="interests"
              placeholder="Interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              // required
            />
            <label className="pb-2 uppercase" htmlFor="project">
              Project: (Must Chose "Video" or "Science")
            </label>
            <input
              className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
              type="text"
              name="project"
              id="project"
              placeholder="Project"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              // required
            />
            {/* TODO checkbox for age verification */}
            {/* Age Check */}
            <div className="flex items-center mb-4">
              <input
                className="mr-2 h-4 w-4"
                type="checkbox"
                name="ageCheck"
                id="ageCheck"
                checked={ageCheck}
                onChange={(e) => setAgeCheck(e.target.checked)}
                required
              />
              <label htmlFor="ageCheck">
                I confirm that I am over 13 years old
              </label>
              
            </div>

            <button
              className="bg-blue-950 rounded-sm text-white py-2 hover:bg-blue-950/50 hover:border-2 hover:border-blue-950"
              type="submit"
            >
              SIGN UP AS A MENTEE
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
