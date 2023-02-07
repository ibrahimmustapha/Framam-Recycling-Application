import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const UserNavbar = ({ children, userImage, name }) => {
  const navigate = useNavigate();

  const logoutUser = async () => {
    await axios
      .get("http://localhost:3000/api/v1/logout", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.clear("idToken");
        navigate("/login");
      });
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Home</a>
              </li>
              <li tabIndex={0}>
                <a className="justify-between">How to Recycle</a>
              </li>
              <li>
                <a>Recyclable Materials</a>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Framam</a>
        </div>
        <div className="navbar-center hidden lg:flex breadcrumbs text-sm">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li tabIndex={0}>
              <a>How to Recycle</a>
            </li>
            <li>
              <a>Recyclable Materials</a>
            </li>
            <li>
              <a>Recycling Family</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <p className="pr-3">{name}</p>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="avatar online">
                <div className="w-10 rounded-full">
                  <img src={userImage} />
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={`/users/${localStorage.getItem("uid")}`} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <Link onClick={logoutUser}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default UserNavbar;
