import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";
import "./css/RegisterUser.css";

const LoginUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/v1/login", formData, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {
        localStorage.setItem("idToken", res.data.idToken);
        localStorage.setItem("uid", res.data.userId);
        console.log(res.data);
        navigate(`/`);
      })
      .catch((err) => {
        setError(err.message);
        console.log("Something happend: " + err.message);
      });
  };

  return (
    <Navbar>
      <div className="">
        <form>
          <div className="min-h-screen bg-base-300 pt-10">
            <div className="flex justify-center">
              <div className="card shadow-2xl bg-base-100">
                <div className="card-body">
                  <h1 className="text-4xl font-bold text-center">Login</h1>
                  <div className="divider"></div>
                  <div className="form-control">
                    <label className="input-group">
                      <span>Email</span>
                      <input
                        type="email"
                        name="email"
                        placeholder="example@site.com"
                        className="input input-bordered"
                        onChange={handleChange}
                        value={formData.email}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <label className="input-group">
                      <span>Password</span>
                      <input
                        type="password"
                        name="password"
                        placeholder="********"
                        className="input input-bordered"
                        onChange={handleChange}
                        value={formData.password}
                      />
                    </label>
                    <label className="label">
                      <Link to="#" className="label-text-alt link link-hover">
                        Forgot password?
                      </Link>
                    </label>
                  </div>
                  <div className="form-control mt-6">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Navbar>
  );
};

export default LoginUser;
