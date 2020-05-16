const express = require("express");
const taskController = require("../controllers/taskController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/postTask", taskController.postTask, (req, res) => {
  // res.status(200).json(res.locals.item);
  res.status(200).send("posted a task");
});
router.get("/getTasks", taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.items);
});
router.delete("/deleteTask", taskController.deleteTask, (req, res) => {
  res.status(200).send("item deleted");
});

module.exports = router;
