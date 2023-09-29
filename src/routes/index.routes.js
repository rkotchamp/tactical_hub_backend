const usersRouter = require("./users.routes");
const articleRouter = require("../routes/articles.routes");

const setupRoutes = (server) => {
  server.use("/users", usersRouter);
  server.use("/articles", articleRouter);
};

module.exports = setupRoutes;
