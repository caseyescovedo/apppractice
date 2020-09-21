const express = require('express');
const taskController = require('./controllers/taskController');
const cookie = require('cookie-parser');

const router = express.Router();
router.use(cookie());

// read
router.get('/', taskController.getTasks, (req, res) => {
  res.status(200).cookie('x', 5).json(res.locals.tasks);
});
// create
router.post('/', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.post);
});
// delete
router.delete('/', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deleted);
});

module.exports = router;