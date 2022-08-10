const { UUID } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define("Series", {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    genre_ids:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    overview:{
      type: DataTypes.TEXT,
    },
    cast:{
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    episode_run_time:{
      type: DataTypes.STRING,
      allowNull: false
    },
    popularity:{
      type: DataTypes.INTEGER,
    },
    backDropImagen:{
      type: DataTypes.TEXT
    },
    posterImagen:{
      type: DataTypes.TEXT
    },
    vote_average:{
      type: DataTypes.INTEGER,
    },
    number_of_episodes:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number_of_seasons:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    creado:{
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    },
    tipo: {
      type: DataTypes.ENUM(["serie", "pelicula"]),
      allowNull: true
    }
  },{
    timestamps: false
  });
};
