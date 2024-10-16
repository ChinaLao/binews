import React from "react";
import { Flex, Typography } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Flex
      style={{ height: "100%" }}
      justify="center"
      align="center"
      className="logo-container"
    >
      <Typography.Title level={2}>
        Oops, this page does not exist. Go to{" "}
        <Link
          to="/"
          className="primary-text"
          style={{ textDecoration: "underline" }}
        >
          Home
        </Link>
      </Typography.Title>
    </Flex>
  );
};

export default NotFound;
