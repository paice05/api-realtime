import { Router } from "express";

import eventEmitter from "../service/eventEmitter";

class BaseController {
  constructor(model, path) {
    this.model = model;
    this.path = path;
  }

  async index(req, res) {
    const { query } = req;
    try {
      const response = await this.model.findAll(query);

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  }
  async show(req, res) {
    const { query } = req;
    const { id } = req.params;
    try {
      const response = await this.model.findOne({
        where: {
          id,
        },
        ...query,
      });

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  }
  async create(req, res) {
    const { body } = req;
    try {
      const response = await this.model.create(body);

      eventEmitter.emit(`create.${this.path}`, response);

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  }
  async update(req, res) {
    const { body, params } = req;
    const { id } = params;
    try {
      const isRecord = await this.model.findByPk(id);

      if (!isRecord)
        return res.status(500).json({ message: "record not found" });

      const response = await this.model.update(body, {
        where: {
          id,
        },
      });

      eventEmitter.emit(`update.${this.path}`, response);

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  }
  async destroy(req, res) {
    const { id } = req.params;
    try {
      const isRecord = await this.model.findByPk(id);

      if (!isRecord)
        return res.status(500).json({ message: "record not found" });

      await this.model.destroy({
        where: {
          id,
        },
      });

      eventEmitter.emit(`delete.${this.path}`, response);

      return res.sendStatus(200);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  }

  routes() {
    const routes = Router();

    routes.get(`/${this.path}`, this.index.bind(this));
    routes.get(`/${this.path}/:id`, this.show.bind(this));
    routes.post(`/${this.path}`, this.create.bind(this));
    routes.put(`/${this.path}/:id`, this.update.bind(this));
    routes.delete(`/${this.path}/:id`, this.destroy.bind(this));

    return routes;
  }
}

export default BaseController;
