import React, { useState } from "react";
import { FileAddOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row } from "antd";
import { usePostArticleMutation } from "../services/NewsArticlesAPI";

const ArticleForm = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [form] = Form.useForm();
  const [postArticle, result] = usePostArticleMutation();

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };
  const closeDrawer = () => {
    form.resetFields();
    setIsDrawerOpen(false);
  };
  const submitArticle = async (e) => {
    const response = await postArticle({
      userId: 1727,
      ...e,
    });

    console.log("Created new article!", response, result);

    closeDrawer();
  };

  return (
    <>
      <Button
        className="primary-success"
        onClick={openDrawer}
        icon={<FileAddOutlined className="primary-success" />}
      >
        Create
      </Button>
      <Drawer
        title="Create a new article"
        width={720}
        onClose={closeDrawer}
        open={isDrawerOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
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
                <Button block className={`primary-success`} htmlType="submit">
                  Create Article
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
