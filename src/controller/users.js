import { sequelize } from "../models";

import BaseController from "./BaseController";

const {
  models: { users },
} = sequelize;

class UserController extends BaseController {
  constructor() {
    super(users, "/users");

    this.userModel = users;
  }

  async auth(req, res) {
    const { username, password } = req.body;
    try {
      const isUser = await this.userModel.findOne({
        where: {
          username,
          password,
        },
      });

      if (!isUser) return res.status(500).json({ message: "User not found" });

      return res.json(isUser);
    } catch (error) {}
  }

  routes() {
    const routes = super.routes();

    routes.post("/auth", this.auth.bind(this));

    return routes;
  }
}

export default new UserController();
