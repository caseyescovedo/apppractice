const db = require('../models/TaskModel');

module.exports = {
  postTask: (req, res, next) => {
    const postTaskSQL = `
      INSERT INTO Tasks (
        item
      ) VALUES (
        $1
      )
    `;
    // Get item description from request body
    const { item } = req.body;
    db.query(postTaskSQL, [item], (err, sqlRes) => {
      if (err) return next(err);
      return next();
    });
  },

  getTasks: (req, res, next) => {
    const getTasksSQL = `
      SELECT *
      FROM Tasks
    `;

    db.query(getTasksSQL, [], (err, sqlRes) => {
      if (err) return next(err);
      // Store all tasks in locals and send in response in final anon callback
      res.locals.allTasks = sqlRes.rows;
      return next();
    });
  },

  deleteTask: (req, res, next) => {
    const deleteTaskSQL = `
      DELETE FROM Tasks
      WHERE id=$1
    `;
    // Get id of item to be deleted from request body
    const { id } = req.body;
    db.query(deleteTaskSQL, [id], (err, sqlRes) => {
      if (err) return next(err);
      return next();
    });
  },
};
