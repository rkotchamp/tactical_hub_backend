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
    .query("SELECT * from users WHERE email=?", [email])
    .then(([results]) => results)
    .catch((err) => console.error("Error executing the SQL query:", err));
};

const editUser = (data, user_id) => {
  return database
    .query("UPDATE users SET? WHERE id=?", [data, user_id])
    .then(([results]) => results)
    .catch((err) => console.error("Error executing the SQL query:", err));
};

module.exports = {
  userById,
  getAllUsers,
  createNewUser,
  findByEmail,
  findUserToLogin,
  editUser,
};
