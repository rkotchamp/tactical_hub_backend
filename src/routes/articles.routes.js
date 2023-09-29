const express = require("express");
const articleRouter = express.Router();

const ArticleController = require("../controllers/articles.controller");

articleRouter.get("/", ArticleController.getAllArticles);

module.exports = articleRouter;
