const { UUID } = require("sequelize");
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Usuarios", {
      name:{
         type: DataTypes.STRING
      },
      lastName:{
         type: DataTypes.STRING
      },
      password:{
         type: DataTypes.STRING,
         allowNull: false,
      },
      nickName:{
         type: DataTypes.STRING,
         allowNull: false,
      },
      email:{
         type: DataTypes.STRING,
         allowNull: false,
         primaryKey: true,
      },
      authorization:{
         roles:{
            type: DataTypes.STRING,
            enum: ['comun', 'comprador', 'admin'],
            default: ['comun']
         }
      },
      tarjetaDeCredito:{
         type: DataTypes.STRING
      },
      imagenDePerfil:{
         type: DataTypes.TEXT
      },
      fechaDeRegistro:{
         type: DataTypes.DATE,
         default: () => Date.now(),
      },
      wishList:{
         type: DataTypes.ARRAY(DataTypes.STRING),
      },
      purchased:{
         type: DataTypes.ARRAY(DataTypes.STRING),
      }
  },{
    timestamps: false
  });
};
