import { Router } from 'express'

import controllerUser from "./controller/users";
import controllerMessages from "./controller/messages";
import controllerRooms from "./controller/rooms";

const routes = Router();

// users
routes.get("/users", controllerUser.index);
routes.post("/users", controllerUser.create);

// messages
routes.get("/messages", controllerMessages.index);
routes.post("/messages", controllerMessages.create);

// rooms
routes.get("/rooms", controllerRooms.index);
routes.post("/rooms", controllerRooms.create);

module.exports = routes;
