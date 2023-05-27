import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [msg, setErrormsg] = useState("");
  const [msg1, setErrormsg1] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      setErrormsg("Kindly fill in all the details");
      return;
    }

    if (data.password !== data.confirmpassword) {
      setErrormsg("Password and Confirm Password do not match");
      return;
    }

    try {
      const res = await axios.post(
        "https://notebook-gpjp.onrender.com/api/register",
        data
      );
      setData({});
      setErrormsg("");
      setErrormsg1("Registration done! Go and sign in");
      if (res.data.message === "Registered successfully") {
        navigate("/");
      }
      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.message === "User already exists") {
        setErrormsg("Contact already exists. Please go and sign in");
      }
    }
  };

  return (
    <div className="box1">
      <h4 id="SignUp-Heading">Registration</h4>
      <span id="errMsg-1">{msg}</span>
      <span id="errmessage">{msg1}</span>
      <form id="form">
        <input
          type="email"
          placeholder="Email"
          id="user_email"
          value={data.email || ""}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          id="user_passowrd"
          value={data.password || ""}
          onChange={(e) =>
            setData({ ...data, password: e.target.value, confirmpassword: data.confirmpassword })
          }
          autoComplete="new-password" // Added autocomplete attribute
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          id="user_conPassword"
          value={data.confirmpassword || ""}
          onChange={(e) =>
            setData({ ...data, confirmpassword: e.target.value, password: data.password })
          }
          autoComplete="new-password" // Added autocomplete attribute
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
