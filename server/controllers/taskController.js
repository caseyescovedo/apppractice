const db = require('../models/TaskModel')

const postTask = (req, res,) => {
  console.log('post received from index.js')
  const { item } = req.body;
  console.log(req.body)
  db.query('INSERT INTO "Tasks" (item) VALUES ($1) RETURNING *',[item])
  .then(result => res.status(201).json(result))
  .catch(err => next({
    message: { err: 'taskController.postTask: ERROR; check server logs for detail' }
  }))
}

const getTasks = (req, res, next) => {
  console.log('get received from index.js')
  db.query('SELECT * FROM "Tasks" ORDER BY id ASC')
  .then(results => {
    res.locals.items = results;
    return next();
  })
  .catch(err => next({
    message: { err: 'taskController.getTasks: ERROR; check server logs for detail' }
  }))
}

const deleteTask = (req, res, next) => {
  console.log('delete received from index.js')
  const  {item}  = req.body;
  console.log(req.body)

  db.query('DELETE FROM "Tasks" WHERE item = $1 RETURNING *', [item])
  .then(result => {
    res.locals.items = result;
    console.log(result)
    return next();
  })
  .catch(err => next({
    message: { err: 'taskController.deleteTask: ERROR; check server logs for detail' }
  }))
}

module.exports = {
  postTask,
  getTasks,
  deleteTask
};
