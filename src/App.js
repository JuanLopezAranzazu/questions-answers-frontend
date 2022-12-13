import React from "react";
import "./App.css";
// wouter
import { Route } from "wouter";
// pages
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login/Login";
import Answers from "./pages/Answers/Answers";
import Profile from "./pages/Profile/Profile";
// redux
import { useSelector } from "react-redux";
import AuthRoute from "./AuthRoute";

const App = () => {
  // redux
  const authUser = useSelector((state) => state.auth);

  return (
    <div>
      <AuthRoute isLogged={authUser.isLogged}>
        <Route path="/" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/answers/:id" component={Answers} />
      </AuthRoute>
      <Route path="/login" component={Login} />
    </div>
  );
};

export default App;
