const db = require('../models/TaskModel.js');

// create task controller
const taskController = {};

//getTasks controller
taskController.getTasks = (req, res, next) => {
  const queryStr = `SELECT * FROM task;`;
  // retrieve items from db
  db.query(queryStr)
    .then((data) => {
      res.locals.dbInfo = data;
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

// postTask controller
taskController.postTask = (req, res, next) => {
  //create properties on req.body
  const { item } = req.body;
  //create array to store in res.locals
  const values = [item];
  const queryStr = `INSERT INTO task (item) VALUES ($1) returning *;`;

  //query database
  db.query(queryStr, values, (err, postResult) => {
    console.log(postResult);
    if (err) {
      return next(err);
    } else {
      res.locals.post = postResult.rows[0];
      console.log(res.locals.post);
      return next();
    }
  });
};

// deleteTask controller
module.exports = taskController;
