const router = require('express').Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.tasks);
});

router.post('/', taskController.postTask, (req, res) => {
  res.sendStatus(200);
});

router.delete('/:id', taskController.deleteTask, (req, res) => {
  res.sendStatus(200);
});

module.exports = router;
