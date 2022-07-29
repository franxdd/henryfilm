const passaport = require("passport");
const passaportJwt = require("passport-jwt");
const ExtractJwt = passaportJwt.ExtractJwt;
const StrategyJwt = passaportJwt.Strategy;
const User = require("../models/Usuarios");

passaport.use(
  new StrategyJwt(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
      secretOrKey: process.env.JWT_SECRET,
    },
    (jwtPayload, done) => {
      return User.findOne({ where: { id: jwtPayload.id } })
        .then((user) => {
          return done(null, user);
        })
        .catch((err) => {
          return done(err);
        });
    }
  )
);
