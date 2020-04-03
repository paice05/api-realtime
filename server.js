import express from "express";
import http from "http";
import socketio from "socket.io";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./src/routes";

import formatMessage from "./utils/messages";
import {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} from "./utils/users";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3333;
const botName = "Chat Bot";

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

app.use(routes);

io.on("connection", (socket) => {
  // console.log("new ws connection...", socket.id);

  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    socket.emit("message", formatMessage(botName, "Bem-vindo ao chat"));

    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} entrou no chat`)
      );
  });

  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} saiu da sala`)
      );
    }
  });
});

app.get("/", (req, res) => res.send("welcome server wss"));

server.listen(PORT, () => console.log(`Server online in port ${PORT}`));
