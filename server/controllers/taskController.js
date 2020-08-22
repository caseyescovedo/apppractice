const db = require('../models/TaskModel.js');
const queries = require('../utils/queries.js');

module.exports = {

  postTask: (req, res, next) => {
    // Grab item description from body
    const values = [req.body.item];

    db.query(queries.createTask, values)
      .then(data => {
        res.locals.itemId = data.rows[0].id;
        return next();
      })
      .catch(err => {
        console.log(err);
        return next({
          err: err,
        });
      });
  },

  getTasks: (req, res, next) => {
    db.query(queries.getTasks)
      .then(data => {
        return res.status(200).json(data);
      })
      .catch(err => {
        console.log(err);
        return next({
          err: err,
        });
      });
  },

  deleteTasks: (req, res, next) => {
    // Grab item id from body
    const values = [req.body.itemId];

    db.query(queries.deleteTask, values)
      .then(data => {
        return next();
      })
      .catch(err => {
        console.log(err);
        return next({
          err: err,
        });
      });
  }

};
