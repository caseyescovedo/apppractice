const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const handleAsyncErr = require('../middleware/handleAsyncErr');

router.get(
  '/',
  handleAsyncErr(taskController.getTasks, 'taskController', 'getTasks'),

  (req, res) => {
    res.status(200).json(res.locals.tasks);
  }
);

router.post(
  '/',
  handleAsyncErr(taskController.createTask, 'taskController', 'createTask'),

  (req, res) => {
    res.status(200).json(res.locals.task);
  }
);

router.delete(
  '/:id',
  handleAsyncErr(taskController.removeTask, 'taskController', 'removeTask'),

  (req, res) => {
    res.status(200).json(res.locals.task);
  }
);

module.exports = router;
