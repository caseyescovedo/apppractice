const Task = require('../models/TaskModel');

const taskController = {};
//Function postTask should create a new item in the database
taskController.postTask = (req, res, next) => {
  // console.log('in the postbody', req.body);
  Task.create(
    {
      item: req.body.item,
    },
    (err, data) => {
      if (err) {
        return next(err);
      } else {
        res.locals.item = data;
        return next();
      }
    }
  );
};

//Function getTasks should retrieve all items from the database and send it back to the client as JSON
taskController.getTask = (req, res, next) => {
  // console.log('in the getTask', req.body);
  Task.find({}, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.locals.item = data;
      return next();
    }
  });
};
//Function deleteTask should find items in the database based on an ID number and delete that item if it exists
taskController.deleteTask = (req, res, next) => {
  // console.log('in the deleteTask', req.body);
  const { _id } = req.body;
  Task.deleteOne(_id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      return next();
    }
  });
};

module.exports = taskController;
