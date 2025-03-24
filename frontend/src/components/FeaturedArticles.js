import React from "react";
import { Link } from "react-router-dom";
import "../styles/FeaturedArticles.css";

const FeaturedArticles = ({ articles }) => {
  // Filter articles where isFeatured is true
  const featuredArticles = articles.filter((article) => article.isFeatured);

  return (
    <section id="featured-articles" className="featured-articles">
      <h2>Featured Stories</h2>
      <div className="featured-articles-container">
        {featuredArticles.map((article) => (
          <Link
            to={`/article/${article.id}`}
            key={article.id}
            id={`featured-article-${article.id}`}
            className="featured-article-card"
          >
            <div className="featured-article-content">
              <h3>{article.title}</h3>
              <p className="featured-article-summary">{article.summary}</p>
              <p className="featured-article-date">
                {new Date(article.publicationDate).toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedArticles;
