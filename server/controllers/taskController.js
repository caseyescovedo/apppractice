const db = require("../models/TaskModel.js");
const taskController = {};

taskController.postTask = (req, res, next) => {
  //should create a new item in the database
  const { item } = req.body;
  const { completed } = req.body;
  const { created_at } = req.body;
  const queryString = `INSERT INTO task (item,completed, created_at) VALUES($1,$2,$3) RETURNING item`;
  const queryValues = [item, completed, created_at];
  db.query(queryString, queryValues)
    .then((data) => {
      console.log("this is the data", data);
      console.log("this is the row", data.row);
      res.locals.item = data.rows[0];
      return next();
    })
    .catch((err) => {
      res.json("Item title already exists");
      console.log(`An error occurred while creating list item: ${err}`);
      return;
    });
};
taskController.getTask = (req, res, next) => {
  //maybe this query string work idkk ):
  const queryString2 = `SELECT * FROM task`;
  db.query(queryString2)
    .then((data) => {
      res.locals.items = data.rows;
      return next();
    })
    .catch((err) => {
      return next({
        log: `An error occurred while getting all list items: ${err}`,
        message: { err: "An error occurred in fileController.getItems" },
      });
    });
};
taskController.deleteTask = (req, res, next) => {
  //assuming that it is in the body, somehow meow meow
  const { taskid } = req.body;
  const queryString3 = `DELETE FROM lists WHERE task.id = $1`;
  const queryValues = [taskid];
  db.query(queryString, queryValues)
    .then((data) => {
      console.log("this is the data", data);
      return next();
    })
    .catch((err) => {
      return next({
        log: `An error occurred while getting deleting list item: ${err}`,
        message: { err: "An error occurred in fileController.deleteItem" },
      });
    });
};

module.exports = {};
