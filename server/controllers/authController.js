const ToDo = require("../models/TaskModel");

const authController = {};

authController.setCookie = (req, res, next) => {
  // const randomNum = Math.floor(Math.random() * 100);
  const { username } = req.body;
  res.cookie("username", username, { maxAge: 5000000 });
  return next();
};

module.exports = authController;
