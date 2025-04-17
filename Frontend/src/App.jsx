import React from "react";
import './App.css'
import CreateMentor from "./components/Admin/Create-Mentor/CreateMentor";

function App() {

  return (
    <>
      <div className="grid">
        <h1 className="text-7xl uppercase text-center">Hello World</h1>
        <CreateMentor/>
      </div>
    </>
  )
}

export default App
