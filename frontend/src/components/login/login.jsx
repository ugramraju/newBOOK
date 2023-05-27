import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrorMsg("Please fill in all the fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://notebook-gpjp.onrender.com/api/login",
        formData,
        { withCredentials: true }
      );
      console.log(response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        history.push("/home");
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
    <div className="box2">
      <h4 id="Login-Heading">Login</h4>
      {errorMsg && <span id="errMsg-2">{errorMsg}</span>}
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
        <button type="submit" id="btn">
          LOGIN
        </button>
      </form>
      <span id="signup-btn">
        <Link to="/signup">Create an account</Link>
      </span>
    </div>
  );
};

export default Login;
