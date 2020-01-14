// #### Task controllers
// In the `server/models/taskController.js` file, add the following functionality to the exported controller. 
// (These will be server middleware/final handler functions, so they should take the appropriate parameters and 
//     perform the necessary callback operations.):


const Task = require('../models/TaskModel')
const taskController = {};

// - [ ] Function `postTask` should create a new item in the database
taskController.postTask = (req, res, next) => {
    // console.log("REQ.BODY HERE LOOOOOOOOOOOOK", req.body.item);
    const item = req.body.item;
    Task.create({ item }, (err, task) => {
        if (err) {
            return next(err)
        }
    })
    // console.log("RES.LOCALS.ITEM", res.locals.item)
    res.locals.item = task;
    return next();

}


// - [ ] Function `getTasks` should retrieve all items from the database and send it back to the client as JSON
taskController.getTasks = (req, res, next) => {
    Task.find({}).exec()
        .then(allTasks => {
            res.locals.tasks = allTasks;
            next();
        })
        .catch(err => {
            next({
                log: `taskController:getTasks ERROR IS %{err}`,
                message: { err: `ERROR IN TASKCONTROLLER.JS` }
            });
        });
}

// - [ ] Function `deleteTask` should find items in the database based on an ID number and delete that item if it 
// exists
taskController.deleteTask = (req, res, next) => {
    Task.findByIdAndRemove(req.params.itemId, (err, message) => {
        const response = {
            message: "DELETED!",
            id: req.params
        };
        return res.status(200).send(response);
    });
}
module.exports = taskController;