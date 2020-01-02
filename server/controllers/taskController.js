const Task = require('../models/TaskModel');
const taskController = {};

taskController.addTask = (req, res, next) => {
    console.log("THIS IS THE REQ >>>>>>>>>>", req)
    const { item } = req.body;
    console.log("this is the item: ", item)
    Task.create({ item }, (err, item) => {
        if (err) { 
            return next(err)
        } else { 
            console.log("addTask, item created: ", item)
            return next();
        }
    })
}

taskController.deleteTask = (req, res, next) => {
    const _id = req.params;
    console.log("req.params >>>>>>>>>>>>>>", _id)
    Task.findOneAndDelete({_id}, (err, item) => {
        if (err) { 
            return next(err);
        } else { 
            console.log("item deleted: ", item)
            return next();
        }
    })
}

taskController.getTasks = (req, res, next) => {
    Task.find({}, (err, item) => {
        if (err) { 
            return next(err);
        } else { 
            console.log("THESE ARE ALL THE TASKS: ", item)
            res.locals.items = item;
            return next();
        }
    })
}

module.exports = taskController;