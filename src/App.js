import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Flex } from "antd";
import { Navbar, Homepage, Article, Login, Footer } from "./components";
import { ConfigProvider } from "antd";
import "./App.css";
import NotFound from "./components/NotFound";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = {
    token: {
      colorPrimary: "#001529",
      colorTextBase: "#151515",
      colorBgContainer: "#fcfdff",
    },
  };

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(JSON.parse(sessionStorage.getItem("currentUser")));
    if (currentUser === null) navigate("/login");
    else if (currentUser === undefined) sessionStorage.clear();
  }, [currentUser]);

  return (
    <ConfigProvider theme={theme}>
      <div className="app">
        {(location.pathname === "/" ||
          location.pathname.includes("articles/")) && (
          <Flex align="center" justify="space-between" className="header">
            <Navbar />
          </Flex>
        )}

        <div
          className={
            location.pathname === "/" || location.pathname.includes("articles/")
              ? "body"
              : "login"
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/articles/:articleId" element={<Article />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        {(location.pathname === "/" ||
          location.pathname.includes("articles/")) && (
          <Flex justify="center" className="footer">
            <Footer />
          </Flex>
        )}
      </div>
    </ConfigProvider>
  );
};

export default App;
