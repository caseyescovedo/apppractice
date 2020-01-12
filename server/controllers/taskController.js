// In the `server/models/taskController.js` file, add the following functionality to the exported controller. (These will be server middleware/final handler functions, so they should take the appropriate parameters and perform the necessary callback operations.):
// - [ ] Function `postTask` should create a new item in the database
// - [ ] Function `getTasks` should retrieve all items from the database and send it back to the client as JSON
// - [ ] Function `deleteTask` should find items in the database based on an ID number and delete that item if it exists

const Task = require('../models/TaskModel.js')
const mongoose = require('mongoose')


const taskController = {};

taskController.addTask = (req, res, next) => {
    console.log('inside taskController', req.body)
    const { item } = req.body;
    Task.create({item}, (err, item) => {
        if (err) return next(err);
        console.log(item)
        return next();
    })
}
taskController.getTasks = (req, res, next) => {
    Task.find({}, (err, resp) => {
        if(err) return next(err);
        res.locals.tasks = resp;
        return next();
    })
}
taskController.deleteTask = (req, res, next) => {
    const { id } = req.body;
    Task.deleteOne({_id: id}, (err, resp) => {
        if (err) return next(err);
        return next();

    })
}


module.exports = taskController;
