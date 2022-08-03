const { UUID } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Carro",
    {
      contenido: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
