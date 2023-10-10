const express = require("express");
const usersRouter = express.Router();
const UserController = require("../controllers/users.controller");
const {
  verifyEmail,

  verifyEmailMiddleWare,
  hashedPassword,
  verifyPassword,
} = require("../middlewares/users.middleware");
// Get users
usersRouter.get("/:id", UserController.getUserById);
usersRouter.get("/", UserController.getUsers);

//Create users

//register path "/users/register"
usersRouter.post(
  "/register",
  verifyEmailMiddleWare,
  hashedPassword,
  UserController.createNewUser
);

//login path "/users/login"
usersRouter.post(
  "/login",
  verifyEmail,
  verifyPassword,
  UserController.loginUser
);

usersRouter.put("/edit-profile/:id", UserController.editUserController);

module.exports = usersRouter;
