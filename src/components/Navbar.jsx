import React from "react";
import { useDispatch } from "react-redux";
import { Typography, Avatar, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { clearCurrentUser } from "../features/user/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import icon from "../images/bing-logo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = async () => {
    await signOut(auth);
    dispatch(clearCurrentUser());
    navigate("/login");
  };

  return (
    <>
      <div className="logo-container primary">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="brand">
          <Link to="/">Binews</Link>
        </Typography.Title>
      </div>
      <Button
        type="primary"
        className="primary-error"
        icon={<LogoutOutlined className="primary-error" />}
        onClick={logout}
      >
        Log out
      </Button>
    </>
  );
};

export default Navbar;
