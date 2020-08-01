const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', taskController.getTasks, (req, res) => {
  res.json(res.locals.tasks);
});

router.post('/', taskController.postTask, (req, res) => {
  res.json(res.locals.newTask);
});

router.delete('/:id', taskController.deleteTask, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
