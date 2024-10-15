import React from "react";
import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Navbar, Homepage, Article, Login, Footer } from "./components";

const App = () => {
  const { currentUser } = useSelector((store) => store.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) navigate("/login");
  }, [currentUser]);

  return (
    <div className="app">
      {currentUser !== null && (
        <div className="header">
          <Navbar />
        </div>
      )}

      <div className={currentUser !== null ? "body" : "login"}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/articles/:articleId" element={<Article />} />
        </Routes>
      </div>

      {currentUser !== null && (
        <div className="footer">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default App;
