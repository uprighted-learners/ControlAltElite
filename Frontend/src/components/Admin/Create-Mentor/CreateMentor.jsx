import React, { useState } from "react";

export default function CreateMentor() {
  const [firstName, setFirstName] = useState("Ceporah");
  const [lastName, setLastName] = useState("Wiggins-Mentor2");
  const [email, setEmail] = useState("email-mentor1@test.com");
  const [projectCategory, setProjectCategory] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted:", { firstName, lastName, email, password });
    createMentor();
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setProjectCategory("");
  }

  async function createMentor() {
    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");

      let body = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userType: "Mentor",
        projectCategory: projectCategory,
      });

      let requestOption = {
        method: "POST",
        headers: headers,
        body: body,
      };

      let response = await fetch(
        "http://localhost:4000/user/register",
        requestOption
      );

      let data = await response.json();
      console.log(data);

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
    <div className="min-h-screen bg-[#1b0a5f] flex items-center justify-center">
      <div className="bg-[#c6ccbff] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[#eab246] mb-6">
          Create Mentor
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-[#1b0a5f]"
            >
              First Name:
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-[#6c50e1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6c50e1]"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-[#1b0a5f]"
            >
              Last Name:
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-[#6c50e1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6c50e1]"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#1b0a5f]"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-[#6c50e1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6c50e1]"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#1b0a5f]"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-[#6c50e1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6c50e1]"
            />
          </div>
          <div>
            <label
              htmlFor="projectCategory"
              className="block text-sm font-medium text-[#1b0a5f]"
            >
              Project Category:
            </label>
            <select
              id="projectCategory"
              value={projectCategory}
              onChange={(e) => setProjectCategory(e.target.value)}
              required
              className="w-full mt-1 p-2 border border-[#6c50e1] rounded-md focus:outline-none focus:ring-2 focus:ring-[#6c50e1]"
            >
              <option value="">Select a category</option>
              <option value="video">Video</option>
              <option value="science">Science</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-[#eab246] text-[#1b0a5f] font-bold py-2 px-4 rounded-md hover:bg-[#6c50e1] hover:text-white transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}