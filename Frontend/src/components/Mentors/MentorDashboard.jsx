//  Mentor Dashboard
import React, { useState } from "react";
import MentorNavbar from "./MentorNavbar";
import MentorProfileEdit from "./MentorProfileEdit"

const MentorDashboard = (props) => {
    const [mentors, setMentors] = useState([]);
    const [mentees, setMentees] = useState([]);

    return (
        <>
            <MentorNavbar />
            <div className="flex flex-col-reverse items-center justify-center text-black text-center p-4 rounded-md mt-4">
            <MentorProfileEdit token={props.token}/>
            </div>
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
