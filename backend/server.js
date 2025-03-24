// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory article store
let articles = [
  {
    id: "article-001",
    title: "Global Markets Show Signs of Recovery",
    summary: "Stock markets around the world see an unexpected upturn.",
    content: "Global markets are rebounding as investors regain confidence...",
    category: "Business",
    author: "John Doe",
    publicationDate: "2025-03-03 23:15:00",
    isFeatured: true,
  },
  {
    id: "article-002",
    title: "Breakthrough in AI Technology Announced",
    summary: "New AI model surpasses human capabilities in key areas.",
    content: "A major AI breakthrough was revealed by leading researchers...",
    category: "Technology",
    author: "Jane Smith",
    publicationDate: "2025-03-02 15:45:00",
    isFeatured: true,
  },
  {
    id: "article-003",
    title: "World Leaders Meet for Climate Summit",
    summary: "Leaders discuss new policies to combat climate change.",
    content: "World leaders convene to address pressing climate concerns...",
    category: "World",
    author: "Alice Johnson",
    publicationDate: "2025-03-01 08:20:00",
    isFeatured: false,
  },
  {
    id: "article-004",
    title: "Major Upset in the Football Championship",
    summary: "Underdogs claim victory in a dramatic final match.",
    content: "The championship saw an unexpected turn of events...",
    category: "Sports",
    author: "Bob Williams",
    publicationDate: "2025-03-03 21:00:00",
    isFeatured: false,
  },
  {
    id: "article-005",
    title: "Hollywood's Biggest Night: Oscars 2025",
    summary: "The most glamorous night in Hollywood unveiled its winners.",
    content: "The Oscars 2025 celebrated outstanding performances...",
    category: "Entertainment",
    author: "Emma Brown",
    publicationDate: "2025-03-03 23:15:00",
    isFeatured: true,
  },
];

// Routes
app.get("/api/articles", (req, res) => {
  res.json(articles);
});

app.get("/api/articles/:id", (req, res) => {
  const article = articles.find((a) => a.id === req.params.id);
  if (article) res.json(article);
  else res.status(404).json({ error: "Article not found" });
});

app.post("/api/articles", (req, res) => {
  const newArticle = req.body;
  if (!newArticle.id) {
    return res.status(400).json({ error: "Article must have an ID" });
  }
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

app.patch("/api/articles/:id", (req, res) => {
  const index = articles.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Article not found" });
  }
  articles[index] = { ...articles[index], ...req.body };
  res.json(articles[index]);
});

app.delete("/api/articles/:id", (req, res) => {
  const index = articles.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Article not found" });
  }
  const deleted = articles.splice(index, 1);
  res.json(deleted[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
