import React from "react";
import { Typography } from "antd";
import { CopyrightOutlined } from "@ant-design/icons";

const Footer = () => (
  <>
    <CopyrightOutlined className="primary" />
    <Typography.Title level={5} className="brand primary">
      2024 China Marie Lao
    </Typography.Title>
  </>
);

export default Footer;
