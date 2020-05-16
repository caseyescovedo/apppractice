const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.delete(
  '/',
  taskController.deleteTask,
  taskController.getTask,
  (req, res) => {
    res.status(200).send('DELETE');
  }
);

router.post(
  '/',
  taskController.postTask,
  taskController.getTask,
  (req, res) => {
    res.status(200).send('POST');
  }
);

router.get('/', taskController.getTask, (req, res) => {
  res.status(200).send('GET');
});

module.exports = router;
