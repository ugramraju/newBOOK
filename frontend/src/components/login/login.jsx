import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      setMsg("Please fill all the fields");
      return;
    }
    try {
      const res = await axios.post("http://localhost:8000/api/login", data, {
        withCredentials: true,
      });
      if (res.data.token) {
        // Save the token to local storage or a state management solution
        // Example using local storage:
        localStorage.setItem("token", res.data.token);
        navigate("/displayData");
      } else {
        setMsg("Invalid email or password");
      }
    } catch (error) {
      setMsg("An error occurred");
      console.log(error);
    }
  };

  return (
    <div className="logIn_container">
      <h1>SignIn</h1>
      <span>{msg}</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          id="email"
          placeholder="Enter Email"
          value={data.email || ""}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          id="password"
          placeholder="Enter Password"
          value={data.password || ""}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <br />
        <input type="submit" value="Submit" />
        <br />
        <Link to="/signUp">SignUp?</Link>
      </form>
    </div>
  );
};

export default Login;
