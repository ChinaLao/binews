import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FileAddOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row } from "antd";
import {
  usePostArticleMutation,
  usePutArticleMutation,
} from "../services/NewsArticlesAPI";
import { addArticle, editArticle } from "../features/articles/articlesSlice";

const ArticleForm = (props) => {
  const { selectedArticle } = useSelector((store) => store.articles);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [postArticle] = usePostArticleMutation();
  const [putArticle] = usePutArticleMutation();
  const [currentUser, setCurrentUser] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);

  useEffect(() => {
    setCurrentUser(JSON.parse(sessionStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    if (props.type === "Edit") {
      form.setFieldValue("title", selectedArticle.title);
      form.setFieldValue("body", selectedArticle.body);
    }
  }, [selectedArticle]);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    form.resetFields();
    setIsButtonLoading(false);
    setIsDrawerOpen(false);
  };
  const submitArticle = async (e) => {
    setIsButtonLoading(true);
    if (props.type === "Add") {
      const response = await postArticle({
        userId: currentUser?.id,
        title: e.title,
        body: e.body,
      });

      console.log("Created new article!", response.data);

      dispatch(addArticle(response.data));
    } else {
      const response = await putArticle({
        id: selectedArticle.id,
        title: e.title,
        body: e.body,
        userId: currentUser?.id,
      });

      console.log(`Updated article ID ${selectedArticle.id}!`, response.data);

      dispatch(editArticle(response.data));
    }

    closeDrawer();
  };

  return (
    <>
      <Button
        className="primary-success"
        onClick={openDrawer}
        icon={
          props.type === "Add" ? (
            <FileAddOutlined className="primary-success" />
          ) : (
            <EditOutlined className="primary-success" />
          )
        }
      >
        {props.type}
      </Button>
      <Drawer
        forceRender
        title={`${props.type} article`}
        width={720}
        onClose={closeDrawer}
        open={isDrawerOpen}
      >
        <Form layout="vertical" onFinish={submitArticle} form={form}>
          <Row>
            <Col span={24}>
              <Form.Item
                name="title"
                label="Title"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="Please enter title" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item
                name="body"
                label="Body"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea rows={8} placeholder="please enter body" />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24}>
              <Form.Item>
                <Button
                  block
                  className={`primary-success`}
                  htmlType="submit"
                  loading={isButtonLoading}
                >
                  {`${props.type} Article`}
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default ArticleForm;
