import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FileAddOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Form, Input, Row } from "antd";
import {
  usePostArticleMutation,
  usePutArticleMutation,
} from "../services/NewsArticlesAPI";
import { addArticle } from "../features/articles/articlesSlice";

const ArticleForm = (props) => {
  const { selectedArticle } = useSelector((store) => store.articles);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [postArticle] = usePostArticleMutation();
  const [putArticle] = usePutArticleMutation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
    setIsDrawerOpen(false);
  };
  const submitArticle = async (e) => {
    if (props.type === "Add") {
      const response = await postArticle({
        userId: 1727,
        ...e,
      });

      console.log("Created new article!", response.data);

      dispatch(addArticle(response.data));
    } else {
      console.log(selectedArticle.id);

      const response = await putArticle({
        id: selectedArticle.id,
        ...e,
        userId: 1727,
      });

      console.log(`Updated article ID ${selectedArticle.id}!`, response.data);
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
