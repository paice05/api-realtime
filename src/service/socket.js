let socket;

const createConnectionSocket = (io) => {
  io.on("connection", (socketInstance) => {
    socket = socketInstance;

    socketInstance.on("disconnect", () => {});
  });
};

export { socket, createConnectionSocket };
