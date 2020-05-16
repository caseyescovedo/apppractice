const express = require("express");
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");
const router = express.Router();

// Not sure whether to return the item that was posted/deleted or to send a message saying that the request was successful
// The controllers are set up in a way to return the item if needed
router.post("/postTask", taskController.postTask, (req, res) => {
  // res.status(200).json(res.locals.item);
  res.status(200).send("posted a task");
});
router.get("/getTasks", taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.items);
});
router.delete("/deleteTask", taskController.deleteTask, (req, res) => {
  //res.status(200).json(res.locals.deletedTask)
  res.status(200).send("item deleted");
});

module.exports = router;
