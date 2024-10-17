import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Button, Avatar, Form, Input, Typography } from "antd";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useGetUsersQuery } from "../services/UsersAPI";
import icon from "../images/bing-logo.png";
import PageLoader from "./PageLoader";

const Login = () => {
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const { data: usersData, isFetching: isFetchingUsers } = useGetUsersQuery();

  if (isFetchingUsers) return <PageLoader />;

  const onFinish = async (e) => {
    setIsButtonLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        `${e.username}@binews.tsina`,
        e.password
      );

      const index = usersData?.findIndex(
        (user) => user.username === e.username && user.email === e.password
      );

      if (index >= 0) {
        sessionStorage.setItem(
          "currentUser",
          JSON.stringify({
            id: usersData[index].id,
            name: usersData[index].name,
          })
        );

        setIsButtonLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex align="center" justify="center" className="container">
        <Flex align="center" className="logo-container">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="brand primary-text">
            Binews
          </Typography.Title>
        </Flex>
        <Form
          name="basic"
          style={{ width: "600px", marginTop: "15px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              block
              className="primary"
              htmlType="submit"
              loading={isButtonLoading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Flex>
    </>
  );
};

export default Login;
