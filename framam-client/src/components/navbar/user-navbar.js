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
              <a>Home</a>
            </li>
            <li tabIndex={0}>
              <a>How to Recycle</a>
            </li>
            <li>
              <a>Recyclable Materials</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <svg className="w-5"
            viewBox="0 -2.35 98.491 98.491"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsxlink="http://www.w3.org/1999/xlink"
            fill="#000000"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <defs>
                <linearGradient
                  id="linear-gradient"
                  y1="0.5"
                  x2="1"
                  y2="0.5"
                  gradientUnits="objectBoundingBox"
                >
                  <stop offset="0" stopColor="#face00"></stop>
                  <stop offset="1" stopColor="#f68600"></stop>
                </linearGradient>
                <linearGradient
                  id="linear-gradient-2"
                  x1="0.5"
                  y1="0.044"
                  x2="0.5"
                  y2="0.935"
                  xlinkHref="#linear-gradient"
                ></linearGradient>
                <linearGradient
                  id="linear-gradient-3"
                  x1="0.5"
                  y1="-0.036"
                  x2="0.5"
                  y2="0.171"
                  xlinkHref="#linear-gradient"
                ></linearGradient>
                <linearGradient
                  id="linear-gradient-5"
                  x1="0.01"
                  y1="0.5"
                  x2="1.006"
                  y2="0.5"
                  xlinkHref="#linear-gradient"
                ></linearGradient>
              </defs>
              <g
                id="reward_cup"
                data-name="reward cup"
                transform="translate(-867.842 -408.541)"
              >                <rect
                  id="Rectangle_2"
                  data-name="Rectangle 2"
                  width="8.754"
                  height="34.901"
                  transform="translate(912.545 452.459)"
                  fill="url(#linear-gradient)"
                ></rect>
                <g id="Group_2" data-name="Group 2">
                  <g id="Group_1" data-name="Group 1">
                    <path
                      id="Rectangle_3"
                      data-name="Rectangle 3"
                      d="M1.668,0H32.03A1.67,1.67,0,0,1,33.7,1.67V8.284a1.669,1.669,0,0,1-1.669,1.669H1.67A1.67,1.67,0,0,1,0,8.283V1.668A1.668,1.668,0,0,1,1.668,0Z"
                      transform="translate(900.072 484.266)"
                      fill="url(#linear-gradient-2)"
                    ></path>
                  </g>
                </g>
                <path
                  id="Path_1"
                  data-name="Path 1"
                  d="M909.409,424.24v-6.588h-41v.092a54.651,54.651,0,0,0-.565,6.578,37.874,37.874,0,0,0,10.547,26.413c5.337,5.458,9.778,8.542,14.109,10.205l-3.863-11.421c-6.6-3.018-14.372-13.242-14.25-25.179v-.1Z"
                  fill="url(#linear-gradient-3)"
                ></path>
                <path
                  id="Path_2"
                  data-name="Path 2"
                  d="M924.763,424.24v-6.588h41v.092a54.665,54.665,0,0,1,.568,6.578,37.873,37.873,0,0,1-10.55,26.413c-5.336,5.458-9.778,8.542-14.109,10.205l3.868-11.421c6.6-3.018,14.37-13.242,14.247-25.179v-.1Z"
                  fill="url(#linear-gradient-3)"
                ></path>
                <g id="Group_3" data-name="Group 3" opacity="0.15">
                  <path
                    id="Path_3"
                    data-name="Path 3"
                    d="M884.484,417.652v6.588h24.925v-6.588Zm0,29.122v.162h.023a29.873,29.873,0,0,0,.72,5.454A29.546,29.546,0,0,0,887.2,458.2a28.6,28.6,0,0,0,5.3,2.743l-3.863-11.421A17.93,17.93,0,0,1,884.484,446.774Z"
                    fill="#1a1b1e"
                  ></path>
                  <path
                    id="Path_4"
                    data-name="Path 4"
                    d="M924.763,417.652v6.588h24.613v-6.588Zm16.908,43.288a28.023,28.023,0,0,0,4.853-2.454,29.532,29.532,0,0,0,2.377-7.407,30.016,30.016,0,0,0,.445-4.009,17.682,17.682,0,0,1-3.807,2.449Z"
                    fill="#1a1b1e"
                  ></path>
                </g>
                <path
                  id="Path_5"
                  data-name="Path 5"
                  d="M886.255,446.651h.024a27.912,27.912,0,0,0,.678,5.156,28.62,28.62,0,0,0,6.468,12.561,31.211,31.211,0,0,0,23.5,10.46,32.406,32.406,0,0,0,3.418-.179,30.664,30.664,0,0,0,24.315-16.557,28.054,28.054,0,0,0,2.921-11.441h.021v-38.11H886.255v38.11Z"
                  fill="url(#linear-gradient-5)"
                ></path>
                <g id="Group_5" data-name="Group 5">
                  <g id="Group_4" data-name="Group 4">
                    <path
                      id="Path_6"
                      data-name="Path 6"
                      d="M938.786,500.426a1.906,1.906,0,0,1-1.9,1.9H896.963a1.906,1.906,0,0,1-1.9-1.9v-6.15a1.9,1.9,0,0,1,1.9-1.9h39.921a1.9,1.9,0,0,1,1.9,1.9Z"
                      fill="#555c84"
                    ></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <p className="pr-5 pl-1">3000</p>
          <span className="pr-5"> {name}</span>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={userImage} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
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
