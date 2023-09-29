const Users = require("../models/users.model");

const getUserById = (req, res) => {
  const id = 1;
  Users.userById(id)
    .then((results) => console.log("Controller running"))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving user data from database");
    });
};

const getUsers = (req, res) => {
  const body = req.body;
  Users.getAllUsers(body)
    .then((results) => console.log(results))
    .catch((err) => console.error(err));
};

module.exports = {
  getUserById,
  getUsers,
};
