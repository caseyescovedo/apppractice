const express = require('express');
const taskController = require('../controllers/taskController.js');
const router = express.Router();

// add item to DB
router.post('/', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.post);
  //   console.log(res.locals.post);
});

// retrieve items from db
router.get('/', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.dbInfo);
});

// delete item from db
router.delete('/', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deleted);
});
module.exports = router;
