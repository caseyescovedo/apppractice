const models = require('../models/TaskModel');
const taskController = {};

taskController.getTasks = (req, res, next) => {
    console.log(res.body);
    models.Task.find({}, (err, task) => {
        if(err){return res.status(500).send(err)};
        res.locals.task = task;
        next();
    })
}

taskController.postTask = (req, res, next) => {
    const task = req.body.task
    models.Task.create({ task }, (err, task) => {
        console.log(task);
        if(err){return res.status(500).send(err)};
        res.locals.task = task;
        next();
    })
}

taskController.deleteTask = (req, res, next) => {
    models.Task.findByIdAndDelete(req.params.id, (err, something) => {
        if(err){return res.status(500).send(err)};
        return res.status(200).send('Task Deleted!');
    })
}

module.exports = taskController