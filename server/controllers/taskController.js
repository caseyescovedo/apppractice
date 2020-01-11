const db = require('../models/TaskModel');
const taskController = {};

taskController.getTasks = (req, res, next) => {
  console.log('in getTasks');
  let { task } = req.body;
  let item = task;
  console.log('item/task', item, task);
  values = [item];
  sqlString = `select *
                from tasks
                where item like *
                ;`;

  db.query(sqlString, values)
  .then(data => {
    console.log('res.locals.rows: ',data.rows);
    res.locals.data = data.rows;

    next();
  })
  .catch(err => next(err));
}

taskController.createTask = (req, res, next) => {
  console.log('in createTask');
  let { task } = req.body;
  console.log('req.body in createTask', req.body);
  let item = task;
  console.log('item/task', item, task);
  values = [item];
  sqlString = `insert into tasks
                (item, created_at)
                values($1, NOW())
                returning *
                ;`;
  db.query(sqlString, values)
  .then(data => {
    console.log('res.locals.rows: ',data.rows);
    res.locals.user = data.rows;

    next();
  })
  .catch(err => next(err));
}
module.exports = {


};
