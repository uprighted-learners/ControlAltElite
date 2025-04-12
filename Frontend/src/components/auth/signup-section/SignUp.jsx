import React from "react";
import { useState } from "react";
import { API_REGISTER } from "../../../constants/endpoints";
import { Form, FormGroup, Input, Label } from "reactstrap";
import SignupButton from "../../custom/SignupButton";

const SignUp = (props) => {
  // TODO: Create state variables for first name, last name, email, and password using the useState hook.
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [zipcode, setZipcode] = useState("");

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
        zipcode,
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
      <div
        className="d-flex justify-content-center mt-5"
        style={{ height: "85vh" }}
      >
        <div
          className="secondary-background p-5 rounded"
          style={{ width: "450px", height: "530px" }}
        >
          <h2 className="text-center font-primary bold">SIGN UP FORM</h2>
          {/* Form Goes Here */}
          <Form onSubmit={handleSubmit}>
            {/* Form Group for First Name */}
            <FormGroup>
              <Label for="firstName">First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormGroup>

            {/* Form Group for Last Name */}
            <FormGroup>
              <Label for="lastName">Last Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormGroup>

            {/* Form Group for Email */}
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            {/* Form Group Zipcode */}

            <FormGroup>
              <Label for="zipcode">Zipcode</Label>
              <Input
                type="zipcode"
                name="zipcode"
                id="zipcode"
                placeholder="Enter zipcode"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </FormGroup>
            {/* Form Group for Password */}
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>

            <SignupButton type="submit">SIGN UP</SignupButton>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
