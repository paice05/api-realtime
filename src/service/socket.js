import eventEmitter from "./eventEmitter";

export default (io) => {
  io.on("connection", (socket) => {
    console.log(socket.id)
    
    eventEmitter.on("joinRoom", ({ room, user }) => {
      console.log(socket.id)
    });
  });
};
