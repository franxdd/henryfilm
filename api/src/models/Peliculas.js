const { UUID } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define("Peliculas", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    titulo:{
      type: DataTypes.STRING,
      allowNull: false
    },
    genero:{
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion:{
      type: DataTypes.STRING,
    },
    actores:{
      type: DataTypes.STRING,
    },
    duracion:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lanzamiento:{
      type: DataTypes.INTEGER,
    },
    imagen:{
      type: DataTypes.TEXT
    }
  },{
    timestamps: false
  });
};
