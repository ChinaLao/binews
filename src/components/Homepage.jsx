import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Row, Col, Card, Avatar, Image, Input } from "antd";
import { CommentOutlined } from "@ant-design/icons";
import ArticleForm from "./ArticleForm";
import {
  useGetArticlesQuery,
  useGetCommentsQuery,
  useGetAuthorsQuery,
} from "../services/NewsArticlesAPI";
import { initialize } from "../features/articles/articlesSlice";
import PageLoader from "./PageLoader";

const fallbackImage =
  "data:image/png;base64,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";

const { Title, Text } = Typography;

const Homepage = () => {
  const { data: articleData, isFetching: isFetchingArticles } =
    useGetArticlesQuery();
  const { data: comments, isFetching: isFetchingComments } =
    useGetCommentsQuery();
  const { data: authors, isFetching: isFetchingAuthors } = useGetAuthorsQuery();

  const { articles } = useSelector((store) => store.articles);
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState(null);
  const [articleList, setArticleList] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCurrentUser(JSON.parse(sessionStorage.getItem("currentUser")));
  }, []);

  useEffect(() => {
    const mappedArticles = articleData?.map((article) => {
      return {
        ...article,
        comments: comments?.filter((comment) => comment.postId === article.id),
        author: authors
          ? authors[
              authors?.findIndex((author) => author.id === article.userId)
            ]
          : { name: "Unknown Author" },
      };
    });

    setArticleList(mappedArticles);
  }, [articleData, comments, authors]);

  useEffect(() => {
    const term = searchTerm.toLowerCase();
    const filteredData = articleList?.filter(
      (article) =>
        article.title.toLowerCase().includes(term) ||
        article.body.toLowerCase().includes(term) ||
        article?.author?.name.toLowerCase().includes(term)
    );

    dispatch(initialize(filteredData));
  }, [articleList, searchTerm]);

  if (isFetchingArticles || isFetchingComments || isFetchingAuthors)
    return <PageLoader />;

  return (
    <>
      <Row style={{ marginBottom: "15px" }}>
        <Avatar
          src={`https://avatar.iran.liara.run/username?username=${currentUser?.name}`}
          size="large"
        />
        <Title
          level={2}
          className="primary-text"
          style={{ marginLeft: "15px" }}
        >
          Hi, {currentUser?.name}
        </Title>
      </Row>
      <div className="article-detail-container">
        <Input
          placeholder="Search for an article..."
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px", marginRight: "15px" }}
        />
        <ArticleForm type="Add" />
      </div>
      <Row gutter={[24, 24]}>
        {articles?.map((article) => (
          <Col xs={24} sm={12} lg={8} key={article.id}>
            <Card hoverable className="article-card">
              <a href={`/articles/${article.id}`}>
                <div className="article-container">
                  <Title className="article-title" level={4}>
                    {article.title}
                  </Title>
                  <Image
                    width={100}
                    height={100}
                    src={`https://unsplash.it/150?image=${article.id}`}
                    alt="article"
                    fallback={fallbackImage}
                    preview={false}
                  />
                </div>
                <div className="article-detail-container">
                  <div>
                    <Avatar
                      src={`https://avatar.iran.liara.run/username?username=${article?.author?.name}`}
                    />
                    <Text className="detail">{article?.author?.name}</Text>
                  </div>
                  <div className="article-detail-container">
                    <CommentOutlined
                      style={{
                        fontSize: "20px",
                      }}
                      className="primary-text"
                    />
                    <Text className="detail">{article?.comments?.length}</Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Homepage;
