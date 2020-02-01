const db = require('../models/TaskModel');


module.exports = {

  postTask: (req, res, next) => {
    const { item } = req.body;
    console.log(item);

    db.query(`INSERT INTO Tasks (task, created_at)
    VALUES ('${item}', NOW());
    `);

    next();
  },
  getTask: (req, res, next) => {
    db.query(`select * from tasks`)
      .then((response) => {
        res.locals.tasks = response.rows;
        next();
      });
  },
  deleteTask: (req, res, next) => {
    const { id } = req.body;

    db.query(`DELETE FROM Tasks WHERE id= ${id}`);
    next();
  },
};
