const pool = require("../models/TaskModel");

const taskController = {};

taskController.postTask = (req, res, next) => {
  // console.log("in postTask. req.body is: ", req.body);
  const text = `INSERT INTO "Task" (item, created_at) VALUES ('${req.body.item}', current_timestamp)`;
  pool.query(text, (err, response) => {
    if (err) {
      return next("Error in postTask");
    }
    res.locals = response;
    next();
  });
};

taskController.getTasks = (req, res, next) => {
  const text = `SELECT * FROM "Task"`;
  pool.query(text, (err, response) => {
    if (err) {
      return next(err);
    }
    res.locals = response;
    next();
  });

  // taskController.deleteTask = (req, res, next) => {
  //   console.log("deleting where id is ", req.body.id);
  //   const text = `DELETE FROM "Task" WHERE id = '${req.body.id}'`;
  //   pool.query(text, (err, response) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     next();
  //   });
  // };
};
module.exports = taskController;
