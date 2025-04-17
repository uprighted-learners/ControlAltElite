// Mentee Dashboard
import React, { useState } from "react";

const MenteeDashboard = (props) => {
  const [mentor, setMentor] = useState({});
    
    async function getMentor() {
      //Headers
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", props.token);
      //Request Options
      let requestOptions = {
        method: "GET",
        headers: myHeaders,
      };
      //Send Request
      let response = await fetch(API_VIEW_MENTORS, requestOptions)
  
      //Response Object
      let data = await response.json()
      console.log(data)
      setMentor(data)
    }
   useEffect(() => {
     getMentor();
   }, []);
    
    // Function to handle mentor selection
    const handleSubmit = (mentor) => {
      // Perform any action with the selected mentor
      console.log("Selected Mentor:", mentor);
    };
  
  return (
    <>
      <h1> Hello from MenteeDashboard </h1>
      <MentorProfile mentor={mentor} onMentorSelect={handleSubmit} />
    </>
  );
};

export default MenteeDashboard;
