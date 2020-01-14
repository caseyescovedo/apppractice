const db = require('../models/TaskModel')

const taskController = {};

// create todo list item
taskController.postTask = (req, res, next) => {
  // console.log('postTask req.body: ', req.body)
  const { item, created_at } = req.body;
  const text = `
    INSERT INTO Task (item, created_at)
    VALUES ($1, $2) RETURNING *;
  `
  const values = [item, created_at];
  db.query(text, values)
  .then(data => {
    res.locals.data = data.rows[0];
    // console.log('res.locals.data: ', res.locals.data)
    next();
  })
  .catch(err => console.log(err));
}

// retrieve all todo list items in database
taskController.getTasks = (req, res, next) => {
  const text = `
    SELECT item
    FROM Task
  `
  db.query(text)
    .then(data => {
      // console.log('data.rows: ', data.rows)
      res.locals.data = data.rows;
      next();
    })
    .catch(err => console.log(err))
}

// delete item from database based on the _id
taskController.deleteTask = async (req, res, next) => {
  console.log('req.body', req.body)
  const { _id } = req.body;
  const text = `
      DELETE FROM Task
      WHERE _id = '${_id}'
  `
  await db.query(text)
      .then(response => console.log(`${item} has been deleted`))
      .catch(err => console.log(err))
  next();
}


module.exports = taskController;
