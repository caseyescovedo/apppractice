const cookieParser = require("cookie-parser");
// const app = require("./server.js");
const bodyParser = require("body-parser");

const authController = {};

authController.cookiePosting = (req, res) => {
  res.cookie("user", "codesmith");
  res.cookie("pass", "ilovetesting");
};

module.exports = authController;
