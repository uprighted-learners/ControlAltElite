// Component for mentor card previews (for main page carousel)
import React from "react";

const CardPreview = (props) => {
  return (
    <>
      <div className="box-border w-full h-full max-w-sm mx-auto bg-white rounded-sm shadow-sm card">
        <figure className="px-10 pt-10">
          {/* Profile Image */}
          <img
            src={props.imageUrl}
            alt={props.title}
            className="object-cover w-full h-48 rounded-t-sm"
          />
        </figure>
        {/* Mentor Info */}
        <div className="rounded-b-sm p-4 items-center text-center bg-[#C6CBFF]">
          {/* Mentor Name (title) */}
          <h2 className="text-2xl font-bold text-black ">
            {props.title}
          </h2>
          {/* Mentor description */}
          <p className="text-lg text-black">{props.description}</p>
          <div className="text-center card-actions">
            {/* Connect button */}
            <a className="mx-auto text-center" href="/MentorMatchList">
              <button className="px-6 py-2 rounded-md bg-[#1B0A5F] hover:bg-[#6C50E1] text-lg">
                Connect
              </button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPreview;
