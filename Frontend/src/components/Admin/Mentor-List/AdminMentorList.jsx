import React, { useState, useEffect } from "react";
import {
  API_DELETE_MENTOR,
  API_REGISTER,
  API_VIEW_MENTORS,
} from "../../../constants/endpoints";
const AdminMentorList = (props) => {
  const [mentors, setMentors] = useState([]);
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

  useEffect(() => {
    fetchMentors();
  }, []);
  async function fetchMentors() {
    try {
      const response = await fetch(API_VIEW_MENTORS);
      const data = await response.json();
      setMentors(data.mentors);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  }

  function handleUpdate(mentorId) {
    console.log(`Update mentor with ID: ${mentorId}`);
  }

  async function handleDelete(mentorId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mentor?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_DELETE_MENTOR}/${mentorId}`, {
          method: "DELETE",
          headers: {
            Authorization: `${props.token}`,
          },
        });
        if (response.ok) {
          fetchMentors(); // Refresh the list after deletion
          console.log(`Mentor with ID: ${mentorId} deleted successfully.`);
        } else {
          console.error("Failed to delete mentor.");
        }
      } catch (error) {
        console.error("Error deleting mentor:", error);
      }
    }
  }
  return (
    <>
    <div className="container mx-auto p-4">
  <h1 className="text-4xl text-center py-4 uppercase">Mentor List</h1>
  <div className="overflow-x-auto">
    <table className="w-full bg-white rounded-sm">
      <thead>
        <tr className="text-left text-black">
          <th className="px-4 border-2 border-[#1b0a5f] text-black p-4">ID:</th>
          <th className="px-4 border-2 border-[#1b0a5f] text-black p-4">First Name:</th>
          <th className="px-4 border-2 border-[#1b0a5f] text-black p-4">Last Name:</th>
          <th className="px-4 border-2 border-[#1b0a5f] text-black p-4">Email:</th>
          <th className="px-4 border-2 border-[#1b0a5f] text-black p-4">Project Category:</th>
          <th className="px-4 border-2 border-[#1b0a5f] text-black p-4">Actions:</th>
        </tr>
      </thead>
      <tbody>
        {mentors.map((mentor) => (
          <tr key={mentor.id} className="hover:bg-gray-100">
            <td className="px-4 border-2 border-[#1b0a5f] text-black p-4">{mentor.id}</td>
            <td className="px-4 border-2 border-[#1b0a5f] text-black p-4">{mentor.firstName}</td>
            <td className="px-4 border-2 border-[#1b0a5f] text-black p-4">{mentor.lastName}</td>
            <td className="px-4 border-2 border-[#1b0a5f] text-black p-4">{mentor.email}</td>
            <td className="px-4 border-2 border-[#1b0a5f] text-black p-4">{mentor.projectCategory || "N/A"}</td>
            <td className="px-4 border-2 border-[#1b0a5f] text-black p-4">
              <div className="flex flex-col md:flex-row gap-2">
              <button className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition" onClick={() => handleAdd()}>Add</button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
                  onClick={() => handleUpdate(mentor.id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleDelete(mentor.id)}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
<div className="container mx-auto p-4">
  <div className="bg-blue-500 w-full mx-auto max-w-[450px] p-8 rounded-sm flex flex-col justify-center items-center">
    <form className="w-full" onSubmit={handleSubmit}>
      <h2 className="text-3xl text-center py-4 uppercase">Add Mentor</h2>
      <div className="flex flex-col w-full">
        <label className="pb-2 uppercase" htmlFor="firstName">
          First Name:
        </label>
        <input
          className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="pb-2 uppercase" htmlFor="lastName">
          Last Name:
        </label>
        <input
          className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="pb-2 uppercase" htmlFor="email">
          Email:
        </label>
        <input
          className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="pb-2 uppercase" htmlFor="password">
          Password:
        </label>
        <input
          className="bg-white border-2 border-gray-300 rounded-md p-2 mb-4"
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col w-full">
        <label className="pb-2 uppercase" htmlFor="projectCategory">
          Project Category:
        </label>
        <select
          className="bg-white text-black border-2 border-gray-300 rounded-md p-2 mb-4"
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
      <button
        className="bg-blue-950 rounded-sm text-white px-12 py-2 hover:bg-blue-950/50 hover:border-2 hover:border-blue-950 w-full"
        type="submit"
      >
        Add Mentor
      </button>
    </form>
  </div>
</div>
    </>
  );
};

export default AdminMentorList;
