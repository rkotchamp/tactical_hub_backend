const ArticlesModels = require("../models/articles.models");

const getAllArticles = (req, res) => {
  ArticlesModels.getArticles()
    .then((results) => {
      if (results.length > 0 && results !== null) {
        res.status(200).send(results);
      } else {
        res.status(404).send("No posts");
      }
    })
    .catch((err) => {
      console.error(err);
      res.send(500).send("Error retrieving posts");
    });
};

const createPostArticle = (req, res) => {
  delete req.body.email;
  const body = req.body;
  console.log(body);
  body.user_id = req.userId;
  ArticlesModels.createPost(body)
    .then((results) => {
      if (results.affectedRows > 0) {
        res.status(200).send("post successfully created");
      } else {
        res.status(500).send("Failed create post");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("An error occurred while creating post");
    });
};

module.exports = {
  getAllArticles,
  createPostArticle,
};
