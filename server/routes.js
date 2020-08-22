const express = require('express');
const taskController = require('./controllers/taskController');

const router = express.Router();

router.post('/', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.allTasks);
});

router.get('/', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.allTasks);
});

router.delete('/', taskController.deleteTask, (req, res) => {
  res.status(200);
});

module.exports = router;
