const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const SECRET_KEY = "your_secret_key";

let users = [];
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

app.post("/api/register", (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ error: "Username, password, and role are required" });
  }

  const userExists = users.find((user) => user.username === username);
  if (userExists) {
    return res.status(400).json({ error: "User already exists" });
  }

  users.push({ username, password, role });
  res.status(201).json({ message: "User registered successfully" });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ token, role: user.role });
});

app.get("/api/dev/generate-token", (req, res) => {
  const token = jwt.sign({ username: "adminUser", role: "admin" }, SECRET_KEY, {
    expiresIn: "1h",
  });
  res.json({ token });
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Access denied" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

app.get("/api/articles", (req, res) => {
  res.json(articles);
});

app.get("/api/articles/:id", (req, res) => {
  const article = articles.find((a) => a.id === req.params.id);
  if (article) res.json(article);
  else res.status(404).json({ error: "Article not found" });
});

app.post("/api/articles", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  const newArticle = req.body;
  if (!newArticle.id) {
    return res.status(400).json({ error: "Article must have an ID" });
  }
  articles.push(newArticle);
  res.status(201).json(newArticle);
});

app.patch("/api/articles/:id", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

  const index = articles.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Article not found" });
  }
  articles[index] = { ...articles[index], ...req.body };
  res.json(articles[index]);
});

app.delete("/api/articles/:id", authenticateToken, (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Access denied. Admins only." });
  }

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
