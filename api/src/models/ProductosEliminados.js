const { UUID } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "ProductosEliminados",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      idProducto: {
        type: DataTypes.STRING,
        allowNull: false,
      },





    },
    
    {
      timestamps: false,
    }
  );
};
