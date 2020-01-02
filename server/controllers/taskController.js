const Task = require('../models/TaskModel');
const taskController = {};

//post task
taskController.postTask = (req, res, next) => {
    // console.log('in post')
    const {item} = req.body;
    // console.log('req.body', req.body)
    Task.create({item: item}, (err, task) => {
        if (err) {
            return next(err);
        } else {
            res.locals.task = task;
            // console.log('res.locals.task', res.locals.task)
            next();
        }
    })
}

//get task
taskController.getTask = (req, res, next) => {
    Task.find({}, (err, tasks) => {
        if (err) {
            return next(err);
        } else {
            res.locals.tasks = tasks;
            return next();
        }
    })
}

//delete
taskController.deleteTask = (req, res, next) => {
    //params is in the URL route, body is in the body that you build
    Task.findByIdAndDelete(req.params.id, (err, task) => {
        if (err) {return next(err);}
        else {
            res.locals.task = task;
            next()
        }
    })
}


module.exports = taskController;