import React, { useState } from "react";
export default function CreateMentor() {
  const [firstName, setFirstName] = useState("Ceporah");
  const [lastName, setLastName] = useState("Wiggins-Mentor2");
  const [email, setEmail] = useState("email-mentor1@test.com");
  const [password, setPassword] = useState("1234");
  const [projectCategory, setProjectCategory] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", { firstName, lastName, email, password });
    createMentor();
    // Reset form fields
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setProjectCategory("");
  }
  async function createMentor() {
    try {
      //Headers
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      // Request Body
      let body = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userType: "Mentor",
        projectCategory: projectCategory,
      });
      // Request Options
      let requestOption = {
        method: "POST",
        headers: headers,
        body: body,
      };
      // Send Request
      let response = await fetch(
        "http://localhost:4000/user/register",
        requestOption
      ); //TODO Use API_LOGIN and import at top of file

      // Response Object
      let data = await response.json();
      // Update Token from the App.jsx file
      console.log(data);
      // Check if the response is ok (status code 200-299)
      if (!response.ok) {
        alert("Mentor Creation Failed! " + data.message);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      alert("Mentor Created Successfully!");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h2>Hello from Create Mentor</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="projectCategory">Project Category:</label>
          <select
            id="projectCategory"
            value={projectCategory}
            onChange={(e) => setProjectCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="video">Video</option>
            <option value="science">Science</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
