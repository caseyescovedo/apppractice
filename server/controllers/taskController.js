const db = require('../models/TaskModel');

module.exports = {
  // Adds item to database
  postTask: function (req, res, next) {
    // Destructure item from request body
    const { item } = req.body;
    const values = [item];
    // Query
    const postQuery = 'INSERT INTO Task(item) VALUES($1)';
    // Create new item in db
    db.query(postQuery, values, (err) => {
      if (err) {
        return next({
          log: 'Express caught middleware error in taskController.postTask',
          status: 500,
          message: err
        })
      }
      // Will respond with confirmation message
      res.locals.posted = 'New item posted to databse';
      return next();
    })
  },
  // Gets all todos from the database
  getTasks: function (req, res, next) {
    // Query
    const getQuery = 'SELECT * FROM Task';
    // Query db with getQuery
    db.query(getQuery, [], (err, items) => {
      if (err) {
        return next({
          log: 'Express caught middleware error in taskController.getTasks',
          status: 500,
          message: err
        })
      }
      // Store items in res.locals
      res.locals.items = items.rows;
      return next();
    })
  },
  // Deletes item from database based on id number
  deleteTask: function (req, res, next) {
    // Get id number from query string
    const id = req.query._id;
    const values = [id];
    // Query
    const deleteQuery = 'DELETE FROM Task WHERE _id=$1';
    // Delete task from db
    db.query(deleteQuery, values, (err) => {
      if (err) {
        return next({
          log: 'Express caught middleware error in taskController.deleteTask',
          status: 500,
          message: err
        })
      }
      // Send confirmation message that delete was successful
      res.locals.deleted = 'Item deleted';
      return next();
    })
  }
};
