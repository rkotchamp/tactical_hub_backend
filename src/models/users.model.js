const database = require("../database/database-config");

//  Get all users

const userById = (id) => {
  return database
    .query("SELECT * FROM users WHERE id=?", id)
    .then(([resUsers]) => console.log(resUsers));
};
const getAllUsers = (body) => {
  return database
    .query("SELECT * FROM users")
    .then((results) => console.log(results));
};

module.exports = {
  userById,
  getAllUsers,
};
