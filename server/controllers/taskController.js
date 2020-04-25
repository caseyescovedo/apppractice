const db = require('../models/TaskModel.js');

module.exports = {
  postTask: function (req, res, next) {
    const query = `
      INSERT INTO tasks
      (item)
      VALUES ($1)
      RETURNING *
    `;
    console.log(req.body)
    const values = [req.body.item];
    db.query(query, values)
      .then(data => {
        res.locals.item = data.rows;
        next();
      })
      .catch(err => {
        next(err);
      });
  },

  getTasks: function (req, res, next) {
    const query = `
      SELECT *
      FROM tasks
    `;
    db.query(query)
      .then(data => {
        res.locals.items = data.rows;
        next();
      })
      .catch(err => {
        next(err);
      });
    },

  deleteTask: function (req, res, next) {
    const query = `
      DELETE FROM tasks
      WHERE _id = $1
      RETURNING *
    `;
    values = [req.query.id];
    db.query(query, values)
      .then(data => {
        res.locals.item = data.rows[0]; 
        next();
      })
      .catch(err => {
        next(err);
      });
  },
};
