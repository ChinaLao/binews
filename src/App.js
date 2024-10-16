import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { Navbar, Homepage, Article, Login, Footer } from "./components";
import { auth } from "./firebase";
import { setUserAuth } from "./features/user/userSlice";
import { ConfigProvider } from "antd";
import "./App.css";
import NotFound from "./components/NotFound";

const App = () => {
  const { userAuth } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = {
    token: {
      colorPrimary: "#001529",
      colorTextBase: "#151515",
      colorBgContainer: "#fcfdff",
    },
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        dispatch(setUserAuth(user.email));
      } else {
        dispatch(setUserAuth(null));
        navigate("/login");
      }
    });
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <div className="app">
        {userAuth !== null && (
          <div className="header">
            <Navbar />
          </div>
        )}

        <div className={userAuth !== null ? "body" : "login"}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Homepage />} />
            <Route path="/articles/:articleId" element={<Article />} />
          </Routes>
        </div>

        {userAuth !== null && (
          <div className="footer">
            <Footer />
          </div>
        )}
      </div>
    </ConfigProvider>
  );
};

export default App;
