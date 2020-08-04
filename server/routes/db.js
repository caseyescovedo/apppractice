const express = require('express');
const router = express.Router();
const {
  postTask,
  getTasks,
  deleteTask,
} = require('../controllers/taskController');

router.post('/', postTask, (req, res) =>
  res.status(201).json(res.locals.created)
);

router.get('/', getTasks, (req, res) => res.status(200).json(res.locals.tasks));

router.delete('/', deleteTask, (req, res) => res.status(200).send('Deleted'));

module.exports = router;
