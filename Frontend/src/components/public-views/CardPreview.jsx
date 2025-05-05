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
      <div className="h-full box-border max-w-sm mx-auto bg-[#C6CBFF] card w-96 shadow-sm border-6 border-[#9da2d6] flex flex-col jsutify-between">
        <figure className="px-6 pt-6 ">
          {/* Profile Image */}
          <img
            src={props.profilePhoto ? props.profilePhoto : '../../../assets/blank-profile-picture-973460_1280.png'}
            alt= "Mentor"
            className="object-cover w-full h-48 md:h-64 rounded-t-sm border-6 border-[#9da2d6] shadow-xl"
          />
        </figure>
        {/* Mentor Info */}
        <div className="rounded-b-sm p-4 items-center text-center bg-[#C6CBFF]">
          {/* Mentor Name (title) */}
          <h2 className="text-3xl font-bold text-black ">
            {props.firstName} {props.lastName}
          </h2>
          {/* Mentor Project */}
          <p className="font-bold text-lg text-gray-700 mb-1">
  Project Category: <span className="text-blue-500 text-sm">{props.projectCategory?.toUpperCase()}</span>
</p>
          {/* Mentor interests */}
          <p className="font-bold text-xl text-gray-700 mb-1">
  Interests: <span className="text-gray-900 text-lg font-normal">{props.interests.join(', ')}</span>
</p>
          {/* Mentor's Question */}
          <p className="font-bold text-xl text-gray-700">Question: </p>
          <p className="text-gray-900 text-lg italic">{props.questionToAsk}</p>
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
