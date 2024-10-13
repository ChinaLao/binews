import React from "react";
import { Typography, Avatar } from "antd";
import icon from "../images/bing-logo.png";

const Navbar = () => (
  <>
    <div className="logo-container">
      <Avatar src={icon} size="large" />
      <Typography.Title level={2} className="logo">
        Binews
      </Typography.Title>
    </div>
  </>
);
export default Navbar;
