import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const SignUp = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setErrorMsg("Please fill in all the details");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Password and Confirm Password do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://notebook-gpjp.onrender.com/api/register",
        formData
      );
      console.log(response.data);

      if (response.data.message === "Registered successfully") {
        history.push("/login");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
      console.log(error);
    }
  };

  return (
    <div className="box1">
      <h4 id="SignUp-Heading">Registration</h4>
      {errorMsg && <span id="errMsg-1">{errorMsg}</span>}
      <form id="form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          id="user_email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          id="user_password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Confirm Password"
          id="user_confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <br />
        <button type="submit" id="btn">
          REGISTER
        </button>
      </form>
      <span id="signin-btn">
        <Link to="/login">SignIn</Link>
      </span>
    </div>
  );
};

export default SignUp;
