const database = require("../database/database-config");

const getArticles = () => {
  return database.query("SELECT * FROM articles").then(([results]) => results);
};

const createPost = (body) => {
  return database
    .query("INSERT INTO articles SET?", body)
    .then(([results]) => results)
    .catch((err) => console.error(err));
};

module.exports = {
  getArticles,
  createPost,
};
