const router = require('express').Router();
const taskController = require('../controllers/taskController');

// Retrieve list of all tasks from database
router.get('/', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

// Add new task to database
router.post('/', taskController.postTask, (req, res) => {
  res.sendStatus(200);
});

// Delete specific task from database
router.delete('/:id', taskController.deleteTask, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
