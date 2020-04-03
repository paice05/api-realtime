import { Router } from 'express'

import controllerUser from "./controller/users";
import controllerMessages from "./controller/messages";

const routes = Router();

// users
routes.get("/users", controllerUser.index);

// messages
routes.get("/messages", controllerMessages.index);

module.exports = routes;
