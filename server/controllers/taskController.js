const db = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = (req, res, next) => {
    const { task } = req.body;
    console.log(task);
    const text = 'INSERT INTO task(item, created_at) VALUES($1, NOW());';
    const values = [task];
    db.query(text, values, (err) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.locals.newTask = task;
        return next();
    })
}

taskController.getTasks = (req, res, next) => {
    const text = 'SELECT * FROM task';
    db.query(text, (err, tasks) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.locals.allTasks = tasks.rows;
        return next();
    })
}

taskController.deleteTask = (req,res, next) => {
    const { id } = req.body;
    const text = 'DELETE FROM task WHERE id = $1';
    const values = [id];
    db.query(text,values, (err) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        next();
    })
}

module.exports = taskController;