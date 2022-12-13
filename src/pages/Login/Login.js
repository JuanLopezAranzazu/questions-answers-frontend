import React, { useState } from "react";
import "./Login.css";
import { apiURL } from "./../../utils/constants";
// redux
import { useDispatch } from "react-redux";
// router
import { useLocation } from "wouter";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  // redux
  const dispatch = useDispatch();
  const [location, setLocation] = useLocation();

  const onChange = ({ target: { name, value } }) => {
    setCredentials({ ...credentials, [name]: value });
  };
  
  const onSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    fetch(`${apiURL}/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        dispatch({ type: "LOGIN", payload: actualData });
        setLocation("/");
      });
  };

  return (
    <div className="login">
      <form className="form-login" onSubmit={onSubmit}>
        <h2>Please sign-in to your account and start the adventure</h2>
        <input
          type="text"
          name="username"
          placeholder="Enter your username..."
          value={credentials.username}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password..."
          value={credentials.password}
          onChange={onChange}
        />
        <input className="btn btn-primary" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
