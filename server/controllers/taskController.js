const taskController = {}
const Tasks = require('../models/TaskModel')

taskController.postTask = (req, res, next) => {
    const { item } = req.body;
    Tasks.create(
        { item }, 
        (err, addedTask) => {
            if(err) return next({
                log: 'Error in postTask', 
                status: 400, 
                err: { err }
            })
            res.locals.addedTask = addedTask;
            return next()
        }
    )
}

taskController.getTasks = (req, res, next) => {
    Tasks.find(
        {}, 
        (err, allTasks) => {
            if(err) return next({
                log: 'Error in getTasks', 
                status: 400, 
                err: { err }
            })
            res.locals.allTasks = allTasks;
            return next()
        }
    )
}

taskController.deleteTask = (req, res, next) => {
    const { id } = req.body;
    Tasks.deleteOne(
        { _id: id }, 
        (err, deletedTask) => {
            if(err) return next({
                log: 'Error in deleteTask', 
                status: 400, 
                err: { err }
            })
            res.locals.deletedTask = deletedTask;
            return next()
        }
    )
}


module.exports = taskController;
