import React from "react";
import { Typography, Avatar, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import icon from "../images/bing-logo.png";

const Navbar = () => (
  <>
    <div className="container primary">
      <Avatar src={icon} size="large" />
      <Typography.Title level={2} className="brand primary">
        Binews
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
