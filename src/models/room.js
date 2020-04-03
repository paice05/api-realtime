module.exports = (sequelize, DataTypes) => {
  const Rooms = sequelize.define(
    "rooms",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: DataTypes.STRING,
    },
    {
      tableName: "rooms",
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
    }
  );

  Rooms.associate = (models) => {
    Rooms.hasMany(models.messages, { foreignKey: "roomId", as: "messages" });
  };

  return Rooms;
};
