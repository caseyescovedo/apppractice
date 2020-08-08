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

taskController.postTasks = (req, res) => {
  const sqlQuery = `INSERT INTO Tasks(task) VALUES('test3')`;
  db.query(sqlQuery)
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ case: "postTasks", err: "Cannot Post Tasks" + err });
    });
};

taskController.deleteTasks = (req, res) => {
  const sqlQuery = `DELETE FROM Tasks WHERE id=3`;
  db.query(sqlQuery)
    .then(() => res.status(200).json("deleted"))
    .catch((err) =>
      res.json({ Case: "deleteTasks", Error: "delete is not working" + err })
    );
};
module.exports = taskController;
