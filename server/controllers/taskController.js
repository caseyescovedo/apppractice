const Task = require('../models/TaskModel');

const taskController = {

    postTask (req, res, next) {
        Task.create({task: req.body.task, created_at: new Date() }),
        (err, task) => {
            if (err) return next(err)
            res.locals.task = task;
            next();
        }
    },

    getTasks (req, res, next) {
        Task.find(), (err, tasks) => {
            res.locals.tasks = tasks;
            next();
        }
    },

    deleteTask (req, res, next) {
        Task.findOneAndDelete({_id: req.body._id}, (err, task) => {
            if (err) return next(err)
            if(!task) return next('Task not found')
            next();
        })
    }
}

module.exports = taskController;
