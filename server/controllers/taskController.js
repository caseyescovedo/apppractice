const Task = require('../models/TaskModel');

const taskController = {};

//Get all task for main page
taskController.getTasks = (req, res, next) => {
    Task.find({}, (err, tasks) => {
        if (err) {
            return res.status(400).json('getTasks Controller failed to find tasks.', err);
        }
        res.locals.tasks = tasks;
        return next();
    });
}

//Saves task to database
taskController.postTask = (req, res, next) => {
    //This uses req.body to retreive information
    console.log(req.body);
    const { item } = req.body;

    //check to see if missing input field. If missing input field then throw error.
    if(!item){
        return res.status(400).json('Please complete item field before submitting.', err);
    }

    // //Creates task in database and moves onto next middleware
    Task.create({item, item}, (err, task) => {
        if(err){
            return res.status(400).json('postTask Controller failed to save to database', err);
        }
        res.locals.tasks = task;
        return next();
    });
};

//Delete task from database
taskController.deleteTask = (req, res, next) => {
    /*Now I understand why we are using req.params instead of req.body for this specific case.  
    We are not using a form to send info. Instead, we are taking the id of the frontend and 
    attaching it to the string for our delete request, then invoking our request to trigger
    the app.delete('/task') route (EDIT: went back and updated my post route to account for this
        realization.*/
        console.log(req.params);

    //Find the specific ID for the task and remove it
    Task.findByIdAndRemove({ _id: req.params.id }, (err, task) => {
        if(err){
            return res.status(400).json('deleteTask Controller failed to save to database', err);
        }
        return next();
    });
}

module.exports = taskController;
