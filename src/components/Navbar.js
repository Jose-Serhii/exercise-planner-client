import React from "react";
import { NavLink } from "react-router-dom";
import "../Navbar.css";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <NavLink to="/login" className="buttonAuth">
          login
        </NavLink>
        |
        <NavLink to="/signup" className="buttonAuth">
          signup
        </NavLink>
        |
        <NavLink to="/" className="buttonAuth">
          Homepage
        </NavLink>
        |
        <NavLink to="/exercises" className="buttonAuth">
          Exercises
        </NavLink>
        |
        <NavLink to="/create-exercise" className="buttonAuth">
          Create Exercise
        </NavLink>
      </div>
    </>
  );
}

export default Navbar;
