const db = require('../models/TaskModel');

const taskController = {};

/**
 * @function postTask
 * @description create a new to do item in the database
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
taskController.postTask = (req, res, next) => {
  const { item } = req.body; // need to fix req.body
  console.log(item);
  const queryString = `INSERT INTO Tasks (item) VALUES ($1) RETURNING *`;
  const params = [item];

  try {
    db.query(queryString, params, (err, response) => {
      res.locals.tasks = response.rows;
      return next();
    });
  } catch {
    (err) => next(err);
  }
};

/**
 * @function getTasks
 * @description Retrieves all items from the database and send it back to the client as JSON in res.locals.tasks
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
taskController.getTasks = (req, res, next) => {
  // get the list of all tasks from Tasks table
  const queryString = 'SELECT * from Tasks;';

  // execute query using pg pool connection
  try {
    db.query(queryString, (err, response) => {
      res.locals.tasks = response.rows;
      return next();
    });
  } catch {
    (err) => next(err);
  }
};

/**
 * @function deleteTask
 * @description Deletes a to do item from Tasks table if an item with the matching id exists
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
taskController.deleteTask = (req, res, next) => {
  // get the task id we want to delete from req.body
  const { id } = req.body;
  const queryString = `DELETE FROM Tasks WHERE id=$1 RETURNING *;`;
  const params = [id];
  // execute query using pg pool connection
  try {
    db.query(queryString, params, (err, response) => {
      res.locals.tasks = response.rows;
      return next();
    });
  } catch {
    (err) => next(err);
  }
};

module.exports = {
  taskController,
};
