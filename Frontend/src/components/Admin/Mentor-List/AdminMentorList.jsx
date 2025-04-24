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
    <div>
      <h1>Mentor List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Project Category</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor.id}>
              <td>{mentor.id}</td>
              <td>{mentor.firstName}</td>
              <td>{mentor.lastName}</td>
              <td>{mentor.email}</td>
              <td>{mentor.projectCategory || "N/A"}</td>
              <td>
                <button onClick={() => handleUpdate(mentor.id)}>Update</button>
                <button onClick={() => handleDelete(mentor.id)}>Delete</button>
                <button onClick={() => handleAdd()}>Add</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
        <button type="submit">Add Mentor</button>
      </form>
    </div>
  );
};

export default AdminMentorList;
