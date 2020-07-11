const appRoutes = require('express').Router();
const tasks = require('../controllers/taskController');

appRoutes.post('/', tasks.postTask, (req, res) => {
  return res.status(200).json({ tasks: res.locals.tasks });
});

appRoutes.delete('/:_id', tasks.deleteTask, (req, res) => {
  return res.status(200).json({ tasks: res.locals.tasks });
});

appRoutes.get('/', tasks.getTasks, (req, res) => {
  return res.status(200).json({ tasks: res.locals.tasks });
});

module.exports = appRoutes;
