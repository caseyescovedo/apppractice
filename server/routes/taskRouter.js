const express = require('express');

const taskController = require('../controllers/taskController.js');

const router = express.Router();

router.post('/', taskController.postTask, function (req, res){
      res.status(200).send("Item created!");
});

router.get('/', taskController.getTask, function (req, res){
    res.status(200).json(res.locals.task);
});

router.delete('/', taskController.deleteTask, function (req, res){
    res.status(200).send("Item deleted!");
});

module.exports = router;