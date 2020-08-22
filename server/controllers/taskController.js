const db = require("../models/TaskModel.js");
const queries = require("../queries");

const taskController = {};

taskController.postTask = (req, res, next) => {
  // console.log("req.cookie: ", req.cookies)
  // console.log("req.body: ", req.body)
  // console.log("req.query: ", req.query)
  // console.log("req.params: ", req.params)
  const { item, created_at } = req.body;
  const queryString = `INSERT INTO Tasks (item, created_at) VALUES ($1, $2) RETURNING item`;
  const queryValues = [item, created_at];

  db.query(queryString, queryValues)
    .then(data => {
      // console.log('taskController.postTask data.rows: ', data.rows[0]);
      // query returns itemObj: [{ item: 'eat' }]
      res.locals.item = data.rows[0] // this doesn't go anywhere
      return next();
    })
    .catch(err => {
      // console.log(`An error occurred in taskController.postTask while creating item: ${err}`);
      if (err.message == `duplicate key value violates unique constraint "tasks_item_key"`) {
        res.json('REPEAT');
      }
      if (err.message == `new row for relation "tasks" violates check constraint "tasks_item_check"`) {
        res.json('EMPTY');
      } else {
        return next({
          log: `An error occurred while getting creating new task: ${err}`,
          message: { err: "An error occurred in o.postTask" },
        });
      }
    })
  // console.log('last line of taskController.postTask');
}

taskController.getTasks = (req, res, next) => {
  // console.log("req.cookie: ", req.cookies)
  // console.log("req.body: ", req.body)
  // console.log("req.query: ", req.query)
  // console.log("req.params: ", req.params)

  const queryString = `SELECT * FROM Tasks`;

  db.query(queryString)
    .then(data => {
      // console.log('taskController.getTasks data.rows: ', data.rows);
      // query returns all itemObj: [{ item: 'eat', created_at }, { item: 'drink' }, { item: 'sleep' }]
      res.locals.tasks = data.rows;
      return next();
    })
    .catch(err => {
      console.log(`An error occurred in taskController.getTasks while creating item: ${err}`);
      return next({
        log: `An error occurred while getting getting all existing tasks: ${err}`,
        message: { err: "An error occurred in getTasks" },
      });
    })
  // console.log('last line of taskController.getTasks');
}

taskController.deleteTask = (req, res, next) => {
  // console.log("req.cookie: ", req.cookies)
  // console.log("deleteTask req.body: ", req.body)
  // console.log("req.query: ", req.query)
  // console.log("req.params: ", req.params)
  const { item, created_at } = req.body;
  // console.log('======> taskController.deleteTask, item to delete', item)
  // console.log('======> taskController.deleteTask, item to delete', typeof item)
  const queryString = `DELETE FROM Tasks WHERE item=$1`;
  const queryValues = [item];

  db.query(queryString, queryValues)
    .then(data => {
      console.log('taskController.deleteTask data.rows: ', data);
      return next();
    })
    .catch(err => {
      console.log(`An error occurred in taskController.getTasks while deleting item: ${err}`);
      return next({
        log: `An error occurred while getting deleting task: ${err}`,
        message: { err: "An error occurred in deleteTask" },
      });
    })
  // console.log('last line of taskController.deleteTask');
}






module.exports = taskController;
