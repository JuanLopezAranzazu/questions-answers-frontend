import React from "react";
import "./Question.css";
// router
import { useLocation } from "wouter";

const Question = ({ id, title, description, user }) => {
  // router
  const [location, setLocation] = useLocation();

  return (
    <div className="question" onClick={() => setLocation(`/answers/${id}`)}>
      <div className="title">
        <h2>{title.toUpperCase()}</h2>
        <p>{user?.username}</p>
      </div>
      <div className="description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Question;
