const pool = require('../models/TaskModel');

taskController = {};

//get all tasks
taskController.getTasks = ((req, res, next) => {
  const text = 'Select * from Task;'
  pool
    .query(text)
    .then((task) => {
      res.locals.tasklist = task.rows;
      return next();
    })
    .catch((err) => {
      console.log(
        'this error comes from controller get tasks',
        err.message,
        err
      );
      next(err);
    });
});

//delete task
taskController.deleteTask = ((req, res, next) => {
    const { id } = req.params
    const text = 'DELETE from Task where id = $1 returning *;'
    const values =[id]
    pool
      .query(text,values)
      .then((task, values) => {
        res.locals.delete = task.rows[0];
        return next();
      })
      .catch((err) => {
        console.log(
          'this error comes from controller delete tasks',
          err.message,
          err
        );
        next(err);
      });
  });
//post taks
taskController.postTask = ((req, res, next) => {
    const  {item} = req.body
    const text = 'insert  into  Task (item) Values($1) returning *;'
    const values =[item]
    pool
      .query(text,values)
      .then((task) => {
        res.locals.post = task.rows[0];
        return next();
      })
      .catch((err) => {
        console.log(
          'this error comes from controller delete tasks',
          err.message,
          err
        );
        next(err);
      });
  });

module.exports = taskController;
