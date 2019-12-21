const Task = require('../models/TaskModel.js')

const taskController = {};

taskController.postTask = (req, res, next) => {
    const { item } = req.body
    Task.create({ item }, (err, result) => {
        if (err) return next(err);
        res.locals.result = result;
        return next()
    })

}
taskController.getTasks = (req, res, next) => {
    Task.find({}, (err, result) => {
        if (err) return next(err)
        else {
            res.locals.result = result
            return next();
        }
    })
}
taskController.deleteTask = (req, res, next) => {
    Task.findByIdAndRemove(req.params.id, (err, result) => {
        if (err) return next(err)
        else {
            res.locals.result = result
            return next();
        }
    })
}


module.exports = taskController