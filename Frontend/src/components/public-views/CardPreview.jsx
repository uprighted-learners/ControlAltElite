// Component for mentor card previews (for main page carousel)
import React from "react";

const CardPreview = (props) => {
  return (
    <>
      <div className="card bg-base-100 w-full max-w-sm mx-auto shadow-sm h-full box-border">
        <figure className="px-10 pt-10">
          {/* Profile Image */}
          <img
            src={props.imageUrl}
            alt={props.title}
            className="rounded-xl w-full h-48 object-cover"
          />
        </figure>
        {/* Mentor Info */}
        <div className="card-body items-center text-center bg-[#C6CBFF]">
          {/* Mentor Name (title) */}
          <h2 className="card-title text-black font-bold text-2xl">
            {props.title}
          </h2>
          {/* Mentor description */}
          <p className="text-black text-lg">{props.description}</p>
          <div className="card-actions">
            {/* Connect button */}
            <button className="btn btn-primary bg-[#1B0A5F] hover:bg-[#6C50E1] text-lg">
              Connect
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardPreview;
