const express = require('express');
const taskController = require('../controllers/taskController.js'); 
const router = express.Router();


// All routes redirected from '/task' from server.js
router.post('/posttask', taskController.postTask, (req, res) => {
    res.status(200).json(res.locals.tasks)
});

router.get('/gettask', taskController.getTask, (req, res) => {
    res.status(200).json(res.locals.tasks);
});
 
router.delete('/deletetask/:id', taskController.deleteTask, (req, res) => {
    res.status(200).send('Message deleted successfully');
});

module.exports = router;