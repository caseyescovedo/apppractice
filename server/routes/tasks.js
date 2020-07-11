const express = require('express');
const tasksController = require('../controllers/taskController');

const router = express.Router();

router.get('/', tasksController.getTasks, (req, res) => {
  if (!res.locals.error) {
    res.status(200).send(res.locals.tasks);
  } else {
    res.sendStatus(400);
  }
});

router.post('/', tasksController.postTask, (req, res) => {
  if (!res.locals.error) {
    res.status(200).send(res.locals.result);
  } else {
    res.sendStatus(400);
  }
});

router.delete('/', tasksController.deleteTask, (req, res) => {
  if (!res.locals.error) {
    res.status(200).send(res.locals.result);
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
