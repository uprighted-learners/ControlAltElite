import React from "react";
import { useState } from "react";
import { API_REGISTER } from "../../../constants/endpoints";

const SignUp = (props) => {
  // TODO: Create state variables for first name, last name, email, and password using the useState hook.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center p-4">
        <div className="bg-blue-500 w-full max-w-[34.375rem] p-8 rounded-sm flex flex-col justify-center items-center">
          <h2 className="text-center font-bold text-3xl">SIGN UP</h2>
          {/* Form Goes Here */}
          <form className="flex flex-col w-full" onSubmit={handleSubmit}>
            {/* Form Group for First Name */}
            <label className="pb-2 uppercase" htmlFor="firstName">
              First Name:
            </label>
            <input className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4" type="text" name="firstName" id="firstName" placeholder="First Name..." value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
            <label className="pb-2 uppercase" htmlFor="lastName">
              Last Name:
            </label>
            <input className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4" type="text" name="lastName" id="lastName" placeholder="Last Name..." value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
            <label className="pb-2 uppercase" htmlFor="email">
              Email:
            </label>
            <input className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4" type="email" name="email" id="email" placeholder="Email..." value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            <label className="pb-2 uppercase" htmlFor="password">
              Password:
            </label>
            <input className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4" type="password" name="password" id="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
            <button className="bg-blue-950 rounded-sm text-white py-2 hover:bg-blue-950/50 hover:border-2 hover:border-blue-950" type="submit">
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
