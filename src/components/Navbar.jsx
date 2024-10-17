import React from "react";
import { Flex, Typography, Avatar, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import icon from "../images/bing-logo.png";

const Navbar = () => {
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <>
      <Flex align="center" className="logo-container primary">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="brand">
          <Link to="/">Binews</Link>
        </Typography.Title>
      </Flex>
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
