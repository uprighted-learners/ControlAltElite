import React, { useState, useEffect } from "react";
import {
  API_DELETE_MENTOR,
  API_VIEW_MENTORS,
} from "../../../constants/endpoints";
const AdminMentorList = (props) => {
  const [mentors, setMentors] = useState([]);

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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMentorList;
