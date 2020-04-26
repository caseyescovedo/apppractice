const Item = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = (req, res, next) => {
    const { item } = req.body;
    Item.create({item})
    .then(task => {
        res.locals.tasks = task;
        next();
    })
    .catch(err => next(err));
}

taskController.getTask = (req, res, next) => {
    Item.find()
        .then(item => {
            res.locals.tasks = item;
            next();
        })
        .catch(err => next(err));
}

taskController.deleteTask = (req, res, next) => {
    Item.findOneAndDelete(req.params.id)
        .then(taskDeleted => {
            res.locals.tasks = taskDeleted;
            console.log('This task was deleted: ', taskDeleted);
            next();
        })
        .catch(err => next(err));
}

module.exports = taskController;