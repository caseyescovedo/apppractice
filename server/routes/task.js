const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getTasks, (req, res) => {
    res.type('application/json');
    res.status(200).json(res.locals.tasks);
});

router.post('/', taskController.postTasks, (req, res) => {
    res.type('application/json');
    res.status(200).json(res.locals.task);
});

router.delete('/', taskController.deleteTask, (req, res) => {
    res.type('application/json');
    res.sendStatus(200);
});

module.exports = router;

