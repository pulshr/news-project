import React from "react";
import "../styles/NavigationBar.css";

const NavigationBar = ({ categories, onCategoryChange, activeCategory }) => {
  const handleCategoryClick = (category) => {
    onCategoryChange(category);
  };

  return (
    <nav id="navbar" className="navigation-bar">
      <div className="logo">
        <h1>Scaler News</h1>
      </div>
      <div className="category-filters">
        {categories.map((category) => (
          <button
            key={category}
            id={`category-button-${category.toLowerCase()}`}
            className={`category-button ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default NavigationBar;
