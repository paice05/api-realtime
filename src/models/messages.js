module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define(
    "messages",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: DataTypes.STRING,
    },
    {
      tableName: "messages",
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
    }
  );

  Messages.associate = (models) => {
    Messages.belongsTo(models.users, { foreignKey: "userId", as: "user" });
    Messages.belongsTo(models.rooms, { foreignKey: "roomId", as: "room" });
  };

  return Messages;
};
