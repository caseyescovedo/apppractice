const db = require('../models/TaskModel');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const queryStr = 'SELECT * FROM Task';
  db.query(queryStr)
  .then(result => {
    console.log('tasks from taskController.getTasks: ', result.rows);
    res.locals.tasks = result.rows;
    return next();
  })
  .catch(err => {
    console.log(`Error in taskController.getTasks: ${err}`);
    return next(err);
  });
};

taskController.postTask = () => {

};

taskController.deleteTask = () => {

};

module.exports = taskController;
