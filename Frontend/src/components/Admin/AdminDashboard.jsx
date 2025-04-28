import React, { useState } from "react";
import CreateMentor from "./Create-Mentor";
import AdminMentorList from "./Mentor-List/AdminMentorList";

const AdminDashboard = (props) => {
  // use state to refresh mentor list component when mentor is added from create-mentor form
  const [refreshMentors, setRefreshMentors] = useState(false);

  // Toggling the Create Mentor form
  const [showForm, setShowForm] = useState(false);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <div className="flex justify-center items-center flex-col mt-8 px-16 pb-8">
        {/* Toggle button for showing/hiding the form */}
        <button
          onClick={handleToggleForm}
          className="btn bg-[#1b0a5f] text-white mb-4 hover:bg-[#6c50e1] rounded-md px-6 py-3 text-lg"
        >
          {showForm ? "Hide Create Mentor Form" : "Create New Mentor"}
        </button>

        {showForm && (
          <CreateMentor
            setRefreshMentors={setRefreshMentors}
            token={props.token}
          />
        )}

        <AdminMentorList
          refreshMentors={refreshMentors}
          setRefreshMentors={setRefreshMentors}
          token={props.token}
        />
      </div>
    </>
  );
};

export default AdminDashboard;
