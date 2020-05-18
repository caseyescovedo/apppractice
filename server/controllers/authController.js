const path = require("path");
const authController = {};

authController.loginUser = (req, res, next) => {
  const { user, pass } = req.body;
  if (!user || !pass || user !== "codesmith" || pass !== "ilovetesting") {
    res.send(`unsuccessful login attempt`);
  } else {
    return next();
  }
};

authController.setCookie = (req, res, next) => {
  res.cookie("token", "admin");
  return next();
};

authController.verifyUser = (req, res, next) => {
  console.log(req.headers.cookie);
  if (!req.headers.cookie || req.headers.cookie !== "token=admin") {
    res.send(`You must be signed in to view this page`);
  }
  return next();
};

module.exports = authController;
