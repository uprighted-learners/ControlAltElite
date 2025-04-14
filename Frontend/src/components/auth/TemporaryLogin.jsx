import React, { useState } from "react";
import LoginButton from "../common/TemporaryLoginButton"
import { API_LOGIN } from "../../services/endpoints";

const Login = (props) => {
  // State Variables
  const [email, setEmail] = useState("test@test.com");
  const [password, setPassword] = useState("p1234");

  function handleSubmit(e) {
    e.preventDefault();
    login();
  }

  // login function
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
        //Send Request
        let response = await fetch(API_LOGIN, requestOption);
        // Response Object
        let data = await response.json();
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <Form>
        {/* Form Group for Email */}
        <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input 
            value={email}
            onChange={(e) => {
                setEmail(e.target.value);
            }}
            id="email"
            name="email"
            placeholder="Enter Email"
            type="email"
            />
        </FormGroup>

        {/* Form Group for Password */}
        <FormGroup>
            <Label for="Password">Password</Label>
            <Input 
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
            }}
            id="examplePassword"
            name="password"
            placeholder="password placeholder"
            type="password"
            />
        </FormGroup>
        {/* Login Button Here */}
        <LoginButton onClick={handleSubmit}>LOGIN</LoginButton>

    </Form>
  )
};

export default Login;