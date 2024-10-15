import React from "react";
import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components";
import Homepage from "./components/Homepage";
import Article from "./components/Article";

const App = () => (
  <div className="app">
    <div className="header">
      <Navbar />
    </div>
    <div className="body">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/articles/:articleId" element={<Article />} />
      </Routes>
    </div>
    <div className="footer">
      <Footer />
    </div>
  </div>
);

export default App;
