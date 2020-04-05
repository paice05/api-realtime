import { sequelize } from "../models";

import BaseController from "./BaseController";

const {
  models: { messages },
} = sequelize;

class MessagesController extends BaseController {
  constructor() {
    super(messages, "messages");
  }
}

export default new MessagesController();
