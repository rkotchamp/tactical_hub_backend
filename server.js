const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const database = require("./src/database/database-config");
require("dotenv").config();

const port = process.env.SERVER_PORT;

const setUpRoutes = require("./src/routes/index.routes");
const server = express();

server.use(express.json());

server.use(
  cors({
    origin: "http://localhost:5173",
  })
);
server.use(cookieParser());

setUpRoutes(server);
server.listen(port, (error) => {
  if (error) {
    console.log("Server is not running");
  } else {
    console.log("Server is listening on port" + " " + port);
  }
});
