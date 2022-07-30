const { UUID } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Usuarios",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      /* telefono:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nombre:{
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido:{
      type: DataTypes.STRING,
      allowNull: false
    }, */
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
