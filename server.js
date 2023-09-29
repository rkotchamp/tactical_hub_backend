const express = require("express");
const database = require("./src/database/database-config");
require("dotenv").config();
const port = process.env.SERVER_PORT;

const setUpRoutes = require("./src/routes/index.routes");
const server = express();

server.use(express.json());

setUpRoutes(server);
server.listen(port, () => {
  console.log("Server is listening on port" + " " + port);
});
