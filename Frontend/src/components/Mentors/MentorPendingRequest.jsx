import React, { useState, useEffect } from "react";
import {
  API_ACCEPT_REQUEST,
  API_REJECT_REQUEST,
  API_VIEW_PENDING_REQUESTS,
} from "../../constants/endpoints";

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

  // Accept a mentee request
  const handleAccept = async (menteeId) => {
    try {
      const response = await fetch(`${API_ACCEPT_REQUEST}/${menteeId}`, {
        method: "POST",
        headers: {
          Authorization: `${props.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Accept response:", data);
      if (response.ok) {
        setMentees((prev) =>
          prev.filter((mentee) => mentee.menteeId !== menteeId)
        );
      }
    } catch (error) {
      console.error("Error accepting mentee:", error);
    }
  };

  // Reject a mentee request
  const handleReject = async (menteeId) => {
    try {
      const response = await fetch(`${API_REJECT_REQUEST}/${menteeId}`, {
        method: "POST",
        headers: {
          Authorization: `${props.token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Reject response:", data);
      if (response.ok) {
        setMentees((prev) =>
          prev.filter((mentee) => mentee.menteeId !== menteeId)
        );
      }
    } catch (error) {
      console.error("Error rejecting mentee:", error);
    }
  };

  return (
    <>
      <div className="w-full md:w-[95%] px-4 pb-4">
        <ul className="list rounded-box shadow-md">
          <li className="p-4 pb-2 text-lg opacity-90 tracking-wide font-semibold text-white bg-[#1b0a5f] rounded-box shadow-md text-center">
            Pending Requests
          </li>

          {mentees.map((mentee, index) => (
            <li
              key={index}
              className="list-row flex items-center gap-4 px-4 py-3 border-t"
            >
              {console.log("Mentee object:", mentee)}
              <div>
                <img
                  className="size-10 rounded-box"
                  src={`https://api.dicebear.com/7.x/initials/svg?radius=50&seed=${mentee.firstName}-${mentee.lastName}`}
                  alt={`${mentee.firstName} ${mentee.lastName}`}
                />
              </div>
              <div className="list-col-grow flex-1">
                <div className="font-semibold">
                  {mentee.firstName} {mentee.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {mentee.email}
                </div>
              </div>

              {/*  Accept Button */}
              <button
                className="btn btn-square btn-ghost text-success hover:bg-success/10"
                onClick={() => handleAccept(mentee.menteeId)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[1.4em]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </button>

              {/* Reject Button */}
              <button
                className="btn btn-square btn-ghost text-error hover:bg-error/10"
                onClick={() => {
                  console.log("Reject clicked for:", mentee.menteeId); // <-- correct log
                  handleReject(mentee.menteeId); // <-- correct handler
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-[1.4em]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
    // <div>
    //   <h1>Mentor Match List</h1>
    //   <table border="1">
    //     <thead>
    //       <tr>
    //         <th>First Name</th>
    //         <th>Last Name</th>
    //         <th>Email</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {mentees.map((mentee, index) => (
    //         <tr key={index}>
    //           <td>{mentee.firstName}</td>
    //           <td>{mentee.lastName}</td>
    //           <td>{mentee.email}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
  );
};

export default MentorPendingRequest;
