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
        res.locals.item = data.rows[0];
        next();
      })
      .catch(err => {
        next(err);
      });
  },

  getTasks: function (req, res, next) {
    next();
  },

  deleteTask: function (req, res, next) {
    next();
  },
};
