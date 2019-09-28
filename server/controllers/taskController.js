const pool = require ('../models/TaskModel.js')

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const queryString = `SELECT * from "Task"`
  pool.query(queryString, (err, result) => {
    if (err) return next(console.log(`Error occurred in getTasks controller: ${err}`))
    res.locals.tasks = result.rows;
    return next();
  })
}

taskController.postTask = (req, res, next) => {
  const {item, timeAdded } = req.body;
  const queryString = `INSERT INTO "Task" ("item", "created_at") values ('${item}', '${timeAdded}') RETURNING *`;
  pool.query(queryString, (err, result)=> {
    if (err) return next(console.log(`Error occurred in postTask controller: ${err}`));
    res.locals.tasks = result.rows[0];
    return next();
  }) 
}

taskController.deleteTask = (req, res, next) => {
  const { item, id } = req.body;
  const queryString = `DELETE FROM "Task" WHERE _id = '${id}' OR "item" = '${item}'`
  pool.query(queryString, (err, result) => {
    if (err) return next(console.log(`Error occurred in deleteTask controller: ${err}`))
    return next();
  })
}

module.exports = taskController;
