const { UUID } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Peliculas",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      }, //*
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      }, //*
      genre_ids: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false,
      },
      overview: {
        type: DataTypes.STRING,
      }, //*
      cast: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      }, //*
      runtime: {
        type: DataTypes.STRING,
        allowNull: false,
      }, // - episode run time
      release_date: {
        type: DataTypes.STRING,
      }, // +
      posterImagen: {
        type: DataTypes.TEXT,
      }, // *
      backDropImagen: {
        type: DataTypes.TEXT,
      }, // *
      vote_average: {
        type: DataTypes.STRING,
      }, // *
      popularity: {
        type: DataTypes.STRING,
      }, // *
      // - number of episodes
      tipo: {
        type: DataTypes.ENUM(["serie", "pelicula"]),
      },
    },
    {
      timestamps: false,
    }
  );
};
