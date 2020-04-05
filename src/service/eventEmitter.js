import EventEmitter from "events";

import { socket } from "./socket";

const myEmitter = new EventEmitter();

const entities = ["users", "messages", "rooms"];

entities.forEach((entity) => {
  myEmitter.on(`create.${entity}`, (record) => {
    socket.broadcast.emit(`create.${entity}`, record);
  });

  myEmitter.on(`update.${entity}`, (record) => {
    socket.emit(`update.${entity}`, record);
  });

  myEmitter.on(`destroy.${entity}`, (record) => {
    socket.emit(`destroy.${entity}`, record);
  });
});

export default myEmitter;
