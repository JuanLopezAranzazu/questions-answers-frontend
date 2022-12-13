import React from "react";
import "./Response.css";

const Response = ({ text, user }) => {
  return (
    <div className="response">
      <div className="text">
        <h2>{text}</h2>
        <p>{user?.username}</p>
      </div>
    </div>
  );
};

export default Response;
