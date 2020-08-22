const express = require("express");
const router = express.Router();
// const authController = require("./authController.js");
const taskController = require("./taskController.js");
const path = require("path");
const fs = require("fs");

// router.get("/", (req, res) => {
//   return res.status(200).json(res.locals.items);
// });

router.post("/create", taskController.postTask, (req, res) => {
  console.log("create route has been hit, yay");
  return res.status(200).json(res.locals.item);
});
module.exports = router;
