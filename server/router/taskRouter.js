const express = require('express');
const router = express.Router();
const taskController = require("../controllers/taskController");

//Creating a task route 
router.post('/', taskController.postTask, (req, res) => {
    res.status(200).json('created');
}) 

//Reading a task route
router.get('/', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.tasks);
}) 

//Deleting a task route
router.delete('/', taskController.deleteTask, (req, res) => {
    res.status(200).json('deleted');
}) 

module.exports = router;