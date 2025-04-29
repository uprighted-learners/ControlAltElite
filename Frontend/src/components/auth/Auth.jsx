// Auth
import React, { useState } from "react";
import SignUp from "./signup-section/SignUp";
import Login from "./login-section/login";

const Auth = (props) => {
  const [isSigningUp, setIsSigningUp] = useState(true);

  return (
    <div className="container mx-auto p-4 h-full">
      {isSigningUp ? (
        <div className="py-12">
          <SignUp updateToken={props.updateToken} />
          <p>
            Already have a login?{" "}
            <button
              className="signUp-button"
              onClick={() => setIsSigningUp(false)}
            >
              Click here
            </button>
          </p>
        </div>
      ) : (
        <div>
          <Login updateToken={props.updateToken} />
          <p>
            Don't have an account?{" "}
            <button
              className="signUp-button"
              onClick={() => setIsSigningUp(true)}
            >
              Sign up here
            </button>
          </p>
        </div>
      )}
    </div>
  );
};
export default Auth;
