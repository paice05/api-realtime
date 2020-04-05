import { sequelize } from "../models";

const {
  models: { users, rooms },
} = sequelize;

const userMap = {};

const userJoin = async (id, name, roomId) => {
  const user = await users.create({
    name,
  });

  const room = await rooms.findByPk(roomId);

  userMap[id] = {
    user,
    room,
  };

  return {
    user,
    room,
  };
};

const getCurrentUser = (id) => {
  return userMap[id];
};

const userLeave = async (id) => {
  const user = (userMap[id] || {}).user;

  if (!user) return {};

  const room = userMap[id].room;

  const isUser = await users.findByPk(user.id);

  delete userMap[id];

  return {
    user: isUser,
    room
  };
};

module.exports = {
  userJoin,
  getCurrentUser,
  userLeave,
};
