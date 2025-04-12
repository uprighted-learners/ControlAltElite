import React from "react";

const SignupButton = (props) => {
  return (
    <div className="chat-button" onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default SignupButton;
