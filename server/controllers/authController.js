//pass in Message model
const Task = require("../models/TaskModel");

const authController = {};

authController.setCookie = (req, res, next) => {
  //assign pass key to request body and inputted password as the value
  if (req.body.user === "codesmith" && req.body.pass === "ilovetesting") {
    res.cookie("token", "admin");
    return next();
  } else {
    return res.send(`Unsuccessful login attempt`);
  }
};

authController.verifyUser = (req, res, next) => {
  if (req.cookies.token === "admin") {
    return next();
  } else {
    return res.send(`You must be signed in to view this page`);
  }
};

module.exports = authController;
