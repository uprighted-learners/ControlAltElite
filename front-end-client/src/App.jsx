import React, { useState, useEffect } from "react";
import Header from "./welcome-page/Header";

const App = (props) => {
    return (
        <>
           <h1> Hello from App </h1>
           {/* Mount Header */}
           <Header/>
        </>
    );
}

export default App;