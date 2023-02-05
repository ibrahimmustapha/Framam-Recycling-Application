import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import UserNavbar from "../navbar/user-navbar";
import "./css/User.css";

const Users = () => {
  const { uid } = useParams();
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);

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

  if (!loading) {
    return (
      <UserNavbar>
        <div class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-10">
          <div class="card-body animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-700 w-28 h-28 mb-4 mx-auto"></div>
            <div class="flex-1 space-y-6 py-1">
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-700 rounded col-span-4"></div>
                  <div class="h-2 bg-slate-700 rounded col-span-4"></div>
                </div>
                <div class="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </UserNavbar>
    );
  }

  return (
    <UserNavbar
      userImage={users.image?.url}
      name={`${users.fullname?.firstname} ${users.fullname?.lastname}`}
    >
      <div className="min-h-screen bg-base-300">
        <div className="flex justify-center">
          <div className="shadow-md bg-base-200 p-10 mt-10 text-center">
            <div className="card-body">
              <img
                className="rounded-full w-28 h-28 mb-4 mx-auto"
                src={users.image?.url}
                alt={users.image?.name}
              />
              <h1 className="text-3xl font-bold">
                {users.fullname?.firstname} {users.fullname?.lastname}
              </h1>
              <p>{users.email}</p>
              <p>{users.username}</p>
              <p>{users.bio?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </UserNavbar>
  );
};

export default Users;
