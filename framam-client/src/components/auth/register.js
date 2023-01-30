import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import "./css/RegisterUser.css";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    address: "",
    age: 0,
    job: "",

  });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const [job, setJob] = useState("");
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const signUserIn = async () => {
    await axios
      .post(
        "http://localhost:3000/api/v1/register",
        {
          email: email,
          password: password,
          fullname: {
            firstname: firstname,
            lastname: lastname,
          },
          bio: {
            age: age,
            job: job,
            address: address,
          },
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
        console.log(res.data);
        navigate(`/users/${res.data.uid}`, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
        console.log("Something happend: " + err.message);
      });
  };

  const uploadUserPhoto = async () => {
    await axios
      .post(
        "http://localhost:3000/api/v1/add_photo",
        {
          photo: photo,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      });
  };

  // useEffect(() => {
  //   signUserIn();
  //   uploadUserPhoto();
  // }, []);

  const getUserDetails = () => {
    if (signUserIn()) {
      uploadUserPhoto();
    }
  };

  return (
    <Navbar>
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
          <div className="passwordContainer">
            <label>Firstname</label>
            <br />
            <input
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
              type="text"
              placeholder="8 or more characters"
            />
          </div>
          <div className="passwordContainer">
            <label>Lastname</label>
            <br />
            <input
              onChange={(e) => {
                setLastname(e.target.value);
              }}
              type="text"
              placeholder="8 or more characters"
            />
          </div>
          <div className="passwordContainer">
            <label>Address</label>
            <br />
            <input
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="text"
              placeholder="8 or more characters"
            />
          </div>
          <div className="passwordContainer">
            <label>Age</label>
            <br />
            <input
              onChange={(e) => {
                setAge(e.target.value);
              }}
              type="text"
              placeholder="8 or more characters"
            />
          </div>
          <div className="passwordContainer">
            <label>job</label>
            <br />
            <input
              onChange={(e) => {
                setJob(e.target.value);
              }}
              type="text"
              placeholder="8 or more characters"
            />
          </div>
          <div className="passwordContainer">
            <label>Profile Image</label>
            <br />
            <input
              onChange={(e) => {
                setPhoto(e.target.files[0]);
              }}
              type="file"
              placeholder="8 or more characters"
            />
          </div>
          <div className="loginButtonContainer">
            <input type="button" value="Sign In" onClick={getUserDetails} />
          </div>
        </form>
      </div>
    </Navbar>
  );
};

export default Register;
