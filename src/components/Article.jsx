import React, { useState, useEffect } from "react";
import HTMLReactParser from "html-react-parser/lib/index";
import { useParams } from "react-router-dom";
import { Typography, Card, Avatar, Col, Divider } from "antd";
import {
  useGetArticlesQuery,
  useGetCommentsQuery,
  useGetAuthorsQuery,
} from "../services/NewsArticlesAPI";

const { Title, Text } = Typography;

const Article = () => {
  const { articleId } = useParams();
  const { data: articleData, isFetching: isFetchingArticles } =
    useGetArticlesQuery(articleId);
  const { data: comments, isFetching: isFetchingComments } =
    useGetCommentsQuery();
  const { data: authors, isFetching: isFetchingAuthors } = useGetAuthorsQuery();

  const [article, setArticle] = useState();

  useEffect(() => {
    setArticle({
      ...articleData,
      comments: comments?.filter(
        (comment) => comment.postId === articleData?.id
      ),
      author: authors
        ? authors[
            authors?.findIndex((author) => author.id === articleData?.userId)
          ]
        : { name: "Unknown Author" },
    });
  }, [articleData, comments, authors]);

  if (isFetchingArticles || isFetchingComments || isFetchingAuthors)
    return "Loading...";

  return (
    <>
      <div className="article-display-container">
        <Card className="article-display">
          <Title level={2} className="primary-title">
            {article?.title}
          </Title>
          <Title level={5} className="primary-subtitle">
            written by: {article?.author?.name}
          </Title>
          <p className="article-body">{article?.body}</p>

          <div className="comments-container">
            <Divider>
              <Title level={5}>Comments</Title>
            </Divider>

            {article?.comments?.map((comment) => (
              <div className="comment">
                <Col>
                  <Avatar src={`https://unsplash.it/100?image=${comment.id}`} />
                  <Text className="detail">{comment.email}</Text>
                </Col>
                <Text>{comment.body}</Text>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
};

export default Article;
