import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ArticlePage.css";

const ArticlePage = ({ articles }) => {
  const { id } = useParams();
  const article = articles.find((article) => article.id === id);

  if (!article) {
    return (
      <div className="article-not-found">
        <h2>Article Not Found</h2>
        <Link to="/" className="back-button">
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div id="news-article-page" className="article-page">
      <Link to="/" id="back-to-homepage" className="back-button">
        &larr; Back to Homepage
      </Link>
      <h1 id="article-title" className="article-title">
        {article.title}
      </h1>
      <div className="article-meta">
        <span className="article-author">By {article.author}</span>
        <span id="article-published-time" className="article-date">
          {article.publicationDate}
        </span>
      </div>
      <div className="article-image-placeholder"></div>
      <div className="article-content">
        <p>{article.content}</p>
      </div>
    </div>
  );
};

export default ArticlePage;
