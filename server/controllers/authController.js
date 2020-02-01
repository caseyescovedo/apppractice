const db = require("../models/TaskModel");

const authController = {};

authController.newUser = function(req, res, next) {
  const { user } = res.body;
  const { password } = res.body;
  const setUser = [user];
  const setPass = [password];
  const queryString = "INSERT INTO NewUser(user, password) VALUES($1, $2)";
  if (setUser === "codesmith" && setPass === "ilovetesting") return next();

  db.query(queryString, setPass, err => {
    if (err) {
      return next({
        log: "error from auth newUser",
        message: { err }
      });
    }
  });
  return next();
};

module.exports = authController;
