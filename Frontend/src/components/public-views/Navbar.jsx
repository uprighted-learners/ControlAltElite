import React, { useState, useEffect } from "react";
import MobileNav from "./MobileNav";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

function Navigationbar(props) {
  const [collapsed, setCollapsed] = useState(true);
  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <>
      <div>
        <Navbar color="faded" light className="navbar">
          <NavbarBrand href="/" className="me-auto font-primary bold">
            Benn Rising
          </NavbarBrand>
          <NavbarToggler onClick={toggleNavbar} className="me-2" />
          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href="/">Homepage</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>

      {/* <MobileNav /> */}
    </>
  );
}

export default Navigationbar;
