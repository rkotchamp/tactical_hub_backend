const ArticlesModels = require("../models/articles.models");

const getAllArticles = (req, res) => {
  const body = req.body;
  ArticlesModels.getArticles()
    .then(() => console, log("controller is running for articles"))
    .catch((err) => console.error(err));
};

module.exports = {
  getAllArticles,
};
