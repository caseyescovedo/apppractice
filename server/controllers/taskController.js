const db = require('../models/TaskModel')
const taskController = {};

// controller to display todo list info on page
taskController.getTasks = (req, res, next) => {
  const getQuery = `SELECT * FROM Task`;
  db.query(getQuery)
  .then((data) => {
    res.locals.tasks = data;
    return next();
  })
  .catch((err) => {
    console.log(err);
    return next(err);
  })
};

// controller to update database with input fields
taskController.postTask = (req, res, next) => {
  // destructure columns from req.body
  const { item, created_at } = req.body
  const values = [item, created_at];
  const postQuery = `INSERT INTO Task (item, created_at) VALUES ($1, $2) RETURNING *`
  db.query((postQuery, values), (err, post) => {
    if (err) {
      return next(err);
    }
    res.locals.post = post.rows[0];
    return next();
  });
};

// controller to delete task row from database
taskController.deleteTask = (req, res, next) => {
  // utilize id since the whole row must be deleted
  const { _id } = req.body;
  const values = [_id];
  const deleteQuery = `DELETE FROM Task WHERE _id = $1 RETURNING _id`;
  db.query((deleteQuery, values), (err) => {
    if (err) {
      return next(err);
    } else {
      res.locals.deleted = response.rows[0];
    }
  })
}

module.exports = taskController;
