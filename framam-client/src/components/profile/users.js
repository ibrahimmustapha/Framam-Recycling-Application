import { useState, useEffect } from "react";
import axios from "axios";
import UserNavbar from "../navbar/user-navbar";
import { Link } from "react-router-dom";

const Users = () => {
  const uid = localStorage.getItem("uid");
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
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
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [uid]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/users`, {
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
  }, []);

  return (
    <UserNavbar
      userImage={user.image?.url}
      name={`${user.fullname?.firstname} ${user.fullname?.lastname}`}
    >
      <div className="min-h-screen bg-base-300">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {users.map((user) => (
              <Link key={user.uid} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg xl:aspect-w-7 xl:aspect-h-8 flex">
                  <img
                    src={user.image?.url}
                    alt={user.image?.name}
                    className="h-60 w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  {user.fullname?.firstname} {user.fullname?.lastname}
                </h3>
                <p className="mt-1 text-lg font-medium text-gray-900">
                  {user.bio?.address}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </UserNavbar>
  );
};

export default Users;
