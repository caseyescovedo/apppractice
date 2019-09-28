const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/', taskController.getTasks, (req, res) => {
  res.status(200).json(res.body);
})

router.post('/', taskController.postTask, (req, res) => {
  res.sendStatus(200);
})

router.delete('/', taskController.deleteTask, (req, res) => {
  res.sendStatus(200);
})


module.exports = router;