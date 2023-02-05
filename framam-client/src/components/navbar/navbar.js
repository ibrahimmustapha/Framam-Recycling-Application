import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ children }) => {
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <Link className="btn btn-ghost normal-case text-xl">Framam</Link>
        </div>
        <div className="navbar-end">
          <Link to="/login" className="btn btn-ghost mr-5">Login</Link>
          <Link className="btn" to="/register">Register</Link>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Navbar;
