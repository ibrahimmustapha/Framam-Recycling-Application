import React, { useState } from "react";
import axios from "axios";

const RedeemPoints = () => {
  const uid = localStorage.getItem("uid");
  const [token, setToken] = useState("");

  // redeem points from token
  const redeemPoints = async () => {
    await axios
      .put(`http://localhost:3000/api/v1/get_reward/${uid}/${token}`, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="form-control">
        <div className="input-group">
          <input
            type="text"
            placeholder="Enter token to redeem points"
            className="input input-bordered max-w-xs"
            onChange={(e) => setToken(e.target.value)}
          />
          <button className="btn secondary" onClick={redeemPoints}>
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
};

export default RedeemPoints;
