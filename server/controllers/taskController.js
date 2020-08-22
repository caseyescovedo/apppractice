const TaskModel = require("../models/TaskModel");
const Task = require('../models/TaskModel.js')

module.exports = {
//works in postman
    postTask: (req, res, next) => {
        const {item, date} = req.body;
        if (!item) res.status(400).json("Please enter an item!");

        Task.create({item, date}, (err, task) => {
            if(err) res.status(418).json("There was an error", err);
            
            res.locals.task = task;
            return next();
        });
    },
//works in postman

    getTask: (req, res, next) => {
        Task.find({}, (err, task) => {
            if (err) res.status(418).json("There was an error getting your list", err);
            res.locals.task = task;
            return next();
        });
    },

    //not sure why I cannot get this one to work in postman. Originally tried grabbing an ID off of req.body which yielded a successfully deleted message; however, the database still had the task so it was not actually deleted.
    //changed to params and cannot delete message in postman. 
    //reverting back to req.body and hoping to find more clues when I add a button on the frontend...
    deleteTask: (req, res, next) => {
        // const deleted = {_id : req.params._id};
    //    const {_id} = req.body;
        Task.findOneAndRemove({_id : req.body.id }, (err, task) => {
            if (err) res.status(418).json("There was an error deleting your task", err);
            return next();
        });
    }

};
