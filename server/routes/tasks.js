const express = require('express');
const tasksController = require('../controllers/taskController');

const router = express.Router();

router.get('/', tasksController.getTasks, (req, res) => {
  console.log('Invoked route get /');
  if (!res.locals.error) {
    console.log('no error, sending 200');
    res.status(200).send(res.locals.tasks);
  } else {
    console.log('error, sending 400');
    res.sendStatus(400);
  }
});

router.post('/', tasksController.postTask, (req, res) => {
  console.log('Invoked route post /');
  if (!res.locals.error) {
    console.log('no error, sending 200');
    res.status(200).send(res.locals.result);
  } else {
    console.log('error, sending 400');
    res.sendStatus(400);
  }
});

router.delete('/', tasksController.deleteTask, (req, res) => {
  console.log('Invoked route delete / ');
  if (!res.locals.error) {
    console.log('no error, sending 200');
    res.status(200).send(res.locals.result);
  } else {
    console.log('error, sending 400');
    res.sendStatus(400);
  }
});

module.exports = router;
