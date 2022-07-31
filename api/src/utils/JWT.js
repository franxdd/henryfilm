const { sign, verify, decode } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(
    JSON.stringify({
      username: user.dataValues.username,
      id: user.dataValues.id,
    }),
    "jwtsecretcambiar"
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const data = JSON.parse(req.headers.cookies);

  if (data["access-token"]) {
    const accessToken = data["access-token"];
    if (!accessToken)
      return res.status(400).json({ error: "Usuario no autenticado" });
    try {
      const validToken = verify(accessToken, "jwtsecretcambiar");

      if (validToken) {
        req.authenticated = true;
        return next();
      }
    } catch (error) {
      return res.status(400).json({ error: error });
    }
  }
};

module.exports = { createTokens, validateToken };
