const { del } = require("request");
const db = require("../models/TaskModel.js");
const taskController = {};

/* NOTES FROM TASKMODEL
CREATE TABLE todo (_id SERIAL PRIMARY KEY, item VARCHAR(200), created_at TIMESTAMP);
INSERT current time with CURRENT_TIMESTAMP*/

//should create a new item in the database
taskController.postTask = (req, res, next) => {
  //tableItem should equal whatever arrives from client
  const tableItem = req.body.item;
  const params = [tableItem];
  const insertQuery = `INSERT INTO todo (item, created_at) 
    VALUES ($1, CURRENT_TIMESTAMP);`;
  db.query(insertQuery, params)
    .then((data) => {
      console.log("posttask", data);
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//should retrieve all items from the database and send it back to the client as JSON
taskController.getTask = (req, res, next) => {
  const queryAll = `SELECT * FROM todo;`;
  db.query(queryAll)
    .then((data) => {
      res.locals.data = data;
      console.log("gettask", data);
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

//should find items in the database based on an ID number and delete that item if it exists
taskController.deleteTask = (req, res, next) => {
  const idNum = req.body.id;
  const params = [idNum];
  const deleteQuery = `DELETE FROM todo WHERE _id=$1;`;
  db.query(deleteQuery, params)
    .then((data) => {
      console.log("deletetask", data);
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

module.exports = taskController;
