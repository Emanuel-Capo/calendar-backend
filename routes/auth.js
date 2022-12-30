const express = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/authController");
const { fieldValidators } = require("../middlewares/fieldValidators");
const { validateJwt } = require("../middlewares/validateJWT");
const router = express.Router();

// register
router.post(
  "/new",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe tener un mínimo de 6 caracteres").isLength({ min: 6 }),
    fieldValidators
  ],
  createUser
);

// login
router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "La contraseña debe tener un mínimo de 6 caracteres").isLength({ min: 6 }),
    fieldValidators
  ],
  loginUser
);

// renew token
router.get("/renew", validateJwt, renewToken);

module.exports = router;
