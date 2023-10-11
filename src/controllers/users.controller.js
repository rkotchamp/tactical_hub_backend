const Users = require("../models/users.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

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
    .then((results) => results)
    .catch((err) => console.error(err));
};

const createNewUser = (req, res) => {
  Users.createNewUser(req.body)
    .then((results) => {
      if (results.affectedRows > 0) {
        res.status(201).json({
          userEmail: req.body.email,
          userId: results.insertId,
          message: "User created successfully",
        });
      } else {
        res.status(422).send("Unprocessable Entity");
      }
    })
    .catch((err) => {
      console.error(err);
      res.send(500).send("Error creating user");
    });
};

const loginUser = (req, res) => {
  // Users.findUserToLogin(req.body);
  if (req.user !== null && Object.keys(req.user).length > 0) {
    const { id, email } = req.user;
    const token = jwt.sign(
      { userId: id, email: email },
      process.env.PRIVATE_KEY
    );
    console.log(token);
    // res.status(200).send(req.user);
  } else {
    res.status(404).send("Invalid credentials");
  }
};

const editUserController = (req, res) => {
  const user_id = Number(req.params.id);
  const { body } = req;
  Users.editUser(body, user_id)
    .then((results) => {
      if (results.affectedRows > 0) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
module.exports = {
  getUserById,
  getUsers,
  createNewUser,
  loginUser,
  editUserController,
};
