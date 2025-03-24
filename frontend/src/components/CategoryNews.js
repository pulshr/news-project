import React from "react";
import { Link } from "react-router-dom";
import "../styles/CategoryNews.css";

// Filter articles by the selected category
const CategoryNews = ({ articles, selectedCategory }) => {
  const filteredArticles = articles.filter(
    (article) => article.category === selectedCategory
  );

  return (
    <section id="category-news" className="category-news">
      <h2>{selectedCategory} News</h2>
      {filteredArticles.length === 0 ? (
        <p className="no-articles">No articles available in this category.</p>
      ) : (
        <div className="category-news-container">
          {filteredArticles.map((article) => (
            <div
              key={article.id}
              id={`category-news-${article.id}`}
              className="category-news-card"
            >
              <div className="article-image-placeholder"></div>
              <div className="article-content">
                <h3>{article.title}</h3>
                <p id="article-category" className="article-category">
                  {article.category}
                </p>
                <p className="article-summary">{article.summary}</p>
                <Link
                  to={`/article/${article.id}`}
                  id={`news-readmore-${article.id}`}
                  className="read-more-button"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryNews;
