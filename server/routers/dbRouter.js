const express = require('express');
const taskController = require('../controllers/taskController');

const router = express.Router();

router.get('/', taskController.getTasks, (req, res) => {
  res.status(200).send(res.locals.tasks);
});

router.post('/', taskController.postTask, (req, res) => {
  const { dbResponse } = res.locals;
  res.status(200).json({
    dbResponse,
    message: 'Post Successful',
  });
});

module.exports = router;
