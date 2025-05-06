import React, { useState, useEffect } from "react";
import {
  API_ADMIN_DELETE_MENTOR,
  API_ADMIN_UPDATE_MENTOR,
  API_DELETE_MENTOR,
  API_VIEW_MENTORS,
} from "../../../constants/endpoints";
import UpdateMentorForm from "./UpdateMentorForm";
const AdminMentorList = (props) => {
  const [mentors, setMentors] = useState([]);


  // for the Update Modal
  const [showModal, setShowModal] = useState(false);
  const [mentorToUpdate, setMentorToUpdate] = useState(null);

  const handleOpenModal = (mentor) => {
    console.log("Opening modal for mentor:", mentor);
    setMentorToUpdate(mentor);

    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMentorToUpdate(null);
  };
  // const [firstName, setFirstName] = useState("Ceporah");
  // const [lastName, setLastName] = useState("Wiggins-Mentor2");
  // const [email, setEmail] = useState("email-mentor1@test.com");
  // const [password, setPassword] = useState("1234");
  // const [projectCategory, setProjectCategory] = useState("");
  // function handleSubmit(event) {
  //   event.preventDefault();
  //   // Handle form submission logic here
  //   console.log("Form submitted:", { firstName, lastName, email, password });
  //   createMentor();
  //   // Reset form fields
  //   setFirstName("");
  //   setLastName("");
  //   setEmail("");
  //   setPassword("");
  //   setProjectCategory("");
  // }

  // async function createMentor() {
  //   try {
  //     //Headers
  //     let headers = new Headers();
  //     headers.append("Content-Type", "application/json");
  //     // Request Body
  //     let body = JSON.stringify({
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email,
  //       password: password,
  //       userType: "Mentor",
  //       projectCategory: projectCategory,
  //     });
  //     // Request Options
  //     let requestOption = {
  //       method: "POST",
  //       headers: headers,
  //       body: body,
  //     };
  //     // Send Request
  //     let response = await fetch(
  //       "http://localhost:4000/user/register",
  //       requestOption
  //     ); //TODO Use API_LOGIN and import at top of file

  //     // Response Object
  //     let data = await response.json();
  //     // Update Token from the App.jsx file
  //     console.log(data);
  //     // Check if the response is ok (status code 200-299)
  //     if (!response.ok) {
  //       alert("Mentor Creation Failed! " + data.message);
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  //     alert("Mentor Created Successfully!");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    fetchMentors();
    // after fetch, reset the refresh flag to stop it form triggering
    props.setRefreshMentors(false);
  }, [props.refreshMentors]);

  async function fetchMentors() {
    try {
      const response = await fetch(API_VIEW_MENTORS);
      const data = await response.json();
      setMentors(data.mentors);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  }

  //! Handle Update button function
  async function handleUpdate(mentorId, updatedData) {
    if (!mentorToUpdate || !mentorToUpdate.id) {
      console.error("Mentor ID is missing");
      return; // Don't proceed if there's no ID
    }

    try {
      console.log("Update Clicked");
      // Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      // Add an authorization to the headers if you need a token for that route
      myHeaders.append("Authorization", props.token);
      console.log(props.token);
      // Request Body
      let body = {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        email: updatedData.email,
        projectCategory: updatedData.projectCategory,
      };
      //   Request Options
      let requestOption = {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify(body),
      };

      console.log("Updating mentor with this ID: ", mentorId);

      // Send Request
      let response = await fetch(
        `${API_ADMIN_UPDATE_MENTOR}/${mentorId}`,
        requestOption
      );

      if (!response.ok) {
        // If not, throw an error with status code
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Response Object
      let data = await response.json();
      console.log(data);

      // Re-fetch mentors
      fetchMentors();

      // Close modal
      setShowModal(false);
    } catch (error) {
      console.error("Error occured during update: ", error);
    }
  }

  async function handleDelete(mentorId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mentor?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`${API_ADMIN_DELETE_MENTOR}/${mentorId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `${props.token}`,
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
          <table className="w-full bg-white rounded-lg shadow-md">
            <thead className="sticky top-0 bg-[#1b0a5f]">
              <tr className="text-left text-white">
                {/* <th className="px-4 py-2 border-2 border-[#1b0a5f] text-white text-center font-semibold">
                  ID:
                </th> */}
                <th className="px-4 py-2 border-2 border-[#1b0a5f] text-white text-center font-semibold">
                  First Name:
                </th>
                <th className="px-4 py-2 border-2 border-[#1b0a5f] text-white text-center font-semibold">
                  Last Name:
                </th>
                <th className="px-4 py-2 border-2 border-[#1b0a5f] text-white text-center font-semibold">
                  Email:
                </th>
                <th className="px-4 py-2 border-2 border-[#1b0a5f] text-white text-center font-semibold">
                  Project Category:
                </th>
                <th className="px-4 py-2 border-2 border-[#1b0a5f] text-white text-center font-semibold">
                  Interests:
                </th>
                <th className="px-4 py-2 border-2 border-[#1b0a5f] text-white text-center font-semibold">
                  Question:
                </th>
                <th className="px-4 py-2 border-2 border-[#1b0a5f] text-white text-center font-semibold">
                  Actions:
                </th>
              </tr>
            </thead>
            <tbody>
              {mentors.map((mentor) => (
                <tr key={mentor.id} className="hover:bg-blue-100 transition-colors">
                  {/* <td className="px-4 py-3 border-2 border-[#1b0a5f]">
                    {mentor.id}
                  </td> */}
                  <td className="px-4 py-3 border-2 font-bold border-[#1b0a5f]">
                    {mentor.firstName}
                  </td>
                  <td className="px-4 py-3 border-2 font-bold border-[#1b0a5f]">
                    {mentor.lastName}
                  </td>
                  <td className="px-4 py-3 border-2 border-[#1b0a5f]">
                    {mentor.email}
                  </td>
                  <td className="px-4 py-3 border-2 text-blue-500 font-bold border-[#1b0a5f]">
                    {mentor.projectCategory || "N/A"}
                  </td>
                  <td className="px-4 py-3 border-2 border-[#1b0a5f]">{mentor.interests.join(', ')}</td>
                  <td className="px-4 py-3 border-2 border-[#1b0a5f]">{mentor.questionToAsk}</td>
                  <td className="px-4 py-3 border-2 border-[#1b0a5f]">
                    <div className="flex justify-center gap-4">
                      <button
                        className="btn btn-soft btn-primary px-2 py-1 rounded-md transition"
                        onClick={() => handleOpenModal(mentor)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-soft btn-error px-2 py-1 rounded-md transition"
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
        {/* Conditionally render the modal if showModal is true */}
        {showModal && mentorToUpdate && (
          <UpdateMentorForm
            mentorData={mentorToUpdate}
            handleUpdateMentor={handleUpdate}
            handleClose={handleCloseModal} // Pass the close function to the modal
          />
        )}
      </div>
      {/* <div className="container mx-auto p-4">
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
</div> */}
    </>
  );
};

export default AdminMentorList;
