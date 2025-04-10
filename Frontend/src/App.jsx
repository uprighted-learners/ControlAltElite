import React from "react";
import "./App.css";
import MentorDirectory from "./components/public-views/MentorDirectory";

function App() {
  return (
    <>
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1531101930610-1b86e66d5fd7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-20" />
        {/* Hero Content (div)*/}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-6 pt-12">
          {/* Program Title */}
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-shadow-lg">
            Benn Rising Mentorship Program
          </h2>
          {/* Seocndary text/description */}
          <p className="text-3xl mb-6 text-shadow-sm pt-6">
            Browse cool mentors to connect with.
          </p>
          {/* Get Started button (login/signup) */}
          <button className="absolute top-4 right-4 bg-[#C6CBFF] hover:bg-[#6C50E1] px-6 py-3 rounded text-lg font-semibold text-shadow-md shadow-md">
            Get Started
          </button>
          {/* Carousel of mentor cards */}
          <MentorDirectory />
          {/* Footer */}
          <p className="text-lg md:text-xl mb-6 font-bold text-shadow-sm p-10">
            Page by CTRL+ALT+ELITE
          </p>
        </div>
      </div>
    </>
  );
}

export default App;
