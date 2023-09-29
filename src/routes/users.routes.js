const express = require("express");
const usersRouter = express.Router();
const UserController = require("../controllers/users.controller");

usersRouter.get("/:id", UserController.getUserById);
usersRouter.get("/", UserController.getUsers);

module.exports = usersRouter;
