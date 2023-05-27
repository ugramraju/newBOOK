import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch("https://notebook-gpjp.onrender.com/api/profile", {
      headers: {
        "x-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          // User not found or server error occurred
          console.log(data.message);
        } else {
          setUserData(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <>
      <h1>
        Welcome <button onClick={handleLogoutClick}>Logout</button>
      </h1>
      <Link to="/formData">
        <input type="button" value="Add Note" />
      </Link>
      {userData && <div>{userData.email.split("@")[0]}</div>}
    </>
  );
};

export default Home;
