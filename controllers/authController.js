const { response } = require("express");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({
        msg: "El mail ya existe"
      });
    }

    user = new UserModel(req.body);

    // encriptar password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // generar JWT
    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      msg: "register",
      uid: user.id,
      name: user.name,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error interno"
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      msg: "No existe usuario con ese mail"
    });
  }

  // confirmar password
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "Password incorrecto"
    });
  }

  // generar JWT
  const token = await generateJWT(user.id, user.name);

  res.status(200).json({
    msg: "login",
    uid: user.id,
    name: user.name,
    token
  });

  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "error interno"
    });
  }
};

const renewToken = async (req, res = response) => {
  const { uid, name } = req;

  // generar JWT
  const token = await generateJWT(uid, name);

  res.status(200).json({
    msg: "renew",
    token
  });
};

module.exports = {
  createUser,
  loginUser,
  renewToken
};
