import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/public-views/Navbar";
import Footer from "./components/public-views/Footer";
import Auth from "./components/auth/Auth";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      // TODO Import and mount main header //* NavBar import and mount
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/" element={<Auth />} /> */}
      </Routes>
      <Auth />
      <Footer />
    </>
  );
}

export default App;
