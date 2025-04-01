import React, { useState, useEffect } from "react";
import "./Header.css"

const Header = (props) => {
    return (
        <>
           <h1> Hello from Header </h1>
           <div id="welcome-container">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla obcaecati expedita odio doloremque illo. Quod voluptatum quibusdam sequi voluptatem placeat consectetur corporis nisi adipisci explicabo eius in consequatur aut, reiciendis aspernatur maiores deleniti earum sint ipsam. Facilis deserunt, explicabo numquam voluptatem, hic saepe maxime ut architecto, vel error eligendi doloremque.</p>
            <p>LOGIN BUTTON</p>
            <p>SIGN UP BUTTON</p>
           </div>
        </>
    );
}

export default Header;