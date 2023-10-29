const express = require("express");
const articleRouter = express.Router();
const { verifyToken } = require("../middlewares/users.middleware");

const ArticleController = require("../controllers/articles.controller");

articleRouter.get("/", ArticleController.getAllArticles);
articleRouter.post("/", verifyToken, ArticleController.createPostArticle);

module.exports = articleRouter;
