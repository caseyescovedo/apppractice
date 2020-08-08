const db = require('../models/TaskModel');

const tasksController = {};

tasksController.postTask = (req, res, next) => {
  const param = [req.body.item];
  const insertQuery = `INSERT INTO Tasks (item) VALUES ($1) RETURNING *`;
  db.query(insertQuery, param, (err, result) => {
    if (err) {
      console.log("Error in Insert");
      return next(err);
    }
    console.log("Posted task => ", result.rows[0]);
    res.locals.data = result.rows[0];
    return next();
  })
};

tasksController.getTasks = (req, res, next) => {
  const selectQuery = `SELECT * FROM Tasks`;
  db.query(selectQuery, (err, result) => {
    if (err) {
      console.log("Error in Select");
      return next(err);
    }
    // console.log(result.rows);
    if (result.rows) {
      const tasks = result.rows;
      res.locals.tasks = tasks;
      return next();
    }
  });
};

tasksController.deleteTask = (req, res, next) => {
  // console.log(req.params);
  const taskID = [req.params.id];
  const deleteQuery = `DELETE FROM Tasks WHERE id = $1 RETURNING *`;
  db.query(deleteQuery, taskID, (err, result) => {
    if (err) {
      console.log("Error in Delete");
      return next(err);
    }
    console.log("Deleted task => ", result.rows[0]);
    res.locals.task = result.rows[0];
    return next();
  });
};

module.exports = tasksController;
