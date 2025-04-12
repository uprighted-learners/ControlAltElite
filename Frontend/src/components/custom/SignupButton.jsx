import React from "react";
import "./SignupButton.css";

const SignupButton = (props) => {
  return (
    <button className="chat-button" onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default SignupButton;
