import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/navbar";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [age, setAge] = useState(0);
  const [job, setJob] = useState("");
  const [about, setAbout] = useState("");
  // const [error, setError] = useState("");
  const [photo, setPhoto] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const defaultImageUrl = "https://img.icons8.com/external-others-inmotus-design/256/external-Avatar-avatars-others-inmotus-design-31.png";

  // Sign up new users
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
            about: about,
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
        localStorage.setItem("idToken", res.data.idToken);
        localStorage.setItem("uid", res.data.uid);
        console.log(res.data);
        navigate(`/`, { replace: true });
      })
      .catch((err) => {
        // setError(err.message);
        console.log("Something happend: " + err.message);
      });
  };

  // upload photo to firebase storage
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

  // display image after selecting from desktop
  useEffect(() => {
    if (photo) {
      setImageUrl(URL.createObjectURL(photo));
    }
  }, [photo]);

  const getUserDetails = () => {
    if (signUserIn()) {
      uploadUserPhoto();
    }
  };

  return (
    <Navbar>
      <div className="">
        <form>
          <div className="min-h-screen bg-base-300 pt-10">
            <div className="flex justify-center">
              <div className="card shadow-2xl bg-base-100">
                <div className="card-body">
                  <h1 className="text-4xl font-bold text-center">
                    Create New Account
                  </h1>
                  <div className="divider"></div>
                  <div class="shrink-0 flex justify-center pb-5">
                    <img
                      className="h-20 w-20 object-cover rounded-full"
                      src={imageUrl === null ? defaultImageUrl : imageUrl}
                      alt="profile"
                    />
                  </div>
                  <div className="flex">
                    <div className="form-control">
                      <label className="input-group">
                        <span>Email</span>
                        <input
                          type="email"
                          name="email"
                          placeholder="example@site.com"
                          className="input input-bordered"
                          onChange={(e) => setEmail(e.target.value)}
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
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="divider">Fullname</div>
                  <div className="flex">
                    <div className="form-control">
                      <label className="input-group">
                        <span>Firstname</span>
                        <input
                          type="text"
                          name="fname"
                          placeholder="John"
                          className="input input-bordered"
                          onChange={(e) => setFirstname(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="input-group">
                        <span>Lastname</span>
                        <input
                          type="text"
                          name="lname"
                          placeholder="Smith"
                          className="input input-bordered"
                          onChange={(e) => setLastname(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="divider">Biography</div>
                  <div className="flex pb-5">
                    <div className="form-control">
                      <label className="input-group">
                        <span>Age</span>
                        <input
                          type="number"
                          name="age"
                          placeholder="0"
                          className="input input-bordered"
                          onChange={(e) => setAge(e.target.value)}
                        />
                      </label>
                    </div>
                    <div className="form-control">
                      <label className="input-group">
                        <span>Job</span>
                        <input
                          type="text"
                          name="job"
                          placeholder="mechanic"
                          className="input input-bordered"
                          onChange={(e) => setJob(e.target.value)}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="input-group">
                      <span>Address</span>
                      <input
                        type="text"
                        name="address"
                        placeholder="Miami, United States"
                        className="input input-bordered"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </label>
                  </div>
                  <div className="form-control">
                    <p className="pt-3 pb-3">Short Bio</p>
                    <textarea
                      className="textarea textarea-bordered h-24"
                      placeholder="Tell us about yourself"
                      onChange={(e) => {
                        setAbout(e.target.value);
                      }}
                    ></textarea>
                  </div>
                  <div className="divider">Upload Photo</div>
                  <label className="block">
                    <span className="sr-only">Profile Photo</span>
                    <input
                      type="file"
                      className="file-input w-full max-w-xs"
                      onChange={(e) => setPhoto(e.target.files[0])}
                    />
                  </label>
                  <div className="form-control mt-6">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={getUserDetails}
                    >
                      Register
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

export default Register;
