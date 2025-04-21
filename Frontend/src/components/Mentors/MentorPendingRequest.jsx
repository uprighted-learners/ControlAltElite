import React, { useState, useEffect } from "react";
import { API_VIEW_PENDING_REQUESTS } from "../../constants/endpoints";

const MentorPendingRequest = (props) => {
  const [mentees, setMentees] = useState([]);

  useEffect(() => {
    if (props.token) {
      const fetchMentees = async () => {
        try {
          const response = await fetch(API_VIEW_PENDING_REQUESTS, {
            method: "GET",
            headers: {
              Authorization: `${props.token}`,
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          if (data.mentees) {
            setMentees(data.mentees);
          }
        } catch (error) {
          console.error("Error fetching mentees:", error);
        }
      };

      fetchMentees();
    }
  }, [props.token]);

  return (
    <div>
      <h1>Mentor Match List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {mentees.map((mentee, index) => (
            <tr key={index}>
              <td>{mentee.firstName}</td>
              <td>{mentee.lastName}</td>
              <td>{mentee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MentorPendingRequest;
