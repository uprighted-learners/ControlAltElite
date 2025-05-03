import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/public-views/Navbar";
import Footer from "./components/public-views/Footer";
import Auth from "./components/auth/Auth";
import MainIndex from "./components/MainIndex";
import MentorDashboard from "./components/Mentors/MentorDashboard";
import MenteeDashboard from "./components/Mentees/MenteeDashboard";
import MentorProfile from "./components/Mentors/MentorProfile";
// import AdminDashboard from "./pages/AdminDashboard";
import MentorMatchList from "./components/Mentors/MentorMatchList";
import MentorPendingRequest from "./components/Mentors/MentorPendingRequest";



import MenteePreview from "./components/Mentors/MenteePreview";
import AdminDashboard from "./components/Admin/AdminDashboard";
import AdminMentorList from "./components/Admin/Mentor-List/AdminMentorList";
import Login from "./components/auth/login-section/login";


function App() {
  //state variable for token and initialize to the value of the token stored in local storage
  const [token, setToken] = useState(localStorage.getItem("token"));

  //updateToken to update token state variable and store the token in the local storage
  function updateToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  //useEffect hook that will run the component mounts. useEffect should check if token is stored in local storage and update the token state variable if a token is stored

  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage token={token}/>} />
        {/* <Route path="/mentor" element={<MentorDashboard />} /> */}
        {/* <Route path="/mentee" element={<MenteeDashboard />} /> */}
        {/* <Route path="/adminDashboard" element={<AdminDashboard />} /> */}
        <Route path="/mentorMatchList" element={<MentorMatchList />} />
        <Route path="/updateProfile" element={<MentorProfile />} />
        <Route path="/mentor" element={<MentorDashboard token={token} />} />
        <Route path="/mentee" element={<MenteeDashboard token={token}/>} />
        <Route path="/admin" element={<AdminDashboard token={token}/>} />
        {/* <Route path="/updateProfile" element={<MentorProfile />} /> */}
        {/* <Route path="/createMentor" element={<CreateMentor />} /> */}
        
        <Route
          path="/adminMentorList"
          element={<AdminMentorList token={token} />}
        />
        <Route
          path="/mentorMatchList"
          element={<MentorMatchList token={token} />}
        />
        <Route
          path="/mentorPendingRequest"
          element={<MentorPendingRequest token={token} />}
        />
        <Route path="/menteePreview" element={<MenteePreview />} />
        {/* Commented out because using in route /mentor instead (see above) */}
        {/* <Route path="/mentorDashboard" element={<MentorDashboard />} /> */}
        <Route path="/signup" element={<Auth updateToken={updateToken} />} />
        <Route path="/login" element={<Login token={token} updateToken={updateToken}  />} />
      </Routes>
      {/* <div className="content-body">
        {!token && <Auth updateToken={updateToken} />}
        {token && <MainIndex token={token} />}
      </div> */}
      <Footer />
    </>
  );
}

export default App;
