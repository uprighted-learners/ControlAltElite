import React, { useState } from "react";
import SignupButton from "../../custom/SignupButton";
import { API_LOGIN } from "../../../constants/endpoints";

const Login = (props) => {
  const [email, setEmail] = useState("student@example.com");
  const [password, setPassword] = useState("password123");

  function handleSubmit(e) {
    e.preventDefault();
    login();
  }

  async function login() {
    try {
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      // Request Body
      let body = {
        email: email,
        password: password,
      };

      // Request Options
      let requestOption = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      // Send Request
      const response = await fetch(API_LOGIN, requestOption);

      // Response Object
      let data = await response.json();

      // Update Token from the App.jsx file
      console.log(data);
      props.updateToken(data.token);
      

      // Redirect to the profile Page
      if (response.ok) {
        props.updateToken(data.token); // Store token

        //route to userType login
        if (data.user.userType === "Mentor") {
          window.location.href = "/mentor"; // Redirect to mentor page
          alert(`Login Successful! as ${data.user.userType}`); // Show success message
        } else {
          // window.location.href = "/mentee"; // Redirect to mentee page
          alert(`Login Successful! as ${data.user.userType}`); // Show success message
        }
      } else {
        alert("Login Failed! Check your email and password."); // Show error
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 h-[80vh]">
        <div className="bg-blue-500 w-full max-w-[34.375rem] max-h-fit rounded-sm">
          <div className="p-5 rounded-sm flex flex-col justify-center">
            <h2 className="text-center p-4 text-white uppercase text-4xl">login</h2>
            {/* Form Goes Here */}
            <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
              {/* Form Group for Email */}
                <label className="uppercase pb-2" htmlFor="email">Email:</label>
                {/* Add a value and assign it to email (read only), onChange function to update the state */}
                <input className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="loginemail"
                  name="email"
                  placeholder="Enter Email"
                  type="email"
                />
              {/* Form Group End Email */}
              {/* ----------------------------- */}
              {/* Form Group for Password */}
                <label className="uppercase pb-2" htmlFor="Password">Password:</label>
                {/* Add a value and assign it to password (read only), onChange function to update the state */}
                <input className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="loginpassword"
                  name="password"
                  placeholder="Enter Password"
                  type="password"
                />
              {/* Form Group End Password */}
              {/* Button Here */}
              <button onClick={handleSubmit} className="bg-blue-950 rounded-sm text-white py-2 hover:bg-blue-950/50 hover:border-2 hover:border-blue-950 mb-2" type="submit">SIGN UP</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
