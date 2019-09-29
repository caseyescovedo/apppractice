const pool = require('../models/TaskModel');

// exporting an object with various methods
const taskController = {}

// postTask method
taskController.postTask = (req, res, next) => {
  // store item from req.body
  const item = req.body.item

  // get the current time in format '00:00:00'
  const time = new Date().toLocaleTimeString('it-IT');
    
  // create query
  const postQuery = `INSERT INTO Tasks (item, created_at) VALUES (${task}, ${time})`;

  // run query
  pool.query(postQuery, (err, response) => {
    if (err) {
      return console.error('error:', err);
    }
    
    console.log('post successful!', response);
    
    // store response in res
    res.locals.item = response;
  });

  next();
};

// getTasks method
taskController.getTasks = (req, res, next) => {
  // make get query
  const getQuery = `GET * FROM Tasks`;

  // run query
  pool.query(getQuery, (err, response) => {
    if (err) {
      return console.error('error:', err);
    }

    console.log('get successful!', response);

    // store tasks in res
    res.locals.tasks = response;
  });

  next();
};

// deleteTask method
taskController.deleteTask = (req, res, next) => {
  // get id of item to delete from req.body
  const deleteId = req.body._id;

  // create delete query
  const deleteQuery = `DELETE FROM Tables WHERE _id = ${deleteId}`;

  // run query
  pool.query(deleteQuery, (err, response) => {
    if (err) {
      return console.error('error:', err);
    }

    console.log('delete successful!', response);
  });

  next();
}

module.exports = taskController;
