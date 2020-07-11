const db = require("../models/TaskModel");

const authController = {};

authController.login = (req, res, next) => {
  console.log(`req.url `, req.url);
  console.log(`req.source `, req.source);
  console.log(`req.params `, req.params);
  console.log(`req.body from /signin`, req.body);
  //   console.log(`req `, req);
  const { user, pass } = req.body;
  if (user === "codesmith" && pass === "ilovetesting") {
    // send a cookie
    res.cookie("token", `admin`);
    return res.redirect("/secret");
  }
  return res.json({ msg: "Unauthorized user" });
};

authController.verify = (req, res, next) => {
  console.log(`req.cookies `, req.cookies);
  if (req.cookies.token !== "admin") return res.redirect("/");
  return next();
};

module.exports = authController;
