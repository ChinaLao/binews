import React from "react";
import "./App.css";

import { Navbar, Footer } from "./components";

const App = () => (
  <div className="app">
    <div className="header">
      <Navbar />
    </div>
    <div className="body"></div>
    <div className="footer">
      <Footer />
    </div>
  </div>
);

export default App;
