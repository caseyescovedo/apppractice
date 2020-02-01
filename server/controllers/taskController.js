/* eslint-disable no-console */
const taskTable = require('../models/TaskModel');

module.exports = {
  postTask: (req, res, next) => {
    console.log('POST TASK FIRED');

    const text = `
      INSERT into Task (item)
      VALUES ($1);`;

    // task will be store on req.body.task
    const params = [req.body.task];

    taskTable.query(text, params)
      .then(() => (
        // console.log('got queries: ', response);
        // continue middleware chain
        next()))
      .catch((err) => next({
        serverErr: `Error deleteTask middleware:\n ${err.stack}`,
        clientErr: 'Unable to add new tasks',
      }));
  },
  getTasks: (req, res, next) => {
    // console.log('GET TASKS FIRED');

    const text = 'SELECT * from Task';
    const params = [];

    taskTable.query(text, params)
      .then((response) => {
        // console.log('got queries: ', response.rows);
        res.locals.tasks = response.rows;
        // console.log('res.locals: ', res.locals);
        // continue middleware chain
        return next();
      })
      .catch((err) => (
        // console.log();
        next({
          serverErr: `Error postTask middleware:\n ${err.stack}`,
          clientErr: 'Unable to get tasks',
        })));
  },
  deleteTask: (req, res, next) => {
    // id number will be pass on res.body
    const text = `
      DELETE FROM Task 
      WHERE id=($1);`;
    console.log('taskId: ', req.query.taskId);
    const params = [req.query.taskId];

    taskTable.query(text, params)
      .then(() => next())
      .catch((err) => {
        console.log(err);
        return next({
          serverErr: `Error deleteTask middleware:\n ${err.stack}`,
          clientErr: 'Unable to delete task',
        });
      });
  },
};
