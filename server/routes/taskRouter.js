const express = require('express');
const taskController = require('../controllers/taskController.js');
const router = express.Router();

router.post('/',
  taskController.postTask,
  (req, res) => {
    res.status(200).json(res.locals.item);
  }
);

router.get('/',
  taskController.getTasks,
  (req, res) => {
    res.status(200).json(res.locals.items);
  }
);

router.delete('/',
  taskController.deleteTask,
  (req, res) => {
    res.sendStatus(200);
  }
);

module.exports = router;
