import express from "express";
import http from "http";
import socketio from "socket.io";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import routes from "./src/routes";

import { createConnectionSocket } from "./src/service/socket";

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3333;

createConnectionSocket(io);

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

routes.forEach((route) => app.use(route));

app.get("/", (req, res) => res.send("welcome server wss"));

server.listen(PORT, () => console.log(`Server online in port ${PORT}`));
