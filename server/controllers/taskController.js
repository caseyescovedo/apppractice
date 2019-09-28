const Task = require("../models/TaskModel");

let taskController = {}




    taskController.postTask = (req, res, next) => {
        console.log("inside create Controller")
        Task.create({item: req.body.item}, (err,thing) => {
            if(err){
                return next({err: "Error in postTask Controller"})
            } else {
                console.log("created a task");
                console.log(thing)
                
            }
            return next();
        })
    },

    taskController.getTasks = (req, res, next) => {
        console.log("inside get tasks controller")
        Task.find({}, (err, tasks) => {
            if(err){
                return next({err: 'Error in getTasks controller'})
            } else {
                console.log(tasks);
                res.locals.tasks = tasks
                console.log("RES LOX",res.locals.tasks)
                // return next()
            }
        })
        return next();
    }

    taskController.deleteTask = (req, res, next) => {
        console.log("inside delete controller")
        Task.findOneAndDelete(req.params.task,(err, deletedTask) => {
            if(err){
                return next({err: 'Error in delete task controller'})
            } else {
                console.log("task as been deleted")
            }
        })
        return next();
    }
        module.exports = taskController;
