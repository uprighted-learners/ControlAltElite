import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/public-views/Navbar";
import Footer from "./components/public-views/Footer";
import Auth from "./components/auth/Auth";
import "bootstrap/dist/css/bootstrap.min.css";
import MainIndex from "./components/MainIndex";

function App() {
  //state variable for token and initialize to the value of the token stored in local storage
  const [token, setToken] = useState(localStorage.getItem("token"));

  //updateToken to update token state variable and store the token in the local storage
  function updateToken(newToken) {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  //useEffect hook that will run the component mounts. useEffect should check if token is stored in local storage and update the token state variable if a token is stored

  useEffect(() => {
    let storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      // TODO Import and mount main header //* NavBar import and mount
      <Navbar />
      // After nav bar
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <div className="content-body">
        {!token && <Auth updateToken={updateToken} />}
        {token && <MainIndex token={token} />}
      </div>
      <Footer />
    </>
  );
}

export default App;
