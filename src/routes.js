const { Router } = require("express");

const controllerUser = require("./controller/users");
const controllerMessages = require("./controller/messages");

const routes = Router();

// users
routes.get("/users", controllerUser.index);

// messages
routes.get("/messages", controllerMessages.index);

module.exports = routes;
