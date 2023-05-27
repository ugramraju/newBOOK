import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setErrorMsg("Kindly fill in all the details.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setErrorMsg("Password and Confirm Password do not match.");
      return;
    }

    try {
      const res = await axios.post(
        "https://new-ouln.onrender.com/api/register",
        data
      );
      setData({});
      setErrorMsg("");
      setSuccessMsg("Registration Successful! Please proceed to Sign In.");
      if (res.data.message === "Registered successfully") {
        navigate("/");
      }
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "User already exists") {
        setErrorMsg("User already exists. Please go and sign in.");
      }
    }
  };

  return (
    <div className="box1">
      <h4 id="SignUp-Heading">Registration</h4>
      <span id="errMsg-1">{errorMsg}</span>
      <span id="errmessage">{successMsg}</span>
      <form id="form">
        <input
          type="email"
          placeholder="Email"
          id="user_email"
          value={data.email || ""}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          autoComplete="on"
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          id="user_password"
          value={data.password || ""}
          onChange={(e) => setData({ ...data, password: e.target.value })}
          autoComplete="on"
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          id="user_confirmPassword"
          value={data.confirmPassword || ""}
          onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
          autoComplete="on"
        />
        <br />
        <button type="submit" id="btn" onClick={handleSubmit}>
          REGISTER
        </button>
      </form>
      <i className="fa-thin fa-arrow-left-long"></i>

      <span id="signin-btn">
        <Link to="/">SignIn</Link>
      </span>
    </div>
  );
};

export default SignUp;
