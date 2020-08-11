const Task = require('../models/TaskModel.js');
const authController = require('../controllers/authController');

const taskController = {}; 

// post an item to the db - POST request
taskController.postTask = (req, res, next) => {
    console.log('req.body in postTask line 8 ' , req.body);

    const { item } = req.body; 

    if(!item) return res.status(400).send('please enter an task to be done');
    Task.create({ item } , (error, data) => {
        if(error) return next({stack: `ERROR from taskController.postTask: ${error}`});
        console.log('res.locals.item' , res.locals.item)
        res.locals.item = data; 
        return next();
    })   
};

// get all items from db - GET request

taskController.getTasks = (req, res, next) => {
    Task.find({} , (error, data) => {
        if(error) return next({stack: `Error from taskController.getTasks: ${error}`});
        if(!data) return res.status(404).send('GET requests for tasks successful, but no data was returned');
        res.locals.items = data;
        return next();
    })
};

taskController.deleteTask = (req, res, next) => {
    console.log('req.params._id' , req.params._id);
    Task.findOneAndDelete( {_id : req.params._id}  , (error, data) => {
        if(error) return next(`Error from taskController.deleteTask: ${error}`);
        if(!data) return res.status(404).send('DELETE request for task was successful, but no data was deleted');
        res.locals.deleted = data; 

        console.log('res.locals.deleted' , res.locals.deleted);
        return next();

    })
};

// export the taskController
module.exports = taskController;
