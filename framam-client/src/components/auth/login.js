import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/RegisterUser.css";

const LoginUser = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState({});
  const [error, setError] = useState("");

  const signUserIn =  () => {
     axios
      .post(
        "http://localhost:3000/api/v1/login",
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        // setLoading(true);
        setUser(res.data);
        console.log(res.data);
        console.log(user);
        navigate(`/users/${res.data.uid}`, {replace: true})
      })
      .catch((err) => {
        setError(err.message);
        console.log("Something happend: " + err.message);
      });
  };

  useEffect(() => {
    signUserIn();
  }, [])
  
  const getUserDetails = () => {
    signUserIn();
  };

  return (
    <div className="loginContainer">
      <form>
        <div className="headerContainer"></div>
        <div className="emailContainer">
          <label>Email</label>
          <br />
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className="passwordContainer">
          <label>Password</label>
          <br />
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="8 or more characters"
          />
        </div>
        <div className="loginButtonContainer">
          <input type="button" value="Get Started" onClick={getUserDetails} />
        </div>
      </form>
    </div>
  );
};

export default LoginUser;
