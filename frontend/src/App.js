import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HeadlinesSection from "./components/HeadlinesSection";
import FeaturedArticles from "./components/FeaturedArticles";
import CategoryNews from "./components/CategoryNews";
import ArticlePage from "./components/ArticlePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useMemo } from "react";
import "./App.css";

const App = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/articles");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  // Extract unique categories from news data
  const categories = useMemo(() => {
    return [...new Set(articles.map((article) => article.category))];
  }, [articles]);

  const [activeCategory, setActiveCategory] = useState(() => {
    return categories.includes("World") ? "World" : categories[0] || "World";
  });

  useEffect(() => {
    // Log all article IDs in the active category
    const articlesInCategory = articles.filter(
      (article) => article.category === activeCategory
    );
    console.log(
      "Articles in category:",
      articlesInCategory.map((a) => a.id)
    );
  }, [activeCategory, articles, categories]);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/login"
            element={
              <Login onLogin={(data) => console.log("Logged in:", data)} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <>
                <NavigationBar
                  categories={categories}
                  onCategoryChange={handleCategoryChange}
                  activeCategory={activeCategory}
                />
                <main className="main-content">
                  <HeadlinesSection articles={articles} />
                  <FeaturedArticles articles={articles} />
                  <CategoryNews
                    articles={articles}
                    selectedCategory={activeCategory}
                  />
                </main>
              </>
            }
          />
          <Route
            path="/article/:id"
            element={<ArticlePage articles={articles} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
