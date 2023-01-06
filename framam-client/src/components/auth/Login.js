import React, { useState } from "react";
import axios from "axios";
import "./css/Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    await axios
      .post(
        "http://localhost:3000/api/v1/register",
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
        console.log(res.data)
      })
      .catch((err) => {
        console.log("Something happend: " + err);
      });
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
          <input type="button" value="Get Started" onClick={registerUser} />
        </div>
      </form>
    </div>
  );
};
