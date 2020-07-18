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
  const { item } = req.body;
  const queryString = `INSERT INTO Tasks (item) VALUES ('') RETURNING *;`;
  try {
    db.query(queryString, (err, response) => {
      res.locals.tasks = response.rows;
      return next();
    });
  } catch {
    next(err);
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
  const queryString = 'SELECT * from Tasks;';
  try {
    db.query(queryString, (err, response) => {
      res.locals.tasks = response.rows;
      return next();
    });
  } catch {
    next(err);
  }
};

/**
 * @function deleteTask
 * @description
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const queryString = `DELETE FROM Tasks WHERE id=${id} RETURNING *;`;
  try {
    db.query(queryString, (err, response) => {
      res.locals.tasks = response.rows;
      return next();
    });
  } catch {
    next(err);
  }
};

module.exports = {
  taskController,
};
