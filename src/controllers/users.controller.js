const Users = require("../models/users.model");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  Users.userById(id)
    .then((results) => {
      if (results !== null && results.length > 0) {
        res.status(200).send(results);
      } else {
        res.status(404).send(`user with the id: ${id} not found`);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving user data from database");
    });
};

const getUsersInfo = (req, res) => {
  console.log("Req body", req.body);
  const { email } = req.body;
  Users.findUserToLogin(email)
    .then((results) => {
      console.log("results", results);
      if (results[0] !== null && results[0].email === email) {
        delete results[0].hashed_password;
        res.status(200).send(results[0]);
      } else {
        res.status(404).send("User not found with the email" + email);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving user data from database");
    });
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
    // console.log(token);
    res.status(200).send({ message: "Success", token: token });
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
  getUsersInfo,
  createNewUser,
  loginUser,
  editUserController,
};
