
var { Task } = require('../models/TaskModel');

taskController = {

  postTask(req, res, next){
    console.log("req.body =",req.body)
    Task.create({item: req.body.item}, function (err, result){
        if (err){
            return next(err);
        }else{
            console.log("item created -", result);
            res.locals.task = result;
            return next();
        }
    })
  },

  getTasks(req, res, next) {

    Task.find({}, function(err, result){
        console.log("inside Task.find ")
        if (err){
            return next(err);
        }else{
            console.log("No of items returned -", result.length);
            res.locals.tasks = result;
            return next();
        }
    })
     

  },

  deleteTask(req, res, next) {
    
    console.log("req.params.id -", req.params.id);
    Task.deleteOne({id: req.params.id}, function(err){
        if (err){
            return next(err);
        }else{
            const result = { message: `The item with id ${req.params.id} was deleted from the database`}
            console.log("result -", result)
            res.locals.task= result;
            return next();
        }
    })

  }

}

module.exports = {
    taskController
};
