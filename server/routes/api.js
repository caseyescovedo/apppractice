const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.delete(
  '/delete',
  taskController.deleteTask,
  taskController.getTask,
  (req, res) => {
    res.status(200).json(res.locals.items);
  }
);

router.post(
  '/post',
  taskController.postTask,
  taskController.getTask,
  (req, res) => {
    res.status(200).json(res.locals.items);
  }
);

router.get('/', taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.items);
});

module.exports = router;
