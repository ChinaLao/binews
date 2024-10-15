import React from "react";
import { Button, Avatar, Form, Input, Typography } from "antd";
import icon from "../images/bing-logo.png";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [form] = Form.useForm();

  const onFinish = async (e) => {
    try {
      await signInWithEmailAndPassword(
        auth,
        `${e.username}@binews.tsina`,
        e.password
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <div className="container">
        <div className="logo-container">
          <Avatar src={icon} size="large" />
          <Typography.Title level={2} className="brand primary-text">
            Binews
          </Typography.Title>
        </div>
        <Form
          name="basic"
          style={{ width: "600px", marginTop: "15px" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <Button block className="primary" htmlType="submit">
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
