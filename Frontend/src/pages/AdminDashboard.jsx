// Admin Dashboard Page
import React from "react";
import AdminMentorList from "../components/Admin/Mentor-List/AdminMentorList";
import CreateMentor from "../components/Admin/Create-Mentor";

const AdminDashboard = () => {
  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1531101930610-1b86e66d5fd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] relative z-0 bg-cover bg-no-repeat w-full after:content-[''] after:absolute after:inset-0 after:bg-black after:opacity-50">
      <div className="relative z-10 flex flex-col items-center justify-center px-6 pt-12 text-center text-white">
        <AdminMentorList />
        <CreateMentor />
      </div>
    </div>
  );
};

export default AdminDashboard;
