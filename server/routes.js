const express = require('express');
const taskController = require('./controllers/taskController');

const router = express.Router();

router.get('/getTasks', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.allTasks)
});

router.post('/postTask', taskController.postTask, (req, res) => {
    res.status(200).json(res.locals.post);
});

router.delete('/deleteTask', taskController.deleteTask, (req, res) => {
    res.status(200).json(res.locals.deleted);
});

module.exports = router;