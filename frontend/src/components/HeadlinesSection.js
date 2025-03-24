import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/HeadlinesSection.css";

const HeadlinesSection = ({ articles }) => {
  const scrollRef = useRef(null);

  // Sort articles by publication date (five most recent first)
  const sortedArticles = [...articles]
    .sort((a, b) => {
      return new Date(b.publicationDate) - new Date(a.publicationDate);
    })
    .slice(0, 5);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section id="headlines-section" className="headlines-section">
      <h2>Latest Headlines</h2>
      <div className="headlines-container">
        <button id="scroll-left" className="scroll-button" onClick={scrollLeft}>
          &lt;
        </button>
        <div className="headlines-scroll" ref={scrollRef}>
          {sortedArticles.map((article) => (
            <Link
              to={`/article/${article.id}`}
              key={article.id}
              className="headline-item"
            >
              <h3>{article.title}</h3>
              <p className="headline-category">{article.category}</p>
              <p className="headline-date">
                {new Date(article.publicationDate).toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
        <button
          id="scroll-right"
          className="scroll-button"
          onClick={scrollRight}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default HeadlinesSection;
