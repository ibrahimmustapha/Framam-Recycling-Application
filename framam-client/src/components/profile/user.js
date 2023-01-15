import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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

  if (!loading) {
    return (
      <div className="loadContainer">
        <div class="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
        <p>Please wait...</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Hello, Ghana!</h1>
      <div className="profile_container" key={users.uid}>
        <img
          className="profile_image"
          src={users.image?.url}
          alt={users.image?.name}
        />
        <p>{users.fullname?.firstname} {users.fullname?.lastname}</p>
        <p>{users.username}</p>
        <p>{users.email}</p>
        <p>{users.bio?.age}</p>
        <p>{users.bio?.address}</p>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Users;
