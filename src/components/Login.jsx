import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Avatar, Form, Input, Typography } from "antd";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useGetUsersQuery } from "../services/UsersAPI";
import { setCurrentUser } from "../features/user/userSlice";
import icon from "../images/bing-logo.png";
import PageLoader from "./PageLoader";

const Login = () => {
  const { userAuth } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (userAuth !== null) navigate("/");
  }, [userAuth]);

  const { data: usersData, isFetching: isFetchingUsers } = useGetUsersQuery();

  if (isFetchingUsers) return <PageLoader />;

  const onFinish = async (e) => {
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
        dispatch(setCurrentUser(usersData[index]));
      }
    } catch (error) {
      console.log(error);
    }
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
