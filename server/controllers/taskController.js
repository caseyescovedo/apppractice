const Task = require("../models/TaskModel")


module.exports = {

    taskController.postTask = (req, res, next) => {
        console.log.("inside create Controller")
        Task.create({item: req.body.item}, (err,thing) => {
            if(err){
                return next({err: "Error in postTask Controller"})
            } else {
                console.log("created a task");
                return next()
            }
        })
    },

    taskController.getTasks = (req, res, next) => {
        console.log("inside get tasks controller")
    },

    taskController.deleteTask = (req, res, next) => {
        console.log("inside delete controller")
    },
};
