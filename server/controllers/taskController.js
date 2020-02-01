const Task = require('../models/TaskModel');

const taskController = {};

// create a new item in database
taskController.postTask = (req, res) => {
    const { item, created_at } = req.body;
    Task.create({ item, created_at }, (err, result) => {
        if (err) {
            console.log('Error posting the new task:', item);
            res.status(500).json({ error: 'Could not execute postTask' });
        }
        else {
            console.log('Posted a new task:', item);
            res.status(200).json(result);
        }
    });
}

// retrieve all items from the database and send it back to client as JSON
taskController.getTask = (req, res) => {
    Task.find({}, (err, result) => {
        if (err) {
            console.log('Error retrieving tasks from database');
            res.status(500).json({ error: 'Could not execute getTask' });
        }
        else {
            console.log('Retrieved all tasks from database:');
            console.log(result);
            res.status(200).json(result);
        }
    });
}

// find an item from database based on ID number and delete if it exists
taskController.deleteTask = (req, res) => {
    const { id } = req.body;
    Task.deleteOne({ _id: id }, (err, result) => {
        if (err) {
            console.log('Error deleting the new task with id:', id);
            res.status(500).json({ error: 'Could not execute deleteTask' });
        }
        else {
            console.log('Deleted the task with id:', id);
            res.status(200).json(result);
        }
    });
}

module.exports = taskController;
