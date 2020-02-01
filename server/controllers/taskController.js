const db = require('../models/TaskModel.js')

const taskController = {};

taskController.postTask = (req, res, next) => {
  console.log(req.body);
  const { task } = req.body;
  const arr = [task];
  const queryString = 'INSERT INTO Tasks (item, created_at) VALUES ($1, NOW());'

  db.query(queryString, arr, (err) => {
    if (err) {
      return next({
        log: 'error executing query to post task',
        mesage: { err }
      });
    }
  });

  return next();
}

taskController.getTasks = (req, res, next) => {
  const queryString = 'SELECT * FROM Tasks;';

  db.query(queryString, null, (err, response) => {
    if (err) {
      return next({
        log: 'error executing query to retrieve tasks',
        mesage: { err }
      });
    } else {
      // console.log('response: ', response);
      // console.log('response.rows[0].item:', response.rows[0].item);
      // console.log('response.rows[0].created_at:', response.rows[0].created_at);
      // console.log('response.rows[1].item:', response.rows[1].item);
      res.locals.allTasks = response.rows;
    }
  });

  return next();
}

taskController.deleteTasks = (req, res, next) => {
  const queryString = 'DELETE FROM Tasks WHERE id = $1;';

  db.query(queryString, [req.body.id], (err, response) => {
    if (err) {
      return next({
        log: 'error executing query to delete task',
        message: { err } // why in brackets?
      });
    }
  });

  return next();
}





module.exports = taskController;

// module.exports = {


// };

