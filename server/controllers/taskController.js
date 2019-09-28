const pool = require('../models/TaskModel');

const taskController = {};

// get all todos
taskController.getTasks = (req, res) => {
    const allTasks = 'SELECT * from tasks';
    pool.query(allTasks, (err, data) => {
        if(err) {
            res.json(err);
        } else {
            res.json(data);
        }
    })
}

// add a todo
taskController.postTask = (req, res) => {
    const addTask = 'INSERT INTO tasks (item) VALUES ($1) RETURNING *';
    const value = [req.body.item];
    pool.query(addTask, value, (err, data) => {
        if(err) {
            res.json(err);
        } else {
            res.json(data)
        }
    })
}

// delete a todo
taskController.deleteTask = (req, res) => {
    const deleteQuery = 'DELETE FROM tasks WHERE _id = ($1)'
    const deletedId = [req.body._id];
    pool.query(deleteQuery, deletedId, (err, data) => {
        if(err) {
            res.json(err);
        } else {
            res.sendStatus(200);
        }
    })
}

module.exports = taskController;
