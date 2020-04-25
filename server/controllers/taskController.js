const pool = require('../models/TaskModel.js');

const taskController = {};

// create a new item in the database
taskController.postTask = (req, res, next) => {
  // console.log('what is the pool?:', pool);
  // console.log('(controller.postTask) req.body:', req.body);

  const params = [req.body.item];
  const insertQuery = `
    INSERT INTO Tasks(item)
    VALUES ($1);
  `;

  pool.query(insertQuery, params)
  // .then(res => res.json())
  .then(postedTask => {
    res.locals.postedTask = req.body.item;
    return next();
  })
  .catch(err => {
    // console.log('err in postTask:', err);
    return next({
      log: 'Error while inserting to PG db.',
      message: err,
    })
  })

};

// retrieve all items from the database and send it back to the client as JSON
taskController.getTasks = (req, res, next) => {
  const getAllTasksQuery = `
    SELECT * from Tasks;
  `;

  pool.query(getAllTasksQuery)
  .then(allTasks => {
    // Successful query will return the tasks in docs.rows (an array).
    // console.log('(controller.getTasks) allTasks:', allTasks.rows);
    res.locals.allTasks = allTasks.rows;
    return next();
  })
  .catch(err => {
    return next({
      log: 'Error while getting tasks from PG db.',
      message: err,
    })
  })
};

// should find items in the db based on ID (created_at?) and delete that item if it exists
taskController.deleteTask = (req, res, next) => {
  const params = [req.params.id];
  const deleteQuery = `
    DELETE FROM Tasks
    WHERE _id=($1)
  `;

  pool.query(deleteQuery, params)
  .then(deletedTask => {
    console.log('(controller.deleteTask) task deletion successful')
    res.locals.deletedItem = deletedTask;
    return next();
  })
  .catch(err => {
    return next({
      log: 'Error while deleting a task from PG db.',
      message: err,
    })
  })

};


module.exports = taskController;
