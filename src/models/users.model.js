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

const createNewUser = (user) => {
  return database
    .query("INSERT INTO users SET?", user)
    .then(([results]) => results);
};

const findByEmail = (email) => {
  return database
    .query("SELECT email from users WHERE email=?", email)
    .then(([results]) => results);
};

const findUserToLogin = (email) => {
  return database
    .query("SELECT *  from users WHERE email=?", email)
    .then(([results]) => results);
};

module.exports = {
  userById,
  getAllUsers,
  createNewUser,
  findByEmail,
  findUserToLogin,
};
