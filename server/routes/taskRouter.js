const express = require('express');
const taskController = require('../controllers/taskController.js');
const router = express.Router();

router.post('/',
  taskController.postTask,
  (req, res) => {
    res.sendStatus(418)
  }
);

router.get('/',
  taskController.getTasks,
  (req, res) => {
    res.sendStatus(418)
  }
);

router.delete('/',
  taskController.deleteTask,
  (req, res) => {
    res.sendStatus(418)
  }
);

module.exports = router;
