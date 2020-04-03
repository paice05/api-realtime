import { sequelize } from "../models";

const {
  models: { rooms },
} = sequelize;

module.exports = {
  index: async (req, res) => {
    const { query } = req;
    try {
      const response = await rooms.findAll(query);

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  },
  show: async (req, res) => {},
  create: async (req, res) => {
    const { name } = req.body;
    try {
      const response = await rooms.create({
        name,
      });

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  },
  update: async (req, res) => {},
  destroy: async (req, res) => {},
};
