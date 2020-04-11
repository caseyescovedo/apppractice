//pass in Message model
const Task = require("../models/TaskModel");

const authController = {};

authController.setCookie = (req, res, next) => {
  //assign pass key to request body and inputted password as the value
  res.cookie("pass", req.body.pass);
  res.cookie("user", req.body.user);
  return next();
};

authController.passCheck = (req, res, next) => {
  //deconstruct id from request body
  const { _id } = req.body;
  Message.find({ _id: _id }, (err, password) => {
    if (err) {
      console.log(`Error in authController.passCheck ==> ${err}`);
    }
    if (
      req.cookies.user === "codesmith" &&
      req.cookies.pass === "ilovetesting"
    ) {
      res.locals.token = admin;
      return next();
    } else {
      return res.status(400).json({ success: false });
    }
  });
};

module.exports = authController;
