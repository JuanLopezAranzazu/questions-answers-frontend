import React from "react";
import "./Header.css";
// router
import { Link } from "wouter";
// redux
import { useDispatch } from "react-redux";

const options = [
  { text: "Home", url: "/" },
  { text: "Profile", url: "/profile" },
];

const Header = ({ isLogged }) => {
  // redux
  const dispatch = useDispatch();

  return (
    <header className="header">
      <h1>System</h1>
      <div className="options-header">
        {options.map((item, index) => {
          return (
            <Link className="btn btn-primary" key={index} href={item.url}>
              {item.text}
            </Link>
          );
        })}
        {isLogged && (
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: "LOGOUT" })}
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
