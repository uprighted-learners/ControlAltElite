//  Mentor Dashboard
import React, { useState } from "react";
import MentorNavbar from "./MentorNavbar";

const MentorDashboard = (props) => {
    const [mentors, setMentors] = useState([]);
    const [mentees, setMentees] = useState([]);

    return (
        <>
            <MentorNavbar />
            <div className="mentor-dashboard">
                
                <h1>Mentor Dashboard</h1>
                <p>Welcome, Mentor!</p>
                <p>Here you can manage your mentees and schedule meetings.</p>
                <p>Use the navigation menu to access different sections.</p>
                <h1> Hello from MentorDashboard </h1>
            </div>
        </>
    );
}

export default MentorDashboard;