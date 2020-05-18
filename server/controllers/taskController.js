const { Task } = require("../models/TaskModel");
const taskController = {};

// Create New Elements in the database => postTask
taskController.postTask = (req, res, next) => {
        const { item } = req.body;
        Task.create({ item }, (err, result) => {
            if (err) return next(err);
            res.locals.result = result;
            return next();
        })
    }

// Should retrieve all items from the database and send it back to the client as JSON => getTasks
taskController.getTasks = (req, res, next) => {
    Task.find({}, (err, item) => {
        if(err) return next(err);
        res.locals.item = item;
        return next();
    })
}

// Should find items in the database based on an ID number and delete that item if it exists => deleteTasks
taskController.deleteTasks = (req, res, next) => {
    const { id } = req.params; // We delete items based on id
    Task.findOneAndDelete(id, (err) => {
        if(err) return next(err);
        return next();
    })
}


module.exports = {taskController
};
