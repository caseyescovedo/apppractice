const Task = require('../models/TaskModel.js')

// Adding a task to the db
const postTask = (req, res,next) => {
  // console.log('postTask');
  const data = req.body;
  data['created_at'] = new Date();
  Task.create(data, (err, response) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    res.locals.data =  response;
    next();
  });
};

// Getting all task from the db
const getTask = (req, res, next) => {
  // console.log('getTask');
  Task.find({}, (err, response) => {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    res.locals.data = response;
    next();
  })
}

// Deleting a task from the db
const deleteTask = (req, res, next) => {
  // console.log('deleteTask');
  const data = req.body;
  Task.deleteOne(data, function (err) {
    if (err) {
      console.log(err);
      res.sendStatus(400);
    }
    next();
  });
}

module.exports = { postTask, getTask, deleteTask };
