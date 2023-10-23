const argon2 = require("argon2");
const UserModel = require("../models/users.model");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2d,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashedPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashedValue) => {
      delete req.body.password;
      req.body.hashed_password = hashedValue;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error hashing the Password");
    });
};
//! email verify to register

const verifyEmailMiddleWare = (req, res, next) => {
  UserModel.findByEmail(req.body.email)
    .then((user) => {
      if (user !== null && user.length > 0) {
        res.status(401).send("This email does not exist");
      } else {
        next();
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error getting email");
    });
};

// verifyEmail, verifyPassword
//!Verify to login
const verifyEmail = (req, res, next) => {
  UserModel.findByEmail(req.body.email)
    .then((user) => {
      if (user !== null && user.length > 0) {
        next();
      } else {
        res.status(401).send("This email  is not registered ");
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Error getting email");
    });
};

const verifyPassword = (req, res, next) => {
  // get user hashed password
  UserModel.findUserToLogin(req.body.email)
    .then((user) => {
      if (user !== null && user.length > 0) {
        argon2
          .verify(user[0].hashed_password, req.body.password)
          .then((isVerified) => {
            if (isVerified) {
              delete user[0].hashed_password;
              req.user = user[0];
              next();
            } else {
              res.status(401).send("Invalid Password");
            }
          });
      } else {
        res.status(401).send("This email  is not registered ");
      }
    })
    .catch((err) => {
      console.error(err);
      res.send(500).send("Error retrieving user ");
    });
};

const verifyToken = (req, res, next) => {
  const authorizationHeader = req.get("Authorization");
  if (authorizationHeader === null) {
    res.status(403).send("Authorization header is missing");
  }
  const [type, token] = authorizationHeader.split(" ");
  if (type !== "Bearer") {
    res.status(403).send('Authorization header has no "Bearer" type');
  }

  jwt.verify(token, process.env.PRIVATE_KEY, (error, decoded) => {
    if (error) {
      console.error(error);
      res.status(403).send("Error decoding authorization header");
    } else {
      req.userId = decoded.userId;
      req.body.email = decoded.email;
      next();
    }
  });
};

module.exports = {
  hashedPassword,
  verifyEmailMiddleWare,
  verifyEmail,
  verifyPassword,
  verifyToken,
};
