const express = require('express');
const controller = require('./controllers/taskController');
const router = express.Router();

//add an item to the list
router.post('/', controller.postTask, (req, res) => {
    res.status(200).json(res.locals.addTask);
    //maybe send a confirmation of what we added
});

//get all items in list
router.get('/', controller.getTasks, (req, res) => {
    res.status(200).json(res.locals.tasks)
});

//delete an item from the list
router.delete('/', controller.deleteTask, (req, res) => {
    res.status(200).json(res.locals.deleteTask);
});

module.exports = router;