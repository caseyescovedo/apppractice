const db = require("../models/TaskModel");
const taskController = {};

taskController.postTask = (req, res, next) => {
  console.log("reached this controller");
  const { item } = req.body;
  // console.log(req.body);
  const query = `INSERT INTO tasks (item)
                 VALUES ($1)
                 RETURNING *`;
  const values = [item];
  db.query(query, values, (err, data) => {
    if (err) return next(err);
    res.locals.item = data;
    return next();
  });
};

taskController.getTasks = (req, res, next) => {
  const query = `SELECT DISTINCT * FROM tasks`;
  db.query(query, (err, data) => {
    if (err) return next(err);
    res.locals.items = data;
    console.log("doing the query");
    return next();
  });
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const query = `DELETE FROM tasks WHERE _id = '${id}'`;
  db.query(query, (err, data) => {
    if (err) return next(err);
    res.locals.deletedTask = data;
    return next();
  });
};

module.exports = taskController;
