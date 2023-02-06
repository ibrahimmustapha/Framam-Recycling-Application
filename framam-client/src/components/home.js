import React, { useEffect, useState } from "react";
import axios from "axios";
import UserNavbar from "./navbar/user-navbar";

const Home = () => {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const uid = localStorage.getItem("uid");

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/${uid}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        setLoading(true);
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [uid]);

  // get idToken stored in localStorage
  const idToken = localStorage.getItem("idToken");

  // if user there's no idToken redirect to login page
  if (!idToken) {
    window.location.replace("/login");
  }
  return (
    <UserNavbar
      userImage={users.image?.url}
      name={`${users.fullname?.firstname} ${users.fullname?.lastname}`}
    >
      <div className="min-h-screen bg-base-300">
        <div className="flex justify-center pt-10">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <i className="large material-icons" style={{ fontSize: 40 }}>
                  trending_up
                </i>
              </div>
              <div className="stat-title">Total Points</div>
              <div className="stat-value text-primary">25.6K</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <i className="large material-icons" style={{ fontSize: 40 }}>
                  delete
                </i>
              </div>
              <div className="stat-title">Number of Recycles</div>
              <div className="stat-value text-secondary">2.6M</div>
              <div className="stat-desc">21% more than last month</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <div className="avatar online">
                  <div className="w-16 rounded-full">
                    <img src={users.image?.url} alt="profile" />
                  </div>
                </div>
              </div>
              <div className="stat-value">10%</div>
              <div className="stat-title">Recycles Completed</div>
              <div className="stat-desc text-secondary">31 tasks remaining</div>
            </div>
          </div>
        </div>
      </div>
    </UserNavbar>
  );
};

export default Home;
