//require in our database connection so that we can use it here
const db = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = function(req, res, next) {
  console.log('req.body.item in postTask: ', req.body.item);
  //task should come in via user input in the req.body so we'll pull it out of there
  const { item } = req.body;
  //to avoid the use of template literals, we'll add task to an array and pass it into our SQL query
  const arr = [item];
  const queryString = 'INSERT INTO Task (item) VALUES ($1)';
  db.query(queryString, arr, (err) => {
    if (err) {
      // ** add global error handler that we can pass these errors to instead of just logging them in the middleware
      console.log('error in postTask: ', err);
      return next(err);
    }
    //move onto the next piece of middlware
    return next();
  });
};

taskController.getTasks = function(req, res, next) {
  const queryString = 'SELECT * FROM Task';
  db.query(queryString, (request, response, err) => {
    if (err) {
      // ** add global error handler that we can pass these errors to instead of just logging them in the middleware
      console.log('error in getting all tasks from the db: ', err);
      return next(err);
    } else {
      console.log('response.rows in getTasks: ', response.rows);
      res.locals.tasks = response.rows;
    }
    //move onto the next piece of middlware
    return next();
  });
};

taskController.deleteTask = function(req, res, next) {
  console.log('req.body.id in deleteTask: ', req.body.id);
  //we'll use the id from the req.body to tell us which task we need to delete and then pass that into an array which will be used in our SQL query
  const { id } = req.body;
  const arr = [id];
  const queryString = 'DELETE from task WHERE id=$1';
  db.query(queryString, arr, (request, response, err) => {
    if (err) {
      // ** add global error handler that we can pass these errors to instead of just logging them in the middleware
      console.log('error in deleting task: ', err);
      return next(err);
    }
    //move onto the next piece of middlware
    console.log('deleted entry');
    return next();
  });
};

module.exports = taskController;
