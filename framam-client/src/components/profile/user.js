import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserNavbar from "../navbar/user-navbar";
import "./css/User.css";

const Users = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");

    if (idToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated) {
    // window.location.replace("/login");
    return null;
  }

  if (!loading) {
    return (
      <div class="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <UserNavbar userImage={users.image?.url} points={users.points} name={`${users.fullname?.firstname} ${users.fullname?.lastname}`}>
      <div className="min-h-screen bg-base-300 mt--4 pt-6 flex justify-center">
        <div className="text-center card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <img
              className="rounded-full w-28 mb-4 mx-auto"
              src={users.image?.url}
              alt={users.image?.name}
            />
            <h1 className="text-2xl font-bold">
              {users.fullname?.firstname} {users.fullname?.lastname}
            </h1>
            <p>{users.email}</p>
            <p>{users.username}</p>
            <p>{users.bio?.address}</p>
          </div>
        </div>
      </div>
    </UserNavbar>
  );
};

export default Users;
