const database = require("../database/database-config");

const getArticles = () => {
  return database
    .query("SELECT * FROM articles")
    .then((results) => console.log(results));
};

module.exports = {
  getArticles,
};
