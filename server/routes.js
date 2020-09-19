const express = require('express');
const controller = require('./controllers/taskController');

const router = express.Router();

// READ method (query all items in database)
router.get('/', controller.getTasks, (req, res) => {
  res.status(200).json(res.locals.info);
});

// CREATE a task
router.post('/', controller.postTask, (req, res) => {
  res.status(200).json(res.locals.post);
});

// Delete
router.delete('/', controller.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deleted);
});

module.exports = router;
