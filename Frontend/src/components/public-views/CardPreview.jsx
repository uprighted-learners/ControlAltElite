// Component for mentor card previews (for main page carousel)
import React from "react";
import { API_REQUEST_MENTOR } from "../../constants/endpoints";

const CardPreview = (props) => {

  // handle match request (connect button)
  const handleMatchRequest = async () => {
    try {
      const response = await fetch(`${API_REQUEST_MENTOR}/${props.mentorId}`, {
                  method: "POST",
                  headers: {
                    Authorization: `${props.token}`,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    answer: "default answer",
                  }),
                });

                const data = await response.json();
                if (!response.ok){
                  alert(`Error: ${data.message}`);
                } else {
                  alert(data.message)
                }
    } catch (error) {
      console.error("Match request failed. ", error)
      alert("Oops! Something went wrong while sending the match request.");
    }
  }
  return (
    <>
      <div className="box-border w-full max-w-sm mx-auto bg-white rounded-sm shadow-sm card">
        <figure className="px-2 pt-2">
          {/* Profile Image */}
          <img
            src={props.profilePhoto ? props.profilePhoto : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
            alt= "Mentor"
            className="object-cover w-full h-64 rounded-t-sm"
          />
        </figure>
        {/* Mentor Info */}
        <div className="rounded-b-sm p-4 items-center text-center bg-[#C6CBFF]">
          {/* Mentor Name (title) */}
          <h2 className="text-2xl font-bold text-black ">
            {props.firstName} {props.lastName}
          </h2>
          {/* Mentor description */}
          <p className="text-lg text-black">Interests: {props.interests}</p>
          <div className="flex justify-center mt-4">
            {/* Connect button */}
            {/* <a className="mx-auto text-center" href="/MentorMatchList"> */}
              <button onClick={handleMatchRequest} 
              className="px-6 py-2 rounded-md bg-[#1B0A5F] hover:bg-[#6C50E1] text-lg text-white">
                Request Mentor
              </button>
            {/* </a> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPreview;
