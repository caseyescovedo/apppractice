const db = require('../models/TaskModel');

const taskController = {};

// to my own database, I alse added a username column
// this was not requested in the readme, so I will remove this before submitting

// creates a new item in the database
taskController.postTask = (req, res, next) => {
  const item = req.body.newItem;
  const time = new Date();
  const username = req.body.user;

  const addItemQuery = `INSERT INTO Task (item, created_at)
                        VALUES ($1, $2, $3)`;

  db.query(addItemQuery, [item, time])
    .then((response) => response)
    .then((data) => {
      // Add extra db query to have access to newest item to then append to list
      db.query(`SELECT item FROM Task WHERE item = $1`, [item])
        .then((response) => response)
        .then((data) => {
          res.locals.newestItem = data.rows[0];
          console.log('res.locals: ', res.locals.newestItem);;
          return next();
        })
        .catch((err) => {
          return next({
            log: 'Error occurred in taskController.postTask - inner query',
            message: { error: `The following error occurred: ${err}` },
          })
        })
    })
    .catch((err) => {
      return next({
        log: 'Error occurred in taskController.postTask',
        message: { error: `The following error occurred: ${err}` },
      })
    })
};

// taskController.postTask();

// retrieves all items from the database and sends them back to client as JSON
taskController.getTasks = (req, res, next) => {
  const { user } = req.params;

  const getTaskQuery = `SELECT item FROM Task`;

  db.query(getTaskQuery)
    .then((response) => response)
    .then((data) => {
      res.locals.allTasks = data.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
      return next({
        log: 'Error occurred in taskController.getTasks',
        message: { error: `The following error occurred: ${err}` },
      })
    })
    
  // // query if searching by user  
  // const getTasksQuery = `SELECT item FROM Task WHERE username = $1`;

  // db.query(getTasksQuery, [user])
  //   .then((response) => response)
  //   .then((data) => {
  //     res.locals.allTasks = data.rows;
  //     return next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return next({
  //       log: 'Error occurred in taskController.getTasks',
  //       message: { error: `The following error occurred: ${err}` },
  //     })
  //   })
};

// taskController.getTasks()

// should find items in database based on ID number and delete
taskController.deleteTask = (req, res, next) => {
  const { item } = req.body;
  const { user } = req.body;

  const deleteQuery = `DELETE FROM Task WHERE item = $1`;

  db.query(deleteQuery, [item])
    .then((response) => response)
    .then((data) => next())
    .catch((err) => {
      return next({
        log: 'Error occurred in taskController.deleteTask',
        message: { error: `The following error occurred: ${err}` },
      })
    })
};

// taskController.deleteTask();


module.exports = taskController;