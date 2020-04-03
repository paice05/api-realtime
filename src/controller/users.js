import { sequelize } from "../models";

const {
  models: { users },
} = sequelize;

module.exports = {
  index: async (req, res) => {
    try {
      const response = await users.findAll();

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  },
  show: async (req, res) => {},
  create: async (req, res) => {
    const { name, username, password } = req.body;
    try {
      const response = await users.create({
        name,
        username,
        password,
      });

      return res.json(response);
    } catch (error) {
      return res.status(500).json(error.toString());
    }
  },
  update: async (req, res) => {},
  destroy: async (req, res) => {},
};
