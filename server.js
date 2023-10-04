const express = require("express");
const cors = require("cors");
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

setUpRoutes(server);
server.listen(port, () => {
  console.log("Server is listening on port" + " " + port);
});
