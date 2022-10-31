import React from "react";
import { NavLink } from "react-router-dom";
import "./styling/Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <nav>
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
        |
        <NavLink to="/plans" className="buttonAuth">
          Plans
        </NavLink>
        |
        <NavLink to="/create-plan" className="buttonAuth">
          Create Plan
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
