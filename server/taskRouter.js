const express = require('express');
const taskController = require('./controllers/taskController.js');
const router = express.Router();

router.get('/getTasks', taskController.getTasks, (req, res, next) => {
  res.status(200).json(res.locals.data);
});

router.post('/postTask', taskController.postTask, (req, res, next) => {
  res.status(200).json(res.locals.data);
});

router.delete('/deleteTasks/:id', taskController.deleteTasks, (req, res, next) => {
  res.status(200).send('Task deleted!');
});

module.exports = router;