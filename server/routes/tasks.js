const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router.get('/alltasks', taskController.getTasks, (req, res) => {
  res.status(200).send({ tasks: res.locals.tasks, status: 'success' });
});

router.post(
  '/addtask',
  taskController.postTask,
  taskController.getTasks,
  (req, res) => {
    res.status(200).send({ tasks: res.locals.tasks, status: 'success' });
  }
);

router.delete(
  '/delete/:taskId',
  taskController.deleteTask,
  taskController.getTasks,
  (req, res) => {
    res.status(200).send({ tasks: res.locals.tasks, status: 'Success' });
  }
);

module.exports = router;
