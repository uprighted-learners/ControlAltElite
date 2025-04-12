import React, { useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
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
            alert("Login Successful!"); // Show success message
            window.location.href = "/"; // Redirect to index page
          } else {
            alert("Login Failed! Check your email and password."); // Show error
          }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <>
      <div
        className="d-flex justify-content-center mt-5"
        style={{ height: "50vh", marginTop: "50vh" }}
      >
        <div
          className="secondary-background p-5 rounded"
          style={{ width: "450px", height: "530px" }}
        >
          <h2 className="text-center font-primary bold">LOGIN FORM</h2>
          {/* Form Goes Here */}
          <Form onSubmit={handleSubmit}>
            {/* Form Group for Email */}
            <FormGroup>
              <Label for="email">Email</Label>
              {/* Add a value and assign it to email (read only), onChange function to update the state */}
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="loginemail"
                name="email"
                placeholder="Enter Email"
                type="email"
              />
            </FormGroup>

            {/* Form Group End Email */}
            {/* ----------------------------- */}
            {/* Form Group for Password */}
            <FormGroup>
              <Label for="Password">Password</Label>
              {/* Add a value and assign it to password (read only), onChange function to update the state */}
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="loginpassword"
                name="password"
                placeholder="Enter Password"
                type="password"
              />
            </FormGroup>
            {/* Form Group End Password */}

            {/* Button Here */}
            <SignupButton onClick={handleSubmit}>LOGIN</SignupButton>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
