const express = require("express");
const app = express();
app.use(express.json());

let articles = [
  {
    id: 1,
    title: "Understanding JavaScript",
    content:
      "JavaScript is a versatile language used for both frontend and backend development.",
  },
  {
    id: 2,
    title: "Introduction to React",
    content:
      "React is a popular JavaScript library for building user interfaces.",
  },
];

let authors = [
  {
    id: 1,
    name: "John Doe",
    articleId: 1,
  },
  {
    id: 2,
    name: "Jane Smith",
    articleId: 2,
  },
];

async function validateArticle(article) {
  if (!article.title || typeof article.title !== "string") {
    return "title is required and should be string";
  }

  if (!article.content || typeof article.content !== "string") {
    return "content is required and should be string";
  }
  return null;
}

app.post("/articles", async (req, res) => {
  let error = await validateArticle(req.body);
  if (error) return res.status(400).json(error);

  let article = { id: articles.length + 1, ...req.body };
  articles.push(article);
  res.status(201).json(article);
});

async function validateAuthor(author) {
  if (!author.name || typeof author.name !== "string") {
    return "name is required and should be string";
  }
  if (!author.articleId || typeof author.articleId !== "number") {
    return "articleId is required and should be Integer";
  }
  return null;
}

app.post("/authors", async (req, res) => {
  let error = await validateAuthor(req.body);
  if (error) return res.status(400).json(error);

  let author = { id: authors.length + 1, ...req.body };
  authors.push(author);
  res.status(201).json(author);
});

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });

module.exports = { app, validateArticle, validateAuthor };
