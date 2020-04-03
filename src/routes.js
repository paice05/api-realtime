const { Router } = require("express");

const controllerUser = require("./controller/users");

const routes = Router();

routes.get("/users", controllerUser.index);

module.exports = routes;
