// const express = require("express");
// const router = express.Router();
// const path = require("path");
// const taskController = require("../controllers/taskController");

// // get all
// router.get("/secrets", taskController.getTasks, (req, res) => {
//   console.log("past middleware");
//   res.send(200).json(res.locals.all);
// });

// router.post(
//   "/secrets",
//   () => {
//     console.log("using post router");
//   },
//   taskController.postTask,
//   (req, res) => {
//     res.send(200, "This is a post");
//   }
// );

// module.exports = router;
