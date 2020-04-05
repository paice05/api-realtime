import userController from "./controller/users";
import messagesController from "./controller/messages";
import roomsController from "./controller/rooms";

const routes = [
  userController.routes(),
  messagesController.routes(),
  roomsController.routes(),
];

export default routes;
