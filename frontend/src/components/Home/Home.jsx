import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    <div className="box3">
      <h4 id="Welcome-Heading">Welcome!</h4>
      <p id="email">{localStorage.getItem("email")}</p>
      <button type="button" id="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <Link to="/displaydata">Display Data</Link>
    </div>
  );
};

export default Home;
