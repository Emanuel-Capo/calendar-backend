const { request, response } = require("express");
const jwt = require("jsonwebtoken");

const validateJwt = (req = request, res = response, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición"
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
    req.uid = uid;
    req.name = name;
  } catch (error) {
    return res.status(401).json({
      msg: "Token no válido"
    });
  }

  next();
};

module.exports = { validateJwt };
