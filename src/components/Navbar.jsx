import React from "react";
import { Typography, Avatar, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import icon from "../images/bing-logo.png";

const Navbar = () => (
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
    >
      Log out
    </Button>
  </>
);

export default Navbar;
