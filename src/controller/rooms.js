import { sequelize } from "../models";

import BaseController from "./BaseController";

const {
  models: { rooms },
} = sequelize;

class RoomController extends BaseController {
  constructor() {
    super(rooms, "/rooms");
  }

  async join(req, res) {
    const { id } = req.params;

    try {
      const isRoom = await rooms.findOne({
        where: {
          id,
        },
      });

      if (!isRoom) return res.status(500).json({ message: "Room not fount" });

      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  }

  routes() {
    const routes = super.routes();

    routes.post("/join", this.join.bind(this));

    return routes;
  }
}

export default new RoomController();
