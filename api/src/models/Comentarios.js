const { UUID } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Comentarios",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      contenido: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      puntuacion: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      idserie: {
        type: DataTypes.STRING,
        
      },
      idpelicula:{
        type: DataTypes.STRING,
       

      }
    },
    {
      timestamps: false,
    }
  );
};
