const db = require('../models/TaskModel.js')
const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item, created_at } = req.body
  console.log(req.body)
  const query = `INSERT INTO tasks (item, created_at)
                Values ($1, $2)
                RETURNING *`;
  values = [item, created_at];
  db.query(query, values, (err, data) => {
    if(err) return err;
    res.locals.tasks = data;
    return next();
  })
}

taskController.getTask = (req, res, next) => {
  const query = `SELECT * FROM tasks`
  db.query(query, (err, data) => {
    if(err) return err;
    res.locals.tasks = data;
    return next();
  })
}

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const query = `DELETE FROM tasks WHERE id = ${id}`;
  db.query(query, (err, data) => {
    if(err) return err;
    return next();
  })
}


module.exports = taskController