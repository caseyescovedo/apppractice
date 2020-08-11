const db = require('../models/TaskModel');
const taskController = {};

(taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const query = `INSERT INTO Tasks (item) VALUES ('${item}') RETURNING item, id`;
  db.query(query, (err, result) => {
    if (err)
      next({
        log: 'error in postTask/dbquery',
        status: 400,
        err: { err },
      });
    res.locals.post = result.rows[0];
    console.log('result', result);
    return next();
  });
}),
  (taskController.getTasks = (req, res, next) => {
    const query = `SELECT * FROM Tasks`;
    db.query(query, (err, result) => {
      if (err)
        next({
          log: 'error in getTasks/dbquery',
          status: 400,
          err: { err },
        });
      res.locals.posts = result.rows;
      return next();
    });
  }),
  (taskController.deleteTask = (req, res, next) => {
    const { id } = req.params;
    const query = `DELETE FROM Tasks WHERE id=${id}`;
    db.query(query, (err) => {
      if (err) {
        return next({
          log: 'error in deleteTask/dbquery',
          status: 400,
          err: { err },
        });
      }
      return next();
    });
  });

module.exports = taskController;
