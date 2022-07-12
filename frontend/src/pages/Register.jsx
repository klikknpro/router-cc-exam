import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import welcome from "../img/hello-sign-fill.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { register, user } = useAuth();

  useEffect(() => {
    if (user.userId) navigate("/my-routes");
    // eslint-disable-next-line
  }, [user]);

  return (
    <div className="register">
      <div className="register-message">
        <h3>
          Hey! You are brand new here. Enter a username and enjoy! <span>😉</span>
        </h3>
      </div>
      <form>
        <label htmlFor="username">username:</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <button className="register-button" onClick={() => register(username)}>
          register
        </button>
      </form>
      <img src={welcome} alt="hello new user" />
    </div>
  );
};

export default Register;
