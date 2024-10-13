import React from "react";
import "./App.css";

import { Navbar, Footer } from "./components";
import Homepage from "./components/Homepage";

const App = () => (
  <div className="app">
    <div className="header">
      <Navbar />
    </div>
    <div className="body">
      <Homepage />
    </div>
    <div className="footer">
      <Footer />
    </div>
  </div>
);

export default App;
