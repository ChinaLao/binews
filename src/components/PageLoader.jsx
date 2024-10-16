import React from "react";
import { Flex, Spin } from "antd";

const PageLoader = () => {
  return (
    <Flex style={{ height: "100%" }} justify="center" align="center">
      <Spin size="large" />
    </Flex>
  );
};

export default PageLoader;
