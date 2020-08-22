const path = require('path');
const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.get('/', 
taskController.getTasks,
  (req, res) => {
  return res.status(200).send(res.locals.allTasks);
});

router.post('/', 
taskController.postTask,
  (req, res) => {
  return res.status(200).send(res.locals.newTask);
});

router.delete('/', 
  taskController.deleteTask,
  (req, res) => {
  return res.status(200).send('OK');
});

module.exports = router;