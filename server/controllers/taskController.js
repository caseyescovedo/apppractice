const db = require("../models/TaskModel.js");
const bodyParser = require("body-parser");

const taskController = {};

taskController.getTasks = (req, res) => {
  const sqlQuery = `SELECT * FROM Tasks`;
  db.query(sqlQuery)
    .then((data) => {
      res.status(200).json(data.rows);
      console.log("Taskssss", data.rows);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ case: "getTasks", err: "can't display taks" + err });
    });
};

taskController.postTasks = (req, res, next) => {
  const paramQuery = [req.body.task];
  const sqlQuery = `INSERT INTO Tasks(task) VALUES($1)`;
  db.query(sqlQuery, paramQuery)
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ case: "postTasks", err: "Cannot Post Tasks" + err });
    });
  next();
};

taskController.deleteTasks = (req, res) => {
  const paramQuery = [req.params.id];
  const sqlQuery = `DELETE FROM Tasks WHERE id=$1`;
  db.query(sqlQuery, paramQuery)
    .then(() => res.status(200).json("deleted"))
    .catch((err) =>
      res.json({ Case: "deleteTasks", Error: "delete is not working" + err })
    );
};
module.exports = taskController;
